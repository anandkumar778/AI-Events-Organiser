'use client';

import { motion } from 'framer-motion';
import React from 'react';


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  text?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export default function Button({
  children,
  text,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  icon,
  iconPosition = 'left',
  disabled,
  className,
  ...props
}: ButtonProps) {
  const baseStyles = 'rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap';

  const variantStyles = {
    primary: 'gradient-primary text-white hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95 disabled:opacity-50',
    outline: 'border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 active:scale-95',
    danger: 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg active:scale-95 disabled:opacity-50',
    success: 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg active:scale-95 disabled:opacity-50',
    ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95',
  };

  const sizeStyles = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const widthStyles = fullWidth ? "w-full" : "";

  return (
  <motion.button
    whileTap={{ scale: 0.95 }}
    whileHover={!disabled ? { scale: 1.02 } : {}}
    className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className ?? ""}`}
    disabled={disabled || loading}
    {...props}
  >
    {loading ? (
      <>
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        <span>Loading...</span>
      </>
    ) : (
      <>
        {icon && iconPosition === "left" && (
          <span className="shrink-0">{icon}</span>
        )}

        <span>{children ?? text}</span>

        {icon && iconPosition === "right" && (
          <span className="shrink-0">{icon}</span>
        )}
      </>
    )}
  </motion.button>
);
}