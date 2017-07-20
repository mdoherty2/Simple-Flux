const assert = require('assert');

import Store from '../src/store';

let testStore;
describe('Store Tests', function() {

  describe('#Creation', function() {
      it('should create add, update, and remove actions', function() {
          var expected = true;
          var actual = false;

          testStore = new Store('test');

          actual = testStore.actions.hasOwnProperty('ADD_TEST') &&
                   testStore.actions.hasOwnProperty('UPDATE_TEST') &&
                   testStore.actions.hasOwnProperty('REMOVE_TEST');

          assert.equal(actual, expected);
      });

      it('should create callbacks for the add, update, and remove actions', function() {
          var expected = true;
          var actual = false;

          testStore = new Store('test');

          actual = typeof testStore.actions.ADD_TEST === 'function' &&
                   typeof testStore.actions.UPDATE_TEST === 'function' &&
                   typeof testStore.actions.REMOVE_TEST === 'function';

          assert.equal(actual, expected);
      });
    });

    describe('#Actions', function() {
        it('should return an object', function() {
            var expected = 'object';
            var actual = '';

            testStore = new Store('test');

            actual = typeof testStore.actions;

            assert.equal(actual, expected);
        });
    });

    describe('#On', function() {
        it('should register callbacks for adding, updating, and removing', function() {
            var expected = true;
            var actual = false;

            var counter = 0;
            var callback = function() {
                counter++;
            };

            testStore = new Store('test');
            testStore.on({
                add: callback,
                update: callback,
                remove: callback
            }, 'test');

            testStore._dataset.add({id: 1, data: 'test'});
            testStore._dataset.update({id: 1, data: 'changed'});
            testStore._dataset.remove({id: 1});

            actual = 3 === counter;

            assert(actual, expected);
        });
    });

    describe('#Off', function() {
        it('should remove all registered callbacks', function() {
            var expected = true;
            var actual = false;

            var counter = 0;
            var callback = function() {
                counter++;
            };

            testStore = new Store('test');
            testStore.on({
                add: callback,
                update: callback,
                remove: callback
            }, 'test');

            testStore.off('test');

            testStore._dataset.add({id: 1, data: 'test'});
            testStore._dataset.update({id: 1, data: 'changed'});
            testStore._dataset.remove({id: 1});

            actual = 0 === counter;

            assert(actual, expected);
        });
    });
});
