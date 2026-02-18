import { Patient, Severity, PatientStatus } from '@/lib/queue-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, CheckCircle2 } from 'lucide-react';

interface QueueTableProps {
  patients: Patient[];
  onStartConsultation: (id: string) => void;
  onComplete: (id: string) => void;
}

const severityColors: Record<Severity, string> = {
  Critical: 'bg-critical/15 text-critical border-critical/30',
  High: 'bg-warning/15 text-warning border-warning/30',
  Moderate: 'bg-primary/15 text-primary border-primary/30',
  Low: 'bg-success/15 text-success border-success/30',
};

const statusColors: Record<PatientStatus, string> = {
  Waiting: 'bg-muted text-muted-foreground',
  'In Consultation': 'bg-primary/15 text-primary border-primary/30',
  Completed: 'bg-success/15 text-success border-success/30',
};

export function QueueTable({ patients, onStartConsultation, onComplete }: QueueTableProps) {
  const activePatients = patients.filter(p => p.status !== 'Completed');
  const nextPatient = activePatients.find(p => p.status === 'Waiting');

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Live Queue
        </h2>
        <span className="text-xs font-mono text-primary pulse-dot pr-4">
          LIVE
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">#</th>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Patient</th>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Severity</th>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Confidence</th>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Priority</th>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Wait</th>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {activePatients.map((patient, idx) => {
              const isNext = patient.id === nextPatient?.id;
              return (
                <tr
                  key={patient.id}
                  className={`border-b border-border/50 transition-colors ${
                    isNext ? 'next-patient-glow' : 'hover:bg-muted/20'
                  } ${patient.status === 'In Consultation' ? 'bg-primary/5' : ''}`}
                >
                  <td className="px-4 py-3 font-mono text-muted-foreground text-xs">
                    {idx + 1}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{patient.name}</div>
                    <div className="text-xs text-muted-foreground">Age {patient.age} · {patient.symptoms.split(',')[0]}</div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={`${severityColors[patient.severity]} text-xs font-mono`}>
                      {patient.severity}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 font-mono text-sm">
                    {patient.confidence}%
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${patient.priorityScore}%`,
                            backgroundColor: patient.priorityScore > 80
                              ? 'hsl(var(--critical))'
                              : patient.priorityScore > 60
                              ? 'hsl(var(--warning))'
                              : 'hsl(var(--primary))',
                          }}
                        />
                      </div>
                      <span className="font-mono text-sm font-semibold">{patient.priorityScore}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-sm text-muted-foreground">
                    {patient.waitTime}m
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={`${statusColors[patient.status]} text-xs`}>
                      {patient.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    {patient.status === 'Waiting' && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs text-primary hover:bg-primary/10"
                        onClick={() => onStartConsultation(patient.id)}
                      >
                        <Play className="h-3 w-3 mr-1" /> Start
                      </Button>
                    )}
                    {patient.status === 'In Consultation' && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs text-success hover:bg-success/10"
                        onClick={() => onComplete(patient.id)}
                      >
                        <CheckCircle2 className="h-3 w-3 mr-1" /> Done
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
