import { useState } from 'react'
import clientHeroImg from '../../assets/client/client-hero.jpg'
import {
  CalendarIcon,
  CloseSmallIcon,
  DiamondIcon,
  DoodleHeart,
  HeartOutlineIcon,
  MenuBarsIcon,
  ShieldCheckIcon,
  StarOutlineIcon,
  WhatsAppIcon,
} from '../../icons.jsx'
import './ClientLanding.css'

export default function ClientLanding({ onNavigateAdmin, onBookNow }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Olá! Gostaria de agendar um horário no Bella Nails ✨')
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank')
  }

  return (
    <div className="cl-screen">
      {/* ===================================================================
          Hero com Imagem, Logo e Menu Superior
          =================================================================== */}
      <section className="cl-hero-section">
        {/* Imagem de Fundo com Fade Suave */}
        <div className="cl-hero-media">
          <img
            src={clientHeroImg}
            alt="Unhas impecáveis Bella Nails"
            className="cl-hero-img"
          />
          <div className="cl-hero-gradient-overlay" />
        </div>

        {/* Barra Superior: Logo e Botão de Menu */}
        <header className="cl-header-bar">
          <div className="cl-logo-box">
            <span className="cl-logo-script">Bella Nails</span>
            <span className="cl-logo-sub">STUDIO DE UNHAS</span>
          </div>

          <button
            type="button"
            className="cl-menu-btn"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu de navegação"
          >
            <MenuBarsIcon className="cl-menu-icon" />
          </button>
        </header>
      </section>

      {/* ===================================================================
          Conteúdo Principal: Tipografia & Call to Action
          =================================================================== */}
      <main className="cl-main-content">
        <div className="cl-text-container">
          <span className="cl-kicker">CUIDAR DE VOCÊ</span>

          <h1 className="cl-title">
            <span className="cl-title-line1">Também é</span>
            <div className="cl-title-line2-wrap">
              <span className="cl-title-line2">autoestima</span>
              <DoodleHeart className="cl-doodle-heart" />
            </div>
          </h1>

          <p className="cl-description">
            Manicure, pedicure, alongamento e muito mais. Um atendimento
            personalizado, em um ambiente acolhedor, feito especialmente para
            você.
          </p>
        </div>

        {/* Botões de Ação */}
        <div className="cl-actions-group">
          <button
            type="button"
            className="cl-btn-primary"
            onClick={onBookNow || (() => alert('Abrindo agendamento de horários...'))}
          >
            <CalendarIcon className="cl-btn-icon" />
            <span>Agendar agora</span>
          </button>

          <button
            type="button"
            className="cl-btn-secondary"
            onClick={handleWhatsApp}
          >
            <WhatsAppIcon className="cl-btn-icon is-whatsapp" />
            <span>Falar no WhatsApp</span>
          </button>
        </div>

        {/* ===================================================================
            Rodapé de Benefícios / Diferenciais (4 Ícones)
            =================================================================== */}
        <footer className="cl-features-footer">
          <div className="cl-feature-col">
            <div className="cl-feature-icon-wrap">
              <DiamondIcon className="cl-feature-icon" />
            </div>
            <span className="cl-feature-label">Produtos de qualidade</span>
          </div>

          <div className="cl-feature-col">
            <div className="cl-feature-icon-wrap">
              <HeartOutlineIcon className="cl-feature-icon" />
            </div>
            <span className="cl-feature-label">Ambiente acolhedor</span>
          </div>

          <div className="cl-feature-col">
            <div className="cl-feature-icon-wrap">
              <ShieldCheckIcon className="cl-feature-icon" />
            </div>
            <span className="cl-feature-label">Higiene e segurança</span>
          </div>

          <div className="cl-feature-col">
            <div className="cl-feature-icon-wrap">
              <StarOutlineIcon className="cl-feature-icon" />
            </div>
            <span className="cl-feature-label">Atendimento personalizado</span>
          </div>
        </footer>
      </main>

      {/* ===================================================================
          Menu Lateral / Drawer do Cliente (com atalho para o Admin)
          =================================================================== */}
      {menuOpen && (
        <div className="cl-drawer-backdrop" onClick={() => setMenuOpen(false)}>
          <div className="cl-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="cl-drawer-header">
              <div className="cl-logo-box is-drawer">
                <span className="cl-logo-script">Bella Nails</span>
                <span className="cl-logo-sub">STUDIO DE UNHAS</span>
              </div>
              <button
                type="button"
                className="cl-drawer-close-btn"
                onClick={() => setMenuOpen(false)}
                aria-label="Fechar menu"
              >
                <CloseSmallIcon />
              </button>
            </div>

            <nav className="cl-drawer-nav">
              <a
                href="#inicio"
                className="cl-drawer-link is-active"
                onClick={(e) => {
                  e.preventDefault()
                  setMenuOpen(false)
                }}
              >
                Início
              </a>
              <a
                href="#servicos"
                className="cl-drawer-link"
                onClick={(e) => {
                  e.preventDefault()
                  setMenuOpen(false)
                  if (onBookNow) onBookNow()
                }}
              >
                Serviços & Preços
              </a>
              <a
                href="#agendar"
                className="cl-drawer-link"
                onClick={(e) => {
                  e.preventDefault()
                  setMenuOpen(false)
                  if (onBookNow) onBookNow()
                }}
              >
                Agendamento Online
              </a>
              <a
                href="#whatsapp"
                className="cl-drawer-link"
                onClick={(e) => {
                  e.preventDefault()
                  setMenuOpen(false)
                  handleWhatsApp()
                }}
              >
                Contato via WhatsApp
              </a>

              <div className="cl-drawer-divider" />

              {/* Botão de Alternar para Área da Manicure (Admin) */}
              <button
                type="button"
                className="cl-drawer-admin-btn"
                onClick={() => {
                  setMenuOpen(false)
                  if (onNavigateAdmin) onNavigateAdmin()
                }}
              >
                <span>Painel da Manicure (Admin)</span>
                <span className="cl-drawer-admin-tag">Acesso Dono</span>
              </button>
            </nav>

            <div className="cl-drawer-footer">
              <span>Horário: Ter a Sáb, 08h às 19h</span>
              <span>Rua das Flores, 120 • Studio 4</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
