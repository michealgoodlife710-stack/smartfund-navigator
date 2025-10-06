import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Users } from 'lucide-react';

interface Props {
  value?: 'none' | 'limited' | 'flexible';
  onChange: (value: 'none' | 'limited' | 'flexible') => void;
}

const QuestionDilution = ({ value, onChange }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Users className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Equity dilution preference?</h2>
          <p className="text-muted-foreground">Are you willing to give up ownership stake?</p>
        </div>
      </div>
      
      <RadioGroup value={value} onValueChange={onChange}>
        <div className="flex items-center space-x-2 p-4 rounded-lg border hover:border-primary transition-colors cursor-pointer">
          <RadioGroupItem value="none" id="dilution-none" />
          <Label htmlFor="dilution-none" className="cursor-pointer flex-1">
            <div className="font-medium">No Dilution</div>
            <div className="text-sm text-muted-foreground">Maintain 100% ownership</div>
          </Label>
        </div>
        <div className="flex items-center space-x-2 p-4 rounded-lg border hover:border-primary transition-colors cursor-pointer">
          <RadioGroupItem value="limited" id="dilution-limited" />
          <Label htmlFor="dilution-limited" className="cursor-pointer flex-1">
            <div className="font-medium">Limited Dilution</div>
            <div className="text-sm text-muted-foreground">Open to small equity stake (5-15%)</div>
          </Label>
        </div>
        <div className="flex items-center space-x-2 p-4 rounded-lg border hover:border-primary transition-colors cursor-pointer">
          <RadioGroupItem value="flexible" id="dilution-flexible" />
          <Label htmlFor="dilution-flexible" className="cursor-pointer flex-1">
            <div className="font-medium">Flexible</div>
            <div className="text-sm text-muted-foreground">Open to significant equity for right partner</div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default QuestionDilution;
