import { useEffect, useMemo, useState } from 'react'
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bot,
  BrainCircuit,
  Check,
  CheckCircle2,
  ChevronRight,
  Clipboard,
  ExternalLink,
  Github,
  LineChart,
  LockKeyhole,
  MessageSquare,
  Play,
  Radar,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Wallet,
  X,
  Zap,
} from 'lucide-react'

import { findKeywordPageByPath, keywordPages, type KeywordPage } from './content/keyword-pages'
import { legalPrivacySections, legalTermsSections, type LegalSection } from './content/legal'
import { trackEvent, trackPageView } from './lib/analytics'
import {
  agentOptions,
  analyzeTraderSelection,
  defaultTraderSelection,
  horizonOptions,
  marketOptions,
  riskOptions,
  workflowOptions,
  type Option,
  type PlanId,
  type TraderSelection,
} from './lib/mission'
import { buildSeoDocument, syncSeoDocument } from './lib/seo'
import { deriveRouteView, normalizePathname, scrollToHashTarget, type RouteView } from './lib/routing'

const defaultPublicAppOrigin = 'https://ai-trader.best'
const pagesApiBaseUrl = 'https://my-ai-trader.yangdengkui01.workers.dev'

type Billing = 'monthly' | 'annual'

type CheckoutModalState = {
  planId: PlanId
  billing: Billing
  loadingKey: string
  status: 'loading' | 'popup' | 'retry'
  checkoutUrl?: string
}

const ctaPrimary = 'Choose Operator annual'
const ctaCheckout = 'Checkout Operator annual'

const plans: Array<{
  id: PlanId
  name: string
  shortName: string
  tagline: string
  monthlyUsd: number
  bullets: string[]
  popular?: boolean
}> = [
  {
    id: 'starter',
    name: 'Starter',
    shortName: 'Starter',
    tagline: 'A single-agent evaluation desk for one market and paper-trading review.',
    monthlyUsd: 29,
    bullets: ['One AI signal workflow', 'Paper-trading checklist', 'GitHub and app review notes', 'Email support'],
  },
  {
    id: 'pro',
    name: 'Operator',
    shortName: 'Operator',
    tagline: 'The default plan for serious signal review, prediction tracking, and guarded copy trading.',
    monthlyUsd: 99,
    popular: true,
    bullets: ['Signal, prediction, and copy-trading desk', 'ChatGPT or bot workflow review', 'Risk gates and outcome scoring', 'Priority onboarding'],
  },
  {
    id: 'desk',
    name: 'Desk',
    shortName: 'Desk',
    tagline: 'For teams running competitions, marketplace publishing, or multiple agent operators.',
    monthlyUsd: 249,
    bullets: ['Multi-agent competition structure', 'Marketplace and provider rules', 'Governance and dispute posture', 'Dedicated rollout support'],
  },
]

const proofItems = [
  { label: 'Default plan', value: 'Operator', detail: 'Middle tier selected before checkout' },
  { label: 'Annual savings', value: '50%', detail: 'Annual billing is active by default' },
  { label: 'Risk mode', value: 'Paper first', detail: 'No live credentials requested on the public site' },
  { label: 'Signal types', value: '3', detail: 'Strategies, operations, and discussions stay separate' },
]

const workflowCards = [
  {
    title: 'Signal quality before signal volume',
    body: 'Score thesis, counter-evidence, timestamp, invalidation, and outcome review before promoting a trade idea.',
    icon: <Radar size={21} />,
  },
  {
    title: 'Copy trading with a human gate',
    body: 'Review provider history, recency, drawdown, and follower exposure before a copied operation can matter.',
    icon: <ShieldCheck size={21} />,
  },
  {
    title: 'Agent-native participation',
    body: 'Plan registration, heartbeat, signal publishing, and notifications for ChatGPT-style or custom trading bots.',
    icon: <Bot size={21} />,
  },
  {
    title: 'Marketplace incentives in view',
    body: 'Keep paid content, reputation, delivery, and dispute boundaries separate from execution permission.',
    icon: <Wallet size={21} />,
  },
]

