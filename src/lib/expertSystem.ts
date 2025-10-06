import { AssessmentData, FundingRecommendation } from '@/types/funding';

interface Rule {
  name: string;
  condition: (data: AssessmentData) => boolean;
  recommendation: Omit<FundingRecommendation, 'confidence'>;
  baseConfidence: number;
}

const rules: Rule[] = [
  {
    name: 'Bank Loan - Strong Profile',
    condition: (d) => 
      d.annualRevenue >= 60000 && 
      d.creditScore >= 650 && 
      d.hasCollateral && 
      d.monthsInOperation >= 24,
    recommendation: {
      type: 'Bank Loan',
      reasoning: [
        'Strong annual revenue exceeds $60,000',
        'Credit score qualifies for competitive rates',
        'Collateral available for secured lending',
        'Established operational history (2+ years)'
      ],
      pros: [
        'Lower interest rates',
        'Larger loan amounts available',
        'No equity dilution',
        'Build business credit'
      ],
      cons: [
        'Lengthy application process',
        'Requires collateral',
        'Personal guarantee often needed',
        'Strict repayment terms'
      ],
      description: 'Traditional bank financing offering competitive rates and substantial capital for established businesses with strong financials.'
    },
    baseConfidence: 0.9
  },
  {
    name: 'Microloan - Early Stage',
    condition: (d) => 
      d.annualRevenue < 50000 && 
      d.fundingAmount <= 50000 && 
      d.monthsInOperation >= 6,
    recommendation: {
      type: 'Microloan',
      reasoning: [
        'Revenue profile fits microloan criteria',
        'Funding amount under $50,000',
        'Business operational for 6+ months',
        'Accessible for early-stage businesses'
      ],
      pros: [
        'Easier qualification than traditional loans',
        'Fast approval process',
        'Often includes mentorship',
        'Builds credit history'
      ],
      cons: [
        'Smaller loan amounts',
        'Higher interest rates than banks',
        'Limited to specific uses',
        'May require personal guarantee'
      ],
      description: 'Small loans designed for startups and early-stage businesses, often provided by non-profit organizations and CDFIs.'
    },
    baseConfidence: 0.85
  },
  {
    name: 'Angel Investment - High Growth',
    condition: (d) => 
      d.growthFocus === 'scale' && 
      d.dilutionPreference !== 'none' && 
      d.fundingAmount >= 50000 && 
      d.riskTolerance === 'high',
    recommendation: {
      type: 'Angel Investment',
      reasoning: [
        'Scale-focused growth strategy',
        'Open to equity dilution',
        'Substantial capital needs',
        'High risk tolerance for rapid growth'
      ],
      pros: [
        'No repayment obligations',
        'Valuable mentorship and connections',
        'Flexible terms',
        'Strategic guidance included'
      ],
      cons: [
        'Equity dilution (typically 10-25%)',
        'Loss of some control',
        'Investor expectations',
        'Time-intensive fundraising process'
      ],
      description: 'Wealthy individuals invest their own capital in exchange for equity, providing both funding and expertise.'
    },
    baseConfidence: 0.88
  },
  {
    name: 'Crowdfunding - Product Launch',
    condition: (d) => 
      ['retail', 'technology', 'consumer goods', 'creative'].includes(d.industry.toLowerCase()) &&
      d.fundingAmount <= 100000 &&
      d.riskTolerance !== 'low',
    recommendation: {
      type: 'Crowdfunding',
      reasoning: [
        'Consumer-facing industry ideal for crowdfunding',
        'Moderate funding amount ($0-$100k)',
        'Willingness to take calculated risks',
        'Opportunity for market validation'
      ],
      pros: [
        'Market validation before launch',
        'No debt or equity given up',
        'Builds customer base early',
        'Marketing and PR benefits'
      ],
      cons: [
        'All-or-nothing risk',
        'Requires strong marketing campaign',
        'Platform fees (5-10%)',
        'Fulfillment obligations'
      ],
      description: 'Raising capital from a large number of individuals through online platforms, ideal for product-based businesses.'
    },
    baseConfidence: 0.82
  },
  {
    name: 'Government Grant - Eligible Sector',
    condition: (d) => 
      d.grantEligible && 
      d.dilutionPreference === 'none',
    recommendation: {
      type: 'Government Grant',
      reasoning: [
        'Qualifies for government grant programs',
        'Preference for non-dilutive funding',
        'No repayment required',
        'Strategic sector alignment'
      ],
      pros: [
        'No repayment required',
        'No equity dilution',
        'Credibility boost',
        'Potential for additional support'
      ],
      cons: [
        'Highly competitive',
        'Lengthy application process',
        'Strict usage requirements',
        'Extensive reporting obligations'
      ],
      description: 'Non-repayable funds provided by government agencies for businesses in specific sectors or meeting certain criteria.'
    },
    baseConfidence: 0.75
  },
  {
    name: 'Venture Capital - High Growth Tech',
    condition: (d) => 
      d.growthFocus === 'scale' && 
      ['technology', 'software', 'biotech'].includes(d.industry.toLowerCase()) &&
      d.fundingAmount >= 500000 &&
      d.dilutionPreference === 'flexible' &&
      d.riskTolerance === 'high',
    recommendation: {
      type: 'Venture Capital',
      reasoning: [
        'Technology sector with high growth potential',
        'Substantial capital requirements ($500k+)',
        'Flexible on equity terms',
        'Aggressive growth strategy'
      ],
      pros: [
        'Large capital infusions',
        'Strategic expertise',
        'Network and connections',
        'Follow-on funding potential'
      ],
      cons: [
        'Significant equity dilution (20-40%)',
        'Loss of control',
        'Pressure for rapid growth',
        'Exit expectations'
      ],
      description: 'Professional investment firms providing large capital to high-growth potential businesses in exchange for significant equity.'
    },
    baseConfidence: 0.92
  },
  {
    name: 'Business Line of Credit',
    condition: (d) => 
      d.annualRevenue >= 50000 && 
      d.creditScore >= 600 && 
      d.monthsInOperation >= 12 &&
      d.growthFocus === 'steady',
    recommendation: {
      type: 'Business Line of Credit',
      reasoning: [
        'Established revenue stream',
        'Good credit standing',
        'Operating for 12+ months',
        'Steady growth focus benefits from flexibility'
      ],
      pros: [
        'Flexible access to capital',
        'Pay interest only on used amount',
        'Reusable credit line',
        'Manage cash flow gaps'
      ],
      cons: [
        'Variable interest rates',
        'Personal guarantee often required',
        'Annual fees',
        'Credit limit restrictions'
      ],
      description: 'Revolving credit facility allowing businesses to borrow up to a set limit and repay flexibly.'
    },
    baseConfidence: 0.86
  },
  {
    name: 'Equipment Financing',
    condition: (d) => 
      ['manufacturing', 'construction', 'healthcare', 'transportation'].includes(d.industry.toLowerCase()) &&
      d.fundingAmount >= 25000 &&
      d.hasCollateral,
    recommendation: {
      type: 'Equipment Financing',
      reasoning: [
        'Industry requires significant equipment',
        'Funding amount suitable for equipment purchase',
        'Equipment serves as collateral',
        'Asset-backed lending advantage'
      ],
      pros: [
        'Equipment serves as collateral',
        '100% financing often available',
        'Preserve working capital',
        'Tax benefits (Section 179)'
      ],
      cons: [
        'Equipment-specific only',
        'Depreciation risk',
        'Long-term commitment',
        'Potentially higher rates'
      ],
      description: 'Loans specifically for purchasing business equipment, where the equipment itself serves as collateral.'
    },
    baseConfidence: 0.84
  },
  {
    name: 'SBA Loan - Moderate Profile',
    condition: (d) => 
      d.annualRevenue >= 30000 && 
      d.creditScore >= 640 && 
      d.monthsInOperation >= 24 &&
      !d.hasCollateral,
    recommendation: {
      type: 'SBA Loan',
      reasoning: [
        'Meets SBA minimum requirements',
        'Good credit score (640+)',
        'Established business (2+ years)',
        'SBA provides partial guarantee'
      ],
      pros: [
        'Government-backed guarantee',
        'Lower down payments',
        'Longer repayment terms',
        'Competitive interest rates'
      ],
      cons: [
        'Lengthy approval process (60-90 days)',
        'Extensive documentation',
        'Personal guarantee required',
        'Startup fees and closing costs'
      ],
      description: 'Government-guaranteed loans through partner lenders, designed to support small businesses with favorable terms.'
    },
    baseConfidence: 0.87
  },
  {
    name: 'Invoice Financing',
    condition: (d) => 
      d.annualRevenue >= 100000 && 
      ['B2B services', 'wholesale', 'manufacturing'].includes(d.industry.toLowerCase()) &&
      d.monthsInOperation >= 6,
    recommendation: {
      type: 'Invoice Financing',
      reasoning: [
        'Significant B2B revenue ($100k+)',
        'Industry generates invoices',
        'Immediate cash flow needs',
        'Established customer base'
      ],
      pros: [
        'Fast access to cash (24-48 hours)',
        'No collateral needed',
        'Flexible amounts based on invoices',
        'No debt on balance sheet'
      ],
      cons: [
        'Higher fees (1-5% per invoice)',
        'Customer creditworthiness matters',
        'Only works with invoiced sales',
        'Potential customer notification'
      ],
      description: 'Advances against outstanding invoices, providing immediate working capital while waiting for customer payments.'
    },
    baseConfidence: 0.83
  },
  {
    name: 'Merchant Cash Advance',
    condition: (d) => 
      ['retail', 'restaurant', 'hospitality'].includes(d.industry.toLowerCase()) &&
      d.annualRevenue >= 50000 &&
      d.creditScore < 600 &&
      d.riskTolerance !== 'low',
    recommendation: {
      type: 'Merchant Cash Advance',
      reasoning: [
        'Regular credit card sales',
        'Limited traditional financing options',
        'Need for fast capital',
        'Revenue-based repayment structure'
      ],
      pros: [
        'Fast approval (24-72 hours)',
        'No collateral required',
        'Flexible repayment (based on sales)',
        'Poor credit accepted'
      ],
      cons: [
        'Very high cost (30-50% factor rate)',
        'Daily or weekly withdrawals',
        'Can strain cash flow',
        'Not suitable for seasonal businesses'
      ],
      description: 'Advance against future credit card sales, repaid through a percentage of daily transactions.'
    },
    baseConfidence: 0.70
  },
  {
    name: 'Friends and Family',
    condition: (d) => 
      d.monthsInOperation < 12 && 
      d.fundingAmount <= 50000 &&
      d.founderExperience < 3,
    recommendation: {
      type: 'Friends and Family Funding',
      reasoning: [
        'Very early stage business',
        'Limited funding amount needed',
        'Limited founder track record',
        'Traditional financing likely unavailable'
      ],
      pros: [
        'Flexible terms',
        'Fast access',
        'No formal credit requirements',
        'Patient capital'
      ],
      cons: [
        'Risk to personal relationships',
        'Limited amounts',
        'Unprofessional structure risk',
        'Potential family conflicts'
      ],
      description: 'Capital from personal network willing to invest based on relationship rather than formal business metrics.'
    },
    baseConfidence: 0.65
  },
  {
    name: 'Revenue-Based Financing',
    condition: (d) => 
      d.annualRevenue >= 100000 && 
      d.isProfitable &&
      d.dilutionPreference === 'none' &&
      d.growthFocus === 'scale',
    recommendation: {
      type: 'Revenue-Based Financing',
      reasoning: [
        'Strong recurring revenue ($100k+)',
        'Profitable operations',
        'Want to avoid equity dilution',
        'Scaling revenue efficiently'
      ],
      pros: [
        'No equity dilution',
        'Flexible repayment (% of revenue)',
        'Faster than bank loans',
        'Scales with business performance'
      ],
      cons: [
        'Higher effective cost than loans',
        'Requires consistent revenue',
        'Profit sharing until repaid',
        'Limited provider options'
      ],
      description: 'Investment repaid through a fixed percentage of monthly revenues until a multiple is reached.'
    },
    baseConfidence: 0.85
  },
  {
    name: 'Business Credit Card',
    condition: (d) => 
      d.fundingAmount <= 25000 &&
      d.creditScore >= 650 &&
      d.monthsInOperation >= 3,
    recommendation: {
      type: 'Business Credit Card',
      reasoning: [
        'Small funding need (under $25k)',
        'Good personal credit',
        'Short operational history acceptable',
        'Flexible short-term capital'
      ],
      pros: [
        'Fast approval',
        'Rewards and perks',
        'No collateral',
        'Builds business credit'
      ],
      cons: [
        'High interest rates if carried',
        'Lower credit limits',
        'Personal guarantee',
        'Can hurt personal credit'
      ],
      description: 'Credit cards specifically for business expenses, offering rewards and separating business from personal spending.'
    },
    baseConfidence: 0.78
  },
  {
    name: 'Bootstrapping',
    condition: (d) => 
      d.dilutionPreference === 'none' &&
      d.fundingAmount <= 25000 &&
      d.riskTolerance === 'low' &&
      d.growthFocus === 'steady',
    recommendation: {
      type: 'Bootstrapping (Self-Funding)',
      reasoning: [
        'Preference to maintain full ownership',
        'Modest capital requirements',
        'Low risk tolerance',
        'Organic growth strategy'
      ],
      pros: [
        'Complete control retained',
        'No debt or dilution',
        'Forces profitability focus',
        'No repayment obligations'
      ],
      cons: [
        'Slower growth',
        'Limited resources',
        'Personal financial risk',
        'Opportunity cost'
      ],
      description: 'Self-funding through personal savings, revenue reinvestment, or side income without external capital.'
    },
    baseConfidence: 0.80
  }
];

