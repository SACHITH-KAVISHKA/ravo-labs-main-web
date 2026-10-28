import React, { useState } from 'react';
import {
  Mail,
  Building,
  User,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Info,
  X
} from 'lucide-react';
import { ProductId } from '../types';
import { DemoFormData, validateDemoForm } from '../utils/validation';
import { useScrollReveal } from '../hooks/useScrollReveal';

export interface ContactSectionProps {
  initialProduct?: ProductId;
  isModal?: boolean;
  onCloseModal?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialProduct = 'hr',
  isModal = false,
  onCloseModal
}) => {
  const { elementRef, isRevealed } = useScrollReveal();
  const idPrefix = isModal ? 'modal-' : 'contact-';

  const [formData, setFormData] = useState<Partial<DemoFormData>>({
    fullName: '',
    companyName: '',
    workEmail: '',
    phone: '',
    product: initialProduct,
    companySize: '11-50',
    message: '',
    agreeToPolicy: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<DemoFormData | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateDemoForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    // Simulate realistic client-side submission with clear demo feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData(formData as DemoFormData);
    }, 900);
  };

  const handleReset = () => {
    setSubmittedData(null);
    setFormData({
      fullName: '',
      companyName: '',
      workEmail: '',
      phone: '',
      product: 'hr',
      companySize: '11-50',
      message: '',
      agreeToPolicy: false
    });
    setErrors({});
  };

  const formContent = (
    <div className={`bg-white dark:bg-[#111827] rounded-2xl ${isModal ? 'p-0 sm:p-2 border-0' : 'border border-[#CBD5E1]/80 dark:border-slate-800 p-6 sm:p-8 shadow-xl'} transition-colors duration-300`}>
      {submittedData ? (
        <div className="py-6 text-center space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="w-16 h-16 rounded-2xl bg-[#EFF6FF] dark:bg-[#0284C7]/20 text-[#0284C7] dark:text-[#38BDF8] border border-[#BFDBFE] dark:border-[#0284C7]/40 flex items-center justify-center mx-auto scale-in duration-200 shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
            Demo Request Confirmed
          </h3>
          <p className="text-sm text-[#475569] dark:text-[#94A3B8] max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-[#0F172A] dark:text-[#F8FAFC]">{submittedData.fullName}</strong>. We have logged your request for <strong className="text-[#0284C7] dark:text-[#38BDF8] uppercase">{submittedData.product}</strong> for <strong className="text-[#0F172A] dark:text-[#F8FAFC]">{submittedData.companyName}</strong> ({submittedData.companySize} employees).
          </p>
          <div className="bg-[#F8FAFC] dark:bg-[#0B0F17] border border-[#E2E8F0] dark:border-slate-800 rounded-xl p-4 text-xs text-[#64748B] dark:text-[#94A3B8] text-left max-w-md mx-auto space-y-1.5">
            <div className="flex justify-between">
              <span>Contact Email:</span>
              <span className="font-mono text-[#0F172A] dark:text-[#F8FAFC]">{submittedData.workEmail}</span>
            </div>
            <div className="flex justify-between">
              <span>Target Product:</span>
              <span className="font-semibold text-[#0284C7] dark:text-[#38BDF8] capitalize">Ravo {submittedData.product}</span>
            </div>
            {submittedData.phone && (
              <div className="flex justify-between">
                <span>Phone:</span>
                <span className="font-mono text-[#0F172A] dark:text-[#F8FAFC]">{submittedData.phone}</span>
              </div>
            )}
          </div>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2.5 min-h-[44px] text-xs font-semibold text-[#0F172A] dark:text-white bg-white dark:bg-[#1E293B] border border-[#CBD5E1] dark:border-slate-700 hover:bg-[#F8FAFC] dark:hover:bg-slate-700 hover:border-[#94A3B8] hover:text-[#0284C7] dark:hover:text-[#38BDF8] rounded-xl transition-all shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]"
            >
              Submit Another Request
            </button>
            {isModal && onCloseModal && (
              <button
                type="button"
                onClick={onCloseModal}
                className="px-5 py-2.5 min-h-[44px] text-xs font-semibold text-white bg-[#0284C7] hover:bg-[#0369A1] rounded-xl transition-all shadow-xs hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] focus-visible:ring-offset-2"
              >
                Done / Close Window
              </button>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="border-b border-[#E2E8F0] dark:border-slate-800 pb-3 mb-4">
            <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
              {isModal ? 'Specify Your Demonstration Scope' : 'Schedule a Guided Demonstration'}
            </h3>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
              Select your product of interest to connect with the appropriate domain engineer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label htmlFor={`${idPrefix}fullName`} className="block text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC] mb-1">
                Full Name <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id={`${idPrefix}fullName`}
                name="fullName"
                type="text"
                required
                aria-required="true"
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? `${idPrefix}fullName-error` : undefined}
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. David Fernando"
                className={`w-full min-h-[44px] px-3.5 py-2.5 text-xs rounded-xl border bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8] dark:placeholder:text-slate-500 hover:border-[#94A3B8] dark:hover:border-slate-600 focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 transition-all ${
                  errors.fullName ? 'border-red-500 bg-red-50/20 dark:bg-red-950/20 focus:border-red-500 focus:ring-red-500/20' : 'border-[#CBD5E1] dark:border-slate-700'
                }`}
              />
              {errors.fullName && (
                <p id={`${idPrefix}fullName-error`} role="alert" className="text-[11px] text-red-600 dark:text-red-400 mt-1">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor={`${idPrefix}companyName`} className="block text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC] mb-1">
                Company / Organization <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id={`${idPrefix}companyName`}
                name="companyName"
                type="text"
                required
                aria-required="true"
                aria-invalid={!!errors.companyName}
                aria-describedby={errors.companyName ? `${idPrefix}companyName-error` : undefined}
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g. Apex Hospitality Group"
                className={`w-full min-h-[44px] px-3.5 py-2.5 text-xs rounded-xl border bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8] dark:placeholder:text-slate-500 hover:border-[#94A3B8] dark:hover:border-slate-600 focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 transition-all ${
                  errors.companyName ? 'border-red-500 bg-red-50/20 dark:bg-red-950/20 focus:border-red-500 focus:ring-red-500/20' : 'border-[#CBD5E1] dark:border-slate-700'
                }`}
              />
              {errors.companyName && (
                <p id={`${idPrefix}companyName-error`} role="alert" className="text-[11px] text-red-600 dark:text-red-400 mt-1">
                  {errors.companyName}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Work Email */}
            <div>
              <label htmlFor={`${idPrefix}workEmail`} className="block text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC] mb-1">
                Business Email Address <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id={`${idPrefix}workEmail`}
                name="workEmail"
                type="email"
                required
                aria-required="true"
                aria-invalid={!!errors.workEmail}
                aria-describedby={errors.workEmail ? `${idPrefix}workEmail-error` : undefined}
                value={formData.workEmail}
                onChange={handleChange}
                placeholder="david@company.com"
                className={`w-full min-h-[44px] px-3.5 py-2.5 text-xs rounded-xl border bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8] dark:placeholder:text-slate-500 hover:border-[#94A3B8] dark:hover:border-slate-600 focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 transition-all ${
                  errors.workEmail ? 'border-red-500 bg-red-50/20 dark:bg-red-950/20 focus:border-red-500 focus:ring-red-500/20' : 'border-[#CBD5E1] dark:border-slate-700'
                }`}
              />
              {errors.workEmail && (
                <p id={`${idPrefix}workEmail-error`} role="alert" className="text-[11px] text-red-600 dark:text-red-400 mt-1">
                  {errors.workEmail}
                </p>
              )}
            </div>

            {/* Phone Number (Optional) */}
            <div>
              <label htmlFor={`${idPrefix}phone`} className="block text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC] mb-1">
                Phone Number (Optional)
              </label>
              <input
                id={`${idPrefix}phone`}
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 019-2834"
                className="w-full min-h-[44px] px-3.5 py-2.5 text-xs rounded-xl border border-[#CBD5E1] dark:border-slate-700 bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8] dark:placeholder:text-slate-500 hover:border-[#94A3B8] dark:hover:border-slate-600 focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Product of Interest */}
            <div>
              <label htmlFor={`${idPrefix}product`} className="block text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC] mb-1">
                Product of Interest <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <select
                id={`${idPrefix}product`}
                name="product"
                value={formData.product}
                onChange={handleChange}
                className="w-full min-h-[44px] px-3.5 py-2.5 text-xs rounded-xl border border-[#CBD5E1] dark:border-slate-700 bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-[#F8FAFC] hover:border-[#94A3B8] dark:hover:border-slate-600 focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 transition-all cursor-pointer"
              >
                <option value="hr">Ravo HR (People Operations & Payroll)</option>
                <option value="fuel">Ravo Fuel (Station Management)</option>
                <option value="pos">Ravo POS (Bakery & Food Sales)</option>
                <option value="all">Multiple Products / Enterprise Suite</option>
              </select>
            </div>

            {/* Company Size */}
            <div>
              <label htmlFor={`${idPrefix}companySize`} className="block text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC] mb-1">
                Team / Organization Size <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <select
                id={`${idPrefix}companySize`}
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                className="w-full min-h-[44px] px-3.5 py-2.5 text-xs rounded-xl border border-[#CBD5E1] dark:border-slate-700 bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-[#F8FAFC] hover:border-[#94A3B8] dark:hover:border-slate-600 focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 transition-all cursor-pointer"
              >
                <option value="1-10">1 – 10 Staff (Single Outlet)</option>
                <option value="11-50">11 – 50 Staff</option>
                <option value="51-200">51 – 200 Staff</option>
                <option value="200+">200+ Staff (Multi-Branch)</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor={`${idPrefix}message`} className="block text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC] mb-1">
              Requirements or Operational Challenges
            </label>
            <textarea
              id={`${idPrefix}message`}
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Briefly describe your current setup, branches, or what you want to improve..."
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#CBD5E1] dark:border-slate-700 bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8] dark:placeholder:text-slate-500 hover:border-[#94A3B8] dark:hover:border-slate-600 focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 transition-all"
            />
          </div>

          {/* Agreement Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer min-h-[44px] py-1">
              <input
                id={`${idPrefix}agreeToPolicy`}
                type="checkbox"
                name="agreeToPolicy"
                aria-required="true"
                aria-invalid={!!errors.agreeToPolicy}
                aria-describedby={errors.agreeToPolicy ? `${idPrefix}agreeToPolicy-error` : undefined}
                checked={formData.agreeToPolicy}
                onChange={handleChange}
                className="w-4 h-4 mt-0.5 rounded border-[#CBD5E1] dark:border-slate-700 text-[#0284C7] focus:ring-[#0284C7] focus:ring-offset-1 transition-colors cursor-pointer"
              />
              <span className="text-[11px] text-[#475569] dark:text-[#94A3B8] leading-tight select-none">
                I agree to allow Ravo Labs to contact me regarding this product demonstration request.
              </span>
            </label>
            {errors.agreeToPolicy && (
              <p id={`${idPrefix}agreeToPolicy-error`} role="alert" className="text-[11px] text-red-600 dark:text-red-400 mt-0.5">
                {errors.agreeToPolicy}
              </p>
            )}
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[48px] py-3 text-xs font-semibold text-white bg-[#0284C7] hover:bg-[#0369A1] rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] focus-visible:ring-offset-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Verifying & Preparing Request...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-[#BAE6FD]" />
                  <span>Submit Demonstration Request</span>
                </>
              )}
            </button>
          </div>

          {/* Mode disclosure note */}
          <div className="p-3 rounded-xl bg-[#EFF6FF] dark:bg-[#0284C7]/15 border border-[#BFDBFE]/60 dark:border-[#0284C7]/30 text-[11px] text-[#0369A1] dark:text-[#7DD3FC] flex items-start gap-2 mt-2">
            <Info className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#38BDF8] shrink-0 mt-0.5" />
            <span>
              Demonstration Mode: Inputs are verified on-device with an immediate preview confirmation. For production deployment, route to your designated CRM endpoint (HubSpot/SendGrid/Resend).
            </span>
          </div>
        </form>
      )}
    </div>
  );

  if (isModal) {
    return <div className="w-full">{formContent}</div>;
  }

  return (
    <section
      id="contact"
      ref={elementRef}
      className={`py-20 md:py-28 bg-[#F6F8F3] dark:bg-[#0B0F17] scroll-mt-12 reveal-init transition-colors duration-300 ${
        isRevealed ? 'reveal-visible' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context & Direct Contact Options (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#0284C7] dark:text-[#38BDF8] bg-[#EFF6FF] dark:bg-[#0284C7]/20 border border-[#BFDBFE]/60 dark:border-[#0284C7]/30">
              Direct Solutions Dialogue
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              Let's find the right Ravo solution for your business.
            </h2>
            <p className="text-base sm:text-lg text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              Tell us about your business and what you want to improve. Our engineering and solutions team will schedule an interactive demonstration tailored to your exact operational scale.
            </p>

            {/* Direct Contact Cards */}
            <div className="pt-4 space-y-3">
              <div className="bg-white dark:bg-[#111827] rounded-xl border border-[#CBD5E1]/80 dark:border-slate-800 p-4 flex items-center gap-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] dark:bg-[#0284C7]/20 text-[#0284C7] dark:text-[#38BDF8] border border-[#BFDBFE]/60 dark:border-[#0284C7]/30 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider block">
                    Product Inquiries & Pilots
                  </span>
                  <a
                    href="mailto:contact@ravolabs.com"
                    className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] hover:text-[#0284C7] dark:hover:text-[#38BDF8] transition-colors"
                  >
                    contact@ravolabs.com
                  </a>
                </div>
              </div>

              <div className="bg-white dark:bg-[#111827] rounded-xl border border-[#CBD5E1]/80 dark:border-slate-800 p-4 flex items-center gap-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] dark:bg-[#0284C7]/20 text-[#0284C7] dark:text-[#38BDF8] border border-[#BFDBFE]/60 dark:border-[#0284C7]/30 flex items-center justify-center shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider block">
                    Headquarters
                  </span>
                  <span className="text-xs font-medium text-[#0F172A] dark:text-[#F8FAFC] block">
                    Ravo Labs Engineering Hub · Available Globally
                  </span>
                </div>
              </div>
            </div>

            {/* Explicit Demo Mode Disclosure Badge */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#111827] border border-[#CBD5E1]/80 dark:border-slate-800 text-xs text-[#64748B] dark:text-[#94A3B8] flex items-start gap-2.5 shadow-xs">
              <Info className="w-4 h-4 text-[#0284C7] dark:text-[#38BDF8] shrink-0 mt-0.5" />
              <span>
                Demonstration Mode Active: Submitting this form validates your inputs and presents an immediate interactive booking confirmation preview without dispatching unsolicited emails to third-party services.
              </span>
            </div>
          </div>

          {/* Right Column: Complete Validated Form Card (7 cols) */}
          <div className="lg:col-span-7">
            {formContent}
          </div>
        </div>
      </div>
    </section>
  );
};
