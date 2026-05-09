export type KeywordSection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export type KeywordFaq = {
  question: string
  answer: string
}

export type KeywordPage = {
  path: string
  eyebrow: string
  title: string
  description: string
  h1: string
  lede: string
  intent: string
  ctaLabel: string
  sections: KeywordSection[]
  faqs: KeywordFaq[]
}

export const keywordPages: KeywordPage[] = [
  {
    path: '/ai-trader-app',
    eyebrow: 'App workflow',
    title: 'AI Trader App Workflow',
    description:
      'A practical AI trader app workflow for agent signals, paper trading, copy-trading review, prediction evidence, and guarded checkout decisions.',
    h1: 'Use an AI trader app like an operating desk, not a blind signal button',
    lede:
      'A useful AI trader app should make agent ideas easier to inspect before anyone copies, buys, or automates a trade. The desk on AI-Trader starts with paper-trading posture, signal evidence, and clear escalation into paid onboarding.',
    intent: 'For buyers comparing AI trading apps and trying to separate real workflow value from hype.',
    ctaLabel: 'Open Operator annual',
    sections: [
      {
        heading: 'What the app should do first',
        paragraphs: [
          'The first useful action is not a live order. It is a structured signal review: market, thesis, source agent, confidence, timestamp, invalidation point, and what would prove the idea wrong.',
          'AI-Trader turns that review into a desk flow inspired by the open-source AI-Trader idea: agent registration, signal feeds, copy-trading review, and marketplace-style delivery boundaries.',
        ],
        bullets: [
          'Start with paper-trading mode by default.',
          'Separate strategy notes, realtime operations, and free discussions.',
          'Review provider history before copying a position.',
          'Keep brokerage and exchange credentials out of the marketing site.',
        ],
      },
      {
        heading: 'Where conversion should happen',
        paragraphs: [
          'The app earns trust when the buyer sees the operating model before the payment button. That is why the homepage planner shows the market, agent mode, workflow, and risk posture in the first screen.',
          'Operator annual is selected by default because a serious AI trading desk usually needs more than a one-off trial: it needs onboarding, signal quality review, and a risk boundary that a team can repeat.',
        ],
      },
      {
        heading: 'The risk line',
        paragraphs: [
          'AI trading products lose credibility when they imply guaranteed profit. A stronger app keeps the user in control and treats every prediction as a hypothesis that must be reviewed.',
          'AI-Trader is designed around supervised decision support, not financial advice or autonomous live trading promises.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is AI-Trader a live trading app?',
        answer:
          'This site presents a supervised SaaS desk for agent signals, paper trading, prediction review, and copy-trading planning. It does not ask for brokerage credentials on the public page.',
      },
      {
        question: 'Why does the app start with paper trading?',
        answer:
          'Paper trading gives teams room to test signal quality, timing, and agent behavior before connecting money or copying positions.',
      },
      {
        question: 'Which plan fits the app workflow?',
        answer:
          'Operator annual is the default because it covers the middle zone between curiosity and a governed multi-agent desk.',
      },
    ],
  },
  {
    path: '/ai-trader-bot',
    eyebrow: 'Bot setup',
    title: 'AI Trader Bot Setup',
    description:
      'Plan an AI trader bot with registration, heartbeat, signal publishing, copy-trading review, and strict paper-trading guardrails.',
    h1: 'An AI trader bot needs identity, heartbeat, and risk gates before execution',
    lede:
      'A bot that can publish signals or follow other agents must be treated as an operator, not a toy. The AI-Trader desk makes the bot path visible: register, review, publish, listen, and keep live execution behind explicit permission.',
    intent: 'For builders who want an AI trader bot without handing it uncontrolled trading authority.',
    ctaLabel: 'Plan bot rollout',
    sections: [
      {
        heading: 'Bot capabilities worth paying for',
        paragraphs: [
          'The open-source AI-Trader project highlights a practical agent model: agents can register, publish strategy messages, push realtime operations, post discussions, follow providers, and receive notifications.',
          'A paid SaaS flow should package that into a repeatable bot desk, where every signal has an owner, timestamp, market, action, and review state.',
        ],
        bullets: [
          'Self-registration gives each bot an identity.',
          'Heartbeat or notifications keep the bot aware of replies and follower events.',
          'Strategy, operation, and discussion messages should remain distinct.',
          'Copy-trading should stay gated until performance and drawdown are reviewed.',
        ],
      },
      {
        heading: 'ChatGPT, Codex, Claude, or custom agent',
        paragraphs: [
          'Different agents are useful in different roles. ChatGPT-style workflows are good for narrative market review, Codex-style agents can write scripts and monitor APIs, and careful long-context agents can critique the trade thesis.',
          'The public page lets a buyer choose the agent mode without exposing tokens or credentials.',
        ],
      },
      {
        heading: 'Guardrails before automation',
        paragraphs: [
          'A bot should not move from idea to execution without position sizing, allowed markets, stop rules, maximum loss boundaries, and a human approval mode.',
          'That posture increases conversion quality because serious buyers see that the product understands risk rather than hiding it.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can a bot publish trading signals?',
        answer:
          'Yes, agent-native systems can publish strategies, realtime operations, and discussions, but every production use should be permissioned and reviewed.',
      },
      {
        question: 'Does AI-Trader store my exchange API key?',
        answer:
          'The public site does not request exchange or brokerage credentials. Keep those credentials out of public forms and support messages.',
      },
      {
        question: 'Why is heartbeat important?',
        answer:
          'Heartbeat or notifications tell the agent when followers, replies, or copy-trading events need attention, which makes it behave like a participant instead of a one-shot script.',
      },
    ],
  },
  {
    path: '/ai-trader-github',
    eyebrow: 'Source review',
    title: 'AI-Trader GitHub Review Guide',
    description:
      'A useful AI-Trader GitHub guide covering the HKUDS repository, agent-native trading features, API shape, and what to check before buying a managed SaaS plan.',
    h1: 'Read the AI-Trader GitHub project for architecture, then buy for rollout clarity',
    lede:
      'The HKUDS AI-Trader repository is useful because it shows the real shape of agent-native trading: skills, API docs, FastAPI backend, React frontend, signal feeds, copy trading, and marketplace paths.',
    intent: 'For technical buyers searching AI-trader GitHub before trusting a commercial workflow.',
    ctaLabel: 'Use the desk planner',
    sections: [
      {
        heading: 'What the repository proves',
        paragraphs: [
          'The public project describes an agent-native trading platform where agents can join, publish signals, discuss strategies, follow providers, and operate across markets such as crypto, stocks, forex, options, futures, and prediction markets.',
          'It also shows practical documentation for agent registration, marketplace listings, orders, copy-trading feeds, realtime signals, and health checks.',
        ],
        bullets: [
          'Skills define agent-facing instructions and integration paths.',
          'API docs show registration, marketplace, order, and copy-trading endpoints.',
          'Service code separates backend and frontend surfaces.',
          'Recent updates emphasize production stability and background workers.',
        ],
      },
      {
        heading: 'What GitHub does not solve by itself',
        paragraphs: [
          'Source code helps technical trust, but it does not decide your operating policy. A team still needs onboarding, pricing, risk posture, content review, and payment flow.',
          'AI-Trader.best turns the GitHub value proposition into a SaaS purchase path while keeping the public site clear that trading decisions require human responsibility.',
        ],
      },
      {
        heading: 'How to evaluate before checkout',
        paragraphs: [
          'Inspect whether the workflow you care about is signals, copy trading, prediction review, or marketplace publishing. Then use the homepage desk to pick the matching risk mode.',
          'If the workflow requires multiple agents, paid content, or governed copy trading, the middle annual plan is usually a better fit than a bare trial.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is this the official HKUDS repository?',
        answer:
          'No. The technical reference is the public HKUDS/AI-Trader repository. This site is an independent SaaS-style buying and onboarding experience based on its visible value themes.',
      },
      {
        question: 'Should I inspect GitHub before paying?',
        answer:
          'Yes. Reviewing the upstream project helps you understand the architecture and makes the paid onboarding decision more grounded.',
      },
      {
        question: 'Why does the site link GitHub intent to pricing?',
        answer:
          'Technical confidence often comes before purchase. The inner page answers the GitHub question, then moves buyers into a concrete desk plan.',
      },
    ],
  },
  {
    path: '/ai-trader-review',
    eyebrow: 'Review',
    title: 'AI Trader Review Framework',
    description:
      'A balanced AI trader review framework for signal quality, agent reliability, copy-trading risk, marketplace incentives, and conversion-ready SaaS evaluation.',
    h1: 'A useful AI trader review looks at incentives, not just predictions',
    lede:
      'The strongest AI trader review asks whether the product helps users avoid bad trades, not only whether it produces confident forecasts. Signals, copy trading, leaderboards, and rewards all need context.',
    intent: 'For visitors looking for an AI trader review before deciding whether the product is credible.',
    ctaLabel: 'Review Operator plan',
    sections: [
      {
        heading: 'Review the workflow',
        paragraphs: [
          'Start with what the system makes easier: publishing ideas, finding signal providers, comparing performance, following operations, or turning predictions into evidence trails.',
          'A review should reward transparency. Can the buyer see market, action, confidence, invalidation, timestamp, and follow-up results? If not, the prediction is too thin to trust.',
        ],
        bullets: [
          'Signal quality beats signal quantity.',
          'Copy-trading requires drawdown and recency context.',
          'Marketplace incentives should not reward spammy predictions.',
          'Paper-trading mode is a credibility signal, not a weakness.',
        ],
      },
      {
        heading: 'Review the claims',
        paragraphs: [
          'Avoid products that imply guaranteed returns. AI-Trader is framed as a supervised desk because market outcomes are uncertain and agent output can be wrong.',
          'The better conversion path is trust through restraint: show the operating workflow, set boundaries, and let the buyer open checkout when the plan fits.',
        ],
      },
      {
        heading: 'Review the checkout decision',
        paragraphs: [
          'The middle plan is selected because serious buyers usually need onboarding, signal-review structure, and a default risk posture.',
          'Annual billing is discounted by 50% because agent desks need repeated evaluation cycles rather than one impulsive session.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What makes an AI trader review trustworthy?',
        answer:
          'A trustworthy review discusses risk, incentives, signal evidence, copy-trading limits, and failure modes instead of only showing optimistic predictions.',
      },
      {
        question: 'Does AI-Trader promise returns?',
        answer:
          'No. The site is explicitly framed around supervised decision support, paper trading, and review workflows rather than guaranteed profit.',
      },
      {
        question: 'What should I check before checkout?',
        answer:
          'Choose your market, workflow, agent mode, and risk boundary on the first screen. Then compare whether Operator annual matches your rollout.',
      },
    ],
  },
  {
    path: '/ai-trader-competition',
    eyebrow: 'Competition',
    title: 'AI Trader Competition Desk',
    description:
      'Design an AI trader competition around paper trading, agent rankings, signal quality, reward points, copy-trading safety, and fair evaluation rules.',
    h1: 'An AI trader competition should reward disciplined signals, not lucky noise',
    lede:
      'Competitions are a useful way to evaluate agents when the rules are clear: paper capital, dated predictions, public scoring, drawdown context, and post-outcome review.',
    intent: 'For teams planning an AI trader competition, benchmark, or public agent leaderboard.',
    ctaLabel: 'Start competition desk',
    sections: [
      {
        heading: 'What to score',
        paragraphs: [
          'A good competition scores more than profit. It should score thesis clarity, invalidation discipline, risk-adjusted return, drawdown, consistency, and whether the agent updates responsibly when conditions change.',
          'The upstream AI-Trader idea includes points and rewards for publishing signals and adoption. A commercial desk should make those incentives harder to game.',
        ],
        bullets: [
          'Use paper trading before live allocation.',
          'Separate strategy posts from realtime operations.',
          'Score drawdown and volatility, not only final profit.',
          'Make resolution rules visible for event markets.',
        ],
      },
      {
        heading: 'How the SaaS desk helps',
        paragraphs: [
          'The homepage planner gives competition organizers a quick way to choose market, agent type, horizon, and risk boundary.',
          'Desk annual fits teams that need multiple agents, publishing controls, and governance around paid or public signal competitions.',
        ],
      },
      {
        heading: 'Keep the contest credible',
        paragraphs: [
          'Competitions can become misleading if agents cherry-pick winners, hide losers, or change timestamps. Record every signal before outcome review.',
          'A transparent competition increases trust and conversion because users can see the product values discipline over hype.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can AI agents compete without live money?',
        answer:
          'Yes. Paper-trading competitions are usually the safest first format because they reveal signal quality without live capital exposure.',
      },
      {
        question: 'What metrics matter besides profit?',
        answer:
          'Drawdown, volatility, thesis clarity, invalidation behavior, recency, and consistency all matter.',
      },
      {
        question: 'Which plan is best for competitions?',
        answer:
          'Desk annual is usually the best fit when multiple agents, public rankings, or marketplace-style rewards are involved.',
      },
    ],
  },
  {
    path: '/ai-trader-prediction',
    eyebrow: 'Prediction',
    title: 'AI Trader Prediction Workflow',
    description:
      'Turn AI trader prediction output into evidence-backed scenarios with confidence, invalidation points, paper-trading results, and post-outcome review.',
    h1: 'AI trader prediction is useful only when the evidence and invalidation are visible',
    lede:
      'A prediction should not be a magic number. It should show the market, time horizon, evidence, confidence, invalidation point, and what the agent will do after the outcome is known.',
    intent: 'For buyers searching AI trader prediction tools and wanting a safer way to evaluate forecasts.',
    ctaLabel: 'Build prediction desk',
    sections: [
      {
        heading: 'Prediction fields that matter',
        paragraphs: [
          'Predictions become more useful when they are structured. A bare “BTC up” signal is weak. A dated forecast with conditions, invalidation, sizing posture, and review status is stronger.',
          'AI-Trader frames predictions as a workflow step that should feed paper trading and review before copy trading or paid marketplace use.',
        ],
        bullets: [
          'Asset or event market',
          'Forecast horizon',
          'Evidence and counter-evidence',
          'Confidence and invalidation',
          'Outcome review after resolution',
        ],
      },
      {
        heading: 'Avoid prediction theater',
        paragraphs: [
          'AI agents can sound confident while being wrong. The product experience should make that uncertainty visible instead of burying it behind a high-conversion promise.',
          'The better CTA is not “get rich.” It is “review the desk, keep Operator annual selected, and use paper trading until the workflow proves itself.”',
        ],
      },
      {
        heading: 'Where ChatGPT-style agents fit',
        paragraphs: [
          'ChatGPT-style agents are useful for scenario writing, evidence summaries, and explaining what would change the forecast.',
          'They still need human review, market data checks, and post-outcome scoring before their predictions should influence real decisions.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can AI-Trader predict market prices?',
        answer:
          'It can structure and review agent forecasts, but no AI system can guarantee market outcomes. Treat predictions as hypotheses.',
      },
      {
        question: 'What makes a prediction actionable?',
        answer:
          'A clear horizon, evidence, invalidation point, risk boundary, and post-outcome review make a forecast more actionable.',
      },
      {
        question: 'Should prediction users choose annual billing?',
        answer:
          'Annual billing is selected by default because prediction quality needs repeated review cycles over time.',
      },
    ],
  },
  {
    path: '/ai-trader-free',
    eyebrow: 'Free path',
    title: 'AI Trader Free Evaluation',
    description:
      'Use a free AI trader evaluation safely with public GitHub review, paper-trading mode, signal checklists, and a clear upgrade path.',
    h1: 'The best AI trader free path is a serious evaluation, not an unlimited promise',
    lede:
      'Free evaluation should help a buyer inspect the workflow: read the source, run paper-trading checks, score agent signals, and decide whether a paid desk is justified.',
    intent: 'For searchers looking for AI trader free options without falling into low-trust claims.',
    ctaLabel: 'Compare free vs Operator',
    sections: [
      {
        heading: 'What to do for free',
        paragraphs: [
          'Start by reading the public AI-Trader GitHub repository and understanding the agent-native model. Then use the public planner here to choose market, workflow, agent, risk mode, and horizon.',
          'That free path is useful because it clarifies fit before payment. It does not need to pretend that professional onboarding, governance, and support are free forever.',
        ],
        bullets: [
          'Read the open-source repository.',
          'Map the workflow on the homepage planner.',
          'Use paper trading for initial signal review.',
          'Upgrade only when the operating desk matches your use case.',
        ],
      },
      {
        heading: 'When free is not enough',
        paragraphs: [
          'Free evaluation stops being enough when multiple agents, paid content, copy-trading governance, competitions, or onboarding support become part of the workflow.',
          'That is the point of the Operator annual plan: it is the middle path for serious buyers without jumping directly to a heavier desk engagement.',
        ],
      },
      {
        heading: 'Conversion without pressure',
        paragraphs: [
          'A credible free page should not trap the user. It should explain what can be evaluated, what remains paid, and why annual pricing is discounted for longer review cycles.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is there a free AI-Trader option?',
        answer:
          'You can inspect the public project and use this site’s planner without payment. Paid plans cover onboarding, workflow packaging, and support.',
      },
      {
        question: 'Why not offer unlimited free trading automation?',
        answer:
          'Unlimited automation claims are risky and often low trust. A safer free path focuses on evaluation and paper trading.',
      },
      {
        question: 'When should I upgrade?',
        answer:
          'Upgrade when the workflow needs repeated review, agent governance, competition structure, or support-backed checkout.',
      },
    ],
  },
  {
    path: '/ai-trader-chatgpt',
    eyebrow: 'ChatGPT workflow',
    title: 'AI Trader ChatGPT Workflow',
    description:
      'Use ChatGPT with AI-Trader workflows for market notes, prediction review, signal critique, copy-trading due diligence, and paper-trading guardrails.',
    h1: 'AI trader ChatGPT workflows are strongest when they critique signals before action',
    lede:
      'ChatGPT can help summarize evidence, challenge a thesis, prepare a strategy note, or explain why a signal should be ignored. It should not become an unsupervised trading authority.',
    intent: 'For visitors searching Ai trader ChatGPT and wanting a practical, safer workflow.',
    ctaLabel: 'Open ChatGPT desk',
    sections: [
      {
        heading: 'Best ChatGPT role',
        paragraphs: [
          'ChatGPT-style agents are useful as reviewers: summarize the market, list opposing evidence, ask what would invalidate the idea, and turn a messy signal into a structured note.',
          'That role maps naturally to AI-Trader concepts such as strategy messages, discussions, signal feeds, and prediction review.',
        ],
        bullets: [
          'Summarize the thesis and counter-thesis.',
          'Check whether confidence matches evidence.',
          'Draft a strategy note without exposing secrets.',
          'Keep live trade execution behind human permission.',
        ],
      },
      {
        heading: 'Where ChatGPT should stop',
        paragraphs: [
          'Do not let a chat agent place trades, copy providers, or publish paid signals without rules, permissions, and review.',
          'The conversion-focused path is stronger when it shows restraint: paper trading first, Operator annual for repeated review, and Desk annual for governed multi-agent publishing.',
        ],
      },
      {
        heading: 'How to turn chat into a desk',
        paragraphs: [
          'Use the homepage planner to choose ChatGPT as the agent mode, pick the market, select prediction or copy-trading review, and keep the risk boundary visible.',
          'Then open checkout in a centered Creem popup without losing the product context behind it.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can ChatGPT be an AI trader?',
        answer:
          'It can assist with analysis and signal critique, but it should not be treated as a licensed advisor or unsupervised trading authority.',
      },
      {
        question: 'What is the safest ChatGPT trading workflow?',
        answer:
          'Use ChatGPT for thesis review, evidence summaries, invalidation checks, and paper-trading notes before any live decision.',
      },
      {
        question: 'Why does this page still recommend checkout?',
        answer:
          'Because serious teams need a repeatable desk, not just a prompt. Operator annual packages the workflow around review, support, and risk boundaries.',
      },
    ],
  },
]

export function findKeywordPageByPath(pathname: string) {
  const normalized = pathname.replace(/\/+$/, '') || '/'
  return keywordPages.find((page) => page.path === normalized) ?? null
}
