import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Banknote } from 'lucide-react';

interface Props {
  value?: number;
  onChange: (value: number) => void;
}

const QuestionAmount = ({ value, onChange }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Banknote className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">How much funding do you need?</h2>
          <p className="text-muted-foreground">Your target funding amount</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="amount">Funding Amount (USD)</Label>
        <div className="relative">
          <span className="absolute left-3 top-3 text-muted-foreground">$</span>
          <Input
            id="amount"
            type="number"
            placeholder="e.g., 100000"
            value={value || ''}
            onChange={(e) => onChange(Number(e.target.value))}
            className="pl-8 text-lg h-12"
            min="0"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionAmount;
