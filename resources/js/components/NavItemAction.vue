<script setup lang="ts">
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { computed, inject } from 'vue';
import {
    NavigationContextKey,
    type NavigationRenderContext,
} from '../composables/useNavigationContext';
import type { NavigationActionItem } from '../types/navigation';
import { handleAction } from '../utils/navigation';

const props = defineProps<{
    item: NavigationActionItem;
}>();

const renderContext = inject<NavigationRenderContext>(NavigationContextKey);

if (!renderContext) {
    throw new Error(
        'NavItemAction must be used within a navigation context provider',
    );
}

// Compute active state by calling the isActive function
const isActive = computed(() => {
    if (props.item.isActive) {
        try {
            return props.item.isActive();
        } catch (error) {
            console.error(
                `Error computing isActive for item "${props.item.id}":`,
                error,
            );
            return false;
        }
    }
    return false;
});
</script>

<template>
    <!-- Sidebar context -->
    <SidebarMenuButton
        v-if="renderContext.context === 'sidebar'"
        :is-active="isActive"
        :size="renderContext.size"
        @click="(event: MouseEvent) => handleAction(props.item.action, event)"
    >
        <component :is="props.item.icon" v-if="props.item.icon" />
        <span>{{ $t(props.item.title) }}</span>
    </SidebarMenuButton>

    <!-- Dropdown context -->
    <DropdownMenuItem
        v-else
        @click="(event: MouseEvent) => handleAction(props.item.action, event)"
    >
        <component :is="props.item.icon" v-if="props.item.icon" />
        {{ $t(props.item.title) }}
    </DropdownMenuItem>
</template>
