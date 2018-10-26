var cirPath = [];
var triPath = [];
var spacing = 10;
let theta = 0;

function polartToCartesian(r, angle) {
	return createVector(r * cos(angle), r*sin(angle));
}

function setup() {
	createCanvas(400, 400);
	angleMode(DEGREES);
	var radius = 100;
	var startA = 0;
	var endA = 120;
	var startV = polartToCartesian(radius, startA);
	var endV = polartToCartesian(radius, endA);

	for (var a = startA; a <= 360; a+=spacing) {
		var cv = polartToCartesian(radius, a);
		cirPath.push(cv);
		let amt = (a % 120) / (endA-startA); 
		let tv = p5.Vector.lerp(startV, endV, amt);
		triPath.push(tv);

		if ((a+spacing) % 120 === 0) {
			startA += 120;
			endA += 120;

			startV = polartToCartesian(radius, startA);
			endV = polartToCartesian(radius, endA);
		}
	}
}

function draw() {
	background(220);
	translate(width/2, height/2);
	rotate(30);
	stroke(0);
	strokeWeight(4);
	noFill();
	let amt = (sin(theta)+1) / 2;
	theta += 3;
	beginShape();
	for (var i = 0; i < cirPath.length; i++) {
		var cv = cirPath[i];
		var tv = triPath[i];
		var x = lerp(cv.x, tv.x, amt);
		var y = lerp(cv.y, tv.y, amt);
		vertex(x, y);
	}
	endShape();
}