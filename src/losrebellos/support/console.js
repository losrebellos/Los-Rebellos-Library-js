
/*
 * avoid 'console' errors in browsers that lack a console.
 */

(function() {

    var METHODS = [

        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
        
    ];

    var _method;
    var _noop = function () {};
    var _length = METHODS.length;
    var _console = (window.console = window.console || {});

    while(_length--) {

        _method = METHODS[_length];

        // only stub undefined methods.
        if(!_console[_method]) {

            _console[_method] = _noop;

        }

    }

}());
