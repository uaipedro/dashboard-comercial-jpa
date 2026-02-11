import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils'
import { Users, TrendingUp, Target, Award } from 'lucide-react'

const ANOS = ['2021', '2022', '2023', '2024', 'Todos']

// Performance detalhada por vendedor
const vendedoresDetalhados = [
  { vendedor: 'Bruno', toneladas: 28543, faturamento: 42.8, margem: 2.1, contratos: 234, ticketMedio: 183.0, clientes: 187 },
  { vendedor: 'Gabriel', toneladas: 26234, faturamento: 39.4, margem: 1.8, contratos: 278, ticketMedio: 141.7, clientes: 201 },
  { vendedor: 'Geordanny', toneladas: 22145, faturamento: 35.2, margem: 2.4, contratos: 189, ticketMedio: 186.2, clientes: 156 },
  { vendedor: 'Fabio', toneladas: 19876, faturamento: 29.8, margem: 1.9, contratos: 167, ticketMedio: 178.4, clientes: 134 },
  { vendedor: 'Drielly', toneladas: 17234, faturamento: 26.5, margem: 2.2, contratos: 145, ticketMedio: 182.8, clientes: 112 },
  { vendedor: 'Andre', toneladas: 15432, faturamento: 23.1, margem: 1.6, contratos: 134, ticketMedio: 172.4, clientes: 98 },
  { vendedor: 'Michele', toneladas: 12543, faturamento: 18.9, margem: 1.8, contratos: 112, ticketMedio: 168.8, clientes: 87 },
]

// Evolução mensal dos top 3
const evolucaoVendedores = [
  { mes: 'Jan', Bruno: 2234, Gabriel: 2187, Geordanny: 1965 },
  { mes: 'Fev', Bruno: 2098, Gabriel: 2234, Geordanny: 1876 },
  { mes: 'Mar', Bruno: 2543, Gabriel: 2321, Geordanny: 2098 },
  { mes: 'Abr', Bruno: 2187, Gabriel: 1987, Geordanny: 1765 },
  { mes: 'Mai', Bruno: 2321, Gabriel: 2109, Geordanny: 1898 },
  { mes: 'Jun', Bruno: 2109, Gabriel: 2023, Geordanny: 1743 },
  { mes: 'Jul', Bruno: 2456, Gabriel: 2287, Geordanny: 2021 },
  { mes: 'Ago', Bruno: 2678, Gabriel: 2456, Geordanny: 2187 },
  { mes: 'Set', Bruno: 2543, Gabriel: 2345, Geordanny: 2012 },
  { mes: 'Out', Bruno: 2598, Gabriel: 2398, Geordanny: 2109 },
  { mes: 'Nov', Bruno: 2234, Gabriel: 2165, Geordanny: 1876 },
  { mes: 'Dez', Bruno: 2542, Gabriel: 2322, Geordanny: 1595 },
]

export function Vendedores() {
  const [anoSelecionado, setAnoSelecionado] = useState('Todos')

  const totalToneladas = vendedoresDetalhados.reduce((acc, v) => acc + v.toneladas, 0)
  const margemMedia = vendedoresDetalhados.reduce((acc, v) => acc + v.margem, 0) / vendedoresDetalhados.length
  const totalContratos = vendedoresDetalhados.reduce((acc, v) => acc + v.contratos, 0)

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header com filtro */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Vendedores</h2>
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
            <CardTitle className="text-sm font-medium">Vendedores Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendedoresDetalhados.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Time comercial</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volume Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalToneladas, 0)} t</div>
            <p className="text-xs text-success mt-1">100% da base</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contratos Totais</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalContratos, 0)}</div>
            <p className="text-xs text-muted-foreground mt-1">Média {formatNumber(totalContratos / vendedoresDetalhados.length, 0)} por vendedor</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Margem Média</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercent(margemMedia)}</div>
            <p className="text-xs text-muted-foreground mt-1">Performance consolidada</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Performance Comparativa */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Evolução Mensal - Top 3 Vendedores</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={evolucaoVendedores}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="mes" tick={{ fontSize: 12 }} stroke="#64748b" />
                <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Bruno" stroke="#ff6b35" strokeWidth={2} />
                <Line type="monotone" dataKey="Gabriel" stroke="#2d5a3d" strokeWidth={2} />
                <Line type="monotone" dataKey="Geordanny" stroke="#1d4ed8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Ranking por Volume */}
        <Card>
          <CardHeader>
            <CardTitle>Ranking por Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vendedoresDetalhados} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="#64748b" />
                <YAxis dataKey="vendedor" type="category" width={80} tick={{ fontSize: 11 }} stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="toneladas" fill="#ff6b35" name="Toneladas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Ranking por Margem */}
        <Card>
          <CardHeader>
            <CardTitle>Margem por Vendedor</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vendedoresDetalhados.sort((a, b) => b.margem - a.margem)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="#64748b" />
                <YAxis dataKey="vendedor" type="category" width={80} tick={{ fontSize: 11 }} stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="margem" fill="#2d5a3d" name="Margem %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabela Detalhada */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Detalhada por Vendedor</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead className="text-right">Toneladas</TableHead>
                <TableHead className="text-right">Faturamento</TableHead>
                <TableHead className="text-right">Contratos</TableHead>
                <TableHead className="text-right">Clientes</TableHead>
                <TableHead className="text-right">Ticket Médio</TableHead>
                <TableHead className="text-right">Margem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendedoresDetalhados.map((v, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell className="font-semibold">{v.vendedor}</TableCell>
                  <TableCell className="text-right">{formatNumber(v.toneladas, 0)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(v.faturamento * 1000000)}</TableCell>
                  <TableCell className="text-right">{v.contratos}</TableCell>
                  <TableCell className="text-right">{v.clientes}</TableCell>
                  <TableCell className="text-right">{formatCurrency(v.ticketMedio * 1000)}</TableCell>
                  <TableCell className="text-right">
                    <span className={`font-semibold ${v.margem >= 2.0 ? 'text-success' : 'text-muted-foreground'}`}>
                      {formatPercent(v.margem)}
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
