# Simple-Flux
Just a very simple flux implementation. 

**Usage**
Get a reference to the simple-flux singleton by importing it.

Initialize your simple-flux framework by using `simple.init()`:

main.js
```
import {simple} from 'SimpleFlux';

simple.init([
  'entity'
  ]);

```

Simple-Flux will create a store called <name>Store, and automatically register the actions `ADD_<NAME>`, `UPDATE_<NAME>`, and `REMOVE_<NAME>`.
So in the example above, the store created would be be `entityStore` and the registered actions would be `ADD_ENTITY`, `UPDATE_ENTITY` and `REMOVE_ENTITY`;

Stores are modified using `simple.dispatch()`:

widgetA.js
```
import {simple} from 'SimpleFlux';

...

simple.dispatch('ADD_ENTITY', {
  id: 0,
  name: 'New Entity'
});

...
```

Stores can be found using `simple.findStore()`, and subscribed to using `store.on()`, and unsubscribed from using `store.off()`:

widgetB.js

```
import {simple} from 'SimpleFlux';

...

onCreate() {
  this._entityStore = simple.findStore('entityStore');
  this._entityStore.on({
    add: function(entities) {console.log('Entities Added: ' + entities);},
    update: function(entities) {console.log('Entities Updated: ' + entities);},
    remove: function(entities) {console.log('Entities Removed: ' + entities);}
   }, 'widgetB');
}

...

onDestroy() {
  this._entityStore.off('widgetB');
  this._entityStore = null;
}

```
