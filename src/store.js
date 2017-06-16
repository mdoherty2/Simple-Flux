import vis from 'vis';

/**
 * The different types of events this store supports
 * @type {Array}
 * @constant
 */
const EVENTS = ['add', 'update', 'remove'];
/**
 * Store
 * Flux store for managing part of the state of the application
 * @class
 */
export default class Store {
  constructor(name) {
      // Make sure name is upper case
      const upperName = name.toUpperCase();

      /**
       * A map of subscriptions to this
       * @type {Object}
       */
      this._subscriptions = {};

      // create the vis dataset
      this._dataset = new vis.DataSet();
      this._store = new vis.DataView(this._dataset);

      // Create the action names to interact with this store
      const addAction = 'ADD_' + upperName;
      const updateAction = 'UPDATE_' + upperName;
      const removeAction = 'REMOVE_' + upperName;

      // Create the action callbacks to interact with the store
      this._actions = {};
      this._actions[addAction] = function(entity) {
          this._dataset.add(entity);
      }.bind(this);

      this._actions[updateAction] = function(entity) {
          this._dataset.update(entity);
      }.bind(this);

      this._actions[removeAction] = function(entity) {
          this._dataset.remove(entity);
      }.bind(this);
  }

/**
 * Getter for this stores actions
 * @return {Object} The actions of this store
 */
  get actions() {
      return this._actions;
  }

/**
 * Gets all the items within this storeName
 * @return {Array.<Object>} An array containing all of this store's items
 */
  get() {
      return this._store.get.apply(this._store, arguments);
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
                      params[event](this._dataset.get(props.items));
                      break;
                  case 'remove':
                      params[event](props.oldData);
                      break;
                }
            };

          this._store.on(event, subscriptionFunction);

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
              this._store.off(event, functionRef);
              delete this._subscriptions[subscription];
          }
      }
  }
}
