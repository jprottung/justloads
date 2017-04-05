import preloadSupport from './features/preloadSupport';
import loadCss from './loader/loadCss';

const w = window;

/**
 *
 */
function polyfill() {
    const links = w.document.getElementsByTagName('link');

    for (let i = 0; i < links.length; i += 1) {
        let link = links[i];

        if (link.rel === 'preload' && link.getAttribute('as') === 'style') {
            loadCss(link.href);
            link.rel = null;
        }
    }
}

/**
 *
 */
export default function preloadPolyfill() {
    if (!preloadSupport()) {
        polyfill();
        let run = w.setInterval(polyfill, 300);

        w.addEventListener('load', () => {
            polyfill();
            w.clearInterval(run);
        });
    }
}