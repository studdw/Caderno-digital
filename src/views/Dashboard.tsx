import { motion } from 'motion/react';
import { ArrowUpRight, CalendarDays, Clock, Plus, Settings } from 'lucide-react';
import { SUBJECTS, MILESTONE } from '../constants';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const featuredSubject = SUBJECTS.find(s => s.featured);
  const otherSubjects = SUBJECTS.filter(s => !s.featured);

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
            Welcome back, ADS Student.
          </h1>
          <p className="text-secondary font-medium text-lg italic">
            The future of technology is built one line of code at a time.
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
                  <h4 className="text-2xl font-bold mb-2">{featuredSubject.name}</h4>
                  <p className="text-secondary text-sm max-w-sm mb-6">{featuredSubject.description}</p>
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-on-surface">{featuredSubject.notesCount}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-secondary/60">Notes</span>
                    </div>
                    <div className="w-px h-8 bg-outline self-center" />
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-on-surface">{featuredSubject.classesCount}</span>
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

        {/* Schedule Preview */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-on-surface">Today's Schedule</h3>
            <Link to="/schedule" className="text-primary text-xs font-bold tracking-widest uppercase hover:underline">Full Schedule</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { time: '08:00', title: 'Software Engineering', type: 'Lecture', color: '#bb0013' },
              { time: '10:00', title: 'Database Lab', type: 'Lab', color: '#3b82f6' },
              { time: '14:00', title: 'Python for Data Science', type: 'Lecture', color: '#f59e0b' },
            ].map((event, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-outline flex items-center gap-4 editorial-shadow">
                <div className="text-center min-w-[60px]">
                  <p className="text-xs font-bold text-on-surface">{event.time}</p>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">AM</p>
                </div>
                <div className="w-px h-8 bg-outline" />
                <div>
                  <h4 className="text-sm font-bold text-on-surface">{event.title}</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: event.color }} />
                    <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">{event.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Notes */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-on-surface">Recent Notes</h3>
            <Link to="/editor" className="text-primary text-xs font-bold tracking-widest uppercase hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Data Science Foundations with Pandas', date: 'Oct 24', subject: 'Python', color: '#f59e0b' },
              { title: 'Asynchronous Programming & Asyncio', date: 'Oct 21', subject: 'Python', color: '#f59e0b' },
            ].map((note, i) => (
              <Link key={i} to="/editor" className="bg-white p-6 rounded-xl border border-outline flex flex-col gap-4 hover:bg-surface-low transition-all editorial-shadow group">
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors">{note.title}</h4>
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">{note.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: note.color }} />
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">{note.subject}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-on-surface">Quick Resources</h3>
            <Link to="/resources" className="text-primary text-xs font-bold tracking-widest uppercase hover:underline">Browse All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Academic Calendar', icon: '📅' },
              { title: 'Library Access', icon: '📚' },
              { title: 'Student Portal', icon: '🎓' },
              { title: 'Tech Support', icon: '🛠️' },
            ].map((resource, i) => (
              <Link key={i} to="/resources" className="bg-white p-4 rounded-xl border border-outline flex flex-col items-center justify-center gap-2 hover:bg-surface-low transition-all editorial-shadow group text-center">
                <span className="text-2xl">{resource.icon}</span>
                <span className="text-[10px] font-bold text-on-surface uppercase tracking-widest group-hover:text-primary transition-colors">{resource.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Academic Progress */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-on-surface">Academic Progress</h3>
            <span className="text-secondary text-[10px] font-bold uppercase tracking-widest">Semester 1 • 2024</span>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-outline shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Overall GPA</span>
                  <span className="text-2xl font-black text-on-surface">9.2</span>
                </div>
                <div className="h-1.5 w-full bg-surface-low rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[92%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Credits Earned</span>
                  <span className="text-2xl font-black text-on-surface">18 <span className="text-xs font-medium text-secondary">/ 24</span></span>
                </div>
                <div className="h-1.5 w-full bg-surface-low rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[75%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Attendance</span>
                  <span className="text-2xl font-black text-on-surface">96%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-low rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[96%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Announcements */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-on-surface">Announcements</h3>
            <span className="text-secondary text-[10px] font-bold uppercase tracking-widest">3 New Updates</span>
          </div>
          <div className="space-y-4">
            {[
              { title: 'New Library Resources Available', content: 'We have added 50+ new e-books to the digital library.', date: 'Today' },
              { title: 'Challenge Sprint 2 Guidelines', content: 'Please review the updated presentation criteria for Sprint 2.', date: 'Yesterday' },
            ].map((announcement, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-outline flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface-low transition-all editorial-shadow">
                <div>
                  <h4 className="text-sm font-bold text-on-surface mb-1">{announcement.title}</h4>
                  <p className="text-xs text-secondary">{announcement.content}</p>
                </div>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-widest whitespace-nowrap">{announcement.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-on-surface">Upcoming Tasks</h3>
            <button className="text-primary text-[10px] font-bold uppercase tracking-widest hover:underline">+ Add Task</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Database Normalization Exercise', due: 'Tomorrow', priority: 'High' },
              { title: 'Python API Integration', due: 'In 3 days', priority: 'Medium' },
            ].map((task, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-outline flex items-center justify-between gap-4 hover:bg-surface-low transition-all editorial-shadow group">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded border border-outline flex items-center justify-center group-hover:border-primary transition-colors">
                    <div className="w-2 h-2 bg-primary rounded-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-sm font-bold text-on-surface">{task.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${task.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>
                    {task.priority}
                  </span>
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest whitespace-nowrap">{task.due}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Group */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-on-surface">Study Groups</h3>
            <button className="text-primary text-[10px] font-bold uppercase tracking-widest hover:underline">Find Group</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Software Eng. Team A', members: 4, active: true },
              { name: 'Python Data Science', members: 12, active: false },
              { name: 'Front-end Masters', members: 8, active: true },
            ].map((group, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-outline flex flex-col gap-4 hover:bg-surface-low transition-all editorial-shadow group relative overflow-hidden">
                {group.active && <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full m-4 animate-pulse" />}
                <h4 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{group.name}</h4>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(j => (
                      <div key={j} className="w-6 h-6 rounded-full border-2 border-white bg-surface-high overflow-hidden">
                        <img src={`https://picsum.photos/seed/user${i}${j}/40/40`} alt="Member" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                    <div className="w-6 h-6 rounded-full border-2 border-white bg-surface-low flex items-center justify-center text-[8px] font-bold">+{group.members - 3}</div>
                  </div>
                  <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">Join</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-on-surface">Upcoming Exams</h3>
            <Link to="/schedule" className="text-primary text-[10px] font-bold uppercase tracking-widest hover:underline">Full Schedule</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Database Systems', date: 'Nov 12', time: '14:00', room: 'Lab 402' },
              { title: 'Software Engineering', date: 'Nov 15', time: '08:00', room: 'Auditorium' },
              { title: 'Front-end Dev', date: 'Nov 18', time: '10:00', room: 'Lab 201' },
              { title: 'Python DS', date: 'Nov 22', time: '16:00', room: 'Lab 305' },
            ].map((exam, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-outline flex flex-col gap-3 hover:bg-surface-low transition-all editorial-shadow group">
                <div className="flex justify-between items-start">
                  <h4 className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors">{exam.title}</h4>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{exam.date}</span>
                </div>
                <div className="flex items-center gap-4 text-secondary">
                  <div className="flex items-center gap-1">
                    <Clock size={10} />
                    <span className="text-[9px] font-bold">{exam.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] font-bold uppercase tracking-widest">{exam.room}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-on-surface">Attendance Overview</h3>
            <span className="text-secondary text-[10px] font-bold uppercase tracking-widest">Last 30 Days</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {SUBJECTS.map((subject, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-outline flex flex-col items-center gap-3 editorial-shadow">
                <div className="relative w-12 h-12">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      className="text-surface-high stroke-current"
                      strokeWidth="3"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="stroke-current"
                      style={{ color: subject.color }}
                      strokeWidth="3"
                      strokeDasharray={`${85 + i * 2}, 100`}
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-on-surface">
                    {85 + i * 2}%
                  </div>
                </div>
                <span className="text-[8px] font-bold text-secondary uppercase tracking-widest text-center truncate w-full">
                  {subject.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Study Time */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-on-surface">Study Time Distribution</h3>
            <span className="text-secondary text-[10px] font-bold uppercase tracking-widest">Weekly Average</span>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-outline shadow-sm">
            <div className="flex flex-col gap-6">
              {SUBJECTS.slice(0, 4).map((subject, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-[10px] font-bold text-on-surface uppercase tracking-widest w-32 truncate">{subject.name}</span>
                  <div className="flex-1 h-2 bg-surface-low rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        backgroundColor: subject.color,
                        width: `${40 + i * 15}%`
                      }} 
                    />
                  </div>
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest w-12 text-right">{8 + i * 2}h</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-on-surface">Upcoming Events</h3>
            <Link to="/schedule" className="text-primary text-[10px] font-bold uppercase tracking-widest hover:underline">Full Calendar</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Tech Talk: Future of AI', date: 'Oct 28', time: '18:00', location: 'Main Hall' },
              { title: 'Hackathon 2024 Kickoff', date: 'Nov 02', time: '09:00', location: 'Innovation Lab' },
            ].map((event, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-outline flex flex-col gap-4 hover:bg-surface-low transition-all editorial-shadow group">
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors">{event.title}</h4>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary uppercase tracking-widest">{event.date}</p>
                    <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-secondary">
                  <span className="text-[10px] font-bold uppercase tracking-widest">📍 {event.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-on-surface">Recent Activity</h3>
            <span className="text-secondary text-[10px] font-bold uppercase tracking-widest">Last 24 Hours</span>
          </div>
          <div className="bg-white rounded-2xl border border-outline shadow-sm overflow-hidden">
            {[
              { action: 'Created a new note', target: 'Pandas Dataframes', time: '2h ago', icon: '📝' },
              { action: 'Completed a task', target: 'Database Normalization', time: '5h ago', icon: '✅' },
              { action: 'Joined a study group', target: 'Software Eng. Team A', time: '8h ago', icon: '👥' },
              { action: 'Updated profile picture', target: '', time: '12h ago', icon: '👤' },
            ].map((activity, i) => (
              <div key={i} className={`p-4 flex items-center justify-between gap-4 hover:bg-surface-low transition-all ${i !== 3 ? 'border-b border-outline' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-low flex items-center justify-center text-xl">
                    {activity.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">{activity.action}</p>
                    {activity.target && <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{activity.target}</p>}
                  </div>
                </div>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-on-surface">Quick Navigation</h3>
            <span className="text-secondary text-[10px] font-bold uppercase tracking-widest">Shortcuts</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'New Note', path: '/editor', icon: <Plus size={16} /> },
              { title: 'Schedule', path: '/schedule', icon: <CalendarDays size={16} /> },
              { title: 'Resources', path: '/resources', icon: <ArrowUpRight size={16} /> },
              { title: 'Settings', path: '/', icon: <Settings size={16} /> },
            ].map((link, i) => (
              <Link key={i} to={link.path} className="bg-white p-4 rounded-xl border border-outline flex items-center gap-3 hover:bg-surface-low transition-all editorial-shadow group">
                <div className="w-8 h-8 rounded-lg bg-surface-low flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-white transition-all">
                  {link.icon}
                </div>
                <span className="text-[10px] font-bold text-on-surface uppercase tracking-widest">{link.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Social */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-on-surface">Community Activity</h3>
            <span className="text-secondary text-[10px] font-bold uppercase tracking-widest">Global Feed</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { user: 'Maria Silva', action: 'shared a note', target: 'React Hooks', time: '10m ago' },
              { user: 'João Pereira', action: 'started a study session', target: 'SQL Basics', time: '25m ago' },
              { user: 'Ana Costa', action: 'asked a question', target: 'Java Generics', time: '1h ago' },
            ].map((post, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-outline flex items-center gap-4 hover:bg-surface-low transition-all editorial-shadow group">
                <div className="w-10 h-10 rounded-full border border-outline overflow-hidden">
                  <img src={`https://picsum.photos/seed/user${i}/40/40`} alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface"><span className="text-primary">{post.user}</span> {post.action}</p>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">{post.target} • {post.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-on-surface">Top Contributors</h3>
            <span className="text-secondary text-[10px] font-bold uppercase tracking-widest">This Week</span>
          </div>
          <div className="bg-white rounded-2xl border border-outline shadow-sm overflow-hidden">
            {[
              { name: 'Lucas Kaftan', points: 1250, rank: 1, avatar: 'lucas' },
              { name: 'Beatriz Lima', points: 1120, rank: 2, avatar: 'beatriz' },
              { name: 'Carlos Eduardo', points: 980, rank: 3, avatar: 'carlos' },
            ].map((user, i) => (
              <div key={i} className={`p-4 flex items-center justify-between gap-4 hover:bg-surface-low transition-all ${i !== 2 ? 'border-b border-outline' : ''}`}>
                <div className="flex items-center gap-4">
                  <span className={`text-sm font-black w-6 text-center ${user.rank === 1 ? 'text-yellow-500' : user.rank === 2 ? 'text-gray-400' : 'text-amber-600'}`}>
                    #{user.rank}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-outline overflow-hidden">
                    <img src={`https://picsum.photos/seed/${user.avatar}/40/40`} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <span className="text-sm font-bold text-on-surface">{user.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-primary">{user.points}</p>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Points</p>
                </div>
              </div>
            ))}
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
            <p className="text-xl font-black tracking-tighter text-primary">Digital Monolith</p>
            <p className="text-[10px] font-bold uppercase tracking-widest">© 2024 Academic Environment</p>
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
