import { useState } from 'react'
import anaPaulaImg from '../assets/team/ana-paula.png'
import julianaCostaImg from '../assets/team/juliana-costa.png'
import fernandaLimaImg from '../assets/team/fernanda-lima.png'
import {
  ArrowIcon,
  BanknoteIcon,
  CalendarPlusIcon,
  ChevronLeftIcon,
  CreditCardIcon,
  DebitCardIcon,
  PencilIcon,
  PixIcon,
  PlusIcon,
  TrashIcon,
} from '../icons.jsx'
import './Step4TeamPayments.css'

const initialTeam = [
  {
    id: 'ana-paula',
    name: 'Ana Paula',
    role: 'Especialista em alongamento',
    isOwner: true,
    avatar: anaPaulaImg,
  },
  {
    id: 'juliana-costa',
    name: 'Juliana Costa',
    role: 'Manicure',
    isOwner: false,
    avatar: julianaCostaImg,
  },
  {
    id: 'fernanda-lima',
    name: 'Fernanda Lima',
    role: 'Pedicure',
    isOwner: false,
    avatar: fernandaLimaImg,
  },
]

export default function Step4TeamPayments({ onBack, onContinue }) {
  const [team, setTeam] = useState(initialTeam)
  const [payments, setPayments] = useState({
    pix: true,
    cash: true,
    credit: true,
    debit: true,
  })
  const [deposit, setDeposit] = useState({
    active: true,
    value: 'R$ 20,00',
  })

  const togglePayment = (key) => {
    setPayments((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleDeleteMember = (id) => {
    setTeam((prev) => prev.filter((m) => m.id !== id))
  }

  const handleAddMember = () => {
    const newMember = {
      id: `member-${Date.now()}`,
      name: 'Nova Profissional',
      role: 'Manicure / Designer',
      isOwner: false,
      avatar: julianaCostaImg,
    }
    setTeam((prev) => [...prev, newMember])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onContinue?.({ team, payments, deposit })
  }

  return (
    <main className="screen team-screen">
      {/* Header: voltar + Passo 4 de 6 + 6 barras de progresso (4 preenchidas) */}
      <header className="team-header">
        <button
          id="team-back-button"
          className="team-back-btn"
          type="button"
          onClick={onBack}
          aria-label="Voltar para o passo anterior"
        >
          <ChevronLeftIcon />
        </button>

        <div className="team-progress-wrap">
          <span className="team-count-text">Passo 4 de 6</span>
          <div className="team-bars" aria-label="Progresso: Passo 4 de 6">
            <span className="team-bar active" />
            <span className="team-bar active" />
            <span className="team-bar active" />
            <span className="team-bar active" />
            <span className="team-bar" />
            <span className="team-bar" />
          </div>
        </div>
      </header>

      {/* Título elegante e Descrição */}
      <section className="team-intro">
        <h1 className="team-title">Equipe e pagamentos</h1>
        <p className="team-desc">
          Cadastre os profissionais que atendem no seu salão e defina as formas de pagamento aceitas.
        </p>
      </section>

      {/* Formulário com Seção de Profissionais e Formas de Pagamento */}
      <form className="team-form" onSubmit={handleSubmit}>
        {/* ===================================================================
            Seção: Profissionais
            =================================================================== */}
        <section className="team-section" aria-label="Profissionais do salão">
          <div className="team-sec-header">
            <h2 className="team-sec-title">Profissionais</h2>
            <button
              type="button"
              className="team-add-circle-btn"
              onClick={handleAddMember}
              aria-label="Adicionar profissional"
            >
              <PlusIcon />
            </button>
          </div>

          <div className="team-cards-list">
            {team.map((member) => {
              const { id, name, role, isOwner, avatar } = member

              return (
                <div key={id} id={`team-card-${id}`} className="team-member-card">
                  {/* Avatar circular com a foto da profissional */}
                  <div className="team-avatar-wrap">
                    <img
                      src={avatar}
                      alt={`Foto de ${name}`}
                      className="team-avatar-img"
                    />
                  </div>

                  {/* Nome, Cargo e Badge de Proprietária */}
                  <div className="team-member-info">
                    <h3 className="team-member-name">{name}</h3>
                    <span className="team-member-role">{role}</span>

                    {isOwner && (
                      <span className="team-owner-badge">Proprietária</span>
                    )}
                  </div>

                  {/* Botões de Ação: Editar (Lápis) e Deletar (Lixeira) */}
                  <div className="team-member-actions">
                    <button
                      type="button"
                      className="team-icon-btn"
                      aria-label={`Editar ${name}`}
                    >
                      <PencilIcon className="team-pencil-icon" />
                    </button>

                    {!isOwner && (
                      <button
                        type="button"
                        className="team-icon-btn is-delete"
                        onClick={() => handleDeleteMember(id)}
                        aria-label={`Excluir ${name}`}
                      >
                        <TrashIcon className="team-trash-icon" />
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Botão Pílula: + Adicionar profissional */}
          <button
            type="button"
            className="team-btn-add-pill"
            onClick={handleAddMember}
          >
            <PlusIcon className="team-pill-plus" />
            <span>Adicionar profissional</span>
          </button>
        </section>

        {/* ===================================================================
            Seção: Formas de pagamento
            =================================================================== */}
        <section className="team-section" aria-label="Formas de pagamento">
          <div className="team-sec-header">
            <h2 className="team-sec-title">Formas de pagamento</h2>
          </div>

          {/* Card Único contendo os 4 métodos de pagamento */}
          <div className="team-payments-card">
            {/* Pix */}
            <div className="payment-row">
              <div className="payment-left">
                <span className="payment-icon-wrap pix">
                  <PixIcon className="pix-svg-icon" />
                </span>
                <span className="payment-label">Pix</span>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={payments.pix}
                aria-label="Ativar pagamento via Pix"
                className={`team-switch ${payments.pix ? 'is-on' : 'is-off'}`}
                onClick={() => togglePayment('pix')}
              >
                <span className="switch-thumb" />
              </button>
            </div>

            {/* Dinheiro */}
            <div className="payment-row">
              <div className="payment-left">
                <span className="payment-icon-wrap cash">
                  <BanknoteIcon className="payment-svg-icon" />
                </span>
                <span className="payment-label">Dinheiro</span>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={payments.cash}
                aria-label="Ativar pagamento em Dinheiro"
                className={`team-switch ${payments.cash ? 'is-on' : 'is-off'}`}
                onClick={() => togglePayment('cash')}
              >
                <span className="switch-thumb" />
              </button>
            </div>

            {/* Cartão de crédito */}
            <div className="payment-row">
              <div className="payment-left">
                <span className="payment-icon-wrap card">
                  <CreditCardIcon className="payment-svg-icon" />
                </span>
                <span className="payment-label">Cartão de crédito</span>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={payments.credit}
                aria-label="Ativar Cartão de crédito"
                className={`team-switch ${payments.credit ? 'is-on' : 'is-off'}`}
                onClick={() => togglePayment('credit')}
              >
                <span className="switch-thumb" />
              </button>
            </div>

            {/* Cartão de débito */}
            <div className="payment-row">
              <div className="payment-left">
                <span className="payment-icon-wrap debit">
                  <DebitCardIcon className="payment-svg-icon" />
                </span>
                <span className="payment-label">Cartão de débito</span>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={payments.debit}
                aria-label="Ativar Cartão de débito"
                className={`team-switch ${payments.debit ? 'is-on' : 'is-off'}`}
                onClick={() => togglePayment('debit')}
              >
                <span className="switch-thumb" />
              </button>
            </div>
          </div>
        </section>

        {/* ===================================================================
            Card: Sinal antecipado (opcional)
            =================================================================== */}
        <section className="team-deposit-card" aria-label="Sinal antecipado">
          <div className="deposit-top-row">
            <div className="deposit-left">
              <span className="deposit-icon-wrap">
                <CalendarPlusIcon className="deposit-cal-icon" />
              </span>
              <div className="deposit-texts">
                <h3 className="deposit-title">Sinal antecipado (opcional)</h3>
                <p className="deposit-sub">
                  Solicitar um valor antecipado para confirmar agendamentos.
                </p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={deposit.active}
              aria-label="Ativar sinal antecipado"
              className={`team-switch ${deposit.active ? 'is-on' : 'is-off'}`}
              onClick={() =>
                setDeposit((prev) => ({ ...prev, active: !prev.active }))
              }
            >
              <span className="switch-thumb" />
            </button>
          </div>

          {/* Campo de valor do sinal */}
          <div className="deposit-input-group">
            <label className="deposit-label" htmlFor="deposit-value-input">
              Valor do sinal
            </label>
            <input
              id="deposit-value-input"
              type="text"
              className="deposit-input"
              value={deposit.value}
              onChange={(e) =>
                setDeposit((prev) => ({ ...prev, value: e.target.value }))
              }
              aria-label="Valor do sinal"
            />
          </div>
        </section>

        {/* ===================================================================
            Botões de Ação Inferiores (~38% Voltar / ~62% Continuar)
            =================================================================== */}
        <footer className="team-footer-actions">
          <button
            id="team-back-action"
            type="button"
            className="team-btn-back"
            onClick={onBack}
          >
            Voltar
          </button>

          <button
            id="team-continue-action"
            type="submit"
            className="team-btn-continue"
          >
            <span>Continuar</span>
            <ArrowIcon className="team-btn-arrow" />
          </button>
        </footer>
      </form>
    </main>
  )
}