const trustLinks = [
  {
    label: 'AI-Trader GitHub',
    href: '/ai-trader-github',
    icon: <Github size={17} />,
    internal: true,
  },
  {
    label: 'Review framework',
    href: '/ai-trader-review',
    icon: <BadgeCheck size={17} />,
    internal: true,
  },
  {
    label: 'Upstream source',
    href: 'https://github.com/HKUDS/AI-Trader',
    icon: <ExternalLink size={17} />,
  },
]

function formatMoney(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value)
}

function resolveApiBaseUrl() {
  const configured = (import.meta.env.VITE_API_BASE_URL ?? '').trim().replace(/\/+$/, '')
  if (configured) return configured
  if (window.location.hostname.endsWith('.pages.dev')) return pagesApiBaseUrl
  return ''
}

function resolveApiUrl(path: string) {
  const apiBaseUrl = resolveApiBaseUrl()
  return apiBaseUrl ? `${apiBaseUrl}${path}` : path
}

async function readJsonResponse<T>(response: Response): Promise<T | null> {
  const rawText = await response.text()
  if (!rawText.trim()) return null
  try {
    return JSON.parse(rawText) as T
  } catch {
    return null
  }
}

async function createCheckoutSession(planId: PlanId, billing: Billing) {
  const response = await fetch(resolveApiUrl('/api/checkout'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ planId, billing }),
  })

  const payload = await readJsonResponse<{ ok?: boolean; checkoutUrl?: string; error?: string }>(response)
  if (!response.ok || !payload?.ok || !payload.checkoutUrl) {
    throw new Error(payload?.error || 'Checkout could not be started.')
  }

  return payload.checkoutUrl
}

function openCenteredCheckoutWindow() {
  const width = 560
  const height = 760
  const left = Math.max(0, Math.round(window.screenX + (window.outerWidth - width) / 2))
  const top = Math.max(0, Math.round(window.screenY + (window.outerHeight - height) / 2))
  const popup = window.open(
    'about:blank',
    'ai-trader-checkout',
    `popup=yes,width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`,
  )

  if (popup) {
    try {
      popup.document.title = 'Opening secure checkout'
      popup.document.body.innerHTML =
        '<main style="min-height:100vh;display:grid;place-items:center;background:#111827;color:#f8fafc;font-family:ui-sans-serif,system-ui,sans-serif;text-align:center;padding:32px"><div><h1 style="font-size:22px;margin:0 0 8px">Opening secure checkout...</h1><p style="margin:0;color:#cbd5e1">Your AI-Trader payment window is being prepared.</p></div></main>'
    } catch {
      /* Existing named checkout windows can be cross-origin. */
    }
  }

  return popup
}

function sendPopupToCheckout(popup: Window | null, url: string) {
  if (!popup || popup.closed) return false

  try {
    popup.location.replace(url)
    popup.focus()
    return true
  } catch {
    return false
  }
}

