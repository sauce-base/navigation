<script setup lang="ts">
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import {
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Link } from '@inertiajs/vue3';
import { ChevronRight } from 'lucide-vue-next';
import { computed, inject } from 'vue';
import {
    NavigationContextKey,
    type NavigationRenderContext,
} from '../composables/useNavigationContext';
import type { NavigationLinkItem } from '../types/navigation';

const props = defineProps<{
    item: NavigationLinkItem;
}>();

const renderContext = inject<NavigationRenderContext>(NavigationContextKey);

if (!renderContext) {
    throw new Error(
        'NavItemLink must be used within a navigation context provider',
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

// Compute active state for sub-items
const subItemsWithActive = computed(() => {
    if (!props.item.items) return undefined;

    return props.item.items.map((subItem) => ({
        ...subItem,
        isActive: subItem.isActive ? subItem.isActive() : false,
    }));
});

// Parent is active if it matches OR any sub-item is active
const isActiveWithChildren = computed(() => {
    const hasActiveChild = subItemsWithActive.value?.some(
        (sub) => sub.isActive,
    );
    return isActive.value || hasActiveChild || false;
});
</script>

<template>
    <!-- Sidebar context -->
    <template v-if="renderContext.context === 'sidebar'">
        <!-- Collapsible group with sub-items -->
        <Collapsible
            v-if="props.item.items && subItemsWithActive"
            :default-open="isActiveWithChildren"
            class="group/collapsible"
        >
            <CollapsibleTrigger as-child>
                <SidebarMenuButton
                    :tooltip="$t(props.item.title)"
                    :size="renderContext.size"
                >
                    <component :is="props.item.icon" v-if="props.item.icon" />
                    <span>{{ $t(props.item.title) }}</span>
                    <ChevronRight
                        class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                    />
                </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <SidebarMenuSub>
                    <SidebarMenuSubItem
                        v-for="subItem in subItemsWithActive"
                        :key="subItem.title"
                    >
                        <SidebarMenuSubButton
                            as-child
                            :is-active="subItem.isActive"
                        >
                            <Link :href="subItem.url">
                                <span>{{ $t(subItem.title) }}</span>
                            </Link>
                        </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                </SidebarMenuSub>
            </CollapsibleContent>
        </Collapsible>

        <!-- Simple link without sub-items -->
        <SidebarMenuButton
            v-else
            :as-child="true"
            :is-active="isActive"
            :size="renderContext.size"
        >
            <Link :href="props.item.url">
                <component :is="props.item.icon" v-if="props.item.icon" />
                <span>{{ $t(props.item.title) }}</span>
            </Link>
        </SidebarMenuButton>
    </template>

    <!-- Dropdown context -->
    <DropdownMenuItem v-else as-child>
        <Link :href="props.item.url">
            <component :is="props.item.icon" v-if="props.item.icon" />
            {{ $t(props.item.title) }}
        </Link>
    </DropdownMenuItem>
</template>
