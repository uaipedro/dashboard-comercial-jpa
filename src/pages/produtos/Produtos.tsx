import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts'
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils'
import { Package, TrendingUp, DollarSign, Percent } from 'lucide-react'

const ANOS = ['2021', '2022', '2023', '2024', 'Todos']

// Produtos detalhados
const produtosDetalhados = [
  { 
    produto: 'Polpa Cítrica', 
    toneladas: 120543, 
    faturamento: 181.2, 
    participacao: 94.5, 
    margem: 1.85,
    contratos: 1089,
    precoMedio: 1503
  },
  { 
    produto: 'Farelo de Soja', 
    toneladas: 4234, 
    faturamento: 6.8, 
    participacao: 3.3, 
    margem: 3.2,
    contratos: 87,
    precoMedio: 1606
  },
  { 
    produto: 'Milho', 
    toneladas: 2134, 
    faturamento: 3.4, 
    participacao: 1.7, 
    margem: 2.8,
    contratos: 45,
    precoMedio: 1593
  },
  { 
    produto: 'Sorgo', 
    toneladas: 421, 
    faturamento: 0.6, 
    participacao: 0.3, 
    margem: 2.1,
    contratos: 12,
    precoMedio: 1425
  },
  { 
    produto: 'Caroço de Algodão', 
    toneladas: 200, 
    faturamento: 0.3, 
    participacao: 0.2, 
    margem: 1.9,
    contratos: 8,
    precoMedio: 1500
  },
]

// Evolução anual por produto
const evolucaoProdutos = [
  { ano: '2021', 'Polpa Cítrica': 27543, 'Farelo de Soja': 987, 'Milho': 456, 'Outros': 145 },
  { ano: '2022', 'Polpa Cítrica': 29876, 'Farelo de Soja': 1098, 'Milho': 523, 'Outros': 187 },
  { ano: '2023', 'Polpa Cítrica': 31234, 'Farelo de Soja': 1123, 'Milho': 576, 'Outros': 201 },
  { ano: '2024', 'Polpa Cítrica': 31890, 'Farelo de Soja': 1026, 'Milho': 579, 'Outros': 88 },
]

// Evolução mensal Polpa Cítrica (principal produto)
const evolucaoMensalPolpa = [
  { mes: 'Jan', toneladas: 9234, precoMedio: 1489 },
  { mes: 'Fev', toneladas: 8765, precoMedio: 1502 },
  { mes: 'Mar', toneladas: 10234, precoMedio: 1515 },
  { mes: 'Abr', toneladas: 7543, precoMedio: 1498 },
  { mes: 'Mai', toneladas: 8123, precoMedio: 1505 },
  { mes: 'Jun', toneladas: 7891, precoMedio: 1512 },
  { mes: 'Jul', toneladas: 9543, precoMedio: 1507 },
  { mes: 'Ago', toneladas: 10876, precoMedio: 1520 },
  { mes: 'Set', toneladas: 9987, precoMedio: 1518 },
  { mes: 'Out', toneladas: 10345, precoMedio: 1525 },
  { mes: 'Nov', toneladas: 8543, precoMedio: 1510 },
  { mes: 'Dez', toneladas: 9459, precoMedio: 1503 },
]

export function Produtos() {
  const [anoSelecionado, setAnoSelecionado] = useState('Todos')

  const totalToneladas = produtosDetalhados.reduce((acc, p) => acc + p.toneladas, 0)
  const faturamentoTotal = produtosDetalhados.reduce((acc, p) => acc + p.faturamento, 0)

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header com filtro */}
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

      {/* Métricas Principais */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos Ativos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{produtosDetalhados.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Portfolio completo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volume Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalToneladas, 0)} t</div>
            <p className="text-xs text-success mt-1">Polpa: 94.5%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(faturamentoTotal * 1000000)}</div>
            <p className="text-xs text-muted-foreground mt-1">Consolidado 4 anos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Margem Média</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.14%</div>
            <p className="text-xs text-muted-foreground mt-1">Ponderada por volume</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Evolução Anual por Produto */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Evolução Anual por Produto</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={evolucaoProdutos}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="ano" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Legend />
                <Bar dataKey="Polpa Cítrica" stackId="a" fill="#ff6b35" />
                <Bar dataKey="Farelo de Soja" stackId="a" fill="#2d5a3d" />
                <Bar dataKey="Milho" stackId="a" fill="#1d4ed8" />
                <Bar dataKey="Outros" stackId="a" fill="#9333ea" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Participação por Produto */}
        <Card>
          <CardHeader>
            <CardTitle>Participação no Volume Total</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={produtosDetalhados} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="#64748b" />
                <YAxis dataKey="produto" type="category" width={120} tick={{ fontSize: 11 }} stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="participacao" fill="#ff6b35" name="Participação %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Margem por Produto */}
        <Card>
          <CardHeader>
            <CardTitle>Margem por Produto</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={produtosDetalhados.sort((a, b) => b.margem - a.margem)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="#64748b" />
                <YAxis dataKey="produto" type="category" width={120} tick={{ fontSize: 11 }} stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="margem" fill="#2d5a3d" name="Margem %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Análise Polpa Cítrica */}
      <Card>
        <CardHeader>
          <CardTitle>Análise Mensal - Polpa Cítrica (Produto Principal)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={evolucaoMensalPolpa}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="mes" stroke="#64748b" />
              <YAxis yAxisId="left" stroke="#64748b" />
              <YAxis yAxisId="right" orientation="right" stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="toneladas" stroke="#ff6b35" strokeWidth={2} name="Toneladas" />
              <Line yAxisId="right" type="monotone" dataKey="precoMedio" stroke="#2d5a3d" strokeWidth={2} name="Preço Médio (R$)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tabela Detalhada */}
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
                <TableHead className="text-right">Contratos</TableHead>
                <TableHead className="text-right">Preço Médio</TableHead>
                <TableHead className="text-right">Margem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {produtosDetalhados.map((p, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell className="font-semibold">{p.produto}</TableCell>
                  <TableCell className="text-right">{formatNumber(p.toneladas, 0)}</TableCell>
                  <TableCell className="text-right">{formatPercent(p.participacao)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(p.faturamento * 1000000)}</TableCell>
                  <TableCell className="text-right">{p.contratos}</TableCell>
                  <TableCell className="text-right">{formatCurrency(p.precoMedio)}/t</TableCell>
                  <TableCell className="text-right">
                    <span className={`font-semibold ${p.margem >= 2.5 ? 'text-success' : 'text-muted-foreground'}`}>
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
