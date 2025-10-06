import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, TrendingUp, Target, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAssessments } from '@/lib/expertSystem';
import { AssessmentResult } from '@/types/funding';

const Admin = () => {
  const [assessments, setAssessments] = useState<AssessmentResult[]>([]);

  useEffect(() => {
    setAssessments(getAssessments());
  }, []);

  const totalAssessments = assessments.length;
  
  const fundingTypeCount = assessments.reduce((acc, assessment) => {
    const topType = assessment.recommendations[0]?.type || 'Unknown';
    acc[topType] = (acc[topType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const avgConfidence = assessments.length > 0
    ? assessments.reduce((sum, a) => sum + (a.recommendations[0]?.confidence || 0), 0) / assessments.length
    : 0;

  const topFundingType = Object.entries(fundingTypeCount).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" className="group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold mb-1">{totalAssessments}</div>
            <div className="text-sm text-muted-foreground">Total Assessments</div>
          </Card>

          <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-2">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold mb-1">
              {Math.round(avgConfidence * 100)}%
            </div>
            <div className="text-sm text-muted-foreground">Avg Confidence</div>
          </Card>

          <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold mb-1">
              {Object.keys(fundingTypeCount).length}
            </div>
            <div className="text-sm text-muted-foreground">Funding Types Used</div>
          </Card>

          <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <div className="text-2xl font-bold mb-1">
              {topFundingType?.[0]?.split(' ')[0] || 'N/A'}
            </div>
            <div className="text-sm text-muted-foreground">Most Common Type</div>
          </Card>
        </div>

        {/* Funding Distribution */}
        <Card className="p-6 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-xl font-bold mb-6">Funding Type Distribution</h2>
          <div className="space-y-4">
            {Object.entries(fundingTypeCount)
              .sort((a, b) => b[1] - a[1])
              .map(([type, count], idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{type}</span>
                    <span className="text-muted-foreground">
                      {count} ({Math.round((count / totalAssessments) * 100)}%)
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${(count / totalAssessments) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </Card>

        {/* Recent Assessments */}
        <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <h2 className="text-xl font-bold mb-6">Recent Assessments</h2>
          <div className="space-y-4">
            {assessments.slice(-10).reverse().map((assessment, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div>
                  <div className="font-medium">{assessment.recommendations[0]?.type}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(assessment.timestamp).toLocaleDateString()} at{' '}
                    {new Date(assessment.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-primary">
                    {Math.round((assessment.recommendations[0]?.confidence || 0) * 100)}%
                  </div>
                  <div className="text-xs text-muted-foreground">confidence</div>
                </div>
              </div>
            ))}
            {assessments.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No assessments yet. Complete an assessment to see data here.
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
