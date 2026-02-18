import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { UserPlus } from 'lucide-react';
import { Severity } from '@/lib/queue-data';

interface AddPatientFormProps {
  onAdd: (data: { name: string; age: number; symptoms: string; severity: Severity }) => void;
}

export function AddPatientForm({ onAdd }: AddPatientFormProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [severity, setSeverity] = useState<Severity | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age || !symptoms || !severity) return;
    onAdd({ name, age: Number(age), symptoms, severity });
    setName('');
    setAge('');
    setSymptoms('');
    setSeverity('');
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
        <UserPlus className="h-3.5 w-3.5 text-primary" />
        Add Patient
      </h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="h-8 text-sm bg-muted/30 border-border"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Age</Label>
            <Input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              min={0}
              max={120}
              className="h-8 text-sm bg-muted/30 border-border"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Severity</Label>
          <Select value={severity} onValueChange={(v) => setSeverity(v as Severity)}>
            <SelectTrigger className="h-8 text-sm bg-muted/30 border-border">
              <SelectValue placeholder="Select severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Critical">Critical</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Moderate">Moderate</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Symptoms</Label>
          <Textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Describe symptoms..."
            className="text-sm bg-muted/30 border-border min-h-[60px] resize-none"
          />
        </div>
        <Button
          type="submit"
          size="sm"
          className="w-full h-8 text-xs font-semibold"
          disabled={!name || !age || !symptoms || !severity}
        >
          <UserPlus className="h-3 w-3 mr-1.5" />
          Add to Queue
        </Button>
      </form>
    </div>
  );
}
