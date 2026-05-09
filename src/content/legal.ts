export type LegalSection = {
  title: string
  paragraphs: string[]
}

export const legalPrivacySections: LegalSection[] = [
  {
    title: 'What we collect',
    paragraphs: [
      'AI-Trader collects only information reasonably needed to operate this website, process checkout, measure page and funnel performance, prevent abuse, and respond to support requests.',
      'This may include page views, referral and UTM data, browser and device information, approximate location derived from network data, checkout metadata, support emails, and information you intentionally submit.',
      'The public planner does not require you to upload brokerage credentials, exchange API keys, wallet keys, passwords, private trading accounts, regulated personal data, confidential strategies, or production portfolio records.',
    ],
  },
  {
    title: 'How we use information',
    paragraphs: [
      'We use analytics to understand which pages, plan choices, and checkout actions help visitors make a confident purchase decision.',
      'We use checkout metadata to create payment sessions, confirm purchases, return users to the homepage, provide onboarding, prevent fraud, handle disputes, and support accounting or legal obligations.',
      'We do not sell personal information. We do not use private trading credentials or private portfolio data for model training through this public website because the public website does not collect those materials.',
    ],
  },
  {
    title: 'Service providers',
    paragraphs: [
      'Cloudflare supports hosting, routing, security, analytics infrastructure, and edge execution. Creem supports hosted checkout and payment processing.',
      'Payment details are handled by the payment provider. We do not ask users to send card numbers, brokerage passwords, seed phrases, exchange API keys, or trading account credentials by email or through this public planner.',
      'Third-party services process information under their own terms and privacy practices. Do not proceed with checkout or external links if you do not accept those practices.',
    ],
  },
  {
    title: 'Security, retention, and deletion',
    paragraphs: [
      'We use reasonable administrative, technical, and organizational safeguards appropriate for a lightweight SaaS marketing, analytics, and checkout site.',
      'No internet service can be guaranteed perfectly secure. Users are responsible for avoiding the submission of credentials, secrets, regulated data, production trading records, or highly sensitive information unless a signed, appropriate agreement says otherwise.',
      'We retain information only as long as reasonably needed for the purposes described here, including support, tax, accounting, fraud prevention, security, dispute handling, and legal compliance.',
    ],
  },
  {
    title: 'Your choices and rights',
    paragraphs: [
      'Depending on your location, you may have rights to request access, correction, deletion, portability, restriction, or objection regarding personal information we control.',
      'California and other privacy laws may provide additional rights when their thresholds and conditions apply. We will not discriminate against users for exercising applicable privacy rights.',
      'To make a privacy or support request, email support@aigeamy.com. We may need to verify the request before acting on it.',
    ],
  },
  {
    title: 'Children, changes, and contact',
    paragraphs: [
      'AI-Trader is intended for business, developer, and research audiences and is not directed to children under 13.',
      'We may update this policy when the product, providers, laws, or operations change. The version posted on this page controls from the time it is published.',
      'Questions about privacy, support, or data handling should be sent to support@aigeamy.com.',
    ],
  },
]

