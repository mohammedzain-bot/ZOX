export default function Loading() {
  return (
    <div className="global-loader-container">
      <div className="loader-content">
        <div className="loader-logo">ZOX</div>
        <div className="loader-line">
          <div className="loader-line-inner"></div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .global-loader-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: var(--color-background);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        
        .loader-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .loader-logo {
          font-size: 3rem;
          font-weight: 800;
          letter-spacing: 0.3em;
          color: var(--color-primary);
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .loader-line {
          width: 100px;
          height: 2px;
          background-color: var(--color-border);
          border-radius: 2px;
          overflow: hidden;
          position: relative;
        }

        .loader-line-inner {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 30%;
          background-color: var(--color-primary);
          border-radius: 2px;
          animation: slide 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes slide {
          0% { left: -30%; }
          100% { left: 100%; }
        }
      `}} />
    </div>
  );
}
