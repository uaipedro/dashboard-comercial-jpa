import { BarChart3, LogOut } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const NAV = [
  { to: '/',           label: 'Dashboard' },
  { to: '/clientes',   label: 'Clientes' },
  { to: '/produtos',   label: 'Produtos' },
  { to: '/vendedores', label: 'Vendedores' },
]

export function Header() {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Dashboard Comercial JPA</span>
        </div>
        <nav className="ml-auto flex gap-6 items-center">
          {NAV.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === to ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {label}
            </Link>
          ))}
          <a
            href="/cdn-cgi/access/logout"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            title="Sair"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </a>
        </nav>
      </div>
    </header>
  )
}
