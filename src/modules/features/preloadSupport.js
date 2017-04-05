/**
 *
 * @return {boolean}
 */

export default function preloadSupport() {
    try {
        return window.document.createElement('link')
            .relList
            .supports('preload');
    } catch (e) {
        return false;
    }
}