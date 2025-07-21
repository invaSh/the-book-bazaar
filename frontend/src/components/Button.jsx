import React from 'react';
import { motion } from 'framer-motion';

export const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'medium',
  className = '',
  icon,
  iconPosition = 'left',
  isLoading = false,
  disabled = false,
  ...props
}, ref) => {
  const baseClasses = 'font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center border';
  
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };
  
  const variantClasses = {
    primary: `bg-[var(--color-goldFoiling)] text-[var(--color-richNavy)] hover:bg-[var(--color-deepBurgundy)] hover:text-[var(--color-softPeach)] border-[var(--color-goldFoiling)] focus:ring-[var(--color-goldFoiling)]`,
    secondary: `bg-[var(--color-creamParchment)] text-[var(--color-richNavy)] border-[var(--color-warmSand)] hover:bg-[var(--color-warmSand)] focus:ring-[var(--color-goldFoiling)]`,
    outline: `bg-transparent text-[var(--color-richNavy)] border-[var(--color-goldFoiling)] hover:bg-[var(--color-goldFoiling)]/10 focus:ring-[var(--color-goldFoiling)]`,
    ghost: `bg-transparent text-[var(--color-richNavy)] border-transparent hover:bg-[var(--color-creamParchment)] focus:ring-[var(--color-goldFoiling)]`,
    danger: `bg-[var(--color-paleRose)] text-[var(--color-deepBurgundy)] border-[var(--color-paleRose)] hover:bg-[var(--color-deepBurgundy)] hover:text-[var(--color-paleRose)] focus:ring-[var(--color-deepBurgundy)]`
  };
  
  const disabledClasses = 'opacity-50 cursor-not-allowed';
  
  return (
    <motion.button
      ref={ref}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabled || isLoading ? disabledClasses : ''}
        ${className}
        font-poppins
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className="mr-2">{icon}</span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span className="ml-2">{icon}</span>
          )}
        </>
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';