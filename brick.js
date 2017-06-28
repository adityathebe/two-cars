function Brick(code) {
	this.x = grid[Math.floor(random(4))];
	this.y = Math.floor(random(-500, -300));
	this.velocity = 4;
	this.diameter = 30;
	this.color = "#34495e";
	this.brickCode = code;

	this.move = function() {
		this.y += this.velocity;
		if(this.y >= height + random(100)) {
			this.reset();
		}
	}

	this.reset = function() {
		this.x = grid[Math.floor(random(4))];
		this.y = Math.floor(random(-500, -100));

		/* ===== Check if the bricks are very near ===== */
		if(this.brickCode == 1)
			var temp = abs(this.y - bricks[1].y)
		else
			var temp = abs(this.y - bricks[0].y)
		
		if(temp <= 100) 
			this.reset();
	}

	this.show = function() {
		this.move();
		stroke(200);
		strokeWeight(4);
		fill(this.color);
		ellipse(this.x, this.y, this.diameter, this.diameter);
	}
}