import React, { useState, useEffect } from 'react';
import { ProductId } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { SiteHeader } from './components/SiteHeader';
import { ProductHero } from './components/ProductHero';
import { ProductOverview } from './components/ProductOverview';
import { WhyRavo } from './components/WhyRavo';
import { HRFeatureSection } from './components/features/HRFeatureSection';
import { FuelFeatureSection } from './components/features/FuelFeatureSection';
import { POSFeatureSection } from './components/features/POSFeatureSection';
import { SolutionsSection } from './components/SolutionsSection';
import { HowItWorks } from './components/HowItWorks';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ProductRoadmap } from './components/ProductRoadmap';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { SiteFooter } from './components/SiteFooter';
import { DemoRequestModal } from './components/DemoRequestModal';
import { ProductScrollIndicator } from './components/ProductScrollIndicator';

function AppContent() {
  const [activeProductId, setActiveProductId] = useState<ProductId>('hr');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [demoModalProduct, setDemoModalProduct] = useState<ProductId>('hr');

  // URL Hash synchronization for products (e.g. #fuel, #pos, #hr)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase().replace('#', '');
      if (hash === 'hr' || hash === 'product-hr') {
        setActiveProductId('hr');
      } else if (hash === 'fuel' || hash === 'product-fuel') {
        setActiveProductId('fuel');
      } else if (hash === 'pos' || hash === 'product-pos') {
        setActiveProductId('pos');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectProduct = (id: ProductId) => {
    setActiveProductId(id);
    // Preserves current URL without pushing hash states
  };

  const handleExploreProduct = (id: ProductId) => {
    if (id === 'hr') {
      window.open('https://ravolabs.cloud/hr/login', '_blank');
      return;
    }
    setActiveProductId(id);
    const element = document.getElementById(`product-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenDemoModal = (product: ProductId = activeProductId) => {
    setDemoModalProduct(product);
    setIsDemoModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F8F3] dark:bg-[#0B0F17] text-[#17251D] dark:text-[#F8FAFC] selection:bg-[#2E8B45]/20 selection:text-[#10271D] dark:selection:bg-[#2E8B45]/40 dark:selection:text-[#F8FAFC] transition-colors duration-200">
      {/* 1 & 2. Unified Sticky Header with Announcement Bar */}
      <header className="sticky top-0 z-40 shadow-xs">
        <AnnouncementBar />
        <SiteHeader
          onSelectProduct={handleExploreProduct}
          onOpenDemo={handleOpenDemoModal}
        />
      </header>

      <main className="flex-1">
        {/* 3. Interactive Three-Product Hero Showcase */}
        <ProductHero
          activeProductId={activeProductId}
          onSelectProduct={handleSelectProduct}
          onExploreProduct={handleExploreProduct}
          onOpenDemo={handleOpenDemoModal}
        />

        {/* 4. Product Overview and Selector */}
        <ProductOverview
          onSelectProduct={handleSelectProduct}
          onExploreProduct={handleExploreProduct}
          onOpenDemo={handleOpenDemoModal}
        />

        {/* 5. Why Ravo Labs / Company Value Proposition */}
        <WhyRavo />

        {/* 6. Individual Ravo HR, Ravo Fuel, and Ravo POS Feature Sections */}
        <HRFeatureSection onOpenDemo={() => handleOpenDemoModal('hr')} />
        <FuelFeatureSection onOpenDemo={() => handleOpenDemoModal('fuel')} />
        <POSFeatureSection onOpenDemo={() => handleOpenDemoModal('pos')} />

        {/* 7. How the Products Help Different Businesses */}
        <SolutionsSection
          onSelectProduct={handleSelectProduct}
          onOpenDemo={handleOpenDemoModal}
        />

        {/* 8. Company Capabilities & Approach: How It Works */}
        <HowItWorks />

        {/* 9. Customer Testimonials & Field Results Carousel */}
        <TestimonialsSection onOpenDemo={handleOpenDemoModal} />

        {/* 10. Product Availability and Roadmap */}
        <ProductRoadmap />

        {/* 10. Frequently Asked Questions */}
        <FAQSection />

        {/* 11. Contact and Demo Request Section */}
        <ContactSection initialProduct={activeProductId} />
      </main>

      {/* 12. Comprehensive Footer */}
      <SiteFooter
        onSelectProduct={handleExploreProduct}
        onOpenDemo={handleOpenDemoModal}
      />

      {/* Floating Side Progress Indicator for Product Sections (HR, Fuel, POS) */}
      <ProductScrollIndicator />

      {/* Reusable Accessible Demo Request Modal */}
      <DemoRequestModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        initialProduct={demoModalProduct}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

