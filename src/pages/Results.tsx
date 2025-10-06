import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Check, X, TrendingUp, Info } from 'lucide-react';
import { FundingRecommendation } from '@/types/funding';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { recommendations, data } = location.state || { recommendations: [], data: {} };

  useEffect(() => {
    // Confetti animation on load
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  if (!recommendations || recommendations.length === 0) {
    navigate('/');
    return null;
  }

  const topRecommendation = recommendations[0] as FundingRecommendation;
  const secondaryOptions = recommendations.slice(1, 3) as FundingRecommendation[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8">
      <div className="container max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Start Over
            </Button>
          </Link>
          <Badge variant="secondary" className="px-4 py-2">
            <TrendingUp className="mr-2 h-4 w-4" />
            Analysis Complete
          </Badge>
        </div>

        {/* Top Recommendation */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Your Top Match</h1>
          <p className="text-muted-foreground">
            Based on your business profile, here's our strongest recommendation
          </p>
        </div>

        <Card className="p-8 mb-8 shadow-xl border-2 border-primary/20 animate-scale-in">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">{topRecommendation.type}</h2>
              <p className="text-muted-foreground">{topRecommendation.description}</p>
            </div>
            <Badge className="text-lg px-4 py-2">
              {Math.round(topRecommendation.confidence * 100)}% Match
            </Badge>
          </div>

          {/* Confidence Bar */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Confidence Score</span>
              <span className="text-sm text-muted-foreground">
                {Math.round(topRecommendation.confidence * 100)}%
              </span>
            </div>
            <Progress value={topRecommendation.confidence * 100} className="h-3" />
          </div>

          {/* Why This Recommendation */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Info className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Why This Recommendation?</h3>
            </div>
            <ul className="space-y-2">
              {topRecommendation.reasoning.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pros & Cons */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                Advantages
              </h3>
              <ul className="space-y-2">
                {topRecommendation.pros.map((pro, idx) => (
                  <li key={idx} className="text-sm flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <X className="h-5 w-5 text-orange-500" />
                Considerations
              </h3>
              <ul className="space-y-2">
                {topRecommendation.cons.map((con, idx) => (
                  <li key={idx} className="text-sm flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Secondary Options */}
        {secondaryOptions.length > 0 && (
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-bold mb-4">Alternative Options</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {secondaryOptions.map((rec, idx) => (
                <Card key={idx} className="p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold">{rec.type}</h3>
                    <Badge variant="outline">
                      {Math.round(rec.confidence * 100)}%
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{rec.description}</p>
                  <Progress value={rec.confidence * 100} className="h-2 mb-4" />
                  <div className="space-y-2">
                    <p className="text-xs font-medium">Key Benefits:</p>
                    <ul className="space-y-1">
                      {rec.pros.slice(0, 2).map((pro, i) => (
                        <li key={i} className="text-xs flex items-start gap-2">
                          <Check className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link to="/">
            <Button size="lg" variant="outline">
              Run Another Assessment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Results;
