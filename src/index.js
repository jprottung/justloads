// Import a couple modules for testing.
import { w } from './constants/global';
import LoaderFactory from './factories/LoaderFactory';
import ObjectFnQueue from './models/ObjectFnQueue';

const justloads = {
  load: (type, options) => {
    LoaderFactory.get(type)
      .load(options);
  },
};

const jlQueueName = 'jl_queue';
const jlQueue = new ObjectFnQueue(justloads, w[jlQueueName] || []);
jlQueue.empty();
w[jlQueueName] = jlQueue;


export default justloads;
