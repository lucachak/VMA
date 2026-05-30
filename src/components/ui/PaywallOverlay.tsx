// components/ui/PaywallOverlay.tsx
"use client";

import React from 'react';
import { Lock, Crown, Check } from 'lucide-react';

interface PaywallOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  featureName?: string;
  features?: string[];
  price?: string;
}

export function PaywallOverlay({ 
  isOpen, 
  onClose, 
  onUpgrade,
  featureName = "recurso premium",
  features = [
    "Acesso ilimitado a todas as ferramentas",
    "Suporte prioritário",
    "Sem anúncios",
    "Atualizações exclusivas"
  ],
  price = "R$ 29,90/mês"
}: PaywallOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 animate-in fade-in zoom-in duration-300">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mb-4">
            <Crown className="h-8 w-8 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Recurso Premium
          </h2>
          
          <p className="text-gray-600 mb-6">
            O acesso ao <span className="font-semibold">{featureName}</span> está disponível apenas para assinantes premium.
          </p>
          
          <div className="bg-amber-50 rounded-xl p-6 mb-6">
            <div className="text-3xl font-bold text-amber-600 mb-1">
              {price}
            </div>
            <div className="text-sm text-amber-700">por mês</div>
          </div>
          
          <ul className="space-y-3 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
          
          <div className="space-y-3">
            <button
              onClick={onUpgrade}
              className="w-full px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-md hover:shadow-lg"
            >
              Assinar Agora
            </button>
            
            <button
              onClick={onClose}
              className="w-full px-6 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
