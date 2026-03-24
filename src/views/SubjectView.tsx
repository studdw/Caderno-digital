import { motion } from 'motion/react';
import { useParams } from 'react-router-dom';
import { SUBJECTS, NOTES } from '../constants';
import { PlusCircle, Edit2, Trash2, ChevronDown } from 'lucide-react';

export default function SubjectView() {
  const { id } = useParams();
  const subject = SUBJECTS.find(s => s.id === id) || SUBJECTS[0];
  const subjectNotes = NOTES.filter(n => n.subjectId === subject.id);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 pb-20"
    >
      {/* Subject Banner */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <img 
          src={`https://picsum.photos/seed/${subject.id}/1920/600`} 
          alt={subject.name} 
          className="w-full h-full object-cover grayscale contrast-125 brightness-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-12 left-12">
          <span className="bg-primary text-white px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase mb-4 inline-block">
            Course: Computer Science
          </span>
          <h1 className="text-6xl font-black font-headline tracking-tighter text-on-surface">
            {subject.name}
          </h1>
        </div>
      </div>

      <div className="px-12 -mt-6 relative z-10">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-1">Total Lessons</span>
              <span className="text-2xl font-bold font-headline">{subject.notesCount}</span>
            </div>
            <div className="w-px h-8 bg-outline" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-1">Average Grade</span>
              <span className="text-2xl font-bold font-headline text-primary">9.5</span>
            </div>
            <div className="w-px h-8 bg-outline" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-1">Completion</span>
              <span className="text-2xl font-bold font-headline">68%</span>
            </div>
          </div>
          <button className="bg-primary text-white px-6 py-3 rounded-lg font-headline font-bold text-sm tracking-tight flex items-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-all">
            <PlusCircle size={18} />
            + New Class/Note
          </button>
        </div>

        {/* Classes Feed */}
        <div className="max-w-4xl space-y-4">
          {subjectNotes.map((note, index) => (
            <article 
              key={note.id}
              className={`
                bg-surface p-8 rounded-xl group transition-all duration-200 hover:bg-surface-high editorial-shadow
                ${index === 2 ? 'border-l-4 border-primary' : ''}
              `}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <time className="text-[10px] font-bold tracking-widest uppercase text-primary mb-2 block">{note.date}</time>
                  <h3 className="text-xl font-bold font-headline text-on-surface group-hover:text-primary transition-colors">
                    {note.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-secondary hover:text-on-surface transition-colors">
                    <Edit2 size={18} />
                  </button>
                  <button className="p-2 text-secondary hover:text-primary transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-secondary leading-relaxed mb-6 font-sans">
                {note.content}
              </p>
              <div className="flex items-center gap-2">
                {note.tags.map(tag => (
                  <span 
                    key={tag}
                    className="bg-surface-low px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-secondary rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="max-w-4xl mt-12 flex justify-center">
          <button className="font-headline text-xs font-bold tracking-widest uppercase text-secondary hover:text-primary transition-colors flex items-center gap-2 border border-outline px-6 py-3 rounded-full hover:bg-white active:scale-95 duration-200">
            Load Older Notes
            <ChevronDown size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
