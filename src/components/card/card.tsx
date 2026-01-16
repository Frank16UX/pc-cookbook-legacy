import React, { forwardRef } from 'react';

/**
 * Props for the Card component
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Card variant style
   * @default 'default'
   */
  variant?: 'default' | 'light' | 'dark';
  /**
   * Remove all borders
   * @default false
   */
  noBorder?: boolean;
  /**
   * Remove left and right borders only
   * @default false
   */
  noSideBorder?: boolean;
  /**
   * Remove padding
   * @default false
   */
  noPad?: boolean;
  /**
   * HTML element to render as
   * @default 'div'
   */
  as?: 'div' | 'article' | 'section';
  /**
   * Card content
   */
  children: React.ReactNode;
}

/**
 * Card - Pampered Chef Cookbook card component
 *
 * A card container component styled with the Pampered Chef design system.
 * Supports three variants (default, light, dark) and modifier options for borders and padding.
 *
 * @example
 * ```tsx
 * <Card variant="light">
 *   <h3>Card Title</h3>
 *   <p>Card content goes here</p>
 * </Card>
 * ```
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      noBorder = false,
      noSideBorder = false,
      noPad = false,
      as: Component = 'div',
      children,
      className,
      ...props
    },
    ref
  ) => {
    const variantClass =
      variant === 'light'
        ? 'pc-card-light'
        : variant === 'dark'
        ? 'pc-card-dark'
        : 'pc-card';

    const modifierClasses = [
      noBorder && 'pc-card-no-border',
      noSideBorder && 'pc-card-no-side-border',
      noPad && 'pc-card-no-pad',
    ]
      .filter(Boolean)
      .join(' ');

    const combinedClassName = [variantClass, modifierClasses, className]
      .filter(Boolean)
      .join(' ');

    return (
      <Component ref={ref} className={combinedClassName} {...props}>
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';
