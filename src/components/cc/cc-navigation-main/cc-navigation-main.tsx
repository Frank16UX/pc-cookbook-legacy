import { useState, useEffect } from 'react';
import styles from './cc-navigation-main.module.scss';
import { CCNavigationPrimaryButton } from '../cc-navigation-primary-button';
import { CCNavigationSecondaryTabs } from '../cc-navigation-secondary-tabs';
import { CCNavigationUsefulLinksMenu } from '../cc-navigation-useful-links-menu';
import {
  LogoDesktop,
  LogoMobile,
  SearchIcon,
  LinkIcon,
  HelpIcon,
  AccountIcon,
  TrailingSearchIcon,
} from './icons';

// --- Types ---

export type PrimaryTab = 'MY BUSINESS' | 'MY TEAM' | 'MARKETING RESOURCES';
export type SecondaryTab = string;

export interface CCNavigationMainProps {
  /**
   * Currently active primary tab
   * @default 'MY BUSINESS'
   */
  activePrimary?: PrimaryTab;

  /**
   * Currently active secondary tab
   * @default 'Dashboard'
   */
  activeSecondary?: SecondaryTab;

  /**
   * Callback when primary tab changes
   */
  onPrimaryChange?: (tab: PrimaryTab) => void;

  /**
   * Callback when secondary tab changes
   */
  onSecondaryChange?: (tab: SecondaryTab) => void;

  /**
   * Additional CSS class names
   */
  className?: string;
}

// --- Tab Configurations ---

interface PrimaryTabConfig {
  id: PrimaryTab;
  label: string;
  badge?: string;
  hasDot?: boolean;
}

interface SecondaryTabConfig {
  label: string;
  badge?: string;
}

const PRIMARY_TABS: PrimaryTabConfig[] = [
  { id: 'MY BUSINESS', label: 'MY BUSINESS' },
  { id: 'MY TEAM', label: 'MY TEAM' },
  { id: 'MARKETING RESOURCES', label: 'MARKETING RESOURCES', hasDot: true },
];

const SECONDARY_TABS_CONFIG: Record<PrimaryTab, SecondaryTabConfig[]> = {
  'MY BUSINESS': [
    { label: 'Dashboard' },
    { label: 'Parties & Orders', badge: 'New' },
    { label: 'Contacts' },
    { label: 'Reports' },
    { label: 'Rewards & Recognition' },
  ],
  'MY TEAM': [
    { label: 'Team Resources' },
    { label: 'Recruiter Rewards' },
  ],
  'MARKETING RESOURCES': [
    { label: 'Monthly Focus' },
    { label: 'Marketing Imagery', badge: 'New' },
    { label: 'Message Templates' },
    { label: 'Plan a Party' },
    { label: 'Program Overviews' },
  ],
};

// --- Component ---

