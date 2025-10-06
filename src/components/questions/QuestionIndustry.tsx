import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase } from 'lucide-react';

interface Props {
  value?: string;
  onChange: (value: string) => void;
}

const industries = [
  'Retail',
  'Technology',
  'Healthcare',
  'Food & Beverage',
  'Manufacturing',
  'Construction',
  'Professional Services',
  'Hospitality',
  'Education',
  'Transportation',
  'Creative',
  'Wholesale',
  'Real Estate',
  'Agriculture',
  'Other'
];

const QuestionIndustry = ({ value, onChange }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Briefcase className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">What industry are you in?</h2>
          <p className="text-muted-foreground">Select your business sector</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="industry">Industry</Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger id="industry" className="text-lg h-12">
            <SelectValue placeholder="Select your industry" />
          </SelectTrigger>
          <SelectContent>
            {industries.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default QuestionIndustry;
