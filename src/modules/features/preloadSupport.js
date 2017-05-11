import createElement from './../functions/createElement';

/**
 * checks whether a browser supports pre loading styles or not
 *
 * @return {boolean}
 */
export default function preloadSupport() {
    try {
        return createElement('link')
            .relList
            .supports('preload');
    } catch (e) {
        return false;
    }
}