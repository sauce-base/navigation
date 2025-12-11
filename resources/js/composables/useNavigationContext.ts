import type { InjectionKey } from 'vue';

/**
 * Navigation rendering context
 * - sidebar: Renders using Sidebar* components
 * - dropdown: Renders using DropdownMenu* components
 */
export type NavigationContext = 'sidebar' | 'dropdown';

/**
 * Navigation area identifier for test IDs
 * Used to generate unique data-testid attributes
 */
export type NavigationAreaIdentifier = 'main' | 'secondary' | 'user';

/**
 * Context configuration provided by parent nav components
 */
export interface NavigationRenderContext {
    /** Rendering mode (sidebar or dropdown) */
    context: NavigationContext;

    /** Area identifier for test IDs */
    area: NavigationAreaIdentifier;

    /** Optional size variant (e.g., 'sm' for secondary nav) */
    size?: 'default' | 'sm' | 'md' | 'lg';
}

/**
 * Injection key for navigation context
 * Used with provide/inject to share context between parent and child components
 */
export const NavigationContextKey: InjectionKey<NavigationRenderContext> =
    Symbol('NavigationContext');
