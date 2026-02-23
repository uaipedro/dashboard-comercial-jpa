export interface VendaMes {
  ano: number
  mes: number
  mesLabel: string
  toneladas: number
  faturamento: number
}

export interface VendaAno {
  ano: string
  toneladas: number
  faturamento: number
  margem: number
}

export interface Vendedor {
  vendedor: string
  toneladas: number
  faturamento: number
  margem: number
  contratos: number
  clientes: number
}

export interface Cliente {
  cliente: string
  codCliente: number
  toneladas: number
  faturamento: number
  margem: number
  uf: string
  contratos: number
}

export interface ClienteUF {
  uf: string
  toneladas: number
  clientes: number
  participacao: number
}

export interface Produto {
  produto: string
  toneladas: number
  faturamento: number
  margem: number
  participacao: number
  contratos: number
  precoMedio: number
}

export interface Metricas {
  totalToneladas: number
  faturamentoTotal: number
  margemTotal: number
  margemMedia: number
  totalClientes: number
  totalContratos: number
  ticketMedio: number
}

export interface DadosPorAno {
  metricas: Metricas
  vendasPorMes: VendaMes[]
  topVendedores: Vendedor[]
  topClientes: Cliente[]
  clientesPorUF: ClienteUF[]
  produtos: Produto[]
}

export interface RealData {
  anosDisponiveis: string[]
  metricas: Metricas
  vendasPorMes: VendaMes[]
  vendasPorAno: VendaAno[]
  topVendedores: Vendedor[]
  topClientes: Cliente[]
  clientesPorUF: ClienteUF[]
  produtos: Produto[]
  porAno: Record<string, DadosPorAno>
}
