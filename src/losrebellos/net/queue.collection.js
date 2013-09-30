/*
 *
 * @author Benoit Vinay
 *
 * ben@benoitvinay.com
 * http://www.benoitvinay.com
 *
 */



//////////////////////////////////////////////////////////////////////////////////////////
// QueueCollection
//
// collections is an Array of Backbone.Collection
// options is { scope:this, progress: function, complete: function }
//////////////////////////////////////////////////////////////////////////////////////////
function QueueCollection(collections, options) {

    // private variables

    var _collections = collections;
    var _options = options;
    var _inc = -1;
    var _collection = undefined;
    var _results = [];


    // load

    this.load = function() {

        _options.progress.apply(this, [0]);

        loadNext();
    }

    function loadNext() {

        _inc++;

        _collection = new (_collections[_inc]);
        _collection.fetch({

            // success
            success: function(collection, response) {

                _results.push(collection);

                // progress
                _options.progress.apply(_options.scope, [(_inc + 1) / _collections.length]);

                // end
                if(_inc == _collections.length - 1) {

                    _options.complete.apply(_options.scope, [_results]);
                }

                // next
                else {

                    loadNext();
                }
            },

            // error
            error: function(collection, response) {

                Console.log("QueueCollection.error:", response);
            }
        });
    }
}