function useRouteSignal() {
  const [pathname, setPathname] = useState(() => window.location.pathname)
  const [search, setSearch] = useState(() => window.location.search)

  function navigate(to: string) {
    const url = new URL(to, window.location.origin)
    window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`)
    setPathname(url.pathname)
    setSearch(url.search)

    if (url.hash) {
      requestAnimationFrame(() => scrollToHashTarget(url.hash))
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const onPop = () => {
      setPathname(window.location.pathname)
      setSearch(window.location.search)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return { pathname, search, navigate }
}

function CheckoutDoneBridge({ publicAppOrigin }: { publicAppOrigin: string }) {
  useEffect(() => {
    const origin = window.location.origin || new URL(publicAppOrigin).origin

    if (window.parent !== window) {
      window.parent.postMessage({ type: 'ai-trader-checkout-complete' }, origin)
      return
    }

    if (window.opener) {
      try {
        window.opener.postMessage({ type: 'ai-trader-checkout-complete' }, origin)
      } catch {
        /* The opener may be closed or cross-origin. */
      }
      window.close()
      return
    }

    window.location.replace(`${origin}/?payment=success`)
  }, [publicAppOrigin])

  return (
    <main className="at-main">
      <section className="at-center-panel">
        <p className="at-eyebrow">Checkout</p>
        <h1>Finishing checkout...</h1>
        <p className="at-muted">You will return to the AI-Trader homepage when the hosted payment session closes.</p>
      </section>
    </main>
  )
}

export default function App() {
  const { pathname, search, navigate } = useRouteSignal()
  const routeView: RouteView = useMemo(() => deriveRouteView(pathname), [pathname])
  const normalizedPath = normalizePathname(pathname)
  const keywordPage = useMemo(() => findKeywordPageByPath(pathname), [pathname])

  const [publicAppOrigin, setPublicAppOrigin] = useState(defaultPublicAppOrigin)
  const [headerCompact, setHeaderCompact] = useState(() => window.scrollY > 18)
  const [billing, setBilling] = useState<Billing>('annual')
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>('pro')
  const [selection, setSelection] = useState<TraderSelection>(defaultTraderSelection)
  const [copied, setCopied] = useState(false)
  const [checkoutModal, setCheckoutModal] = useState<CheckoutModalState | null>(null)
  const [checkoutLoadingKey, setCheckoutLoadingKey] = useState<string | null>(null)

  const traderPlan = useMemo(() => analyzeTraderSelection(selection), [selection])

  useEffect(() => {
    const onScroll = () => setHeaderCompact(window.scrollY > 18)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const seo = buildSeoDocument({ pathname, routeView, publicAppOrigin, keywordPage })
    syncSeoDocument(seo)
    trackPageView(`${pathname}${search}`)
  }, [keywordPage, pathname, publicAppOrigin, routeView, search])

  useEffect(() => {
    let active = true
    fetch(resolveApiUrl('/api/runtime'))
      .then((response) => readJsonResponse<{ publicAppOrigin?: string }>(response))
      .then((payload) => {
        if (active && payload?.publicAppOrigin) setPublicAppOrigin(payload.publicAppOrigin)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      if (event.data?.type !== 'ai-trader-checkout-complete') return
      setCheckoutModal(null)
      setCheckoutLoadingKey(null)
      trackEvent('checkout_success_return', { provider: 'creem' })
      navigate('/?payment=success')
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [navigate])

  function openPage(path: string) {
    trackEvent('internal_navigation', { target: path })
    navigate(path)
  }

  function updateSelection<K extends keyof TraderSelection>(key: K, value: TraderSelection[K]) {
    setSelection((current) => ({ ...current, [key]: value }))
    trackEvent('planner_change', { field: key, value })
  }

  function renderOptionButtons<K extends keyof TraderSelection>(key: K, options: Option<TraderSelection[K]>[]) {
    return (
      <div className="at-option-grid">
        {options.map((option) => (
          <button
            type="button"
            className="at-option"
            data-active={selection[key] === option.id ? 'true' : 'false'}
            onClick={() => updateSelection(key, option.id)}
            key={option.id}
          >
            <strong>{option.label}</strong>
            <span>{option.summary}</span>
          </button>
        ))}
      </div>
    )
  }

  async function copyDeskPlan() {
    try {
      await navigator.clipboard.writeText(traderPlan.draftLines.join('\n'))
      setCopied(true)
      trackEvent('planner_copy', { market: selection.market, workflow: selection.workflow })
      window.setTimeout(() => setCopied(false), 1800)
    } catch {}
  }

  async function startHostedCheckout(planId: PlanId, billingCycle: Billing, loadingKey: string) {
    const popup = openCenteredCheckoutWindow()
    setSelectedPlanId(planId)
    setBilling(billingCycle)
    setCheckoutLoadingKey(loadingKey)
    setCheckoutModal({ planId, billing: billingCycle, loadingKey, status: 'loading' })
    trackEvent('checkout_open_start', { planId, billing: billingCycle, popup: Boolean(popup) })

    try {
      const checkoutUrl = await createCheckoutSession(planId, billingCycle)
      const popupReady = sendPopupToCheckout(popup, checkoutUrl)
      trackEvent('checkout_session_created', { planId, billing: billingCycle, popupReady })
      setCheckoutModal({ planId, billing: billingCycle, loadingKey, status: popupReady ? 'popup' : 'retry', checkoutUrl })
    } catch (error) {
      try {
        popup?.close()
      } catch {}
      trackEvent('checkout_session_failed', { planId, billing: billingCycle, message: error instanceof Error ? error.message : 'unknown' })
      setCheckoutModal({ planId, billing: billingCycle, loadingKey, status: 'retry' })
    } finally {
      setCheckoutLoadingKey(null)
    }
  }

  function chooseOperatorAnnual(source: string) {
    setBilling('annual')
    setSelectedPlanId('pro')
    trackEvent('primary_cta_click', { source, planId: 'pro', billing: 'annual' })
    void startHostedCheckout('pro', 'annual', `cta-${source}`)
  }

  const renderHeader = () => (
    <header className={`at-header${headerCompact ? ' compact' : ''}`}>
      <div className="at-header-inner">
        <a
          className="at-brand"
          href="/"
          onClick={(event) => {
            event.preventDefault()
            openPage('/')
          }}
        >
          <span className="at-brand-mark">
            <LineChart size={22} />
          </span>
          <span className="at-brand-copy">
            <strong>AI-Trader</strong>
            <span>Agent trading desk</span>
          </span>
        </a>
        <nav className="at-nav" aria-label="Primary navigation">
          <a href="/ai-trader-app" onClick={(event) => { event.preventDefault(); openPage('/ai-trader-app') }}>App</a>
          <a href="/ai-trader-bot" onClick={(event) => { event.preventDefault(); openPage('/ai-trader-bot') }}>Bot</a>
          <a href="/ai-trader-prediction" onClick={(event) => { event.preventDefault(); openPage('/ai-trader-prediction') }}>Prediction</a>
          <a href="/pricing" onClick={(event) => { event.preventDefault(); openPage('/pricing') }}>Pricing</a>
        </nav>
        <button type="button" className="at-btn at-btn-primary at-header-cta" onClick={() => chooseOperatorAnnual('header')}>
          <Rocket size={18} />
          {ctaPrimary}
        </button>
      </div>
    </header>
  )

  const renderTraderPanel = () => (
    <aside className="at-workspace-panel" id="planner" aria-label="AI-Trader planner">
      <div className="at-panel-top">
        <div>
          <p className="at-eyebrow">Live desk planner</p>
          <h2>{traderPlan.headline}</h2>
        </div>
        <div className="at-score">
          <strong>{traderPlan.fitScore}</strong>
          <span>{traderPlan.fitLabel}</span>
        </div>
      </div>

      <div className="at-choice-stack">
        <section>
          <div className="at-choice-label">Market</div>
          {renderOptionButtons('market', marketOptions)}
        </section>
        <section>
          <div className="at-choice-label">Workflow</div>
          {renderOptionButtons('workflow', workflowOptions)}
        </section>
        <section className="at-split-options">
          <div>
            <div className="at-choice-label">Agent</div>
            {renderOptionButtons('agent', agentOptions)}
          </div>
          <div>
            <div className="at-choice-label">Risk</div>
            {renderOptionButtons('risk', riskOptions)}
          </div>
        </section>
        <section>
          <div className="at-choice-label">Horizon</div>
          {renderOptionButtons('horizon', horizonOptions)}
        </section>
      </div>

      <div className="at-result-grid">
        {traderPlan.modules.map((module) => (
          <article key={module.label}>
            <span>{module.label}</span>
            <strong>{module.detail}</strong>
          </article>
        ))}
      </div>

      <div className="at-config-box">
        <div className="at-config-head">
          <div>
            <p className="at-eyebrow">Generated desk note</p>
            <h3>{traderPlan.deskMode}</h3>
          </div>
          <button type="button" className="at-icon-btn" onClick={() => void copyDeskPlan()} aria-label="Copy desk note">
            <Clipboard size={17} />
          </button>
        </div>
        <pre>{traderPlan.draftLines.join('\n')}</pre>
        {copied ? <span className="at-copy-note">Copied</span> : null}
      </div>

      <div className="at-next-box">
        <div>
          <p className="at-eyebrow">Recommended next move</p>
          <h3>{traderPlan.operatorMessage}</h3>
          <p>{traderPlan.guardrails[0]}</p>
        </div>
        <button type="button" className="at-btn at-btn-primary" onClick={() => chooseOperatorAnnual('planner')}>
          <Play size={18} />
          {ctaPrimary}
        </button>
      </div>
    </aside>
  )

  const renderPricingSection = (standalone = false) => (
    <section className={`at-section at-pricing-section${standalone ? ' standalone' : ''}`} id="pricing">
      <div className="at-section-head at-pricing-head">
        <div>
          <p className="at-eyebrow">Pricing</p>
          <h2>Operator is selected because real AI trading workflows need review, paper mode, and risk gates.</h2>
          <p>Annual billing is active by default and is 50% cheaper than paying month to month.</p>
        </div>
        <div className="at-cycle" role="group" aria-label="Billing cycle">
          <button
            type="button"
            data-active={billing === 'monthly' ? 'true' : 'false'}
            onClick={() => {
              setBilling('monthly')
              trackEvent('billing_cycle_change', { billing: 'monthly' })
            }}
          >
            Monthly
          </button>
          <button
            type="button"
            data-active={billing === 'annual' ? 'true' : 'false'}
            onClick={() => {
              setBilling('annual')
              trackEvent('billing_cycle_change', { billing: 'annual' })
            }}
          >
            Annual - 50% off
          </button>
        </div>
      </div>

      <div className="at-plan-grid">
        {plans.map((plan) => {
          const monthly = billing === 'annual' ? plan.monthlyUsd * 0.5 : plan.monthlyUsd
          const strike = billing === 'annual' ? plan.monthlyUsd : null
          const loadingKey = `plan-${plan.id}-${billing}`
          const active = selectedPlanId === plan.id

          return (
            <article className="at-plan-card" data-popular={plan.popular ? 'true' : 'false'} data-active={active ? 'true' : 'false'} key={plan.id}>
              {plan.popular ? <span className="at-plan-badge">Default choice</span> : null}
              <h3>{plan.name}</h3>
              <p>{plan.tagline}</p>
              <div className="at-price-line">
                {formatMoney(monthly)}
                <small>/mo</small>
                {strike ? <span>{formatMoney(strike)}</span> : null}
              </div>
              <strong className="at-billing-note">
                {billing === 'annual' ? `${formatMoney(monthly * 12)} billed annually` : 'Billed monthly'}
              </strong>
              <ul>
                {plan.bullets.map((bullet) => (
                  <li key={bullet}>
                    <Check size={15} />
                    {bullet}
                  </li>
                ))}
              </ul>
              <div className="at-plan-actions">
                <button
                  type="button"
                  className={plan.popular ? 'at-btn at-btn-primary' : 'at-btn at-btn-ghost'}
                  onClick={() => void startHostedCheckout(plan.id, billing, loadingKey)}
                  onMouseEnter={() => setSelectedPlanId(plan.id)}
                  disabled={checkoutLoadingKey !== null}
                >
                  {checkoutLoadingKey === loadingKey ? 'Opening secure checkout...' : plan.id === 'pro' ? ctaCheckout : `Checkout ${plan.shortName} ${billing}`}
                </button>
                {active ? <span className="at-plan-selected">Selected</span> : null}
              </div>
            </article>
          )
        })}
      </div>

      {standalone ? (
        <div className="at-faq-grid">
          <article>
            <h3>Why is Operator selected first?</h3>
            <p>Most serious buyers need paper-trading posture, signal review, and copy-trading guardrails before they need a heavier desk.</p>
          </article>
          <article>
            <h3>Why annual by default?</h3>
            <p>Signal quality and prediction review need repeated cycles. Annual pricing cuts the monthly run-rate by 50%.</p>
          </article>
          <article>
            <h3>Does payment replace this page?</h3>
            <p>No. Checkout opens in a centered Creem popup and the product page stays visible behind a blurred overlay.</p>
          </article>
        </div>
      ) : null}
    </section>
  )

  const renderHome = () => {
    const paymentSuccess = new URLSearchParams(search).get('payment') === 'success'

    return (
      <main className="at-main">
        {paymentSuccess ? (
          <section className="at-success-banner">
            <CheckCircle2 size={18} />
            Payment received. AI-Trader onboarding will continue from the email used at checkout.
          </section>
        ) : null}

        <section className="at-hero">
          <div className="at-hero-copy">
            <p className="at-eyebrow">AI-Trader operating desk</p>
            <h1>Turn agent trading signals into a supervised desk before anyone copies a trade.</h1>
            <p className="at-lede">
              AI-Trader helps teams evaluate AI trader app ideas, bot signals, ChatGPT market notes, prediction scenarios, and copy-trading providers with paper-trading guardrails visible from the first screen.
            </p>

            <div className="at-hero-actions">
              <button type="button" className="at-btn at-btn-primary" onClick={() => chooseOperatorAnnual('hero')}>
                <Rocket size={18} />
                {ctaPrimary}
              </button>
              <button
                type="button"
                className="at-btn at-btn-ghost"
                onClick={() => {
                  trackEvent('pricing_review', { source: 'hero-secondary' })
                  navigate('/pricing#pricing')
                }}
              >
                <BarChart3 size={18} />
                Review plans
              </button>
              <button type="button" className="at-btn at-btn-subtle" onClick={() => openPage('/ai-trader-github')}>
                <Github size={18} />
                Read GitHub guide
              </button>
            </div>
            <p className="at-payment-note">
              <CheckCircle2 size={16} />
              <span>Operator annual selected. Annual saves 50%.</span>
            </p>

            <div className="at-trust-row">
              {trustLinks.map((link) =>
                link.internal ? (
                  <a
                    href={link.href}
                    key={link.href}
                    onClick={(event) => {
                      event.preventDefault()
                      openPage(link.href)
                    }}
                  >
                    {link.icon}
                    {link.label}
                    <ChevronRight size={13} />
                  </a>
                ) : (
                  <a href={link.href} key={link.href} target="_blank" rel="noreferrer">
                    {link.icon}
                    {link.label}
                    <ExternalLink size={13} />
                  </a>
                ),
              )}
            </div>

            <div className="at-hero-proof">
              <div>
                <span>Default path</span>
                <strong>Planner to Operator annual to Creem popup to homepage return</strong>
              </div>
              <div>
                <span>Trust posture</span>
                <strong>Signals, predictions, copy trading, and marketplace content stay separated from live execution authority</strong>
              </div>
            </div>
          </div>

          {renderTraderPanel()}
        </section>

        <section className="at-proof-strip" aria-label="AI-Trader proof points">
          {proofItems.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </section>

        <section className="at-section at-media-section">
          <div className="at-section-head">
            <p className="at-eyebrow">Product signal</p>
            <h2>The buyer should see the risk boundary before the payment decision.</h2>
            <p>AI trading converts better when users can see agent identity, signal type, prediction evidence, and paper-trading posture before checkout.</p>
          </div>
          <div className="at-media-grid">
            <figure className="at-dashboard-shot">
              <img src="/ai-trader-dashboard.png" alt="AI-Trader dashboard preview with signal feed and copy-trading review" />
              <figcaption>Reference dashboard preview generated from the AI-Trader buying desk.</figcaption>
            </figure>
            <div className="at-signal-list">
              <article>
                <BrainCircuit size={20} />
                <h3>Agent ideas become reviewable objects</h3>
                <p>Every signal should carry thesis, evidence, invalidation, timestamp, and outcome review.</p>
              </article>
              <article>
                <Trophy size={20} />
                <h3>Competitions reward discipline</h3>
                <p>Rank paper results, drawdown, and consistency instead of rewarding lucky one-off predictions.</p>
              </article>
              <article>
                <LockKeyhole size={20} />
                <h3>Credentials stay off the public page</h3>
                <p>The planner never asks for exchange keys, broker passwords, wallet keys, or portfolio data.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="at-section">
          <div className="at-section-head">
            <p className="at-eyebrow">Operating model</p>
            <h2>AI-Trader becomes a SaaS decision when signal review, copy-trading safety, and agent incentives meet.</h2>
            <p>The product is built to turn open-source agent-native trading concepts into a paid, supervised workflow that buyers can understand quickly.</p>
          </div>

          <div className="at-card-grid">
            {workflowCards.map((card) => (
              <article className="at-card" key={card.title}>
                <div className="at-card-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        {renderPricingSection(false)}

        <section className="at-section">
          <div className="at-section-head">
            <p className="at-eyebrow">Reference pages</p>
            <h2>Useful pages for the questions buyers ask before trusting an AI trader product.</h2>
            <p>Each page answers a concrete search intent, then brings the visitor back to a focused checkout path.</p>
          </div>
          <div className="at-guide-grid">
            {[
              ...keywordPages,
              {
                path: '/pricing',
                eyebrow: 'Pricing',
                h1: 'AI-Trader pricing',
                intent: 'Choose Starter, Operator, or Desk with Operator annual already selected.',
              },
            ].map((page) => (
              <a
                className="at-guide-card"
                href={page.path}
                key={page.path}
                onClick={(event) => {
                  event.preventDefault()
                  openPage(page.path)
                }}
              >
                <span>{page.eyebrow}</span>
                <strong>{page.h1}</strong>
                <p>{page.intent}</p>
                <ChevronRight size={18} />
              </a>
            ))}
          </div>
        </section>
      </main>
    )
  }

  const renderKeywordPage = (page: KeywordPage) => (
    <main className="at-main">
      <article className="at-article">
        <a
          className="at-back-link"
          href="/"
          onClick={(event) => {
            event.preventDefault()
            navigate('/')
          }}
        >
          <ArrowRight size={16} />
          Back to AI-Trader
        </a>
        <p className="at-eyebrow">{page.eyebrow}</p>
        <h1>{page.h1}</h1>
        <p className="at-lede">{page.lede}</p>
        <div className="at-article-intent">
          <strong>Best for</strong>
          <span>{page.intent}</span>
        </div>

        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.bullets ? (
              <ul>
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <section>
          <h2>Common questions</h2>
          <div className="at-faq-list">
            {page.faqs.map((faq) => (
              <article key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <aside className="at-article-cta">
          <div>
            <p className="at-eyebrow">Recommended next step</p>
            <h2>Use the desk planner, then keep Operator annual selected if the setup fits.</h2>
            <p>Checkout stays in a centered Creem popup, with annual billing selected by default.</p>
          </div>
          <div className="at-article-cta-actions">
            <button type="button" className="at-btn at-btn-primary" onClick={() => chooseOperatorAnnual(`article-${page.path}`)}>
              <Play size={18} />
              {page.ctaLabel}
            </button>
            <button type="button" className="at-btn at-btn-ghost" onClick={() => navigate('/#planner')}>
              <Zap size={18} />
              Open planner
            </button>
          </div>
        </aside>
      </article>
    </main>
  )

  const renderPricingPage = () => (
    <main className="at-main">
      <section className="at-pricing-page-hero">
        <p className="at-eyebrow">Pricing</p>
        <h1>AI-Trader pricing starts with Operator selected and annual billing already on.</h1>
        <p className="at-lede">
          Starter is for one bounded signal workflow. Operator is the default for a serious AI trading desk. Desk is for competitions, marketplace publishing, and governed multi-agent operations.
        </p>
      </section>
      {renderPricingSection(true)}
    </main>
  )

  const renderLegalPage = (title: string, intro: string, sections: LegalSection[]) => (
    <main className="at-main">
      <article className="at-article">
        <p className="at-eyebrow">Legal</p>
        <h1>{title}</h1>
        <p className="at-lede">{intro}</p>
        {sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </article>
    </main>
  )

  const renderCheckoutModal = () => {
    if (!checkoutModal) return null

    const plan = plans.find((item) => item.id === checkoutModal.planId) ?? plans[1]
    const monthly = checkoutModal.billing === 'annual' ? plan.monthlyUsd * 0.5 : plan.monthlyUsd

    return (
      <div className="at-checkout-backdrop" role="dialog" aria-modal="true" aria-label="Secure checkout status">
        <section className="at-checkout-modal">
          <button
            type="button"
            className="at-checkout-close"
            aria-label="Close checkout status"
            onClick={() => {
              setCheckoutModal(null)
              setCheckoutLoadingKey(null)
              trackEvent('checkout_overlay_closed', { planId: checkoutModal.planId, billing: checkoutModal.billing })
            }}
          >
            <X size={18} />
          </button>
          {checkoutModal.status === 'loading' ? (
            <div className="at-checkout-loading">
              <span aria-hidden />
              <div>
                <h2>Preparing Creem checkout...</h2>
                <p>Operator annual stays selected while the secure payment window opens.</p>
              </div>
            </div>
          ) : (
            <div className="at-checkout-copy">
              <p className="at-eyebrow">Secure checkout</p>
              <h2>{checkoutModal.status === 'popup' ? 'Your Creem payment window is open.' : 'Popup blocked or checkout needs a retry.'}</h2>
              <p>
                {plan.name} {checkoutModal.billing} is set to {formatMoney(monthly)}/mo
                {checkoutModal.billing === 'annual' ? ' with 50% annual savings.' : '.'}
              </p>
              <div className="at-checkout-actions">
                {checkoutModal.checkoutUrl ? (
                  <button
                    type="button"
                    className="at-btn at-btn-primary"
                    onClick={() => {
                      trackEvent('checkout_focus_click', { planId: checkoutModal.planId, billing: checkoutModal.billing })
                      sendPopupToCheckout(openCenteredCheckoutWindow(), checkoutModal.checkoutUrl || '')
                    }}
                  >
                    <ExternalLink size={18} />
                    Focus checkout
                  </button>
                ) : (
                  <button
                    type="button"
                    className="at-btn at-btn-primary"
                    onClick={() => void startHostedCheckout(checkoutModal.planId, checkoutModal.billing, checkoutModal.loadingKey)}
                  >
                    <ExternalLink size={18} />
                    Retry checkout
                  </button>
                )}
                <button type="button" className="at-btn at-btn-ghost" onClick={() => setCheckoutModal(null)}>
                  Keep reviewing
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    )
  }

  const renderNotFound = () => (
    <main className="at-main">
      <section className="at-center-panel">
        <p className="at-eyebrow">404</p>
        <h1>Page not found</h1>
        <p className="at-muted">That route is not available.</p>
        <button type="button" className="at-btn at-btn-primary" onClick={() => navigate('/')}>
          Return home
        </button>
      </section>
    </main>
  )

  let body: React.ReactNode
  if (routeView === 'home' && normalizedPath === '/') {
    body = renderHome()
  } else if (routeView === 'keyword' && keywordPage) {
    body = renderKeywordPage(keywordPage)
  } else if (routeView === 'pricing') {
    body = renderPricingPage()
  } else if (routeView === 'privacy') {
    body = renderLegalPage('Privacy Policy', 'This policy covers how AI-Trader handles analytics, checkout, and related public-site interactions.', legalPrivacySections)
  } else if (routeView === 'terms') {
    body = renderLegalPage('Terms of Service', 'These terms describe the limits and responsibilities of the AI-Trader site and hosted payment flow.', legalTermsSections)
  } else if (routeView === 'checkout-done') {
    body = <CheckoutDoneBridge publicAppOrigin={publicAppOrigin} />
  } else {
    body = renderNotFound()
  }

  return (
    <div className="at-shell">
      <div className="at-page-texture" aria-hidden />
      {renderHeader()}
      {body}
      {renderCheckoutModal()}
      <footer className="at-footer">
        <div className="at-footer-inner">
          <span>AI-Trader</span>
          <a
            href="/privacy"
            onClick={(event) => {
              event.preventDefault()
              navigate('/privacy')
            }}
          >
            Privacy
          </a>
          <a
            href="/terms"
            onClick={(event) => {
              event.preventDefault()
              navigate('/terms')
            }}
          >
            Terms
          </a>
          <a href="https://github.com/clauxel/my-ai-trader" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://github.com/HKUDS/AI-Trader" target="_blank" rel="noreferrer">
            Reference
          </a>
          <a href="mailto:support@aigeamy.com">support@aigeamy.com</a>
        </div>
      </footer>
    </div>
  )
}
