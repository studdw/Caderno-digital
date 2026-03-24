import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Filter, LayoutDashboard, Plus, ArrowUpRight, Settings } from 'lucide-react';
import { SCHEDULE_EVENTS, SUBJECTS } from '../constants';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

export default function Schedule() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-on-surface mb-1">Academic Schedule</h1>
          <p className="text-secondary text-sm font-medium">Manage your classes, labs, and upcoming exams.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-surface-low rounded-lg p-1 border border-outline">
            <button className="p-2 hover:bg-white rounded-md transition-colors text-secondary">
              <ChevronLeft size={16} />
            </button>
            <div className="px-4 font-headline text-xs font-bold tracking-widest uppercase text-on-surface">
              Oct 21 - Oct 27
            </div>
            <button className="p-2 hover:bg-white rounded-md transition-colors text-secondary">
              <ChevronRight size={16} />
            </button>
          </div>
          
          <button className="flex items-center gap-2 bg-surface-low border border-outline px-4 py-2 rounded-lg text-sm font-bold text-secondary hover:text-primary transition-colors">
            <Filter size={14} />
            <span>Filter</span>
          </button>
          
          <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-hover transition-colors shadow-sm">
            Add Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {DAYS.map((day, index) => {
          const dayEvents = SCHEDULE_EVENTS.filter(e => e.day === day);
          const isToday = day === 'Monday'; // Mocking today as Monday

          return (
            <div key={day} className="flex flex-col gap-4">
              <div className={`
                p-3 rounded-xl border text-center transition-all
                ${isToday 
                  ? 'bg-primary border-primary text-white shadow-lg scale-105 z-10' 
                  : 'bg-surface-low border-outline text-secondary'
                }
              `}>
                <p className="text-[10px] font-bold tracking-widest uppercase opacity-80">{day.substring(0, 3)}</p>
                <p className="text-xl font-black tracking-tighter">{21 + index}</p>
              </div>

              <div className="flex flex-col gap-3">
                {dayEvents.length > 0 ? (
                  dayEvents.map((event) => {
                    const subject = SUBJECTS.find(s => s.id === event.subjectId);
                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -2 }}
                        className="bg-white p-4 rounded-xl border border-outline editorial-shadow group cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={`
                            text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full
                            ${event.type === 'lecture' ? 'bg-blue-100 text-blue-600' : 
                              event.type === 'lab' ? 'bg-green-100 text-green-600' : 
                              'bg-purple-100 text-purple-600'}
                          `}>
                            {event.type}
                          </span>
                          <span className="text-[10px] font-bold text-secondary group-hover:text-primary transition-colors">
                            {event.duration}
                          </span>
                        </div>
                        
                        <h3 className="text-xs font-bold text-on-surface mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-secondary">
                          <Clock size={12} />
                          <span className="text-[10px] font-medium">{event.time}</span>
                        </div>

                        {subject && (
                          <div className="mt-3 pt-3 border-t border-outline flex items-center gap-2">
                            <div 
                              className="w-1.5 h-1.5 rounded-full" 
                              style={{ backgroundColor: subject.color }}
                            />
                            <span className="text-[9px] font-bold tracking-widest uppercase text-secondary truncate">
                              {subject.name}
                            </span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="h-24 rounded-xl border border-dashed border-outline flex items-center justify-center text-secondary/30">
                    <CalendarIcon size={20} strokeWidth={1} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-surface-low rounded-2xl p-8 border border-outline">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black tracking-tighter text-on-surface">Weekly Insights</h2>
          <button className="text-primary text-xs font-bold tracking-widest uppercase hover:underline">View Full Report</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl border border-outline shadow-sm">
            <p className="text-[10px] font-bold tracking-widest uppercase text-secondary mb-2">Total Study Hours</p>
            <p className="text-3xl font-black tracking-tighter text-on-surface">32.5 <span className="text-sm font-medium text-secondary">hrs</span></p>
            <div className="mt-4 h-1 w-full bg-surface-low rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[75%]" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-outline shadow-sm">
            <p className="text-[10px] font-bold tracking-widest uppercase text-secondary mb-2">Classes Attended</p>
            <p className="text-3xl font-black tracking-tighter text-on-surface">12 <span className="text-sm font-medium text-secondary">/ 14</span></p>
            <div className="mt-4 h-1 w-full bg-surface-low rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-[85%]" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-outline shadow-sm">
            <p className="text-[10px] font-bold tracking-widest uppercase text-secondary mb-2">Upcoming Deadlines</p>
            <p className="text-3xl font-black tracking-tighter text-on-surface">03</p>
            <div className="mt-4 flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-surface-high flex items-center justify-center text-[8px] font-bold">
                  {i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-6 p-6 bg-white rounded-xl border border-outline shadow-sm">
        <p className="text-[10px] font-bold tracking-widest uppercase text-secondary">Legend:</p>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-100 border border-blue-200" />
          <span className="text-[10px] font-bold text-on-surface uppercase tracking-widest">Lecture</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-100 border border-green-200" />
          <span className="text-[10px] font-bold text-on-surface uppercase tracking-widest">Lab</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-100 border border-purple-200" />
          <span className="text-[10px] font-bold text-on-surface uppercase tracking-widest">Presentation</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-100 border border-red-200" />
          <span className="text-[10px] font-bold text-on-surface uppercase tracking-widest">Exam</span>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-black tracking-tighter text-on-surface mb-6">Upcoming Exams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Database Systems Final', date: 'Nov 12, 2024', time: '14:00', room: 'Lab 402', color: '#3b82f6' },
            { title: 'Software Engineering Sprint 2', date: 'Nov 15, 2024', time: '08:00', room: 'Auditorium', color: '#bb0013' },
            { title: 'Front-end Development Project', date: 'Nov 18, 2024', time: '10:00', room: 'Lab 201', color: '#10b981' },
          ].map((exam, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-outline editorial-shadow flex flex-col gap-4 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: exam.color }} />
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{exam.title}</h3>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{exam.date}</span>
              </div>
              <div className="flex items-center gap-6 text-secondary">
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span className="text-[10px] font-bold">{exam.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest">{exam.room}</span>
                </div>
              </div>
              <button className="mt-2 w-full py-2 rounded-lg border border-outline text-[10px] font-bold uppercase tracking-widest hover:bg-surface-low transition-colors">
                Exam Details
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-black tracking-tighter text-on-surface mb-6">Study Group Sessions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Software Eng. Review', date: 'Oct 25', time: '16:00', members: 4 },
            { title: 'Python DS Practice', date: 'Oct 26', time: '14:00', members: 12 },
            { title: 'Database SQL Help', date: 'Oct 27', time: '10:00', members: 8 },
            { title: 'Front-end Workshop', date: 'Oct 28', time: '15:00', members: 6 },
          ].map((session, i) => (
            <div key={i} className="bg-white p-5 rounded-xl border border-outline flex flex-col gap-3 hover:bg-surface-low transition-all editorial-shadow group">
              <div className="flex justify-between items-start">
                <h4 className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors">{session.title}</h4>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{session.date}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-secondary">
                  <Clock size={12} />
                  <span className="text-[10px] font-bold">{session.time}</span>
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(j => (
                    <div key={j} className="w-5 h-5 rounded-full border-2 border-white bg-surface-high overflow-hidden">
                      <img src={`https://picsum.photos/seed/user${i}${j}/40/40`} alt="Member" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-black tracking-tighter text-on-surface mb-6">Academic Deadlines</h2>
        <div className="space-y-4">
          {[
            { title: 'Software Engineering Sprint 2 Documentation', date: 'Oct 28', priority: 'High', status: 'Pending' },
            { title: 'Database Normalization Report', date: 'Oct 30', priority: 'Medium', status: 'In Progress' },
            { title: 'Python Data Analysis Project', date: 'Nov 05', priority: 'High', status: 'Not Started' },
          ].map((deadline, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-outline flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface-low transition-all editorial-shadow group">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${deadline.priority === 'High' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                <div>
                  <h4 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{deadline.title}</h4>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Due: {deadline.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className={`text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${deadline.status === 'Pending' ? 'bg-blue-100 text-blue-600' : deadline.status === 'In Progress' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'}`}>
                  {deadline.status}
                </span>
                <button className="text-primary text-[10px] font-bold uppercase tracking-widest hover:underline">Submit Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-black tracking-tighter text-on-surface mb-6">Academic Calendar</h2>
        <div className="bg-white p-8 rounded-2xl border border-outline shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { month: 'October', events: 12, highlight: 'Challenge Sprint 2' },
              { month: 'November', events: 8, highlight: 'Final Exams' },
              { month: 'December', events: 4, highlight: 'Winter Break' },
              { month: 'January', events: 10, highlight: 'New Semester' },
            ].map((month, i) => (
              <div key={i} className="flex flex-col gap-2">
                <p className="text-sm font-black text-on-surface">{month.month}</p>
                <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">{month.events} Events Scheduled</p>
                <div className="mt-2 p-3 bg-surface-low rounded-lg border border-outline">
                  <p className="text-[9px] font-bold text-primary uppercase tracking-widest">Highlight:</p>
                  <p className="text-xs font-bold text-on-surface">{month.highlight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-black tracking-tighter text-on-surface mb-6">Academic Progress</h2>
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

      <div className="mt-12">
        <h2 className="text-xl font-black tracking-tighter text-on-surface mb-6">Announcements</h2>
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

      <div className="mt-12">
        <h2 className="text-xl font-black tracking-tighter text-on-surface mb-6">Study Tips</h2>
        <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10 flex items-start gap-6 relative overflow-hidden">
          <div className="text-4xl">💡</div>
          <div>
            <h4 className="text-lg font-bold text-on-surface mb-2">The Pomodoro Technique</h4>
            <p className="text-secondary text-sm leading-relaxed max-w-xl">
              Try studying for 25 minutes followed by a 5-minute break. This helps maintain high levels of focus and prevents burnout during long coding sessions.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center max-w-2xl mx-auto">
        <p className="text-2xl font-headline font-bold italic text-on-surface mb-4">
          "The only way to do great work is to love what you do."
        </p>
        <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">— Steve Jobs</p>
      </div>

      <div className="mt-16">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-on-surface">Quick Navigation</h3>
          <span className="text-secondary text-[10px] font-bold uppercase tracking-widest">Shortcuts</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: 'Dashboard', path: '/', icon: <LayoutDashboard size={16} /> },
            { title: 'New Note', path: '/editor', icon: <Plus size={16} /> },
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
            <span className="text-secondary text-[10px] font-bold uppercase tracking-widest">Weekly Avg</span>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-outline editorial-shadow">
            <div className="flex items-end gap-2 h-32">
              {SUBJECTS.map((subject, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div
                    className="w-full rounded-t-lg transition-all group-hover:opacity-80"
                    style={{
                      backgroundColor: subject.color,
                      height: `${30 + i * 15}%`,
                    }}
                  />
                  <span className="text-[8px] font-bold text-secondary uppercase tracking-widest truncate w-full text-center">
                    {subject.name.split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      {/* Upcoming Events */}
      <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-on-surface">Upcoming Events</h3>
            <span className="text-secondary text-[10px] font-bold uppercase tracking-widest">Campus Life</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Tech Career Fair', date: 'Oct 25', time: '10:00 AM', location: 'Main Hall' },
              { title: 'Hackathon 2024', date: 'Nov 02', time: '09:00 AM', location: 'Lab 402' },
            ].map((event, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-outline flex items-center gap-6 hover:bg-surface-low transition-all editorial-shadow group">
                <div className="bg-primary/10 text-primary w-16 h-16 rounded-xl flex flex-col items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="text-xs font-black uppercase">{event.date.split(' ')[0]}</span>
                  <span className="text-lg font-black">{event.date.split(' ')[1]}</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-on-surface mb-1">{event.title}</h4>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">{event.time} • {event.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      {/* Recent Activity */}
      <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-on-surface">Recent Activity</h3>
            <span className="text-secondary text-[10px] font-bold uppercase tracking-widest">Your Feed</span>
          </div>
          <div className="space-y-4">
            {[
              { action: 'Completed Task', target: 'Sprint 2 Presentation', time: '2h ago' },
              { action: 'Joined Group', target: 'Software Eng. Team A', time: '5h ago' },
              { action: 'Added Note', target: 'React Hooks', time: 'Yesterday' },
            ].map((activity, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-outline flex items-center justify-between gap-4 hover:bg-surface-low transition-all editorial-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div>
                    <p className="text-xs font-bold text-on-surface">{activity.action}</p>
                    <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">{activity.target}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

      {/* Academic Calendar */}
      <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-on-surface">Academic Calendar</h3>
            <span className="text-secondary text-[10px] font-bold uppercase tracking-widest">2024 Semester</span>
          </div>
          <div className="bg-white p-6 rounded-xl border border-outline editorial-shadow">
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                <div key={d} className="text-[8px] font-black text-secondary text-center uppercase tracking-widest">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 31 }).map((_, i) => (
                <div key={i} className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold ${i + 1 === 24 ? 'bg-primary text-white' : 'text-on-surface hover:bg-surface-low cursor-pointer'}`}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

      {/* Academic Progress */}
      <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-on-surface">Academic Progress</h3>
            <span className="text-secondary text-[10px] font-bold uppercase tracking-widest">Current Semester</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'GPA', value: '3.85', color: 'text-primary' },
              { label: 'Credits Earned', value: '42 / 120', color: 'text-on-surface' },
              { label: 'Attendance', value: '92%', color: 'text-green-500' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-outline flex flex-col items-center gap-2 editorial-shadow">
                <span className={`text-2xl font-black ${stat.color}`}>{stat.value}</span>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-24 pt-12 border-t border-outline flex flex-col md:flex-row justify-between items-center gap-8 text-secondary">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="text-xl font-black tracking-tighter text-primary">Digital Monolith</p>
          <p className="text-[10px] font-bold uppercase tracking-widest">© 2024 Academic Environment</p>
        </div>
        <div className="flex gap-8">
          <button className="text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors">Privacy Policy</button>
          <button className="text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors">Terms of Service</button>
          <button className="text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors">Contact Support</button>
        </div>
      </footer>
    </div>
  );
}
