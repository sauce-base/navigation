<script setup lang="ts">
import {
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { SidebarSeparator } from '@/components/ui/sidebar';
import { inject } from 'vue';
import {
    NavigationContextKey,
    type NavigationRenderContext,
} from '../composables/useNavigationContext';
import type { NavigationSeparatorItem } from '../types/navigation';

const props = defineProps<{
    item: NavigationSeparatorItem;
}>();

const renderContext = inject<NavigationRenderContext>(NavigationContextKey);

if (!renderContext) {
    throw new Error(
        'NavItemSeparator must be used within a navigation context provider',
    );
}
</script>

<template>
    <SidebarSeparator
        v-if="renderContext.context === 'sidebar'"
        :data-testid="`nav-${renderContext.area}-separator-${props.item.id}`"
        class="my-2"
    />

    <DropdownMenuSeparator
        v-else
        :data-testid="`nav-${renderContext.area}-separator-${props.item.id}`"
    />
</template>
