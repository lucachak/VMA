// app/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/layout/Footer';
import { CltPjCalculator } from '@/components/sections/CltPjCalculator';
import { TaxCalendar } from '@/components/sections/Taxcalendar';
import { TrustedBy } from '@/components/sections/TrustedBy';
import { PaymentDueOverlay } from '@/components/ui/PaymentDueOverlay';
// ou import { PaymentBlockScreen } from '@/components/ui/PaymentBlockScreen';

export default function Home() {
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const response = await fetch('/api/payment-status');
        const data = await response.json();
        setIsPaid(data.isPaid);
      } catch (error) {
        setIsPaid(false);
      } finally {
        setLoading(false);
      }
    };

    checkPaymentStatus();
  }, []);

  const handlePayment = () => {
    window.location.href = '/pagamento';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <TaxCalendar />
        <CltPjCalculator />
        <TrustedBy />
        <Contact />
      </main>
      <Footer />
      
      {/* Tela de bloqueio - aparece se não pagou */}
      {/*!isPaid && (
        <PaymentDueOverlay 
          isOpen={true}
          onPay={handlePayment}
        />
      )*/}
    </div>
  );
}
