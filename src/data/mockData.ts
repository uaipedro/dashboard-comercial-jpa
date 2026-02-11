// Dados mock para o dashboard - 2021-2024

export const vendasPorMes = [
  { mes: 'Jan/21', toneladas: 8234, faturamento: 12.5 },
  { mes: 'Fev/21', toneladas: 7892, faturamento: 11.8 },
  { mes: 'Mar/21', toneladas: 9456, faturamento: 14.2 },
  { mes: 'Abr/21', toneladas: 6543, faturamento: 9.8 },
  { mes: 'Mai/21', toneladas: 7123, faturamento: 10.7 },
  { mes: 'Jun/21', toneladas: 6891, faturamento: 10.3 },
  { mes: 'Jul/21', toneladas: 8734, faturamento: 13.1 },
  { mes: 'Ago/21', toneladas: 9823, faturamento: 14.7 },
  { mes: 'Set/21', toneladas: 8965, faturamento: 13.4 },
  { mes: 'Out/21', toneladas: 9234, faturamento: 13.8 },
  { mes: 'Nov/21', toneladas: 7654, faturamento: 11.5 },
  { mes: 'Dez/21', toneladas: 8123, faturamento: 12.2 },
  { mes: 'Jan/22', toneladas: 8945, faturamento: 13.9 },
  { mes: 'Fev/22', toneladas: 8234, faturamento: 12.8 },
  { mes: 'Mar/22', toneladas: 10234, faturamento: 15.9 },
  { mes: 'Abr/22', toneladas: 7234, faturamento: 11.2 },
  { mes: 'Mai/22', toneladas: 7891, faturamento: 12.3 },
  { mes: 'Jun/22', toneladas: 7456, faturamento: 11.6 },
  { mes: 'Jul/22', toneladas: 9456, faturamento: 14.7 },
  { mes: 'Ago/22', toneladas: 10567, faturamento: 16.4 },
  { mes: 'Set/22', toneladas: 9678, faturamento: 15.0 },
  { mes: 'Out/22', toneladas: 9987, faturamento: 15.5 },
  { mes: 'Nov/22', toneladas: 8234, faturamento: 12.8 },
  { mes: 'Dez/22', toneladas: 8765, faturamento: 13.6 },
]

export const vendasPorAno = [
  { ano: '2021', toneladas: 98672, faturamento: 147.0, margem: 1.85 },
  { ano: '2022', toneladas: 105881, faturamento: 165.7, margem: 1.92 },
  { ano: '2023', toneladas: 112345, faturamento: 178.3, margem: 2.01 },
  { ano: '2024', toneladas: 118234, faturamento: 187.6, margem: 2.15 },
]

export const topVendedores = [
  { vendedor: 'Bruno', toneladas: 28543, faturamento: 42.8, margem: 2.1, contratos: 234 },
  { vendedor: 'Gabriel', toneladas: 26234, faturamento: 39.4, margem: 1.8, contratos: 278 },
  { vendedor: 'Geordanny', toneladas: 22145, faturamento: 35.2, margem: 2.4, contratos: 189 },
  { vendedor: 'Fabio', toneladas: 19876, faturamento: 29.8, margem: 1.9, contratos: 167 },
  { vendedor: 'Drielly', toneladas: 17234, faturamento: 26.5, margem: 2.2, contratos: 145 },
  { vendedor: 'Andre', toneladas: 15432, faturamento: 23.1, margem: 1.6, contratos: 134 },
  { vendedor: 'Michele', toneladas: 12543, faturamento: 18.9, margem: 1.8, contratos: 112 },
]

export const topClientes = [
  { cliente: 'Embare Indústrias', toneladas: 12543, faturamento: 18.8, uf: 'MG' },
  { cliente: 'Cooperativa Bom Despacho', toneladas: 10234, faturamento: 15.4, uf: 'MG' },
  { cliente: 'Rações RGL', toneladas: 8765, faturamento: 13.2, uf: 'MG' },
  { cliente: 'Femil Indústria', toneladas: 7654, faturamento: 11.5, uf: 'MG' },
  { cliente: 'Campo Raiz Agronegócio', toneladas: 6543, faturamento: 9.8, uf: 'MG' },
]

export const produtoDistribuicao = [
  { produto: 'Polpa Cítrica', toneladas: 120543, participacao: 94.5 },
  { produto: 'Farelo de Soja', toneladas: 4234, participacao: 3.3 },
  { produto: 'Milho', toneladas: 2134, participacao: 1.7 },
  { produto: 'Outros', toneladas: 621, participacao: 0.5 },
]

export const margemPorProduto = [
  { produto: 'Polpa Cítrica', margem: 1.85, volume: 120543 },
  { produto: 'Farelo de Soja', margem: 3.2, volume: 4234 },
  { produto: 'Milho', margem: 2.8, volume: 2134 },
]
