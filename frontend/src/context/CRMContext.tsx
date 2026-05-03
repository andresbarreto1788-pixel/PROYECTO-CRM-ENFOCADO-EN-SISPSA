import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Afiliado } from '@/data/afiliadosData';
import type { ProspectCard, PipelineStageId } from '@/data/pipelineData';
import type { CalendarEvent } from '@/data/agendaData';

interface CRMContextType {
  afiliados: Afiliado[];
  prospects: ProspectCard[];
  events: CalendarEvent[];
  
  // Actions
  addAfiliado: (afiliado: Afiliado) => void;
  updateAfiliado: (id: string, data: Partial<Afiliado>) => void;
  deleteAfiliado: (id: string) => void;
  
  addProspect: (prospect: ProspectCard) => void;
  moveProspect: (id: string, stageId: PipelineStageId) => void;
  updateProspect: (id: string, data: Partial<ProspectCard>) => void;
  deleteProspect: (id: string) => void;
  reorderProspects: (reordered: ProspectCard[]) => void;
  
  addEvent: (event: CalendarEvent) => void;
  toggleEventCompleted: (id: string) => void;
  deleteEvent: (id: string) => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export const CRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state from LocalStorage
  const [afiliados, setAfiliados] = useState<Afiliado[]>(() => {
    const saved = localStorage.getItem('crm_afiliados');
    return saved ? JSON.parse(saved) : [];
  });

  const [prospects, setProspects] = useState<ProspectCard[]>(() => {
    const saved = localStorage.getItem('crm_prospects');
    return saved ? JSON.parse(saved) : [];
  });

  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    const saved = localStorage.getItem('crm_events');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('crm_afiliados', JSON.stringify(afiliados));
  }, [afiliados]);

  useEffect(() => {
    localStorage.setItem('crm_prospects', JSON.stringify(prospects));
  }, [prospects]);

  useEffect(() => {
    localStorage.setItem('crm_events', JSON.stringify(events));
  }, [events]);

  // --- Afiliados Actions ---
  const addAfiliado = (newAfiliado: Afiliado) => {
    setAfiliados(prev => [newAfiliado, ...prev]);
  };

  const updateAfiliado = (id: string, data: Partial<Afiliado>) => {
    setAfiliados(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
  };

  const deleteAfiliado = (id: string) => {
    setAfiliados(prev => prev.filter(a => a.id !== id));
  };

  // --- Pipeline Actions ---
  const addProspect = (newProspect: ProspectCard) => {
    setProspects(prev => [newProspect, ...prev]);
  };

  const moveProspect = (id: string, stageId: PipelineStageId) => {
    setProspects(prev => prev.map(p => p.id === id ? { ...p, stageId } : p));
  };

  const updateProspect = (id: string, data: Partial<ProspectCard>) => {
    setProspects(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  };

  const deleteProspect = (id: string) => {
    setProspects(prev => prev.filter(p => p.id !== id));
  };

  const reorderProspects = (reordered: ProspectCard[]) => {
    setProspects(reordered);
  };

  // --- Agenda Actions ---
  const addEvent = (newEvent: CalendarEvent) => {
    setEvents(prev => [newEvent, ...prev]);
  };

  const toggleEventCompleted = (id: string) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, completed: !e.completed } : e));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  return (
    <CRMContext.Provider value={{
      afiliados,
      prospects,
      events,
      addAfiliado,
      updateAfiliado,
      deleteAfiliado,
      addProspect,
      moveProspect,
      updateProspect,
      deleteProspect,
      reorderProspects,
      addEvent,
      toggleEventCompleted,
      deleteEvent
    }}>
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) throw new Error('useCRM must be used within a CRMProvider');
  return context;
};
