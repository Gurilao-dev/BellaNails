import { useState } from 'react'
import headerBannerImg from '../../assets/client/client-header-banner.png'
import rapidoSeguroImg from '../../assets/client/client-rapido-seguro-cropped.png'
import footerWaveImg from '../../assets/client/client-footer-wave-cropped.png'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  HeartOutlineIcon,
  LotusIcon,
  ShieldCheckIcon,
  UserOutlineIcon,
  WhatsAppIcon,
} from '../../icons.jsx'
import './ClientRegister.css'

export default function ClientRegister({ onBack, onContinue }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  // Máscara brasileira automática para telefone / WhatsApp: (11) 99999-9999
  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/\D/g, '')
    if (val.length > 11) val = val.slice(0, 11)

    if (val.length > 6) {
      val = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`
    } else if (val.length > 2) {
      val = `(${val.slice(0, 2)}) ${val.slice(2)}`
    } else if (val.length > 0) {
      val = `(${val}`
    }
    setPhone(val)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) {
      alert('Por favor, informe seu nome completo.')
      return
    }
    if (phone.replace(/\D/g, '').length < 10) {
      alert('Por favor, informe um número de WhatsApp válido com DDD.')
      return
    }

    // Salva temporariamente os dados da cliente para o agendamento
    try {
      localStorage.setItem('bella_client_name', name.trim())
      localStorage.setItem('bella_client_phone', phone)
    } catch {
      // Ignora erro de storage se indisponível
    }

    if (onContinue) {
      onContinue({ name: name.trim(), phone })
    } else {
      alert(`Dados salvos com sucesso! Bem-vinda, ${name.trim()}! Próxima etapa: Seleção de Serviços.`)
    }
  }

  return (
    <div className="clr-screen">
      {/* ===================================================================
          Barra Superior: Voltar + Stepper de Progresso
          =================================================================== */}
      <nav className="clr-top-nav">
        <button
          type="button"
          className="clr-back-btn"
          onClick={onBack}
          aria-label="Voltar para página anterior"
        >
          <ChevronLeftIcon className="clr-back-icon" />
        </button>

        {/* Stepper: Passo 1 ativo (Cadastro) */}
        <div className="clr-stepper" aria-label="Progresso do agendamento: Passo 1 de 3">
          <span className="clr-step-dot is-active" />
          <span className="clr-step-line" />
          <span className="clr-step-dot" />
          <span className="clr-step-line" />
          <span className="clr-step-dot" />
        </div>

        {/* Espaçador para balancear com o botão voltar */}
        <div className="clr-nav-placeholder" aria-hidden="true" />
      </nav>

      {/* ===================================================================
          Banner Superior Ilustrativo com Foto das Unhas e Frase
          =================================================================== */}
      <header className="clr-header-banner-wrap">
        <img
          src={headerBannerImg}
          alt="Suas unhas, seu momento - Bella Nails"
          className="clr-header-banner-img"
        />

        {/* Avatar Centralizado com Badge de Coração */}
        <div className="clr-avatar-badge-wrap">
          <div className="clr-avatar-circle">
            <UserOutlineIcon className="clr-avatar-icon" />
            <span className="clr-avatar-heart-badge" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 18l-1.45-1.32C3.4 12.02 0 8.95 0 5.12 0 2.01 2.45 0 5.5 0c1.72 0 3.37.81 4.5 2.09C11.13.81 12.78 0 14.5 0 17.55 0 20 2.01 20 5.12c0 3.83-3.4 6.9-8.55 11.56L10 18z" />
              </svg>
            </span>
          </div>
        </div>
      </header>

      {/* ===================================================================
          Conteúdo do Formulário de Cadastro
          =================================================================== */}
      <main className="clr-main-card">
        {/* Título e Subtítulo */}
        <div className="clr-heading-group">
          <h1 className="clr-title">Cadastro</h1>
          <p className="clr-subtitle">
            Para confirmar seu agendamento, precisamos de algumas informações.
          </p>
        </div>

        {/* Card Destaque: Rápido e Seguro */}
        <div className="clr-info-card-wrap">
          <img
            src={rapidoSeguroImg}
            alt="Rápido e seguro - Leva menos de 1 minuto para continuar com seu agendamento."
            className="clr-info-card-img"
          />
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="clr-form">
          {/* Campo 1: Nome completo */}
          <div className="clr-input-group">
            <label htmlFor="client-name" className="clr-input-label">
              <UserOutlineIcon className="clr-label-icon" />
              <span>Nome completo</span>
            </label>
            <input
              id="client-name"
              type="text"
              className="clr-text-input"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </div>

          {/* Campo 2: Telefone / WhatsApp com Seletor de País (+55) */}
          <div className="clr-input-group">
            <label htmlFor="client-phone" className="clr-input-label">
              <WhatsAppIcon className="clr-label-icon is-whatsapp" />
              <span>Telefone / WhatsApp</span>
            </label>

            <div className="clr-phone-input-row">
              <div className="clr-country-selector">
                <span className="clr-flag">🇧🇷</span>
                <span className="clr-country-code">+55</span>
                <ChevronDownIcon className="clr-country-arrow" />
              </div>

              <div className="clr-phone-divider" aria-hidden="true" />

              <input
                id="client-phone"
                type="tel"
                className="clr-phone-input"
                placeholder="(00) 00000-0000"
                value={phone}
                onChange={handlePhoneChange}
                autoComplete="tel"
                required
              />
            </div>
          </div>

          {/* Botão de Ação: Continuar */}
          <button type="submit" className="clr-submit-btn">
            <span>Continuar</span>
            <span className="clr-btn-arrow">→</span>
          </button>
        </form>

        {/* ===================================================================
            3 Badges de Confiança / Segurança
            =================================================================== */}
        <div className="clr-trust-row">
          <div className="clr-trust-item">
            <ShieldCheckIcon className="clr-trust-icon" />
            <span className="clr-trust-text">Seus dados são protegidos</span>
          </div>

          <div className="clr-trust-item">
            <LotusIcon className="clr-trust-icon" />
            <span className="clr-trust-text">Atendimento personalizado</span>
          </div>

          <div className="clr-trust-item">
            <HeartOutlineIcon className="clr-trust-icon" />
            <span className="clr-trust-text">Mais beleza para o seu dia</span>
          </div>
        </div>
      </main>

      {/* ===================================================================
          Onda Decorativa com Linha de Coração no Rodapé (Edge-to-Edge)
          =================================================================== */}
      <footer className="clr-footer-wave-wrap" aria-hidden="true">
        <img
          src={footerWaveImg}
          alt=""
          className="clr-footer-wave-img"
        />
      </footer>
    </div>
  )
}
