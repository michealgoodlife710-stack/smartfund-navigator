import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AssessmentData } from '@/types/funding';
import { evaluateFunding, saveAssessment } from '@/lib/expertSystem';
import QuestionRevenue from '@/components/questions/QuestionRevenue';
import QuestionProfitability from '@/components/questions/QuestionProfitability';
import QuestionOperationTime from '@/components/questions/QuestionOperationTime';
import QuestionCredit from '@/components/questions/QuestionCredit';
import QuestionCollateral from '@/components/questions/QuestionCollateral';
import QuestionIndustry from '@/components/questions/QuestionIndustry';
import QuestionAmount from '@/components/questions/QuestionAmount';
import QuestionGrowth from '@/components/questions/QuestionGrowth';
import QuestionExperience from '@/components/questions/QuestionExperience';
import QuestionRisk from '@/components/questions/QuestionRisk';
import QuestionDilution from '@/components/questions/QuestionDilution';
import QuestionGrant from '@/components/questions/QuestionGrant';

const Assessment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Partial<AssessmentData>>({});

  const totalSteps = 12;
  const progress = ((step + 1) / totalSteps) * 100;

  const updateData = (field: keyof AssessmentData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      // Calculate recommendations
      const recommendations = evaluateFunding(data as AssessmentData);
      saveAssessment(data as AssessmentData, recommendations);
      navigate('/results', { state: { recommendations, data } });
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      navigate('/');
    }
  };

  const questions = [
    <QuestionRevenue value={data.annualRevenue} onChange={(v) => updateData('annualRevenue', v)} />,
    <QuestionProfitability value={data.isProfitable} onChange={(v) => updateData('isProfitable', v)} />,
    <QuestionOperationTime value={data.monthsInOperation} onChange={(v) => updateData('monthsInOperation', v)} />,
    <QuestionCredit value={data.creditScore} onChange={(v) => updateData('creditScore', v)} />,
    <QuestionCollateral value={data.hasCollateral} onChange={(v) => updateData('hasCollateral', v)} />,
    <QuestionIndustry value={data.industry} onChange={(v) => updateData('industry', v)} />,
    <QuestionAmount value={data.fundingAmount} onChange={(v) => updateData('fundingAmount', v)} />,
    <QuestionGrowth value={data.growthFocus} onChange={(v) => updateData('growthFocus', v)} />,
    <QuestionExperience value={data.founderExperience} onChange={(v) => updateData('founderExperience', v)} />,
    <QuestionRisk value={data.riskTolerance} onChange={(v) => updateData('riskTolerance', v)} />,
    <QuestionDilution value={data.dilutionPreference} onChange={(v) => updateData('dilutionPreference', v)} />,
    <QuestionGrant value={data.grantEligible} onChange={(v) => updateData('grantEligible', v)} />
  ];

  const canProceed = () => {
    const fields: (keyof AssessmentData)[] = [
      'annualRevenue', 'isProfitable', 'monthsInOperation', 'creditScore', 
      'hasCollateral', 'industry', 'fundingAmount', 'growthFocus',
      'founderExperience', 'riskTolerance', 'dilutionPreference', 'grantEligible'
    ];
    return data[fields[step]] !== undefined && data[fields[step]] !== null && data[fields[step]] !== '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8">
      <div className="container max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Business Assessment</h1>
            <span className="text-sm text-muted-foreground">
              Step {step + 1} of {totalSteps}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="p-8 mb-6 shadow-lg animate-fade-in">
          {questions[step]}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            className="group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            {step === 0 ? 'Home' : 'Back'}
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="group"
          >
            {step === totalSteps - 1 ? 'Get Recommendations' : 'Next'}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
