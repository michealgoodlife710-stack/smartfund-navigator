export interface AssessmentData {
  annualRevenue: number;
  isProfitable: boolean;
  monthsInOperation: number;
  creditScore: number;
  hasCollateral: boolean;
  industry: string;
  fundingAmount: number;
  growthFocus: 'steady' | 'scale';
  founderExperience: number;
  riskTolerance: 'low' | 'medium' | 'high';
  dilutionPreference: 'none' | 'limited' | 'flexible';
  grantEligible: boolean;
}

export interface FundingRecommendation {
  type: string;
  confidence: number;
  reasoning: string[];
  pros: string[];
  cons: string[];
  description: string;
}

export interface AssessmentResult {
  id: string;
  timestamp: number;
  data: AssessmentData;
  recommendations: FundingRecommendation[];
}
