import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FileText } from 'lucide-react';

interface Props {
  value?: boolean;
  onChange: (value: boolean) => void;
}

const QuestionGrant = ({ value, onChange }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Are you eligible for government grants?</h2>
          <p className="text-muted-foreground">Women-owned, minority-owned, R&D, or specific sectors</p>
        </div>
      </div>
      
      <RadioGroup value={value?.toString()} onValueChange={(v) => onChange(v === 'true')}>
        <div className="flex items-center space-x-2 p-4 rounded-lg border hover:border-primary transition-colors cursor-pointer">
          <RadioGroupItem value="true" id="grant-yes" />
          <Label htmlFor="grant-yes" className="cursor-pointer flex-1">
            <div className="font-medium">Yes, I may qualify</div>
            <div className="text-sm text-muted-foreground">Meets special criteria or sector requirements</div>
          </Label>
        </div>
        <div className="flex items-center space-x-2 p-4 rounded-lg border hover:border-primary transition-colors cursor-pointer">
          <RadioGroupItem value="false" id="grant-no" />
          <Label htmlFor="grant-no" className="cursor-pointer flex-1">
            <div className="font-medium">No / Not sure</div>
            <div className="text-sm text-muted-foreground">Don't meet specific grant requirements</div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default QuestionGrant;
