import React from 'react';
import { cn } from '../../lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'navy' | 'ghost' | 'outline' | 'subtle';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  children,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#347653] focus-visible:ring-offset-2';

  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-[#347653] hover:bg-[#2B6244] text-white shadow-sm hover:shadow',
    secondary: 'bg-white hover:bg-[#FAF8F2] text-[#172B3A] border border-[#EDE4D4] shadow-xs hover:border-[#DFCDB5]',
    navy: 'bg-[#172B3A] hover:bg-[#12222E] text-white shadow-sm',
    ghost: 'text-[#172B3A] hover:bg-[#EDE4D4]/70 active:bg-[#EDE4D4]',
    outline: 'border border-[#347653] text-[#347653] hover:bg-[#EAF3ED]',
    subtle: 'bg-[#EAF3ED] text-[#235037] hover:bg-[#DDE9D9]',
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {iconRight && <span className="inline-flex shrink-0">{iconRight}</span>}
    </button>
  );
};
