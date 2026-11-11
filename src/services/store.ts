import {
  Task,
  Resource,
  Purchase,
  Transaction,
  DecisionReceipt,
  SpendingPolicySettings,
  ActivityTimelineItem,
  SpendGuardValidation,
  Recommendation
} from '../types';
import {
  INITIAL_RESOURCES,
  INITIAL_TASKS,
  INITIAL_PURCHASES,
  INITIAL_TRANSACTIONS,
  INITIAL_DECISION_RECEIPT,
  INITIAL_SETTINGS,
  INITIAL_TIMELINE,
} from './mockData';

const STORAGE_KEYS = {
  TASKS: 'agentspend_tasks',
  RESOURCES: 'agentspend_resources',
  PURCHASES: 'agentspend_purchases',
  TRANSACTIONS: 'agentspend_transactions',
  RECEIPTS: 'agentspend_receipts',
  SETTINGS: 'agentspend_settings',
  TIMELINE: 'agentspend_timeline',
};

function load<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.warn(`Failed to parse localStorage key ${key}:`, err);
    return fallback;
  }
}

function save<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Failed to save to localStorage key ${key}:`, err);
  }
}

export class MockStorageEngine {
  private static instance: MockStorageEngine;

  private tasks: Task[];
  private resources: Resource[];
  private purchases: Purchase[];
  private transactions: Transaction[];
  private receipts: Record<string, DecisionReceipt>;
  private settings: SpendingPolicySettings;
  private timeline: ActivityTimelineItem[];

  private constructor() {
    this.tasks = load<Task[]>(STORAGE_KEYS.TASKS, INITIAL_TASKS);
    this.resources = load<Resource[]>(STORAGE_KEYS.RESOURCES, INITIAL_RESOURCES);
    this.purchases = load<Purchase[]>(STORAGE_KEYS.PURCHASES, INITIAL_PURCHASES);
    this.transactions = load<Transaction[]>(STORAGE_KEYS.TRANSACTIONS, INITIAL_TRANSACTIONS);
    this.receipts = load<Record<string, DecisionReceipt>>(STORAGE_KEYS.RECEIPTS, {
      [INITIAL_DECISION_RECEIPT.receiptId]: INITIAL_DECISION_RECEIPT,
    });
    this.settings = load<SpendingPolicySettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
    this.timeline = load<ActivityTimelineItem[]>(STORAGE_KEYS.TIMELINE, INITIAL_TIMELINE);
  }

  public static getInstance(): MockStorageEngine {
    if (!MockStorageEngine.instance) {
      MockStorageEngine.instance = new MockStorageEngine();
    }
    return MockStorageEngine.instance;
  }

  // --- TASKS ---
  public getTasks(): Task[] {
    return [...this.tasks];
  }

  public getTask(id: string): Task | undefined {
    return this.tasks.find((t) => t.id === id);
  }

  public addTask(task: Task): Task {
    this.tasks = [task, ...this.tasks];
    save(STORAGE_KEYS.TASKS, this.tasks);

    this.addTimelineItem({
      id: `time-${Date.now()}`,
      taskId: task.id,
      stage: 'task_submitted',
      title: 'Task Created & Registered',
      description: `Task "${task.title.substring(0, 40)}..." created with $${task.budget.toFixed(2)} budget.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'completed',
      badge: 'New Task'
    });

    return task;
  }

  public updateTask(id: string, updates: Partial<Task>): Task | undefined {
    const idx = this.tasks.findIndex((t) => t.id === id);
    if (idx === -1) return undefined;
    this.tasks[idx] = { ...this.tasks[idx], ...updates };
    save(STORAGE_KEYS.TASKS, this.tasks);
    return this.tasks[idx];
  }

  // --- RESOURCES ---
  public getResources(): Resource[] {
    return [...this.resources];
  }

  public getResource(id: string): Resource | undefined {
    return this.resources.find((r) => r.id === id);
  }

  // --- RECOMMENDATIONS GENERATION ---
  public getRecommendationsForTask(task: Task): Recommendation[] {
    // Score each resource against the task prompt & budget
    const taskBudget = task.budget || 10.0;
    const maxItemPrice = task.maxIndividualPurchase || 4.50;

    return this.resources.map((resource) => {
      let isRecommended = false;
      let suitability = resource.suitabilityScore || 80;

      // Check if price fits and prompt relevance
      if (resource.price <= maxItemPrice && task.allowedCategories.includes(resource.category)) {
        if (resource.id === 'res-startups-dataset' || resource.id === 'res-market-trends-api') {
          isRecommended = true;
          suitability = 96;
        } else if (resource.price <= 3.0) {
          isRecommended = resource.price + 4.0 <= taskBudget;
        }
      }

      return {
        id: `rec-${task.id}-${resource.id}`,
        taskId: task.id,
        resourceId: resource.id,
        resource,
        suitabilityScore: suitability,
        qualityScore: resource.qualityScore,
        freshness: resource.freshness,
        whyRecommended: resource.whyUseful || `Provides essential ${resource.category.toLowerCase()} data for "${task.title}".`,
        expectedContribution: `Contributes high-fidelity ${resource.category.toLowerCase()} metrics to the final automated intelligence report.`,
        benefits: resource.benefits,
        limitations: resource.limitations,
        price: resource.price,
        isSelected: isRecommended,
      };
    });
  }

  // --- SPENDGUARD VALIDATION ---
  public validateSpendGuard(params: {
    taskId: string;
    resourceIds: string[];
  }): SpendGuardValidation {
    const task = this.getTask(params.taskId);
    const selectedResources = this.resources.filter((r) =>
      params.resourceIds.includes(r.id)
    );

    const totalBudget = task ? task.budget : this.settings.defaultBudget;
    const maxPurchaseLimit = task ? task.maxIndividualPurchase : this.settings.maxIndividualPurchase;
    const dailyCap = task && task.dailyCap ? task.dailyCap : this.settings.dailySpendingCap;

    const requestedAmount = selectedResources.reduce((acc, curr) => acc + curr.price, 0);
    const currentCommitted = task ? task.spentAmount : 0;
    const remainingBudget = totalBudget - currentCommitted - requestedAmount;

    const withinBudget = requestedAmount + currentCommitted <= totalBudget;
    const withinItemLimit = selectedResources.every((r) => r.price <= maxPurchaseLimit);
    const allowedCategories = selectedResources.every((r) =>
      !task ? true : task.allowedCategories.includes(r.category)
    );
    const noBlockedProviders = selectedResources.every((r) =>
      !task ? true : !task.blockedProviders.includes(r.provider)
    );

    const policies = [
      {
        id: 'pol-total-budget',
        name: 'Within Total Budget Allocation',
        description: 'Verify requested purchase total does not exceed allocated task budget.',
        status: withinBudget ? ('passed' as const) : ('blocked' as const),
        rule: `Requested $${requestedAmount.toFixed(2)} <= Remaining $${(totalBudget - currentCommitted).toFixed(2)}`,
        details: withinBudget
          ? `Sufficient balance: Leaves $${Math.max(0, remainingBudget).toFixed(2)} buffer.`
          : `Exceeds budget by $${Math.abs(remainingBudget).toFixed(2)}.`,
        checkedAt: new Date().toISOString(),
      },
      {
        id: 'pol-max-single',
        name: 'Individual Purchase Cap',
        description: 'Enforce ceiling on single-item procurement expenditure.',
        status: withinItemLimit ? ('passed' as const) : ('blocked' as const),
        rule: `Max Item Price <= $${maxPurchaseLimit.toFixed(2)}`,
        details: withinItemLimit
          ? `All ${selectedResources.length} resources are under $${maxPurchaseLimit.toFixed(2)} limit.`
          : `One or more items exceed the maximum $${maxPurchaseLimit.toFixed(2)} single purchase cap.`,
        checkedAt: new Date().toISOString(),
      },
      {
        id: 'pol-categories',
        name: 'Allowed Resource Categories',
        description: 'Restricts procurement to sanctioned digital asset types.',
        status: allowedCategories ? ('passed' as const) : ('blocked' as const),
        rule: 'Must belong to whitelisted categories',
        details: allowedCategories
          ? 'All candidate assets belong to permitted categories.'
          : 'Blocked category detected in requested items.',
        checkedAt: new Date().toISOString(),
      },
      {
        id: 'pol-provider',
        name: 'Provider Security & Blacklist Check',
        description: 'Prevents procurement from unverified or blacklisted data vendors.',
        status: noBlockedProviders ? ('passed' as const) : ('blocked' as const),
        rule: 'Provider not on security blacklist',
        details: noBlockedProviders
          ? 'All vendor credentials authenticated against trusted registry.'
          : 'Vendor flagged on security blacklist.',
        checkedAt: new Date().toISOString(),
      },
      {
        id: 'pol-approval',
        name: 'Human Approval Enforcement',
        description: 'Requires explicit human sign-off before financial commitment.',
        status: 'requires_approval' as const,
        rule: 'Mandatory human approval enabled',
        details: 'Payment will remain locked until designated human signs off in Approval Center.',
        checkedAt: new Date().toISOString(),
      },
      {
        id: 'pol-duplicate',
        name: 'Duplicate Purchase Prevention',
        description: 'Ensures identical licenses or datasets have not already been purchased for this task.',
        status: 'passed' as const,
        rule: 'Zero active duplicate licenses',
        details: 'No existing licenses detected for the selected assets.',
        checkedAt: new Date().toISOString(),
      },
    ];

    const isValid = withinBudget && withinItemLimit && allowedCategories && noBlockedProviders;

    return {
      isValid,
      totalBudget,
      currentCommitted,
      requestedAmount,
      remainingBudget: Math.max(0, remainingBudget),
      maxPurchaseLimit,
      dailyCap,
      policies,
      auditSummary: isValid
        ? `SpendGuard verified all ${policies.length} safety checks. Ready for human authorization.`
        : `SpendGuard blocked authorization: Exceeds policy thresholds.`,
      blockReason: !isValid ? 'Policy limits exceeded. Adjust selected resources or task budget.' : undefined,
    };
  }

  // --- PURCHASES ---
  public getPurchases(): Purchase[] {
    return [...this.purchases];
  }

  public getPurchase(id: string): Purchase | undefined {
    return this.purchases.find((p) => p.id === id);
  }

  public createPurchasesForTask(taskId: string, resourceIds: string[]): Purchase[] {
    const task = this.getTask(taskId);
    if (!task) return [];

    const newPurchases: Purchase[] = [];
    let currentRemaining = task.budget - task.spentAmount;

    for (const resId of resourceIds) {
      const resource = this.getResource(resId);
      if (!resource) continue;

      currentRemaining -= resource.price;

      const purchase: Purchase = {
        id: `pur-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        taskId: task.id,
        taskTitle: task.title,
        resourceId: resource.id,
        resourceName: resource.name,
        provider: resource.provider,
        amount: resource.price,
        currency: resource.currency,
        status: 'pending_approval',
        recommendationReason: resource.whyUseful || `Essential asset recommended by AI agent for task execution.`,
        remainingBudgetAfter: Math.max(0, currentRemaining),
        spendGuardStatus: resource.price <= task.maxIndividualPurchase ? 'passed' : 'requires_approval',
      };

      newPurchases.push(purchase);
    }

    this.purchases = [...newPurchases, ...this.purchases];
    save(STORAGE_KEYS.PURCHASES, this.purchases);

    this.updateTask(taskId, {
      status: 'approving',
      resourcesRecommended: newPurchases.length,
    });

    this.addTimelineItem({
      id: `time-${Date.now()}`,
      taskId,
      stage: 'spendguard_validation',
      title: 'SpendGuard Cleared Purchases',
      description: `${newPurchases.length} purchase requests routed to Human Approval Center.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'completed',
      badge: 'Needs Approval'
    });

    return newPurchases;
  }

  public approvePurchase(id: string, note?: string): Purchase | undefined {
    const purchase = this.getPurchase(id);
    if (!purchase) return undefined;

    const updated: Purchase = {
      ...purchase,
      status: 'approved',
      approvedAt: new Date().toISOString(),
    };

    const idx = this.purchases.findIndex((p) => p.id === id);
    this.purchases[idx] = updated;
    save(STORAGE_KEYS.PURCHASES, this.purchases);

    this.addTimelineItem({
      id: `time-${Date.now()}`,
      taskId: purchase.taskId,
      stage: 'human_approval',
      title: 'Purchase Approved by User',
      description: `Human sign-off granted for "${purchase.resourceName}" ($${purchase.amount.toFixed(2)}). Ready for PayPal checkout.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'completed',
      badge: 'Approved'
    });

    return updated;
  }

  public rejectPurchase(id: string, reason: string): Purchase | undefined {
    const purchase = this.getPurchase(id);
    if (!purchase) return undefined;

    const updated: Purchase = {
      ...purchase,
      status: 'rejected',
      rejectReason: reason || 'Declined by human reviewer',
      rejectedAt: new Date().toISOString(),
    };

    const idx = this.purchases.findIndex((p) => p.id === id);
    this.purchases[idx] = updated;
    save(STORAGE_KEYS.PURCHASES, this.purchases);

    return updated;
  }

  // --- PAYPAL ORDER & CAPTURE ---
  public createPayPalOrder(purchaseId: string): { orderId: string; amount: number; currency: string } {
    const purchase = this.getPurchase(purchaseId);
    if (!purchase) throw new Error('Purchase not found');

    const orderId = `PAYPAL-ORD-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;

    return {
      orderId,
      amount: purchase.amount,
      currency: purchase.currency,
    };
  }

  public capturePayPalOrder(orderId: string, purchaseId: string): {
    success: boolean;
    captureId: string;
    purchase: Purchase;
  } {
    const purchase = this.getPurchase(purchaseId);
    if (!purchase) throw new Error('Purchase not found');

    const captureId = `PAYPAL-CAP-${Date.now()}`;
    const receiptId = `rcpt-${purchase.taskId.replace('task-', '')}-${Date.now().toString().slice(-4)}`;

    const updatedPurchase: Purchase = {
      ...purchase,
      status: 'activated',
      paypalOrderId: orderId,
      paypalCaptureId: captureId,
      receiptId,
      activatedAt: new Date().toISOString(),
      activationDetails: {
        accessUrl: `https://vault.agentspend.io/assets/${purchase.resourceId}`,
        apiKey: `ak_live_${Math.random().toString(36).substring(2, 12)}_${purchase.resourceId}`,
        downloadFormat: 'Encrypted Streaming Ingestion',
        instructions: 'Asset activated. AI Procurement Agent securely unlocked credentials.',
      },
    };

    const pIdx = this.purchases.findIndex((p) => p.id === purchaseId);
    this.purchases[pIdx] = updatedPurchase;
    save(STORAGE_KEYS.PURCHASES, this.purchases);

    // Record Transaction
    const transaction: Transaction = {
      id: `txn-${Date.now()}`,
      purchaseId: updatedPurchase.id,
      taskId: updatedPurchase.taskId,
      taskName: updatedPurchase.taskTitle,
      resourceName: updatedPurchase.resourceName,
      provider: updatedPurchase.provider,
      amount: updatedPurchase.amount,
      currency: updatedPurchase.currency,
      date: new Date().toISOString(),
      paypalRef: captureId,
      status: 'completed',
      activationStatus: 'activated',
    };
    this.transactions = [transaction, ...this.transactions];
    save(STORAGE_KEYS.TRANSACTIONS, this.transactions);

    // Update Task Spent Amount
    const task = this.getTask(purchase.taskId);
    if (task) {
      const newSpent = (task.spentAmount || 0) + purchase.amount;
      this.updateTask(task.id, {
        spentAmount: newSpent,
        status: 'executing',
      });
    }

    // Timeline entries
    this.addTimelineItem({
      id: `time-${Date.now()}-pay`,
      taskId: purchase.taskId,
      stage: 'payment_completed',
      title: 'PayPal Payment Settled',
      description: `Captured $${purchase.amount.toFixed(2)} USD via PayPal (${captureId}).`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'completed',
      badge: 'PayPal Paid'
    });

    this.addTimelineItem({
      id: `time-${Date.now()}-act`,
      taskId: purchase.taskId,
      stage: 'resource_activated',
      title: 'Digital Asset Activated',
      description: `Cryptographic access credentials injected into Agent pipeline for "${purchase.resourceName}".`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'completed',
      badge: 'Resource Live'
    });

    return {
      success: true,
      captureId,
      purchase: updatedPurchase,
    };
  }

  // --- DECISION RECEIPT ---
  public getReceipt(receiptId: string): DecisionReceipt | undefined {
    return this.receipts[receiptId];
  }

  public generateReceiptForTask(taskId: string): DecisionReceipt {
    const task = this.getTask(taskId);
    const taskPurchases = this.purchases.filter((p) => p.taskId === taskId && p.status === 'activated');
    const rejectedPurchases = this.purchases.filter((p) => p.taskId === taskId && p.status === 'rejected');

    const receiptId = `rcpt-${taskId.replace('task-', '')}-${Date.now().toString().slice(-4)}`;

    const receipt: DecisionReceipt = {
      receiptId,
      taskId: task ? task.id : taskId,
      taskTitle: task ? task.title : 'AI Procurement Task',
      taskDescription: task ? task.prompt : '',
      budget: task ? task.budget : 10.0,
      spentAmount: task ? task.spentAmount : 7.0,
      currency: 'USD',
      createdAt: task ? task.createdAt : new Date().toISOString(),
      completedAt: new Date().toISOString(),
      evaluatedCount: this.resources.length,
      selectedCount: taskPurchases.length,
      rejectedCount: rejectedPurchases.length,
      evaluatedResources: this.resources.map((r) => {
        const wasPurchased = taskPurchases.some((p) => p.resourceId === r.id);
        return {
          name: r.name,
          provider: r.provider,
          price: r.price,
          quality: r.qualityScore,
          selected: wasPurchased,
          reason: wasPurchased
            ? 'Optimal capability match and verified quality metrics within budget limit.'
            : 'Deprioritized in favor of higher ROI asset or outside budget ceiling.',
        };
      }),
      spendGuardResults: [
        {
          rule: 'Total Task Budget Constraint',
          status: 'passed',
          detail: `Committed total $${(task?.spentAmount || 7.0).toFixed(2)} within budget limit of $${(task?.budget || 10.0).toFixed(2)}.`,
        },
        {
          rule: 'Individual Purchase Cap',
          status: 'passed',
          detail: `All unlocked assets verified under $${(task?.maxIndividualPurchase || 4.5).toFixed(2)} ceiling.`,
        },
        {
          rule: 'Allowed Resource Categories',
          status: 'passed',
          detail: 'All assets matched whitelisted categories.',
        },
        {
          rule: 'Provider Security Audit',
          status: 'passed',
          detail: 'Zero blacklisted entities encountered.',
        },
        {
          rule: 'Mandatory Human Approval Verification',
          status: 'passed',
          detail: `${taskPurchases.length} explicit approvals verified with user signature.`,
        },
      ],
      humanApprovals: taskPurchases.map((p) => ({
        resourceName: p.resourceName,
        status: 'approved',
        timestamp: p.approvedAt || new Date().toISOString(),
        note: `Authorized by user: $${p.amount.toFixed(2)} settled via PayPal.`,
      })),
      paymentRecord: {
        paypalOrderId: taskPurchases[0]?.paypalOrderId || 'PAYPAL-ORD-VERIFIED',
        paypalCaptureId: taskPurchases[0]?.paypalCaptureId || 'PAYPAL-CAP-VERIFIED',
        amount: task?.spentAmount || 7.0,
        currency: 'USD',
        status: 'COMPLETED',
        verificationHash: `sha256:${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}${Date.now()}`,
        paidAt: new Date().toISOString(),
      },
      resourceActivations: taskPurchases.map((p) => ({
        resourceName: p.resourceName,
        activatedAt: p.activatedAt || new Date().toISOString(),
        status: 'ACTIVE_MOUNTED',
        accessMethod: 'Encrypted Stream Ingestion',
      })),
      taskOutcome: {
        status: 'SUCCESS_COMPLETED',
        keyFindingsCount: task?.report?.keyFindings.length || 3,
        reportSummary: task?.report?.executiveSummary || 'Procurement pipeline completed and validated.',
        verifiedByAgent: true,
      },
    };

    this.receipts[receiptId] = receipt;
    save(STORAGE_KEYS.RECEIPTS, this.receipts);

    if (task) {
      this.updateTask(task.id, {
        status: 'completed',
        completionDate: new Date().toISOString(),
        report: task.report
          ? { ...task.report, decisionReceiptId: receiptId }
          : {
              objective: task.prompt,
              completedAt: new Date().toISOString(),
              resourcesUsed: taskPurchases.map((p) => ({
                name: p.resourceName,
                provider: p.provider,
                price: p.amount,
                category: 'Digital Resource',
              })),
              executiveSummary: `AgentSpend acquired ${taskPurchases.length} digital resources and completed research execution for: "${task.title}". All telemetry verified and recorded in Decision Receipt.`,
              keyFindings: [
                {
                  title: 'Verified Resource Ingestion',
                  detail: `${taskPurchases.length} datasets and APIs successfully provisioned and digested.`,
                  metric: '100% Validated',
                  badge: 'Verified'
                },
                {
                  title: 'Budget Discipline',
                  detail: `Completed under allocated budget with $${Math.max(0, task.budget - (task.spentAmount || 0)).toFixed(2)} remaining surplus.`,
                  metric: `$${task.spentAmount.toFixed(2)} / $${task.budget.toFixed(2)}`,
                  badge: 'On Budget'
                }
              ],
              analysisSections: [
                {
                  title: 'Procurement Summary & Efficiency',
                  content: 'All candidate assets were vetted against SpendGuard financial security rules before presenting to human reviewer. PayPal sandbox settlement completed without exceptions.'
                }
              ],
              recommendations: [
                'Retain Decision Receipt for organization tax and audit filings.',
                'Export synthesized data to your central analytics lake.'
              ],
              conclusion: 'Task successfully completed under strict human-in-the-loop authorization.',
              decisionReceiptId: receiptId,
            },
      });

      this.addTimelineItem({
        id: `time-${Date.now()}-done`,
        taskId: task.id,
        stage: 'task_completed',
        title: 'Task Finished & Receipt Sealed',
        description: `Delivered final intelligence report. Sealed Decision Receipt #${receiptId}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'completed',
        badge: 'Delivered'
      });
    }

    return receipt;
  }

  // --- TRANSACTIONS ---
  public getTransactions(): Transaction[] {
    return [...this.transactions];
  }

  // --- SETTINGS ---
  public getSettings(): SpendingPolicySettings {
    return { ...this.settings };
  }

  public updateSettings(updates: Partial<SpendingPolicySettings>): SpendingPolicySettings {
    this.settings = { ...this.settings, ...updates };
    save(STORAGE_KEYS.SETTINGS, this.settings);
    return this.settings;
  }

  // --- TIMELINE ---
  public getTimeline(): ActivityTimelineItem[] {
    return [...this.timeline];
  }

  public addTimelineItem(item: ActivityTimelineItem): void {
    this.timeline = [item, ...this.timeline].slice(0, 30);
    save(STORAGE_KEYS.TIMELINE, this.timeline);
  }

  // --- DASHBOARD SUMMARY ---
  public getDashboardSummary() {
    const totalTasks = this.tasks.length;
    const totalSpent = this.tasks.reduce((sum, t) => sum + (t.spentAmount || 0), 0);
    const availableBudget = Math.max(0, this.settings.dailySpendingCap - totalSpent);
    const pendingApprovalsCount = this.purchases.filter((p) => p.status === 'pending_approval').length;

    return {
      totalTasks,
      totalSpent,
      availableBudget,
      pendingApprovalsCount,
      monthlyBudget: this.settings.dailySpendingCap * 30,
      budgetTrend: '+12% vs last week',
      spentTrend: 'Optimized via SpendGuard',
      tasksTrend: `${this.tasks.filter((t) => t.status === 'completed').length} completed`,
    };
  }
}

export const mockStorage = MockStorageEngine.getInstance();
