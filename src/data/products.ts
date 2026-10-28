import { ProductTheme, ProductDetails, FAQItem } from '../types';

export const PRODUCTS_CONFIG: Record<'hr' | 'fuel' | 'pos', ProductTheme> = {
  hr: {
    id: 'hr',
    name: 'Ravo HR',
    tagline: 'Configurable Human Resource Operations',
    eyebrow: 'RAVO HR · PEOPLE OPERATIONS',
    headline: 'Your people. Your processes. One connected HR system.',
    description:
      'Bring employee records, attendance, leave management, payroll preparation, and employee self-service together in a configurable HR platform designed around your business.',
    primaryCta: 'Explore Ravo HR',
    secondaryCta: 'Book a Demo',
    benefits: [
      { title: 'Configurable workflows', description: 'Tailor approval chains, shift rules, and custom fields to your exact organizational structure.' },
      { title: 'Connected records', description: 'Unify contracts, identity docs, and attendance logs in one secure employee directory.' },
      { title: 'Clearer HR operations', description: 'Automate leave balance tracking, digital payslips, and payroll calculation previews.' }
    ],
    primaryColor: '#278642',
    accentColor: '#2E8B45',
    highlightColor: '#78C85A',
    badgeBg: '#E8F5EB',
    badgeText: '#183124',
    cardBg: '#FFFFFF',
    isDark: false,
    status: 'Available for Guided Demo',
    availabilityNote: 'Ready for demonstration and tailored pilot deployment.'
  },
  fuel: {
    id: 'fuel',
    name: 'Ravo Fuel',
    tagline: 'Operational Fuel Station Platform',
    eyebrow: 'RAVO FUEL · FUEL STATION MANAGEMENT',
    headline: 'Take control of every litre and every transaction.',
    description:
      'Bring fuel stock, tank measurements, pump readings, shift operations, sales reconciliation, and station reporting into a unified fuel management experience.',
    primaryCta: 'Explore Ravo Fuel',
    secondaryCta: 'Discuss Requirements',
    benefits: [
      { title: 'Fuel inventory visibility', description: 'Live tank level monitoring, delivery logging, and automatic ullage calculations.' },
      { title: 'Pump & shift balance', description: 'Instant opening/closing meter reading checks against attendant cash and card collections.' },
      { title: 'Station performance', description: 'Automated daily sales reports, variance alerts, and multi-dispenser tracking.' }
    ],
    primaryColor: '#0284C7',
    accentColor: '#0284C7',
    highlightColor: '#38BDF8',
    badgeBg: '#EFF6FF',
    badgeText: '#0369A1',
    cardBg: '#FFFFFF',
    isDark: false,
    status: 'Available for Guided Demo',
    availabilityNote: 'Operational console available for station owner evaluations.'
  },
  pos: {
    id: 'pos',
    name: 'Ravo POS',
    tagline: 'Point-of-Sale for Food & Beverage',
    eyebrow: 'RAVO POS · SMARTER POINT OF SALE',
    headline: 'Serve faster. Sell smarter. Keep your business moving.',
    description:
      'Give bakeries, restaurants, cafés, and retail food businesses a clearer way to manage orders, billing, menus, stock, and daily sales.',
    primaryCta: 'Explore Ravo POS',
    secondaryCta: 'Request a Demo',
    benefits: [
      { title: 'Faster order handling', description: 'Speedy touch-friendly order entry, split billings, and customizable menu modifier keys.' },
      { title: 'Clear sales visibility', description: 'Real-time category breakdown, payment settlement summaries, and shift closing reports.' },
      { title: 'Connected stock management', description: 'Real-time recipe ingredient deduction and low-stock replenishment notices.' }
    ],
    primaryColor: '#7756D9',
    accentColor: '#7756D9',
    highlightColor: '#A78BFA',
    badgeBg: '#F3EEFF',
    badgeText: '#37276B',
    cardBg: '#FFFFFF',
    isDark: false,
    status: 'Available for Guided Demo',
    availabilityNote: 'Tested for bakeries, cafes, and quick-service dining.'
  }
};

