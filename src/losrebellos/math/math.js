
// constants

Math.GOLDEN_RATIO = 1.61803398875;


// lerp

Math.lerp = function(a, b, amt) {

	return a + (b - a) * amt;
}


// clamp

Math.clamp = function(value, min, max) {
    
    return (value > max)
            ? max
            : (value < min)
                ? min
                : value;
}


// random

Math.randomReal = function(min, max) {

	if(min > max) {

		return Math.randomReal(max, min);
	}

	return Math.random() * (max - min) + min;
}

Math.randomInteger = function(min, max) {

	if(min > max) {

		return Math.randomInteger(max, min);
	}

	return Math.floor(Math.random() * (max - min + 1) + min);
}
