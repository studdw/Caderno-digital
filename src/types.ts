export interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
  notesCount: number;
  classesCount: number;
  color: string;
  featured?: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
  subjectId: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  daysLeft: number;
  category: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  time: string;
  duration: string;
  description: string;
  subjectId: string;
  type: 'lecture' | 'lab' | 'exam' | 'presentation';
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  isOnline?: boolean;
}
