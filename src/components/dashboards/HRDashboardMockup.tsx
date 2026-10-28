import React, { useState } from 'react';
import {
  Users,
  CalendarCheck,
  Clock,
  WalletCards,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Search,
  Bell,
  Building,
  Check,
  X
} from 'lucide-react';

export const HRDashboardMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'roster' | 'attendance'>('roster');
  const [leaveStatus, setLeaveStatus] = useState<'pending' | 'approved' | 'declined'>('pending');

  const handleApprove = () => {
    setLeaveStatus('approved');
  };

  const handleDecline = () => {
    setLeaveStatus('declined');
  };

  const handleResetLeave = () => {
    setLeaveStatus('pending');
  };

  const employees = [
    { id: '1', name: 'Liam Thorne', role: 'Operations Lead', dept: 'Operations', status: 'On Shift', time: '08:45 AM' },
    { id: '2', name: 'Maya Perera', role: 'Staff Accountant', dept: 'Finance', status: 'On Shift', time: '08:52 AM' },
    { id: '3', name: 'Elena Rostova', role: 'Quality Specialist', dept: 'Compliance', status: 'Remote', time: '09:02 AM' },
    { id: '4', name: 'Sarah Jenkins', role: 'HR Generalist', dept: 'People', status: 'Annual Leave', time: 'Approved' }
  ];

  return (
    <div className="w-full bg-white dark:bg-[#0D2115] rounded-2xl border border-[#E4E9E1] dark:border-[#1A3D27] shadow-xl overflow-hidden font-sans text-xs text-[#17251D] dark:text-[#F8FAFC] transition-colors duration-200">
      {/* Top Application Bar */}
      <div className="bg-[#F6F8F3] dark:bg-[#07170E] border-b border-[#E4E9E1] dark:border-[#1A3D27] px-4 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E57373]/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFB74D]/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#81C784]/80 inline-block" />
          </div>
          <div className="h-4 w-px bg-[#E4E9E1] dark:bg-[#1A3D27] mx-1" />
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#183124] dark:text-[#E8F5EB]">
            <Building className="w-3.5 h-3.5 text-[#278642] dark:text-[#65C94B]" />
            <span>Horizon Industries Group · HR Operations</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 bg-white dark:bg-[#11291A] border border-[#E4E9E1] dark:border-[#1A3D27] rounded-md px-2.5 py-1 text-[11px] text-[#68736B] dark:text-[#94A3B8]">
            <Search className="w-3 h-3" />
            <span>Search employee or ID...</span>
          </div>
          <button
            type="button"
            className="p-1 text-[#68736B] dark:text-[#94A3B8] hover:text-[#17251D] dark:hover:text-white transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-3.5 h-3.5" />
          </button>
          <div className="w-6 h-6 rounded-full bg-[#278642] text-white flex items-center justify-center font-bold text-[10px]">
            HR
          </div>
        </div>
      </div>

      <div className="flex min-h-[380px]">
        {/* Compact Sidebar */}
        <div className="hidden md:flex flex-col w-40 bg-[#FAFCF8] dark:bg-[#07170E] border-r border-[#E4E9E1] dark:border-[#1A3D27] p-3 gap-1 shrink-0">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#68736B] dark:text-[#94A3B8] px-2 py-1">
            People Portal
          </span>
          <button
            onClick={() => setActiveTab('roster')}
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[11px] font-medium text-left transition-colors ${
              activeTab === 'roster' ? 'bg-[#E8F5EB] dark:bg-[#278642]/25 text-[#278642] dark:text-[#65C94B] font-semibold' : 'text-[#68736B] dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Employee Directory</span>
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[11px] font-medium text-left transition-colors ${
              activeTab === 'attendance' ? 'bg-[#E8F5EB] dark:bg-[#278642]/25 text-[#278642] dark:text-[#65C94B] font-semibold' : 'text-[#68736B] dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Attendance Logs</span>
          </button>
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[11px] text-[#68736B] dark:text-[#94A3B8] opacity-75">
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Leave Requests (3)</span>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[11px] text-[#68736B] dark:text-[#94A3B8] opacity-75">
            <WalletCards className="w-3.5 h-3.5" />
            <span>Payroll Prep</span>
          </div>

          <div className="mt-auto pt-3 border-t border-[#E4E9E1] dark:border-[#1A3D27]">
            <div className="bg-[#E8F5EB]/60 dark:bg-[#278642]/20 rounded-lg p-2">
              <span className="text-[10px] text-[#278642] dark:text-[#65C94B] font-semibold block">Cycle Status</span>
              <span className="text-[11px] text-[#183124] dark:text-[#E8F5EB] font-medium">Oct 2026 Ready</span>
              <span className="text-[9px] text-[#68736B] dark:text-[#94A3B8] block mt-0.5">Cut-off in 4 days</span>
            </div>
          </div>
        </div>

        {/* Dashboard Main Content Area */}
        <div className="flex-1 p-3.5 sm:p-4 space-y-3.5 bg-white dark:bg-[#0A1A10] overflow-hidden">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            <div className="bg-[#F6F8F3] dark:bg-[#0F2618] border border-[#E4E9E1] dark:border-[#1A3D27] rounded-xl p-2.5">
              <span className="text-[10px] text-[#68736B] dark:text-[#94A3B8] block">Total Active Staff</span>
              <div className="flex items-baseline justify-between mt-0.5">
                <span className="text-base font-bold text-[#183124] dark:text-[#F8FAFC] font-mono tabular-nums">142</span>
                <span className="text-[10px] text-[#278642] dark:text-[#65C94B] font-medium flex items-center gap-0.5">
                  <TrendingUp className="w-2.5 h-2.5" /> +6 Q3
                </span>
              </div>
            </div>

            <div className="bg-[#F6F8F3] dark:bg-[#0F2618] border border-[#E4E9E1] dark:border-[#1A3D27] rounded-xl p-2.5">
              <span className="text-[10px] text-[#68736B] dark:text-[#94A3B8] block">Today's Attendance</span>
              <div className="flex items-baseline justify-between mt-0.5">
                <span className="text-base font-bold text-[#183124] dark:text-[#F8FAFC] font-mono tabular-nums">96.4%</span>
                <span className="text-[10px] text-[#278642] dark:text-[#65C94B] font-medium">137 Present</span>
              </div>
            </div>

            <div className="bg-[#F6F8F3] dark:bg-[#0F2618] border border-[#E4E9E1] dark:border-[#1A3D27] rounded-xl p-2.5">
              <span className="text-[10px] text-[#68736B] dark:text-[#94A3B8] block">Pending Approvals</span>
              <div className="flex items-baseline justify-between mt-0.5">
                <span className="text-base font-bold text-[#FF8A24] font-mono tabular-nums">
                  {leaveStatus === 'pending' ? 3 : 2}
                </span>
                <span className="text-[10px] text-[#68736B] dark:text-[#94A3B8]">Leaves</span>
              </div>
            </div>

            <div className="bg-[#F6F8F3] dark:bg-[#0F2618] border border-[#E4E9E1] dark:border-[#1A3D27] rounded-xl p-2.5">
              <span className="text-[10px] text-[#68736B] dark:text-[#94A3B8] block">Payroll Review</span>
              <div className="flex items-baseline justify-between mt-0.5">
                <span className="text-base font-bold text-[#278642] dark:text-[#65C94B] flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100%
                </span>
                <span className="text-[10px] text-[#68736B] dark:text-[#94A3B8]">Audited</span>
              </div>
            </div>
          </div>

          {/* Interactive Approval Banner */}
          <div className="bg-[#F2F8F4] dark:bg-[#0E2818] border border-[#278642]/20 dark:border-[#278642]/40 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#278642]/15 dark:bg-[#278642]/30 text-[#278642] dark:text-[#65C94B] flex items-center justify-center font-bold text-xs shrink-0">
                DR
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-[#183124] dark:text-[#F8FAFC] text-xs">Daniel Reynolds</span>
                  <span className="text-[10px] text-[#68736B] dark:text-[#94A3B8]">· 3 Days Casual Leave (Family)</span>
                </div>
                <span className="text-[10px] text-[#68736B] dark:text-[#94A3B8] block">
                  {leaveStatus === 'approved'
                    ? 'Oct 28 – Oct 30 · Remaining Balance: 4 Days (Deducted)'
                    : leaveStatus === 'declined'
                    ? 'Oct 28 – Oct 30 · Request Declined (No Balance Change)'
                    : 'Oct 28 – Oct 30 · Current Balance: 7 Days Available'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 self-end sm:self-center">
              {leaveStatus === 'approved' ? (
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#278642] dark:text-[#65C94B] bg-white dark:bg-[#11291A] px-2.5 py-1 rounded-md border border-[#278642]/30 shadow-xs">
                    <Check className="w-3 h-3" /> Approved & Synced
                  </span>
                  <button
                    onClick={handleResetLeave}
                    className="text-[10px] text-[#68736B] dark:text-[#94A3B8] hover:text-[#183124] dark:hover:text-white underline ml-1"
                  >
                    Undo
                  </button>
                </div>
              ) : leaveStatus === 'declined' ? (
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-600 dark:text-red-400 bg-white dark:bg-[#11291A] px-2.5 py-1 rounded-md border border-red-200 dark:border-red-900/40 shadow-xs">
                    <X className="w-3 h-3" /> Request Declined
                  </span>
                  <button
                    onClick={handleResetLeave}
                    className="text-[10px] text-[#68736B] dark:text-[#94A3B8] hover:text-[#183124] dark:hover:text-white underline ml-1"
                  >
                    Undo
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleApprove}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-white bg-[#278642] hover:bg-[#1e6b34] rounded-md transition-colors"
                  >
                    <Check className="w-3 h-3" /> Approve
                  </button>
                  <button
                    onClick={handleDecline}
                    className="inline-flex items-center gap-1 px-2 py-1 text-[11px] text-[#68736B] dark:text-[#94A3B8] hover:bg-slate-200/60 dark:hover:bg-white/10 rounded-md transition-colors"
                  >
                    <X className="w-3 h-3" /> Decline
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Employee Table & Biometric Log */}
          <div className="border border-[#E4E9E1] dark:border-[#1A3D27] rounded-xl overflow-hidden bg-white dark:bg-[#0D2115]">
            <div className="bg-[#F6F8F3] dark:bg-[#07170E] px-3.5 py-2 border-b border-[#E4E9E1] dark:border-[#1A3D27] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[11px] text-[#183124] dark:text-[#E8F5EB]">
                  {activeTab === 'roster' ? 'Active Roster & Department Presence' : 'Biometric Fingerprint Punch Feed'}
                </span>
                <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-[#E8F5EB] dark:bg-[#278642]/25 text-[#278642] dark:text-[#65C94B]">
                  {activeTab === 'roster' ? '142 Active' : 'LAN Bridge #01'}
                </span>
              </div>
              <span className="text-[10px] text-[#68736B] dark:text-[#94A3B8] font-mono">Live Sync</span>
            </div>

            <div className="divide-y divide-[#E4E9E1] dark:divide-[#1A3D27]">
              {activeTab === 'roster' ? (
                employees.map((emp) => (
                  <div key={emp.id} className="px-3.5 py-2 flex items-center justify-between gap-2 hover:bg-[#FAFCF8] dark:hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-[#E8F5EB] dark:bg-[#278642]/25 text-[#278642] dark:text-[#65C94B] flex items-center justify-center font-bold text-[10px] shrink-0 border border-[#278642]/20">
                        {emp.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div className="truncate">
                        <span className="font-semibold text-[#183124] dark:text-[#F8FAFC] block truncate text-[11px]">{emp.name}</span>
                        <span className="text-[10px] text-[#68736B] dark:text-[#94A3B8] block">{emp.role} · {emp.dept}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="hidden sm:inline text-[10px] font-mono tabular-nums text-[#68736B] dark:text-[#94A3B8]">
                        {emp.time}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                          emp.status === 'On Shift'
                            ? 'bg-[#E8F5EB] dark:bg-[#278642]/25 text-[#278642] dark:text-[#65C94B]'
                            : emp.status === 'Remote'
                            ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300'
                            : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                        }`}
                      >
                        {emp.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                [
                  { id: 'b1', name: 'Liam Thorne', device: 'Turnstile A (Main Gate)', time: '08:45:12 AM', method: 'Fingerprint Match', status: 'In' },
                  { id: 'b2', name: 'Maya Perera', device: 'Finance Wing Biometric', time: '08:52:04 AM', method: 'RFID Card Badge', status: 'In' },
                  { id: 'b3', name: 'Elena Rostova', device: 'Remote VPN Authenticator', time: '09:02:45 AM', method: 'MFA Verified', status: 'Logged' },
                  { id: 'b4', name: 'S. Rajendran', device: 'Warehouse Terminal 2', time: '09:11:30 AM', method: 'Fingerprint Match', status: 'In' }
                ].map((log) => (
                  <div key={log.id} className="px-3.5 py-2 flex items-center justify-between gap-2 hover:bg-[#FAFCF8] dark:hover:bg-white/5 transition-colors font-mono text-[10px]">
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#278642] dark:bg-[#65C94B]" />
                      <span className="font-semibold text-[#183124] dark:text-[#F8FAFC]">{log.name}</span>
                      <span className="text-[#68736B] dark:text-[#94A3B8] truncate">({log.device})</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[#278642] dark:text-[#65C94B] font-semibold">{log.time}</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#11291A] text-slate-700 dark:text-slate-300">{log.method}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Illustrative preview disclaimer footer */}
      <div className="bg-[#FAFCF8] dark:bg-[#07170E] border-t border-[#E4E9E1] dark:border-[#1A3D27] px-4 py-1.5 flex items-center justify-between text-[10px] text-[#68736B] dark:text-[#94A3B8]">
        <span>Simulated illustrative interface · Ravo HR Core</span>
        <span className="font-mono">v3.2 · Configurable Engine</span>
      </div>
    </div>
  );
};
