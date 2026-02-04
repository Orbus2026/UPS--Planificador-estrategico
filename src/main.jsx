
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './context/DataProvider';
import { ProspectivaProvider } from './context/ProspectivaProvider';
import { AuthProvider } from './context/AuthContext';
import './index.css';
import LoadingSpinner from './components/LoadingSpinner';

const Layout = lazy(() => import('./components/Layout'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const Analysis = lazy(() => import('./components/Analysis'));
const Initiatives = lazy(() => import('./components/Initiatives'));
const Gamification = lazy(() => import('./components/Gamification'));
const Reports = lazy(() => import('./components/Reports'));
const Team = lazy(() => import('./components/Team'));
const StrategicMap = lazy(() => import('./components/StrategicMap'));
const UserManagement = lazy(() => import('./components/admin/UserManagement'));

const Login = lazy(() => import('./components/auth/Login'));
const Register = lazy(() => import('./components/auth/Register'));
const ProtectedRoute = lazy(() => import('./components/auth/ProtectedRoute'));

const ProspectivaLayout = lazy(() => import('./components/prospectiva/ProspectivaLayout'));
const ProspectivaDashboard = lazy(() => import('./components/prospectiva/ProspectivaDashboard'));
const Signals = lazy(() => import('./components/prospectiva/Signals'));
const Scenarios = lazy(() => import('./components/prospectiva/Scenarios'));
const WindTunneling = lazy(() => import('./components/prospectiva/WindTunneling'));
const Backcasting = lazy(() => import('./components/prospectiva/Backcasting'));
const EarlyWarning = lazy(() => import('./components/prospectiva/EarlyWarning'));
const Recommendations = lazy(() => import('./components/prospectiva/Recommendations'));
const Decisions = lazy(() => import('./components/prospectiva/Decisions'));

// Advanced Strategy Modules
const AdvancedAnalytics = lazy(() => import('./components/analytics/AdvancedAnalytics'));
const StrategicTools = lazy(() => import('./components/strategic-tools/StrategicTools'));
const PlanningExecution = lazy(() => import('./components/planning/PlanningExecution'));
const IntelligenceAutomation = lazy(() => import('./components/intelligence/Intelligence'));
const TrackingEvaluation = lazy(() => import('./components/evaluation/Evaluation'));
const AdvancedVisualization = lazy(() => import('./components/visualization/AdvancedViz'));
const ChangeManagement = lazy(() => import('./components/change/ChangeManagement'));

const Placeholder = lazy(() => import('./components/Placeholder'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <DataProvider>
        <ProspectivaProvider>
          <HashRouter>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route path="/" element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Dashboard />} />
                  <Route path="initiatives" element={<Initiatives />} />
                  <Route path="analysis" element={<Analysis />} />
                  <Route path="map" element={<StrategicMap />} />
                  <Route path="prospectiva" element={<ProspectivaLayout />}>
                    <Route index element={<ProspectivaDashboard />} />
                    <Route path="signals" element={<Signals />} />
                    <Route path="scenarios" element={<Scenarios />} />
                    <Route path="wind-tunneling" element={<WindTunneling />} />
                    <Route path="backcasting" element={<Backcasting />} />
                    <Route path="ewi" element={<EarlyWarning />} />
                    <Route path="recommendations" element={<Recommendations />} />
                    <Route path="decisions" element={<Decisions />} />
                  </Route>
                  <Route path="team" element={<Team />} />
                  <Route path="gamification" element={<Gamification />} />
                  <Route path="reports" element={<Reports />} />
                  
                  {/* Advanced Strategy Modules - Director Only */}
                  <Route path="advanced-analytics" element={
                    <ProtectedRoute requiredRole="DIRECTOR">
                      <AdvancedAnalytics />
                    </ProtectedRoute>
                  } />
                  <Route path="strategic-tools" element={
                    <ProtectedRoute requiredRole="DIRECTOR">
                      <StrategicTools />
                    </ProtectedRoute>
                  } />
                  <Route path="planning-execution" element={
                    <ProtectedRoute requiredRole="DIRECTOR">
                      <PlanningExecution />
                    </ProtectedRoute>
                  } />
                  <Route path="intelligence-automation" element={
                    <ProtectedRoute requiredRole="DIRECTOR">
                      <IntelligenceAutomation />
                    </ProtectedRoute>
                  } />
                  <Route path="tracking-evaluation" element={
                    <ProtectedRoute requiredRole="DIRECTOR">
                      <TrackingEvaluation />
                    </ProtectedRoute>
                  } />
                  <Route path="advanced-visualization" element={
                    <ProtectedRoute requiredRole="DIRECTOR">
                      <AdvancedVisualization />
                    </ProtectedRoute>
                  } />
                  <Route path="change-management" element={
                    <ProtectedRoute requiredRole="DIRECTOR">
                      <ChangeManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="admin" element={
                    <ProtectedRoute requiredRole="DIRECTOR">
                      <UserManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="*" element={<Navigate to="/" />} />
                </Route>
              </Routes>
            </Suspense>
          </HashRouter>
        </ProspectivaProvider>
      </DataProvider>
    </AuthProvider>
  </React.StrictMode>,
);
