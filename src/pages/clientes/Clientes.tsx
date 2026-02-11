import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { Users, TrendingUp, MapPin } from 'lucide-react'

const ANOS = ['2021', '2022', '2023', '2024', 'Todos']
const COLORS = ['#ff6b35', '#2d5a3d', '#1d4ed8', '#9333ea', '#f59e0b']

// Dados por UF
const clientesPorUF = [
  { uf: 'MG', clientes: 892, toneladas: 298543, participacao: 71.2 },
  { uf: 'SP', clientes: 178, toneladas: 87234, participacao: 20.1 },
  { uf: 'RJ', clientes: 87, toneladas: 23456, participacao: 5.4 },
  { uf: 'ES', clientes: 54, toneladas: 12987, participacao: 2.9 },
  { uf: 'GO', clientes: 36, toneladas: 1912, participacao: 0.4 },
]

// Top 20 clientes expandido
const clientesDetalhados = [
  { cliente: 'Embare Indústrias Alimentícias', toneladas: 12543, faturamento: 18.8, contratos: 34, uf: 'MG', margem: 1.9 },
  { cliente: 'Cooperativa Bom Despacho', toneladas: 10234, faturamento: 15.4, contratos: 28, uf: 'MG', margem: 2.1 },
  { cliente: 'Rações RGL', toneladas: 8765, faturamento: 13.2, contratos: 25, uf: 'MG', margem: 1.8 },
  { cliente: 'Femil Indústria e Comércio', toneladas: 7654, faturamento: 11.5, contratos: 22, uf: 'MG', margem: 2.0 },
  { cliente: 'Campo Raiz Agronegócio', toneladas: 6543, faturamento: 9.8, contratos: 19, uf: 'MG', margem: 1.7 },
  { cliente: 'Nutrirações Santa Rita', toneladas: 5987, faturamento: 9.1, contratos: 18, uf: 'SP', margem: 2.2 },
  { cliente: 'Cooperativa Central Agroavícola', toneladas: 5432, faturamento: 8.2, contratos: 16, uf: 'MG', margem: 1.9 },
  { cliente: 'Agropecuária Vale do Piranga', toneladas: 4876, faturamento: 7.4, contratos: 15, uf: 'MG', margem: 2.0 },
  { cliente: 'Fazenda Santa Luzia', toneladas: 4321, faturamento: 6.5, contratos: 13, uf: 'SP', margem: 1.8 },
  { cliente: 'Nutrição Animal Ltda', toneladas: 3987, faturamento: 6.0, contratos: 12, uf: 'MG', margem: 2.1 },
  { cliente: 'Cooperativa Agroindustrial Bambuí', toneladas: 3654, faturamento: 5.5, contratos: 11, uf: 'MG', margem: 1.9 },
  { cliente: 'Rações Premium Sul de Minas', toneladas: 3321, faturamento: 5.0, contratos: 10, uf: 'MG', margem: 2.0 },
  { cliente: 'Agropecuária Triângulo Mineiro', toneladas: 2987, faturamento: 4.5, contratos: 9, uf: 'MG', margem: 1.8 },
  { cliente: 'Fazenda Boa Vista', toneladas: 2765, faturamento: 4.2, contratos: 8, uf: 'SP', margem: 2.2 },
  { cliente: 'Laticínios Serra da Canastra', toneladas: 2543, faturamento: 3.8, contratos: 8, uf: 'MG', margem: 1.7 },
  { cliente: 'Nutrirações Passos', toneladas: 2321, faturamento: 3.5, contratos: 7, uf: 'MG', margem: 2.0 },
  { cliente: 'Cooperativa Regional Formiga', toneladas: 2098, faturamento: 3.2, contratos: 6, uf: 'MG', margem: 1.9 },
  { cliente: 'Agropecuária Rio Verde', toneladas: 1876, faturamento: 2.8, contratos: 6, uf: 'GO', margem: 2.1 },
  { cliente: 'Fazenda Monte Alto', toneladas: 1654, faturamento: 2.5, contratos: 5, uf: 'RJ', margem: 1.8 },
  { cliente: 'Rações Campo Alegre', toneladas: 1432, faturamento: 2.2, contratos: 5, uf: 'ES', margem: 2.0 },
]

export function Clientes() {
  const [anoSelecionado, setAnoSelecionado] = useState('Todos')

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header com filtro */}
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

      {/* Métricas Principais */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.247</div>
            <p className="text-xs text-muted-foreground mt-1">Base ativa consolidada</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(544200)}</div>
            <p className="text-xs text-success mt-1">+8.5% vs ano anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estados Atendidos</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 UFs</div>
            <p className="text-xs text-muted-foreground mt-1">Concentração em MG (71%)</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Top 10 por Volume */}
        <Card>
          <CardHeader>
            <CardTitle>Top 10 Clientes por Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={clientesDetalhados.slice(0, 10)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="#64748b" />
                <YAxis dataKey="cliente" type="category" width={150} tick={{ fontSize: 11 }} stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="toneladas" fill="#ff6b35" name="Toneladas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribuição por UF */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição Geográfica</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={clientesPorUF}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => `${entry.uf} (${entry.participacao}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="participacao"
                >
                  {clientesPorUF.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabela Detalhada */}
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
                <TableHead className="text-right">Contratos</TableHead>
                <TableHead className="text-right">Margem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientesDetalhados.map((c, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell>{c.cliente}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-primary/10 text-primary">
                      {c.uf}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{formatNumber(c.toneladas, 0)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(c.faturamento * 1000000)}</TableCell>
                  <TableCell className="text-right">{c.contratos}</TableCell>
                  <TableCell className="text-right">{c.margem}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
