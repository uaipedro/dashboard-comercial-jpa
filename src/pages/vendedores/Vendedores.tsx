import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils'
import { Users, TrendingUp, Target, Award } from 'lucide-react'
import type { RealData } from '@/types'
import rawData from '@/data/realData.json'

const data = rawData as RealData

const ANOS = ['Todos', ...data.anosDisponiveis]

export function Vendedores() {
  const [anoSelecionado, setAnoSelecionado] = useState('Todos')

  const d = useMemo(() => {
    if (anoSelecionado === 'Todos') {
      return {
        metricas:      data.metricas,
        topVendedores: data.topVendedores,
      }
    }
    const ano = data.porAno[anoSelecionado]
    return {
      metricas:      ano.metricas,
      topVendedores: ano.topVendedores,
    }
  }, [anoSelecionado])

  const vendedoresOrdenadosMargem = useMemo(
    () => [...d.topVendedores].sort((a, b) => b.margem - a.margem),
    [d.topVendedores]
  )

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
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

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendedores Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{d.topVendedores.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Time comercial</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volume Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(d.metricas.totalToneladas, 0)} t</div>
            <p className="text-xs text-muted-foreground mt-1">Consolidado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pedidos</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(d.metricas.totalContratos, 0)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Média {formatNumber(d.metricas.totalContratos / Math.max(d.topVendedores.length, 1), 0)} por vendedor
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Margem Média</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercent(d.metricas.margemMedia)}</div>
            <p className="text-xs text-muted-foreground mt-1">Performance consolidada</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ranking por Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={d.topVendedores.slice(0, 10)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="#64748b"
                  tickFormatter={(v) => `${formatNumber(v / 1000, 0)}k`} />
                <YAxis dataKey="vendedor" type="category" width={100} tick={{ fontSize: 11 }} stroke="#64748b" />
                <Tooltip formatter={(v: number) => [`${formatNumber(v, 0)} t`, 'Toneladas']} />
                <Bar dataKey="toneladas" fill="#ff6b35" name="Toneladas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Margem por Vendedor</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={vendedoresOrdenadosMargem.slice(0, 10)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="#64748b"
                  tickFormatter={(v) => `${v.toFixed(1)}%`} />
                <YAxis dataKey="vendedor" type="category" width={100} tick={{ fontSize: 11 }} stroke="#64748b" />
                <Tooltip formatter={(v: number) => [formatPercent(v), 'Margem']} />
                <Bar dataKey="margem" fill="#2d5a3d" name="Margem %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabela */}
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
                <TableHead className="text-right">Pedidos</TableHead>
                <TableHead className="text-right">Clientes</TableHead>
                <TableHead className="text-right">Margem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {d.topVendedores.map((v, idx) => (
                <TableRow key={v.vendedor}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell className="font-semibold">{v.vendedor}</TableCell>
                  <TableCell className="text-right">{formatNumber(v.toneladas, 0)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(v.faturamento)}</TableCell>
                  <TableCell className="text-right">{v.contratos}</TableCell>
                  <TableCell className="text-right">{v.clientes}</TableCell>
                  <TableCell className="text-right">
                    <span className={`font-semibold ${v.margem >= 3.0 ? 'text-success' : 'text-muted-foreground'}`}>
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
