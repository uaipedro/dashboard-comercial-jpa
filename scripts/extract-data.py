#!/usr/bin/env python3
"""
Extrai dados reais das planilhas xlsb e gera src/data/realData.json
Uso: python3 scripts/extract-data.py
"""
import json
import datetime
import collections
import os
import sys

try:
    import pyxlsb
except ImportError:
    print("Instale pyxlsb: pip3 install pyxlsb --break-system-packages")
    sys.exit(1)

# ─── Configuração ────────────────────────────────────────────────────────────

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(SCRIPT_DIR)
RAW_DIR = os.path.join(ROOT_DIR, "raw")
OUT_FILE = os.path.join(ROOT_DIR, "src", "data", "realData.json")

ARQUIVOS = {
    2021: "Relatórios - Direção - Tulio 21.xlsb",
    2022: "Relatório - Tulio 22.xlsb",
    2023: "Relatório - Tulio_23.xlsb",
    2024: "Relatório - Tulio_24.xlsb",
}

# Vendedores internos/gestor — excluir das análises comerciais
VENDEDORES_EXCLUIR = {"Gestores", "Media de Estoque", "(vazio)", ""}


# ─── Helpers ─────────────────────────────────────────────────────────────────

def xldate_to_date(serial):
    """Converte serial date do Excel para objeto date."""
    if not serial or not isinstance(serial, (int, float)):
        return None
    try:
        return datetime.date(1899, 12, 30) + datetime.timedelta(days=int(serial))
    except Exception:
        return None


def col_idx(header, *names):
    """Retorna índice da primeira coluna encontrada dentre os nomes fornecidos."""
    for name in names:
        try:
            return header.index(name)
        except ValueError:
            pass
    return None


def safe(vals, idx):
    """Acessa lista com segurança."""
    if idx is None or idx >= len(vals):
        return None
    return vals[idx]


# ─── Extração ────────────────────────────────────────────────────────────────

def extrair_ano(ano, fname):
    path = os.path.join(RAW_DIR, fname)
    registros = []

    with pyxlsb.open_workbook(path) as wb:
        with wb.get_sheet("BaseCarregamentos") as ws:
            rows_iter = iter(ws.rows())
            header = [c.v for c in next(rows_iter)]

            # Mapear colunas (2021 tem nomes ligeiramente diferentes)
            i_vendedor   = col_idx(header, "Vendedor")
            i_cod_cliente= col_idx(header, "COD Cliente")
            i_cliente    = col_idx(header, "Cliente")
            i_uf         = col_idx(header, "UF")
            i_produto    = col_idx(header, "Produto")
            i_peso       = col_idx(header, "Peso", "Peso Ton")
            i_preco      = col_idx(header, "Preço Vendido /Ton")
            i_data       = col_idx(header, "Data Saída")
            i_prazo      = col_idx(header, "Prazo Médio")
            i_total_vend = col_idx(header, "Total Vendido")
            i_total_marg = col_idx(header, "Total Margem")
            i_margem_pct = col_idx(header, "Margem %")
            i_margem_ton = col_idx(header, "Margem /Ton")
            i_pedido     = col_idx(header, "COD Pedido")

            for row in ws.rows():
                vals = [c.v for c in row]

                peso = safe(vals, i_peso)
                if not isinstance(peso, (int, float)) or peso <= 0:
                    continue

                vendedor = safe(vals, i_vendedor)
                if not vendedor or str(vendedor).strip() in VENDEDORES_EXCLUIR:
                    continue

                total_vend = safe(vals, i_total_vend)
                total_marg = safe(vals, i_total_marg)
                if not isinstance(total_vend, (int, float)):
                    continue

                data_saida = xldate_to_date(safe(vals, i_data))
                if not data_saida or not (2020 <= data_saida.year <= 2025):
                    # fallback: usar o ano da planilha
                    data_saida = datetime.date(ano, 1, 1)

                margem_pct = safe(vals, i_margem_pct)
                margem_ton = safe(vals, i_margem_ton)
                preco      = safe(vals, i_preco)
                prazo      = safe(vals, i_prazo)

                registros.append({
                    "ano":       data_saida.year,
                    "mes":       data_saida.month,
                    "vendedor":  str(vendedor).strip(),
                    "cod_cliente": int(safe(vals, i_cod_cliente) or 0) if isinstance(safe(vals, i_cod_cliente), (int, float)) else 0,
                    "cliente":   str(safe(vals, i_cliente) or "").strip(),
                    "uf":        str(safe(vals, i_uf) or "").strip(),
                    "produto":   str(safe(vals, i_produto) or "").strip(),
                    "peso":      float(peso),
                    "preco_ton": float(preco) if isinstance(preco, (int, float)) else None,
                    "total_vendido": float(total_vend),
                    "total_margem":  float(total_marg) if isinstance(total_marg, (int, float)) else 0.0,
                    "margem_pct":    float(margem_pct) if isinstance(margem_pct, (int, float)) else None,
                    "margem_ton":    float(margem_ton) if isinstance(margem_ton, (int, float)) else None,
                    "prazo_medio":   float(prazo) if isinstance(prazo, (int, float)) else None,
                    "pedido":        str(safe(vals, i_pedido) or ""),
                })

    return registros


