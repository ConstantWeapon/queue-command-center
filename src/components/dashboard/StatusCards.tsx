import { Users, AlertTriangle, Clock, Stethoscope, Activity } from 'lucide-react';
import { QueueMetrics } from '@/lib/queue-data';

interface StatusCardsProps {
  metrics: QueueMetrics;
}

export function StatusCards({ metrics }: StatusCardsProps) {
  const cards = [
    {
      label: 'Total in Queue',
      value: metrics.totalInQueue,
      icon: Users,
      accent: 'text-primary',
      glowClass: 'glow-primary',
    },
    {
      label: 'Critical Cases',
      value: metrics.criticalCount,
      icon: AlertTriangle,
      accent: 'text-critical',
      glowClass: metrics.criticalCount > 0 ? 'glow-critical' : '',
    },
    {
      label: 'Avg Wait Time',
      value: `${metrics.avgWaitTime}m`,
      icon: Clock,
      accent: metrics.avgWaitTime > 25 ? 'text-warning' : 'text-primary',
      glowClass: metrics.avgWaitTime > 25 ? 'glow-warning' : '',
    },
    {
      label: 'In Consultation',
      value: metrics.inConsultation,
      icon: Stethoscope,
      accent: 'text-success',
      glowClass: 'glow-success',
    },
    {
      label: 'System Load',
      value: metrics.systemLoad,
      icon: Activity,
      accent: metrics.systemLoad === 'High' ? 'text-critical' : metrics.systemLoad === 'Moderate' ? 'text-warning' : 'text-success',
      glowClass: metrics.systemLoad === 'High' ? 'glow-critical' : '',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {cards.map((card) => (
        <div key={card.label} className={`metric-card ${card.glowClass}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {card.label}
            </span>
            <card.icon className={`h-4 w-4 ${card.accent}`} />
          </div>
          <div className={`text-2xl font-bold font-mono ${card.accent} animate-count`}>
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
}
