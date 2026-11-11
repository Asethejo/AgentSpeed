export type ResourceCategory =
  | 'Datasets'
  | 'APIs'
  | 'Research reports'
  | 'Industry insights'
  | 'Technical documentation';

export interface Resource {
  id: string;
  name: string;
  description: string;
  category: ResourceCategory;
  provider: string;
  price: number;
  currency: string;
  qualityScore: number; // 0 - 100
  freshness: string;
  suitabilityScore?: number; // 0 - 100
  recommendationStatus?: 'recommended' | 'alternative' | 'excluded';
  benefits: string[];
  limitations: string[];
  provenance: string;
  sampleDataPreview?: string;
  whyUseful?: string;
}

export type TaskStatus =
  | 'created'
  | 'analyzing'
  | 'recommended'
  | 'approving'
  | 'purchasing'
  | 'executing'
  | 'completed'
  | 'failed';

export interface Task {
  id: string;
  title: string;
  prompt: string;
  budget: number;
  currency: string;
  maxIndividualPurchase: number;
  dailyCap?: number;
  allowedCategories: ResourceCategory[];
  blockedProviders: string[];
  requireApproval: boolean;
  status: TaskStatus;
  createdAt: string;
  spentAmount: number;
  resourcesEvaluated: number;
  resourcesRecommended: number;
  completionDate?: string;
  report?: TaskReport;
}

export interface TaskReport {
  objective: string;
  completedAt: string;
  resourcesUsed: Array<{
    name: string;
    provider: string;
    price: number;
    category: string;
  }>;
  executiveSummary: string;
  keyFindings: Array<{
    title: string;
    detail: string;
    metric?: string;
    badge?: string;
  }>;
  analysisSections: Array<{
    title: string;
    content: string;
    dataPoints?: Array<{ label: string; value: string }>;
  }>;
  startupsComparison?: Array<{
    name: string;
    founded: string;
    stage: string;
    funding: string;
    valuation: string;
    growthScore: number;
    techStack: string;
    marketOpportunity: string;
  }>;
  recommendations: string[];
  conclusion: string;
  decisionReceiptId?: string;
}

export interface Recommendation {
  id: string;
  taskId: string;
  resourceId: string;
  resource: Resource;
  suitabilityScore: number;
  qualityScore: number;
  freshness: string;
  whyRecommended: string;
  expectedContribution: string;
  benefits: string[];
  limitations: string[];
  price: number;
  isSelected: boolean;
}

export interface PolicyCheck {
  id: string;
  name: string;
  description: string;
  status: 'passed' | 'blocked' | 'requires_approval';
  rule: string;
  details: string;
  checkedAt: string;
}

export interface SpendGuardValidation {
  isValid: boolean;
  totalBudget: number;
  currentCommitted: number;
  requestedAmount: number;
  remainingBudget: number;
  maxPurchaseLimit: number;
  dailyCap: number;
  policies: PolicyCheck[];
  auditSummary: string;
  blockReason?: string;
}

export type PurchaseStatus =
  | 'pending_approval'
  | 'approved'
  | 'rejected'
  | 'payment_processing'
  | 'paid'
  | 'payment_failed'
  | 'activated';

export interface Purchase {
  id: string;
  taskId: string;
  taskTitle: string;
  resourceId: string;
  resourceName: string;
  provider: string;
  amount: number;
  currency: string;
  status: PurchaseStatus;
  recommendationReason: string;
  remainingBudgetAfter: number;
  spendGuardStatus: 'passed' | 'requires_approval' | 'blocked';
  rejectReason?: string;
  approvedAt?: string;
  rejectedAt?: string;
  paypalOrderId?: string;
  paypalCaptureId?: string;
  receiptId?: string;
  activatedAt?: string;
  activationDetails?: {
    accessUrl?: string;
    apiKey?: string;
    downloadFormat?: string;
    instructions?: string;
  };
}

export interface PayPalOrder {
  orderId: string;
  purchaseId: string;
  amount: number;
  currency: string;
  status: 'CREATED' | 'SAVED' | 'APPROVED' | 'VOIDED' | 'COMPLETED';
  createTime: string;
  captureId?: string;
}

export interface DecisionReceipt {
  receiptId: string;
  taskId: string;
  taskTitle: string;
  taskDescription: string;
  budget: number;
  spentAmount: number;
  currency: string;
  createdAt: string;
  completedAt: string;
  evaluatedCount: number;
  selectedCount: number;
  rejectedCount: number;
  evaluatedResources: Array<{
    name: string;
    provider: string;
    price: number;
    quality: number;
    selected: boolean;
    reason: string;
  }>;
  spendGuardResults: Array<{
    rule: string;
    status: 'passed' | 'blocked' | 'requires_approval';
    detail: string;
  }>;
  humanApprovals: Array<{
    resourceName: string;
    status: 'approved' | 'rejected';
    timestamp: string;
    note?: string;
  }>;
  paymentRecord: {
    paypalOrderId: string;
    paypalCaptureId: string;
    amount: number;
    currency: string;
    status: string;
    verificationHash: string;
    paidAt: string;
  };
  resourceActivations: Array<{
    resourceName: string;
    activatedAt: string;
    status: string;
    accessMethod: string;
  }>;
  taskOutcome: {
    status: string;
    keyFindingsCount: number;
    reportSummary: string;
    verifiedByAgent: boolean;
  };
}

export interface DashboardSummary {
  totalTasks: number;
  totalSpent: number;
  availableBudget: number;
  pendingApprovalsCount: number;
  monthlyBudget: number;
  budgetTrend: string;
  spentTrend: string;
  tasksTrend: string;
}

export interface Transaction {
  id: string;
  purchaseId: string;
  taskId: string;
  taskName: string;
  resourceName: string;
  provider: string;
  amount: number;
  currency: string;
  date: string;
  paypalRef: string;
  status: 'completed' | 'processing' | 'refunded' | 'failed';
  activationStatus: 'activated' | 'pending' | 'failed';
}

export type TimelineStage =
  | 'task_submitted'
  | 'ai_recommendations'
  | 'spendguard_validation'
  | 'human_approval'
  | 'payment_completed'
  | 'resource_activated'
  | 'task_completed';

export interface ActivityTimelineItem {
  id: string;
  taskId: string;
  stage: TimelineStage;
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'in_progress' | 'pending' | 'failed';
  badge?: string;
}

export interface SpendingPolicySettings {
  defaultBudget: number;
  maxIndividualPurchase: number;
  dailySpendingCap: number;
  allowedCategories: ResourceCategory[];
  blockedProviders: string[];
  mandatoryApproval: boolean;
  currency: string;
  autoApproveBelow?: number;
  notificationsEnabled: boolean;
}
