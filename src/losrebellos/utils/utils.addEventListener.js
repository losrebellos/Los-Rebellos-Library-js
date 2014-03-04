
/*
 * add context to addEventListener
 */

(function() {

    var _addEventListener = Element.prototype.addEventListener;

    Element.prototype.addEventListener = function(type, listener, context, useCapture, wantsUntrusted) {

    	var callback = listener;

    	if(context) {

    		callback = function(e) {

	        	listener.apply(context, [e]);

	        }

    	}

        return _addEventListener.call(this, type, callback, useCapture, wantsUntrusted);  
    };

}());
