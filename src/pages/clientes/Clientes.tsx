import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils'
import { Users, TrendingUp, MapPin } from 'lucide-react'
import type { RealData } from '@/types'
import rawData from '@/data/realData.json'

const data = rawData as RealData

const CORES = ['#ff6b35', '#2d5a3d', '#1d4ed8', '#9333ea', '#f59e0b']
const ANOS = ['Todos', ...data.anosDisponiveis]

export function Clientes() {
  const [anoSelecionado, setAnoSelecionado] = useState('Todos')

  const d = useMemo(() => {
    if (anoSelecionado === 'Todos') {
      return {
        metricas:      data.metricas,
        topClientes:   data.topClientes,
        clientesPorUF: data.clientesPorUF,
      }
    }
    const ano = data.porAno[anoSelecionado]
    return {
      metricas:      ano.metricas,
      topClientes:   ano.topClientes,
      clientesPorUF: ano.clientesPorUF,
    }
  }, [anoSelecionado])

  const totalUFs = d.clientesPorUF.length
  const ufPrincipal = d.clientesPorUF[0]

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
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
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(d.metricas.totalClientes, 0)}</div>
            <p className="text-xs text-muted-foreground mt-1">Base ativa</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(d.metricas.ticketMedio)}</div>
            <p className="text-xs text-muted-foreground mt-1">Por pedido</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estados Atendidos</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUFs} UFs</div>
            {ufPrincipal && (
              <p className="text-xs text-muted-foreground mt-1">
                Concentração em {ufPrincipal.uf} ({formatPercent(ufPrincipal.participacao)})
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top 10 Clientes por Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={d.topClientes.slice(0, 10)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="#64748b"
                  tickFormatter={(v) => `${formatNumber(v / 1000, 0)}k`} />
                <YAxis dataKey="cliente" type="category" width={150} tick={{ fontSize: 10 }} stroke="#64748b" />
                <Tooltip
                  formatter={(v: number) => [`${formatNumber(v, 0)} t`, 'Toneladas']}
                />
                <Bar dataKey="toneladas" fill="#ff6b35" name="Toneladas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição Geográfica</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={d.clientesPorUF.slice(0, 6)}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="participacao"
                  label={(entry) => `${entry.uf} (${entry.participacao.toFixed(1)}%)`}
                  labelLine={false}
                >
                  {d.clientesPorUF.slice(0, 6).map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: number, _name, entry) => [
                    `${formatNumber(entry.payload.toneladas, 0)} t (${formatPercent(v)})`,
                    entry.payload.uf
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabela */}
      <Card>
        <CardHeader>
          <CardTitle>Ranking Completo de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>UF</TableHead>
                <TableHead className="text-right">Toneladas</TableHead>
                <TableHead className="text-right">Faturamento</TableHead>
                <TableHead className="text-right">Pedidos</TableHead>
                <TableHead className="text-right">Margem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {d.topClientes.map((c, idx) => (
                <TableRow key={c.codCliente || idx}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell>{c.cliente}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-primary/10 text-primary">
                      {c.uf}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{formatNumber(c.toneladas, 0)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(c.faturamento)}</TableCell>
                  <TableCell className="text-right">{c.contratos}</TableCell>
                  <TableCell className="text-right">{formatPercent(c.margem)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
