/*
 *
 * @author Benoit Vinay
 *
 * ben@benoitvinay.com
 * http://www.benoitvinay.com
 *
 */



//////////////////////////////////////////////////////////////////////////////////////////
// Fonts loader
//
// useful to load fonts
// based on Google Web Fonts (https://developers.google.com/webfonts/docs/webfont_loader)
// options are { fonts:Object, scope:this, complete: function, error: function }
//////////////////////////////////////////////////////////////////////////////////////////
function FontsLoader(options) {

    // variables

    var _options = options || {};
    var _this = this;

    this.scope = _options.scope || this;
    this.complete = _options.complete;
    this.error = _options.error;

    this.loaded = false;


    // load

    this.load = function() {

        this.abort();

        // callbacks
        _options.fonts.fontloading = _fontStart;
        _options.fonts.fontactive = _fontComplete;
        _options.fonts.fontinactive = _fontError;
        _options.fonts.loading = _start;
        _options.fonts.active = _complete;
        _options.fonts.inactive = _error;

        // load google web fonts loader
        var _googleWebFontLoader = new ScriptLoader({

            url: ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1.0.31/webfont.js',
            scope: this,
            complete: _onLibraryComplete
        });
        _googleWebFontLoader.load();
    }

    var _onLibraryComplete = function() {

        if(WebFont && WebFont.a && WebFont.a.isSupportingWebFont && WebFont.a.isSupportingWebFont()) {

            // instead of:
            // WebFontConfig = _options.fonts;
            WebFont.load(_options.fonts);
        }
        else {

            _error.apply(_this);
        }
    }


    // abort

    this.abort = function() {

        // to implement
    }


    // font complete

    var _fontStart = function(fontFamily, fontDescription) {

        // nothing atm
    }

    var _fontComplete = function(fontFamily, fontDescription) {

        // nothing atm
    }


    // loading

    var _start = function() {

        // nothing atm
    }

    var _complete = function() {

        _this.loaded = true;

        if(_this.complete) {

            _this.complete.apply(_this.scope, ["FontsLoader"]);
        }

        // part of a queue
        if(_this.loaderQueue) {

            _this.loaderComplete.apply(_this.loaderQueue, ["FontsLoader"]);
        }
    }


    // error

    var _fontError = function(fontFamily, fontDescription) {

        if(_this.loaderQueue) {

            _this.loaderError.apply(_this.loaderQueue, [fontFamily, fontDescription]);
        }
    }

    var _error = function(fontFamily, fontDescription) {

        if(_this.error) {

            _this.error.apply(_this.scope, [fontFamily, fontDescription]);
        }

        _complete.apply(_this);
    }
}
