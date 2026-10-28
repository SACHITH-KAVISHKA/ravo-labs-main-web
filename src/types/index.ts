export type ProductId = 'hr' | 'fuel' | 'pos';

export interface ProductBenefit {
  title: string;
  description: string;
}

export interface ProductTheme {
  id: ProductId;
  name: string;
  tagline: string;
  eyebrow: string;
  headline: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  benefits: ProductBenefit[];
  primaryColor: string;
  accentColor: string;
  highlightColor: string;
  badgeBg: string;
  badgeText: string;
  cardBg: string;
  isDark: boolean;
  status: 'Available for Guided Demo' | 'In Active Development' | 'Early Access Preview';
  availabilityNote: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  iconName: string;
  tag?: string;
}

export interface ProductDetails {
  id: ProductId;
  title: string;
  subtitle: string;
  summary: string;
  keyFeatures: FeatureItem[];
  industryTarget: string;
  deliverables: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'hr' | 'fuel' | 'pos' | 'implementation';
}
