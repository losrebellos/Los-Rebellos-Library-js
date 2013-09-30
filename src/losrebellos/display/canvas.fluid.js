
com.losrebellos.FluidCanvas = (function() {

    // id
    // container

    var _options = options || {};


    // constructor

    function FluidCanvas(options) {

        _options = options || {};
        
        if(!_options.container) {
            
            _options.container = $("body");
        }

        this.update();
    }
        
        
    // canvas
    
    var _canvas = null;

    FluidCanvas.prototype.getContext = function(type) {

        return _canvas[0].getContext(type || FluidCanvas.CONTEXT_2D);
    }
    
    
    // update

    var _previousWidth = -1;

    var _previousHeight = -1;
    
    FluidCanvas.prototype.update = function() {

        var _innerWidth = _options.container.innerWidth();
        var _innerHeight = _options.container.innerHeight();

        if(_previousWidth == _innerWidth && _previousHeight == _innerHeight) {

            return;
        }

        _previousWidth = _innerWidth;
        _previousHeight = _innerHeight;
    
        // old canvas
        if(_canvas) {
        
            _canvas.remove();
        }
        
        // new canvas
        _canvas = $(FluidCanvas.TAG).attr({
            
            id: _options.id,
            width: _innerWidth,
            height: _innerHeight
        });
        _options.container.append(_canvas);
    }
    
    
    // dispose
    
    FluidCanvas.prototype.dispose = function() {

        _options.container.find(FluidCanvas.CANVAS).remove();
    }


    // constants

    FluidCanvas.CANVAS      = "canvas";
    FluidCanvas.TAG         = "<" + FluidCanvas.CANVAS + ">";

    FluidCanvas.CONTEXT_2D  = "2d";
    FluidCanvas.CONTEXT_3D  = "3d";


    return FluidCanvas;
})();
