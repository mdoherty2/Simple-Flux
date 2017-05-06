import vis from 'vis';
export default class Store {
  constructor(name) {
      // Make sure name is upper case
      const upperName = name.toUpperCase();

      // create the vis dataset
      this._store = new vis.DataSet();

      // Create the action names to interact with this store
      const addAction = 'ADD_' + upperName;
      const updateAction = 'UPDATE_' + upperName;
      const removeAction = 'REMOVE_' + upperName;

      // Create the action callbacks to interact with the store
      this._actions = {};
      this._actions[addAction] = function(entity) {
          this._store.add(entity);
      }.bind(this);

      this._actions[updateAction] = function(entity) {
          this._store.update(entity);
      }.bind(this);

      this._actions[removeAction] = function(entity) {
          this._store.remove(entity);
      }.bind(this);
  }

  get actions() {
      return this._actions;
  }

  get() {
      return this._store.get.apply(this._store, arguments);
  }

  on(params) {
      const events = Object.keys(params);
      for (let i = 0, n = events.length; i < n; i++) {
          const event = events[i];
          this._store.on(event, params[event]);
      }
  }

  off(params) {
      const events = Object.keys(params);
      for (let i = 0, n = events.length; i < n; i++) {
          const event = events[i];
          this._store.off(event, params[event]);
      }
  }
}
