import React, { useState } from 'react';
import {
  Users,
  Clock,
  CalendarCheck,
  WalletCards,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Settings2,
  FileText,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { PRODUCT_DETAILS } from '../../data/products';
import { HRDashboardMockup } from '../dashboards/HRDashboardMockup';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface HRFeatureSectionProps {
  onOpenDemo: () => void;
}

export const HRFeatureSection: React.FC<HRFeatureSectionProps> = ({ onOpenDemo }) => {
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(1);
  const { elementRef, isRevealed } = useScrollReveal();
  const hrDetails = PRODUCT_DETAILS.hr;

  const workflowSteps = [
    {
      step: 1,
      title: '01. Configure Company Policies',
      desc: 'Set custom department designations, leave entitlement tiers, overtime multipliers, and biometric shift grace rules tailored to your organization.',
      highlight: 'Tailored Leave & Shift Hierarchy'
    },
    {
      step: 2,
      title: '02. Manage Staff & Attendance',
      desc: 'Capture employee records, track contract renewal deadlines, and synchronize real-time clock-in records from biometric fingerprint devices.',
      highlight: 'Live Biometric Punch Sync'
    },
    {
      step: 3,
      title: '03. Review Connected Workflows',
      desc: 'Review automated statutory calculations (EPF, ETF, and APIT where applicable), approve pending leaves with one click, and deliver digital payslips.',
      highlight: 'Audited Payroll Cut-off'
    }
  ];

  return (
    <section
      id="product-hr"
      ref={elementRef}
      className={`py-20 md:py-28 bg-[#FFFFFF] dark:bg-[#07170E] text-[#17251D] dark:text-[#F8FAFC] border-b border-[#E4E9E1] dark:border-[#1A3D27] scroll-mt-12 transition-colors duration-200 reveal-init ${
        isRevealed ? 'reveal-visible' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Top Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold text-[#278642] dark:text-[#65C94B] bg-[#E8F5EB] dark:bg-[#163823] border border-[#278642]/20 dark:border-[#278642]/40 mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Ravo HR · Customizable People Management</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#10271D] dark:text-[#F8FAFC] tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
            Built around your company policies, not someone else's.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#566359] dark:text-[#9FB1A5] leading-relaxed">
            {hrDetails.summary}
          </p>
        </div>

        {/* 3-Step Interactive Workflow Demonstration */}
        <div className="bg-[#F6F8F3] dark:bg-[#0D2115] border border-[#E4E9E1] dark:border-[#1A3D27] rounded-2xl p-6 lg:p-8 mb-16 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#E4E9E1] dark:border-[#1A3D27]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#278642] dark:text-[#65C94B] block">
                Interactive Operational Workflow
              </span>
              <h3 className="text-xl font-bold text-[#10271D] dark:text-[#F8FAFC] mt-0.5">
                How Ravo HR operates inside your organization
              </h3>
            </div>
            <span className="text-xs text-[#68736B] dark:text-[#9FB1A5] font-mono">
              Step {activeWorkflowStep} of 3 Selected
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
            {workflowSteps.map((ws, i) => {
              const isSelected = activeWorkflowStep === ws.step;
              return (
                <button
                  key={ws.step}
                  onClick={() => setActiveWorkflowStep(ws.step)}
                  className={`p-4 rounded-xl text-left border transition-all duration-200 cursor-pointer active:scale-[0.99] ${
                    isSelected
                      ? 'bg-white dark:bg-[#163823] border-[#278642] dark:border-[#65C94B] shadow-md ring-1 ring-[#278642] dark:ring-[#65C94B] -translate-y-0.5'
                      : 'bg-white/70 dark:bg-[#07170E]/80 border-[#E4E9E1] dark:border-[#1A3D27] hover:bg-white dark:hover:bg-[#112a1a] hover:border-[#278642]/40 text-[#566359] dark:text-[#9FB1A5]'
                  }`}
                >
                  <span
                    className={`text-xs font-bold block mb-1 transition-colors ${
                      isSelected ? 'text-[#278642] dark:text-[#65C94B]' : 'text-[#68736B] dark:text-[#9FB1A5]'
                    }`}
                  >
                    {ws.title}
                  </span>
                  <p className="text-xs text-[#17251D] dark:text-[#F8FAFC] leading-relaxed line-clamp-3">
                    {ws.desc}
                  </p>
                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-[#1A3D27] flex items-center justify-between text-[11px] font-semibold text-[#278642] dark:text-[#65C94B]">
                    <span>{ws.highlight}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${isSelected ? 'translate-x-0.5' : ''}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Workflow Contextual Visual State with smooth fade */}
          <div className="bg-white dark:bg-[#07170E] rounded-xl border border-[#E4E9E1] dark:border-[#1A3D27] p-5 transition-all duration-300 min-h-[110px]">
            <div key={activeWorkflowStep} className="animate-in fade-in duration-200">
              {activeWorkflowStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 bg-[#F2F8F4] dark:bg-[#0D2115] rounded-lg border border-[#278642]/20 dark:border-[#1A3D27] hover:border-[#278642]/40 transition-colors">
                    <span className="font-bold text-[#183124] dark:text-[#65C94B] block mb-1">Configurable Shifts</span>
                    <p className="text-[#566359] dark:text-[#9FB1A5]">Morning (08:30 - 17:00), Evening, and Night split rotations with custom 15-minute grace tolerance.</p>
                  </div>
                  <div className="p-3 bg-[#F2F8F4] dark:bg-[#0D2115] rounded-lg border border-[#278642]/20 dark:border-[#1A3D27] hover:border-[#278642]/40 transition-colors">
                    <span className="font-bold text-[#183124] dark:text-[#65C94B] block mb-1">Approval Hierarchy</span>
                    <p className="text-[#566359] dark:text-[#9FB1A5]">Direct Supervisor → Department Head → HR Operations escalations with automatic substitution delegates.</p>
                  </div>
                  <div className="p-3 bg-[#F2F8F4] dark:bg-[#0D2115] rounded-lg border border-[#278642]/20 dark:border-[#1A3D27] hover:border-[#278642]/40 transition-colors">
                    <span className="font-bold text-[#183124] dark:text-[#65C94B] block mb-1">Designation Trees</span>
                    <p className="text-[#566359] dark:text-[#9FB1A5]">Unlimited nested branches, business units, cost centers, and custom employment contracts.</p>
                  </div>
                </div>
              )}

              {activeWorkflowStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 bg-[#F2F8F4] dark:bg-[#0D2115] rounded-lg border border-[#278642]/20 dark:border-[#1A3D27] hover:border-[#278642]/40 transition-colors">
                    <span className="font-bold text-[#183124] dark:text-[#65C94B] block mb-1">Biometric Bridge</span>
                    <p className="text-[#566359] dark:text-[#9FB1A5]">Pulls punch records from local LAN and cloud fingerprint/RFID terminals automatically.</p>
                  </div>
                  <div className="p-3 bg-[#F2F8F4] dark:bg-[#0D2115] rounded-lg border border-[#278642]/20 dark:border-[#1A3D27] hover:border-[#278642]/40 transition-colors">
                    <span className="font-bold text-[#183124] dark:text-[#65C94B] block mb-1">Leave Balance Accrual</span>
                    <p className="text-[#566359] dark:text-[#9FB1A5]">Automatic monthly or annual leave credit calculations with prorated probation rules.</p>
                  </div>
                  <div className="p-3 bg-[#F2F8F4] dark:bg-[#0D2115] rounded-lg border border-[#278642]/20 dark:border-[#1A3D27] hover:border-[#278642]/40 transition-colors">
                    <span className="font-bold text-[#183124] dark:text-[#65C94B] block mb-1">Self-Service Portal</span>
                    <p className="text-[#566359] dark:text-[#9FB1A5]">Team members submit leave notes and view past attendance logs on phone or desktop.</p>
                  </div>
                </div>
              )}

              {activeWorkflowStep === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 bg-[#F2F8F4] dark:bg-[#0D2115] rounded-lg border border-[#278642]/20 dark:border-[#1A3D27] hover:border-[#278642]/40 transition-colors">
                    <span className="font-bold text-[#183124] dark:text-[#65C94B] block mb-1">Pre-Payroll Reconciliation</span>
                    <p className="text-[#566359] dark:text-[#9FB1A5]">Flags unexcused absences, unverified punches, and overtime disputes before month-end lock.</p>
                  </div>
                  <div className="p-3 bg-[#F2F8F4] dark:bg-[#0D2115] rounded-lg border border-[#278642]/20 dark:border-[#1A3D27] hover:border-[#278642]/40 transition-colors">
                    <span className="font-bold text-[#183124] dark:text-[#65C94B] block mb-1">Statutory Contributions</span>
                    <p className="text-[#566359] dark:text-[#9FB1A5]">Applies standard pension and tax formulas with customizable allowance categories.</p>
                  </div>
                  <div className="p-3 bg-[#F2F8F4] dark:bg-[#0D2115] rounded-lg border border-[#278642]/20 dark:border-[#1A3D27] hover:border-[#278642]/40 transition-colors">
                    <span className="font-bold text-[#183124] dark:text-[#65C94B] block mb-1">Digital Payslip Dispatch</span>
                    <p className="text-[#566359] dark:text-[#9FB1A5]">PDF generation and password-protected direct digital payslip delivery.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feature Grid & Dashboard Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Key Modules List (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-bold text-[#10271D] dark:text-[#F8FAFC] tracking-tight">
              Six foundational pillars of modern HR operations
            </h3>

            <div className="space-y-4">
              {hrDetails.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#F6F8F3] dark:hover:bg-[#0D2115] transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#E8F5EB] dark:bg-[#163823] text-[#278642] dark:text-[#65C94B] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#10271D] dark:text-[#F8FAFC]">{feat.title}</h4>
                    <p className="text-xs text-[#566359] dark:text-[#9FB1A5] mt-0.5 leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenDemo}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#278642] hover:bg-[#206f36] transition-all shadow-md active:scale-[0.98]"
              >
                <span>Discuss Your HR Requirements</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Live HR Console Mockup (7 cols) */}
          <div className="lg:col-span-7">
            <HRDashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
};
