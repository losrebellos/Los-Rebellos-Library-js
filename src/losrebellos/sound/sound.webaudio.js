/*
 *
 * @author Benoit Vinay
 *
 * ben@benoitvinay.com
 * http://www.benoitvinay.com
 *
 */



//////////////////////////////////////////////////////////////////////////////////////////
// Sound Object
//
// use in loader.sound.js
//////////////////////////////////////////////////////////////////////////////////////////

function WebAudioObject(context, url, buffer) {

	var _this = this;
	var _context = context;
	var _buffer = buffer;
	var _source = undefined;
	var _gain = undefined;

	var _playTimeout = undefined;
	var _loopInterval = undefined;
	var _duration = _buffer.duration * 1000;

	var _playing = false;
	
	this.url = url;


	// init

	var _init = function() {

		_gain = _context.createGainNode();
		_gain.connect(_context.destination);
	}


	// play

	var _play = function(time) {

		_this.stop();

		_source = _context.createBufferSource();
		_source.buffer = _buffer;
		_source.connect(_gain);

    	_processVolume.apply(_this, [(_mute ? 0 : _volume)]);

		_source.noteOn(time || 0);

		_playing = true;
	}

	this.play = function(time, complete) {

    	_play.apply(_this, [time]);
    	_source.loop = false;

		if(complete) {

			_playTimeout = setTimeout(function() {

				clearTimeout(_playTimeout);

				complete.apply(_this);
			}, _duration);
		}
	}


	// loop

	this.loop = function(time, complete) {

    	_play.apply(this, [time]);
    	_source.loop = true;

		_loopInterval = setInterval(function() {

			if(complete) {

				complete.apply(_this);
			}
		}, _duration);
	}


	// stop

    this.stop = function() {
		
		_playing = false;

    	if(_playTimeout) {

			clearTimeout(_playTimeout);
    	}

    	if(_loopInterval) {

    		clearInterval(_loopInterval);
    	}

		if(_source) {

			_source.noteOff(0);
			_source = undefined;
		}
    }


    // volume

    var _volume = 1;

    var _processVolume = function(value) {

    	// Console.log("mute:", this.url, value);

	    _gain.gain.value = value;
    }

    this.volume = function(value) {

    	_volume = value;

    	_processVolume.apply(this, [value]);
    }

    var _mute = false;

    this.mute = function(value) {

		_mute = value;

    	_processVolume.apply(this, [(_mute ? 0 : _volume)]);
    }


    // init

    _init.apply(this);
}
