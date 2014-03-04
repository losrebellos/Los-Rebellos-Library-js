/*
 *
 * @author Benoit Vinay
 *
 * ben@benoitvinay.com
 * http://www.benoitvinay.com
 *
 */



//////////////////////////////////////////////////////////////////////////////////////////
// Script loader
//
// useful to load script based file (js, etc.)
// options are { url:String, scope:this, complete: function, error: function }
//////////////////////////////////////////////////////////////////////////////////////////
function ScriptLoader(options) {

    // variables

    var _options = options || {};
    var _this = this;

    this.scope = _options.scope || this;
    this.complete = _options.complete;
    this.error = _options.error;

    this.loaded = false;


    // url

    this.url = _options.url;


    // load

    this.load = function() {

        this.abort();

        // already loaded?
        var _scripts = document.getElementsByTagName("script");
        for (var i in _scripts) {

            if(_scripts[i].toString().indexOf("HTMLScriptElement") > -1 && _scripts[i].getAttribute("src") == _options.url) {

                _complete.apply(_this, [this]);

                return;
            }
        }

        // create
        var _script = document.createElement("script");
        _script.src = _options.url;
        _script.type = "text/javascript";
        // _script.async = "true";

        // IE
        if(_script.readyState) {

            _script.onreadystatechange = function() {

                if(_script.readyState == "complete" || _script.readyState == "loaded") {

                    _onComplete(_script);
                }
            }
        }
        // non IE
        else {

            _script.onload = function() {

                _onComplete(_script);
            }
        }

        // error
        _script.onerror = _error;

        // insert
        var _scriptTags = document.getElementsByTagName("script");
        var _lastScriptTag = _scriptTags[_scriptTags.length - 1];
        _lastScriptTag.parentNode.insertBefore(_script, _lastScriptTag);
    }

    var _onComplete = function(script) {

        script.onreadystatechange = null;
        script.onload = null;

        try {

            _complete.apply(_this, [script]);
        }
        catch (e) {

            _error.apply(_this, [e]);
        }
    }


    // abort

    this.abort = function() {

        // to implement
    }


    // complete

    var _complete = function(data) {

        _this.loaded = true;

        if(_this.complete) {

            _this.complete.apply(_this.scope, [data]);
        }

        // part of a queue
        if(_this.loaderQueue) {

            _this.loaderComplete.apply(_this.loaderQueue, [data]);
        }
    }


    // error

    var _error = function(exception) {

        if(_this.error) {

            _this.error.apply(_this.scope, [exception]);
        }

        // part of a queue
        if(_this.loaderQueue) {

            _this.loaderError.apply(_this.loaderQueue, [exception]);
        }
    }
}
