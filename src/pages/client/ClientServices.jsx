import { useState, useEffect, useRef, useCallback } from 'react'
import headerBannerImg from '../../assets/client/client-banner-wave.png'
import flowerImg from '../../assets/client/client-flower.png'
import manicureImg from '../../assets/services/client-manicure.png'
import pedicureImg from '../../assets/services/client-pedicure.png'
import alongamentoImg from '../../assets/services/client-alongamento.png'
import banhoImg from '../../assets/services/client-banho.png'
import nailartImg from '../../assets/services/client-nailart.png'
import {
  ArrowLeftIcon,
  CheckIcon,
  ChevronLeftIcon,
  ClockIcon,
  SparklesIcon,
  TagIcon,
} from '../../icons.jsx'
import ClientBottomNav from '../../components/client/ClientBottomNav.jsx'
import { subscribeToServices } from '../../firebase/services.js'
import './ClientServices.css'

const SERVICES_DATA = [
  {
    id: 'manicure',
    name: 'Manicure',
    description: 'Cuide das suas unhas com muito carinho.',
    duration: '45 min',
    durationFull: '45 minutos',
    price: 'R$ 30,00',
    image: manicureImg,
    included: [
      'Limpeza e remoção de cutículas',
      'Esmaltação',
      'Finalização e hidratação das unhas',
    ],
  },
  {
    id: 'pedicure',
    name: 'Pedicure',
    description: 'Bem-estar e beleza do pé ao coração.',
    duration: '50 min',
    durationFull: '50 minutos',
    price: 'R$ 35,00',
    image: pedicureImg,
    included: [
      'Limpeza e remoção de cutículas',
      'Esfoliação e lixamento dos pés',
      'Finalização e hidratação profunda',
    ],
  },
  {
    id: 'alongamento',
    name: 'Alongamento em gel',
    description: 'Unhas mais fortes e duradouras.',
    duration: '1h 30 min',
    durationFull: '1h 30 minutos',
    price: 'R$ 90,00',
    image: alongamentoImg,
    included: [
      'Preparação e assepsia completa',
      'Aplicação e estruturação em gel',
      'Finalização e hidratação das unhas',
    ],
  },
  {
    id: 'banho',
    name: 'Banho de gel',
    description: 'Brilho e resistência para suas unhas.',
    duration: '1h 00 min',
    durationFull: '1h 00 minuto',
    price: 'R$ 70,00',
    image: banhoImg,
    included: [
      'Remoção de resíduos e nivelamento',
      'Blindagem protetora com gel nivelante',
      'Finalização e hidratação das unhas',
    ],
  },
  {
    id: 'nailart',
    name: 'Nail art',
    description: 'Detalhes que fazem a diferença.',
    duration: '15 min',
    durationFull: '15 minutos',
    price: 'R$ 10,00',
    image: nailartImg,
    included: [
      'Design artístico personalizado',
      'Aplicação de detalhes ou foil',
      'Finalização e hidratação das unhas',
    ],
  },
]

