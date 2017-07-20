import vis from 'vis';

/**
 * The different types of events this store supports
 * @type {Array}
 * @constant
 */
const EVENTS = ['add', 'update', 'remove'];
/**
 * StoreView
 * Flux store view to get a filterd view of a store
 * @class
 */
export default class StoreView {
  constructor(dataset, filterFunc) {
      /**
       * A map of subscriptions to this store view
       * @type {Object}
       */
      this._subscriptions = {};

      // create the vis dataview
      this._view = new vis.DataView(dataset, {
          filter: filterFunc
      });
  }

/**
 * Gets all the items within this storeName
 * @return {Array.<Object>} An array containing all of this store's items
 */
  get() {
      return this._view.get.apply(this._view, arguments);
  }

  /**
   * Subscribes to this stores add, update, and remove events
   * @param  {Object<Function>} params     The callbacks for the ations, keyed by their event names
   * @param  {String} subscriber The name of the component subscribing to the events
   */
  on(params, subscriber) {
      const events = Object.keys(params);
      for (let i = 0, n = events.length; i < n; i++) {
          const event = events[i];

          const subscription = subscriber + '_' + event;

          // Wrap the passed in callback in another function so we can
          // emit the items modified and unsubscribe later
          const subscriptionFunction = (event, props) => {
              switch (event) {
                  case 'add':
                  case 'update':
                      params[event](this._view.get(props.items));
                      break;
                  case 'remove':
                      params[event](props.oldData);
                      break;
                }
            };

          this._view.on(event, subscriptionFunction);

          this._subscriptions[subscription] = subscriptionFunction;
      }
  }

/**
 * Unsubscribes from this store's events
 * @param  {String} subscriber The name of the component that is unsubscribing
 */
  off(subscriber) {
      for (let i = 0, n = EVENTS.length; i < n; i++) {
          const event = EVENTS[i];
          var subscription = subscriber + '_' + event;

          if (this._subscriptions[subscription]) {
              const functionRef = this._subscriptions[subscription];
              this._view.off(event, functionRef);
              delete this._subscriptions[subscription];
          }
      }
  }
}
