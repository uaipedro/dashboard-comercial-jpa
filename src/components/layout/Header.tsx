import { BarChart3, LogOut } from 'lucide-react'

interface HeaderProps {
  onLogout: () => void
}

export function Header({ onLogout }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Dashboard Comercial JPA</span>
        </div>
        <nav className="ml-auto flex gap-6 items-center">
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
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            title="Sair"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </nav>
      </div>
    </header>
  )
}
