import type { Component } from 'vue';

/**
 * Base navigation item interface
 */
export interface BaseNavigationItem {
  /** Unique identifier for the item */
  id: string;

  /** Display title (supports i18n keys) */
  title: string;

  /** Optional icon component from lucide-vue-next */
  icon?: Component;

  /** Priority for ordering (higher = appears first) */
  priority?: number;

  /** Whether item is currently active */
  isActive?: boolean;
}

/**
 * Navigation item that routes to a URL
 */
export interface NavigationLinkItem extends BaseNavigationItem {
  type: 'link';

  /** Inertia route URL */
  url: string;

  /** Optional nested sub-items */
  items?: NavigationSubItem[];
}

/**
 * Navigation item that executes a function
 */
export interface NavigationActionItem extends BaseNavigationItem {
  type: 'action';

  /** Function to execute on click, receives event object */
  action: (event: MouseEvent) => void | Promise<void>;
}

/**
 * Navigation separator item
 */
export interface NavigationSeparatorItem {
  type: 'separator';

  /** Unique identifier for the separator */
  id: string;

  /** Priority for ordering (higher = appears first) */
  priority?: number;
}

/**
 * Navigation label item (non-interactive header)
 */
export interface NavigationLabelItem {
  type: 'label';

  /** Unique identifier for the label */
  id: string;

  /** Label text to display */
  label: string;

  /** Priority for ordering (higher = appears first) */
  priority?: number;
}

/**
 * Sub-item for nested navigation (only supports links)
 */
export interface NavigationSubItem {
  /** Display title */
  title: string;

  /** Inertia route URL */
  url: string;

  /** Whether sub-item is active */
  isActive?: boolean;
}

/**
 * Union type for all navigation items
 */
export type NavigationItem =
  | NavigationLinkItem
  | NavigationActionItem
  | NavigationSeparatorItem
  | NavigationLabelItem;

/**
 * Navigation area type for generic addNavItem function
 */
export type NavigationArea = 'main' | 'secondary' | 'user';
