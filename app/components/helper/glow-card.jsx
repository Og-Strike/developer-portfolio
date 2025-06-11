"use client";


const GlowCard = ({ children, identifier }) => {
  return (
    <div className="relative bg-[#1b203e] rounded-lg p-[2px] group">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-500 via-violet-500 to-[#16f2b3] animate-gradientBlur opacity-70 blur-sm"></div>

      <div className="relative z-10 bg-[#101123] rounded-lg border border-[#2a2e5a] transition-all duration-300">
        {children}
      </div>
      <style jsx>{`
    @keyframes gradientBlur {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradientBlur {
  background-size: 200% 200%;
  animation: gradientBlur 4s ease infinite;
    `}</style>
    </div>
  );
};

export default GlowCard;