import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import AuthWrapper from './components/auth/AuthWrapper';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './views/Dashboard';
import SubjectView from './views/SubjectView';
import NoteEditor from './views/NoteEditor';
import Schedule from './views/Schedule';
import Login from './pages/login';
import Register from './pages/register';

function AppContent() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthWrapper requireAuth={false}>
              <Login />
            </AuthWrapper>
          }
        />
        <Route
          path="/register"
          element={
            <AuthWrapper requireAuth={false}>
              <Register />
            </AuthWrapper>
          }
        />
        <Route
          path="/"
          element={
            <AuthWrapper requireAuth={true}>
              <div className="flex h-screen overflow-hidden bg-background">
                <Sidebar />
                <div className="flex-1 flex flex-col md:ml-72 relative overflow-hidden">
                  <TopBar />
                  <main className="flex-1 overflow-y-auto hide-scrollbar">
                    <Dashboard />
                  </main>
                </div>
              </div>
            </AuthWrapper>
          }
        />
        <Route
          path="/subject/:id"
          element={
            <AuthWrapper requireAuth={true}>
              <div className="flex h-screen overflow-hidden bg-background">
                <Sidebar />
                <div className="flex-1 flex flex-col md:ml-72 relative overflow-hidden">
                  <TopBar />
                  <main className="flex-1 overflow-y-auto hide-scrollbar">
                    <SubjectView />
                  </main>
                </div>
              </div>
            </AuthWrapper>
          }
        />
        <Route
          path="/editor"
          element={
            <AuthWrapper requireAuth={true}>
              <div className="flex h-screen overflow-hidden bg-background">
                <Sidebar />
                <div className="flex-1 flex flex-col md:ml-72 relative overflow-hidden">
                  <TopBar />
                  <main className="flex-1 overflow-y-auto hide-scrollbar">
                    <NoteEditor />
                  </main>
                </div>
              </div>
            </AuthWrapper>
          }
        />
        <Route
          path="/schedule"
          element={
            <AuthWrapper requireAuth={true}>
              <div className="flex h-screen overflow-hidden bg-background">
                <Sidebar />
                <div className="flex-1 flex flex-col md:ml-72 relative overflow-hidden">
                  <TopBar />
                  <main className="flex-1 overflow-y-auto hide-scrollbar">
                    <Schedule />
                  </main>
                </div>
              </div>
            </AuthWrapper>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default function App() {
  // Check if Supabase is configured
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('placeholder');

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="bg-surface rounded-2xl shadow-lg p-8 editorial-shadow max-w-md text-center">
          <h1 className="text-2xl font-headline font-bold text-on-surface mb-4">
            ⚠️ Configuração Necessária
          </h1>
          <p className="text-secondary mb-6">
            Para usar o sistema de autenticação, configure as variáveis do Supabase no arquivo <code className="bg-surface-low px-2 py-1 rounded">.env.local</code>
          </p>
          <div className="text-left bg-surface-low p-4 rounded-lg mb-6 font-mono text-sm">
            <div>VITE_SUPABASE_URL=https://seu-projeto.supabase.co</div>
            <div>VITE_SUPABASE_ANON_KEY=sua-chave-anonima</div>
          </div>
          <p className="text-secondary text-sm">
            Após configurar, recarregue a página.
          </p>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
