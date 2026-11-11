/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { TasksPage } from './pages/TasksPage';
import { CreateTaskPage } from './pages/CreateTaskPage';
import { ResearchWorkspacePage } from './pages/ResearchWorkspacePage';
import { ResourcesPage } from './pages/ResourcesPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { SpendGuardPage } from './pages/SpendGuardPage';
import { ApprovalCenterPage } from './pages/ApprovalCenterPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ActivationPage } from './pages/ActivationPage';
import { TaskResultsPage } from './pages/TaskResultsPage';
import { DecisionReceiptPage } from './pages/DecisionReceiptPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Persistent Authenticated Dashboard Workspace */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/tasks/new" element={<CreateTaskPage />} />
            <Route path="/research" element={<ResearchWorkspacePage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
            <Route path="/spendguard" element={<SpendGuardPage />} />
            <Route path="/approvals" element={<ApprovalCenterPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/activation" element={<ActivationPage />} />
            <Route path="/results" element={<TaskResultsPage />} />
            <Route path="/receipts" element={<DecisionReceiptPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Catch-all redirect to Dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
