export const BackgroundPattern = () => (
  <div className="fixed inset-0 -z-30 pointer-events-none overflow-hidden">
    {/* Subtle Dot Pattern */}
    <svg className="absolute w-full h-full opacity-[0.03] dark:opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dot-pattern" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dot-pattern)" />
    </svg>

    {/* Gradient Orb 1 (Top Left) */}
    <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] animate-pulse-slow" />
    
    {/* Gradient Orb 2 (Bottom Right) */}
    <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-nobel-gold/5 blur-[120px] animate-pulse-slow delay-1000" />
  </div>
);
