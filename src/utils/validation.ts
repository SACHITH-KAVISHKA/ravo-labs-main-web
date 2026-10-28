export interface DemoFormData {
  fullName: string;
  companyName: string;
  workEmail: string;
  phone?: string;
  product: 'hr' | 'fuel' | 'pos' | 'all';
  companySize: string;
  message: string;
  agreeToPolicy: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function validateDemoForm(data: Partial<DemoFormData>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  if (!data.companyName || data.companyName.trim().length < 2) {
    errors.companyName = 'Please enter your company or organization name.';
  }

  if (!data.workEmail || !validateEmail(data.workEmail)) {
    errors.workEmail = 'Please provide a valid business email address.';
  }

  if (!data.product || !['hr', 'fuel', 'pos', 'all'].includes(data.product)) {
    errors.product = 'Please select a product of interest.';
  }

  if (!data.companySize || data.companySize.trim() === '') {
    errors.companySize = 'Please select your estimated team or company size.';
  }

  if (!data.agreeToPolicy) {
    errors.agreeToPolicy = 'You must acknowledge the terms to request a demo.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
