import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Home } from 'lucide-react';

interface Props {
  value?: boolean;
  onChange: (value: boolean) => void;
}

const QuestionCollateral = ({ value, onChange }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Home className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Do you have collateral?</h2>
          <p className="text-muted-foreground">Assets like property, equipment, or inventory</p>
        </div>
      </div>
      
      <RadioGroup value={value?.toString()} onValueChange={(v) => onChange(v === 'true')}>
        <div className="flex items-center space-x-2 p-4 rounded-lg border hover:border-primary transition-colors cursor-pointer">
          <RadioGroupItem value="true" id="collateral-yes" />
          <Label htmlFor="collateral-yes" className="cursor-pointer flex-1">
            <div className="font-medium">Yes, I have collateral</div>
            <div className="text-sm text-muted-foreground">Property, equipment, or other assets</div>
          </Label>
        </div>
        <div className="flex items-center space-x-2 p-4 rounded-lg border hover:border-primary transition-colors cursor-pointer">
          <RadioGroupItem value="false" id="collateral-no" />
          <Label htmlFor="collateral-no" className="cursor-pointer flex-1">
            <div className="font-medium">No collateral available</div>
            <div className="text-sm text-muted-foreground">Need unsecured financing</div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default QuestionCollateral;
