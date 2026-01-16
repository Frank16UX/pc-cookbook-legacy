import React, { forwardRef } from 'react';
import styles from './cc-navigation-primary-button.module.scss';
import { CCBadge } from '../cc-badge';

export interface CCNavigationPrimaryButtonProps {
  /**
   * Button content (text or elements)
   */
  children: React.ReactNode;

  /**
   * Variant type: none (default), badge, or dot
   * @default 'none'
   */
  variant?: 'none' | 'badge' | 'dot';

  /**
   * Badge label to display (only relevant when variant='badge')
   * @default 'New'
   */
  badgeLabel?: string;

  /**
   * Whether this button is currently active/selected
   * @default false
   */
  isActive?: boolean;

  /**
   * Mobile size variant (13px font vs 16px desktop)
   * @default false
   */
  mobile?: boolean;

  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string;
}

export const CCNavigationPrimaryButton = forwardRef<
  HTMLButtonElement,
  CCNavigationPrimaryButtonProps
>(
  (
    {
      children,
      variant = 'none',
      badgeLabel = 'New',
      isActive = false,
      mobile = false,
      onClick,
      disabled = false,
      className = '',
      ariaLabel,
    },
    ref
  ) => {
    // Build BEM class names
    const buttonClasses = [
      styles.ccNavigationPrimaryButton,
      mobile && styles['ccNavigationPrimaryButton--mobile'],
      isActive && styles['ccNavigationPrimaryButton--active'],
      disabled && styles['ccNavigationPrimaryButton--disabled'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type="button"
        className={buttonClasses}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      >
        <span className={styles.ccNavigationPrimaryButton__content}>
          <span>{children}</span>

          {variant === 'badge' && (
            <CCBadge
              label={badgeLabel}
              variant="yellow"
              className={styles.ccNavigationPrimaryButton__badge}
            />
          )}

          {variant === 'dot' && (
            <span className={styles.ccNavigationPrimaryButton__dot} aria-hidden="true" />
          )}
        </span>
      </button>
    );
  }
);

CCNavigationPrimaryButton.displayName = 'CCNavigationPrimaryButton';
