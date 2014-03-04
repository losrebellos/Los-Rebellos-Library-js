
(function() {

	var makeSingleton = function(options, instantiate) {

		var _Clazz = this.prototype.constructor;

		if(_Clazz.getInstance) {

			return;

		}
		
		var _options = options || {};


		// overwrite the initialize method
		// so we can check if the enforcer exists

		var _Enforcer = function() {};

		var _initialize = _Clazz.prototype.initialize;

		_Clazz.prototype.initialize = function() {

			if(!arguments || arguments.length === 0 || !(arguments[0] instanceof _Enforcer)) {

				throw new Error('Singleton, shouldn\'t be instantiated.');

			}

			_initialize.apply(this, [_options]);

		}


		// instance

		var _instance = null;

		_Clazz.getInstance = function() {

			if(!_instance) {

				_instance = new _Clazz(new _Enforcer(), _options);

			}

			return _instance;

		}


		// instantiate

		if(instantiate) {

			_Clazz.getInstance();

		}


		// return

		return _Clazz;

	}

	Backbone.Model.makeSingleton = Backbone.Collection.makeSingleton = Backbone.Router.makeSingleton = Backbone.View.makeSingleton = Backbone.History.extend = makeSingleton;

})();