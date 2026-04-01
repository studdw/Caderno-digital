import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
  onCreate: (subject: { name: string; description: string; icon: string; color: string }) => void;
}

export default function NewSubjectModal({ onClose, onCreate }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('code');
  const [color, setColor] = useState('#10b981');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate({ name, description, icon, color });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-hidden"
      >
        <div className="p-6 border-b border-outline flex items-center justify-between">
          <h2 className="text-xl font-bold font-headline">Nova Matéria</h2>
          <button onClick={onClose} className="p-2 hover:bg-surface-low rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <input 
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full bg-transparent border-none focus:ring-0 font-headline font-extrabold text-2xl text-on-surface p-0 placeholder-zinc-300"
            placeholder="Nome da matéria..."
            required
          />
          <textarea 
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full bg-transparent border-none focus:ring-0 font-sans text-lg text-on-surface p-0 placeholder-zinc-400 resize-none min-h-[100px]"
            placeholder="Descrição da matéria..."
          />
          <div className="flex gap-4 items-center">
            <label className="text-xs font-bold">Ícone:</label>
            <select value={icon} onChange={e => setIcon(e.target.value)} className="border rounded px-2 py-1">
              <option value="code">Code</option>
              <option value="terminal">Terminal</option>
              <option value="database">Database</option>
              <option value="coffee">Coffee</option>
              <option value="engineering">Engineering</option>
              <option value="smart_toy">Bot</option>
            </select>
            <label className="text-xs font-bold ml-4">Cor:</label>
            <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-8 h-8 p-0 border-none" />
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-6 py-2 text-secondary font-headline text-sm font-bold uppercase tracking-widest hover:text-on-surface transition-colors">
              Cancelar
            </button>
            <button type="submit" className="px-8 py-2 bg-primary text-white rounded-lg font-headline text-sm font-bold uppercase tracking-widest shadow-sm active:scale-95 transition-transform">
              Criar Matéria
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
