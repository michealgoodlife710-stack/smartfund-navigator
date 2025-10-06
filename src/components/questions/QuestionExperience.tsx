import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Award } from 'lucide-react';

interface Props {
  value?: number;
  onChange: (value: number) => void;
}

const QuestionExperience = ({ value, onChange }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Award className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Founder experience level?</h2>
          <p className="text-muted-foreground">Years of industry or entrepreneurial experience</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="experience">Years of Experience</Label>
        <Input
          id="experience"
          type="number"
          placeholder="e.g., 5"
          value={value || ''}
          onChange={(e) => onChange(Number(e.target.value))}
          className="text-lg h-12"
          min="0"
        />
      </div>
    </div>
  );
};

export default QuestionExperience;
