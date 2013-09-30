
//////////////////////////////////////////////////////////////////////////////////////////
// NAVIGATOR
//////////////////////////////////////////////////////////////////////////////////////////

function Navigator() {

	// nothing
}


Navigator.HASH = "#";
Navigator.SLASH = "/";


// url

Navigator.getBaseURL = function() {

	var _href = document.location.href;
	_href = _href.replace(Navigator.SLASH + Navigator.HASH + Navigator.SLASH, "");		// /#/
	_href = _href.replace(Navigator.HASH + Navigator.SLASH, "");						// #/
	_href = _href.replace(Navigator.HASH, "");											// #
	_href = _href.replace(window.location.hash, "");
	
	return _href;

	// return document.location.href.replace(window.location.hash, "");
}

Navigator.getURLAfterHost = function() {

	var _hrefSplit = document.location.href.split(document.location.host);
	return _hrefSplit[_hrefSplit.length - 1];
}

Navigator.getURL = function() {

	return document.location.href;
}

Navigator.setHash = function(value) {

	window.location.hash = value;
}

Navigator.getHash = function() {
	
	var _hash = window.location.hash;

	// remove #
	var _hashIndex = _hash.indexOf(Navigator.HASH);
	if(_hashIndex == 0) {

		_hash = _hash.substring(1);
	}

	// remove the first(s) /
	var _counter = 0;
	for (var c in _hash) {

		if(_hash[c] == Navigator.SLASH) {

			_counter++;
		}
		else {

			break;
		}
	}

	// clean hash
	return _hash.substring(_counter);
}


// language

Navigator.getLanguage = function(fromDocument) {

	// including html document?
	if(fromDocument) {

		return document.documentElement.lang || Navigator.getLanguage();
	}

	// languages priority:
	// 1. user
	// 2. navigator
	// 3. system
	// 4. browser for IE 5.5 or above
	return navigator.userLanguage || navigator.language || navigator.systemLanguage || navigator.browserLanguage;
}


// online

Navigator.onLine = function() {

	return navigator.onLine;
}


// pixel ratio

Navigator.devicePixelRatio = (window.devicePixelRatio === undefined) ? 1 : window.devicePixelRatio;


// WebSocket

Navigator.supportsWebSocket = function() {

	return window.WebSocket;
}


// touch events

Navigator.supportsTouch = function() {

	return ('ontouchstart' in document.documentElement);
}


// canvas
// type is: 2d || 3d

Navigator.supportsCanvas = function(type) {

	var _elem = document.createElement("canvas");
	return !!(_elem.getContext && _elem.getContext(type || "2d"));
}


// template

Navigator.supportsTemplate = function() {

	return 'content' in document.createElement('template');
}


// custom elements

Navigator.supportsCustomElements = function() {

	return 'register' in document;
}


// file API

Navigator.supportsFileAPI = function() {

	return window.File && window.FileReader;
}


// match media

Navigator.supportsMatchMedia = function(query) {

	if(window.matchMedia && window.matchMedia(query).addListener) {

		return window.matchMedia(query);
	}

	if(window.msMatchMedia && window.msMatchMedia(query).addListener) {

		return window.msMatchMedia(query);
	}
	
	return null;
}


// user agent

Navigator.userAgent = navigator.userAgent;
Navigator.userAgentToLowerCase = Navigator.userAgent.toLowerCase();


//OS

Navigator.isBlackBerry = (/BlackBerry/i.test(Navigator.userAgentToLowerCase) || /BB10/i.test(Navigator.userAgentToLowerCase) || /PlayBook/i.test(Navigator.userAgentToLowerCase));

Navigator.isWindows = /Win/i.test(Navigator.userAgentToLowerCase);
Navigator.isWindowsMobile = /Windows Phone/i.test(Navigator.userAgentToLowerCase);

Navigator.isIOS = /ipad|iphone|ipod/i.test(Navigator.userAgentToLowerCase);
Navigator.isIOSAudio = function() {

	var _audio = document.createElement("audio");
	_audio.volume = 0.5;
	
    return (_audio.volume === 1);
}
Navigator.iOSVersion = (Navigator.isIOS && navigator.appVersion) ? (function() {

	var _v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
    var _version = [parseInt(_v[1], 10), parseInt(_v[2], 10), parseInt(_v[3] || 0, 10)];

	return ((_version[0] + _version[1] / 10) >= 4.3);
}) : -1;

Navigator.isMacOS = (/Mac/i.test(Navigator.userAgentToLowerCase) && !Navigator.isIOS);

Navigator.isAndroid = /Android/i.test(Navigator.userAgentToLowerCase);
Navigator.isAndroid1 = /Android 1./i.test(Navigator.userAgentToLowerCase);
Navigator.isAndroid2 = /Android 2./i.test(Navigator.userAgentToLowerCase);
Navigator.isAndroid3 = /Android 3./i.test(Navigator.userAgentToLowerCase);

Navigator.isLinux = (/Linux/i.test(Navigator.userAgentToLowerCase) && !Navigator.isAndroid);

Navigator.isKindle = (/Kindle/i.test(Navigator.userAgentToLowerCase) || /Silk/i.test(Navigator.userAgentToLowerCase));

Navigator.isSamsungS3 = (/GT-I9300/i.test(Navigator.userAgentToLowerCase)
							|| /SHV-E210K/i.test(Navigator.userAgentToLowerCase)
							|| /SGH-T999/i.test(Navigator.userAgentToLowerCase)
							|| /SGH-I747/i.test(Navigator.userAgentToLowerCase)
							|| /SGH-N064/i.test(Navigator.userAgentToLowerCase)
							|| /SCH-R530/i.test(Navigator.userAgentToLowerCase)
							|| /SCH-I535/i.test(Navigator.userAgentToLowerCase)
							|| /SPH-L710/i.test(Navigator.userAgentToLowerCase)
							|| /GT-I9305/i.test(Navigator.userAgentToLowerCase)
							|| /GT-I9308/i.test(Navigator.userAgentToLowerCase)
							|| (Navigator.userAgentToLowerCase.indexOf("samsung") > -1 && Navigator.userAgentToLowerCase.indexOf("s3") > -1));


// browser

Navigator.isMSIE = /MSIE/i.test(Navigator.userAgentToLowerCase);
Navigator.isMSIEMobile = (/IEMobile/i.test(Navigator.userAgentToLowerCase) || (Navigator.isMSIE && Navigator.isWindowsMobile));

Navigator.isChrome = (Navigator.userAgentToLowerCase.indexOf("chrome") > -1);

Navigator.isFirefox = (Navigator.userAgentToLowerCase.indexOf("mozilla") > -1);

Navigator.isOpera = (Navigator.userAgentToLowerCase.indexOf("opera") > -1);


// mobile
// $.browser for jQuery < 1.9

Navigator.isMobile = (($.browser && $.browser.mobile) || Navigator.isBlackBerry || Navigator.isWindowsMobile || Navigator.isIOS || Navigator.isKindle || Navigator.isSamsungS3);
