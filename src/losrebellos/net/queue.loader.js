/*
 *
 * @author Benoit Vinay
 *
 * ben@benoitvinay.com
 * http://www.benoitvinay.com
 *
 */



//////////////////////////////////////////////////////////////////////////////////////////
// Queue loader
//
// scripts is an Array of loaders
// options is { scope:this, progress: function, complete: function, error: function }
//////////////////////////////////////////////////////////////////////////////////////////
function QueueLoader(options) {

    // variables

    var _loaders = [];
    var _options = options;
    var _this = this;

    this.scope = _options.scope || this;
    this.progress = _options.progress;
    this.complete = _options.complete;
    this.error = _options.error;

    this.length = 0;
    this.loaded = false;

    var _loader = undefined;
    var _inc = undefined;
    var _results = undefined;


    // add

    this.add = function(loader) {

        this.length = _loaders.push(loader);
    }


    // load

    this.load = function() {

        _closureInit();

        _inc = -1;
        _results = [];
        _progress(0);

        if(this.length > 0) {

            loadNext();
        }
        else {

            _progress(1);
            _complete();
        }
    }

    function loadNext() {

        _inc++;

        _loader = _loaders[_inc];
        _loader.loaderQueue = this;
        _loader.loaderComplete = _complete;
        _loader.loaderError = _error;
        _loader.load();

        _closureAdd(_loader.url);
    }


    // abort

    this.abort = function() {

        for (var i in _loaders) {

            _loaders[i].abort();
        }
    }


    // progress

    var _progress = function(percent) {

        if(_this.progress) {

            _this.progress.apply(_this.scope, [percent]);
        }
    }


    // complete

    var _complete = function(data, textStatus, jqxhr) {

        _results.push(data);

        // progress
        _progress((_inc + 1) / _loaders.length);

        // end
        if(_inc == _loaders.length - 1) {

            _closureOutput();

            _this.loaded = true;
            _this.complete.apply(_this.scope, [_results]);
        }

        // next
        else {

            loadNext();
        }
    }


    // error

    var _error = function(exception) {

        if(_this.error) {

            _this.error.apply(_this.scope, [exception]);
        }
    }


    // Closure

    var _closure = undefined;

    var _closureInit = function() {

        _closure = [];
    }

    var _closureAdd = function(url) {

        if(url) {

            _closure.push(url);
        }
    }

    var _closureOutput = function() {

        if(_closure.length <= 1) {

            return;
        }

        var _closureOutput = "java -jar compiler.jar";
        for(var i in _closure) {

            _closureOutput += "\n--js=" + _closure[i];
        }
        _closureOutput += "\n--js_output_file=" + ("assets/scripts/script.") + QueueLoader.CLOSURE_INC + ".js";
        Console.log("Closure:", _closureOutput);

        QueueLoader.CLOSURE_INC++;
    }
}


QueueLoader.CLOSURE_INC = 1;
