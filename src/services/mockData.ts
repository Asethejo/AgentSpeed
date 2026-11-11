import {
  Resource,
  Task,
  Purchase,
  Transaction,
  DecisionReceipt,
  SpendingPolicySettings,
  ActivityTimelineItem,
} from '../types';

export const INITIAL_RESOURCES: Resource[] = [
  {
    id: 'res-startups-dataset',
    name: 'AI Startups Funding & Traction Dataset 2024',
    description: 'Verified cap tables, funding rounds, revenue estimates, and investor rosters for 500+ breakthrough AI companies.',
    category: 'Datasets',
    provider: 'VenturePulse Analytics',
    price: 4.00,
    currency: 'USD',
    qualityScore: 96,
    freshness: 'Weekly',
    suitabilityScore: 98,
    recommendationStatus: 'recommended',
    benefits: [
      'Verified Series Seed through Series C financial metrics',
      'Detailed competitor mapping and valuation multiples',
      'Clean tabular schema in CSV/Parquet formats'
    ],
    limitations: [
      'Covers primarily North America and Western Europe entities',
      'Early pre-seed stealth entities not fully disclosed'
    ],
    provenance: 'Aggregated from regulatory filings, SEC Form D, VC lead investor disclosures, and audited company announcements.',
    whyUseful: 'Provides authoritative numerical funding and valuation benchmarks for the requested AI startup comparison.',
    sampleDataPreview: 'Company, Round, Amount_USD, Valuation_USD, Lead_Investor, Growth_YoY%\nCognitiveScale, Series B, 28M, 140M, Andreessen Horowitz, 240%\nSynthetix Labs, Seed, 4.2M, 24M, Sequoia Capital, 310%\nAgenticMind, Series A, 16.5M, 85M, Index Ventures, 195%\nNeuraFlow AI, Seed, 3.8M, 18M, Founders Fund, 420%\nVectorMesh, Series A, 12M, 60M, Bessemer Venture, 180%'
  },
  {
    id: 'res-market-trends-api',
    name: 'AI Market Trends & Growth API Access Key',
    description: 'Live programmatic endpoint offering real-time momentum scores, web traffic growth, headcount velocity, and sentiment.',
    category: 'APIs',
    provider: 'AlphaInsight Data Corp',
    price: 3.00,
    currency: 'USD',
    qualityScore: 94,
    freshness: 'Real-time',
    suitabilityScore: 95,
    recommendationStatus: 'recommended',
    benefits: [
      'Sub-50ms REST API response times with guaranteed 99.9% uptime',
      'Real-time talent inflow and engineering hiring velocity indicators',
      'Includes 10,000 developer quota credits for immediate querying'
    ],
    limitations: [
      'Rate-limited to 60 requests per minute on Starter tier',
      'Historical trends data limited to past 24 calendar months'
    ],
    provenance: 'Live scraping of GitHub repositories, LinkedIn engineering moves, hiring portals, and tech press mentions.',
    whyUseful: 'Provides the operational growth metrics and engineering momentum needed to benchmark AI startup traction.',
    sampleDataPreview: 'GET /v1/startups/growth?domain=cognitive-ai.io\n{\n  "status": "active",\n  "growth_percentile": 92.4,\n  "monthly_traffic_growth": "+34.2%",\n  "active_job_requisitions": 28,\n  "github_star_velocity": 412\n}'
  },
  {
    id: 'res-gartner-report',
    name: 'Enterprise AI Market Dynamics & Opportunity Matrix',
    description: 'Comprehensive 68-page deep-dive research paper analyzing commercial adoption roadblocks, TAM forecasts, and emerging moats.',
    category: 'Research reports',
    provider: 'Gartner Peer Intelligence',
    price: 4.50,
    currency: 'USD',
    qualityScore: 91,
    freshness: 'Monthly',
    suitabilityScore: 78,
    recommendationStatus: 'alternative',
    benefits: [
      'Qualitative enterprise buying sentiment analysis across 400 CIOs',
      'Strategic TAM projection breakdowns through 2028'
    ],
    limitations: [
      'Exceeds single item budget limit if combined with dataset',
      'Focuses heavily on Fortune 500 incumbents over agile early-stage players'
    ],
    provenance: 'Conducted via blinded executive survey panels and verified enterprise procurement reviews.',
    whyUseful: 'Excellent qualitative backing, but dataset and API provide better quantitative ROI for the prompt within $10 budget.'
  },
  {
    id: 'res-valuation-benchmarks',
    name: 'Global Tech Startup Valuation Benchmarks & Multiples',
    description: 'Macro financial multiples (EV/ARR, Seed-to-A conversion rates) for deep tech, agentic computing, and enterprise SaaS.',
    category: 'Industry insights',
    provider: 'VentureScale Analytics',
    price: 2.50,
    currency: 'USD',
    qualityScore: 89,
    freshness: 'Monthly',
    suitabilityScore: 82,
    recommendationStatus: 'alternative',
    benefits: [
      'Reliable median ARR valuation multiple tables by funding stage',
      'Low cost add-on for broader macro financial context'
    ],
    limitations: [
      'Aggregated sector indices rather than named startup tear-sheets'
    ],
    provenance: 'Compiled from anonymized cap-table data from 120 leading venture capital funds.',
    whyUseful: 'Useful supplementary benchmarks if additional budget is allocated.'
  },
  {
    id: 'res-agent-architecture',
    name: 'Autonomous Agent Architecture & Evaluation Benchmarks',
    description: 'Peer-reviewed technical evaluation framework detailing LLM orchestration latencies, tool-calling success rates, and token cost curves.',
    category: 'Technical documentation',
    provider: 'DeepSystems Labs',
    price: 1.50,
    currency: 'USD',
    qualityScore: 88,
    freshness: 'Real-time',
    suitabilityScore: 71,
    recommendationStatus: 'alternative',
    benefits: [
      'Precision latency and memory footprint comparisons for tool execution',
      'Reproducible Python test harness scripts'
    ],
    limitations: [
      'Highly technical engineering focus with minimal financial or venture data'
    ],
    provenance: 'Authored by former MIT CSAIL researchers and open-source benchmark maintainers.',
    whyUseful: 'Great for evaluating AI startups engineering depth, but secondary to venture data.'
  },
  {
    id: 'res-genai-directory',
    name: 'Generative AI Seed to Series B Directory & Founders Dossier',
    description: 'Categorized catalog of 350+ generative AI founders, previous exits, patent filings, and technical moat descriptions.',
    category: 'Datasets',
    provider: 'CBCrunch Intelligence',
    price: 3.50,
    currency: 'USD',
    qualityScore: 85,
    freshness: 'Daily',
    suitabilityScore: 76,
    recommendationStatus: 'alternative',
    benefits: [
      'Biographical backgrounds of technical founders and patent history',
      'Direct contact avenues and social presence signals'
    ],
    limitations: [
      'Funding round amounts not as exhaustively verified as VenturePulse'
    ],
    provenance: 'Crowdsourced venture network with algorithmic verification.',
    whyUseful: 'Alternative data source if primary funding dataset is unavailable.'
  },
  {
    id: 'res-saas-metrics-feed',
    name: 'B2B SaaS Churn & Retention Cohort Data Feed',
    description: 'Anonymized telemetry on net revenue retention (NRR), churn cohorts, and customer acquisition costs across SaaS sectors.',
    category: 'APIs',
    provider: 'SaaSMetrics Network',
    price: 5.00,
    currency: 'USD',
    qualityScore: 92,
    freshness: 'Real-time',
    suitabilityScore: 64,
    recommendationStatus: 'excluded',
    benefits: [
      'Actual transactional churn telemetry from live billing systems'
    ],
    limitations: [
      'Exceeds individual purchase limit under default $4.00 policy rule',
      'Broader SaaS focus rather than dedicated generative AI startup comparison'
    ],
    provenance: 'Stripe, Chargebee, and Recurly anonymized aggregate telemetry.',
    whyUseful: 'Flagged by SpendGuard as exceeding individual purchase threshold.'
  },
  {
    id: 'res-regulatory-whitepaper',
    name: 'Global AI Regulatory Compliance & Liability Whitepaper',
    description: 'Legal analysis of EU AI Act, US Executive Orders, and algorithmic copyright liability impacting early AI commercialization.',
    category: 'Research reports',
    provider: 'LexTech Advisory',
    price: 2.00,
    currency: 'USD',
    qualityScore: 87,
    freshness: 'Q3 2024',
    suitabilityScore: 69,
    recommendationStatus: 'alternative',
    benefits: [
      'Risk matrix breakdown for customer data privacy and model licensing'
    ],
    limitations: [
      'Purely legal and regulatory focus; minimal funding metrics'
    ],
    provenance: 'Reviewed by licensed technology intellectual property attorneys.',
    whyUseful: 'Optional risk assessment supplement.'
  }
];

