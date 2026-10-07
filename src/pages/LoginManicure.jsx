import { useState } from 'react'
import { loginManicure, registerManicureAccount } from '../firebase/services.js'
import './LoginManicure.css'

export default function LoginManicure({ onLoginSuccess, onStartOnboarding, onViewClient }) {
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [salonName, setSalonName] = useState('Bella Nails')
  const [ownerName, setOwnerName] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    setLoading(true)

    try {
      if (isRegister) {
        if (!email || !password || !ownerName) {
          setErrorMsg('Preencha todos os campos obrigatórios.')
          setLoading(false)
          return
        }
        const res = await registerManicureAccount(email, password, {
          salonName,
          ownerName,
        })
        if (res.success) {
          if (onLoginSuccess) onLoginSuccess(res.user)
        } else {
          setErrorMsg(res.error || 'Erro ao criar conta. Tente novamente.')
        }
      } else {
        if (!email || !password) {
          setErrorMsg('Preencha seu e-mail e senha.')
          setLoading(false)
          return
        }
        const res = await loginManicure(email, password)
        if (res.success) {
          if (onLoginSuccess) onLoginSuccess(res.user)
        } else {
          setErrorMsg('E-mail ou senha incorretos. Verifique suas credenciais.')
        }
      }
    } catch (err) {
      setErrorMsg('Ocorreu um erro. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        {/* Logo e Cabeçalho */}
        <div className="login-header">
          <div className="login-logo-circle">💅</div>
          <h1 className="login-title">Bella Nails</h1>
          <p className="login-subtitle">
            {isRegister
              ? 'Cadastre seu estúdio e gerencie tudo em tempo real'
              : 'Painel da Manicure - Acesse sua conta'}
          </p>
        </div>

        {errorMsg && <div className="login-error-alert">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          {isRegister && (
            <>
              <div className="login-input-group">
                <label className="login-label">Seu Nome Completo</label>
                <input
                  type="text"
                  className="login-input"
                  placeholder="Ex: Ana Paula"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  required
                />
              </div>

              <div className="login-input-group">
                <label className="login-label">Nome do Salão / Estúdio</label>
                <input
                  type="text"
                  className="login-input"
                  placeholder="Ex: Bella Nails Studio"
                  value={salonName}
                  onChange={(e) => setSalonName(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <div className="login-input-group">
            <label className="login-label">E-mail</label>
            <input
              type="email"
              className="login-input"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-input-group">
            <label className="login-label">Senha</label>
            <input
              type="password"
              className="login-input"
              placeholder="Sua senha secreta"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading
              ? 'Conectando ao Firebase...'
              : isRegister
              ? 'Criar Conta e Acessar'
              : 'Entrar no Sistema'}
          </button>
        </form>

        <div className="login-toggle-area">
          <button
            type="button"
            className="login-toggle-btn"
            onClick={() => {
              setIsRegister(!isRegister)
              setErrorMsg('')
            }}
          >
            {isRegister
              ? 'Já tem uma conta? Clique aqui para entrar'
              : 'Ainda não tem conta? Clique aqui para criar'}
          </button>

          {onStartOnboarding && (
            <button
              type="button"
              className="login-onboarding-link"
              onClick={onStartOnboarding}
            >
              Fazer configuração guiada do salão (Passo a Passo) →
            </button>
          )}

          {onViewClient && (
            <button
              type="button"
              className="login-client-link"
              onClick={onViewClient}
            >
              Ver página de agendamento do cliente 💅
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
