/*
 *
 * @author Benoit Vinay
 *
 * ben@benoitvinay.com
 * http://www.benoitvinay.com
 *
 */



//////////////////////////////////////////////////////////////////////////////////////////
// Text loader
//
// useful to load text based file (html, tpl, etc.)
// options are { url:String, scope:this, complete: function, error: function }
//////////////////////////////////////////////////////////////////////////////////////////
function TextLoader(options) {

    // variables

    var _options = options || {};
    var _this = this;
    var _request = undefined;
    var _extension = _options.url.split(".")[_options.url.split(".").length - 1].toLowerCase();

    this.scope = _options.scope || this;
    this.complete = _options.complete;
    this.error = _options.error;

    this.loaded = false;


    // load

    this.load = function() {

        this.abort();

        // css already loaded?
        if(_extension == TextLoader.DATA_TYPE_CSS) {

            var _styleTags = document.getElementsByTagName("style");
            for (var i in _styleTags) {

                if(_styleTags[i].toString().indexOf("HTMLStyleElement") > -1 && _styleTags[i].getAttribute("id") == _options.url) {
                    
                    _complete.apply(_this, [this]);

                    return;
                }
            }
        }

        // load
        _request = $.ajax({

            dataType: _options.dataType || TextLoader.DATA_TYPE_TEXT,
            url: _options.url,
            success: _complete,
            error: _error
        });
    }


    // abort

    this.abort = function() {

        if(_request) {

            _request.abort();
            _request = undefined;
        }
    }


    // complete

    var _complete = function(data, textStatus, jqxhr) {

        _this.loaded = true;

        // if something to process
        switch(_extension) {

            // CSS
            case TextLoader.DATA_TYPE_CSS:
                $('<style type="text/css" id="' + _options.url + '"></style>').html(data).appendTo("head");
                break;
        }

        if(_this.complete) {

            _this.complete.apply(_this.scope, [data, textStatus, jqxhr]);   
        }

        // part of a queue
        if(_this.loaderQueue) {

            _this.loaderComplete.apply(_this.loaderQueue, [data, textStatus, jqxhr]);
        }
    }


    // error

    var _error = function(jqxhr, settings, exception) {

        if(_this.error) {

            _this.error.apply(_this.scope, [jqxhr, settings, exception]);
        }

        // part of a queue
        if(_this.loaderQueue) {

            _this.loaderError.apply(_this.loaderQueue, [jqxhr, settings, exception]);
        }
    }
}


// constants

TextLoader.DATA_TYPE_TEXT       = "text";
TextLoader.DATA_TYPE_CSS        = "css";
TextLoader.DATA_TYPE_SCRIPT     = "script";
