'use client';
import React, { useEffect, useState } from 'react';

export default function SplashScreen({ onFinish }) {
  const [step, setStep] = useState(0);
  const [hydrated, setHydrated] = useState(false); // Prevents hydration mismatch

  useEffect(() => {
    setHydrated(true); // Wait for hydration

    const timers = [];
    timers.push(setTimeout(() => setStep(1), 0));        // Welcome    // Quote
    timers.push(setTimeout(() => setStep(2), 3000));     // FLY
    timers.push(setTimeout(() => {
      setStep(3);
      if (onFinish) onFinish();
    }, 6000));                                           // Finish

    return () => timers.forEach(clearTimeout);
  }, [onFinish]);

  if (!hydrated || step === 3) return null;

  return (
    <div className="animate-fade-out fixed inset-0 z-[9999] flex items-center justify-center bg-[#0d1224] text-white text-center text-xl font-semibold">
      <div className="transition-opacity duration-1000 ease-in-out opacity-0 animate-fade-out">
        {step === 1 && <div className="text-3xl text-[#16f2b3] animate-fade-in">Welcome to My Portfolio</div>}
        {step === 2 && (
          <div className="text-3xl text-[#16f2b3] animate-fade-in">
            FLY&nbsp;<span className="text-3xl text-pink-500 animate-fade-in">{"(飛べ)"}</span>
          </div>
        )}
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s ease forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-out {
          animation: fadeIn 1s ease forwards;
        }
        @keyframes fadeout {
          from {opacity: 1; transform: scale(1);}
          to { opacity: 0; transform: scale(0.95); }
        }
      `}</style>
    </div>
  );
}
