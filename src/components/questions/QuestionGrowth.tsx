import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Target } from 'lucide-react';

interface Props {
  value?: 'steady' | 'scale';
  onChange: (value: 'steady' | 'scale') => void;
}

const QuestionGrowth = ({ value, onChange }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Target className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">What's your growth strategy?</h2>
          <p className="text-muted-foreground">How fast do you want to grow?</p>
        </div>
      </div>
      
      <RadioGroup value={value} onValueChange={onChange}>
        <div className="flex items-center space-x-2 p-4 rounded-lg border hover:border-primary transition-colors cursor-pointer">
          <RadioGroupItem value="steady" id="growth-steady" />
          <Label htmlFor="growth-steady" className="cursor-pointer flex-1">
            <div className="font-medium">Steady & Sustainable</div>
            <div className="text-sm text-muted-foreground">Organic, profitable growth over time</div>
          </Label>
        </div>
        <div className="flex items-center space-x-2 p-4 rounded-lg border hover:border-primary transition-colors cursor-pointer">
          <RadioGroupItem value="scale" id="growth-scale" />
          <Label htmlFor="growth-scale" className="cursor-pointer flex-1">
            <div className="font-medium">Rapid Scaling</div>
            <div className="text-sm text-muted-foreground">Fast growth, market dominance focus</div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default QuestionGrowth;
