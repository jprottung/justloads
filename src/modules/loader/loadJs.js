import loadElement from './../functions/loadElement';

/**
 *
 * @param url
 * @returns {Promise}
 */
export default function loadJs(url) {
    return loadElement(url, 'script', {
        async: true,
        src: url
    });
}
