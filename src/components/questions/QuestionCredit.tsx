import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard } from 'lucide-react';

interface Props {
  value?: number;
  onChange: (value: number) => void;
}

const QuestionCredit = ({ value, onChange }: Props) => {
  const getRating = (score: number) => {
    if (score >= 750) return { text: 'Excellent', color: 'text-green-600' };
    if (score >= 700) return { text: 'Good', color: 'text-blue-600' };
    if (score >= 650) return { text: 'Fair', color: 'text-yellow-600' };
    if (score >= 600) return { text: 'Poor', color: 'text-orange-600' };
    return { text: 'Very Poor', color: 'text-red-600' };
  };

  const rating = value ? getRating(value) : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <CreditCard className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">What is your credit score?</h2>
          <p className="text-muted-foreground">Personal or business credit score (FICO)</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="credit">Credit Score (300-850)</Label>
        <Input
          id="credit"
          type="number"
          placeholder="e.g., 680"
          value={value || ''}
          onChange={(e) => onChange(Number(e.target.value))}
          className="text-lg h-12"
          min="300"
          max="850"
        />
        {rating && (
          <p className={`text-sm font-medium ${rating.color}`}>
            Rating: {rating.text}
          </p>
        )}
      </div>
    </div>
  );
};

export default QuestionCredit;
