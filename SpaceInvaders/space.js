var ship;
var aliens = [];
var cols;
var lasers = [];

function setup() {
	createCanvas(600, 400);
	cols = 6
	ship = new Ship();
	for (let i = 0; i < cols; i++) {
		aliens[i] = new Alien(i*80+100, 40);
	}
}

function draw() {
	background(51);
	ship.show();
	for (let i = 0; i < aliens.length; i++) {
		aliens[i].show();
	}

	for (let i = 0; i < lasers.length; i++) {
		lasers[i].show();
		lasers[i].move();
		
		for (let j = 0; j < aliens.length; j++) {
			if(lasers[i].hits(aliens[j])) {
				aliens[j].die();
				lasers[i].remove();
			}
		}

	}
}

function keyPressed() {
	if(key === ' ') {
		var laser = new Laser(ship.x, height-40);
		lasers.push(laser);
	}


	if (keyCode === RIGHT_ARROW) {
		ship.move(10);
	}else if(keyCode === LEFT_ARROW) {
		ship.move(-10);
	}
}