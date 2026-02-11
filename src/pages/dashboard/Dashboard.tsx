import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Package, DollarSign, Percent } from 'lucide-react'
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils'
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { 
  vendasPorMes, vendasPorAno, topVendedores, 
  topClientes, produtoDistribuicao 
} from '@/data/mockData'

const COLORS = ['#ff6b35', '#2d5a3d', '#1d4ed8', '#9333ea', '#f59e0b']
const ANOS = ['2021', '2022', '2023', '2024', 'Todos']

// Métricas consolidadas
const metrics = {
  totalClientes: 1247,
  totalToneladas: 435132,
  faturamentoTotal: 678600000,
  margemMedia: 2.03
}

export function Dashboard() {
  const [anoSelecionado, setAnoSelecionado] = useState('Todos')

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

      {/* Métricas Principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Clientes Ativos
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(metrics.totalClientes, 0)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Base consolidada 4 anos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Volume Total
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(metrics.totalToneladas, 0)} t</div>
            <p className="text-xs text-success mt-1">
              +18% vs ano anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Faturamento
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.faturamentoTotal)}</div>
            <p className="text-xs text-success mt-1">
              +12.5% vs ano anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Margem Média
            </CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercent(metrics.margemMedia)}</div>
            <p className="text-xs text-success mt-1">
              +0.3pp vs ano anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos Principais */}
      <div className="grid gap-4 md:grid-cols-7">
        {/* Evolução de Vendas */}
        <Card className="col-span-7 lg:col-span-4">
          <CardHeader>
            <CardTitle>Evolução de Vendas Mensais</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={vendasPorMes.slice(-12)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="mes" 
                  tick={{ fontSize: 12 }}
                  stroke="#64748b"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#64748b"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.625rem'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="toneladas" 
                  stroke="#ff6b35" 
                  strokeWidth={2}
                  name="Toneladas"
                />
                <Line 
                  type="monotone" 
                  dataKey="faturamento" 
                  stroke="#2d5a3d" 
                  strokeWidth={2}
                  name="Faturamento (Mi)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribuição por Produto */}
        <Card className="col-span-7 lg:col-span-3">
          <CardHeader>
            <CardTitle>Distribuição por Produto</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={produtoDistribuicao}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={(entry: any) => {
                    // Só mostrar label se participação > 2%
                    if (entry.participacao > 2) {
                      return `${entry.produto}\n(${formatPercent(entry.participacao, 1)})`
                    }
                    return ''
                  }}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="participacao"
                >
                  {produtoDistribuicao.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.625rem'
                  }}
                />
                <Legend 
                  verticalAlign="bottom"
                  height={36}
                  formatter={(_value, entry: any) => 
                    `${entry.payload.produto} (${formatPercent(entry.payload.participacao, 1)})`
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance por Ano */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Anual Consolidada</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vendasPorAno}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="ano" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.625rem'
                }}
              />
              <Legend />
              <Bar dataKey="toneladas" fill="#ff6b35" name="Toneladas" />
              <Bar dataKey="faturamento" fill="#2d5a3d" name="Faturamento (Mi)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Rankings */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Top Vendedores */}
        <Card>
          <CardHeader>
            <CardTitle>Top Vendedores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topVendedores.slice(0, 5).map((v, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {idx + 1}
                  </div>
                  <div className="ml-4 space-y-1 flex-1">
                    <p className="text-sm font-medium leading-none">{v.vendedor}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatNumber(v.toneladas, 0)} t • Margem {formatPercent(v.margem)}
                    </p>
                  </div>
                  <div className="font-medium text-sm">{formatCurrency(v.faturamento * 1000000)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Clientes */}
        <Card>
          <CardHeader>
            <CardTitle>Top Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topClientes.map((c, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10 text-sm font-bold text-success">
                    {idx + 1}
                  </div>
                  <div className="ml-4 space-y-1 flex-1">
                    <p className="text-sm font-medium leading-none">{c.cliente}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatNumber(c.toneladas, 0)} t • {c.uf}
                    </p>
                  </div>
                  <div className="font-medium text-sm">{formatCurrency(c.faturamento * 1000000)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
