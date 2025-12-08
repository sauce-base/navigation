<script setup lang="ts">
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Link } from '@inertiajs/vue3';
import { storeToRefs } from 'pinia';
import { useNavigationStore } from '../stores';

const navigationStore = useNavigationStore();
const { sortedNavSecondary: items } = storeToRefs(navigationStore);

const handleAction = (
  action: (event: MouseEvent) => void | Promise<void>,
  event: MouseEvent,
) => {
  action(event);
};
</script>

<template>
  <SidebarGroup v-if="items.length > 0" class="mt-auto">
    <SidebarGroupContent>
      <SidebarMenu>
        <template v-for="item in items" :key="item.id">
          <!-- Separator -->
          <SidebarSeparator
            v-if="item.type === 'separator'"
            :data-testid="`nav-secondary-separator-${item.id}`"
            class="my-2"
          />

          <!-- Label -->
          <div
            v-else-if="item.type === 'label'"
            :data-testid="`nav-secondary-label-${item.id}`"
            class="text-sidebar-foreground/70 px-2 py-1.5 text-xs font-medium"
          >
            {{ $t(item.label) }}
          </div>

          <!-- Link/Action items -->
          <SidebarMenuItem v-else>
            <!-- Link item -->
            <SidebarMenuButton
              v-if="item.type === 'link'"
              :as-child="true"
              :is-active="item.isActive"
              size="sm"
            >
              <Link :href="item.url">
                <component :is="item.icon" v-if="item.icon" />
                <span>{{ $t(item.title) }}</span>
              </Link>
            </SidebarMenuButton>

            <!-- Action item -->
            <SidebarMenuButton
              v-else-if="item.type === 'action'"
              :is-active="item.isActive"
              size="sm"
              @click="(event: MouseEvent) => handleAction(item.action, event)"
            >
              <component :is="item.icon" v-if="item.icon" />
              <span>{{ $t(item.title) }}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </template>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>
