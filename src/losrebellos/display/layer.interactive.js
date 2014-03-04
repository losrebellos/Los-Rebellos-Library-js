
// useful to add a <div> on top of a canvas element

losrebellos.InteractiveLayer = (function() {

	// element
	// durationClick
	// onStart
	// onMove
	// onStop
	// onClick

	var _options = null;


	// constructor

	function InteractiveLayer(options) {

		_options = options;

		if(!_options.durationClick) {

			_options.durationClick = InteractiveLayer.DURATION_CLICK;
		}
	}


	// start / stop

	InteractiveLayer.prototype.start = function() {

		_options.element.on(InteractiveLayer.EVENT_START, $.proxy(_onStart, this));
	}

	InteractiveLayer.prototype.stop = function() {

		_clearIsStartedTimeout.apply(this);

		_options.element
			.off(InteractiveLayer.EVENT_START)
			.off(InteractiveLayer.EVENT_TOUCH_MOVE)
			.off(InteractiveLayer.EVENT_MOUSE_MOVE)
			.off(InteractiveLayer.EVENT_STOP);

		_started = false;
	}


	// events

	var _stopEvent = function(e) {

		e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();

		// windows mobile
		if(e.originalEvent.preventManipulation) {

			e.originalEvent.preventManipulation();
		}
	}


	// normalize:
	// - touchstart mousedown
	// - touchmove mousemove
	// - touchend mouseup mouseleave
	// - click (no mvt / default: 150 ms)

	var _duration = -1;

	var _started = false;

	var _onStart = function(e) {

		_stopEvent.apply(this, [e]);

		_duration = (new Date()).getTime();

		_onIsStartedTimeout = setTimeout($.proxy(_onStartTimeout, this, e), _options.durationClick);

		_options.element
			.off(InteractiveLayer.EVENT_START)
			.on(_getMoveEvent.apply(this, [e]), $.proxy(_onStartTimeout, this, e))
			.on(InteractiveLayer.EVENT_STOP, $.proxy(_onStop, this));

		_started = true;
	}
	

	var _onIsStartedTimeout = null;

	var _clearIsStartedTimeout = function() {

		if(_onIsStartedTimeout) {

			clearTimeout(_onIsStartedTimeout);
		}

		_options.element
			.off(InteractiveLayer.EVENT_TOUCH_MOVE)
			.off(InteractiveLayer.EVENT_MOUSE_MOVE);
	}

	var _onStartTimeout = function(e) {

		_clearIsStartedTimeout.apply(this);

		var _moveEvent = (e.type.toLowerCase().indexOf(InteractiveLayer.EVENT_IS_TOUCH) > -1)
						? InteractiveLayer.EVENT_TOUCH_MOVE
						: InteractiveLayer.EVENT_MOUSE_MOVE;
		_options.element.on(_getMoveEvent.apply(this, [e]), $.proxy(_onMove, this));

		_isStarted.apply(this, [e]);
	}


	var _getMoveEvent = function(e) {

		return (e.type.toLowerCase().indexOf(_options.EVENT_IS_TOUCH) > -1)
					? _options.EVENT_TOUCH_MOVE
					: _options.EVENT_MOUSE_MOVE;
	}

	var _hasMoved = false;

	var _onMove = function(e) {

		_stopEvent.apply(this, [e]);

		_hasMoved = true;

		_isMoving.apply(this, [e]);
	}


	var _onStop = function(e) {

		_stopEvent.apply(this, [e]);
		_clearIsStartedTimeout.apply(this);

		_options.element
			.on(InteractiveLayer.EVENT_START, $.proxy(_onStart, this))
			.off(InteractiveLayer.EVENT_TOUCH_MOVE)
			.off(InteractiveLayer.EVENT_MOUSE_MOVE)
			.off(InteractiveLayer.EVENT_STOP);


		// current target is used for 'click' handler
		// not use anymore
		e.currentTarget = MouseHelper.getCurrentTarget(e);
		//


		// click
		_duration = (new Date((new Date()).getTime() - _duration)).getTime();
		if(_duration < _options.durationClick) {

			// target is in the container
			// OR target is part of the container(s)
			if(!_hasMoved && (_options.element.find(e.target).length > 0 || _options.element.filter($(e.target)).length > 0)) {

				_isClicked.apply(this, [e, _duration]);
				
				_duration = -1;
			}

			// stop
			else {

				if(!_started) {

					_isStarted.apply(this, [e]);
				}

				_isStopped.apply(this, [e]);
			}
		}

		// stop
		else {

			_isStopped.apply(this, [e]);
		}

		_started = false;
	}


	// interactions

	var _isStarted = function(e) {

		_setCoordonates.apply(this, [e]);

		_options.onStart(e, _x, _y);
	}


	var _isMoving = function(e) {

		_setCoordonates.apply(this, [e]);
		
		_options.onMove(e, _x, _y);
	}


	var _isStopped = function(e) {

		_setCoordonates.apply(this, [e]);
		
		_options.onStop(e, _x, _y);
	}

	var _isClicked = function(e, duration) {

		_setCoordonates.apply(this, [e]);
		
		_options.onClick(e, _x, _y);
	}


	// coordonates

	var _x = -1;
	var _y = -1;

	var _setCoordonates = function(e) {

		var _elementOffset = _options.element.offset();

        _x = (MouseHelper.getX(e) - _elementOffset.left);
        _y = (MouseHelper.getY(e) - _elementOffset.top);
	}


	// constants

	InteractiveLayer.EVENT_IS_TOUCH		= "touch";

	InteractiveLayer.EVENT_START		= "touchstart mousedown";
	InteractiveLayer.EVENT_STOP			= "touchend mouseup mouseleave";

	InteractiveLayer.EVENT_TOUCH_MOVE	= "touchmove";
	InteractiveLayer.EVENT_MOUSE_MOVE	= "mousemove";


	InteractiveLayer.DURATION_CLICK		= 150;	// in ms


	return InteractiveLayer;
})();
