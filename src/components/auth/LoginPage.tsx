import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Lock } from 'lucide-react'

interface LoginPageProps {
  onLogin: () => void
}

const SENHA_CORRETA = import.meta.env.VITE_DASHBOARD_PASSWORD as string

export function LoginPage({ onLogin }: LoginPageProps) {
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (senha === SENHA_CORRETA) {
      localStorage.setItem('dashboard-jpa-auth', 'autenticado')
      onLogin()
    } else {
      setErro(true)
      setSenha('')
      setTimeout(() => setErro(false), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Lock className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Dashboard Comercial JPA</CardTitle>
          <CardDescription className="text-center">
            Digite a senha para acessar o dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="senha" className="text-sm font-medium">
                Senha
              </label>
              <input
                id="senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  erro ? 'border-red-500 focus:ring-red-500' : ''
                }`}
                placeholder="Digite a senha"
                autoFocus
              />
              {erro && (
                <p className="text-sm text-red-500">Senha incorreta. Tente novamente.</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors font-medium"
            >
              Acessar Dashboard
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
