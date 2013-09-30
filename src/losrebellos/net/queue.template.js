/*
 *
 * @author Benoit Vinay
 *
 * ben@benoitvinay.com
 * http://www.benoitvinay.com
 *
 */



//////////////////////////////////////////////////////////////////////////////////////////
// QueueTemplate
//
// options is { path: String, scope:this, progress: function, complete: function }
//////////////////////////////////////////////////////////////////////////////////////////
function QueueTemplate(options) {

	// variables

    var _options = options;
    var _queue = undefined;


	// load

	this.load = function(templates) {
        
        this.abort();

        // queue
        _queue = new QueueLoader(_options);

        // loaders
        for (var i in templates) {

            _queue.add(new TextLoader({ url: _options.styles + templates[i] + QueueTemplate.CSS_EXTENSION, type: TextLoader.DATA_TYPE_CSS }));
            _queue.add(new TextLoader({ url: _options.templates + templates[i] + QueueTemplate.TEMPLATE_EXTENSION }));
            _queue.add(new ScriptLoader({ url: _options.scripts + templates[i] + QueueTemplate.SCRIPT_EXTENSION }));
        }

        // load
        _queue.load();
	}


    // abort

    this.abort = function() {

        if(_queue) {

            _queue.abort();
        }
    }
}


// constants

QueueTemplate.CSS_EXTENSION           = ".css";
QueueTemplate.TEMPLATE_EXTENSION      = ".tpl";
QueueTemplate.SCRIPT_EXTENSION        = ".js";
