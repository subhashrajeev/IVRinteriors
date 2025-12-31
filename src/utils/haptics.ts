/**
 * Premium Haptic Feedback Utility
 * Uses the Vibration API for tactile feedback on mobile devices.
 * Note: Works on Android Chrome/Firefox. iOS Safari does not support web vibration.
 */

type HapticType = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'selection';

const hapticPatterns: Record<HapticType, number | number[]> = {
    light: 10,           // Quick tap - for selections, toggles
    medium: 25,          // Standard button press
    heavy: 50,           // Important actions like submit
    success: [10, 50, 20], // Double pulse - form success
    warning: [30, 30, 30], // Triple pulse - errors/warnings
    selection: 5,        // Ultra-light - list item selection
};

/**
 * Trigger haptic feedback on supported devices.
 * Silently fails on unsupported devices (iOS, desktop).
 */
export const triggerHaptic = (type: HapticType = 'light'): void => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
            navigator.vibrate(hapticPatterns[type]);
        } catch {
            // Silently fail
        }
    }
};

/**
 * Hook-like wrapper for onClick handlers with haptic feedback.
 * Usage: onClick={withHaptic(() => doSomething(), 'medium')}
 */
export const withHaptic = <T extends (...args: unknown[]) => unknown>(
    callback: T,
    type: HapticType = 'light'
): ((...args: Parameters<T>) => ReturnType<T>) => {
    return (...args: Parameters<T>): ReturnType<T> => {
        triggerHaptic(type);
        return callback(...args) as ReturnType<T>;
    };
};

export default triggerHaptic;
