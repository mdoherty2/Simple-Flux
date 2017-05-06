const assert = require('assert');

import Dispatcher from '../src/dispatcher';
import Store from '../src/store';

let testStore;
let dispatcher;
describe('Dispatcher Tests', function() {
    describe('#RegisterStore', function() {
        it('should register the store\'s callbacks', function() {
              var expected = true;
              var actual = true;

              dispatcher = new Dispatcher();
              testStore = new Store('test');

              dispatcher.registerStore(testStore);

              var actionNames = Object.keys(testStore.actions);

              for (let i = 0, n = actionNames.length; i < n; i++) {
                  let actionName = actionNames[i];
                  if (!dispatcher._actionCallbacks.hasOwnProperty(actionName)) {
                      actual = false;
                  }
              }
              assert.equal(actual, expected);
         });
     });

     describe('#Dispatch', function() {
         it('should call the callback registered with the dispatched action', function() {
                var expected = true;
                var actual = false;

                var callback = function() {
                    actual = true;
                };

                dispatcher = new Dispatcher();

                dispatcher._actionCallbacks.TEST_ACTION = callback;

                dispatcher.dispatch('TEST_ACTION', {});

                assert.equal(actual, expected);
         });
     });
 });
