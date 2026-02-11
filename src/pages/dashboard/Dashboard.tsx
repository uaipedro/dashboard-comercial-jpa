import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Users, Package, DollarSign } from 'lucide-react'
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils'

// Dados mock - serão substituídos por dados reais da API
const mockMetrics = {
  totalClientes: 1247,
  totalToneladas: 127543.5,
  faturamentoTotal: 187654320.50,
  margemMedia: 1.85
}

export function Dashboard() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="text-sm text-muted-foreground">
          Período: 2021-2024
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
            <div className="text-2xl font-bold">{formatNumber(mockMetrics.totalClientes, 0)}</div>
            <p className="text-xs text-muted-foreground">
              Base consolidada 2021-2024
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Toneladas
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(mockMetrics.totalToneladas, 1)}</div>
            <p className="text-xs text-muted-foreground">
              Volume acumulado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Faturamento Total
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(mockMetrics.faturamentoTotal)}</div>
            <p className="text-xs text-muted-foreground">
              Receita acumulada
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Margem Média
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercent(mockMetrics.margemMedia)}</div>
            <p className="text-xs text-muted-foreground">
              Performance consolidada
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Área de Gráficos - Em desenvolvimento */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Evolução de Vendas</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Gráfico em desenvolvimento...
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Polpa Cítrica</p>
                  <p className="text-sm text-muted-foreground">
                    {formatNumber(121000, 0)} ton
                  </p>
                </div>
                <div className="ml-auto font-medium">95%</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Farelo de Soja</p>
                  <p className="text-sm text-muted-foreground">
                    {formatNumber(4200, 0)} ton
                  </p>
                </div>
                <div className="ml-auto font-medium">3%</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Milho</p>
                  <p className="text-sm text-muted-foreground">
                    {formatNumber(2343, 0)} ton
                  </p>
                </div>
                <div className="ml-auto font-medium">2%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
