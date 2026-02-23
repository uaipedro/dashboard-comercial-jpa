import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Dashboard } from './pages/dashboard/Dashboard'
import { Clientes } from './pages/clientes/Clientes'
import { Produtos } from './pages/produtos/Produtos'
import { Vendedores } from './pages/vendedores/Vendedores'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
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
