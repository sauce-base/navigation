<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { useNavigationStore } from '../stores';

const title = 'Navigation Module';
const message = 'Welcome to the ' + title;
const navigationStore = useNavigationStore();
</script>
<template>
    <Head :title="title" />
    <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div class="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <div class="flex items-center justify-between">
                <div>
                    <h2
                        class="text-2xl font-bold text-gray-900 dark:text-gray-100"
                    >
                        🔐 {{ message }}
                    </h2>
                    <p class="mt-2 text-gray-600 dark:text-gray-400">
                        Counter: {{ navigationStore.counter }}
                    </p>
                    <div class="mt-4 space-x-2">
                        <button
                            @click="navigationStore.increment"
                            class="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                        >
                            +
                        </button>
                        <button
                            @click="navigationStore.decrement"
                            class="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                        >
                            -
                        </button>
                        <button
                            @click="navigationStore.reset"
                            class="rounded bg-gray-500 px-3 py-1 text-white hover:bg-gray-600"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
