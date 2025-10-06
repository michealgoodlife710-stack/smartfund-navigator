import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DollarSign } from 'lucide-react';

interface Props {
  value?: number;
  onChange: (value: number) => void;
}

const QuestionRevenue = ({ value, onChange }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <DollarSign className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">What is your annual revenue?</h2>
          <p className="text-muted-foreground">Your business's total yearly revenue</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="revenue">Annual Revenue (USD)</Label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="revenue"
            type="number"
            placeholder="e.g., 50000"
            value={value || ''}
            onChange={(e) => onChange(Number(e.target.value))}
            className="pl-10 text-lg h-12"
            min="0"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionRevenue;
