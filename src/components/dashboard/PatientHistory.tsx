import { Patient, Severity } from '@/lib/queue-data';
import { Badge } from '@/components/ui/badge';
import { History } from 'lucide-react';

interface PatientHistoryProps {
  patients: Patient[];
}

const severityColors: Record<Severity, string> = {
  Critical: 'bg-critical/15 text-critical border-critical/30',
  High: 'bg-warning/15 text-warning border-warning/30',
  Moderate: 'bg-primary/15 text-primary border-primary/30',
  Low: 'bg-success/15 text-success border-success/30',
};

export function PatientHistory({ patients }: PatientHistoryProps) {
  const completed = patients.filter(p => p.status === 'Completed');

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-4 border-b border-border flex items-center gap-2">
        <History className="h-3.5 w-3.5 text-muted-foreground" />
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Patient History
        </h3>
        <span className="ml-auto text-xs font-mono text-muted-foreground">{completed.length} completed</span>
      </div>
      {completed.length === 0 ? (
        <p className="text-xs text-muted-foreground p-6 text-center">No completed patients yet</p>
      ) : (
        <div className="max-h-64 overflow-y-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Patient</th>
                <th className="text-left px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Severity</th>
                <th className="text-left px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {completed.map((patient) => (
                <tr key={patient.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-2">
                    <div className="font-medium text-foreground text-sm">{patient.name}</div>
                    <div className="text-xs text-muted-foreground">Age {patient.age}</div>
                  </td>
                  <td className="px-4 py-2">
                    <Badge variant="outline" className={`${severityColors[patient.severity]} text-xs font-mono`}>
                      {patient.severity}
                    </Badge>
                  </td>
                  <td className="px-4 py-2">
                    <Badge variant="outline" className="bg-success/15 text-success border-success/30 text-xs">
                      Completed
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