export const INITIAL_SETTINGS: SpendingPolicySettings = {
  defaultBudget: 10.00,
  maxIndividualPurchase: 4.50,
  dailySpendingCap: 25.00,
  allowedCategories: [
    'Datasets',
    'APIs',
    'Research reports',
    'Industry insights',
    'Technical documentation'
  ],
  blockedProviders: ['UntrustedScraperBot', 'ShadowDataInc'],
  mandatoryApproval: true,
  currency: 'USD',
  autoApproveBelow: 0.00, // Never auto-approve when mandatoryApproval is true
  notificationsEnabled: true
};

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-ai-startups-01',
    title: 'Research five AI startups and compare funding, growth, and market opportunities',
    prompt: 'Research five AI startups and compare their funding, growth, and market opportunities.',
    budget: 10.00,
    currency: 'USD',
    maxIndividualPurchase: 4.50,
    dailyCap: 25.00,
    allowedCategories: ['Datasets', 'APIs', 'Research reports', 'Industry insights'],
    blockedProviders: ['UntrustedScraperBot'],
    requireApproval: true,
    status: 'completed',
    createdAt: '2026-11-10T14:20:00Z',
    completionDate: '2026-11-10T14:28:15Z',
    spentAmount: 7.00,
    resourcesEvaluated: 8,
    resourcesRecommended: 2,
    report: {
      objective: 'Research five breakthrough AI startups and rigorously compare their capitalization, growth trajectories, and competitive market positioning.',
      completedAt: '2026-11-10T14:28:15Z',
      resourcesUsed: [
        {
          name: 'AI Startups Funding & Traction Dataset 2024',
          provider: 'VenturePulse Analytics',
          price: 4.00,
          category: 'Datasets'
        },
        {
          name: 'AI Market Trends & Growth API Access Key',
          provider: 'AlphaInsight Data Corp',
          price: 3.00,
          category: 'APIs'
        }
      ],
      executiveSummary: 'AgentSpend unlocked verified venture telemetry and real-time developer momentum signals to benchmark five high-growth AI ventures: Synthetix Labs, NeuraFlow AI, CognitiveScale, AgenticMind, and VectorMesh. Synthetix Labs and NeuraFlow AI demonstrate the highest revenue growth multiples (>300% YoY), while CognitiveScale maintains the strongest enterprise balance sheet ($28M Series B).',
      keyFindings: [
        {
          title: 'Highest Capital Efficiency',
          detail: 'NeuraFlow AI achieved 420% YoY organic growth with only $3.8M in seed funding, exhibiting best-in-class burn multiple.',
          metric: '420% YoY',
          badge: 'Top Performer'
        },
        {
          title: 'Strongest Enterprise Market Moat',
          detail: 'CognitiveScale leads enterprise deployments with 48 Fortune 500 contracts, backed by Andreessen Horowitz.',
          metric: '$140M Val.',
          badge: 'Enterprise Leader'
        },
        {
          title: 'Highest Developer Velocity',
          detail: 'Synthetix Labs developer SDK adoption rose 34.2% monthly, capturing 92nd percentile in open-source developer velocity.',
          metric: '92nd Pct',
          badge: 'Developer Love'
        }
      ],
      analysisSections: [
        {
          title: '1. Capitalization & Stage Analysis',
          content: 'Analysis of Series Seed through Series B rounds reveals valuation-to-ARR multiples compressing slightly toward 18-24x, down from 35x peak in 2023, yet premium autonomous agent platforms still command strong investor demand. All 5 entities have runway exceeding 22 months under current headcount trajectories.',
          dataPoints: [
            { label: 'Total Analyzed Funding', value: '$64.5M USD' },
            { label: 'Median Valuation', value: '$60.0M USD' },
            { label: 'Average Runway', value: '24.2 Months' }
          ]
        },
        {
          title: '2. Product Moat & Technical Architecture',
          content: 'Proprietary fine-tuning pipelines and specialized reasoning graphs represent the primary defensibility factors. Pure wrapper models without proprietary memory architectures show high customer churn risks (18-24% annual), whereas AgenticMind and VectorMesh utilize multi-agent deterministic state machines.'
        },
        {
          title: '3. Market Opportunity & TAM Capture',
          content: 'The autonomous enterprise procurement and workflow orchestration market is projected to reach $38.4B by 2028. Startups embedding automated financial guardrails and human-in-the-loop approvals are closing commercial pilot contracts 3.4x faster than fully unmonitored systems.'
        }
      ],
      startupsComparison: [
        {
          name: 'Synthetix Labs',
          founded: '2023',
          stage: 'Seed',
          funding: '$4.2M',
          valuation: '$24M',
          growthScore: 94,
          techStack: 'Rust, PyTorch, Multi-agent LLM Router',
          marketOpportunity: 'Enterprise synthetic testing environments & simulated user cohorts.'
        },
        {
          name: 'NeuraFlow AI',
          founded: '2024',
          stage: 'Seed',
          funding: '$3.8M',
          valuation: '$18M',
          growthScore: 97,
          techStack: 'C++, CUDA, Distributed Memory Cache',
          marketOpportunity: 'Edge AI inference optimization with 80% reduced cloud compute costs.'
        },
        {
          name: 'CognitiveScale',
          founded: '2022',
          stage: 'Series B',
          funding: '$28.0M',
          valuation: '$140M',
          growthScore: 89,
          techStack: 'Python, Ray, Enterprise RBAC & Audit',
          marketOpportunity: 'Regulated banking and healthcare workflow governance pipelines.'
        },
        {
          name: 'AgenticMind',
          founded: '2023',
          stage: 'Series A',
          funding: '$16.5M',
          valuation: '$85M',
          growthScore: 91,
          techStack: 'TypeScript, Go, Tool-calling Orchestrator',
          marketOpportunity: 'Autonomous developer DevOps triage and self-healing cloud pipelines.'
        },
        {
          name: 'VectorMesh',
          founded: '2023',
          stage: 'Series A',
          funding: '$12.0M',
          valuation: '$60M',
          growthScore: 86,
          techStack: 'Rust, pgvector, Distributed Embeddings',
          marketOpportunity: 'Scalable hybrid vector-relational knowledge stores for enterprise.'
        }
      ],
      recommendations: [
        'Prioritize partnership or investment evaluation with NeuraFlow AI for core compute efficiency gains.',
        'Synthetix Labs is optimal for developer tool integrations due to public SDK traction.',
        'CognitiveScale remains the benchmark for SOC-2 Type II and HIPAA enterprise procurement compliance.',
        'Maintain automated SpendGuard limits when orchestrating external API access to prevent cost overruns.'
      ],
      conclusion: 'The AI startup landscape is pivoting rapidly from generic chat interfaces to specialized autonomous execution agents with embedded economic guardrails. Synthetix Labs and NeuraFlow AI represent the highest return-on-capital profiles among the benchmarked cohort.',
      decisionReceiptId: 'rcpt-ai-startups-8824'
    }
  },
  {
    id: 'task-clean-energy-02',
    title: 'Analyze grid storage battery chemistry patents and commercial cost curves',
    prompt: 'Analyze grid storage battery chemistry patents and commercial cost curves through 2030.',
    budget: 15.00,
    currency: 'USD',
    maxIndividualPurchase: 5.00,
    dailyCap: 25.00,
    allowedCategories: ['Datasets', 'Research reports', 'Technical documentation'],
    blockedProviders: [],
    requireApproval: true,
    status: 'approving',
    createdAt: '2026-11-10T18:45:00Z',
    spentAmount: 0.00,
    resourcesEvaluated: 6,
    resourcesRecommended: 2
  }
];

