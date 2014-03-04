
// Console

function Console(args) {

    try {

        Console.log.apply(Console.scope, Array.prototype.slice.call(arguments));
    }
    catch(e) {

        // nothing
    }
}


Console.debug = true;

Console.scope = (window && window.console) ? window.console : null;
Console.method = Console.scope ? Console.scope.log : null;

Console.log = function(args) {

	if(Console.debug && Console.scope && Console.method) {

		try {

    		Console.method.apply(Console.scope, Array.prototype.slice.call(arguments));
		}
		catch(e) {

			Console.method(args);
		}
	}

	return args;
}
