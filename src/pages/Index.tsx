import { useState } from 'react';
import { StatusCards } from '@/components/dashboard/StatusCards';
import { QueueTable } from '@/components/dashboard/QueueTable';
import { SeverityChart, WaitTrendChart } from '@/components/dashboard/AnalyticsCharts';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { AddPatientForm } from '@/components/dashboard/AddPatientForm';
import { PatientHistory } from '@/components/dashboard/PatientHistory';
import { DoctorStatus } from '@/components/dashboard/DoctorStatus';
import { useQueueSimulation } from '@/hooks/use-queue-simulation';
import { Activity } from 'lucide-react';

const Index = () => {
  const {
    patients,
    metrics,
    events,
    waitTrend,
    severityDist,
    startConsultation,
    completePatient,
    addPatient,
  } = useQueueSimulation();

  const [doctorReady, setDoctorReady] = useState(true);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 glow-primary">
          <Activity className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground tracking-tight">
            AI Telemedicine Queue Monitor
          </h1>
          <p className="text-xs text-muted-foreground font-mono">
            Real-time triage & priority dashboard
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-mono text-success">System Online</span>
        </div>
      </div>

      {/* Status Cards */}
      <div className="mb-6">
        <StatusCards metrics={metrics} />
      </div>

      {/* Charts + Sidebar */}
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <SeverityChart data={severityDist} />
        <WaitTrendChart data={waitTrend} />
        <div className="flex flex-col gap-4">
          <DoctorStatus isReady={doctorReady} onToggle={setDoctorReady} />
          <AddPatientForm onAdd={addPatient} />
        </div>
      </div>

      {/* Queue Table */}
      <div className="mb-6">
        <QueueTable
          patients={patients}
          onStartConsultation={startConsultation}
          onComplete={completePatient}
        />
      </div>

      {/* History + Activity Feed */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PatientHistory patients={patients} />
        <ActivityFeed events={events} />
      </div>
    </div>
  );
};

export default Index;
