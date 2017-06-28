function Brick() {
	this.diameter = 30;
	this.velocity = 4;
	this.y = Math.floor(random(-1000, -300));
	this.color = "#34495e";
	this.x = grid[Math.floor(random(4))];

	this.move = function() {
		this.y += this.velocity;
		if(this.y >= height + random(100)) {
			this.reset();
		}
	}

	this.reset = function() {
		this.y = Math.floor(random(-500, -100));
		this.x = grid[Math.floor(random(4))];
	}

	this.show = function() {
		this.move();
		stroke(200);
		strokeWeight(4);
		fill(this.color);
		ellipse(this.x, this.y, this.diameter, this.diameter);
	}
}