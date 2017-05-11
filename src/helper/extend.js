import isObject from './isObject';
import isBoolean from './isBoolean';
import isArray from './isArray';

/**
 *
 * @return {Object}
 */
export default function extend() {
    const extended = {};
    let deep = false;
    let i = 0;
    const length = arguments.length;
    const merge = function mergeFn(obj) {
        Object.keys(obj)
            .forEach(prop => {
                const currVal = obj[prop];
                let valToSet;

                // If deep merge and property is an object, merge properties
                if (deep && isObject(currVal)) {
                    if (!extended[prop]) {
                        valToSet = extend(true, currVal);
                    } else {
                        valToSet = extend(true, extended[prop], currVal);
                    }
                } else if (deep && isArray(currVal)) {
                    if (!extended[prop]) {
                        valToSet = currVal.slice(0);
                    } else {
                        valToSet = extended[prop].concat(currVal);
                    }
                } else {
                    valToSet = currVal;
                }

                extended[prop] = valToSet;
            });
    };
    let obj;

    // Check if a deep merge
    if (isBoolean(arguments[0])) {
        deep = arguments[0];
        i += 1;
    }

    // Loop through each object and conduct a merge
    for (i; i < length; i += 1) {
        obj = arguments[i];
        merge(obj);
    }

    return extended;
}