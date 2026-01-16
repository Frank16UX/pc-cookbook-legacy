import React, { forwardRef, useState } from 'react';
import styles from './cc-navigation-secondary-tabs.module.scss';
import { CCBadge } from '../cc-badge';

export interface CCNavigationSecondaryTabsProps {
  /**
   * Tab label content (text or elements)
   */
  children: React.ReactNode;

  /**
   * Controlled active state - managed by parent component
   * When true, displays active styling and sets aria-selected="true"
   * @default false
   */
  isActive?: boolean;

  /**
   * Whether to display the "New" badge indicator
   * @default false
   */
  showBadge?: boolean;

  /**
   * Custom badge label text
   * @default 'New'
   */
  badgeLabel?: string;

  /**
   * Mobile size variant (46px height vs 50px desktop)
   * @default false
   */
  mobile?: boolean;

  /**
   * Click handler - typically updates parent's active tab state
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Disabled state prevents interaction
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * ARIA label for accessibility (fallback to children if not provided)
   */
  ariaLabel?: string;

  /**
   * Tab panel ID that this tab controls (for aria-controls)
   */
  ariaControls?: string;

  /**
   * Unique tab ID (for aria-labelledby in tab panel)
   */
  id?: string;
}

export const CCNavigationSecondaryTabs = forwardRef<
  HTMLButtonElement,
  CCNavigationSecondaryTabsProps
>(
  (
    {
      children,
      isActive = false,
      showBadge = false,
      badgeLabel = 'New',
      mobile = false,
      onClick,
      disabled = false,
      className = '',
      ariaLabel,
      ariaControls,
      id,
    },
    ref
  ) => {
    // Internal state for hover/focus (isActive comes from parent)
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    // BEM class building with state priority: active > focus > hover
    const tabClasses = [
      styles.ccNavigationSecondaryTabs,
      mobile && styles['ccNavigationSecondaryTabs--mobile'],
      // Priority: active > focus > hover (mutually exclusive)
      isActive && styles['ccNavigationSecondaryTabs--active'],
      !isActive && isFocused && styles['ccNavigationSecondaryTabs--focus'],
      !isActive && !isFocused && isHovered && styles['ccNavigationSecondaryTabs--hover'],
      disabled && styles['ccNavigationSecondaryTabs--disabled'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Event handlers
    const handleMouseEnter = () => !disabled && setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const handleFocus = () => !disabled && setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        id={id}
        className={tabClasses}
        onClick={onClick}
        disabled={disabled}
        aria-selected={isActive}
        aria-controls={ariaControls}
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
        tabIndex={isActive ? 0 : -1}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {/* Link area: contains text + badge horizontally */}
        <span className={styles.ccNavigationSecondaryTabs__link}>
          {children}
          {showBadge && (
            <CCBadge
              label={badgeLabel}
              variant="red"
            />
          )}
        </span>

        {/* Bottom state indicator (hover/focus/active) */}
        <span
          className={styles.ccNavigationSecondaryTabs__indicator}
          aria-hidden="true"
        />
      </button>
    );
  }
);

CCNavigationSecondaryTabs.displayName = 'CCNavigationSecondaryTabs';
