export type Severity = 'Critical' | 'High' | 'Moderate' | 'Low';
export type PatientStatus = 'Waiting' | 'In Consultation' | 'Completed';

export interface Patient {
  id: string;
  name: string;
  age: number;
  severity: Severity;
  confidence: number;
  priorityScore: number;
  waitTime: number; // minutes
  status: PatientStatus;
  symptoms: string;
  addedAt: Date;
}

export interface ActivityEvent {
  id: string;
  message: string;
  type: 'added' | 'consultation' | 'completed' | 'alert';
  timestamp: Date;
}

export interface QueueMetrics {
  totalInQueue: number;
  criticalCount: number;
  avgWaitTime: number;
  inConsultation: number;
  systemLoad: 'Low' | 'Moderate' | 'High';
}

const firstNames = ['Aisha', 'Raj', 'Maria', 'James', 'Fatima', 'Chen', 'Olga', 'David', 'Priya', 'Ahmed', 'Sofia', 'Kwame', 'Yuki', 'Carlos', 'Elena'];
const lastNames = ['Patel', 'Kim', 'Santos', 'Okafor', 'Müller', 'Ali', 'Tanaka', 'Silva', 'Nguyen', 'García', 'Johansson', 'Ibrahim', 'Kowalski', 'Lee', 'Brown'];
const symptomsList = [
  'Chest pain, shortness of breath',
  'Severe headache, blurred vision',
  'Abdominal pain, nausea',
  'High fever, cough',
  'Dizziness, fatigue',
  'Back pain, numbness',
  'Allergic reaction, swelling',
  'Joint pain, limited mobility',
  'Skin rash, itching',
  'Difficulty breathing',
  'Persistent vomiting',
  'Irregular heartbeat',
];

let idCounter = 0;

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generatePatient(overrides?: Partial<Patient>): Patient {
  idCounter++;
  const severity = randomFrom<Severity>(['Critical', 'High', 'Moderate', 'Low']);
  const severityBase = { Critical: 90, High: 70, Moderate: 45, Low: 20 }[severity];
  const confidence = Math.round(75 + Math.random() * 25);
  const priorityScore = Math.round(severityBase + Math.random() * 10 - 5);
  const waitTime = Math.round(Math.random() * 60 + 2);

  return {
    id: `P-${String(idCounter).padStart(4, '0')}`,
    name: `${randomFrom(firstNames)} ${randomFrom(lastNames)}`,
    age: Math.round(18 + Math.random() * 65),
    severity,
    confidence,
    priorityScore: Math.min(100, Math.max(0, priorityScore)),
    waitTime,
    status: 'Waiting',
    symptoms: randomFrom(symptomsList),
    addedAt: new Date(Date.now() - waitTime * 60000),
    ...overrides,
  };
}

export function generateInitialQueue(count = 12): Patient[] {
  const patients: Patient[] = [];
  // Ensure at least 2 critical
  patients.push(generatePatient({ severity: 'Critical', priorityScore: 95, waitTime: 5 }));
  patients.push(generatePatient({ severity: 'Critical', priorityScore: 91, waitTime: 8 }));
  patients.push(generatePatient({ severity: 'High', priorityScore: 78, waitTime: 12 }));
  patients.push(generatePatient({ severity: 'High', priorityScore: 72, waitTime: 18 }));
  for (let i = patients.length; i < count; i++) {
    patients.push(generatePatient());
  }
  // Set one in consultation
  patients[0].status = 'In Consultation';
  return patients.sort((a, b) => b.priorityScore - a.priorityScore);
}

export function computeMetrics(patients: Patient[]): QueueMetrics {
  const waiting = patients.filter(p => p.status === 'Waiting');
  const critical = waiting.filter(p => p.severity === 'Critical');
  const inConsultation = patients.filter(p => p.status === 'In Consultation');
  const avgWait = waiting.length > 0
    ? Math.round(waiting.reduce((s, p) => s + p.waitTime, 0) / waiting.length)
    : 0;
  const load = waiting.length > 15 ? 'High' : waiting.length > 8 ? 'Moderate' : 'Low';

  return {
    totalInQueue: waiting.length,
    criticalCount: critical.length,
    avgWaitTime: avgWait,
    inConsultation: inConsultation.length,
    systemLoad: load,
  };
}

export function generateNewPatient(): Patient {
  return generatePatient();
}

export function createActivityEvent(message: string, type: ActivityEvent['type']): ActivityEvent {
  return {
    id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    message,
    type,
    timestamp: new Date(),
  };
}

export function getWaitTimeTrend(): { time: string; avg: number }[] {
  const now = new Date();
  return Array.from({ length: 10 }, (_, i) => {
    const t = new Date(now.getTime() - (9 - i) * 5 * 60000);
    return {
      time: t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avg: Math.round(8 + Math.random() * 20 + i * 1.5),
    };
  });
}

export function getSeverityDistribution(patients: Patient[]): { severity: string; count: number }[] {
  const map: Record<string, number> = { Critical: 0, High: 0, Moderate: 0, Low: 0 };
  patients.filter(p => p.status !== 'Completed').forEach(p => { map[p.severity]++; });
  return Object.entries(map).map(([severity, count]) => ({ severity, count }));
}

export function getPriorityDistribution(patients: Patient[]): { range: string; count: number }[] {
  const bins = [
    { range: '0-20', min: 0, max: 20 },
    { range: '21-40', min: 21, max: 40 },
    { range: '41-60', min: 41, max: 60 },
    { range: '61-80', min: 61, max: 80 },
    { range: '81-100', min: 81, max: 100 },
  ];
  return bins.map(b => ({
    range: b.range,
    count: patients.filter(p => p.status !== 'Completed' && p.priorityScore >= b.min && p.priorityScore <= b.max).length,
  }));
}
