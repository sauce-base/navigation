<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

import { useAuthStore } from '@modules/Auth/resources/js/stores';
import NavMain from './NavMain.vue';
import NavSecondary from './NavSecondary.vue';
import NavUser from './NavUser.vue';
import TenantSwitcher from './TenantSwitcher.vue';

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
  variant: 'inset',
});

const authStore = useAuthStore();
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TenantSwitcher />
    </SidebarHeader>
    <SidebarContent>
      <NavMain />
      <NavSecondary />
    </SidebarContent>
    <SidebarFooter>
      <NavUser v-if="authStore.user" :user="authStore.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
