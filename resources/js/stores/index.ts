import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { NavigationArea, NavigationItem } from '../types/navigation';

// Navigation Store
export const useNavigationStore = defineStore(
    'modules/navigation',
    () => {
        // State - separate refs for each navigation area
        const navMain = ref<NavigationItem[]>([]);
        const navSecondary = ref<NavigationItem[]>([]);
        const navUser = ref<NavigationItem[]>([]);

        // Computed - sorted by priority (higher first)
        const sortedNavMain = computed(() =>
            [...navMain.value].sort(
                (a, b) => (b.priority ?? 0) - (a.priority ?? 0),
            ),
        );

        const sortedNavSecondary = computed(() =>
            [...navSecondary.value].sort(
                (a, b) => (b.priority ?? 0) - (a.priority ?? 0),
            ),
        );

        const sortedNavUser = computed(() =>
            [...navUser.value].sort(
                (a, b) => (b.priority ?? 0) - (a.priority ?? 0),
            ),
        );

        // Actions - Registration methods
        const addNavMainItem = (item: NavigationItem) => {
            // Check for duplicate IDs
            const exists = navMain.value.find((i) => i.id === item.id);
            if (exists) {
                console.warn(
                    `Navigation item with ID "${item.id}" already exists in navMain. Skipping.`,
                );
                return;
            }
            navMain.value.push(item);
        };

        const addNavSecondaryItem = (item: NavigationItem) => {
            const exists = navSecondary.value.find((i) => i.id === item.id);
            if (exists) {
                console.warn(
                    `Navigation item with ID "${item.id}" already exists in navSecondary. Skipping.`,
                );
                return;
            }
            navSecondary.value.push(item);
        };

        const addNavUserItem = (item: NavigationItem) => {
            const exists = navUser.value.find((i) => i.id === item.id);
            if (exists) {
                console.warn(
                    `Navigation item with ID "${item.id}" already exists in navUser. Skipping.`,
                );
                return;
            }
            navUser.value.push(item);
        };

        // Generic function to add item to any navigation area
        const addNavItem = (item: NavigationItem, area: NavigationArea) => {
            switch (area) {
                case 'main':
                    addNavMainItem(item);
                    break;
                case 'secondary':
                    addNavSecondaryItem(item);
                    break;
                case 'user':
                    addNavUserItem(item);
                    break;
            }
        };

        // Helper function to get the navigation array ref by area
        const getNavArrayByArea = (area: NavigationArea) => {
            switch (area) {
                case 'main':
                    return navMain;
                case 'secondary':
                    return navSecondary;
                case 'user':
                    return navUser;
            }
        };

        // Helper function to find insertion index based on priority
        const findInsertionIndexByPriority = (
            navArray: typeof navMain,
            priority: number,
        ): number => {
            // Items are sorted by priority (higher first)
            // Find the first item with lower or equal priority
            const index = navArray.value.findIndex(
                (i) => (i.priority ?? 0) <= priority,
            );
            return index === -1 ? navArray.value.length : index;
        };

        // Insert item before a specific ID or by priority
        const addNavItemBefore = (
            item: NavigationItem,
            area: NavigationArea,
            targetId?: string,
        ) => {
            const navArray = getNavArrayByArea(area);

            // Check for duplicate IDs
            const exists = navArray.value.find((i) => i.id === item.id);
            if (exists) {
                console.warn(
                    `Navigation item with ID "${item.id}" already exists in ${area}. Skipping.`,
                );
                return;
            }

            // If targetId is provided, use it for positioning
            if (targetId) {
                const targetIndex = navArray.value.findIndex(
                    (i) => i.id === targetId,
                );
                if (targetIndex === -1) {
                    console.warn(
                        `Target navigation item with ID "${targetId}" not found in ${area}. Inserting by priority.`,
                    );
                    // Fall back to priority-based insertion
                    const insertIndex = findInsertionIndexByPriority(
                        navArray,
                        item.priority ?? 0,
                    );
                    navArray.value.splice(insertIndex, 0, item);
                    return;
                }
                navArray.value.splice(targetIndex, 0, item);
                return;
            }

            // No targetId provided, insert by priority
            const insertIndex = findInsertionIndexByPriority(
                navArray,
                item.priority ?? 0,
            );
            navArray.value.splice(insertIndex, 0, item);
        };

        // Insert item after a specific ID or by priority
        const addNavItemAfter = (
            item: NavigationItem,
            area: NavigationArea,
            targetId?: string,
        ) => {
            const navArray = getNavArrayByArea(area);

            // Check for duplicate IDs
            const exists = navArray.value.find((i) => i.id === item.id);
            if (exists) {
                console.warn(
                    `Navigation item with ID "${item.id}" already exists in ${area}. Skipping.`,
                );
                return;
            }

            // If targetId is provided, use it for positioning
            if (targetId) {
                const targetIndex = navArray.value.findIndex(
                    (i) => i.id === targetId,
                );
                if (targetIndex === -1) {
                    console.warn(
                        `Target navigation item with ID "${targetId}" not found in ${area}. Inserting by priority.`,
                    );
                    // Fall back to priority-based insertion
                    const insertIndex = findInsertionIndexByPriority(
                        navArray,
                        item.priority ?? 0,
                    );
                    navArray.value.splice(insertIndex, 0, item);
                    return;
                }
                navArray.value.splice(targetIndex + 1, 0, item);
                return;
            }

            // No targetId provided, insert by priority
            const insertIndex = findInsertionIndexByPriority(
                navArray,
                item.priority ?? 0,
            );
            navArray.value.splice(insertIndex, 0, item);
        };

        // Add a separator
        const addNavSeparator = (
            id: string,
            area: NavigationArea,
            priority?: number,
        ) => {
            const separator: NavigationItem = {
                type: 'separator',
                id,
                priority,
            };
            addNavItem(separator, area);
        };

        // Add a separator before a specific ID or by priority
        const addNavSeparatorBefore = (
            id: string,
            area: NavigationArea,
            targetId?: string,
            priority?: number,
        ) => {
            const separator: NavigationItem = {
                type: 'separator',
                id,
                priority,
            };
            addNavItemBefore(separator, area, targetId);
        };

        // Add a separator after a specific ID or by priority
        const addNavSeparatorAfter = (
            id: string,
            area: NavigationArea,
            targetId?: string,
            priority?: number,
        ) => {
            const separator: NavigationItem = {
                type: 'separator',
                id,
                priority,
            };
            addNavItemAfter(separator, area, targetId);
        };

        // Add a label
        const addNavLabel = (
            id: string,
            label: string,
            area: NavigationArea,
            priority?: number,
        ) => {
            const labelItem: NavigationItem = {
                type: 'label',
                id,
                label,
                priority,
            };
            addNavItem(labelItem, area);
        };

        // Add a label before a specific ID or by priority
        const addNavLabelBefore = (
            id: string,
            label: string,
            area: NavigationArea,
            targetId?: string,
            priority?: number,
        ) => {
            const labelItem: NavigationItem = {
                type: 'label',
                id,
                label,
                priority,
            };
            addNavItemBefore(labelItem, area, targetId);
        };

        // Add a label after a specific ID or by priority
        const addNavLabelAfter = (
            id: string,
            label: string,
            area: NavigationArea,
            targetId?: string,
            priority?: number,
        ) => {
            const labelItem: NavigationItem = {
                type: 'label',
                id,
                label,
                priority,
            };
            addNavItemAfter(labelItem, area, targetId);
        };

        return {
            // State
            navMain,
            navSecondary,
            navUser,

            // Computed
            sortedNavMain,
            sortedNavSecondary,
            sortedNavUser,

            // Actions
            addNavMainItem,
            addNavSecondaryItem,
            addNavUserItem,
            addNavItem, // Generic function

            // Insertion methods
            addNavItemBefore,
            addNavItemAfter,

            // Separator methods
            addNavSeparator,
            addNavSeparatorBefore,
            addNavSeparatorAfter,

            // Label methods
            addNavLabel,
            addNavLabelBefore,
            addNavLabelAfter,
        };
    },
    {
        // Don't persist navigation items - they're registered on each app load
        persist: false,
    },
);
