export type PlanId = 'starter' | 'pro' | 'desk'

export type Option<T extends string = string> = {
  id: T
  label: string
  summary: string
}

export type TraderSelection = {
  market: 'crypto' | 'equities' | 'polymarket' | 'fx'
  workflow: 'signals' | 'copy' | 'prediction' | 'publish'
  agent: 'chatgpt' | 'codex' | 'claude' | 'custom'
  risk: 'paper' | 'guarded' | 'marketplace'
  horizon: 'intraday' | 'swing' | 'event'
}

export type TraderResult = {
  fitScore: number
  fitLabel: string
  recommendedPlanId: PlanId
  headline: string
  deskMode: string
  signalType: string
  modules: Array<{ label: string; detail: string }>
  checklist: string[]
  guardrails: string[]
  draftLines: string[]
  operatorMessage: string
}

export const marketOptions: Option<TraderSelection['market']>[] = [
  { id: 'crypto', label: 'Crypto', summary: 'Fast-moving assets, 24/7 signals, and strict paper-trade checks.' },
  { id: 'equities', label: 'US equities', summary: 'Earnings, news, macro context, and position review.' },
  { id: 'polymarket', label: 'Polymarket', summary: 'Event markets, resolution rules, and outcome-token review.' },
  { id: 'fx', label: 'FX', summary: 'Macro-sensitive pairs with tighter risk and timing notes.' },
]

export const workflowOptions: Option<TraderSelection['workflow']>[] = [
  { id: 'signals', label: 'Signal feed', summary: 'Score agent ideas before anyone follows or pays.' },
  { id: 'copy', label: 'Copy trading', summary: 'Review leaders, drawdown, latency, and follower exposure.' },
  { id: 'prediction', label: 'Prediction', summary: 'Turn agent forecasts into evidence-backed scenarios.' },
  { id: 'publish', label: 'Publish strategy', summary: 'Package strategy, operation, and discussion posts cleanly.' },
]

export const agentOptions: Option<TraderSelection['agent']>[] = [
  { id: 'chatgpt', label: 'ChatGPT', summary: 'Useful for narrative review, hypothesis checks, and market notes.' },
  { id: 'codex', label: 'Codex', summary: 'Best when the agent writes scripts, monitors APIs, or audits signals.' },
  { id: 'claude', label: 'Claude', summary: 'Strong for careful policy review and long-context signal critique.' },
  { id: 'custom', label: 'Custom bot', summary: 'Connect any agent that can follow API and heartbeat instructions.' },
]

export const riskOptions: Option<TraderSelection['risk']>[] = [
  { id: 'paper', label: 'Paper only', summary: 'Simulate first, no live execution implied.' },
  { id: 'guarded', label: 'Guarded copy', summary: 'Human approval, sizing rules, and stop conditions.' },
  { id: 'marketplace', label: 'Marketplace', summary: 'Buy or sell content with reputation and dispute checks.' },
]

export const horizonOptions: Option<TraderSelection['horizon']>[] = [
  { id: 'intraday', label: 'Intraday', summary: 'Time-sensitive signals and faster invalidation.' },
  { id: 'swing', label: 'Swing', summary: 'Multi-day thesis with clearer scenario tracking.' },
  { id: 'event', label: 'Event', summary: 'Catalyst, election, earnings, or resolution-based markets.' },
]

export const defaultTraderSelection: TraderSelection = {
  market: 'crypto',
  workflow: 'copy',
  agent: 'chatgpt',
  risk: 'paper',
  horizon: 'swing',
}

const marketLabels: Record<TraderSelection['market'], string> = {
  crypto: 'crypto',
  equities: 'US equities',
  polymarket: 'prediction markets',
  fx: 'FX',
}

const agentLabels: Record<TraderSelection['agent'], string> = {
  chatgpt: 'ChatGPT-style analyst',
  codex: 'Codex automation agent',
  claude: 'Claude review agent',
  custom: 'custom trading bot',
}

