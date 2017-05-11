import loadJs from './loader/loadJs';
import loadCss from './loader/loadCss';
import capitalizeFirstLetter from './functions/capitalizeFirstLetter';

const loader = {
    loadJs,
    loadCss,
};

/**
 *
 * @param type
 * @returns {*}
 */
export default function load(type) {
    const loaderName = 'load' + capitalizeFirstLetter(type);
    const args = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1): [];

    return loader[loaderName].apply(null, args);
}
