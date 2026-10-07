import { useEffect, useState } from 'react'
import salonImg from '../assets/salon-facade.png'
import {
  BanknoteIcon,
  BellIcon,
  CalendarIcon,
  CalendarStarIcon,
  ClockIcon,
  CreditCardIcon,
  DebitCardIcon,
  HomeFilledIcon,
  InstagramIcon,
  MapPinIcon,
  MoreHorizontalIcon,
  PencilIcon,
  PhoneIcon,
  PixIcon,
  SettingsGearIcon,
  ShoppingBagIcon,
  UsersIcon,
  WalletBadgeIcon,
  WhatsAppIcon,
} from '../icons.jsx'
import AppBottomNav from '../components/AppBottomNav.jsx'
import {
  subscribeToSalonSettings,
  updateSalonSettings,
  logoutManicure,
} from '../firebase/services.js'
import './Configuracoes.css'

const initialDays = [
  { id: 'seg', label: 'Seg', active: true },
  { id: 'ter', label: 'Ter', active: true },
  { id: 'qua', label: 'Qua', active: true },
  { id: 'qui', label: 'Qui', active: true },
  { id: 'sex', label: 'Sex', active: true },
  { id: 'sab', label: 'Sáb', active: false },
  { id: 'dom', label: 'Dom', active: false },
]

