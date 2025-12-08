<script setup lang="ts">
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Link } from '@inertiajs/vue3';
import { ChevronRight } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { useNavigationStore } from '../stores';

const navigationStore = useNavigationStore();
const { sortedNavMain: items } = storeToRefs(navigationStore);

const handleAction = (
  action: (event: MouseEvent) => void | Promise<void>,
  event: MouseEvent,
) => {
  action(event);
};
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>{{ $t('Navigation') }}</SidebarGroupLabel>
    <SidebarMenu>
      <template v-for="item in items" :key="item.id">
        <!-- Separator -->
        <SidebarSeparator
          v-if="item.type === 'separator'"
          :data-testid="`nav-separator-${item.id}`"
          class="my-2"
        />

        <!-- Label -->
        <div
          v-else-if="item.type === 'label'"
          :data-testid="`nav-label-${item.id}`"
          class="text-sidebar-foreground/70 px-2 py-1.5 text-xs font-medium"
        >
          {{ $t(item.label) }}
        </div>

        <!-- Link/Action items -->
        <SidebarMenuItem v-else>
          <!-- Link item with sub-items (collapsible) -->
          <Collapsible
            v-if="item.type === 'link' && item.items"
            :default-open="item.isActive"
            class="group/collapsible"
          >
            <CollapsibleTrigger as-child>
              <SidebarMenuButton :tooltip="$t(item.title)">
                <component :is="item.icon" v-if="item.icon" />
                <span>{{ $t(item.title) }}</span>
                <ChevronRight
                  class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem
                  v-for="subItem in item.items"
                  :key="subItem.title"
                >
                  <SidebarMenuSubButton as-child>
                    <Link :href="subItem.url">
                      <span>{{ $t(subItem.title) }}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>

          <!-- Link item without sub-items -->
          <SidebarMenuButton
            v-else-if="item.type === 'link'"
            :as-child="true"
            :is-active="item.isActive"
          >
            <Link :href="item.url">
              <component :is="item.icon" v-if="item.icon" />
              <span>{{ $t(item.title) }}</span>
            </Link>
          </SidebarMenuButton>

          <!-- Action item (clickable, executes function) -->
          <SidebarMenuButton
            v-else-if="item.type === 'action'"
            :is-active="item.isActive"
            @click="(event: MouseEvent) => handleAction(item.action, event)"
          >
            <component :is="item.icon" v-if="item.icon" />
            <span>{{ $t(item.title) }}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </template>
    </SidebarMenu>
  </SidebarGroup>
</template>
