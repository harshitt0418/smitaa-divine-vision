import React from "react";

export default function Badge({
  children,
  variant = "gold",
  size = "sm",
  icon: Icon,
  className = "",
}) {
  const baseStyles = "inline-flex items-center font-medium rounded-full border tracking-wide uppercase";

  const sizeStyles = {
    xs: "text-[10px] px-2.5 py-0.5 gap-1",
    sm: "text-xs px-3 py-1 gap-1.5",
    md: "text-sm px-3.5 py-1.5 gap-2",
  };

  const variantStyles = {
    gold: "bg-gold-500/10 border-gold-500/30 text-gold-300",
    ivory: "bg-white/5 border-white/10 text-ivory-soft",
    indigo: "bg-midnight-700/50 border-midnight-600/40 text-celestial-cyan",
    green: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  };

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
      <span>{children}</span>
    </span>
  );
}
