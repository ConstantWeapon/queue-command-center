import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Patient,
  ActivityEvent,
  generateInitialQueue,
  computeMetrics,
  generateNewPatient,
  createActivityEvent,
  getWaitTimeTrend,
  getSeverityDistribution,
  getPriorityDistribution,
} from '@/lib/queue-data';

export function useQueueSimulation() {
  const [patients, setPatients] = useState<Patient[]>(() => generateInitialQueue(12));
  const [events, setEvents] = useState<ActivityEvent[]>(() => [
    createActivityEvent('System initialized — AI triage active', 'alert'),
  ]);
  const [waitTrend, setWaitTrend] = useState(getWaitTimeTrend);
  const tickRef = useRef(0);

  const addEvent = useCallback((msg: string, type: ActivityEvent['type']) => {
    setEvents((prev) => [createActivityEvent(msg, type), ...prev].slice(0, 30));
  }, []);

  const startConsultation = useCallback((id: string) => {
    setPatients((prev) => {
      const p = prev.find((x) => x.id === id);
      if (!p || p.status !== 'Waiting') return prev;
      addEvent(`${p.name} moved to consultation`, 'consultation');
      return prev.map((x) => (x.id === id ? { ...x, status: 'In Consultation' as const } : x));
    });
  }, [addEvent]);

  const completePatient = useCallback((id: string) => {
    setPatients((prev) => {
      const p = prev.find((x) => x.id === id);
      if (!p || p.status !== 'In Consultation') return prev;
      addEvent(`${p.name} consultation completed`, 'completed');
      return prev.map((x) => (x.id === id ? { ...x, status: 'Completed' as const } : x));
    });
  }, [addEvent]);

  // Simulation tick every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      tickRef.current++;

      // Increment wait times
      setPatients((prev) =>
        prev.map((p) =>
          p.status === 'Waiting' ? { ...p, waitTime: p.waitTime + 1 } : p
        )
      );

      // Every 3rd tick, add a new patient
      if (tickRef.current % 3 === 0) {
        const newP = generateNewPatient();
        setPatients((prev) => [...prev, newP].sort((a, b) => b.priorityScore - a.priorityScore));
        addEvent(`${newP.name} added (${newP.severity} severity)`, 'added');
      }

      // Update wait trend
      setWaitTrend(getWaitTimeTrend());
    }, 5000);

    return () => clearInterval(interval);
  }, [addEvent]);

  const metrics = computeMetrics(patients);
  const severityDist = getSeverityDistribution(patients);
  const priorityDist = getPriorityDistribution(patients);

  return {
    patients,
    metrics,
    events,
    waitTrend,
    severityDist,
    priorityDist,
    startConsultation,
    completePatient,
  };
}
