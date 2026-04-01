import { motion } from 'motion/react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../database/supabase';
import { useAuth } from '../hooks/useAuth';
import { PlusCircle, Edit2, Trash2, ChevronDown, X } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
}

export default function SubjectView() {
  const { id } = useParams();
  const { user } = useAuth();
  const [subject, setSubject] = useState<any>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteTags, setNoteTags] = useState<string[]>([]);

  useEffect(() => {
    if (user && id) {
      fetchSubjectAndNotes();
    }
    // eslint-disable-next-line
  }, [user, id]);

  const fetchSubjectAndNotes = async () => {
    setLoading(true);
    try {
      // Buscar a matéria do usuário
      const { data: subjectData, error: subjectError } = await supabase
        .from('subjects')
        .select('*')
        .eq('user_id', user?.id)
        .eq('id', id)
        .single();
      
      if (subjectError) {
        console.error('Error fetching subject:', subjectError);
        setLoading(false);
        return;
      }
      
      setSubject(subjectData);
      
      // Buscar notas da matéria
      const { data: notesData } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user?.id)
        .eq('subject_id', id)
        .order('created_at', { ascending: false });
      setNotes(notesData || []);
    } finally {
      setLoading(false);
    }
  };

  const saveNote = async () => {
    if (!noteTitle.trim() || !noteContent.trim() || !subject) return;
    const { error } = await supabase
      .from('notes')
      .insert({
        user_id: user?.id,
        subject_id: subject.id,
        title: noteTitle,
        content: noteContent,
        tags: noteTags,
      });
    if (error) {
      console.error('Error saving note:', error);
    } else {
      setNoteTitle('');
      setNoteContent('');
      setNoteTags([]);
      setShowNoteEditor(false);
      fetchSubjectAndNotes();
    }
  };

  const deleteNote = async (noteId: string) => {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', noteId);
    if (error) {
      console.error('Error deleting note:', error);
    } else {
      fetchSubjectAndNotes();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return <div className="p-12">Carregando matéria...</div>;
  }

  if (!subject) {
    return <div className="p-12 text-center"><h2>Matéria não encontrada.</h2><p className="text-secondary mt-2">Volte e tente novamente.</p></div>;
  }

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 pb-20"
      >
        {/* Subject Banner */}
        <div className="relative h-[300px] w-full overflow-hidden">
          <img 
            src={`https://picsum.photos/seed/${subject.id || 'default'}/1920/600`} 
            alt={subject?.name || 'Subject'} 
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
                <span className="text-2xl font-bold font-headline">{notes.length}</span>
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
            <button 
              onClick={() => setShowNoteEditor(true)}
              className="bg-primary text-white px-6 py-3 rounded-lg font-headline font-bold text-sm tracking-tight flex items-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-all"
            >
              <PlusCircle size={18} />
              + New Class/Note
            </button>
          </div>

          {/* Classes Feed */}
          <div className="max-w-4xl space-y-4">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-secondary">Loading notes...</p>
              </div>
            ) : notes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-secondary">No notes yet. Create your first note!</p>
              </div>
            ) : (
              notes.map((note, index) => (
                <article 
                  key={note.id}
                  className={`
                    bg-surface p-8 rounded-xl group transition-all duration-200 hover:bg-surface-high editorial-shadow
                    ${index === 2 ? 'border-l-4 border-primary' : ''}
                  `}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <time className="text-[10px] font-bold tracking-widest uppercase text-primary mb-2 block">{formatDate(note.created_at)}</time>
                      <h3 className="text-xl font-bold font-headline text-on-surface group-hover:text-primary transition-colors">
                        {note.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-secondary hover:text-on-surface transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => deleteNote(note.id)}
                        className="p-2 text-secondary hover:text-primary transition-colors"
                      >
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
              ))
            )}
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

      {/* Note Editor Modal */}
      {showNoteEditor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Editor Header / Toolbar */}
            <div className="sticky top-0 z-30 bg-white px-8 py-6 flex items-center justify-between border-b border-outline">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-surface-low rounded-lg transition-colors text-secondary"><svg width="20" height="20"><rect width="20" height="20" fill="none"/></svg><b>B</b></button>
                <button className="p-2 hover:bg-surface-low rounded-lg transition-colors text-secondary"><svg width="20" height="20"><rect width="20" height="20" fill="none"/></svg><i>I</i></button>
                <button className="p-2 hover:bg-surface-low rounded-lg transition-colors text-secondary"><svg width="20" height="20" fill="none"><rect width="20" height="20" fill="none"/></svg>•</button>
                <button className="p-2 hover:bg-surface-low rounded-lg transition-colors text-secondary"><svg width="20" height="20" fill="none"><rect width="20" height="20" fill="none"/></svg>{'<'}/{'>'}</button>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setShowNoteEditor(false)} className="px-6 py-2 text-secondary font-headline text-xs font-bold uppercase tracking-widest hover:text-on-surface transition-colors">Cancel</button>
                <button onClick={saveNote} className="px-8 py-2 bg-primary text-white rounded-lg font-headline text-xs font-bold uppercase tracking-widest shadow-sm active:scale-95 transition-transform">Save Note</button>
              </div>
            </div>
            {/* Editor Content Canvas */}
            <div className="flex-1 overflow-y-auto hide-scrollbar">
              <div className="flex px-8 py-12 gap-12 max-w-4xl mx-auto w-full">
                {/* Main Writing Column */}
                <div className="flex-1 space-y-8">
                  <input 
                    type="text"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 font-headline font-extrabold text-3xl text-on-surface p-0 placeholder-zinc-300"
                    placeholder="Note Title..."
                  />
                  <div className="flex items-center gap-3 text-secondary text-xs font-bold tracking-widest uppercase">
                    <span className="bg-surface-high px-3 py-1 rounded">Module 04</span>
                    <span className="bg-surface-high px-3 py-1 rounded">Architecture</span>
                  </div>
                  <textarea 
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 font-sans text-lg text-on-surface p-0 placeholder-zinc-400 resize-none min-h-[300px]"
                    placeholder="Start typing your academic observations here..."
                  />
                  <div className="flex items-center gap-4">
                    <input 
                      type="text"
                      placeholder="Add tags (comma separated)"
                      className="flex-1 px-3 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const tag = e.currentTarget.value.trim();
                          if (tag && !noteTags.includes(tag)) {
                            setNoteTags([...noteTags, tag]);
                            e.currentTarget.value = '';
                          }
                        }
                      }}
                    />
                    <div className="flex gap-2">
                      {noteTags.map(tag => (
                        <span key={tag} className="bg-primary text-white px-2 py-1 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
