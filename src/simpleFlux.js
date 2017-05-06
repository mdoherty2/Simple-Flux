import Dispatcher from './dispatcher';
import Store from './store';

export default class SimpleFlux {
  constructor(entities) {

      // Create the dispatcher
      this._dispatcher = new Dispatcher();
      this._stores = {};

      if (!Array.isArray(entities)) {
          console.warn('Must use an array of names to instantiate SimpleFlux');
          return;
      } else if (!entities.length) {
          console.warn('Empty array passed in to SimpleFlux');
          return;
      }

      for (let i = 0, n = entities.length; i < n; i++) {
          const entity = entities[i];
          const storeName = entity + 'Store';

          const store = new Store(entity);
          this._dispatcher.registerStore(store);
          this._stores[storeName] = store;
      }
  }

  findStore(storeName) {
      const result = this._stores[storeName];
      return result;
  }

  dispatch(action, data) {
      this._dispatcher.dispatch(action, data);
  }
}
