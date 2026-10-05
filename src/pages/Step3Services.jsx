import { useState } from 'react'
import manicureImg from '../assets/services/manicure.png'
import pedicureImg from '../assets/services/pedicure.png'
import alongamentoImg from '../assets/services/alongamento.png'
import banhoImg from '../assets/services/banho.png'
import nailartImg from '../assets/services/nailart.png'
import {
  ArrowIcon,
  ChevronLeftIcon,
  ClockIcon,
  PencilIcon,
  PlusIcon,
} from '../icons.jsx'
import './Step3Services.css'

const initialServices = [
  {
    id: 'manicure',
    name: 'Manicure',
    description: 'Cuidados das unhas com muito mais brilho.',
    duration: '45 min',
    price: 'R$ 30,00',
    image: manicureImg,
    active: true,
  },
  {
    id: 'pedicure',
    name: 'Pedicure',
    description: 'Bem-estar e beleza dos pés.',
    duration: '50 min',
    price: 'R$ 35,00',
    image: pedicureImg,
    active: true,
  },
  {
    id: 'alongamento',
    name: 'Alongamento em gel',
    description: 'Unhas mais fortes e duradouras.',
    duration: '1h 30 min',
    price: 'R$ 90,00',
    image: alongamentoImg,
    active: true,
  },
  {
    id: 'banho',
    name: 'Banho de gel',
    description: 'Brilho e resistência para suas unhas.',
    duration: '1h 00 min',
    price: 'R$ 70,00',
    image: banhoImg,
    active: true,
  },
  {
    id: 'nailart',
    name: 'Nail art',
    description: 'Detalhes que fazem a diferença.',
    duration: '15 min',
    price: 'R$ 10,00',
    image: nailartImg,
    active: true,
  },
]

export default function Step3Services({ onBack, onContinue }) {
  const [services, setServices] = useState(initialServices)
  const [editingId, setEditingId] = useState(null)
  const [editPrice, setEditPrice] = useState('')

  const toggleService = (id) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    )
  }

  const startEdit = (service) => {
    setEditingId(service.id)
    setEditPrice(service.price)
  }

  const saveEdit = (id) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, price: editPrice } : s))
    )
    setEditingId(null)
  }

  const handleAddService = () => {
    const newService = {
      id: `serv-${Date.now()}`,
      name: 'Novo Serviço',
      description: 'Descrição do serviço oferecido.',
      duration: '30 min',
      price: 'R$ 40,00',
      image: manicureImg,
      active: true,
    }
    setServices((prev) => [...prev, newService])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onContinue?.(services)
  }

  return (
    <main className="screen step3-screen">
      {/* Header: voltar + Passo 3 de 6 + 6 barras de progresso (3 preenchidas) */}
      <header className="step3-header">
        <button
          id="step3-back-button"
          className="step3-back-btn"
          type="button"
          onClick={onBack}
          aria-label="Voltar para o passo anterior"
        >
          <ChevronLeftIcon />
        </button>

        <div className="step3-progress-wrap">
          <span className="step3-count-text">Passo 3 de 6</span>
          <div className="step3-bars" aria-label="Progresso: Passo 3 de 6">
            <span className="step3-bar active" />
            <span className="step3-bar active" />
            <span className="step3-bar active" />
            <span className="step3-bar" />
            <span className="step3-bar" />
            <span className="step3-bar" />
          </div>
        </div>
      </header>

      {/* Título elegante e Descrição */}
      <section className="step3-intro">
        <h1 className="step3-title">Serviços e preços</h1>
        <p className="step3-desc">
          Cadastre os serviços que você oferece no seu salão.
        </p>
      </section>

      {/* Lista de cards de serviços */}
      <form className="step3-form" onSubmit={handleSubmit}>
        <div className="step3-cards-list">
          {services.map((service) => {
            const { id, name, description, duration, price, image, active } = service
            const isEditing = editingId === id

            return (
              <div
                key={id}
                id={`step3-card-${id}`}
                className={`step3-card ${active ? 'is-active' : 'is-inactive'}`}
              >
                {/* Thumbnail com foto real das unhas */}
                <div className="step3-thumb-wrap">
                  <img
                    src={image}
                    alt={`Foto ilustrativa de ${name}`}
                    className="step3-thumb-img"
                    loading="lazy"
                  />
                </div>

                {/* Conteúdo central: título, descrição, duração e preço */}
                <div className="step3-info">
                  {/* Linha superior: Nome + Ações (Editar e Switch) */}
                  <div className="step3-top-row">
                    <h2 className="step3-name">{name}</h2>

                    <div className="step3-actions-group">
                      <button
                        type="button"
                        className="step3-edit-btn"
                        onClick={() => (isEditing ? saveEdit(id) : startEdit(service))}
                        aria-label={`Editar preço de ${name}`}
                      >
                        <PencilIcon className="step3-edit-icon" />
                      </button>

                      <button
                        type="button"
                        role="switch"
                        aria-checked={active}
                        aria-label={`Ativar serviço ${name}`}
                        className={`step3-switch ${active ? 'is-on' : 'is-off'}`}
                        onClick={() => toggleService(id)}
                      >
                        <span className="switch-thumb" />
                      </button>
                    </div>
                  </div>

                  {/* Descrição curta */}
                  <p className="step3-desc-text">{description}</p>

                  {/* Linha inferior: Duração com relógio + Preço em destaque */}
                  <div className="step3-bottom-row">
                    <div className="step3-duration">
                      <ClockIcon className="step3-clock-icon" />
                      <span>{duration}</span>
                    </div>

                    <div className="step3-price-box">
                      {isEditing ? (
                        <input
                          type="text"
                          className="step3-price-input"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          onBlur={() => saveEdit(id)}
                          onKeyDown={(e) => e.key === 'Enter' && saveEdit(id)}
                          autoFocus
                        />
                      ) : (
                        <span className="step3-price">{price}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Botão tracejado: Adicionar novo serviço */}
          <button
            id="step3-add-button"
            type="button"
            className="step3-add-card"
            onClick={handleAddService}
          >
            <div className="step3-add-plus">
              <PlusIcon />
            </div>
            <span className="step3-add-text">Adicionar novo serviço</span>
          </button>
        </div>

        {/* Botões de Ação Inferiores: proporções exatas do design (~38% Voltar / ~62% Continuar) */}
        <footer className="step3-footer-actions">
          <button
            id="step3-back-action"
            type="button"
            className="step3-btn-back"
            onClick={onBack}
          >
            Voltar
          </button>

          <button
            id="step3-continue-action"
            type="submit"
            className="step3-btn-continue"
          >
            <span>Continuar</span>
            <ArrowIcon className="step3-btn-arrow" />
          </button>
        </footer>
      </form>
    </main>
  )
}
