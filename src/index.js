// Import a couple modules for testing.
import { w } from './constants/global';
import LoaderFactory from './factories/LoaderFactory';
import ResourceManager from './factories/ResourceManager';
import ObjectFnQueue from './models/ObjectFnQueue';

const time = performance.now();

const justloads = {
  load: (options) => {
    const resource = ResourceManager.get(options);
    LoaderFactory.load(resource)
      .then(() => {
        //console.log(`${(performance.now() - time)}: ${resource.key}`);
      });
  },
};

const jlQueueName = 'jl_queue';
const jlQueue = new ObjectFnQueue(justloads, w[jlQueueName] || []);
jlQueue.empty();
w[jlQueueName] = jlQueue;

export default justloads;