# ─── Agregações ──────────────────────────────────────────────────────────────

def agregar_por_mes(registros, ano_filtro=None):
    """Retorna lista de {ano, mes, mesLabel, toneladas, faturamento}."""
    meses_nomes = ["Jan","Fev","Mar","Abr","Mai","Jun",
                   "Jul","Ago","Set","Out","Nov","Dez"]
    bucket = collections.defaultdict(lambda: {"tons": 0.0, "fat": 0.0})

    for r in registros:
        if ano_filtro and r["ano"] != ano_filtro:
            continue
        chave = (r["ano"], r["mes"])
        bucket[chave]["tons"] += r["peso"]
        bucket[chave]["fat"]  += r["total_vendido"]

    resultado = []
    for (ano, mes), v in sorted(bucket.items()):
        resultado.append({
            "ano":        ano,
            "mes":        mes,
            "mesLabel":   f"{meses_nomes[mes-1]}/{str(ano)[2:]}",
            "toneladas":  round(v["tons"], 2),
            "faturamento": round(v["fat"], 2),
        })
    return resultado


def agregar_por_ano(registros):
    """Retorna lista de {ano, toneladas, faturamento, margem}."""
    bucket = collections.defaultdict(lambda: {"tons": 0.0, "fat": 0.0, "marg": 0.0, "n": 0})
    for r in registros:
        b = bucket[r["ano"]]
        b["tons"] += r["peso"]
        b["fat"]  += r["total_vendido"]
        b["marg"] += r["total_margem"]
        b["n"]    += 1

    return [
        {
            "ano":         str(ano),
            "toneladas":   round(v["tons"], 2),
            "faturamento": round(v["fat"], 2),
            "margem":      round(v["marg"] / v["fat"] * 100, 2) if v["fat"] else 0,
        }
        for ano, v in sorted(bucket.items())
    ]


def agregar_vendedores(registros, ano_filtro=None):
    """Retorna lista de vendedores ordenada por faturamento desc."""
    bucket = collections.defaultdict(lambda: {
        "tons": 0.0, "fat": 0.0, "marg": 0.0,
        "pedidos": set(), "clientes": set()
    })

    for r in registros:
        if ano_filtro and r["ano"] != ano_filtro:
            continue
        b = bucket[r["vendedor"]]
        b["tons"] += r["peso"]
        b["fat"]  += r["total_vendido"]
        b["marg"] += r["total_margem"]
        if r["pedido"]:
            b["pedidos"].add(r["pedido"])
        if r["cod_cliente"]:
            b["clientes"].add(r["cod_cliente"])

    resultado = []
    for vendedor, v in sorted(bucket.items(), key=lambda x: -x[1]["fat"]):
        resultado.append({
            "vendedor":   vendedor,
            "toneladas":  round(v["tons"], 2),
            "faturamento": round(v["fat"], 2),
            "margem":     round(v["marg"] / v["fat"] * 100, 2) if v["fat"] else 0,
            "contratos":  len(v["pedidos"]),
            "clientes":   len(v["clientes"]),
        })
    return resultado


def agregar_clientes(registros, ano_filtro=None, top_n=30):
    """Retorna top clientes por faturamento."""
    bucket = collections.defaultdict(lambda: {
        "tons": 0.0, "fat": 0.0, "marg": 0.0,
        "uf": "", "cod": 0, "contratos": set()
    })

    for r in registros:
        if ano_filtro and r["ano"] != ano_filtro:
            continue
        cliente = r["cliente"]
        if not cliente:
            continue
        b = bucket[cliente]
        b["tons"] += r["peso"]
        b["fat"]  += r["total_vendido"]
        b["marg"] += r["total_margem"]
        b["uf"]    = r["uf"]  # última UF vista
        b["cod"]   = r["cod_cliente"]
        if r["pedido"]:
            b["contratos"].add(r["pedido"])

    ordenado = sorted(bucket.items(), key=lambda x: -x[1]["fat"])[:top_n]
    resultado = []
    for cliente, v in ordenado:
        resultado.append({
            "cliente":    cliente,
            "codCliente": v["cod"],
            "toneladas":  round(v["tons"], 2),
            "faturamento": round(v["fat"], 2),
            "margem":     round(v["marg"] / v["fat"] * 100, 2) if v["fat"] else 0,
            "uf":         v["uf"],
            "contratos":  len(v["contratos"]),
        })
    return resultado


