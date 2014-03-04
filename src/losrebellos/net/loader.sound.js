/*
 *
 * @author Benoit Vinay
 *
 * ben@benoitvinay.com
 * http://www.benoitvinay.com
 *
 */



//////////////////////////////////////////////////////////////////////////////////////////
// Sound loader
//
// useful to load sound
// use Web Audio API or audio tag
// options are { context: WAA context || audio tag, preload: Boolean, url: String, scope: this, complete: function, error: function }
//////////////////////////////////////////////////////////////////////////////////////////
function SoundLoader(options) {

    // variables

    var _this = this;
    var _options = options || {};

    // preload
    if(_options.preload == undefined) {

        _options.preload = true;
    }

    // Web Audio APi
    var _context = _options.context;
    var _request = undefined;

    // audio tag
    var _audio = (_context ? undefined : SoundLoader.createAudio());

    // type
    var _WAA = (_options.context != undefined);

    this.scope = _options.scope || this;
    this.complete = _options.complete;
    this.error = _options.error;

    this.loaded = false;


    // load

    this.load = function() {

        this.abort();

        // Console.log("sound: " + _WAA);

        // Web Audio API
    	if(_WAA) {

			_request = new XMLHttpRequest();

			// decode asynchronously
			_request.onload = function() {

                _context.decodeAudioData(_request.response, _WAAComplete, _error);
			}
            
            _request.open("GET", _options.url, true);
            _request.responseType = "arraybuffer";
			_request.send();
    	}

    	// audio tag
        // preload?
    	else {

            // Console.log("sound: " + _options.url + " / " + _options.preload + " / " + _audio.canPlayType);

            // if the tag is invalid (i.e.: Safari on Windows)
            if(!_audio.canPlayType) {

                _complete(new SoundObject(_options.url, _audio));

                return;
            }

            // preload?
            if(_options.preload) {

                _audio.addEventListener("canplaythrough", _tagComplete, false);
                _audio.oncanplaythrough = _tagComplete;
                // _audioTimeout = setTimeout(function() {

                //     Console.log(_options.url);
                //     _complete();
                // }, 10000);
            }

            // Console.log(_audio);
            _audio.onstalled = function() {

                // Console.log("onstalled!");
            }
            _audio.onemptied = function() {

                // Console.log("onemptied!");
            }
            _audio.onerror = function() {

                // Console.log("onerror!");
            }
            _audio.onloadedmetadata = function() {

                // Console.log("onloadedmetadata!");
            }
            _audio.onreadystatechange = function() {

                // Console.log("onreadystatechange!");
            }
            _audio.onsuspend = function() {

                // Console.log("onsuspend!");
            }
            _audio.onwaiting = function() {

                // Console.log("onwaiting!");
            }

            _audio.preload = (_options.preload ? "auto" : "none");
    		_audio.src = _audio.id = _options.url;

            if(!_options.preload) {

                _complete(new SoundObject(_options.url, _audio));
            }
    	}
    }


    // abort

    this.abort = function() {

        if(_request) {

            _request.abort();
            _request = undefined;
        }
    }


    // complete

    var _WAAComplete = function(data) {

        _complete(new WebAudioObject(_context, _options.url, data));
    }

    var _audioTimeout = undefined;

    var _tagComplete = function() {

        if(_audio.readyState != 4) {

            return;
        }

        // clearTimeout(_audioTimeout);

        _audio.removeEventListener("canplaythrough", _tagComplete, false);
        _audio.oncanplaythrough = null;

        _complete(new SoundObject(_options.url, _audio));
    }

    var _complete = function(sound) {

        // loaded
        _this.loaded = true;

        // complete
        if(_this.complete) {

            // alert("sound complete: " + sound);

        	_this.complete.apply(_this.scope, [sound]);
        }

        // part of a queue
        if(_this.loaderQueue) {

            _this.loaderComplete.apply(_this.loaderQueue, [sound]);
        }
    }


    // error

    var _error = function() {

        if(_this.error) {

            _this.error.apply(_this.scope, [_options.url]);
        }

        // part of a queue
        if(_this.loaderQueue) {

            _this.loaderError.apply(_this.loaderQueue, [_options.url]);
        }
    }
}


// constants

SoundLoader.MP3         = "mp3";
SoundLoader.OGG         = "ogg";
SoundLoader.WAV         = "wav";
SoundLoader.ACC         = "acc";
SoundLoader.FORMATS     = [ SoundLoader.MP3, SoundLoader.OGG, SoundLoader.WAV, SoundLoader.ACC ];


// static helper

SoundLoader.createAudio = function() {

    // if Safari 5.1.
    var _userAgent = navigator.userAgent.toLowerCase();
    if((_userAgent.indexOf("safari") > -1) && (_userAgent.indexOf("5.1.") > -1)) {

        return document.createElement("audio");
    }

    // else
    var _audio = null;
    try {

        _audio = new Audio();
    }
    catch(e) {

        _audio = document.createElement("audio");
    }

    return _audio;
}

SoundLoader.detectTypes = function() {

	var _audio = SoundLoader.createAudio();
    var _results = [];

	for (var i in SoundLoader.FORMATS) {

		var format = SoundLoader.FORMATS[i];
		var can = !!_audio.canPlayType && _audio.canPlayType("audio/" + format) != "";
		if(can) {

			var formatSplit = format.split("/");
            _results.push(formatSplit[formatSplit.length - 1]);
		}
	}

    return (_results.length == 0) ? null : _results;
}

SoundLoader.context = undefined;
SoundLoader.getContext = function() {

	if(!SoundLoader.context) {

		SoundLoader.context = (window["webkitAudioContext"] ? new webkitAudioContext() : undefined);
	}

	return SoundLoader.context;
}
