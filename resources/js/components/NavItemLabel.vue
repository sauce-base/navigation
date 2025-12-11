<script setup lang="ts">
import { DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { inject } from 'vue';
import {
    NavigationContextKey,
    type NavigationRenderContext,
} from '../composables/useNavigationContext';
import type { NavigationLabelItem } from '../types/navigation';

const props = defineProps<{
    item: NavigationLabelItem;
}>();

const renderContext = inject<NavigationRenderContext>(NavigationContextKey);

if (!renderContext) {
    throw new Error(
        'NavItemLabel must be used within a navigation context provider',
    );
}
</script>

<template>
    <div
        v-if="renderContext.context === 'sidebar'"
        :data-testid="`nav-${renderContext.area}-label-${props.item.id}`"
        class="text-sidebar-foreground/70 px-2 py-1.5 text-xs font-medium"
    >
        {{ $t(props.item.label) }}
    </div>

    <DropdownMenuLabel
        v-else
        :data-testid="`nav-${renderContext.area}-label-${props.item.id}`"
    >
        {{ $t(props.item.label) }}
    </DropdownMenuLabel>
</template>
