import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from 'lucide-react';

interface Props {
  value?: number;
  onChange: (value: number) => void;
}

const QuestionOperationTime = ({ value, onChange }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Calendar className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">How long have you been in operation?</h2>
          <p className="text-muted-foreground">Number of months since you started</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="months">Months in Operation</Label>
        <Input
          id="months"
          type="number"
          placeholder="e.g., 24"
          value={value || ''}
          onChange={(e) => onChange(Number(e.target.value))}
          className="text-lg h-12"
          min="0"
        />
        <p className="text-sm text-muted-foreground">
          {value && value >= 12 ? `That's ${Math.floor(value / 12)} year${Math.floor(value / 12) > 1 ? 's' : ''} and ${value % 12} month${value % 12 !== 1 ? 's' : ''}` : ''}
        </p>
      </div>
    </div>
  );
};

export default QuestionOperationTime;
