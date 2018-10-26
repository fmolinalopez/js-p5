function Ship() {
	this.x = width/2;

	this.show = function() {
		noStroke();
		fill(255);
		rect(this.x-25, height-30, 50, 10);
		rect(this.x-25, height-20, 20, 10);
		rect(this.x+5, height-20, 20, 10);
		rect(this.x-5, height-40, 10, 10);
	}

	this.move = function(dir) {
		this.x += dir;
	}
}