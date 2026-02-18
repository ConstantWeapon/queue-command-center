import { ActivityEvent } from '@/lib/queue-data';
import { UserPlus, Stethoscope, CheckCircle, AlertTriangle } from 'lucide-react';

interface ActivityFeedProps {
  events: ActivityEvent[];
}

const iconMap = {
  added: UserPlus,
  consultation: Stethoscope,
  completed: CheckCircle,
  alert: AlertTriangle,
};

const colorMap = {
  added: 'text-primary',
  consultation: 'text-warning',
  completed: 'text-success',
  alert: 'text-critical',
};

export function ActivityFeed({ events }: ActivityFeedProps) {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="p-4 border-b border-border">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Activity Feed
        </h3>
      </div>
      <div className="max-h-64 overflow-y-auto scrollbar-thin p-2">
        {events.length === 0 && (
          <p className="text-xs text-muted-foreground p-4 text-center">No recent activity</p>
        )}
        {events.map((event) => {
          const Icon = iconMap[event.type];
          return (
            <div key={event.id} className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/20 transition-colors fade-up">
              <div className={`mt-0.5 ${colorMap[event.type]}`}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground leading-relaxed">{event.message}</p>
                <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
                  {event.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
