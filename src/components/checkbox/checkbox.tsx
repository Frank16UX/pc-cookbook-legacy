import React, { forwardRef } from 'react';

/**
 * Props for the Checkbox component
 */
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Unique identifier for the checkbox
   */
  id: string;
  /**
   * Label text displayed next to the checkbox
   */
  label: string;
  /**
   * Validation state of the checkbox
   */
  validationState?: 'success' | 'warning' | 'error';
  /**
   * Display checkbox inline
   * @default false
   */
  inline?: boolean;
}

/**
 * Checkbox - Pampered Chef Cookbook checkbox component
 *
 * A checkbox component styled with the Pampered Chef design system.
 * Supports validation states (success, warning, error) and inline display.
 *
 * @example
 * ```tsx
 * <Checkbox
 *   id="agree"
 *   label="I agree to the terms and conditions"
 *   checked={agreed}
 *   onChange={(e) => setAgreed(e.target.checked)}
 * />
 * ```
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, label, validationState, inline = false, className, ...props }, ref) => {
    const containerClasses = [
      inline ? 'pc-checkbox-inline' : 'pc-checkbox',
      validationState === 'success' && 'pc-has-success',
      validationState === 'warning' && 'pc-has-warning',
      validationState === 'error' && 'pc-has-error',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses}>
        <input ref={ref} type="checkbox" id={id} {...props} />
        <label htmlFor={id} className="pc-label">
          {label}
        </label>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
