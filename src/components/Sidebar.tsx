import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings, 
  Bell, 
  Plus, 
  Archive, 
  Trash2,
  GraduationCap,
  Wrench,
  Code2,
  Terminal,
  Coffee,
  Database,
  Bot
} from 'lucide-react';
import { SUBJECTS } from '../constants';

const iconMap: Record<string, any> = {
  engineering: Wrench,
  code: Code2,
  terminal: Terminal,
  coffee: Coffee,
  database: Database,
  smart_toy: Bot,
};

export default function Sidebar() {
  return (
    <aside className="h-screen w-72 fixed left-0 top-0 hidden md:flex flex-col bg-surface-low z-40 pt-20">
      <div className="px-8 mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
            <GraduationCap size={24} />
          </div>
          <div>
            <p className="font-headline text-sm font-bold text-on-surface">Student Notebook</p>
            <p className="font-headline text-[10px] font-bold tracking-widest uppercase text-secondary">Academic Year 2024</p>
          </div>
        </div>
      </div>

      <div className="px-6 mb-6">
        <NavLink 
          to="/editor"
          className="w-full bg-primary text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary-hover transition-colors shadow-sm"
        >
          <Plus size={16} />
          <span>New Note</span>
        </NavLink>
      </div>

      <nav className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="mb-4">
          <p className="px-8 mb-2 font-headline text-[10px] font-bold tracking-widest uppercase text-secondary/60">Main Subjects</p>
          <div className="space-y-1">
            {SUBJECTS.map((subject) => {
              const Icon = iconMap[subject.icon] || Terminal;
              return (
                <NavLink
                  key={subject.id}
                  to={`/subject/${subject.id}`}
                  className={({ isActive }) => `
                    flex items-center gap-4 px-8 py-3 transition-all duration-200 ease-in-out group
                    ${isActive 
                      ? 'border-l-[3px] border-primary bg-white text-on-surface font-bold shadow-sm' 
                      : 'text-secondary hover:bg-white/50 hover:text-primary'
                    }
                  `}
                >
                  <Icon size={18} className="group-hover:text-primary transition-colors" />
                  <span className="font-headline text-xs font-bold tracking-widest uppercase">{subject.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="mt-auto py-6 px-2 border-t border-outline">
        <NavLink
          to="/archived"
          className="text-secondary flex items-center gap-4 px-8 py-2 hover:bg-white/50 transition-all duration-200 ease-in-out group"
        >
          <Archive size={16} className="group-hover:text-primary" />
          <span className="font-headline text-xs font-bold tracking-widest uppercase">Archived</span>
        </NavLink>
        <NavLink
          to="/trash"
          className="text-secondary flex items-center gap-4 px-8 py-2 hover:bg-white/50 transition-all duration-200 ease-in-out group"
        >
          <Trash2 size={16} className="group-hover:text-primary" />
          <span className="font-headline text-xs font-bold tracking-widest uppercase">Trash</span>
        </NavLink>
      </div>
    </aside>
  );
}
