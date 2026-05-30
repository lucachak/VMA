// components/ui/PaymentBlockScreen.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { Lock, CreditCard, AlertCircle } from 'lucide-react';

interface PaymentBlockScreenProps {
  onPay: () => void;
  amount?: string;
  daysOverdue?: number;
}

export function PaymentBlockScreen({ 
  onPay, 
  amount = "R$ 29,90",
  daysOverdue = 5
}: PaymentBlockScreenProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 300);
  }, []);

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
      {/* Fundo que cobre tudo */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
      
      {/* Grade de fundo para efeito visual */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>
      
      {/* Conteúdo centralizado */}
      <div className="relative text-center max-w-md w-full">
        <Lock className="h-20 w-20 text-red-500 mx-auto mb-6 animate-pulse" />
        
        <h1 className="text-3xl font-bold text-white mb-3">
          Acesso Bloqueado
        </h1>
        
        <p className="text-gray-400 mb-8">
          Seu pagamento está em atraso há {daysOverdue} dias. 
          Regularize agora para continuar usando o serviço.
        </p>
        
        <div className="bg-gray-800 rounded-xl p-6 mb-6">
          <p className="text-sm text-gray-400 mb-2">Valor pendente</p>
          <p className="text-4xl font-bold text-white mb-1">{amount}</p>
          <div className="flex items-center justify-center gap-2 text-red-400 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>Vencido</span>
          </div>
        </div>
        
        <button
          onClick={onPay}
          className="w-full px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
        >
          <CreditCard className="h-5 w-5" />
          Regularizar Pagamento
        </button>
        
        <p className="text-xs text-gray-600 mt-4">
          Pagamento processado via PIX, cartão ou boleto
        </p>
      </div>
    </div>
  );
}
