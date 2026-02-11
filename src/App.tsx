import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Dashboard } from './pages/dashboard/Dashboard'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clientes" element={<div className="p-8"><h1 className="text-2xl font-bold">Clientes</h1><p className="text-muted-foreground">Em desenvolvimento...</p></div>} />
            <Route path="/produtos" element={<div className="p-8"><h1 className="text-2xl font-bold">Produtos</h1><p className="text-muted-foreground">Em desenvolvimento...</p></div>} />
            <Route path="/vendedores" element={<div className="p-8"><h1 className="text-2xl font-bold">Vendedores</h1><p className="text-muted-foreground">Em desenvolvimento...</p></div>} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
