import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { LoginPage } from './components/auth/LoginPage'
import { Dashboard } from './pages/dashboard/Dashboard'
import { Clientes } from './pages/clientes/Clientes'
import { Produtos } from './pages/produtos/Produtos'
import { Vendedores } from './pages/vendedores/Vendedores'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verifica se já está autenticado
    const auth = localStorage.getItem('dashboard-jpa-auth')
    setIsAuthenticated(auth === 'autenticado')
    setIsLoading(false)
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('dashboard-jpa-auth')
    setIsAuthenticated(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Carregando...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header onLogout={handleLogout} />
        <main className="container mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/vendedores" element={<Vendedores />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
