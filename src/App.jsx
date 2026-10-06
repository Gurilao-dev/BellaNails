import { useCallback, useEffect, useState } from 'react'
import Welcome from './pages/Welcome.jsx'
import Plans from './pages/Plans.jsx'
import Success from './pages/Success.jsx'
import Onboarding from './pages/Onboarding.jsx'
import Step1SalonInfo from './pages/Step1SalonInfo.jsx'
import Step2Schedule from './pages/Step2Schedule.jsx'
import Step3Services from './pages/Step3Services.jsx'
import Step4TeamPayments from './pages/Step4TeamPayments.jsx'
import Step5FinalConclusion from './pages/Step5FinalConclusion.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Agenda from './pages/Agenda.jsx'
import Clientes from './pages/Clientes.jsx'
import Services from './pages/Services.jsx'
import Financeiro from './pages/Financeiro.jsx'
import Configuracoes from './pages/Configuracoes.jsx'
import ClientLanding from './pages/client/ClientLanding.jsx'
import ClientRegister from './pages/client/ClientRegister.jsx'
import ClientServices from './pages/client/ClientServices.jsx'
import ClientSchedule from './pages/client/ClientSchedule.jsx'
import ClientConfirmation from './pages/client/ClientConfirmation.jsx'

const ROUTES = {
  client: '/',
  clientLanding: '/cliente',
  clientRegister: '/cliente/cadastro',
  clientServices: '/cliente/servicos',
  clientSchedule: '/cliente/agendamento',
  clientConfirmation: '/cliente/confirmacao',
  welcome: '/boas-vindas',
  plans: '/planos',
  success: '/confirmacao',
  onboarding: '/configuracao',
  step1: '/passo-1',
  step2: '/passo-2',
  step3: '/passo-3',
  step4: '/passo-4',
  step5: '/passo-5',
  dashboard: '/painel',
  agenda: '/agenda',
  clientes: '/clientes',
  servicos: '/servicos',
  financeiro: '/financeiro',
  configuracoes: '/configuracoes',
  mais: '/mais',
}

