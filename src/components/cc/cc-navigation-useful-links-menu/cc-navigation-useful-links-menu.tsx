import { forwardRef } from 'react';
import type { FC, SVGProps } from 'react';
import styles from './cc-navigation-useful-links-menu.module.scss';
import { CCBadge } from '../cc-badge';
import {
  ConferenceIcon,
  WebsiteIcon,
  ShopIcon,
  MarketingImageryIcon,
  LearningCenterIcon,
  TablePartyIcon,
  StirNewsIcon,
  ProductCatalogIcon,
  PCGearIcon,
  WebinarsIcon,
  PolicyGuideIcon,
  CloseIcon,
} from './icons';

// Link configuration with icon components
interface LinkItem {
  id: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  text: string;
  badge?: string;
  href?: string;
}

const LINK_ITEMS: LinkItem[] = [
  { id: 'conference', icon: ConferenceIcon, text: 'Conference', href: '#' },
  { id: 'website', icon: WebsiteIcon, text: 'View My Personal Website', href: '#' },
  { id: 'shop', icon: ShopIcon, text: 'Shop Samples & Supplies', href: '#' },
  { id: 'marketing', icon: MarketingImageryIcon, text: 'Marketing Imagery', badge: 'New', href: '#' },
  { id: 'learning', icon: LearningCenterIcon, text: 'Learning Center', href: '#' },
  { id: 'table-party', icon: TablePartyIcon, text: 'Table Party Platform', href: '#' },
  { id: 'stir', icon: StirNewsIcon, text: 'The Stir News', href: '#' },
  { id: 'catalog', icon: ProductCatalogIcon, text: 'Consultant Product Catalog', href: '#' },
  { id: 'gear', icon: PCGearIcon, text: 'PC Gear', href: '#' },
  { id: 'webinars', icon: WebinarsIcon, text: 'Upcoming Webinars & Events', href: '#' },
  { id: 'policy', icon: PolicyGuideIcon, text: 'Consultant Policy Guide', href: '#' },
];

export interface CCNavigationUsefulLinksMenuProps {
  /**
   * Whether the menu is open
   */
  isOpen: boolean;

  /**
   * Callback when the menu should close
   */
  onClose: () => void;

  /**
   * Mobile variant (full-screen overlay vs desktop popover)
   * @default false
   */
  mobile?: boolean;

  /**
   * Additional CSS class names
   */
  className?: string;
}

export const CCNavigationUsefulLinksMenu = forwardRef<
  HTMLDivElement,
  CCNavigationUsefulLinksMenuProps
>(({ isOpen, onClose, mobile = false, className = '' }, ref) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const menuClasses = [
    styles.ccNavigationUsefulLinksMenu,
    mobile ? styles['ccNavigationUsefulLinksMenu--mobile'] : styles['ccNavigationUsefulLinksMenu--desktop'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      {/* Backdrop for mobile */}
      {mobile && (
        <div
          className={styles.ccNavigationUsefulLinksMenu__backdrop}
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}

      {/* Menu Container */}
      <div ref={ref} className={menuClasses} role="dialog" aria-label="Useful Links">
        {/* Header */}
        <div className={styles.ccNavigationUsefulLinksMenu__header}>
          <h2 className={styles.ccNavigationUsefulLinksMenu__title}>USEFUL LINKS</h2>
          <button
            className={styles.ccNavigationUsefulLinksMenu__closeButton}
            onClick={onClose}
            aria-label="Close menu"
            type="button"
          >
            <CloseIcon className={styles.ccNavigationUsefulLinksMenu__closeIcon} />
          </button>
        </div>

        {/* Links List */}
        <nav className={styles.ccNavigationUsefulLinksMenu__linksContainer}>
          {LINK_ITEMS.map((item) => {
            const IconComponent = item.icon;
            return (
              <a
                key={item.id}
                href={item.href}
                className={styles.ccNavigationUsefulLinksMenu__linkItem}
              >
                <div className={styles.ccNavigationUsefulLinksMenu__linkIcon}>
                  <IconComponent className={styles.ccNavigationUsefulLinksMenu__icon} />
                </div>
                <span className={styles.ccNavigationUsefulLinksMenu__linkText}>
                  {item.text}
                </span>
                {item.badge && (
                  <CCBadge label={item.badge} variant="red" />
                )}
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
});

CCNavigationUsefulLinksMenu.displayName = 'CCNavigationUsefulLinksMenu';
