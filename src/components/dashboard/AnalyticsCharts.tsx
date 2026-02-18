import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';

interface SeverityChartProps {
  data: { severity: string; count: number }[];
}

interface WaitTrendChartProps {
  data: { time: string; avg: number }[];
}

interface PriorityDistChartProps {
  data: { range: string; count: number }[];
}

const severityColorMap: Record<string, string> = {
  Critical: 'hsl(0, 84%, 60%)',
  High: 'hsl(38, 92%, 50%)',
  Moderate: 'hsl(187, 80%, 48%)',
  Low: 'hsl(142, 71%, 45%)',
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
      <p className="text-xs font-medium text-foreground">{label}</p>
      <p className="text-xs font-mono text-primary">{payload[0].value}</p>
    </div>
  );
};

export function SeverityChart({ data }: SeverityChartProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        Severity Distribution
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barSize={32}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
          <XAxis dataKey="severity" tick={{ fontSize: 11, fill: 'hsl(215, 20%, 55%)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'hsl(215, 20%, 55%)' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="count"
            radius={[4, 4, 0, 0]}
            fill="hsl(187, 80%, 48%)"
            shape={(props: any) => {
              const fill = severityColorMap[props.severity] || 'hsl(187, 80%, 48%)';
              return <rect {...props} fill={fill} />;
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function WaitTrendChart({ data }: WaitTrendChartProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        Avg Wait Time Trend
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="waitGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(187, 80%, 48%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(187, 80%, 48%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
          <XAxis dataKey="time" tick={{ fontSize: 10, fill: 'hsl(215, 20%, 55%)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'hsl(215, 20%, 55%)' }} axisLine={false} tickLine={false} unit="m" />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="avg" stroke="hsl(187, 80%, 48%)" fill="url(#waitGradient)" strokeWidth={2} dot={{ r: 3, fill: 'hsl(187, 80%, 48%)' }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PriorityDistChart({ data }: PriorityDistChartProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        Priority Score Distribution
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barSize={40}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
          <XAxis dataKey="range" tick={{ fontSize: 11, fill: 'hsl(215, 20%, 55%)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'hsl(215, 20%, 55%)' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" radius={[4, 4, 0, 0]} fill="hsl(187, 80%, 48%)" fillOpacity={0.7} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
