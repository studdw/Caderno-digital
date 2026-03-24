import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, Clock, Edit2, Save, X, Wifi, MapPin } from 'lucide-react';
import { SCHEDULE_EVENTS, SUBJECTS } from '../constants';

interface EditingState {
  eventId: string | null;
  field: 'title' | 'description' | null;
}

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;

export default function Schedule() {
  const [events, setEvents] = useState(SCHEDULE_EVENTS);
  const [editing, setEditing] = useState<EditingState>({ eventId: null, field: null });
  const [editValues, setEditValues] = useState<{ [key: string]: string }>({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleEditStart = useCallback((eventId: string, field: 'title' | 'description', currentValue: string) => {
    setEditing({ eventId, field });
    setEditValues({ ...editValues, [eventId]: currentValue });
  }, [editValues]);

  const handleEditCancel = useCallback(() => {
    setEditing({ eventId: null, field: null });
    setEditValues({});
  }, []);

  const handleEditSave = useCallback((eventId: string) => {
    const field = editing.field;
    const newValue = editValues[eventId];

    if (!newValue || newValue.trim() === '') {
      alert('O campo não pode estar vazio!');
      return;
    }

    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId
          ? { ...event, [field]: newValue.trim() }
          : event
      )
    );

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
    handleEditCancel();
  }, [editing.field, editValues, handleEditCancel]);

  const getSubjectColor = (subjectId: string) => {
    const subject = SUBJECTS.find(s => s.id === subjectId);
    return subject?.color || '#bb0013';
  };

  const getSubjectName = (subjectId: string) => {
    const subject = SUBJECTS.find(s => s.id === subjectId);
    return subject?.name || 'Unknown';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 pb-20"
    >
      {/* Hero Section */}
      <section className="relative h-[280px] w-full overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        <div className="relative h-full flex items-end">
          <div className="px-12 pb-12 max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <CalendarIcon size={24} className="text-primary" />
              </div>
              <span className="text-xs font-bold tracking-widest uppercase text-primary">Plano Academico</span>
            </div>
            <h1 className="text-5xl font-black font-headline tracking-tighter text-on-surface mb-2">
              Calendário Semanal
            </h1>
            <p className="text-secondary font-medium max-w-2xl">
              Gerencie suas turmas com total controle. Clique no título ou na descrição de qualquer turma para editar. 
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="px-12 py-12 -mt-6 relative z-10">
        {/* Save Notification */}
        <AnimatePresence>
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium text-green-700">Changes saved successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Weekly Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {WEEKDAYS.map((day, dayIndex) => {
            const dayEvents = events.filter(e => e.day === day);
            const isOnlineDay = day === 'Tuesday' || day === 'Friday';

            return (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: dayIndex * 0.1 }}
                className="flex flex-col"
              >
                {/* Day Header */}
                <div
                  className={`
                    p-4 rounded-t-xl border-b-2 text-center mb-0
                    ${isOnlineDay
                      ? 'bg-gradient-to-br from-blue-50 to-blue-50/50 border-blue-300'
                      : 'bg-gradient-to-br from-surface-low to-surface-low/50 border-outline'
                    }
                  `}
                >
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-2xl font-black font-headline text-on-surface">
                      {day.slice(0, 3)}
                    </span>
                    {isOnlineDay && (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="p-1.5 bg-blue-100 rounded-full"
                      >
                        <Wifi size={14} className="text-blue-600" />
                      </motion.div>
                    )}
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-secondary">
                    {isOnlineDay ? 'ONLINE' : 'Presencial'}
                  </p>
                </div>

                {/* Classes */}
                <div className={`flex-1 space-y-3 p-4 rounded-b-xl border-2 border-t-0 ${
                  isOnlineDay ? 'border-blue-200 bg-blue-50/30' : 'border-outline bg-white'
                }`}>
                  {dayEvents.map((event, eventIndex) => {
                    const isEditing = editing.eventId === event.id;
                    const subjectColor = getSubjectColor(event.subjectId);

                    return (
                      <motion.div
                        key={event.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: eventIndex * 0.05 }}
                        className="group"
                      >
                        <div className={`
                          rounded-lg p-4 space-y-3 transition-all duration-200
                          ${isEditing ? 'bg-primary/5 ring-2 ring-primary' : 'bg-white border border-outline hover:border-primary/30 hover:bg-white'}
                        `}>
                          {/* Time and Type */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <Clock size={14} className="text-secondary" />
                              <span className="text-xs font-bold text-secondary">{event.time}</span>
                              <span className="text-[10px] font-medium text-secondary/60">({event.duration})</span>
                            </div>
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: subjectColor }}
                              title={getSubjectName(event.subjectId)}
                            />
                          </div>

                          {/* Title - Editable */}
                          {isEditing && editing.field === 'title' ? (
                            <input
                              autoFocus
                              value={editValues[event.id] || ''}
                              onChange={(e) => setEditValues({ ...editValues, [event.id]: e.target.value })}
                              className="w-full text-sm font-bold text-on-surface bg-white border border-primary rounded px-2 py-1 focus:ring-2 focus:ring-primary/50 outline-none"
                              placeholder="Edit class name..."
                            />
                          ) : (
                            <p
                              onClick={() => handleEditStart(event.id, 'title', event.title)}
                              className="text-sm font-bold text-on-surface line-clamp-2 cursor-pointer hover:text-primary transition-colors"
                              title="Click to edit"
                            >
                              {event.title}
                            </p>
                          )}

                          {/* Description - Editable */}
                          {isEditing && editing.field === 'description' ? (
                            <textarea
                              autoFocus
                              value={editValues[event.id] || ''}
                              onChange={(e) => setEditValues({ ...editValues, [event.id]: e.target.value })}
                              rows={3}
                              className="w-full text-[11px] text-secondary bg-white border border-primary rounded px-2 py-1 focus:ring-2 focus:ring-primary/50 outline-none resize-none font-sans"
                              placeholder="Edit description..."
                            />
                          ) : (
                            <p
                              onClick={() => handleEditStart(event.id, 'description', event.description)}
                              className="text-[11px] text-secondary leading-relaxed line-clamp-2 cursor-pointer hover:text-on-surface transition-colors"
                              title="Click to edit"
                            >
                              {event.description}
                            </p>
                          )}

                          {/* Edit Controls */}
                          {isEditing ? (
                            <div className="flex gap-2 pt-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleEditSave(event.id)}
                                className="flex-1 flex items-center justify-center gap-1 text-[10px] font-bold bg-primary text-white rounded px-3 py-2 hover:bg-primary-hover transition-colors"
                              >
                                <Save size={12} />
                                Save
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleEditCancel}
                                className="px-3 py-2 text-[10px] font-bold text-secondary border border-outline rounded hover:border-primary/50 transition-colors"
                              >
                                <X size={12} />
                              </motion.button>
                            </div>
                          ) : (
                            <div className="flex gap-1 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleEditStart(event.id, 'title', event.title)}
                                className="p-1.5 text-secondary hover:text-primary hover:bg-primary/5 rounded transition-colors"
                                title="Edit title"
                              >
                                <Edit2 size={12} />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleEditStart(event.id, 'description', event.description)}
                                className="p-1.5 text-secondary hover:text-primary hover:bg-primary/5 rounded transition-colors"
                                title="Edit description"
                              >
                                <Edit2 size={12} />
                              </motion.button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}

                  {dayEvents.length === 0 && (
                    <div className="text-center py-6">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-secondary/50">
                        No classes
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Legend and Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Info Box 1 */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-50/50 p-6 rounded-xl border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-blue-100 rounded-lg">
                <Wifi size={18} className="text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-on-surface mb-1">Aulas Online</h4>
                <p className="text-sm text-secondary font-medium">As aulas de TERÇA e SEXTA são onlines através de videoconferência.</p>
              </div>
            </div>
          </div>

          {/* Info Box 2 */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/5 p-6 rounded-xl border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-primary/10 rounded-lg">
                <Edit2 size={18} className="text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-on-surface mb-1">Editar Turmas</h4>
                <p className="text-sm text-secondary font-medium">Passe o mouse sobre qualquer cartão de turma e clique no ícone de edição para modificar o título ou descrição a qualquer momento.</p>
              </div>
            </div>
          </div>

          {/* Info Box 3 */}
          <div className="bg-gradient-to-br from-green-50 to-green-50/50 p-6 rounded-xl border border-green-200">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-green-100 rounded-lg">
                <MapPin size={18} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-bold text-on-surface mb-1">Detalhes da Turma</h4>
                <p className="text-sm text-secondary font-medium">Cada turma mostra horário, duração, assunto e uma descrição editável para suas anotações.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
