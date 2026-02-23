import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Package, DollarSign, Percent } from 'lucide-react'
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import type { RealData } from '@/types'
import rawData from '@/data/realData.json'

const data = rawData as RealData

const COLORS = ['#ff6b35', '#2d5a3d', '#1d4ed8', '#9333ea', '#f59e0b']
const ANOS = ['Todos', ...data.anosDisponiveis]

export function Dashboard() {
  const [anoSelecionado, setAnoSelecionado] = useState('Todos')

  const d = useMemo(() => {
    if (anoSelecionado === 'Todos') {
      return {
        metricas:      data.metricas,
        vendasPorMes:  data.vendasPorMes,
        topVendedores: data.topVendedores,
        topClientes:   data.topClientes,
        produtos:      data.produtos,
      }
    }
    const ano = data.porAno[anoSelecionado]
    return {
      metricas:      ano.metricas,
      vendasPorMes:  ano.vendasPorMes,
      topVendedores: ano.topVendedores,
      topClientes:   ano.topClientes,
      produtos:      ano.produtos,
    }
  }, [anoSelecionado])

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Comercial</h2>
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(d.metricas.totalClientes, 0)}</div>
            <p className="text-xs text-muted-foreground mt-1">Base de clientes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volume Total</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(d.metricas.totalToneladas, 0)} t</div>
            <p className="text-xs text-muted-foreground mt-1">
              {formatNumber(d.metricas.totalContratos, 0)} pedidos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(d.metricas.faturamentoTotal)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Ticket médio {formatCurrency(d.metricas.ticketMedio)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Margem Média</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercent(d.metricas.margemMedia)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {formatCurrency(d.metricas.margemTotal)} total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos principais */}
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-7 lg:col-span-4">
          <CardHeader>
            <CardTitle>Evolução de Vendas Mensais</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={d.vendasPorMes}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="mesLabel" tick={{ fontSize: 11 }} stroke="#64748b" />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} stroke="#64748b" />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.625rem'
                  }}
                  formatter={(value: number, name: string) =>
                    name === 'Toneladas'
                      ? [`${formatNumber(value, 0)} t`, name]
                      : [formatCurrency(value), name]
                  }
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="toneladas"
                  stroke="#ff6b35"
                  strokeWidth={2}
                  name="Toneladas"
                  dot={false}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="faturamento"
                  stroke="#2d5a3d"
                  strokeWidth={2}
                  name="Faturamento (R$)"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-7 lg:col-span-3">
          <CardHeader>
            <CardTitle>Distribuição por Produto</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={d.produtos.slice(0, 5)}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="participacao"
                  label={(entry) =>
                    entry.participacao > 3 ? `${entry.participacao.toFixed(1)}%` : ''
                  }
                >
                  {d.produtos.slice(0, 5).map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.625rem'
                  }}
                  formatter={(value: number, _name, entry) => [
                    `${formatNumber(entry.payload.toneladas, 0)} t (${formatPercent(value)})`,
                    entry.payload.produto
                  ]}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(_value, entry) => entry.payload.produto}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance anual */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Anual Consolidada</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.vendasPorAno}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="ano" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.625rem'
                }}
                formatter={(value: number, name: string) =>
                  name === 'Toneladas'
                    ? [`${formatNumber(value, 0)} t`, name]
                    : [formatCurrency(value), name]
                }
              />
              <Legend />
              <Bar dataKey="toneladas" fill="#ff6b35" name="Toneladas" />
              <Bar dataKey="faturamento" fill="#2d5a3d" name="Faturamento (R$)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Rankings */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Vendedores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {d.topVendedores.slice(0, 5).map((v, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {idx + 1}
                  </div>
                  <div className="ml-4 space-y-1 flex-1">
                    <p className="text-sm font-medium leading-none">{v.vendedor}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatNumber(v.toneladas, 0)} t · Margem {formatPercent(v.margem)}
                    </p>
                  </div>
                  <div className="font-medium text-sm">{formatCurrency(v.faturamento)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {d.topClientes.slice(0, 5).map((c, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10 text-sm font-bold text-success">
                    {idx + 1}
                  </div>
                  <div className="ml-4 space-y-1 flex-1">
                    <p className="text-sm font-medium leading-none">{c.cliente}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatNumber(c.toneladas, 0)} t · {c.uf}
                    </p>
                  </div>
                  <div className="font-medium text-sm">{formatCurrency(c.faturamento)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