export const legalTermsSections: LegalSection[] = [
  {
    title: 'Acceptance and service scope',
    paragraphs: [
      'By accessing AI-Trader, using the planner, opening checkout, purchasing a plan, or continuing to use the service, you agree to these Terms.',
      'AI-Trader provides a website, agent trading desk planner, pricing flow, hosted checkout, analytics, and related onboarding for supervised AI trading-signal and copy-trading workflows.',
      'This site is not the official upstream HKUDS AI-Trader project and is not a promise that any AI agent, model, signal, prediction, data source, exchange, broker, wallet, or copy-trading workflow will be profitable, available, lawful, accurate, or safe without human review.',
    ],
  },
  {
    title: 'No financial advice',
    paragraphs: [
      'AI-Trader does not provide investment, financial, tax, legal, accounting, brokerage, fiduciary, or professional advice. All examples, rankings, predictions, copy-trading references, and generated materials are informational only.',
      'No content is an offer, recommendation, solicitation, or instruction to buy, sell, hold, short, cover, copy, automate, or trade any security, commodity, token, derivative, prediction market position, currency, or financial instrument.',
      'You are solely responsible for your research, suitability decisions, risk controls, legal compliance, trading permissions, tax treatment, and losses.',
    ],
  },
  {
    title: 'User responsibilities',
    paragraphs: [
      'You are responsible for the agents, prompts, accounts, markets, strategies, signals, predictions, credentials, API keys, brokerage settings, exchange settings, copy-trading settings, and operational actions you provide, authorize, or rely on.',
      'Do not upload or disclose API keys, wallet keys, passwords, seed phrases, private keys, regulated data, confidential third-party information, export-controlled material, or data you are not allowed to process.',
      'Any workflow that can place trades, copy positions, publish signals, route funds, call external APIs, affect portfolios, or influence financial decisions must be operated with explicit permissions, paper-trading tests, and human review.',
    ],
  },
  {
    title: 'AI output and market risk',
    paragraphs: [
      'AI-assisted output, trading signals, model predictions, leaderboard summaries, agent reviews, and setup notes may be incomplete, inaccurate, delayed, biased, insecure, infringing, unavailable, unsuitable, or wrong.',
      'Markets are volatile. Paper-trading performance, backtests, competitions, agent rankings, points, simulated portfolios, or historical examples do not guarantee future results.',
      'You are solely responsible for deciding whether any signal, trade, copy-trading action, checkout, deployment, or operational change is safe, lawful, and appropriate for your use case.',
    ],
  },
  {
    title: 'Payments, renewals, and refunds',
    paragraphs: [
      'Payments are processed by Creem in a hosted popup window. Successful checkouts return the user to the homepage.',
      'Displayed annual pricing reflects a 50% discount versus the monthly run-rate for the same plan. Prices, plan names, features, and availability may change before purchase.',
      'Unless a separate written agreement says otherwise, purchases are final to the maximum extent permitted by law. If the payment provider, consumer law, or a written policy requires a refund, that required rule controls.',
      'Chargebacks, payment abuse, or attempted circumvention of checkout may result in suspension, cancellation, refusal of service, or preservation of evidence.',
    ],
  },
  {
    title: 'Prohibited use',
    paragraphs: [
      'You may not use AI-Trader to violate law, infringe rights, manipulate markets, conduct wash trading, spoof, pump and dump, evade sanctions, launder money, bypass access controls, distribute malware, spam, impersonate others, or process data without authority.',
      'You may not reverse engineer, overload, interfere with, resell, frame, copy, scrape where prohibited, or exploit the service except as expressly permitted in writing.',
      'We may suspend or terminate access, refuse checkout, preserve evidence, or cooperate with lawful requests when we believe use is unsafe, abusive, fraudulent, infringing, unlawful, or inconsistent with these Terms.',
    ],
  },
  {
    title: 'Third-party services',
    paragraphs: [
      'Cloudflare, Creem, GitHub, data providers, AI model providers, brokers, exchanges, prediction markets, wallet providers, infrastructure providers, and other third-party services may be involved in hosting, checkout, references, integrations, or customer workflows.',
      'We are not responsible for third-party services, third-party outages, payment provider decisions, external repositories, market data, exchange behavior, broker decisions, account bans, rate limits, slippage, fees, taxes, or third-party terms.',
      'Your use of third-party services is governed by the applicable third-party terms, privacy policies, account rules, market rules, and fees.',
    ],
  },
  {
    title: 'No warranties',
    paragraphs: [
      'AI-Trader is provided as is and as available. To the maximum extent permitted by law, we disclaim all warranties, whether express, implied, statutory, or otherwise.',
      'We do not warrant uninterrupted service, error-free operation, complete security, merchantability, fitness for a particular purpose, non-infringement, accuracy of AI output, market-data accuracy, prediction quality, provider availability, profitability, rankings, conversion results, or business outcomes.',
      'You use the service at your own risk and remain responsible for backups, testing, review, security, legal compliance, provider bills, trading losses, and production decisions.',
    ],
  },
  {
    title: 'Limitation of liability',
    paragraphs: [
      'To the maximum extent permitted by law, AI-Trader and its operators, affiliates, suppliers, and service providers will not be liable for trading losses, lost profits, lost opportunities, lost data, indirect, incidental, special, consequential, exemplary, or punitive damages.',
      'To the maximum extent permitted by law, total liability for any claim relating to the service is limited to the greater of 100 USD or the amount you paid for AI-Trader in the three months before the event giving rise to the claim.',
      'These limits apply whether the claim is based on contract, tort, negligence, strict liability, statute, warranty, or any other theory, even if a remedy fails of its essential purpose.',
    ],
  },
  {
    title: 'Indemnity',
    paragraphs: [
      'You agree to defend, indemnify, and hold harmless AI-Trader and its operators, affiliates, suppliers, and service providers from claims, damages, liabilities, losses, costs, and fees arising from your use of the service.',
      'This includes claims arising from your data, credentials, prompts, agents, strategies, predictions, trading activity, copy-trading activity, third-party accounts, violation of law, infringement, breach of these Terms, or unauthorized use of credentials or systems.',
    ],
  },
  {
    title: 'Disputes',
    paragraphs: [
      'Before filing a claim, you agree to email support@aigeamy.com and give us 30 days to try to resolve the dispute informally.',
      'To the maximum extent permitted by law, disputes must be resolved individually and not as a class, collective, consolidated, private attorney general, or representative action.',
      'To the maximum extent permitted by law, disputes will be resolved by binding arbitration or the courts with proper jurisdiction for the operator, and you waive jury trial where that waiver is enforceable.',
      'If any part of these dispute terms is unenforceable, the remaining provisions continue to apply to the maximum extent permitted by law.',
    ],
  },
  {
    title: 'Changes, termination, and contact',
    paragraphs: [
      'We may update these Terms, change or discontinue features, refuse transactions, suspend access, or terminate service when reasonably necessary for security, legal, operational, abuse-prevention, regulatory, or business reasons.',
      'If a provision is unenforceable, the rest of these Terms remains effective. A failure to enforce a provision is not a waiver.',
      'Questions, notices, support requests, and dispute notices should be sent to support@aigeamy.com.',
    ],
  },
]
