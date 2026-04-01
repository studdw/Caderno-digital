import { motion } from 'motion/react';
import { 
  Bold, 
  Italic, 
  List, 
  Code, 
  Paperclip, 
  Image as ImageIcon,
  Clock
} from 'lucide-react';

export default function NoteEditor() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col h-full overflow-hidden"
    >
      {/* Editor Header / Toolbar */}
      <div className="sticky top-0 z-30 bg-white px-12 py-6 flex items-center justify-between border-b border-outline">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-surface-low rounded-lg transition-colors text-secondary">
            <Bold size={20} />
          </button>
          <button className="p-2 hover:bg-surface-low rounded-lg transition-colors text-secondary">
            <Italic size={20} />
          </button>
          <button className="p-2 hover:bg-surface-low rounded-lg transition-colors text-secondary">
            <List size={20} />
          </button>
          <button className="p-2 hover:bg-surface-low rounded-lg transition-colors text-secondary">
            <Code size={20} />
          </button>
          <div className="h-6 w-[1px] bg-outline mx-2" />
          <button className="p-2 hover:bg-surface-low rounded-lg transition-colors text-secondary">
            <Paperclip size={20} />
          </button>
          <button className="p-2 hover:bg-surface-low rounded-lg transition-colors text-secondary">
            <ImageIcon size={20} />
          </button>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-[10px] font-bold text-secondary uppercase tracking-tighter">
            <Clock size={12} />
            <span>Last saved 2m ago</span>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2 text-secondary font-headline text-xs font-bold uppercase tracking-widest hover:text-on-surface transition-colors">
              Cancel
            </button>
            <button className="px-8 py-2 bg-primary text-white rounded-lg font-headline text-xs font-bold uppercase tracking-widest shadow-sm active:scale-95 transition-transform">
              Save Note
            </button>
          </div>
        </div>
      </div>

      {/* Editor Content Canvas */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="flex px-12 py-16 gap-12 max-w-7xl mx-auto w-full">
          {/* Main Writing Column */}
          <div className="flex-1 space-y-8">
            <input 
              type="text"
              className="w-full bg-transparent border-none focus:ring-0 font-headline font-extrabold text-5xl text-on-surface p-0 placeholder-zinc-300"
              placeholder="Note Title..."
            />
            <div className="flex items-center gap-3 text-secondary text-xs font-bold tracking-widest uppercase">
              <span className="bg-surface-high px-3 py-1 rounded">Module</span>
              <span className="bg-surface-high px-3 py-1 rounded"></span>
              <div className="flex items-center gap-1">
                <Clock size={12} /> 
              </div>
            </div>
            <textarea 
              className="w-full bg-transparent border-none focus:ring-0 font-sans text-lg text-on-surface p-0 placeholder-zinc-400 resize-none min-h-[500px]"
              placeholder="Start typing your academic observations here..."
            />
          </div>

          {/* Right Context Panel */}
          <aside className="hidden xl:block w-72 space-y-8">
            <div className="rounded-xl overflow-hidden relative group aspect-video editorial-shadow">
              <img 
                src="https://picsum.photos/seed/classroom/400/300" 
                alt="Modern classroom" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <span className="text-white text-[10px] font-bold uppercase tracking-widest">Campus Reference</span>
              </div>
            </div>

            <div className="bg-surface p-6 rounded-xl border border-outline space-y-4 editorial-shadow">
              <h3 className="font-headline text-xs font-black text-primary uppercase tracking-widest">Metadata</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-secondary font-bold uppercase">Professor</span>
                  <span className="text-xs font-bold text-on-surface">Dr. Ricardo Silva</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-secondary font-bold uppercase">Reading Time</span>
                  <span className="text-xs font-bold text-on-surface">12 min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-secondary font-bold uppercase">Attachments</span>
                  <span className="text-xs font-bold text-on-surface">3 PDF</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-low p-6 rounded-xl space-y-4">
              <h3 className="font-headline text-xs font-black text-on-surface uppercase tracking-widest">Related Concepts</h3>
              <div className="flex flex-wrap gap-2">
                {['Microservices', 'Docker', 'Kubernetes', 'CI/CD'].map(concept => (
                  <span 
                    key={concept}
                    className="px-2 py-1 bg-white text-[10px] font-bold rounded border border-outline cursor-pointer hover:border-primary transition-colors"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
}