export function CCNavigationMain({
  activePrimary = 'MY BUSINESS',
  activeSecondary = 'Dashboard',
  onPrimaryChange,
  onSecondaryChange,
  className = '',
}: CCNavigationMainProps) {
  // Internal state if not controlled
  const [currentPrimary, setCurrentPrimary] = useState<PrimaryTab>(activePrimary);
  const [currentSecondary, setCurrentSecondary] = useState<SecondaryTab>(activeSecondary);
  const [isLinksMenuOpen, setIsLinksMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  // Detect mobile view
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  // Handlers
  const handlePrimaryClick = (tab: PrimaryTab) => {
    setCurrentPrimary(tab);
    onPrimaryChange?.(tab);

    // Reset secondary tab based on primary
    const defaultSecondary = SECONDARY_TABS_CONFIG[tab][0]?.label || '';
    handleSecondaryClick(defaultSecondary);
  };

  const handleSecondaryClick = (tab: SecondaryTab) => {
    setCurrentSecondary(tab);
    onSecondaryChange?.(tab);
  };

  const currentSecondaryTabs = SECONDARY_TABS_CONFIG[currentPrimary];

  const navClasses = [styles.ccNavigationMain, className].filter(Boolean).join(' ');

  return (
    <nav className={navClasses}>
      {/* ================= DESKTOP ================= */}
      <div className={styles.ccNavigationMain__desktopContainer}>
        {/* Top Bar - Logo + Search + Utility */}
        <div className={styles.ccNavigationMain__primaryUtilityBar}>
          <div className={styles.ccNavigationMain__logoDesktop}>
            <LogoDesktop />
          </div>

          {/* Primary Nav Items - shown inline at 1200px+ */}
          <div
            className={styles.ccNavigationMain__primaryNavItemsInline}
            data-inline-nav="true"
          >
            {PRIMARY_TABS.map((tab) => (
              <CCNavigationPrimaryButton
                key={`inline-${tab.id}`}
                variant={tab.hasDot ? 'dot' : tab.badge ? 'badge' : 'none'}
                badgeLabel={tab.badge}
                isActive={currentPrimary === tab.id}
                onClick={() => handlePrimaryClick(tab.id)}
              >
                {tab.label}
              </CCNavigationPrimaryButton>
            ))}
          </div>

          <div className={styles.ccNavigationMain__searchUtilityWrapper}>
            <div className={styles.ccNavigationMain__searchField}>
              <input type="text" placeholder="What are you looking for?" />
              <div className={styles.ccNavigationMain__searchIcon}>
                <TrailingSearchIcon />
              </div>
            </div>

            <div className={styles.ccNavigationMain__utilityIcons}>
              <button
                className={styles.ccNavigationMain__iconLink}
                onClick={() => setIsLinksMenuOpen(!isLinksMenuOpen)}
                type="button"
              >
                <LinkIcon />
                <span>LINKS</span>
              </button>
              <button className={styles.ccNavigationMain__iconLink} type="button">
                <HelpIcon />
                <span>HELP</span>
              </button>
              <button className={styles.ccNavigationMain__iconLink} type="button">
                <AccountIcon />
                <span>ACCOUNT</span>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Popover - rendered outside button */}
        <CCNavigationUsefulLinksMenu
          isOpen={isLinksMenuOpen && !isMobileView}
          onClose={() => setIsLinksMenuOpen(false)}
          mobile={false}
        />

        {/* Primary Navigation Bar - shown as separate row at 1024-1199px */}
        <div className={styles.ccNavigationMain__desktopPrimaryBar}>
          <div className={styles.ccNavigationMain__primaryNavItems}>
            {PRIMARY_TABS.map((tab) => (
              <CCNavigationPrimaryButton
                key={tab.id}
                variant={tab.hasDot ? 'dot' : tab.badge ? 'badge' : 'none'}
                badgeLabel={tab.badge}
                isActive={currentPrimary === tab.id}
                onClick={() => handlePrimaryClick(tab.id)}
              >
                {tab.label}
              </CCNavigationPrimaryButton>
            ))}
          </div>
        </div>

        {/* Secondary Bar */}
        <div className={styles.ccNavigationMain__secondaryNavBar}>
          <div className={styles.ccNavigationMain__secondaryNavContent}>
            {currentSecondaryTabs.map((tab) => (
              <CCNavigationSecondaryTabs
                key={tab.label}
                isActive={currentSecondary === tab.label}
                showBadge={!!tab.badge}
                badgeLabel={tab.badge}
                onClick={() => handleSecondaryClick(tab.label)}
              >
                {tab.label}
              </CCNavigationSecondaryTabs>
            ))}
          </div>
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className={styles.ccNavigationMain__mobileContainer}>
        {/* Utility Bar */}
        <div className={styles.ccNavigationMain__mobileUtilityBar}>
          <button
            className={styles.ccNavigationMain__iconLink}
            onClick={() => setIsLinksMenuOpen(!isLinksMenuOpen)}
            type="button"
          >
            <LinkIcon />
            <span>Links</span>
          </button>
          <button className={styles.ccNavigationMain__iconLink} type="button">
            <SearchIcon />
            <span>Search</span>
          </button>

          <div className={styles.ccNavigationMain__mobileLogo}>
            <LogoMobile />
          </div>

          <button className={styles.ccNavigationMain__iconLink} type="button">
            <HelpIcon />
            <span>Help</span>
          </button>
          <button className={styles.ccNavigationMain__iconLink} type="button">
            <AccountIcon />
            <span>Account</span>
          </button>
        </div>

        {/* Primary Bar */}
        <div className={styles.ccNavigationMain__mobilePrimaryBar}>
          {PRIMARY_TABS.map((tab) => (
            <CCNavigationPrimaryButton
              key={tab.id}
              variant={tab.hasDot ? 'dot' : tab.badge ? 'badge' : 'none'}
              badgeLabel={tab.badge}
              isActive={currentPrimary === tab.id}
              mobile
              onClick={() => handlePrimaryClick(tab.id)}
            >
              {tab.label}
            </CCNavigationPrimaryButton>
          ))}
        </div>

        {/* Secondary Bar */}
        <div className={styles.ccNavigationMain__mobileSecondaryBar}>
          <div className={styles.ccNavigationMain__secondaryNavContent}>
            {currentSecondaryTabs.map((tab) => (
              <CCNavigationSecondaryTabs
                key={tab.label}
                isActive={currentSecondary === tab.label}
                showBadge={!!tab.badge}
                badgeLabel={tab.badge}
                mobile
                onClick={() => handleSecondaryClick(tab.label)}
              >
                {tab.label}
              </CCNavigationSecondaryTabs>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Full-Screen Menu */}
      <CCNavigationUsefulLinksMenu
        isOpen={isLinksMenuOpen && isMobileView}
        onClose={() => setIsLinksMenuOpen(false)}
        mobile
      />
    </nav>
  );
}

CCNavigationMain.displayName = 'CCNavigationMain';
