import '../css/style.css';

/**
 * Navigation module setup
 * Called during app initialization before mounting
 */
export function setup() {
    console.log('Navigation module loaded');
}

/**
 * Navigation module after mount logic
 * Called after the app has been mounted
 */
export function afterMount() {
    console.log('Navigation module after mount logic executed');
}
