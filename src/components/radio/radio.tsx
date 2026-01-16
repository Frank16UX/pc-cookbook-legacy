import React, { forwardRef, createContext, useContext } from 'react';

/**
 * Props for the Radio component
 */
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Unique identifier for the radio button
   */
  id: string;
  /**
   * Label text displayed next to the radio button
   */
  label: string;
  /**
   * Value of the radio button
   */
  value: string;
  /**
   * Validation state of the radio button
   */
  validationState?: 'success' | 'warning' | 'error';
  /**
   * Display radio button inline
   * @default false
   */
  inline?: boolean;
}

/**
 * Props for the RadioGroup component
 */
export interface RadioGroupProps {
  /**
   * Name attribute for all radio buttons in the group
   */
  name: string;
  /**
   * Currently selected value
   */
  value?: string;
  /**
   * Callback fired when the selected value changes
   */
  onChange?: (value: string) => void;
  /**
   * Validation state applied to all radio buttons in the group
   */
  validationState?: 'success' | 'warning' | 'error';
  /**
   * Radio button children
   */
  children: React.ReactNode;
}

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  validationState?: 'success' | 'warning' | 'error';
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

/**
 * Radio - Pampered Chef Cookbook radio button component
 *
 * A radio button component styled with the Pampered Chef design system.
 * Should typically be used within a RadioGroup for proper state management.
 * Supports validation states (success, warning, error) and inline display.
 *
 * @example
 * ```tsx
 * <Radio
 *   id="option1"
 *   name="choice"
 *   label="Option 1"
 *   value="option1"
 *   checked={selected === 'option1'}
 *   onChange={(e) => setSelected(e.target.value)}
 * />
 * ```
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    { id, label, value, validationState: propValidationState, inline = false, className, onChange, ...props },
    ref
  ) => {
    const groupContext = useContext(RadioGroupContext);

    const effectiveValidationState = groupContext?.validationState || propValidationState;
    const effectiveName = groupContext?.name || props.name;
    const isChecked = groupContext ? groupContext.value === value : props.checked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (groupContext?.onChange) {
        groupContext.onChange(e.target.value);
      }
      onChange?.(e);
    };

    const containerClasses = [
      inline ? 'pc-radio-inline' : 'pc-radio',
      effectiveValidationState === 'success' && 'pc-has-success',
      effectiveValidationState === 'warning' && 'pc-has-warning',
      effectiveValidationState === 'error' && 'pc-has-error',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses}>
        <input
          ref={ref}
          type="radio"
          id={id}
          name={effectiveName}
          value={value}
          checked={isChecked}
          onChange={handleChange}
          {...props}
        />
        <label htmlFor={id} className="pc-label">
          {label}
        </label>
      </div>
    );
  }
);

Radio.displayName = 'Radio';

/**
 * RadioGroup - Pampered Chef Cookbook radio group component
 *
 * A container component that manages the state of multiple radio buttons.
 * Provides controlled value management and applies validation state to all children.
 *
 * @example
 * ```tsx
 * <RadioGroup
 *   name="preference"
 *   value={selected}
 *   onChange={setSelected}
 * >
 *   <Radio id="opt1" label="Option 1" value="option1" />
 *   <Radio id="opt2" label="Option 2" value="option2" />
 *   <Radio id="opt3" label="Option 3" value="option3" />
 * </RadioGroup>
 * ```
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  onChange,
  validationState,
  children,
}) => {
  return (
    <RadioGroupContext.Provider value={{ name, value, onChange, validationState }}>
      <div role="radiogroup">{children}</div>
    </RadioGroupContext.Provider>
  );
};

RadioGroup.displayName = 'RadioGroup';
