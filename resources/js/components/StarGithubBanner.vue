<script setup lang="ts">
import IconGitHub from '~icons/mdi/github';
</script>

<template>
    <a
        href="https://github.com/sauce-base/core"
        target="_blank"
        rel="noopener noreferrer"
        class="group -mx-4 flex items-center gap-2 rounded-sm border border-white/10 bg-white/10 p-3 transition-colors hover:bg-white/20"
    >
        <div
            class="flex size-8 shrink-0 items-center justify-center rounded-md bg-white/10"
        >
            <IconGitHub class="text-foreground size-4" />
        </div>
        <div class="flex-1">
            <p class="text-foreground text-xs leading-tight font-medium">
                {{ $t('Star us on GitHub') }}
            </p>
            <p class="text-muted-foreground text-[10px] leading-tight">
                {{ $t('Help us grow the community') }}
            </p>
        </div>
    </a>
</template>
