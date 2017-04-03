import loadElement from './../functions/loadElement';

/**
 *
 * @param url
 * @param {string} [media]
 * @returns {Promise}
 */
export default function loadCss(url, media = 'all') {
    const p = loadElement(url, 'link', {
        type: 'text/css',
        rel: 'stylesheet',
        href: url,
        media: 'only x'
    });

    p.then(function afterCssLoad(element) {
        element.media = media; // eslint-disable-line
    }, () => {
    });

    return p;
}
