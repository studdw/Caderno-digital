import { motion } from 'motion/react';
import { ArrowUpRight, CalendarDays, Clock, Plus, Settings } from 'lucide-react';
import { SUBJECTS, MILESTONE, SCHEDULE_EVENTS } from '../constants';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../database/supabase';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchSubjects();
    // eslint-disable-next-line
  }, [user]);

  const fetchSubjects = async () => {
    const { data } = await supabase
      .from('subjects')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });
    setSubjects(data || []);
    setLoading(false);
  };

  const featuredSubject = subjects.length > 0 ? subjects[0] : null;
  const otherSubjects = subjects.slice(1);

  // Get today's day of the week
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;
  const todayIndex = new Date().getDay();
  const todayName = daysOfWeek[todayIndex] as any;
  
  // Get today's schedule events
  const todayEvents = SCHEDULE_EVENTS.filter(e => e.day === todayName).slice(0, 3);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1"
    >
      {/* Hero Section */}
      <section className="relative h-[320px] w-full overflow-hidden">
        <img 
          src="https://th.bing.com/th/id/R.87609b924ac202d07923aeaf7a3ddbb4?rik=1OKfYpPYd7DgMQ&riu=http%3a%2f%2ffocalizando.com.br%2fsites%2fdefault%2ffiles%2f2025-01%2ffiap-revolucao-na-educacao-digital-para-o-futuro.jpg&ehk=BarLo3k8WFvY%2fxEAJlZenl%2fawTbKCwSu8Ok%2by3OySQY%3d&risl=&pid=ImgRaw&r=0" 
          alt="FIAP Campus" 
          className="w-full h-full object-cover brightness-75"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-10 left-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-2">
            Boas Vindas de volta!
          </h1>
          <p className="text-secondary font-medium text-lg italic">
            Faça suas anotações, organize suas matérias e conquiste seus objetivos acadêmicos!
          </p>
        </div>
      </section>

      {/* Dashboard Content */}
      <div className="px-10 py-12 -mt-10 relative z-10">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-headline text-sm font-bold tracking-widest uppercase text-primary mb-1">Active Curriculum</h2>
            <h3 className="text-3xl font-black text-on-surface">Subject Overview</h3>
          </div>
          <div className="flex gap-4">
            <Link to="/schedule" className="bg-surface-high px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-surface-high/80 transition-colors">Weekly View</Link>
            <Link to="/schedule" className="bg-on-surface text-white px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-on-surface/90 transition-colors">Exam Schedule</Link>
          </div>
        </div>

        {/* Bento Grid */}
        {loading ? (
          <div className="text-center py-12">Carregando suas matérias...</div>
        ) : subjects.length === 0 ? (
          <div className="text-center py-12"><p className="text-secondary">Você ainda não criou nenhuma matéria. Clique em "Nova Matéria" na lateral!</p></div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Featured Subject */}
          {featuredSubject && (
            <Link 
              to={`/subject/${featuredSubject.id}`}
              className="md:col-span-2 bg-surface rounded-xl p-8 hover:bg-surface-high transition-all duration-300 group relative overflow-hidden editorial-shadow"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full translate-x-8 -translate-y-8" />
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <ArrowUpRight size={24} />
                  </div>
                  <h4 className="text-2xl font-bold mb-2">{featuredSubject?.name}</h4>
                  <p className="text-secondary text-sm max-w-sm mb-6">{featuredSubject?.description || 'Sem descrição'}</p>
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-on-surface">0</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-secondary/60">Notes</span>
                    </div>
                    <div className="w-px h-8 bg-outline self-center" />
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-on-surface">0</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-secondary/60">Classes</span>
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="text-secondary group-hover:text-primary transition-colors" size={32} />
              </div>
            </Link>
          )}

          {/* Other Subjects */}
          {otherSubjects.map((subject) => (
            <Link 
              key={subject.id}
              to={`/subject/${subject.id}`}
              className="bg-surface rounded-xl p-6 hover:bg-surface-high transition-all duration-300 group editorial-shadow"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <ArrowUpRight size={18} />
              </div>
              <h4 className="text-lg font-bold mb-1">{subject.name}</h4>
              <p className="text-secondary text-xs mb-4 line-clamp-1">{subject.description}</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: subject.color }} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-secondary/60">
                  {subject.notesCount} Notes • {subject.classesCount} Classes
                </span>
              </div>
            </Link>
          ))}
        </div>
        )}

        {/* Schedule Preview */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-on-surface">Today's Schedule</h3>
            <Link to="/schedule" className="text-primary text-xs font-bold tracking-widest uppercase hover:underline">Full Schedule</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white p-8 rounded-xl border border-outline text-center editorial-shadow">
              <p className="text-secondary font-medium">Sua agenda aparecerá aqui quando as funcionalidades forem concluídas</p>
            </div>
          </div>
        </div>



        {/* Study Tips */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-on-surface">Study Tips</h3>
            <span className="text-secondary text-[10px] font-bold uppercase tracking-widest">Daily Wisdom</span>
          </div>
          <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10 flex items-start gap-6 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none translate-x-10 translate-y-10">
              <Plus size={200} />
            </div>
            <div className="text-4xl">💡</div>
            <div>
              <h4 className="text-lg font-bold text-on-surface mb-2">The Pomodoro Technique</h4>
              <p className="text-secondary text-sm leading-relaxed max-w-xl">
                Try studying for 25 minutes followed by a 5-minute break. This helps maintain high levels of focus and prevents burnout during long coding sessions.
              </p>
              <button className="mt-4 text-primary text-[10px] font-bold uppercase tracking-widest hover:underline">Learn More</button>
            </div>
          </div>
        </div>

        {/* Quote of the Day */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <p className="text-2xl font-headline font-bold italic text-on-surface mb-4">
            "The only way to do great work is to love what you do."
          </p>
          <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">— Steve Jobs</p>
        </div>

        {/* Milestone Section */}
        <div className="mt-16 bg-on-surface rounded-2xl p-8 text-white flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
            <CalendarDays size={200} />
          </div>
          <div className="relative z-10">
            <h4 className="text-primary font-bold uppercase tracking-widest text-xs mb-2">{MILESTONE.category}</h4>
            <h5 className="text-2xl font-bold mb-4">{MILESTONE.title}</h5>
            <p className="text-white/60 max-w-md">{MILESTONE.description}</p>
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="text-5xl font-black mb-1">{MILESTONE.daysLeft.toString().padStart(2, '0')}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-primary">Days Left</div>
          </div>
          <button className="relative z-10 bg-white text-on-surface px-8 py-3 rounded-lg font-bold hover:bg-white/90 transition-colors">
            Review Docs
          </button>
        </div>
        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-outline flex flex-col md:flex-row justify-between items-center gap-8 text-secondary">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-xl font-black tracking-tighter text-primary">Caderno Digital</p>
            <p className="text-[10px] font-bold uppercase tracking-widest">© 2026 Academic Environment</p>
          </div>
          <div className="flex gap-8">
            <Link to="/" className="text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/" className="text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/" className="text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors">Contact Support</Link>
          </div>
        </footer>
      </div>
    </motion.div>
  );
}
