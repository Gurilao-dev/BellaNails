import { useState, useEffect } from 'react'
import headerBannerImg from '../../assets/client/client-confirm-banner.png'
import successBannerImg from '../../assets/client/client-appointments-success-banner-clean.png'
import flowerImg from '../../assets/client/client-flower.png'
import bottomWaveImg from '../../assets/client/client-appointments-bottom-wave.png'
import defaultServiceImg from '../../assets/services/client-alongamento.png'
import {
  CalendarIcon,
  CalendarPlusIcon,
  CheckIcon,
  ChevronRightIcon,
  ClockIcon,
  TrashIcon,
  UserOutlineIcon,
} from '../../icons.jsx'
import ClientBottomNav from '../../components/client/ClientBottomNav.jsx'
import {
  subscribeToClientAppointments,
  updateAppointmentStatus,
} from '../../firebase/services.js'
import './ClientAppointments.css'

export default function ClientAppointments({ onBookNew, onReschedule }) {
  // Estado para tab ativa da barra inferior: 'appointments' ou 'book'
  const [activeTab, setActiveTab] = useState('appointments')
  // Modal de cancelamento
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  // Modal de detalhes
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  // Estado do agendamento (Permitido apenas 1 conforme solicitado)
  const [appointment, setAppointment] = useState({
    id: 'apt-01',
    status: 'confirmado', // 'confirmado' | 'cancelado'
    serviceTitle: 'Alongamento em gel',
    price: 'R$ 90,00',
    duration: '1h 30 min',
    professionalName: 'Ana Paula',
    dateLabel: 'Ter, 06 de out de 2026',
    time: '14:00',
    serviceImg: defaultServiceImg,
    location: 'Studio Bella Nails - Rua das Flores, 123',
  })

  // Escuta agendamento real da cliente diretamente no Firebase Firestore
  useEffect(() => {
    let clientPhone = ''
    try {
      const u = JSON.parse(localStorage.getItem('bella_client_user') || '{}')
      clientPhone = u.phone || localStorage.getItem('bella_client_phone') || ''
    } catch (e) {}

    const unsub = subscribeToClientAppointments(clientPhone, (list) => {
      if (list && list.length > 0) {
        // Pega o agendamento mais recente da cliente
        const latest = list[list.length - 1]
        setAppointment({
          id: latest.id,
          status: latest.status || 'confirmado',
          serviceTitle: latest.serviceTitle || latest.service?.title || 'Alongamento em gel',
          price: latest.price || latest.service?.price || 'R$ 90,00',
          duration: latest.duration || latest.service?.duration || '1h 30 min',
          professionalName: latest.professionalName || latest.professional?.name || 'Ana Paula',
          dateLabel:
            latest.dateLabel ||
            (latest.date?.dayWeek
              ? `${latest.date.dayWeek}, ${latest.date.dayNum} de out de 2026`
              : 'Ter, 06 de out de 2026'),
          time: latest.time || '14:00',
          serviceImg: latest.serviceImg || latest.service?.image || defaultServiceImg,
          location: 'Studio Bella Nails - Rua das Flores, 123',
        })
      }
    })

    return () => unsub()
  }, [])

  // Recupera agendamento recente salvo se disponível localmente
  useEffect(() => {
    try {
      const saved = localStorage.getItem('bella_client_confirmed_appointment')
      const currentAppt = localStorage.getItem('bella_client_appointment')

      let data = null
      if (saved) {
        data = JSON.parse(saved)
      } else if (currentAppt) {
        data = JSON.parse(currentAppt)
      }

      if (data) {
        setAppointment((prev) => ({
          ...prev,
          id: data.id || prev.id,
          serviceTitle: data.serviceTitle || data.service?.title || prev.serviceTitle,
          price: data.price || data.service?.price || prev.price,
          duration: data.duration || data.service?.duration || prev.duration,
          professionalName: data.professionalName || data.professional?.name || prev.professionalName,
          dateLabel:
            data.dateLabel ||
            (data.date?.dayWeek ? `${data.date.dayWeek}, ${data.date.dayNum} de out de 2026` : prev.dateLabel),
          time: data.time || prev.time,
          serviceImg: data.serviceImg || data.service?.image || prev.serviceImg,
        }))
      }
    } catch {
      // Mantém os dados padrões
    }
  }, [])

  // Troca de tab com transição satisfatória
  const handleTabChange = (tab) => {
    if (tab === activeTab) return
    setActiveTab(tab)
    if (tab === 'book' && onBookNew) {
      setTimeout(() => {
        onBookNew()
      }, 350)
    }
  }

  // Cancelamento do agendamento sincronizado com o Firebase
  const handleConfirmCancel = async () => {
    setAppointment((prev) => ({
      ...prev,
      status: 'cancelado',
    }))
    if (appointment?.id) {
      await updateAppointmentStatus(appointment.id, 'cancelado')
    }
    setIsCancelModalOpen(false)
  }

  return (
    <div className="capp-screen">
      {/* Área com rolagem suave */}
      <div className="capp-scroll-body">
        
        {/* Banner Superior com Logotipo e Foto (PNG original transparente) */}
        <header className="capp-header-wrap">
          <img
            src={headerBannerImg}
            alt="Bella Nails Studio de Unhas"
            className="capp-header-img"
          />
        </header>

        {/* Conteúdo Principal */}
        <main className="capp-main-content">
          
          {/* Folha floral decorativa no topo direito (igual ao mockup) */}
          <img
            src={flowerImg}
            alt=""
            className="capp-flower-top-tr"
            aria-hidden="true"
          />

          {/* Cabeçalho de Título e Subtítulo */}
          <div className="capp-title-section">
            <h1 className="capp-main-title">Seus agendamentos</h1>
            <p className="capp-subtitle">
              Acompanhe seus horários e gerencie seus atendimentos.
            </p>
          </div>

          {/* Card de Notificação de Sucesso (PNG transparente limpo fornecido) */}
          <div className="capp-success-banner-container">
            <img
              src={successBannerImg}
              alt="Agendamento confirmado com sucesso! Seu horário foi reservado."
              className="capp-success-banner-img"
            />
          </div>

          {/* 
            Nota: Os botões "Próximos (2)" e "Finalizados (1)" foram removidos
            conforme especificado: "mas remova os botões Proximos e finalizados"
          */}

          {/* Único Card de Agendamento Permitido */}
          <section className="capp-appointment-card">
            
            {/* Linha Superior: Foto do Serviço + Detalhes + Badge */}
            <div className="capp-card-top-row">
              
              {/* Foto quadrada arredondada do serviço */}
              <div className="capp-service-photo-wrap">
                <img
                  src={appointment.serviceImg}
                  alt={appointment.serviceTitle}
                  className="capp-service-photo"
                />
              </div>

              {/* Coluna de informações */}
              <div className="capp-card-details-col">
                <div className="capp-service-title-row">
                  <h2 className="capp-service-name">{appointment.serviceTitle}</h2>
                  
                  {/* Badge de Status */}
                  {appointment.status === 'confirmado' ? (
                    <span className="capp-status-badge is-confirmed">
                      <CheckIcon className="capp-status-icon" />
                      <span>Confirmado</span>
                    </span>
                  ) : (
                    <span className="capp-status-badge is-cancelled">
                      <span>Cancelado</span>
                    </span>
                  )}
                </div>

                {/* Preço em destaque */}
                <div className="capp-service-price">{appointment.price}</div>

                {/* Lista de Metadados: Duração, Profissional, Data e Hora */}
                <div className="capp-meta-list">
                  <div className="capp-meta-item">
                    <ClockIcon className="capp-meta-icon" />
                    <span>{appointment.duration}</span>
                  </div>

                  <div className="capp-meta-item">
                    <UserOutlineIcon className="capp-meta-icon" />
                    <span>{appointment.professionalName}</span>
                  </div>

                  <div className="capp-meta-item">
                    <CalendarIcon className="capp-meta-icon" />
                    <span>{appointment.dateLabel}</span>
                  </div>

                  <div className="capp-meta-item">
                    <ClockIcon className="capp-meta-icon" />
                    <span>{appointment.time}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Linha Inferior: Botões de Ação (Reagendar, Cancelar e Detalhes) */}
            <div className="capp-card-actions-row">
              <button
                type="button"
                className="capp-btn-reschedule"
                onClick={onReschedule}
                title="Alterar data ou horário do agendamento"
              >
                <CalendarIcon className="capp-action-btn-icon" />
                <span>Reagendar</span>
              </button>

              <button
                type="button"
                className="capp-btn-cancel"
                onClick={() => setIsCancelModalOpen(true)}
                title="Cancelar agendamento"
              >
                <TrashIcon className="capp-action-btn-icon" />
                <span>Cancelar</span>
              </button>

              <button
                type="button"
                className="capp-btn-details-arrow"
                onClick={() => setIsDetailsModalOpen(true)}
                aria-label="Ver mais detalhes do agendamento"
                title="Ver detalhes"
              >
                <ChevronRightIcon className="capp-arrow-icon" />
              </button>
            </div>
          </section>

          {/* Espaçador final para não encobrir com a barra inferior flutuante */}
          <div className="capp-bottom-spacer" />
        </main>

        {/* Fundo decorativo com ondas e folhas no rodapé */}
        <div className="capp-footer-wave-bg" aria-hidden="true">
          <img
            src={bottomWaveImg}
            alt=""
            className="capp-footer-wave-img"
          />
        </div>
      </div>

      {/* Barra Flutuante Inferior com Animação Super Satisfatória de Aba */}
      <ClientBottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* =====================================================================
          Modal de Confirmação de Cancelamento
          ===================================================================== */}
      {isCancelModalOpen && (
        <div className="capp-modal-backdrop" onClick={() => setIsCancelModalOpen(false)}>
          <div className="capp-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="capp-modal-trash-icon">
              <TrashIcon />
            </div>
            <h3 className="capp-modal-title">Cancelar agendamento?</h3>
            <p className="capp-modal-text">
              Tem certeza de que deseja cancelar seu horário de{' '}
              <strong>{appointment.serviceTitle}</strong> em {appointment.dateLabel} às {appointment.time}?
            </p>
            <div className="capp-modal-btns-group">
              <button
                type="button"
                className="capp-modal-confirm-cancel-btn"
                onClick={handleConfirmCancel}
              >
                Sim, cancelar horário
              </button>
              <button
                type="button"
                className="capp-modal-keep-btn"
                onClick={() => setIsCancelModalOpen(false)}
              >
                Manter meu agendamento
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          Modal de Detalhes do Agendamento
          ===================================================================== */}
      {isDetailsModalOpen && (
        <div className="capp-modal-backdrop" onClick={() => setIsDetailsModalOpen(false)}>
          <div className="capp-modal-box" onClick={(e) => e.stopPropagation()}>
            <h3 className="capp-modal-title">Detalhes do Agendamento</h3>
            <div className="capp-modal-details-list">
              <div className="capp-modal-detail-row">
                <span className="capp-modal-detail-lbl">Serviço:</span>
                <span className="capp-modal-detail-val">{appointment.serviceTitle}</span>
              </div>
              <div className="capp-modal-detail-row">
                <span className="capp-modal-detail-lbl">Valor:</span>
                <span className="capp-modal-detail-val">{appointment.price}</span>
              </div>
              <div className="capp-modal-detail-row">
                <span className="capp-modal-detail-lbl">Profissional:</span>
                <span className="capp-modal-detail-val">{appointment.professionalName}</span>
              </div>
              <div className="capp-modal-detail-row">
                <span className="capp-modal-detail-lbl">Data e horário:</span>
                <span className="capp-modal-detail-val">{appointment.dateLabel} às {appointment.time}</span>
              </div>
              <div className="capp-modal-detail-row">
                <span className="capp-modal-detail-lbl">Local:</span>
                <span className="capp-modal-detail-val">{appointment.location}</span>
              </div>
            </div>
            <button
              type="button"
              className="capp-modal-close-btn"
              onClick={() => setIsDetailsModalOpen(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
