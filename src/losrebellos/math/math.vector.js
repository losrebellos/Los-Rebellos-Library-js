
losrebellos.Vector = (function() {

	this.point1 = null;
	this.point2 = null;


    // constructor

	function Vector() {

		if(!arguments || arguments.length === 0) {

			this.point1 = new com.losrebellos.Point();
			this.point2 = new com.losrebellos.Point();

		}
		else if(arguments.length === 1) {

			this.point1 = new com.losrebellos.Point();
			this.point2 = arguments[0];

		}
		else {

			this.point1 = arguments[0];
			this.point2 = arguments[1];

		}

	}


    // equals

    Vector.prototype.equals = function(vector) {
    
        if(!vector) {

        	return;

        }

        return (this.point1.equals(vector.point1) && this.point2.equals(vector.point2));

    }
    
    
    // length
    
    Vector.prototype.getLength = function() {
        
        return this.point1.getDistance(this.point2);

    }
    
    
    // angle
    
    Vector.prototype.getAngle = function() {
        
        return this.point1.getAngle(this.point2);

    }
    
    
    // mid-point
    
    Vector.prototype.getMidPoint = function(amount) {
        
        return this.point1.getMidPoint(this.point2, amount);

    }


    // delta

    Vector.prototype.getDeltaX = function() {

    	return this.point2.x - this.point1.x;

    }

    Vector.prototype.getDeltaY = function() {

    	return this.point2.y - this.point1.y;

    }


    // translate

    Vector.prototype.translate = function(vector) {

    	this.point1.x += vector.getDeltaX();
    	this.point1.y += vector.getDeltaY();
    	
    	this.point2.x += vector.getDeltaX();
    	this.point2.y += vector.getDeltaY();

    }
    
    
    // utils
    
    Vector.prototype.clone = function() {
    
        return new Vector(this.point1.clone(), this.point2.clone());

    }


	return Vector;

})();