export const PRODUCT_DETAILS: Record<'hr' | 'fuel' | 'pos', ProductDetails> = {
  hr: {
    id: 'hr',
    title: 'Ravo HR — Tailored People Management',
    subtitle: 'Human Resource Management System (HRMS)',
    summary:
      'Designed for growing companies that outgrow generic spreadsheets. Ravo HR adapts to your specific organizational hierarchy, approval rules, and statutory calculation workflows.',
    industryTarget: 'Enterprises, manufacturing plants, technology firms, and hospitality groups.',
    keyFeatures: [
      {
        title: 'Centralized Employee Profiles',
        description: 'Secure storage for identification, job contracts, certification expiry alerts, and emergency contact records.',
        iconName: 'Users'
      },
      {
        title: 'Shift & Biometric Attendance Integration',
        description: 'Supports standard biometric punch devices with intelligent shift roster matching, grace periods, and overtime computation.',
        iconName: 'Clock'
      },
      {
        title: 'Multi-Tier Leave Workflows',
        description: 'Configurable annual, casual, medical, and duty leave quotas with multi-tier managerial approval escalations.',
        iconName: 'CalendarCheck'
      },
      {
        title: 'Statutory Payroll Preparation',
        description: 'Automates basic wage calculations, allowances, deductions, and compliant contributions (EPF/ETF/APIT where applicable).',
        iconName: 'WalletCards'
      },
      {
        title: 'Employee Self-Service (ESS)',
        description: 'Staff can request leaves, review attendance summaries, and download digital payslips directly from any browser.',
        iconName: 'UserCheck'
      },
      {
        title: 'Granular Role Permissions',
        description: 'Strict role-based access control protecting confidential employee compensation records across departments.',
        iconName: 'ShieldCheck'
      }
    ],
    deliverables: [
      'Tailored company policy onboarding',
      'Configurable department and designation trees',
      'Attendance hardware bridge support',
      'Role-based administrator training'
    ]
  },
  fuel: {
    id: 'fuel',
    title: 'Ravo Fuel — Precision Station Management',
    subtitle: 'Fuel Stock, Dispenser, and Shift Reconciliation',
    summary:
      'Built specifically for single and multi-pump fuel station operators. Eliminate daily reconciliation headaches, prevent fuel stock shrinkages, and balance attendant cash settlements.',
    industryTarget: 'Independent fuel stations, highway service stations, and regional fuel distribution networks.',
    keyFeatures: [
      {
        title: 'Live Underground Tank Monitoring',
        description: 'Track tank stock levels, dips, deliveries, and water bottom levels with intuitive graphical representations.',
        iconName: 'Fuel'
      },
      {
        title: 'Pump Meter Shift Logs',
        description: 'Record electronic and mechanical pump totalizer readings at every shift changeover to verify litres dispensed.',
        iconName: 'Gauge'
      },
      {
        title: 'Shift Cash & Card Reconciliation',
        description: 'Compare physical cash collected and POS card receipts against expected sales from pump meters automatically.',
        iconName: 'ClipboardCheck'
      },
      {
        title: 'Discrepancy & Shrinkage Detection',
        description: 'Flag volume variances beyond calibrated dispenser tolerances to rapidly investigate leaks or calibration drift.',
        iconName: 'AlertTriangle'
      },
      {
        title: 'Supplier Delivery Auditing',
        description: 'Log bowser tanker arrivals, invoiced volumes, invoice numbers, and before/after dip readings for invoice verification.',
        iconName: 'Truck'
      },
      {
        title: 'Consolidated Station Reports',
        description: 'Generate daily station summaries, fuel margin breakdowns, lubricant sales, and shift performance audits.',
        iconName: 'BarChart3'
      }
    ],
    deliverables: [
      'Station tank layout calibration setup',
      'Attendant shift protocol configuration',
      'Multi-nozzle meter assignment',
      'Daily reconciliation report templates'
    ]
  },
  pos: {
    id: 'pos',
    title: 'Ravo POS — Modern Hospitality & Bakery Billing',
    subtitle: 'Point-of-Sale System for Food Businesses',
    summary:
      'Engineered for high-volume transactions where seconds count. Ideal for bakeries, cafes, quick-service eateries, and bistros requiring intuitive touch billing and accurate order flow.',
    industryTarget: 'Bakeries, pastry shops, specialty coffee bars, fast-casual restaurants, and food counters.',
    keyFeatures: [
      {
        title: 'Rapid Touch Order Entry',
        description: 'Categorized visual menu grid with quick modifier options (milk choices, cake sizes, packaging options).',
        iconName: 'ShoppingBag'
      },
      {
        title: 'Flexible Payment Methods',
        description: 'Seamlessly split checks, handle multiple payments (cash, card, QR wallets), and apply configurable promotional discounts.',
        iconName: 'CreditCard'
      },
      {
        title: 'Recipe & Ingredient Tracking',
        description: 'Deduct bulk flour, butter, espresso beans, or dairy inventory automatically as finished items are rung up.',
        iconName: 'Boxes'
      },
      {
        title: 'Day-End X & Z Financial Reports',
        description: 'Instant end-of-day register closure reports with tax breakdowns, tender totals, and cash drawer audit.',
        iconName: 'Receipt'
      },
      {
        title: 'Kitchen & Counter Ticket Routing',
        description: 'Direct order dispatch to kitchen display systems or receipt printers by production station.',
        iconName: 'UtensilsCrossed'
      },
      {
        title: 'Multi-Terminal Syncing',
        description: 'Synchronize orders between takeout registers, barista counters, and table staff without latency.',
        iconName: 'Layers'
      }
    ],
    deliverables: [
      'Menu taxonomy and modifier setup',
      'Receipt printing and tax customization',
      'Cash drawer and scanner pairing',
      'Staff cashier onboarding and permissions'
    ]
  }
};

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'general',
    question: 'What is Ravo Labs?',
    answer:
      'Ravo Labs is a software engineering company dedicated to building connected business software that simplifies everyday operations. We design purpose-built systems tailored for specific operational sectors, including human resource operations (Ravo HR), fuel station management (Ravo Fuel), and food & retail point-of-sale (Ravo POS).'
  },
  {
    id: 'faq-2',
    category: 'general',
    question: 'Which products does Ravo Labs offer?',
    answer:
      'Our primary product suite includes three focused solutions: Ravo HR for customizable organizational workforce management; Ravo Fuel for fuel station tank monitoring and shift reconciliation; and Ravo POS for bakeries, cafes, and food retailers.'
  },
  {
    id: 'faq-3',
    category: 'hr',
    question: 'Can Ravo HR be customized for our company?',
    answer:
      'Yes. Customization is a core principle of Ravo HR. We configure attendance shift policies, leave hierarchies, employee profile fields, organizational departments, and statutory payroll workflows to match your specific corporate structure.'
  },
  {
    id: 'faq-3b',
    category: 'hr',
    question: 'Does Ravo HR integrate with our existing biometric time clocks?',
    answer:
      'Yes. Ravo HR includes a secure Local Area Network (LAN) bridge service that continuously reads punch logs from standard fingerprint, RFID, and facial recognition terminals (e.g. ZKTeco, Hikvision) and automatically synchronizes them with shift rosters.'
  },
  {
    id: 'faq-4',
    category: 'fuel',
    question: 'Is Ravo Fuel suitable for single-station and multi-station operators?',
    answer:
      'Ravo Fuel is engineered to scale from a single independent filling station up to multi-branch regional dealer networks. It gives owners and managers visibility into underground tank levels, pump meter balances, shift attendant handovers, and sales reconciliation.'
  },
  {
    id: 'faq-4b',
    category: 'fuel',
    question: 'How does Ravo Fuel monitor tank ullage and prevent stock variance?',
    answer:
      'Ravo Fuel correlates manual dipstick entries and electronic ATG (Automatic Tank Gauge) readings with nozzle dispenser meter totalizers. It flags evaporation, temperature coefficient discrepancies, and unrecorded deliveries before shift handover sign-offs.'
  },
  {
    id: 'faq-5',
    category: 'pos',
    question: 'Can Ravo POS support bakeries with daily batch menus and custom orders?',
    answer:
      'Absolutely. Ravo POS features specialized fast-touch workflows designed for bakeries and pastry cafes, including morning batch inventory tracking, advance custom cake orders, weight-based items, and flexible payment splits.'
  },
  {
    id: 'faq-5b',
    category: 'pos',
    question: 'Does Ravo POS continue functioning if the internet connection drops?',
    answer:
      'Yes. Ravo POS operates with a resilient offline-first local cache architecture. Cashiers can continue ringing up sales, modifying items, and printing guest receipts offline. When connectivity resumes, transaction logs automatically sync to cloud reporting.'
  },
  {
    id: 'faq-6',
    category: 'implementation',
    question: 'Can we request a live product demonstration?',
    answer:
      'Yes! You can use our demo request form below or contact our solutions team. We provide a guided interactive walk-through tailored to your industry workflow before any commitment.'
  },
  {
    id: 'faq-7',
    category: 'implementation',
    question: 'Are integrations available with existing hardware or biometric devices?',
    answer:
      'Yes. Depending on your configuration and operational requirements, Ravo HR supports standard biometric clock-in bridges, while Ravo POS integrates with standard receipt printers, barcode scanners, and cash drawers.'
  },
  {
    id: 'faq-8',
    category: 'general',
    question: 'How is pricing structured?',
    answer:
      'Because every business has distinct operational scales—such as employee counts in HR, nozzle numbers in Fuel, or terminal counts in POS—pricing is structured around your specific operational scope. Contact us to receive a transparent proposal.'
  },
  {
    id: 'faq-9',
    category: 'implementation',
    question: 'How does the implementation and onboarding process work?',
    answer:
      'We follow a disciplined 3-step approach: 1) Understand your operational workflow, 2) Configure the software settings, master data, and permissions, and 3) Support your staff with hands-on walkthroughs and ongoing assistance.'
  }
];

