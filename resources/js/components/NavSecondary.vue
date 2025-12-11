<script setup lang="ts">
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { storeToRefs } from 'pinia';
import { provide } from 'vue';
import {
    NavigationContextKey,
    type NavigationRenderContext,
} from '../composables/useNavigationContext';
import { useNavigationStore } from '../stores';
import NavItemAction from './NavItemAction.vue';
import NavItemLabel from './NavItemLabel.vue';
import NavItemLink from './NavItemLink.vue';
import NavItemSeparator from './NavItemSeparator.vue';
import StarGithubBanner from './StarGithubBanner.vue';

const navigationStore = useNavigationStore();
const { sortedNavSecondary: items } = storeToRefs(navigationStore);

const renderContext: NavigationRenderContext = {
    context: 'sidebar',
    area: 'secondary',
    size: 'default',
};
provide(NavigationContextKey, renderContext);
</script>

<template>
    <SidebarGroup class="mt-auto">
        <SidebarGroupContent>
            <!-- Star GitHub Banner -->
            <StarGithubBanner />

            <!-- Navigation Items -->
            <SidebarMenu v-if="items.length > 0">
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

                    <!-- Link/Action items -->
                    <SidebarMenuItem v-else>
                        <NavItemLink v-if="item.type === 'link'" :item="item" />

                        <NavItemAction
                            v-else-if="item.type === 'action'"
                            :item="item"
                        />
                    </SidebarMenuItem>
                </template>
            </SidebarMenu>
        </SidebarGroupContent>
    </SidebarGroup>
</template>
