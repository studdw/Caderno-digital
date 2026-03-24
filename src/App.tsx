import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './views/Dashboard';
import SubjectView from './views/SubjectView';
import NoteEditor from './views/NoteEditor';
import Schedule from './views/Schedule';

export default function App() {
  return (
    <Router>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col md:ml-72 relative overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-y-auto hide-scrollbar">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/subject/:id" element={<SubjectView />} />
              <Route path="/editor" element={<NoteEditor />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/resources" element={<div className="p-12 text-center text-secondary">Resources View (Coming Soon)</div>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
