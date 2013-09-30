/*
 *
 * @author Benoit Vinay
 *
 * ben@benoitvinay.com
 * http://www.benoitvinay.com
 *
 */



//////////////////////////////////////////////////////////////////////////////////////////
// JSON loader
//
// options is { url: String, data: POST | GET, scope: "this", complete: function, validate: function, error: function }
//
// function validate(response) {
//     
//     return true | false;
// }
//
//////////////////////////////////////////////////////////////////////////////////////////
function JSONLoader(options) {

    // variables

    var _options = options;
    if(!_options.scope) {

        _options.scope = this;
    }

    var _this = this;
    var _try = 0;
    var _request = undefined;

    this.loaded = false;


    // load

    this.load = function() {

        // abort
        this.abort();

        // not loaded
        _this.loaded = false;

        // request
        _request = $.ajax({
        
            url: _options.url,
            data: _options.data,

            type: _options.type || JSONLoader.GET,
            contentType: 'application/json; charset=utf-8',
            dataType: _options.dataType || 'json',
            crossDomain: true,
            
            success: function(response, status, XHR) { _complete.apply(_this, [response, status, XHR]); },
            error: function(response, status, error) { _error.apply(_this, [response, status, error]); }
        });
    }


    // destroy

    this.abort = function() {

        if(_request) {

            _request.abort();
            _request = undefined;
        }
    }


    // complete

    var _complete = function(response, status, XHR) {

        if((_options.validate && _options.validate.apply(this, [response])) || response.success) {

            _this.loaded = true;
            if(_options.complete) {

                _options.complete.apply(_options.scope, [response, status, XHR]);   
            }

            // part of a queue
            if(_this.loaderQueue) {

                _this.loaderComplete.apply(_this.loaderQueue, [response]);
            }
        }
        else {

            _error.apply(_options.scope, [response, status, undefined]);
        }
    }


    // error

    var _error = function(response, status, error) {

        _try++;

        Console.log("JSONLoader try: " + _try);

        // retry
        if(_try < JSONLoader.RETRY_LIMIT) {

            setTimeout( function() { _this.load(); }, JSONLoader.RETRY_TIMEOUT);
        }

        // cancel
        else {

            if(_options.error) {

                _options.error.apply(_options.scope, [response, status, error]);
            }

            Console.log("JSONLoader cancelled: ", _options.url, _options.data, response, status, error);

            // part of a queue
            if(_this.loaderQueue) {

                _this.loaderError.apply(_this.loaderQueue, [response, status, error]);
            }
        }
    }
}


// constants

JSONLoader.POST             = "POST";
JSONLoader.GET              = "GET";

JSONLoader.RETRY_LIMIT      = 3;
JSONLoader.RETRY_TIMEOUT    = 1000;
