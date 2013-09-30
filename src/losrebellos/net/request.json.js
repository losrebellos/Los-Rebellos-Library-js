/*
 *
 * @author Benoit Vinay
 *
 * ben@benoitvinay.com
 * http://www.benoitvinay.com
 *
 */



//////////////////////////////////////////////////////////////////////////////////////////
// JSON request
//
// options is { url: String, data: POST | GET, scope: "this", success: function, error: function }
//////////////////////////////////////////////////////////////////////////////////////////
function JSONRequest(options) {

    // variables

    var _options = options;

    var _this = this;
    var _try = 0;
    var _request = undefined;

    this.success = false;


    // load

    this.load = function() {

        // destroy
        this.destroy();

        // scope
        if(!_options.scope) {

            _options.scope = this;
        }

        // request
        _request = $.ajax({
        
            url: _options.url,
            data: _options.data,

            type: _options.type || 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            crossDomain: true,
            
            success: function(response, status, XHR) { _success.apply(_this, [response, status, XHR]); },
            error: function(response, status, error) { _error.apply(_this, [response, status, error]); }
        });
    }


    // destroy

    this.destroy = function() {

        if(_request) {

            _request.abort();
            _request = undefined;
        }
    }


    // success

    var _success = function(response, status, XHR) {

        if((_options.valid && _options.valid.apply(this, [response])) || response.success) {

            _this.success = true;
            _options.success.apply(_options.scope, [response, status, XHR]);
        }
        else {

            _error.apply(_options.scope, [response, status, undefined]);
        }
    }


    // error

    var _error = function(response, status, error) {

        _try++;

        console.log("JSONRequest try: " + _try);

        // retry
        if(_try < JSONRequest.RETRY_LIMIT) {

            setTimeout( function() { _this.load(); }, JSONRequest.RETRY_TIMEOUT);
        }

        // cancel
        else {

            if(_options.error) {

                _options.error.apply(_options.scope, [response, status, error]);
            }

            console.log("JSONRequest cancelled: ", _options.url, _options.data, response, status, error);
        }
    }


    // start
    this.load();
}


// constants

JSONRequest.RETRY_LIMIT     = 3;
JSONRequest.RETRY_TIMEOUT   = 1000;
