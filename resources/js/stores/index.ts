import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { NavigationArea, NavigationItem } from '../types/navigation';

export const useNavigationStore = defineStore(
    'modules/navigation',
    () => {

        const navigationAreas = ref<Record<NavigationArea, NavigationItem[]>>({
            main: [],
            secondary: [],
            user: [],
        });

        const createSortedComputed = (area: NavigationArea) =>
            computed(() =>
                [...navigationAreas.value[area]].sort(
                    (a, b) => (b.priority ?? 0) - (a.priority ?? 0),
                ),
            );

        const sortedNavMain = createSortedComputed('main');
        const sortedNavSecondary = createSortedComputed('secondary');
        const sortedNavUser = createSortedComputed('user');

        const validateAndCheckDuplicate = (
            item: NavigationItem,
            area: NavigationArea,
        ): boolean => {
            const exists = navigationAreas.value[area].find(
                (i) => i.id === item.id,
            );
            if (exists) {
                console.warn(
                    `Navigation item with ID "${item.id}" already exists in ${area}. Skipping.`,
                );
                return false;
            }
            return true;
        };

        const findInsertionIndexByPriority = (
            navArray: NavigationItem[],
            priority: number,
        ): number => {
            const index = navArray.findIndex(
                (i) => (i.priority ?? 0) <= priority,
            );
            return index === -1 ? navArray.length : index;
        };

        const addItem = (
            item: NavigationItem,
            options: {
                area?: NavigationArea;
                targetId?: string;
                position?: 'before' | 'after';
                //TODO: implement custom class for item styling
            } = {},
        ): void => {
            const { area = 'main', targetId, position } = options;

            if (!validateAndCheckDuplicate(item, area)) return;

            const navArray = navigationAreas.value[area];

            // Simple case: no positioning specified
            if (!targetId) {
                navArray.push(item);
                return;
            }

            // Advanced case: position relative to target
            const targetIndex = navArray.findIndex((i) => i.id === targetId);

            if (targetIndex === -1) {
                console.warn(
                    `Target navigation item with ID "${targetId}" not found in ${area}. Inserting by priority.`,
                );
                const insertIndex = findInsertionIndexByPriority(
                    navArray,
                    item.priority ?? 0,
                );
                navArray.splice(insertIndex, 0, item);
                return;
            }

            const offset = position === 'after' ? 1 : 0;
            navArray.splice(targetIndex + offset, 0, item);
        };

        const removeItem = (
            id: string,
            options: { area?: NavigationArea } = {},
        ): boolean => {
            const { area = 'main' } = options;
            const navArray = navigationAreas.value[area];
            const index = navArray.findIndex((item) => item.id === id);

            if (index === -1) {
                console.warn(
                    `Navigation item with ID "${id}" not found in ${area}. Nothing to remove.`,
                );
                return false;
            }

            navArray.splice(index, 1);
            return true;
        };

        return {
            sortedNavMain,
            sortedNavSecondary,
            sortedNavUser,

            addItem,
            removeItem,
        };
    },
    {
        // Don't persist navigation items - they're registered on each app load
        persist: false,
    },
);
