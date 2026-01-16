import React, { forwardRef } from 'react';

/**
 * Props for the Input component
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Unique identifier for the input
   */
  id: string;
  /**
   * Label text displayed above the input
   */
  label: string;
  /**
   * Input type
   * @default 'text'
   */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  /**
   * Validation state of the input
   */
  validationState?: 'success' | 'warning' | 'error';
  /**
   * Helper text displayed below the input
   */
  helperText?: string;
  /**
   * Icon displayed at the start of the input
   */
  leadingIcon?: React.ReactNode;
  /**
   * Icon displayed at the end of the input
   */
  trailingIcon?: React.ReactNode;
}

/**
 * Input - Pampered Chef Cookbook input component
 *
 * A text input component with floating label pattern styled with the Pampered Chef design system.
 * Supports validation states (success, warning, error), leading/trailing icons, and helper text.
 *
 * @example
 * ```tsx
 * <Input
 *   id="email"
 *   label="Email Address"
 *   type="email"
 *   placeholder=" "
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      type = 'text',
      validationState,
      helperText,
      leadingIcon,
      trailingIcon,
      className,
      disabled,
      readOnly,
      ...props
    },
    ref
  ) => {
    const containerClasses = [
      'pc-form-container',
      validationState === 'success' && 'pc-has-success',
      validationState === 'warning' && 'pc-has-warning',
      validationState === 'error' && 'pc-has-error',
      leadingIcon && 'pc-has-leading-icon',
      trailingIcon && 'pc-has-trailing-icon',
      disabled && 'pc-is-disabled',
    ]
      .filter(Boolean)
      .join(' ');

    const inputClassName = className ? `pc-form-control ${className}` : 'pc-form-control';

    const feedbackClassName = [
      'pc-form-control-feedback',
      validationState === 'success' && 'pc-has-success',
      validationState === 'warning' && 'pc-has-warning',
      validationState === 'error' && 'pc-has-error',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div>
        <div className={containerClasses}>
          {leadingIcon && <div className="leading-icon">{leadingIcon}</div>}
          <input
            ref={ref}
            id={id}
            type={type}
            className={inputClassName}
            disabled={disabled}
            readOnly={readOnly}
            placeholder=" "
            {...props}
          />
          <label htmlFor={id} className="pc-label">
            {label}
          </label>
          {trailingIcon && <div className="trailing-icon">{trailingIcon}</div>}
        </div>
        {helperText && <div className={feedbackClassName}>{helperText}</div>}
      </div>
    );
  }
);

Input.displayName = 'Input';
