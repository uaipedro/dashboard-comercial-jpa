export interface Contrato {
  id: string
  codContrato: string
  codPedido: string
  vendedor: string
  cliente: string
  codCliente: number
  produto: string
  pesoTon: number
  precoVendido: number
  valorTotal: number
  margem: number
  margemPercent: number
  dataEmissao: string
  prazoMedio: number
  uf: string
  destino: string
  status: 'ATIVO' | 'FINALIZADO' | 'CANCELADO'
}

export interface MetricasGerais {
  totalContratos: number
  totalClientes: number
  totalToneladas: number
  faturamentoTotal: number
  margemMedia: number
  ticketMedio: number
}

export interface VendedorPerformance {
  vendedor: string
  totalContratos: number
  totalToneladas: number
  faturamento: number
  margemMedia: number
  ticketMedio: number
}

export interface ProdutoResumo {
  produto: string
  totalToneladas: number
  faturamento: number
  participacao: number
}

export interface ClienteResumo {
  cliente: string
  codCliente: number
  totalContratos: number
  totalToneladas: number
  faturamento: number
  uf: string
}

export interface FiltrosData {
  dataInicio?: string
  dataFim?: string
  vendedor?: string
  produto?: string
  uf?: string
}
