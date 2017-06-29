function Point() {
	this.x = grid[Math.floor(random(4))];
	this.y = Math.floor(random(-2000, -200));
	this.diameter = config.point.diameter;
	this.velocity = config.point.velocity;
	this.color = "#FC6042"

	this.move = function() {
		this.y += this.velocity;
		if(this.y >= height + random(100)) {
			this.reset();
		}
	}

	/* Resets 
		- X coordinate to one of the four grids
		- Y coordinate in the range (-1000, -100)
	*/
	this.reset = function() {
		this.x = grid[Math.floor(random(4))];
		this.y = Math.floor(random(-1000, -100));
	}

	this.show = function() {
		this.move();
		stroke(200);
		strokeWeight(3);
		fill(this.color);
		ellipse(this.x, this.y, this.diameter, this.diameter);
	}
}