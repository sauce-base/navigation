<script setup lang="ts">
import { ChevronsUpDown } from 'lucide-vue-next';

import LanguageSelector from '@/components/LanguageSelector.vue';
import ThemeSelector from '@/components/ThemeSelector.vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import type { User } from '@/types';
import { storeToRefs } from 'pinia';
import { computed, provide } from 'vue';
import {
    NavigationContextKey,
    type NavigationRenderContext,
} from '../composables/useNavigationContext';
import { useNavigationStore } from '../stores';
import NavItemAction from './NavItemAction.vue';
import NavItemLabel from './NavItemLabel.vue';
import NavItemLink from './NavItemLink.vue';
import NavItemSeparator from './NavItemSeparator.vue';

const props = defineProps<{
    user: User;
}>();

const { isMobile } = useSidebar();
const navigationStore = useNavigationStore();
const { sortedNavUser: items } = storeToRefs(navigationStore);

const userInitials = computed(() => {
    return props.user.name
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('');
});

const renderContext: NavigationRenderContext = {
    context: 'dropdown',
    area: 'user',
};
provide(NavigationContextKey, renderContext);
</script>

<template>
    <SidebarMenu>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <SidebarMenuButton
                        data-testid="user-menu-trigger"
                        size="lg"
                        class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                        <Avatar class="h-8 w-8 rounded-lg">
                            <AvatarImage :src="user.avatar" :alt="user.name" />
                            <AvatarFallback class="rounded-lg">
                                {{ userInitials }}
                            </AvatarFallback>
                        </Avatar>
                        <div
                            class="grid flex-1 text-left text-sm leading-tight"
                        >
                            <span class="truncate font-medium">
                                {{ user.name }}
                            </span>
                            <span class="truncate text-xs">
                                {{ user.email }}
                            </span>
                        </div>
                        <ChevronsUpDown class="ml-auto size-4" />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    :side="isMobile ? 'bottom' : 'right'"
                    align="end"
                    :side-offset="4"
                >
                    <DropdownMenuLabel class="p-0 font-normal">
                        <div
                            class="flex items-center gap-2 px-1 py-1.5 text-left text-sm"
                        >
                            <Avatar class="h-8 w-8 rounded-lg">
                                <AvatarImage
                                    :src="user.avatar"
                                    :alt="user.name"
                                />
                                <AvatarFallback class="rounded-lg">
                                    {{ userInitials }}
                                </AvatarFallback>
                            </Avatar>
                            <div
                                class="grid flex-1 text-left text-sm leading-tight"
                            >
                                <span class="truncate font-semibold">
                                    {{ user.name }}
                                </span>
                                <span class="truncate text-xs">
                                    {{ user.email }}
                                </span>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <!-- Fixed components (Language & Theme selectors) -->
                    <DropdownMenuGroup>
                        <LanguageSelector mode="submenu" />
                        <ThemeSelector mode="submenu" />
                    </DropdownMenuGroup>

                    <!-- Dynamic navigation items from store -->
                    <template v-if="items.length > 0">
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <template v-for="item in items" :key="item.id">
                                <!-- Separator -->
                                <NavItemSeparator
                                    v-if="item.type === 'separator'"
                                    :item="item"
                                />

                                <!-- Label -->
                                <NavItemLabel
                                    v-else-if="item.type === 'label'"
                                    :item="item"
                                />

                                <!-- Link item -->
                                <NavItemLink
                                    v-else-if="item.type === 'link'"
                                    :item="item"
                                />

                                <!-- Action item -->
                                <NavItemAction
                                    v-else-if="item.type === 'action'"
                                    :item="item"
                                />
                            </template>
                        </DropdownMenuGroup>
                    </template>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
</template>
