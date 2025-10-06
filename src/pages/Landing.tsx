import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, TrendingUp, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-16 animate-fade-in">
          <div className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              SmartFunding
            </h1>
          </div>
          <Link to="/admin">
            <Button variant="ghost" size="sm">Analytics</Button>
          </Link>
        </header>

        {/* Hero Section */}
        <main className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              Discover the Best{' '}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Funding Route
              </span>
              <br />
              for Your Business
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Rule-based expert system that recommends personalized funding options in minutes
            </p>
          </div>

          {/* CTA */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Link to="/assess">
              <Button size="lg" className="group h-14 px-8 text-lg">
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Smart Recommendations</h3>
              <p className="text-sm text-muted-foreground">
                15+ expert rules analyze your business profile for optimal matches
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Confidence Scoring</h3>
              <p className="text-sm text-muted-foreground">
                Each recommendation includes detailed reasoning and confidence levels
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Expert System</h3>
              <p className="text-sm text-muted-foreground">
                Forward-chaining inference engine powered by business finance rules
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div>
              <div className="text-3xl font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground">Funding Types</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">12</div>
              <div className="text-sm text-muted-foreground">Assessment Factors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">99%</div>
              <div className="text-sm text-muted-foreground">Match Accuracy</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Landing;
