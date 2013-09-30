
com.losrebellos.Point = (function() {

    // constructor

    function Point(x, y) {

        this.x = x || 0;
        this.y = y || 0;
    }


    // equals

    Point.prototype.equals = function(point) {
    
        if(!point) {
        
            point = Point.ORIGIN.clone();
        }

        return (this.x == point.x && this.y == point.y);
    }
    
    
    // distance
    
    Point.prototype.getDistance = function(point) {
    
        if(!point) {
        
            point = Point.ORIGIN.clone();
        }
        
        var _deltaX = this.x - point.x;
        var _deltaY = this.y - point.y;
        
        return Math.sqrt(_deltaY * _deltaY + _deltaX * _deltaX);
    }
    
    
    // angle
    
    Point.prototype.getAngle = function(point) {
    
        if(!point) {
        
            point = Point.ORIGIN.clone();
        }
        
        var _deltaX = this.x - point.x;
        var _deltaY = this.y - point.y;
        
        return Math.atan2(_deltaY, _deltaX);
    }
    
    
    // mid-point
    
    Point.prototype.getMidPoint = function(point, amount) {
    
        if(!point) {
        
            point = Point.ORIGIN.clone();
        }
        
        if(!amount && amount != 0) {
        
            amount = .5;
        }
        
        return new Point(this.x + (point.x - this.x) * amount, this.y + (point.y - this.y) * amount);
    }
    
    
    // utils
    
    Point.prototype.clone = function() {
    
        return new Point(this.x, this.y);
    }

    Point.prototype.getCoordonates = function() {

        return { x: this.x, y: this.y };
    }


    // constants

    Point.ORIGIN = new Point();


    return Point;
})();