const routeFromPath = (path) => {
  const hash = typeof window !== 'undefined' ? window.location.hash.replace(/^#\/?/, '') : ''
  if (hash) {
    if (hash === 'cliente/confirmacao' || hash === 'confirmacao' || hash === 'client-confirmation' || hash === 'confirmar') return 'clientConfirmation'
    if (hash === 'cliente/agendamento' || hash === 'agendamento' || hash === 'client-schedule' || hash === 'horario') return 'clientSchedule'
    if (hash === 'cliente/servicos' || hash === 'servicos-cliente' || hash === 'client-services') return 'clientServices'
    if (hash === 'cadastro' || hash === 'cliente/cadastro' || hash === 'client-register') return 'clientRegister'
    if (hash === 'cliente' || hash === 'agendar' || hash === 'client') return 'client'
    if (hash === 'configuracoes' || hash === 'mais') return 'configuracoes'
    if (hash === 'financeiro') return 'financeiro'
    if (hash === 'servicos') return 'servicos'
    if (hash === 'clientes') return 'clientes'
    if (hash === 'agenda') return 'agenda'
    if (hash === 'dashboard' || hash === 'painel') return 'dashboard'
    if (hash === 'step5' || hash === 'passo-5') return 'step5'
    if (hash === 'step4' || hash === 'passo-4') return 'step4'
    if (hash === 'step3' || hash === 'passo-3') return 'step3'
    if (hash === 'step2' || hash === 'passo-2') return 'step2'
    if (hash === 'step1' || hash === 'passo-1') return 'step1'
    if (hash === 'onboarding' || hash === 'configuracao') return 'onboarding'
    if (hash === 'success' || hash === 'confirmacao') return 'success'
    if (hash === 'plans' || hash === 'planos') return 'plans'
  }
  const p = path || (typeof window !== 'undefined' ? window.location.pathname : '/')
  if (p.startsWith('/cliente/confirmacao') || p.startsWith('/confirmacao') || p.startsWith('/confirmar')) return 'clientConfirmation'
  if (p.startsWith('/cliente/agendamento') || p.startsWith('/agendamento')) return 'clientSchedule'
  if (p.startsWith('/cliente/servicos') || p.startsWith('/servicos-cliente')) return 'clientServices'
  if (p.startsWith('/cliente/cadastro') || p.startsWith('/cadastro')) return 'clientRegister'
  if (p.startsWith('/cliente') || p.startsWith('/agendar')) return 'client'
  if (p.startsWith(ROUTES.configuracoes) || p.startsWith(ROUTES.mais)) return 'configuracoes'
  if (p.startsWith(ROUTES.financeiro)) return 'financeiro'
  if (p.startsWith(ROUTES.servicos)) return 'servicos'
  if (p.startsWith(ROUTES.clientes)) return 'clientes'
  if (p.startsWith(ROUTES.agenda)) return 'agenda'
  if (p.startsWith(ROUTES.dashboard)) return 'dashboard'
  if (p.startsWith(ROUTES.step5)) return 'step5'
  if (p.startsWith(ROUTES.step4)) return 'step4'
  if (p.startsWith(ROUTES.step3)) return 'step3'
  if (p.startsWith(ROUTES.step2)) return 'step2'
  if (p.startsWith(ROUTES.step1)) return 'step1'
  if (p.startsWith(ROUTES.onboarding)) return 'onboarding'
  if (p.startsWith(ROUTES.success)) return 'success'
  if (p.startsWith(ROUTES.plans)) return 'plans'
  if (p.startsWith('/boas-vindas') || p.startsWith('/welcome')) return 'welcome'
  return 'client'
}

export default function App() {
  const [route, setRoute] = useState(() => routeFromPath(window.location.pathname))

  // Suporte ao botão voltar do navegador / celular e mudanças de hash
  useEffect(() => {
    const onPop = () => setRoute(routeFromPath(window.location.pathname))
    window.addEventListener('popstate', onPop)
    window.addEventListener('hashchange', onPop)
    return () => {
      window.removeEventListener('popstate', onPop)
      window.removeEventListener('hashchange', onPop)
    }
  }, [])

  const navigate = useCallback((to) => {
    window.history.pushState({ fromApp: true }, '', ROUTES[to])
    setRoute(to)
    window.scrollTo(0, 0)
  }, [])

  const goBack = useCallback(() => {
    if (window.history.state?.fromApp) window.history.back()
    else navigate('client')
  }, [navigate])

  const handleTabNavigate = useCallback((tab) => {
    if (tab === 'painel' || tab === 'inicio') navigate('dashboard')
    else if (tab === 'agenda') navigate('agenda')
    else if (tab === 'clientes') navigate('clientes')
    else if (tab === 'servicos') navigate('servicos')
    else if (tab === 'financeiro') navigate('financeiro')
    else if (tab === 'mais' || tab === 'configuracoes') navigate('configuracoes')
    else if (ROUTES[tab]) navigate(tab)
  }, [navigate])

  const isClientFlow = ['client', 'clientRegister', 'clientServices', 'clientSchedule', 'clientConfirmation'].includes(route)

  return (
    <div className="page" key={route}>
      {route === 'configuracoes' || route === 'mais' ? (
        <Configuracoes onNavigateTab={handleTabNavigate} />
      ) : route === 'financeiro' ? (
        <Financeiro onNavigateTab={handleTabNavigate} />
      ) : route === 'servicos' ? (
        <Services onNavigateTab={handleTabNavigate} />
      ) : route === 'clientes' ? (
        <Clientes onNavigateTab={handleTabNavigate} />
      ) : route === 'agenda' ? (
        <Agenda onNavigateTab={handleTabNavigate} />
      ) : route === 'dashboard' ? (
        <Dashboard onNavigateTab={handleTabNavigate} />
      ) : route === 'step5' ? (
        <Step5FinalConclusion
          onBack={goBack}
          onFinish={() => navigate('dashboard')}
        />
      ) : route === 'step4' ? (
        <Step4TeamPayments
          onBack={goBack}
          onContinue={() => navigate('step5')}
        />
      ) : route === 'step3' ? (
        <Step3Services
          onBack={goBack}
          onContinue={() => navigate('step4')}
        />
      ) : route === 'step2' ? (
        <Step2Schedule
          onBack={goBack}
          onContinue={() => navigate('step3')}
        />
      ) : route === 'step1' ? (
        <Step1SalonInfo
          onBack={goBack}
          onContinue={() => navigate('step2')}
        />
      ) : route === 'onboarding' ? (
        <Onboarding onStart={() => navigate('step1')} />
      ) : route === 'success' ? (
        <Success onContinue={() => navigate('onboarding')} />
      ) : route === 'plans' ? (
        <Plans onBack={goBack} onContinue={() => navigate('success')} />
      ) : route === 'clientConfirmation' ? (
        <ClientConfirmation
          onBack={() => navigate('clientSchedule')}
          onEdit={() => navigate('clientSchedule')}
          onConfirm={(finalData) => {
            console.log('Agendamento finalizado com sucesso:', finalData)
            navigate('client')
          }}
        />
      ) : route === 'clientSchedule' ? (
        <ClientSchedule
          onBack={() => navigate('clientServices')}
          onContinue={() => navigate('clientConfirmation')}
        />
      ) : route === 'clientServices' ? (
        <ClientServices
          onBack={() => navigate('clientRegister')}
          onConfirmService={(service) => {
            console.log('Serviço confirmado:', service)
            navigate('clientSchedule')
          }}
        />
      ) : route === 'clientRegister' ? (
        <ClientRegister
          onBack={() => navigate('client')}
          onContinue={() => navigate('clientServices')}
        />
      ) : route === 'client' ? (
        <ClientLanding
          onNavigateAdmin={() => navigate('dashboard')}
          onBookNow={() => navigate('clientRegister')}
        />
      ) : (
        <Welcome
          onSubscribe={() => navigate('plans')}
          onViewClient={() => navigate('client')}
        />
      )}

      {/* Alternador Rápido de Ambiente: Admin (Manicure) vs Cliente (Agendamento) */}
      <aside className="portal-dev-switcher" aria-label="Alternar visão entre manicure e cliente">
        <button
          type="button"
          className={`portal-dev-btn ${!isClientFlow ? 'is-active' : ''}`}
          onClick={() => navigate('dashboard')}
          title="Ver o painel e ferramentas da Manicure (Admin)"
        >
          <span>👑 Manicure</span>
        </button>
        <button
          type="button"
          className={`portal-dev-btn ${isClientFlow ? 'is-active' : ''}`}
          onClick={() => navigate('client')}
          title="Ver a página pública de agendamento da Cliente"
        >
          <span>💅 Cliente</span>
        </button>
      </aside>
    </div>
  )
}
