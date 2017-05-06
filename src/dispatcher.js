export default class Dispatcher {
    constructor() {
        this._actionCallbacks = {};
    }

    dispatch(action, data) {
        // Try to get the callback for the dispatched action
        const callback = this._actionCallbacks[action];

        if (!callback) {
            console.warn('Unrecognized action');
            return;
        }

        // Call the callback with the dispatched data
        callback(data);
    }

    registerStore(store) {
        // Get the store's actions
        const actions = store.actions;
        const actionNames = Object.keys(actions);

        // Loop through the action names, registering the callbacks for each one
        for (let i = 0, n = actionNames.length; i < n; i++) {
            const actionName = actionNames[i];
            this._actionCallbacks[actionName] = actions[actionName];
        }
    }
}
