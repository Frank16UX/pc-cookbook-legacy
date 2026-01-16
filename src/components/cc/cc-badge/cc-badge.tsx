import React, { forwardRef } from 'react';
import styles from './cc-badge.module.scss';

export interface CCBadgeProps {
  /**
   * Badge label text to display
   */
  label: string;

  /**
   * Color variant for the badge
   * - yellow: Warning/onboarding style (#f2c75c background, dark text)
   * - red: Accent/new style (#c6404f background, white text)
   * - primary: Brand style (#2d7e8b background, white text)
   */
  variant: 'yellow' | 'red' | 'primary';

  /**
   * Additional CSS class names (allows parent components to override styles)
   */
  className?: string;
}

export const CCBadge = forwardRef<HTMLSpanElement, CCBadgeProps>(
  ({ label, variant, className = '' }, ref) => {
    // Build BEM class names with variant modifier
    const badgeClasses = [
      styles.ccBadge,
      styles[`ccBadge--${variant}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={badgeClasses}>
        {label}
      </span>
    );
  }
);

CCBadge.displayName = 'CCBadge';
