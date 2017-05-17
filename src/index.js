// Import a couple modules for testing.
import LoaderFactory from './factories/LoaderFactory';
import ObjectFnQueue from './models/ObjectFnQueue';

const justloads = {
    load: function (type, options) {
        debugger;
        LoaderFactory.get(type).load(options);
    },
};

window.jl_queue = new ObjectFnQueue(justloads, window.jl_queue || []);

export default justloads;
