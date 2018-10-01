function Cell(i, j, w) {
	this.i = i;
	this.j = j;
	this.x = i*w;
	this.y = j*w;
	this.w = w;
	this.neighborCount = 0;
	this.mine = false;
	this.revealed = false;
}

/**
 * Draws the cell square.
 * If the cell is revealed
 * it also draws its content
 */
Cell.prototype.show = function() {
	stroke(0);
	noFill();
	rect(this.x, this.y, this.w, this.w);
	if (this.revealed) {
		if (this.mine) {
			fill(127)
			ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
		} else {
			fill(200);
			rect(this.x , this.y , this.w, this.w);
			if (this.neighborCount > 0){
				textAlign(CENTER);
				fill(0);
				text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w * 0.75);
			}
		}
	}
}

/**
 * Check if the click is between a 
 * cell borders
 */
Cell.prototype.contains = function(x, y) {
	return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

/**
 * Reveal cell content
 */
Cell.prototype.reveal = function() {
	this.revealed = true;
	if (this.neighborCount === 0) {
		this.floodFill();
	}
}

Cell.prototype.floodFill = function() {
	for (var i = this.i - 1; i <= this.i + 1; i++) {
		for (var j = this.j - 1; j <= this.j + 1; j++) {
			if (i >= 0 && j >= 0 && i < cols && j < rows){
				var neighbor = grid[i][j];
				if (!neighbor.mine && !neighbor.revealed){
					neighbor.reveal();
				}
			}
		}
	}
}

/**
 * Count how many mines each cell has
 * around
 */
Cell.prototype.countMines = function() {
	if (this.mine){
		this.neighborCount = -1;
	}
	var total = 0;

	for (var xoff = -1; xoff <= 1; xoff++){
		for (var yoff = -1; yoff <= 1; yoff++){
			var i = this.i + xoff;
			var j = this.j + yoff;
			if (i > -1 && i < cols && j > -1 && j < rows) {
				var neighbor = grid[i][j];
				if (neighbor.mine){
					total++;
				}
			}
		}
	}

	this.neighborCount = total;
}