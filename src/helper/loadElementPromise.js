import {readyState, onreadystatechange, addEventListener} from './../constants/global';

/**
 *
 * @param element
 * @returns {Promise}
 */
export default function loadElementPromise(element) {
    let complete = false;

    return new Promise(function elementPromises(resolve, reject) {
        const rejectHandler = function rejectCb(error) {
                reject(error, element);
            },
            resolveHandler = function rejectCb() {
                resolve(element);
            };

        if (element[readyState]) {
            element[onreadystatechange] = function onreadystatechangeHandler() {
                if (!complete && (element[readyState] === 'complete')) {
                    complete = true;
                    resolveHandler();
                }
            };
        } else {
            element[addEventListener]('load', resolveHandler);
        }

        element[addEventListener]('error', rejectHandler);
        element[addEventListener]('abort', rejectHandler);
    });
}