export const INITIAL_PURCHASES: Purchase[] = [
  {
    id: 'pur-dataset-01',
    taskId: 'task-ai-startups-01',
    taskTitle: 'Research five AI startups and compare funding, growth, and market opportunities',
    resourceId: 'res-startups-dataset',
    resourceName: 'AI Startups Funding & Traction Dataset 2024',
    provider: 'VenturePulse Analytics',
    amount: 4.00,
    currency: 'USD',
    status: 'activated',
    recommendationReason: 'Contains verified Series Seed through B funding rounds and cap-table details for the requested 5 startups.',
    remainingBudgetAfter: 6.00,
    spendGuardStatus: 'passed',
    approvedAt: '2026-11-10T14:22:30Z',
    paypalOrderId: 'PAYPAL-ORD-928174201',
    paypalCaptureId: 'PAYPAL-CAP-55102941',
    receiptId: 'rcpt-ai-startups-8824',
    activatedAt: '2026-11-10T14:24:02Z',
    activationDetails: {
      accessUrl: 'https://data.venturepulse.io/vault/dl/v4-ai-500-startups.parquet',
      downloadFormat: 'Parquet & CSV (14.2 MB)',
      instructions: 'Cryptographic SHA-256 verified. Dataset mounted to Agent execution runtime.'
    }
  },
  {
    id: 'pur-api-02',
    taskId: 'task-ai-startups-01',
    taskTitle: 'Research five AI startups and compare funding, growth, and market opportunities',
    resourceId: 'res-market-trends-api',
    resourceName: 'AI Market Trends & Growth API Access Key',
    provider: 'AlphaInsight Data Corp',
    amount: 3.00,
    currency: 'USD',
    status: 'activated',
    recommendationReason: 'Provides live engineering headcount and GitHub star velocity to compare startup momentum.',
    remainingBudgetAfter: 3.00,
    spendGuardStatus: 'passed',
    approvedAt: '2026-11-10T14:23:10Z',
    paypalOrderId: 'PAYPAL-ORD-928174202',
    paypalCaptureId: 'PAYPAL-CAP-55102942',
    receiptId: 'rcpt-ai-startups-8824',
    activatedAt: '2026-11-10T14:24:45Z',
    activationDetails: {
      apiKey: 'ak_live_alphainsight_8f29d10e531bc7',
      instructions: 'Bearer token provisioned. Rate limit: 60 req/min with 10k credits.'
    }
  },
  {
    id: 'pur-pending-battery-03',
    taskId: 'task-clean-energy-02',
    taskTitle: 'Analyze grid storage battery chemistry patents and commercial cost curves',
    resourceId: 'res-gartner-report',
    resourceName: 'Enterprise AI Market Dynamics & Opportunity Matrix',
    provider: 'Gartner Peer Intelligence',
    amount: 4.50,
    currency: 'USD',
    status: 'pending_approval',
    recommendationReason: 'Detailed cost curve projections and patent breakdown through 2030.',
    remainingBudgetAfter: 10.50,
    spendGuardStatus: 'passed'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'txn-1001',
    purchaseId: 'pur-dataset-01',
    taskId: 'task-ai-startups-01',
    taskName: 'Research five AI startups',
    resourceName: 'AI Startups Funding & Traction Dataset 2024',
    provider: 'VenturePulse Analytics',
    amount: 4.00,
    currency: 'USD',
    date: '2026-11-10T14:23:45Z',
    paypalRef: 'PP-CAP-55102941',
    status: 'completed',
    activationStatus: 'activated'
  },
  {
    id: 'txn-1002',
    purchaseId: 'pur-api-02',
    taskId: 'task-ai-startups-01',
    taskName: 'Research five AI startups',
    resourceName: 'AI Market Trends & Growth API Access Key',
    provider: 'AlphaInsight Data Corp',
    amount: 3.00,
    currency: 'USD',
    date: '2026-11-10T14:24:20Z',
    paypalRef: 'PP-CAP-55102942',
    status: 'completed',
    activationStatus: 'activated'
  }
];

