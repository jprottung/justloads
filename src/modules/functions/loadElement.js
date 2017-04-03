import * as loadStorage from '../loadStorage';
import createElement from './createElement';
import insertElement from './insertElement';
import loadElementPromise from './loadElementPromise';

/**
 * loads a javascript url if its not loaded
 * @param {string} url
 * @param {string} type
 * @param {Object} [attributes]
 * @return {Promise}
 */
export default function loadElement(url, type, attributes = {}) {
    const element = createElement(type, attributes);
    let loadedElement = loadStorage.loaded(url);

    if (loadedElement) {
        return Promise.resolve(loadedElement);
    }

    const p = loadElementPromise(element);

    p.then((element) => {
        loadStorage.push(url, element);
    }, ()=>{});

    insertElement(element);

    return p;
}