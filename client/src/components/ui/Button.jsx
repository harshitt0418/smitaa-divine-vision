import React from "react";

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  external = false,
  className = "",
  disabled = false,
  type = "button",
  ariaLabel,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-midnight-950 disabled:opacity-50 disabled:pointer-events-none select-none";

  const sizeStyles = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-7 py-3.5 gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#F5E0A0] via-[#D4AF37] to-[#B38C22] text-[#0A0D18] font-semibold hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:brightness-105 active:scale-[0.98]",
    secondary:
      "bg-midnight-800/90 text-ivory hover:text-white border border-midnight-border hover:border-gold-500/40 hover:bg-midnight-750 backdrop-blur-md active:scale-[0.98]",
    outline:
      "border border-gold-500/50 text-gold-200 hover:text-ivory-light hover:border-gold-400 hover:bg-gold-500/10 active:scale-[0.98]",
    ghost:
      "text-ivory-soft hover:text-gold-300 hover:bg-midnight-800/50",
    whatsapp:
      "bg-[#25D366] hover:bg-[#20bd5a] text-[#08180E] font-semibold shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_28px_rgba(37,211,102,0.5)] active:scale-[0.98]",
    retailer:
      "bg-midnight-850 hover:bg-midnight-750 text-ivory border border-white/10 hover:border-gold-500/40 hover:shadow-card active:scale-[0.98]"
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={combinedStyles}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={ariaLabel}
        {...props}
      >
        {Icon && iconPosition === "left" && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />}
        <span>{children}</span>
        {Icon && iconPosition === "right" && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
      aria-label={ariaLabel}
      {...props}
    >
      {Icon && iconPosition === "left" && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />}
      <span>{children}</span>
      {Icon && iconPosition === "right" && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />}
    </button>
  );
}
