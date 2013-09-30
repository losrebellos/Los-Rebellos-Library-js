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

function SoundObject(url, tag) {

	var _this = this;
	var _tag = tag;
	var _valid = (_tag.canPlayType ? true : false);		// check if the tag is valid (i.e.: Safari on Windows)
	
	var _playTimeout = undefined;
	var _loopInterval = undefined;
	var _duration = (_valid ? (_tag.duration * 1000) : -1);

	var _playing = false;
	
	this.url = url;


	// play

	var _play = function(time) {

		_this.stop();

		try {

			_tag.currentTime = time || 0;
			_tag.play();
		}
		catch(e) {

			_error(e);
		}

		_playing = true;
	}

	this.play = function(time, complete) {

    	_play.apply(_this, [time]);

		try {

			_tag.loop = false;
		}
		catch(e) {

			_error(e);
		}

		if(complete) {

			_playTimeout = setTimeout(function() {

				clearTimeout(_playTimeout);
				
				complete.apply(_this);
			}, _duration);
		}
	}


	// loop

	this.loop = function(time, complete) {

    	_play.apply(_this, [time]);

		try {

			_tag.loop = true;
		}
		catch(e) {

			_error(e);
		}

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

		try {
			
			_tag.pause();
		}
		catch(e) {

			_error(e);
		}
    }


    // volume

    this.mute = function(value) {

		try {
			
    		_tag.muted = value;
		}
		catch(e) {

			_error(e);
		}
    }


    // error

    var _error = function(e) {

		Console.log("SoundObject.error:", e.message);
    }


    // valid

    if(!_valid) {

    	_play = function(time) {};

    	this.play = function(time, complete) {};
    	this.loop = function(time, complete) {};
    	this.stop = function() {};
    	this.mute = function(value) {};

    	_error({ message: this.url + " is not valid." });
    }

	// if valid
	// we add the tag to the holder

	else {

		if($("#audios-holder").length == 0) {

			$("body").prepend("<div id='audios-holder'></div>");
		}
		$("#audios-holder").append(_tag);

		_tag = document.getElementById(url);
	}
}
