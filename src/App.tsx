import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

// Dashboard Pages
import { Overview } from './pages/dashboard/Overview.tsx';
import { Settings } from './pages/dashboard/Settings.tsx';

// Public Pages
import { Demo } from './pages/public/Demo';
import { DemoLanding } from './pages/public/DemoLanding';
import { DemoTest } from './pages/public/DemoTest';
import { Signup } from './pages/public/Signup';
import { ForgotPassword } from './pages/public/ForgotPassword';
import { Home } from './pages/public/Home';
import { Features } from './pages/public/Features';
import { Pricing } from './pages/public/Pricing';
import { About } from './pages/public/About';
import { Contact } from './pages/public/Contact';
import { Login } from './pages/public/Login';
import { PublicLayout } from './components/layout/PublicLayout';
import { Terms } from './pages/public/Terms';
import { Privacy } from './pages/public/Privacy';

// Admin Portal Pages
import { GlobalOverview } from './pages/admin/GlobalOverview';
import { CSVImport } from './pages/admin/CSVImport';
import Organizations from './pages/admin/Organizations';
import { Collections } from './pages/admin/Collections';

// Organization Admin Portal
import { OrgAdminDashboard } from './pages/organization/OrgAdminDashboard';
import { Reports } from './pages/organization/Reports';
import { TransportModule } from './pages/organization/modules/TransportModule';
import { HostelModule } from './pages/organization/modules/HostelModule';
import { InventoryModule } from './pages/organization/modules/InventoryModule';
import { AuditorModule } from './pages/organization/modules/AuditorModule';
import { Branches } from './pages/organization/Branches';

// Collector Portal Pages
import FieldCollection from './pages/collector/FieldCollection';
import { DepositWithdrawal } from './pages/collector/DepositWithdrawal';
import CollectorDashboard from './pages/collector/CollectorDashboard';
import CollectorHome from './pages/collector/CollectorHome';
import AddClient from './pages/collector/AddClient';
import CollectionRoutes from './pages/collector/CollectionRoutes';
import CollectionHistory from './pages/collector/CollectionHistory';
import ClientManagement from './pages/collector/ClientManagement';
import CollectorReports from './pages/collector/CollectorReports';
import CollectorProfile from './pages/collector/CollectorProfile';

// Client Portal Pages
import { ClientPortal } from './pages/client/ClientPortal';
import { ReceiptVerification } from './pages/client/ReceiptVerification';

// Manager Portal Pages
import { SupervisorPortal } from './pages/manager/SupervisorPortal';
import { Agents } from './pages/manager/Agents';
import { Collectors } from './pages/manager/Collectors';
import LiveMonitoring from './pages/manager/LiveMonitoring';



// Layout for the Protected App (Dashboard)
function DashboardLayout() {
  return (
    <div className="flex h-screen w-full bg-brand-light font-sans text-brand-dark">
      <Sidebar className="hidden lg:flex shrink-0 z-20" />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth bg-brand-light">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Marketing Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/demo-landing" element={<DemoLanding />} />
            <Route path="/demo-test" element={<DemoTest />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>


          {/* System Admin Portal */}
          <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<ProtectedRoute requiredRole="admin"><GlobalOverview /></ProtectedRoute>} />
            <Route path="csv-import" element={<ProtectedRoute requiredRole="admin"><CSVImport /></ProtectedRoute>} />
            <Route path="organizations" element={<ProtectedRoute requiredRole="admin"><Organizations /></ProtectedRoute>} />
            <Route path="collections" element={<ProtectedRoute requiredRole="admin"><Collections /></ProtectedRoute>} />
          </Route>

          {/* Organization Admin Portal */}
          <Route path="/organization" element={<ProtectedRoute requiredRole="organization"><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<ProtectedRoute requiredRole="organization"><OrgAdminDashboard /></ProtectedRoute>} />
            <Route path="branches" element={<ProtectedRoute requiredRole="organization"><Branches /></ProtectedRoute>} />
            <Route path="reports" element={<ProtectedRoute requiredRole="organization"><Reports /></ProtectedRoute>} />
            <Route path="transport" element={<ProtectedRoute requiredRole="organization"><TransportModule /></ProtectedRoute>} />
            <Route path="hostel" element={<ProtectedRoute requiredRole="organization"><HostelModule /></ProtectedRoute>} />
            <Route path="inventory" element={<ProtectedRoute requiredRole="organization"><InventoryModule /></ProtectedRoute>} />
            <Route path="auditor" element={<ProtectedRoute requiredRole="organization"><AuditorModule /></ProtectedRoute>} />
          </Route>

          {/* Collector Portal */}
          <Route path="/collector" element={<ProtectedRoute requiredRole="collector"><CollectorDashboard /></ProtectedRoute>}>
            <Route index element={<CollectorHome />} />
            <Route path="add-client" element={<AddClient />} />
            <Route path="collect" element={<FieldCollection />} />
            <Route path="routes" element={<CollectionRoutes />} />
            <Route path="history" element={<CollectionHistory />} />
            <Route path="clients" element={<ClientManagement />} />
            <Route path="reports" element={<CollectorReports />} />
            <Route path="profile" element={<CollectorProfile />} />
          </Route>
          <Route path="/collector/deposits" element={<ProtectedRoute requiredRole="collector"><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<ProtectedRoute requiredRole="collector"><DepositWithdrawal /></ProtectedRoute>} />
          </Route>

          {/* Protected Organization Dashboard Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<Overview />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Client Portal */}
          <Route path="/client" element={<ProtectedRoute requiredRole="client"><ClientPortal /></ProtectedRoute>} />
          <Route path="/client/verify" element={<ProtectedRoute requiredRole="client"><ReceiptVerification /></ProtectedRoute>} />

          {/* Manager Portal */}
          <Route path="/manager" element={<ProtectedRoute requiredRole="manager"><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<ProtectedRoute requiredRole="manager"><SupervisorPortal /></ProtectedRoute>} />
            <Route path="agents" element={<ProtectedRoute requiredRole="manager"><Agents /></ProtectedRoute>} />
            <Route path="collectors" element={<ProtectedRoute requiredRole="manager"><Collectors /></ProtectedRoute>} />
            <Route path="monitoring" element={<ProtectedRoute requiredRole="manager"><LiveMonitoring /></ProtectedRoute>} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
