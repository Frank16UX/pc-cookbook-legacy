import React, { forwardRef } from 'react';

/**
 * Option type for Select component
 */
export interface SelectOption {
  /**
   * Option value
   */
  value: string;
  /**
   * Option display label
   */
  label: string;
  /**
   * Whether the option is disabled
   * @default false
   */
  disabled?: boolean;
}

/**
 * Props for the Select component
 */
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  /**
   * Unique identifier for the select
   */
  id: string;
  /**
   * Label text displayed above the select
   */
  label: string;
  /**
   * Array of option objects
   */
  options: SelectOption[];
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Validation state of the select
   */
  validationState?: 'success' | 'warning' | 'error';
  /**
   * Helper text displayed below the select
   */
  helperText?: string;
  /**
   * Callback fired when the selected value changes
   */
  onChange?: (value: string) => void;
}

/**
 * Select - Pampered Chef Cookbook select component
 *
 * A select dropdown component with floating label pattern styled with the Pampered Chef design system.
 * Supports validation states (success, warning, error) and helper text.
 *
 * @example
 * ```tsx
 * <Select
 *   id="country"
 *   label="Country"
 *   placeholder="Select a country"
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'ca', label: 'Canada' },
 *     { value: 'mx', label: 'Mexico' },
 *   ]}
 *   value={country}
 *   onChange={setCountry}
 * />
 * ```
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      label,
      options,
      placeholder,
      validationState,
      helperText,
      className,
      disabled,
      onChange,
      value,
      ...props
    },
    ref
  ) => {
    const containerClasses = [
      'pc-form-container',
      validationState === 'success' && 'pc-has-success',
      validationState === 'warning' && 'pc-has-warning',
      validationState === 'error' && 'pc-has-error',
      disabled && 'pc-is-disabled',
    ]
      .filter(Boolean)
      .join(' ');

    const selectClassName = className ? `pc-form-control ${className}` : 'pc-form-control';

    const feedbackClassName = [
      'pc-form-control-feedback',
      validationState === 'success' && 'pc-has-success',
      validationState === 'warning' && 'pc-has-warning',
      validationState === 'error' && 'pc-has-error',
    ]
      .filter(Boolean)
      .join(' ');

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e.target.value);
    };

    const hasValue = value !== undefined && value !== '';
    const labelClassName = hasValue ? 'pc-label has-data' : 'pc-label';

    return (
      <div>
        <div className={containerClasses}>
          <select
            ref={ref}
            id={id}
            className={selectClassName}
            disabled={disabled}
            value={value}
            onChange={handleChange}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <label htmlFor={id} className={labelClassName}>
            {label}
          </label>
        </div>
        {helperText && <div className={feedbackClassName}>{helperText}</div>}
      </div>
    );
  }
);

Select.displayName = 'Select';
