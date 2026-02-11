import { BarChart3 } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Dashboard Comercial JPA</span>
        </div>
        <nav className="ml-auto flex gap-6">
          <a href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Dashboard
          </a>
          <a href="/clientes" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Clientes
          </a>
          <a href="/produtos" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Produtos
          </a>
          <a href="/vendedores" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Vendedores
          </a>
        </nav>
      </div>
    </header>
  )
}
