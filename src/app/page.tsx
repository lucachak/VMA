// app/page.tsx
"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/layout/Footer';
import { CltPjCalculator } from '@/components/sections/CltPjCalculator';
import { TaxCalendar } from '@/components/sections/Taxcalendar';
import { TrustedBy } from '@/components/sections/TrustedBy';
import { PaywallOverlay } from '@/components/ui/PaywallOverlay';

export default function Home() {
  const [showOverlay, setShowOverlay] = useState(false);
  const isPremium = false; // Replace with your auth logic

  const handleUpgrade = () => {
    // Navigate to pricing page or open checkout
    window.location.href = '/pricing';
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        
        {/* Inline warning for TaxCalendar */}
        {!isPremium && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <PaywallWarning 
              title="Calendário Fiscal Premium"
              description="Acesse o calendário fiscal completo com alertas personalizados e prazos importantes."
              onUpgrade={handleUpgrade}
            />
          </div>
        )}
        <TaxCalendar />
        
        {/* Trigger overlay for Calculator */}
        <div onClick={() => !isPremium && setShowOverlay(true)}>
          <CltPjCalculator isPremium={isPremium} />
        </div>
        
        <TrustedBy />
        <Contact />
      </main>
      <Footer />
      
      {/* Full overlay paywall */}
      <PaywallOverlay 
        isOpen={showOverlay}
        onClose={() => setShowOverlay(false)}
        onUpgrade={handleUpgrade}
        featureName="Calculadora CLT vs PJ"
      />
    </div>
  );
}