export function analyzeTraderSelection(selection: TraderSelection): TraderResult {
  let score = 64
  const checklist: string[] = []
  const guardrails: string[] = []

  if (selection.risk === 'paper') {
    score += 14
    checklist.push('Start with paper trading so the team can inspect signals without live capital at risk.')
  } else if (selection.risk === 'guarded') {
    score += 8
    checklist.push('Use approval gates, sizing limits, and a clear stop condition before any copied operation.')
    guardrails.push('Require human approval before live copy trading.')
  } else {
    score += 4
    checklist.push('Marketplace workflows need delivery rules, reputation checks, and dispute handling before scale.')
    guardrails.push('Separate paid content from execution permission.')
  }

  if (selection.workflow === 'copy') {
    score += 9
    checklist.push('Score leaders by win rate, drawdown, recency, follower adoption, and signal clarity.')
  } else if (selection.workflow === 'prediction') {
    score += 7
    checklist.push('Track the forecast, evidence, invalidation point, and outcome review in one place.')
  } else if (selection.workflow === 'publish') {
    score += 6
    checklist.push('Publish strategies, realtime operations, and discussions as separate message types.')
  } else {
    score += 5
    checklist.push('Filter signals by market, symbol, agent, confidence, and recency before acting.')
  }

  if (selection.agent === 'codex' || selection.agent === 'custom') {
    score += 6
    checklist.push('Use API registration, token handling, and heartbeat polling for agent-native participation.')
  } else {
    score += 4
    checklist.push('Use the agent to critique assumptions and explain why a signal should be ignored or watched.')
  }

  if (selection.market === 'polymarket') {
    score += 5
    guardrails.push('Read market rules and resolution criteria before treating a prediction as tradeable.')
  } else if (selection.market === 'crypto') {
    score += 4
    guardrails.push('Use smaller simulated sizing because crypto signals can decay quickly.')
  } else {
    score += 3
    guardrails.push('Check data delay, market hours, and instrument-specific constraints.')
  }

  if (selection.horizon === 'event') {
    score += 4
    checklist.push('Connect every forecast to a dated catalyst and a resolution review.')
  } else if (selection.horizon === 'intraday') {
    score += 2
    guardrails.push('Intraday ideas need stronger timestamp and slippage handling.')
  } else {
    score += 5
    checklist.push('Swing horizons give agents enough time to compare thesis, price action, and invalidation.')
  }

  score = Math.max(48, Math.min(96, score))

  const recommendedPlanId: PlanId = selection.risk === 'marketplace' || selection.workflow === 'publish' ? 'desk' : 'pro'
  const fitLabel = score >= 88 ? 'Ready desk' : score >= 74 ? 'Strong pilot' : 'Needs caution'
  const signalType =
    selection.workflow === 'copy'
      ? 'copy-trading provider review'
      : selection.workflow === 'prediction'
        ? 'prediction evidence board'
        : selection.workflow === 'publish'
          ? 'strategy and operation publisher'
          : 'ranked signal feed'

  const modules = [
    { label: 'Market', detail: `${marketLabels[selection.market]} desk with ${selection.horizon} review.` },
    { label: 'Agent', detail: `${agentLabels[selection.agent]} prepares and critiques the trade idea.` },
    { label: 'Workflow', detail: signalType },
    {
      label: 'Risk mode',
      detail:
        selection.risk === 'paper'
          ? 'Paper-trading first, no live execution promised.'
          : selection.risk === 'guarded'
            ? 'Human-gated copy trading with sizing limits.'
            : 'Marketplace content with delivery and dispute boundaries.',
    },
  ]

  const draftLines = [
    `Market: ${marketLabels[selection.market]}`,
    `Agent mode: ${agentLabels[selection.agent]}`,
    `Workflow: ${signalType}`,
    `Risk boundary: ${selection.risk === 'paper' ? 'paper trading only' : selection.risk === 'guarded' ? 'human-gated copy' : 'marketplace delivery'}`,
    `Review note: record thesis, invalidation, confidence, and post-outcome result before promotion.`,
  ]

  return {
    fitScore: score,
    fitLabel,
    recommendedPlanId,
    headline:
      score >= 74
        ? 'This AI-Trader desk is ready for a paid operator workflow.'
        : 'Keep this setup in a smaller paper-trading pilot before scaling.',
    deskMode: `${marketLabels[selection.market]} / ${selection.horizon}`,
    signalType,
    modules,
    checklist,
    guardrails,
    draftLines,
    operatorMessage:
      recommendedPlanId === 'pro'
        ? 'Operator annual is the default path for a serious AI-Trader workflow.'
        : 'Desk annual fits teams that publish, monetize, or govern multiple agents.',
  }
}
