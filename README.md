# Dashboard Comercial JPA 📊

> Plataforma de inteligência comercial - JPA Agro e Serviços

## 🚀 Stack Tecnológica

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **Data Fetching:** TanStack Query (React Query)
- **Charts:** Recharts
- **Icons:** Lucide React
- **Utils:** clsx, tailwind-merge

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── ui/              # Componentes base (Card, Button, etc)
│   └── layout/          # Header, Footer, Sidebar
├── pages/
│   ├── dashboard/       # Dashboard principal
│   ├── clientes/        # Gestão de clientes
│   ├── produtos/        # Análise por produto
│   └── vendedores/      # Performance de vendedores
├── lib/                 # Utilitários (formatação, etc)
├── hooks/               # Custom hooks
├── services/            # API calls
├── types/               # TypeScript types
└── data/                # Mock data / constantes
```

## 🎯 Funcionalidades

### MVP (v1.0)
- ✅ Dashboard executivo com métricas principais
- ⏳ Análise de vendas por período
- ⏳ Ranking de clientes
- ⏳ Performance por vendedor
- ⏳ Análise por produto

### Futuras (v2.0+)
- [ ] Integração com API backend
- [ ] Filtros avançados
- [ ] Exportação de relatórios
- [ ] Gráficos interativos (Recharts)
- [ ] Autenticação e permissões

## 🛠️ Desenvolvimento

### Pré-requisitos
- Node.js 18+
- npm ou pnpm

### Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

### Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Gera build otimizado
- `npm run lint` - Executa linter
- `npm run preview` - Preview da build de produção

## 🎨 Identidade Visual

Baseada no **t-dash-jpa**:
- Cores primárias: Azul (#3b82f6)
- Layout limpo e profissional
- Responsivo (mobile-first)
- Acessibilidade (WCAG 2.1)

## 📊 Dados

### Fonte
- Relatórios comerciais 2021-2024
- Contas a receber (CAR)
- ~100.000+ toneladas comercializadas
- 1.000+ clientes ativos

### Processamento
ETL em desenvolvimento para:
- Limpeza e normalização
- Agregações e métricas
- Cache e otimização

## 🚢 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Railway / Render
- Conectar repositório GitHub
- Build command: `npm run build`
- Output directory: `dist`

## 📝 Roadmap

- [x] Setup inicial do projeto
- [x] Configuração Vite + React + TS
- [x] Tailwind CSS v4
- [x] Componentes base (Card, Header)
- [x] Dashboard principal (mock data)
- [ ] Integração com dados reais
- [ ] Gráficos (Recharts)
- [ ] Páginas de Clientes/Produtos/Vendedores
- [ ] Filtros e busca
- [ ] API backend
- [ ] Autenticação

## 🤝 Contribuindo

Projeto interno JPA - desenvolvimento colaborativo.

## 📄 Licença

Proprietário - JPA Agro e Serviços © 2026

---

**Desenvolvido com ❤️ pela equipe Yucca Data Science**
