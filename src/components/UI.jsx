import React from 'react';

// 1. CARD COMPONENT
export const Card = ({ children, className = "", noPadding = false }) => (
  <div className={`bg-[#0A0A0A] border border-white/5 rounded-xl overflow-hidden shadow-2xl ${noPadding ? '' : 'p-6'} ${className}`}>
    {children}
  </div>
);

// 2. BADGE COMPONENT (This was missing!)
export const Badge = ({ status }) => {
  const styles = {
    verified: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]",
    suspicious: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    deepfake: "bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.2)]",
    processing: "bg-blue-500/10 text-blue-400 border-blue-500/20 animate-pulse",
    active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  };
  
  const labels = {
    verified: "VERIFIED HUMAN",
    suspicious: "SUSPICIOUS",
    deepfake: "DEEPFAKE DETECTED",
    processing: "ANALYZING...",
    active: "ACTIVE",
  };

  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider border uppercase flex items-center gap-1.5 w-fit ${styles[status] || styles.active}`}>
      <div className="w-1 h-1 rounded-full bg-current" />
      {labels[status] || status}
    </span>
  );
};

// 3. BUTTON COMPONENT
export const Button = ({ children, variant = "primary", onClick, className = "", icon: Icon }) => {
  const base = "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 active:scale-95";
  const variants = {
    primary: "bg-white text-black hover:bg-zinc-200 shadow-[0_0_15px_rgba(255,255,255,0.1)]",
    outline: "border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 hover:border-white/20",
    ghost: "text-zinc-500 hover:text-white hover:bg-white/5",
    danger: "bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500/20"
  };
  return (
    <button onClick={onClick} className={`${base} ${variants[variant] || variants.primary} ${className}`}>
      {Icon && <Icon size={14} />}
      {children}
    </button>
  );
};