# AgentSpend — Autonomous AI Procurement Agent

**Research. Recommend. Request Approval. Pay. Deliver.**

AgentSpend is an AI-powered autonomous procurement agent that discovers, evaluates, and optimizes digital resource purchases within user-defined budgets. Featuring SpendGuard™ financial policy enforcement, mandatory human authorization, PayPal Sandbox integration, automated resource activation, and transparent Decision Receipts™, AgentSpend makes AI-driven procurement secure, accountable, and transparent.

## Overview

AI agents can perform complex tasks, but purchasing the external resources required to complete those tasks introduces financial risks, unpredictable spending, and limited accountability.

AgentSpend solves this problem through an intelligent, human-controlled procurement workflow.

Users submit a task and define a budget. The AI identifies the required resources, evaluates their quality and pricing, and recommends an optimized procurement plan. SpendGuard validates every purchase against financial policies, while mandatory human approval ensures users remain in control of all payments.

After successful PayPal payment verification, purchased resources are activated and used to complete the original task. A Decision Receipt records the procurement journey.

## Key Features

- **AI-Powered Research:** Understands natural-language tasks and identifies required datasets, APIs, reports, and technical resources.
- **Intelligent Recommendations:** Evaluates suitability, quality, freshness, pricing, and resource usefulness.
- **Budget Optimization:** Recommends resource combinations within user-defined spending limits.
- **SpendGuard™:** Enforces budget ceilings, individual purchase limits, category restrictions, provider blacklists, and duplicate purchase protection.
- **Human-in-the-Loop Approval:** Requires explicit user authorization before every purchase.
- **PayPal Integration:** Supports PayPal Sandbox order creation, checkout, capture, and backend payment verification.
- **Resource Activation Vault:** Unlocks purchased digital resources after verified payment.
- **AI Task Execution:** Uses activated resources to generate reports, findings, and recommendations.
- **Decision Receipt™:** Records AI decisions, policy checks, human approvals, payment references, resource activation, and task outcomes.
- **Dashboard & Analytics:** Provides spending insights, transaction history, pending approvals, and procurement activity.

## Procurement Lifecycle

```text
       USER SUBMITS TASK
               |
               v
         1. RESEARCH
       AI understands task
               |
               v
        2. RECOMMEND
     Resource evaluation
     Budget optimization
               |
               v
        3. SPENDGUARD
     Financial policy checks
               |
               v
       4. APPROVE & PAY
      Human authorization
       PayPal checkout
               |
               v
      5. DELIVER & RECEIPT
       Payment verification
       Resource activation
       AI task execution
       Decision Receipt
```

## Application Modules

| Module | Route | Description |
|---|---|---|
| Landing Page | `/` | Product introduction and workflow |
| Dashboard | `/dashboard` | Procurement and spending overview |
| Task Initiation | `/tasks/new` | Submit tasks and configure budgets |
| Research Workspace | `/research` | AI research workflow |
| Resource Marketplace | `/resources` | Discover digital resources |
| AI Recommendations | `/recommendations` | Optimized procurement plans |
| SpendGuard | `/spendguard` | Financial policy validation |
| Approval Center | `/approvals` | Human purchase authorization |
| PayPal Checkout | `/checkout` | Secure Sandbox payments |
| Activation Vault | `/activation` | Purchased resource access |
| Task Results | `/results` | AI-generated reports |
| Decision Receipts | `/receipts` | Procurement audit records |
| Transactions | `/transactions` | Payment history |
| Analytics | `/analytics` | Spending analysis |
| Settings | `/settings` | Spending policy configuration |

## Example Use Case

**User Task:**

"Research five AI startups and compare their funding, growth, and market opportunities. You can spend up to $10, but ask me before every purchase."

**Example Resource Recommendations:**

| Resource | Price | Decision |
|---|---:|---|
| Startup Funding Dataset | $4.00 | Selected |
| Market Trends API Demo | $3.00 | Selected |
| Premium Research Report Demo | $5.00 | Not selected |

**Procurement Summary:**
- Total Budget: $10.00
- Recommended Spending: $7.00
- Remaining Budget: $3.00
- Human Approval: Required

After approval and successful PayPal Sandbox payment verification, AgentSpend unlocks the demo resources, generates a startup comparison report, and creates a Decision Receipt.

*Note: Example prices and resource contents are illustrative demo data.*

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Charts | Recharts |
| Animations | Canvas Confetti |
| API Communication | Axios |
| Backend | Python, FastAPI |
| AI | Google Gemini API |
| Payments | PayPal Orders API v2, PayPal JavaScript SDK |
| Database | SQLite / PostgreSQL |
| Version Control | Git, GitHub |

## Project Structure

```text
AgentSpend/
├── frontend/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── hooks/
│       ├── context/
│       ├── types/
│       ├── App.tsx
│       └── main.tsx
│
├── backend/
│   └── app/
│       ├── main.py
│       ├── config.py
│       ├── database.py
│       ├── models.py
│       ├── schemas.py
│       ├── ai_agent.py
│       ├── resource_scout.py
│       ├── purchase_intelligence.py
│       ├── budget_optimizer.py
│       ├── spend_guard.py
│       ├── approval_service.py
│       ├── paypal_service.py
│       ├── resource_activation.py
│       ├── task_executor.py
│       └── receipt_service.py
│
├── README.md
├── LICENSE
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js and npm
- Python 3.10+
- Git
- Google Gemini API key
- PayPal Developer account

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/AgentSpend.git
cd AgentSpend
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

### 3. Backend Setup

Open another terminal:

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend: `http://127.0.0.1:8000`

API documentation: `http://127.0.0.1:8000/docs`

### 4. Environment Variables

Create a `.env` file inside the backend directory:

```env
GEMINI_API_KEY=your_gemini_api_key

PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_BASE_URL=https://api-m.sandbox.paypal.com

DATABASE_URL=sqlite:///./agentspend.db
```

Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id
```

Never expose private API keys or PayPal client secrets in frontend code. Do not commit `.env` files to GitHub.

## PayPal Sandbox Configuration

1. Visit [PayPal Developer](https://developer.paypal.com/).
2. Create a developer account.
3. Navigate to Sandbox Accounts.
4. Create Sandbox Business and Personal accounts.
5. Create a Sandbox application.
6. Configure the Client ID and Secret.
7. Use the Sandbox buyer account to test payments.

All payments must be created, captured, and verified by the backend. Resources must remain locked until payment verification succeeds.

## Security

AgentSpend follows a human-controlled financial workflow:

- Mandatory human authorization before payments.
- Backend-enforced spending limits.
- SpendGuard policy validation.
- Server-side PayPal payment verification.
- Duplicate payment protection.
- Resource activation only after verified payment.
- Environment-based secret management.
- Transparent procurement audit records.

## Future Enhancements

- Integration with real external resource marketplaces.
- Live API and dataset provider discovery.
- Organization-level spending policies.
- Role-based approval workflows.
- Multi-currency procurement.
- Advanced fraud detection.
- Cryptographically signed receipts with protected audit storage.
- Enterprise procurement analytics.
- Multi-agent procurement orchestration.

## Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgements

- [PayPal Developer](https://developer.paypal.com/)
- [Google AI Studio](https://aistudio.google.com/)
- [React](https://react.dev/)
- [FastAPI](https://fastapi.tiangolo.com/)

---

**AgentSpend — Bringing intelligence, financial control, and transparency to AI-powered procurement.**

*Research intelligently. Spend responsibly. Deliver confidently.*