export function evaluateFunding(data: AssessmentData): FundingRecommendation[] {
  const results: FundingRecommendation[] = [];

  // Evaluate each rule
  for (const rule of rules) {
    if (rule.condition(data)) {
      let confidence = rule.baseConfidence;

      // Adjust confidence based on additional factors
      if (data.isProfitable) confidence += 0.03;
      if (data.founderExperience >= 5) confidence += 0.02;
      if (data.creditScore >= 700) confidence += 0.02;
      if (data.monthsInOperation >= 36) confidence += 0.02;

      confidence = Math.min(confidence, 0.99); // Cap at 99%

      results.push({
        ...rule.recommendation,
        confidence
      });
    }
  }

  // Sort by confidence and return top results
  return results.sort((a, b) => b.confidence - a.confidence);
}

export function saveAssessment(data: AssessmentData, recommendations: FundingRecommendation[]): void {
  const assessment = {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    data,
    recommendations
  };

  const existing = localStorage.getItem('assessments');
  const assessments = existing ? JSON.parse(existing) : [];
  assessments.push(assessment);
  localStorage.setItem('assessments', JSON.stringify(assessments));
}

export function getAssessments(): any[] {
  const existing = localStorage.getItem('assessments');
  return existing ? JSON.parse(existing) : [];
}
