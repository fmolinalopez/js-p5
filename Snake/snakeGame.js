var snake;
var scl = 20;
var food;
var lastKeyPressed;

function setup() {
	createCanvas(600, 600);
	frameRate(15);
	snake = new Snake();
	pickFoodLocation();
}

function pickFoodLocation() {
	var cols = floor(width/scl);
	var rows = floor(height/scl);
	food = createVector(floor(random(cols)), floor(random(rows))).mult(scl);
}

function draw() {
	background(51);

	if (snake.eat(food)) {
		pickFoodLocation();
	}
	snake.death();
	snake.update();
	snake.show();

	fill(255, 0, 100);
	rect(food.x, food.y, scl, scl);
}


function keyPressed() {
	if (keyCode === UP_ARROW && lastKeyPressed !== DOWN_ARROW) {
		lastKeyPressed = UP_ARROW;
		snake.dir(0, -1);
	} else if (keyCode === DOWN_ARROW && lastKeyPressed !== UP_ARROW) {
		lastKeyPressed = DOWN_ARROW;
		snake.dir(0, 1);
	} else if (keyCode === RIGHT_ARROW && lastKeyPressed !== LEFT_ARROW) {
		lastKeyPressed = RIGHT_ARROW;
		snake.dir(1, 0);
	} else if (keyCode === LEFT_ARROW && lastKeyPressed !== RIGHT_ARROW) {
		lastKeyPressed = LEFT_ARROW;
		snake.dir(-1, 0);
	}
}