export default function ClientServices({ onBack, onConfirmService, onViewAppointments }) {
  const [servicesList, setServicesList] = useState(SERVICES_DATA)
  const [selectedId, setSelectedId] = useState('alongamento')
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [confirmedSuccess, setConfirmedSuccess] = useState(false)

  // Escuta os serviços cadastrados pela manicure no Firebase Firestore
  useEffect(() => {
    const unsub = subscribeToServices((realList) => {
      if (realList && realList.length > 0) {
        const activeOnly = realList.filter((s) => s.active !== false)
        if (activeOnly.length > 0) {
          const merged = activeOnly.map((item) => {
            const fallback = SERVICES_DATA.find(
              (s) => s.id === item.id || s.name.toLowerCase() === (item.name || '').toLowerCase()
            )
            return {
              ...fallback,
              ...item,
              image: item.image || fallback?.image || manicureImg,
              included: item.included || fallback?.included || [
                'Atendimento personalizado',
                'Materiais esterilizados e descartáveis',
                'Finalização de alta durabilidade',
              ],
            }
          })
          setServicesList(merged)
        }
      }
    })
    return () => unsub()
  }, [])

  // Estados para gesto de arrastar para baixo e fechar (swipe down to dismiss)
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartY = useRef(0)
  const sheetRef = useRef(null)

  // Recupera seleção prévia caso exista
  useEffect(() => {
    try {
      const saved = localStorage.getItem('bella_client_selected_service')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed?.id) {
          setSelectedId(parsed.id)
        }
      }
    } catch {
      // Ignora erro
    }
  }, [])

  const selectedService = servicesList.find((s) => s.id === selectedId) || servicesList[0] || SERVICES_DATA[2]

  // Ao clicar em qualquer serviço, marca como selecionado e abre a confirmação
  const handleSelectService = (service) => {
    setSelectedId(service.id)
    setDragY(0)
    setIsClosing(false)
    setIsConfirmOpen(true)
  }

  // Fecha o modal suavemente com animação de saída
  const handleCloseConfirm = useCallback(() => {
    setIsClosing(true)
    setTimeout(() => {
      setIsConfirmOpen(false)
      setIsClosing(false)
      setDragY(0)
    }, 280)
  }, [])

  // =========================================================================
  // GESTO DE ARRASTAR DE CIMA PARA BAIXO PARA FECHAR (Swipe down to dismiss)
  // =========================================================================
  const handleTouchStart = (e) => {
    dragStartY.current = e.touches[0].clientY
    setIsDragging(true)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    const currentY = e.touches[0].clientY
    const deltaY = currentY - dragStartY.current

    if (deltaY > 0) {
      // Arrastando para baixo: segue 1:1
      setDragY(deltaY)
    } else {
      // Arrastando para cima: aplica resistência suave
      setDragY(deltaY * 0.15)
    }
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    if (dragY > 90) {
      // Ultrapassou o limiar de 90px: fecha o modal
      handleCloseConfirm()
    } else {
      // Volta para o topo suavemente
      setDragY(0)
    }
  }

  // Suporte a mouse drag no cabeçalho do modal (desktop)
  const handleMouseDown = (e) => {
    dragStartY.current = e.clientY
    setIsDragging(true)

    const onMouseMove = (moveEvent) => {
      const delta = moveEvent.clientY - dragStartY.current
      if (delta > 0) {
        setDragY(delta)
      } else {
        setDragY(delta * 0.15)
      }
    }

    const onMouseUp = () => {
      setIsDragging(false)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      setDragY((curr) => {
        if (curr > 90) {
          handleCloseConfirm()
          return curr
        }
        return 0
      })
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  // Confirmação final do agendamento do serviço
  const handleConfirm = () => {
    try {
      localStorage.setItem('bella_client_selected_service', JSON.stringify(selectedService))
    } catch {
      // Ignora
    }

    setConfirmedSuccess(true)
    setTimeout(() => {
      if (onConfirmService) {
        onConfirmService(selectedService)
      } else {
        alert(`Serviço "${selectedService.name}" selecionado com sucesso! Próxima etapa em desenvolvimento.`)
      }
    }, 550)
  }

  return (
    <div className="cls-screen">
      {/* ===================================================================
          Banner Superior Ilustrado com Logo, Slogan e Foto das Unhas
          =================================================================== */}
      <header className="cls-header-wrap">
        <img
          src={headerBannerImg}
          alt="Bella Nails - Studio de Unhas - Beleza em cada detalhe"
          className="cls-header-img"
        />

        {/* Flor Decorativa no Canto Direito (posicionada mais para baixo conforme design) */}
        <img
          src={flowerImg}
          alt=""
          className="cls-header-flower"
          aria-hidden="true"
        />
      </header>

      {/* ===================================================================
          Barra com Botão Voltar e Novo Stepper Compacto
          =================================================================== */}
      <div className="cls-nav-stepper-row">
        {/* Botão Voltar Circular Alinhado com as Bolinhas */}
        <button
          type="button"
          className="cls-floating-back-btn"
          onClick={onBack}
          aria-label="Voltar para tela anterior"
        >
          <ChevronLeftIcon className="cls-back-icon" />
        </button>

        {/* Stepper com 3 Etapas e Rótulos Textuais */}
        <div className="cls-stepper" aria-label="Progresso do agendamento: Passo 1 de 3">
          {/* Passo 1: Serviço (Ativo) */}
          <div className="cls-step-col is-active">
            <div className="cls-step-circle is-active">
              <CheckIcon className="cls-step-check" />
            </div>
            <span className="cls-step-label is-active">Serviço</span>
          </div>

          {/* Linha conectora 1 (comprimento reduzido para celular) */}
          <div className="cls-step-connector is-active" />

          {/* Passo 2: Data e horário */}
          <div className="cls-step-col">
            <div className="cls-step-circle is-current-dot">
              <span className="cls-step-inner-dot" />
            </div>
            <span className="cls-step-label">Data e horário</span>
          </div>

          {/* Linha conectora 2 */}
          <div className="cls-step-connector" />

          {/* Passo 3: Confirmação */}
          <div className="cls-step-col">
            <div className="cls-step-circle is-pending" />
            <span className="cls-step-label">Confirmação</span>
          </div>
        </div>
      </div>

      {/* ===================================================================
          Título e Subtítulo da Tela
          =================================================================== */}
      <div className="cls-heading-group">
        <h1 className="cls-title">Escolha o serviço</h1>
        <p className="cls-subtitle">Selecione o serviço que deseja agendar.</p>
      </div>

      {/* ===================================================================
          Lista dos 5 Serviços com Novo Layout e Miniaturas
          =================================================================== */}
      <main className="cls-services-list" role="list">
        {servicesList.map((service, idx) => {
          const isSelected = selectedId === service.id

          return (
            <article
              key={service.id}
              role="listitem"
              tabIndex={0}
              style={{ animationDelay: `${0.06 * (idx + 1)}s` }}
              className={`cls-service-card ${isSelected ? 'is-selected' : ''}`}
              onClick={() => handleSelectService(service)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleSelectService(service)
                }
              }}
              aria-label={`Serviço ${service.name}, valor ${service.price}, duração ${service.duration}`}
            >
              {/* Miniatura da Foto com Cantos Arredondados */}
              <div className="cls-card-thumb-wrap">
                <img
                  src={service.image}
                  alt={service.name}
                  className="cls-card-thumb"
                  loading="lazy"
                />
              </div>

              {/* Informações Centrais */}
              <div className="cls-card-body">
                <h2 className="cls-card-title">{service.name}</h2>
                <p className="cls-card-desc">{service.description}</p>

                {/* Badges Rosé: Duração e Preço */}
                <div className="cls-card-chips-row">
                  <div className="cls-card-chip">
                    <ClockIcon className="cls-chip-icon" />
                    <span>{service.duration}</span>
                  </div>

                  <div className="cls-card-chip is-price">
                    <TagIcon className="cls-chip-icon" />
                    <span>{service.price}</span>
                  </div>
                </div>
              </div>

              {/* Indicador de Seleção (Radio / Check) */}
              <div
                className={`cls-card-radio ${isSelected ? 'is-checked' : ''}`}
                aria-hidden="true"
              >
                {isSelected && <CheckIcon className="cls-radio-check-icon" />}
              </div>
            </article>
          )
        })}
      </main>

      {/* ===================================================================
          Modal de Confirmação com Gesto de Arrastar para Baixo para Fechar
          =================================================================== */}
      {isConfirmOpen && (
        <div
          className={`cls-modal-overlay ${isClosing ? 'is-closing' : ''}`}
          onClick={handleCloseConfirm}
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-service-title"
        >
          <div
            ref={sheetRef}
            className={`cls-modal-sheet ${isClosing ? 'is-closing' : ''} ${isDragging ? 'is-dragging' : ''}`}
            style={{
              transform: isClosing
                ? 'translateY(100%)'
                : `translateY(${Math.max(0, dragY)}px)`,
              transition: isDragging ? 'none' : undefined,
            }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Barra puxador superior interativa (arraste para baixo) */}
            <div
              className="cls-sheet-drag-area"
              onMouseDown={handleMouseDown}
              title="Puxe para baixo para fechar"
            >
              <div className="cls-sheet-drag-handle" aria-hidden="true" />
            </div>

            {/* Título e Subtítulo */}
            <h2 id="confirm-service-title" className="cls-modal-title">
              Confirmar serviço
            </h2>
            <p className="cls-modal-subtitle">
              Confira os detalhes do serviço selecionado.
            </p>

            {/* Card Branco com Foto, Nome, Duração e Preço */}
            <div className="cls-modal-preview-card">
              <div className="cls-preview-header">
                <img
                  src={selectedService.image}
                  alt={selectedService.name}
                  className="cls-preview-thumb"
                />
                <div className="cls-preview-info">
                  <h3 className="cls-preview-title">{selectedService.name}</h3>
                  <p className="cls-preview-desc">{selectedService.description}</p>
                </div>
              </div>

              {/* Chips de Duração e Valor lado a lado */}
              <div className="cls-preview-chips-row">
                <div className="cls-preview-chip">
                  <div className="cls-chip-icon-wrap">
                    <ClockIcon className="cls-chip-icon" />
                  </div>
                  <div className="cls-chip-texts">
                    <span className="cls-chip-label">Duração</span>
                    <strong className="cls-chip-value">
                      {selectedService.durationFull}
                    </strong>
                  </div>
                </div>

                <div className="cls-preview-chip">
                  <div className="cls-chip-icon-wrap">
                    <TagIcon className="cls-chip-icon" />
                  </div>
                  <div className="cls-chip-texts">
                    <span className="cls-chip-label">Valor</span>
                    <strong className="cls-chip-value">
                      {selectedService.price}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Card "O que está incluso?" */}
            <div className="cls-included-card">
              <div className="cls-included-header">
                <SparklesIcon className="cls-sparkles-icon" />
                <h4 className="cls-included-title">O que está incluso?</h4>
              </div>

              <ul className="cls-included-list">
                {selectedService.included.map((item, index) => (
                  <li key={index} className="cls-included-item">
                    <span className="cls-included-bullet" aria-hidden="true">
                      <CheckIcon className="cls-included-check-icon" />
                    </span>
                    <span className="cls-included-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Botões de Ação */}
            <div className="cls-modal-actions">
              <button
                type="button"
                className={`cls-confirm-btn ${confirmedSuccess ? 'is-success' : ''}`}
                onClick={handleConfirm}
              >
                <CheckIcon className="cls-action-btn-icon" />
                <span>
                  {confirmedSuccess ? 'Confirmado com sucesso!' : 'Confirmar agendamento'}
                </span>
              </button>

              <button
                type="button"
                className="cls-cancel-btn"
                onClick={handleCloseConfirm}
              >
                <ArrowLeftIcon className="cls-action-btn-icon" />
                <span>Escolher outro serviço</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Barra Flutuante Inferior com Alternância para Meus Agendamentos */}
      <ClientBottomNav
        activeTab="book"
        onTabChange={(tab) => {
          if (tab === 'appointments' && onViewAppointments) {
            onViewAppointments()
          }
        }}
      />
    </div>
  )
}
