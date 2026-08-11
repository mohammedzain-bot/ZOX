'use client';
import { useState, useEffect } from 'react';

export default function SplashScreen() {
  const [stage, setStage] = useState(0); 
  // 0: Initial dots, 1: Store name, 2: Fade out, 3: Unmount

  useEffect(() => {
    // Stage 0 -> 1: Show dots for 1.5s, then show ZOX
    const timer1 = setTimeout(() => {
      setStage(1);
    }, 2000);

    // Stage 1 -> 2: Show ZOX for 1.5s, then fade out
    const timer2 = setTimeout(() => {
      setStage(2);
    }, 3500);

    // Stage 2 -> 3: Unmount after fade out
    const timer3 = setTimeout(() => {
      setStage(3);
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  if (stage === 3) return null;

  return (
    <div className={`splash-container ${stage === 2 ? 'fade-out' : ''}`}>
      <div className="splash-content">
        {stage === 0 ? (
          <div className="dots-container">
            <div className="dot dot-1"></div>
            <div className="dot dot-2"></div>
            <div className="dot dot-3"></div>
            <div className="dot dot-4"></div>
            <div className="dot dot-5"></div>
          </div>
        ) : (
          <div className="splash-brand fade-in">
            ZOX
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .splash-container {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: var(--color-background, #ffffff);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
        }

        .splash-container.fade-out {
          opacity: 0;
          pointer-events: none;
        }

        .splash-content {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dots-container {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .dot {
          border-radius: 50%;
          animation: bounce 1.2s infinite ease-in-out alternate;
        }

        /* Sizes increasing from left to right */
        .dot-1 { width: 8px; height: 8px; background-color: #55efc4; animation-delay: 0s; }
        .dot-2 { width: 12px; height: 12px; background-color: #00b894; animation-delay: 0.1s; }
        .dot-3 { width: 16px; height: 16px; background-color: #00cec9; animation-delay: 0.2s; }
        .dot-4 { width: 22px; height: 22px; background-color: #0984e3; animation-delay: 0.3s; }
        .dot-5 { width: 30px; height: 30px; background-color: #0097e6; animation-delay: 0.4s; }

        @keyframes bounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-15px); }
        }

        .splash-brand {
          font-size: 4rem;
          font-weight: 800;
          letter-spacing: 0.4em;
          color: var(--color-primary, #0A4C2E);
        }

        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}} />
    </div>
  );
}
