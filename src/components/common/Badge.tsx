import React from 'react';
import { cn } from '../../lib/utils';

export type BadgeVariant = 'sage' | 'mist' | 'sand' | 'navy' | 'green' | 'green-subtle' | 'neutral';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'mist',
  size = 'sm',
  className,
  children,
  ...props
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    sage: 'bg-[#DDE9D9] text-[#2C4F3B] border border-[#C8DCC4]',
    mist: 'bg-[#E2E9E8] text-[#28444A] border border-[#C6D8D7]',
    sand: 'bg-[#EDE4D4] text-[#524430] border border-[#DFCDB5]',
    navy: 'bg-[#172B3A] text-white border border-[#172B3A]',
    green: 'bg-[#347653] text-white border border-[#2B6244]',
    'green-subtle': 'bg-[#EAF3ED] text-[#235037] border border-[#C4DFC0]',
    neutral: 'bg-white text-[#101311] border border-[#EDE4D4]',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 font-medium rounded-full',
    md: 'text-xs px-3 py-1 font-semibold rounded-full',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 transition-colors tracking-tight',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
