import { Switch } from '@/components/ui/switch';
import { Stethoscope } from 'lucide-react';

interface DoctorStatusProps {
  isReady: boolean;
  onToggle: (ready: boolean) => void;
}

export function DoctorStatus({ isReady, onToggle }: DoctorStatusProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
        <Stethoscope className="h-3.5 w-3.5 text-primary" />
        Doctor Status
      </h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`h-3 w-3 rounded-full ${isReady ? 'bg-success animate-pulse' : 'bg-critical'}`} />
          <span className={`text-sm font-semibold ${isReady ? 'text-success' : 'text-critical'}`}>
            {isReady ? 'Ready' : 'Busy'}
          </span>
        </div>
        <Switch checked={isReady} onCheckedChange={onToggle} />
      </div>
      <p className="text-[10px] text-muted-foreground mt-2 font-mono">
        {isReady ? 'Accepting new patients' : 'Not accepting patients'}
      </p>
    </div>
  );
}
