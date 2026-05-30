// components/ui/PaymentDueOverlay.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Lock, CreditCard, AlertTriangle, ArrowRight } from 'lucide-react';

interface PaymentDueOverlayProps {
  isOpen?: boolean;
  onPay: () => void;
}

export function PaymentDueOverlay({ 
  isOpen = true,
  onPay
}: PaymentDueOverlayProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setTimeout(() => setIsAnimating(true), 50);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      setIsAnimating(false);
    }
  }, [isOpen]);

  const handlePay = () => {
    onPay();
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Background overlay - Cobre tudo */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
      
      {/* Marca d'água de fundo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div className="text-center opacity-[0.03]">
          <Lock className="h-64 w-64 text-white mx-auto" />
          <p className="text-6xl font-bold text-white mt-4">BLOQUEADO</p>
        </div>
      </div>
      
      {/* Card principal */}
      <div 
        className={`relative w-full max-w-md transition-all duration-500 transform ${
          isAnimating ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'
        }`}
      >
        <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-red-600 to-red-700 p-8">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative text-center">
              {/* Ícone de bloqueio */}
              <div className="mx-auto w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                <Lock className="h-10 w-10 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">
                Acesso Bloqueado
              </h2>
              <p className="text-white/80 text-sm">
                Pagamento pendente detectado
              </p>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="p-8 space-y-6">
            {/* Mensagem de bloqueio */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-4">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span className="text-sm font-medium text-red-400">PAGAMENTO PENDENTE</span>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed">
                Seu acesso está temporariamente bloqueado devido a um pagamento em aberto. 
                Regularize sua situação para continuar utilizando o serviço.
              </p>
            </div>

            {/* Aviso de consequências */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-red-400 font-medium">Serviço Suspenso</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Todas as funcionalidades estão indisponíveis até a confirmação do pagamento.
                  </p>
                </div>
              </div>
            </div>

            {/* Informação de liberação */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-green-400 font-medium">Liberação Imediata</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Após a confirmação do pagamento, seu acesso será restaurado instantaneamente.
                  </p>
                </div>
              </div>
            </div>

            {/* Botão de pagamento */}
            <button
              onClick={handlePay}
              className="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-[1.02] shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 group text-lg"
            >
              <CreditCard className="h-5 w-5" />
              <span>Regularizar Pagamento</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Links secundários */}
            <div className="space-y-2 text-center">
              <button
                onClick={() => window.location.href = '/suporte'}
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                Precisa de ajuda? Entre em contato
              </button>
            </div>

            {/* Métodos de pagamento */}
            <div className="pt-4 border-t border-gray-800">
              <p className="text-xs text-gray-500 text-center mb-3">
                Pagamento rápido e seguro
              </p>
              <div className="flex justify-center gap-6">
                <span className="text-xs text-gray-500">💳 Cartão</span>
                <span className="text-xs text-gray-500">📱 PIX</span>
                <span className="text-xs text-gray-500">📄 Boleto</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
