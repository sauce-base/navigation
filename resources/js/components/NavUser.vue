<script setup lang="ts">
import { ChevronsUpDown } from 'lucide-vue-next';

import LanguageSelector from '@/components/LanguageSelector.vue';
import ThemeSelector from '@/components/ThemeSelector.vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
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
import { Link } from '@inertiajs/vue3';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useNavigationStore } from '../stores';

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

const handleAction = (
    action: (event: MouseEvent) => void | Promise<void>,
    event: MouseEvent,
) => {
    action(event);
};
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
                                <DropdownMenuSeparator
                                    v-if="item.type === 'separator'"
                                    :data-testid="`nav-user-separator-${item.id}`"
                                />

                                <!-- Label -->
                                <DropdownMenuLabel
                                    v-else-if="item.type === 'label'"
                                    :data-testid="`nav-user-label-${item.id}`"
                                >
                                    {{ $t(item.label) }}
                                </DropdownMenuLabel>

                                <!-- Link item -->
                                <DropdownMenuItem
                                    v-else-if="item.type === 'link'"
                                    as-child
                                >
                                    <Link :href="item.url">
                                        <component
                                            :is="item.icon"
                                            v-if="item.icon"
                                        />
                                        {{ $t(item.title) }}
                                    </Link>
                                </DropdownMenuItem>

                                <!-- Action item -->
                                <DropdownMenuItem
                                    v-else-if="item.type === 'action'"
                                    @click="
                                        (event: MouseEvent) =>
                                            handleAction(item.action, event)
                                    "
                                >
                                    <component
                                        :is="item.icon"
                                        v-if="item.icon"
                                    />
                                    {{ $t(item.title) }}
                                </DropdownMenuItem>
                            </template>
                        </DropdownMenuGroup>
                    </template>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
</template>
