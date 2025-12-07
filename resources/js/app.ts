import type { App } from 'vue';
import '../css/style.css';

/**
 * Navigation module setup
 * Called during app initialization before mounting
 */
export function setup(app: App) {
    console.debug('Navigation module loaded');
}

/**
 * Navigation module after mount logic
 * Called after the app has been mounted
 */
export function afterMount(app: App) {
    console.debug('Navigation module after mount logic executed');
}