export const INITIAL_DECISION_RECEIPT: DecisionReceipt = {
  receiptId: 'rcpt-ai-startups-8824',
  taskId: 'task-ai-startups-01',
  taskTitle: 'Research five AI startups and compare funding, growth, and market opportunities',
  taskDescription: 'Research five AI startups and compare their funding, growth, and market opportunities.',
  budget: 10.00,
  spentAmount: 7.00,
  currency: 'USD',
  createdAt: '2026-11-10T14:20:00Z',
  completedAt: '2026-11-10T14:28:15Z',
  evaluatedCount: 8,
  selectedCount: 2,
  rejectedCount: 6,
  evaluatedResources: [
    {
      name: 'AI Startups Funding & Traction Dataset 2024',
      provider: 'VenturePulse Analytics',
      price: 4.00,
      quality: 96,
      selected: true,
      reason: 'Optimal coverage of Series Seed to B cap tables and valuation metrics within budget.'
    },
    {
      name: 'AI Market Trends & Growth API Access Key',
      provider: 'AlphaInsight Data Corp',
      price: 3.00,
      quality: 94,
      selected: true,
      reason: 'Live momentum metrics, talent hiring velocity, and traffic trends.'
    },
    {
      name: 'Enterprise AI Market Dynamics Q4 Report',
      provider: 'Gartner Peer Intelligence',
      price: 4.50,
      quality: 91,
      selected: false,
      reason: 'Exceeded budget when paired with primary dataset ($4.00 + $4.50 = $8.50, but API offered higher technical granularity).'
    },
    {
      name: 'Global Tech Startup Valuation Benchmarks',
      provider: 'VentureScale Analytics',
      price: 2.50,
      quality: 89,
      selected: false,
      reason: 'Macro aggregate indices without individual company tear-sheets.'
    },
    {
      name: 'B2B SaaS Churn & Retention Cohort Data Feed',
      provider: 'SaaSMetrics Network',
      price: 5.00,
      quality: 92,
      selected: false,
      reason: 'Blocked by SpendGuard: Price of $5.00 exceeds individual purchase limit of $4.50.'
    }
  ],
  spendGuardResults: [
    {
      rule: 'Total Task Budget Constraint ($10.00)',
      status: 'passed',
      detail: 'Committed total $7.00 leaves $3.00 buffer (30% surplus).'
    },
    {
      rule: 'Individual Purchase Cap ($4.50)',
      status: 'passed',
      detail: 'All selected resources ($4.00 and $3.00) comply with the $4.50 single-item ceiling.'
    },
    {
      rule: 'Allowed Resource Categories',
      status: 'passed',
      detail: 'Datasets and APIs are whitelisted in policy profile.'
    },
    {
      rule: 'Blocked Provider Blacklist',
      status: 'passed',
      detail: 'VenturePulse Analytics and AlphaInsight Data Corp are verified safe vendors.'
    },
    {
      rule: 'Mandatory Human Approval Verification',
      status: 'passed',
      detail: 'Both purchases verified with cryptographically signed user approval.'
    },
    {
      rule: 'Duplicate Purchase Protection',
      status: 'passed',
      detail: 'No duplicate resource licenses detected in organization vault.'
    }
  ],
  humanApprovals: [
    {
      resourceName: 'AI Startups Funding & Traction Dataset 2024',
      status: 'approved',
      timestamp: '2026-11-10T14:22:30Z',
      note: 'User approved purchase: $4.00 charged to authorized PayPal balance.'
    },
    {
      resourceName: 'AI Market Trends & Growth API Access Key',
      status: 'approved',
      timestamp: '2026-11-10T14:23:10Z',
      note: 'User approved purchase: $3.00 charged to authorized PayPal balance.'
    }
  ],
  paymentRecord: {
    paypalOrderId: 'PAYPAL-ORD-928174201',
    paypalCaptureId: 'PAYPAL-CAP-55102941',
    amount: 7.00,
    currency: 'USD',
    status: 'COMPLETED',
    verificationHash: 'sha256:0e8c89b8823fca855c328901ae4f3693240b08dbbb09cf525164293f0b2401',
    paidAt: '2026-11-10T14:24:20Z'
  },
  resourceActivations: [
    {
      resourceName: 'AI Startups Funding & Traction Dataset 2024',
      activatedAt: '2026-11-10T14:24:02Z',
      status: 'ACTIVE_MOUNTED',
      accessMethod: 'Encrypted Parquet Pipe /dev/shm/venturepulse'
    },
    {
      resourceName: 'AI Market Trends & Growth API Access Key',
      activatedAt: '2026-11-10T14:24:45Z',
      status: 'ACTIVE_KEY_INJECTED',
      accessMethod: 'Automated REST Bearer Injection'
    }
  ],
  taskOutcome: {
    status: 'SUCCESS_COMPLETED',
    keyFindingsCount: 3,
    reportSummary: 'Benchmarked 5 AI startups (Synthetix Labs, NeuraFlow AI, CognitiveScale, AgenticMind, VectorMesh) with verified $64.5M capitalization analysis.',
    verifiedByAgent: true
  }
};