export const COMPANY_VALUES = [
  {
    number: '01',
    title: 'Designed Around Real Operations',
    description:
      'Software should reflect how front-line managers, cashiers, attendants, and HR administrators actually work—not impose rigid academic workflows.'
  },
  {
    number: '02',
    title: 'Connected Information & Clearer Visibility',
    description:
      'Silos create discrepancies. We link transactions to stock, attendance to payroll, and meter logs to banking summaries for immediate clarity.'
  },
  {
    number: '03',
    title: 'Flexible Foundations for Growth',
    description:
      'Whether expanding from one station to five, or growing from twenty employees to hundreds, our platforms configure to your evolving scale.'
  }
];

export const ROADMAP_ITEMS = [
  {
    product: 'Ravo HR',
    tier: 'Core Platform',
    status: 'Available for Guided Demo',
    statusColor: 'emerald',
    features: ['Employee Master Directory', 'Configurable Shift Rosters', 'Multi-Tier Leave Approvals', 'Statutory Payroll Engine', 'Employee Self-Service Portal']
  },
  {
    product: 'Ravo Fuel',
    tier: 'Station Operations',
    status: 'Available for Guided Demo',
    statusColor: 'blue',
    features: ['Underground Tank Stock Gauge', 'Pump Totalizer Shift Logs', 'Attendant Settlement Check', 'Discrepancy Tolerance Alerts', 'Delivery Bowser Dip Auditing']
  },
  {
    product: 'Ravo POS',
    tier: 'Retail & Hospitality',
    status: 'Available for Guided Demo',
    statusColor: 'purple',
    features: ['High-Speed Touch Billing', 'Bakery Category Menus', 'Split Payments & Modifiers', 'Day-End Z-Report Audits', 'Recipe Ingredient Deductions']
  },
  {
    product: 'Ravo Multi-Hub',
    tier: 'Enterprise Analytics',
    status: 'In Active Development',
    statusColor: 'sky',
    features: ['Multi-Branch Executive Dashboard', 'Consolidated Financial Exports', 'Unified Access Management', 'Advanced Anomaly Detection']
  }
];