export default function Configuracoes({ onNavigateTab }) {
  const [activeSegment, setActiveSegment] = useState('negocio')
  const [days, setDays] = useState(initialDays)
  const [startTime, setStartTime] = useState('08:00')
  const [endTime, setEndTime] = useState('19:30')
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Métodos de pagamento toggles
  const [payments, setPayments] = useState({
    dinheiro: true,
    pix: true,
    credito: true,
    debito: true,
  })

  // Lembretes automáticos toggles
  const [reminders, setReminders] = useState({
    confirmacao: true,
    lembrete24h: true,
    agradecimento: true,
  })

  // Modal de edição das informações do negócio
  const [showEditModal, setShowEditModal] = useState(false)
  const [businessInfo, setBusinessInfo] = useState({
    name: 'Bella Nails',
    subtitle: 'Studio de Unhas',
    addressLine1: 'Rua das Flores, 123 - Centro',
    addressLine2: 'São Paulo - SP',
    phone: '(11) 91234-5678',
    instagram: '@bellanails',
  })

  // Escuta dados reais do Firebase
  useEffect(() => {
    const unsub = subscribeToSalonSettings((data) => {
      if (data) {
        if (data.openTime) setStartTime(data.openTime)
        if (data.closeTime) setEndTime(data.closeTime)
        if (data.businessInfo) setBusinessInfo((prev) => ({ ...prev, ...data.businessInfo }))
        else if (data.salonName) setBusinessInfo((prev) => ({ ...prev, name: data.salonName }))
        if (data.payments) setPayments(data.payments)
        if (data.days) setDays(data.days)
      }
    })
    return () => unsub()
  }, [])

  const toggleDay = (id) => {
    setDays((prev) =>
      prev.map((d) => (d.id === id ? { ...d, active: !d.active } : d))
    )
  }

  const togglePayment = (key) => {
    setPayments((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const toggleReminder = (key) => {
    setReminders((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSaveInfo = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateSalonSettings({
        businessInfo,
        salonName: businessInfo.name,
        openTime: startTime,
        closeTime: endTime,
        days,
        payments,
        reminders,
      })
      setShowEditModal(false)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (err) {
      alert('Erro ao salvar configurações no banco.')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveScheduleHours = async () => {
    setSaving(true)
    try {
      await updateSalonSettings({
        openTime: startTime,
        closeTime: endTime,
        days,
        payments,
      })
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (err) {
      alert('Erro ao salvar horários no banco.')
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    if (window.confirm('Deseja realmente sair da conta da manicure?')) {
      await logoutManicure()
      if (onNavigateTab) onNavigateTab('login')
    }
  }

  return (
    <main className="screen cfg-screen">
      {/* ===================================================================
          Header Superior: Ícone de Engrenagem + "Configurações"
          =================================================================== */}
      <header className="cfg-header anim-stagger-item anim-delay-1">
        <div className="cfg-header-left">
          <div className="cfg-header-icon-wrap" aria-hidden="true">
            <SettingsGearIcon className="cfg-header-icon" />
          </div>
          <h1 className="cfg-header-title">Configurações</h1>
        </div>

        <button
          type="button"
          className="agenda-new-apt-btn"
          style={{ background: '#7a192f' }}
          onClick={handleLogout}
          title="Sair da conta"
        >
          <span>Sair</span>
        </button>
      </header>

      {/* Conteúdo com Rolagem Fluida */}
      <div className="cfg-content-body">
        {/* ===================================================================
            Segmented Control: Meu Negócio | Notificações | Pagamentos
            =================================================================== */}
        <section
          className="cfg-segments anim-stagger-item anim-delay-2"
          aria-label="Filtro de configurações"
        >
          <button
            id="tab-meu-negocio"
            type="button"
            className={`cfg-segment-btn ${activeSegment === 'negocio' ? 'is-active' : ''}`}
            onClick={() => setActiveSegment('negocio')}
          >
            Meu Negócio
          </button>
          <button
            id="tab-notificacoes"
            type="button"
            className={`cfg-segment-btn ${activeSegment === 'notificacoes' ? 'is-active' : ''}`}
            onClick={() => setActiveSegment('notificacoes')}
          >
            Notificações
          </button>
          <button
            id="tab-pagamentos"
            type="button"
            className={`cfg-segment-btn ${activeSegment === 'pagamentos' ? 'is-active' : ''}`}
            onClick={() => setActiveSegment('pagamentos')}
          >
            Pagamentos
          </button>
        </section>

        {/* ===================================================================
            Card de Acesso à Página Pública da Cliente
            =================================================================== */}
        <section className="cfg-client-link-card anim-stagger-item anim-delay-3">
          <div className="cfg-client-link-info">
            <span className="cfg-client-link-tag">Link de Agendamento da Cliente</span>
            <strong className="cfg-client-link-url">bellanails.com/agendar</strong>
            <p className="cfg-client-link-hint">
              Página onde suas clientes escolhem serviços e agendam horários.
            </p>
          </div>
          <button
            type="button"
            className="cfg-client-link-btn"
            onClick={() => onNavigateTab('client')}
          >
            <span>Ver página da Cliente 💅 →</span>
          </button>
        </section>

        {/* ===================================================================
            Card 1: Informações do negócio
            =================================================================== */}
        <section
          className="cfg-card cfg-card-business anim-stagger-item anim-delay-3"
          aria-label="Informações do negócio"
        >
          <div className="cfg-card-header">
            <CalendarStarIcon className="cfg-card-header-icon" />
            <h2 className="cfg-card-title">Informações do negócio</h2>
          </div>

          <div className="cfg-business-content">
            {/* Foto do Studio com Cantos Arredondados */}
            <div className="cfg-salon-thumb-wrap">
              <img
                src={salonImg}
                alt="Foto do Studio Bella Nails"
                className="cfg-salon-thumb"
              />
            </div>

            {/* Dados do Studio */}
            <div className="cfg-business-details">
              <div className="cfg-business-name-row">
                <div className="cfg-name-group">
                  <h3 className="cfg-business-name">{businessInfo.name}</h3>
                  <span className="cfg-business-sub">{businessInfo.subtitle}</span>
                </div>

                <button
                  type="button"
                  className="cfg-edit-btn"
                  onClick={() => setShowEditModal(true)}
                  aria-label="Editar informações do negócio"
                >
                  <PencilIcon className="cfg-edit-icon" />
                </button>
              </div>

              {/* Lista de Contatos */}
              <div className="cfg-contact-list">
                <div className="cfg-contact-item">
                  <MapPinIcon className="cfg-contact-icon" />
                  <div className="cfg-contact-text">
                    <span>{businessInfo.addressLine1}</span>
                    <span>{businessInfo.addressLine2}</span>
                  </div>
                </div>

                <div className="cfg-contact-item">
                  <PhoneIcon className="cfg-contact-icon" />
                  <span className="cfg-contact-text">{businessInfo.phone}</span>
                </div>

                <div className="cfg-contact-item">
                  <InstagramIcon className="cfg-contact-icon" />
                  <span className="cfg-contact-text">{businessInfo.instagram}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            Card 2: Horário de funcionamento
            =================================================================== */}
        <section
          className="cfg-card cfg-card-schedule anim-stagger-item anim-delay-4"
          aria-label="Horário de funcionamento"
        >
          <div className="cfg-card-header">
            <ClockIcon className="cfg-card-header-icon" />
            <h2 className="cfg-card-title">Horário de funcionamento</h2>
          </div>

          {/* Seletor dos 7 dias da semana */}
          <div className="cfg-days-grid" role="group" aria-label="Dias de atendimento">
            {days.map((day) => (
              <button
                key={day.id}
                type="button"
                className={`cfg-day-btn ${day.active ? 'is-active' : ''}`}
                onClick={() => toggleDay(day.id)}
                aria-pressed={day.active}
              >
                {day.label}
              </button>
            ))}
          </div>

          {/* Horários Início e Fim: 09:00 às 19:00 */}
          <div className="cfg-hours-row">
            <div className="cfg-hour-box">
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="cfg-hour-input"
                aria-label="Horário de abertura"
              />
            </div>

            <span className="cfg-hours-separator">às</span>

            <div className="cfg-hour-box">
              <input
                type="text"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="cfg-hour-input"
                aria-label="Horário de fechamento"
              />
            </div>
          </div>

          <button
            type="button"
            className="agenda-modal-btn-save"
            style={{ marginTop: 14, width: '100%', borderRadius: 14 }}
            onClick={handleSaveScheduleHours}
            disabled={saving}
          >
            {saving ? 'Salvando no Banco...' : 'Salvar Horários no Banco'}
          </button>

          {saveSuccess && (
            <p style={{ color: '#107e46', fontSize: 12.5, fontWeight: 600, textAlign: 'center', marginTop: 8, margin: 0 }}>
              ✓ Atualizado no Firebase! Suas clientes verão esses horários.
            </p>
          )}
        </section>

        {/* ===================================================================
            Card 3: Métodos de pagamento
            =================================================================== */}
        <section
          className="cfg-card cfg-card-payments anim-stagger-item anim-delay-5"
          aria-label="Métodos de pagamento"
        >
          <div className="cfg-card-header">
            <WalletBadgeIcon className="cfg-card-header-icon" />
            <h2 className="cfg-card-title">Métodos de pagamento</h2>
          </div>

          <div className="cfg-toggle-list">
            {/* Dinheiro */}
            <div className="cfg-toggle-row">
              <div className="cfg-toggle-label-wrap">
                <BanknoteIcon className="cfg-item-icon" />
                <span className="cfg-item-label">Dinheiro</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={payments.dinheiro}
                className={`cfg-switch ${payments.dinheiro ? 'is-checked' : ''}`}
                onClick={() => togglePayment('dinheiro')}
              >
                <span className="cfg-switch-thumb" />
              </button>
            </div>

            {/* PIX */}
            <div className="cfg-toggle-row">
              <div className="cfg-toggle-label-wrap">
                <PixIcon className="cfg-item-icon" />
                <span className="cfg-item-label">PIX</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={payments.pix}
                className={`cfg-switch ${payments.pix ? 'is-checked' : ''}`}
                onClick={() => togglePayment('pix')}
              >
                <span className="cfg-switch-thumb" />
              </button>
            </div>

            {/* Cartão de crédito */}
            <div className="cfg-toggle-row">
              <div className="cfg-toggle-label-wrap">
                <CreditCardIcon className="cfg-item-icon" />
                <span className="cfg-item-label">Cartão de crédito</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={payments.credito}
                className={`cfg-switch ${payments.credito ? 'is-checked' : ''}`}
                onClick={() => togglePayment('credito')}
              >
                <span className="cfg-switch-thumb" />
              </button>
            </div>

            {/* Cartão de débito */}
            <div className="cfg-toggle-row">
              <div className="cfg-toggle-label-wrap">
                <DebitCardIcon className="cfg-item-icon" />
                <span className="cfg-item-label">Cartão de débito</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={payments.debito}
                className={`cfg-switch ${payments.debito ? 'is-checked' : ''}`}
                onClick={() => togglePayment('debito')}
              >
                <span className="cfg-switch-thumb" />
              </button>
            </div>
          </div>
        </section>

        {/* ===================================================================
            Card 4: Lembretes automáticos
            =================================================================== */}
        <section
          className="cfg-card cfg-card-reminders anim-stagger-item anim-delay-6"
          aria-label="Lembretes automáticos"
        >
          <div className="cfg-card-header">
            <BellIcon className="cfg-card-header-icon" />
            <h2 className="cfg-card-title">Lembretes automáticos</h2>
          </div>

          <div className="cfg-toggle-list">
            {/* Confirmação de agendamento (WhatsApp) */}
            <div className="cfg-toggle-row">
              <div className="cfg-toggle-label-wrap">
                <BellIcon className="cfg-item-icon" />
                <span className="cfg-item-label">Confirmação de agendamento (WhatsApp)</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={reminders.confirmacao}
                className={`cfg-switch ${reminders.confirmacao ? 'is-checked' : ''}`}
                onClick={() => toggleReminder('confirmacao')}
              >
                <span className="cfg-switch-thumb" />
              </button>
            </div>

            {/* Lembrete 24h antes */}
            <div className="cfg-toggle-row">
              <div className="cfg-toggle-label-wrap">
                <ClockIcon className="cfg-item-icon" />
                <span className="cfg-item-label">Lembrete 24h antes</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={reminders.lembrete24h}
                className={`cfg-switch ${reminders.lembrete24h ? 'is-checked' : ''}`}
                onClick={() => toggleReminder('lembrete24h')}
              >
                <span className="cfg-switch-thumb" />
              </button>
            </div>

            {/* Mensagem de agradecimento */}
            <div className="cfg-toggle-row">
              <div className="cfg-toggle-label-wrap">
                <WhatsAppIcon className="cfg-item-icon" />
                <span className="cfg-item-label">Mensagem de agradecimento</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={reminders.agradecimento}
                className={`cfg-switch ${reminders.agradecimento ? 'is-checked' : ''}`}
                onClick={() => toggleReminder('agradecimento')}
              >
                <span className="cfg-switch-thumb" />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Barra de Navegação Inferior Flutuante */}
      <AppBottomNav activeTab="mais" onNavigateTab={onNavigateTab} />

      {/* ===================================================================
          Modal de Edição dos Dados do Negócio
          =================================================================== */}
      {showEditModal && (
        <div className="cfg-modal-backdrop" onClick={() => setShowEditModal(false)}>
          <div
            className="cfg-modal-sheet"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Editar informações do negócio"
          >
            <div className="cfg-sheet-handle" />
            <h3 className="cfg-sheet-title">Editar Dados do Studio</h3>

            <form onSubmit={handleSaveInfo} className="cfg-edit-form">
              <label className="cfg-field-label">
                <span>Nome do Studio</span>
                <input
                  type="text"
                  value={businessInfo.name}
                  onChange={(e) =>
                    setBusinessInfo((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="cfg-field-input"
                  required
                />
              </label>

              <label className="cfg-field-label">
                <span>Endereço</span>
                <input
                  type="text"
                  value={businessInfo.addressLine1}
                  onChange={(e) =>
                    setBusinessInfo((prev) => ({ ...prev, addressLine1: e.target.value }))
                  }
                  className="cfg-field-input"
                  required
                />
              </label>

              <label className="cfg-field-label">
                <span>Cidade / Estado</span>
                <input
                  type="text"
                  value={businessInfo.addressLine2}
                  onChange={(e) =>
                    setBusinessInfo((prev) => ({ ...prev, addressLine2: e.target.value }))
                  }
                  className="cfg-field-input"
                  required
                />
              </label>

              <label className="cfg-field-label">
                <span>Telefone / WhatsApp</span>
                <input
                  type="text"
                  value={businessInfo.phone}
                  onChange={(e) =>
                    setBusinessInfo((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="cfg-field-input"
                  required
                />
              </label>

              <label className="cfg-field-label">
                <span>Instagram</span>
                <input
                  type="text"
                  value={businessInfo.instagram}
                  onChange={(e) =>
                    setBusinessInfo((prev) => ({ ...prev, instagram: e.target.value }))
                  }
                  className="cfg-field-input"
                  required
                />
              </label>

              <div className="cfg-modal-actions">
                <button
                  type="button"
                  className="cfg-modal-btn-cancel"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="cfg-modal-btn-save">
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