def agregar_clientes_por_uf(registros, ano_filtro=None):
    """Distribuição geográfica de clientes e toneladas por UF."""
    bucket_tons = collections.defaultdict(float)
    bucket_clis = collections.defaultdict(set)

    for r in registros:
        if ano_filtro and r["ano"] != ano_filtro:
            continue
        uf = r["uf"].strip().upper() if r["uf"] else "?"
        if len(uf) != 2:
            continue
        bucket_tons[uf] += r["peso"]
        if r["cod_cliente"]:
            bucket_clis[uf].add(r["cod_cliente"])

    total_tons = sum(bucket_tons.values())
    resultado = []
    for uf in sorted(bucket_tons, key=lambda u: -bucket_tons[u]):
        tons = bucket_tons[uf]
        resultado.append({
            "uf":          uf,
            "toneladas":   round(tons, 2),
            "clientes":    len(bucket_clis[uf]),
            "participacao": round(tons / total_tons * 100, 2) if total_tons else 0,
        })
    return resultado


def agregar_produtos(registros, ano_filtro=None):
    """Distribuição por produto."""
    bucket = collections.defaultdict(lambda: {
        "tons": 0.0, "fat": 0.0, "marg": 0.0, "contratos": set()
    })

    for r in registros:
        if ano_filtro and r["ano"] != ano_filtro:
            continue
        prod = r["produto"]
        if not prod:
            continue
        b = bucket[prod]
        b["tons"] += r["peso"]
        b["fat"]  += r["total_vendido"]
        b["marg"] += r["total_margem"]
        if r["pedido"]:
            b["contratos"].add(r["pedido"])

    total_tons = sum(v["tons"] for v in bucket.values())
    resultado = []
    for prod, v in sorted(bucket.items(), key=lambda x: -x[1]["tons"]):
        resultado.append({
            "produto":     prod,
            "toneladas":   round(v["tons"], 2),
            "faturamento": round(v["fat"], 2),
            "margem":      round(v["marg"] / v["fat"] * 100, 2) if v["fat"] else 0,
            "participacao": round(v["tons"] / total_tons * 100, 2) if total_tons else 0,
            "contratos":   len(v["contratos"]),
            "precoMedio":  round(v["fat"] / v["tons"], 2) if v["tons"] else 0,
        })
    return resultado


def calcular_metricas(registros, ano_filtro=None):
    """KPIs globais."""
    tons = 0.0
    fat  = 0.0
    marg = 0.0
    clientes = set()
    pedidos  = set()

    for r in registros:
        if ano_filtro and r["ano"] != ano_filtro:
            continue
        tons += r["peso"]
        fat  += r["total_vendido"]
        marg += r["total_margem"]
        if r["cod_cliente"]:
            clientes.add(r["cod_cliente"])
        if r["pedido"]:
            pedidos.add(r["pedido"])

    return {
        "totalToneladas":   round(tons, 2),
        "faturamentoTotal": round(fat, 2),
        "margemTotal":      round(marg, 2),
        "margemMedia":      round(marg / fat * 100, 2) if fat else 0,
        "totalClientes":    len(clientes),
        "totalContratos":   len(pedidos),
        "ticketMedio":      round(fat / len(pedidos), 2) if pedidos else 0,
    }


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    print("Lendo planilhas...")
    todos = []
    for ano, fname in sorted(ARQUIVOS.items()):
        path = os.path.join(RAW_DIR, fname)
        if not os.path.exists(path):
            print(f"  ⚠ Arquivo não encontrado: {fname}")
            continue
        regs = extrair_ano(ano, fname)
        print(f"  {ano}: {len(regs)} registros válidos")
        todos.extend(regs)

    print(f"\nTotal: {len(todos)} registros")

    anos_disponiveis = sorted(set(r["ano"] for r in todos))
    print(f"Anos: {anos_disponiveis}")

    print("\nAggregando...")

    # Estrutura de saída
    output = {
        "anosDisponiveis": [str(a) for a in anos_disponiveis],

        # Geral (todos os anos)
        "metricas":       calcular_metricas(todos),
        "vendasPorMes":   agregar_por_mes(todos),
        "vendasPorAno":   agregar_por_ano(todos),
        "topVendedores":  agregar_vendedores(todos),
        "topClientes":    agregar_clientes(todos),
        "clientesPorUF":  agregar_clientes_por_uf(todos),
        "produtos":       agregar_produtos(todos),

        # Por ano (para filtros)
        "porAno": {}
    }

    for ano in anos_disponiveis:
        output["porAno"][str(ano)] = {
            "metricas":      calcular_metricas(todos, ano),
            "vendasPorMes":  agregar_por_mes(todos, ano),
            "topVendedores": agregar_vendedores(todos, ano),
            "topClientes":   agregar_clientes(todos, ano),
            "clientesPorUF": agregar_clientes_por_uf(todos, ano),
            "produtos":      agregar_produtos(todos, ano),
        }

    # Gravar JSON
    os.makedirs(os.path.dirname(OUT_FILE), exist_ok=True)
    with open(OUT_FILE, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"\n✓ Gerado: {OUT_FILE}")
    print(f"  {os.path.getsize(OUT_FILE) / 1024:.0f} KB")


if __name__ == "__main__":
    main()
