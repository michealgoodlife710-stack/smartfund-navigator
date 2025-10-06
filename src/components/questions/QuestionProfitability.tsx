import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TrendingUp } from 'lucide-react';

interface Props {
  value?: boolean;
  onChange: (value: boolean) => void;
}

const QuestionProfitability = ({ value, onChange }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <TrendingUp className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Is your business profitable?</h2>
          <p className="text-muted-foreground">Are you making more than you spend?</p>
        </div>
      </div>
      
      <RadioGroup value={value?.toString()} onValueChange={(v) => onChange(v === 'true')}>
        <div className="flex items-center space-x-2 p-4 rounded-lg border hover:border-primary transition-colors cursor-pointer">
          <RadioGroupItem value="true" id="profitable-yes" />
          <Label htmlFor="profitable-yes" className="cursor-pointer flex-1">
            <div className="font-medium">Yes, we're profitable</div>
            <div className="text-sm text-muted-foreground">Revenue exceeds expenses</div>
          </Label>
        </div>
        <div className="flex items-center space-x-2 p-4 rounded-lg border hover:border-primary transition-colors cursor-pointer">
          <RadioGroupItem value="false" id="profitable-no" />
          <Label htmlFor="profitable-no" className="cursor-pointer flex-1">
            <div className="font-medium">No, not yet</div>
            <div className="text-sm text-muted-foreground">Still building towards profitability</div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default QuestionProfitability;