export const INITIAL_TIMELINE: ActivityTimelineItem[] = [
  {
    id: 'time-1',
    taskId: 'task-ai-startups-01',
    stage: 'task_submitted',
    title: 'Task Created & Analyzed',
    description: 'Natural language task registered with $10.00 budget ceiling.',
    timestamp: '14:20:00',
    status: 'completed',
    badge: 'Initiated'
  },
  {
    id: 'time-2',
    taskId: 'task-ai-startups-01',
    stage: 'ai_recommendations',
    title: '8 Resources Evaluated',
    description: 'Autonomous catalog scan matched 2 optimal assets totaling $7.00.',
    timestamp: '14:21:15',
    status: 'completed',
    badge: 'AI Plan'
  },
  {
    id: 'time-3',
    taskId: 'task-ai-startups-01',
    stage: 'spendguard_validation',
    title: 'SpendGuard Validation Passed',
    description: '6 financial policy checks passed. Zero security or budget violations.',
    timestamp: '14:21:40',
    status: 'completed',
    badge: 'SpendGuard'
  },
  {
    id: 'time-4',
    taskId: 'task-ai-startups-01',
    stage: 'human_approval',
    title: 'Human Approval Granted',
    description: 'Purchases authorized for $4.00 dataset and $3.00 API access key.',
    timestamp: '14:23:10',
    status: 'completed',
    badge: 'Human Signed'
  },
  {
    id: 'time-5',
    taskId: 'task-ai-startups-01',
    stage: 'payment_completed',
    title: 'PayPal Capture Confirmed',
    description: 'Settled $7.00 USD via PayPal Sandbox (Capture #55102941).',
    timestamp: '14:24:20',
    status: 'completed',
    badge: 'PayPal Paid'
  },
  {
    id: 'time-6',
    taskId: 'task-ai-startups-01',
    stage: 'resource_activated',
    title: 'Digital Resources Unlocked',
    description: 'Encrypted parquet dataset mounted and live REST API credentials provisioned.',
    timestamp: '14:24:45',
    status: 'completed',
    badge: 'Activated'
  },
  {
    id: 'time-7',
    taskId: 'task-ai-startups-01',
    stage: 'task_completed',
    title: 'Task Delivered & Receipt Sealed',
    description: 'Comprehensive 5-startup comparative analysis generated with verifiable Decision Receipt #8824.',
    timestamp: '14:28:15',
    status: 'completed',
    badge: 'Delivered'
  }
];
