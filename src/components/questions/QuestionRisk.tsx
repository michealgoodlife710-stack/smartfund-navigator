import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AlertTriangle } from 'lucide-react';

interface Props {
  value?: 'low' | 'medium' | 'high';
  onChange: (value: 'low' | 'medium' | 'high') => void;
}

const QuestionRisk = ({ value, onChange }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <AlertTriangle className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">What's your risk tolerance?</h2>
          <p className="text-muted-foreground">How much uncertainty can you handle?</p>
        </div>
      </div>
      
      <RadioGroup value={value} onValueChange={onChange}>
        <div className="flex items-center space-x-2 p-4 rounded-lg border hover:border-primary transition-colors cursor-pointer">
          <RadioGroupItem value="low" id="risk-low" />
          <Label htmlFor="risk-low" className="cursor-pointer flex-1">
            <div className="font-medium">Low Risk</div>
            <div className="text-sm text-muted-foreground">Conservative, prefer certainty</div>
          </Label>
        </div>
        <div className="flex items-center space-x-2 p-4 rounded-lg border hover:border-primary transition-colors cursor-pointer">
          <RadioGroupItem value="medium" id="risk-medium" />
          <Label htmlFor="risk-medium" className="cursor-pointer flex-1">
            <div className="font-medium">Medium Risk</div>
            <div className="text-sm text-muted-foreground">Balanced approach</div>
          </Label>
        </div>
        <div className="flex items-center space-x-2 p-4 rounded-lg border hover:border-primary transition-colors cursor-pointer">
          <RadioGroupItem value="high" id="risk-high" />
          <Label htmlFor="risk-high" className="cursor-pointer flex-1">
            <div className="font-medium">High Risk</div>
            <div className="text-sm text-muted-foreground">Aggressive, high reward potential</div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default QuestionRisk;
