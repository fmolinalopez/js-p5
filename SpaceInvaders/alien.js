function Alien(x, y) {
	this.x = x;
	this.y = y;
	this.r = 25;

	this.show = function() {
		fill(0, 255, 102);
		rect(this.x-25, this.y, 50, 10);
		rect(this.x-15, this.y+20, 30, 10);
		ellipse(this.x, this.y, this.r*2, this.r*2);
	}
}