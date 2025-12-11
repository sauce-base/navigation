/**
 * Execute a navigation action handler
 * Provides consistent error handling for navigation actions
 *
 * @param action - The action function to execute
 * @param event - The mouse event that triggered the action
 */
export const handleAction = (
    action: (event: MouseEvent) => void | Promise<void>,
    event: MouseEvent,
): void => {
    action(event);
};
