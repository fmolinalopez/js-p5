var grid;
var cols;
var rows;
var w = 20;

var totalMines = 15;

/**
 * Create a 2D array for game cells
 */
function make2dArray(cols, rows) {
	var arr = new Array(cols);

	for (var i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}

	return arr;
}

function setup() {
	// Create game canvas
	createCanvas(201, 201);
	cols = floor(width / w);
	rows = floor(height / w);
	grid = make2dArray(cols, rows);
	// Initialize each array position 
	// as a Cell
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j] = new Cell(i, j, w); 
		}
	}

	// Array with all possible options for a mine.
	var options = [];
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			options.push([i,j]);
		}
	}

	// Pick totalMines spots
	for (var n = 0; n < totalMines; n++) {
		var index = floor(random(options.length));
		var choice = options[index];
		var i = choice[0];
		var j = choice[1];
		// Deletes that spot so it's no longer an option.
		options.splice(index, 1);
		grid[i][j].mine = true;
	}

	// Count all placed mines in the game field.
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].countMines();
		}
	}
}

/**
 * Draw the cells
 */
function draw() {
	background(255);
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].show()
		}
	}
}

/**
 * Reveals the cell that receives click
 */
function mousePressed() {
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			if (grid[i][j].contains(mouseX, mouseY)){
				grid[i][j].reveal();

				// If a mine is pressed
				// every Cell is revealed
				if (grid[i][j].mine) {
					revealAll();
				}
			}
		}
	}	
}

function revealAll() {
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].revealed = true;
		}
	}
}