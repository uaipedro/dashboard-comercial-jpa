import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils'
import { Package, TrendingUp, DollarSign, Percent } from 'lucide-react'
import type { RealData } from '@/types'
import rawData from '@/data/realData.json'

const data = rawData as RealData

const ANOS = ['Todos', ...data.anosDisponiveis]

export function Produtos() {
  const [anoSelecionado, setAnoSelecionado] = useState('Todos')

  const d = useMemo(() => {
    if (anoSelecionado === 'Todos') {
      return {
        metricas: data.metricas,
        produtos:  data.produtos,
      }
    }
    const ano = data.porAno[anoSelecionado]
    return {
      metricas: ano.metricas,
      produtos:  ano.produtos,
    }
  }, [anoSelecionado])

  const produtosOrdenadosMargem = useMemo(
    () => [...d.produtos].sort((a, b) => b.margem - a.margem).slice(0, 10),
    [d.produtos]
  )

  const margemMedia = useMemo(() => {
    const total = d.produtos.reduce((acc, p) => acc + p.faturamento, 0)
    if (!total) return 0
    return d.produtos.reduce((acc, p) => acc + p.margem * (p.faturamento / total), 0)
  }, [d.produtos])

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Produtos</h2>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-muted-foreground">Ano:</label>
          <select
            value={anoSelecionado}
            onChange={(e) => setAnoSelecionado(e.target.value)}
            className="border border-border rounded-md px-3 py-2 text-sm bg-white"
          >
            {ANOS.map(ano => (
              <option key={ano} value={ano}>{ano}</option>
            ))}
          </select>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos Ativos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{d.produtos.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Portfolio completo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volume Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(d.metricas.totalToneladas, 0)} t</div>
            <p className="text-xs text-muted-foreground mt-1">
              Principal: {d.produtos[0]?.produto ?? '—'} ({formatPercent(d.produtos[0]?.participacao ?? 0)})
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(d.metricas.faturamentoTotal)}</div>
            <p className="text-xs text-muted-foreground mt-1">Consolidado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Margem Média</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercent(margemMedia)}</div>
            <p className="text-xs text-muted-foreground mt-1">Ponderada por faturamento</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Volume por Produto</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={d.produtos.slice(0, 10)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="#64748b"
                  tickFormatter={(v) => `${formatNumber(v / 1000, 0)}k`} />
                <YAxis dataKey="produto" type="category" width={140} tick={{ fontSize: 10 }} stroke="#64748b" />
                <Tooltip formatter={(v: number) => [`${formatNumber(v, 0)} t`, 'Toneladas']} />
                <Bar dataKey="toneladas" fill="#ff6b35" name="Toneladas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Margem por Produto</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={produtosOrdenadosMargem} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="#64748b"
                  tickFormatter={(v) => `${v.toFixed(1)}%`} />
                <YAxis dataKey="produto" type="category" width={140} tick={{ fontSize: 10 }} stroke="#64748b" />
                <Tooltip formatter={(v: number) => [formatPercent(v), 'Margem']} />
                <Bar dataKey="margem" fill="#2d5a3d" name="Margem %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Evolução anual dos principais produtos */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução Anual por Produto (Top 4)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data.vendasPorAno.map(v => {
                const entry: Record<string, string | number> = { ano: v.ano }
                // pegar os top 4 produtos globais e buscar por ano
                data.produtos.slice(0, 4).forEach(p => {
                  const prod = data.porAno[v.ano]?.produtos.find(x => x.produto === p.produto)
                  entry[p.produto] = prod?.toneladas ?? 0
                })
                return entry
              })}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="ano" stroke="#64748b" />
              <YAxis stroke="#64748b" tickFormatter={(v) => `${formatNumber(v / 1000, 0)}k`} />
              <Tooltip formatter={(v: number) => [`${formatNumber(v, 0)} t`]} />
              <Legend />
              {data.produtos.slice(0, 4).map((p, i) => (
                <Bar
                  key={p.produto}
                  dataKey={p.produto}
                  stackId="a"
                  fill={['#ff6b35', '#2d5a3d', '#1d4ed8', '#9333ea'][i]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Detalhada por Produto</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Toneladas</TableHead>
                <TableHead className="text-right">Participação</TableHead>
                <TableHead className="text-right">Faturamento</TableHead>
                <TableHead className="text-right">Pedidos</TableHead>
                <TableHead className="text-right">Preço Médio</TableHead>
                <TableHead className="text-right">Margem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {d.produtos.map((p, idx) => (
                <TableRow key={p.produto}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell className="font-semibold">{p.produto}</TableCell>
                  <TableCell className="text-right">{formatNumber(p.toneladas, 0)}</TableCell>
                  <TableCell className="text-right">{formatPercent(p.participacao)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(p.faturamento)}</TableCell>
                  <TableCell className="text-right">{p.contratos}</TableCell>
                  <TableCell className="text-right">{formatCurrency(p.precoMedio)}/t</TableCell>
                  <TableCell className="text-right">
                    <span className={`font-semibold ${p.margem >= 4 ? 'text-success' : 'text-muted-foreground'}`}>
                      {formatPercent(p.margem)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
