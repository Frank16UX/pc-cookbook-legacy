import React, { forwardRef } from 'react';

/**
 * Props for the Button component
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant style
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'ghost';
  /**
   * Button content
   */
  children: React.ReactNode;
}

/**
 * Button - Pampered Chef Cookbook button component
 *
 * A button component styled with the Pampered Chef design system.
 * Supports three variants: primary, secondary, and ghost.
 *
 * @example
 * ```tsx
 * <Button variant="primary" onClick={() => console.log('clicked')}>
 *   Primary Button
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', children, className, type = 'button', ...props }, ref) => {
    const variantClass = variant === 'primary'
      ? 'pc-btn-primary'
      : variant === 'secondary'
      ? 'pc-btn-secondary'
      : 'pc-btn-ghost';

    const combinedClassName = className
      ? `${variantClass} ${className}`
      : variantClass;

    return (
      <button
        ref={ref}
        type={type}
        className={combinedClassName}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
