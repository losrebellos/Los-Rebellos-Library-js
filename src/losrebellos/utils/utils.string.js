
// capitalize first letter only

String.prototype.capitaliseFirstLetter = function() {

	return this.charAt(0).toUpperCase() + this.toLowerCase().slice(1);
}
