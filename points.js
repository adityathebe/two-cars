function Point() {
	this.diameter = 30;
	this.velocity = 4;
	this.y = Math.floor(random(-2000, -200));
	this.x = grid[Math.floor(random(4))];

	this.move = function() {
		this.y += this.velocity;
		if(this.y >= height + random(100)) {
			this.reset();
		}
	}

	this.reset = function() {
		this.y = Math.floor(random(-1000, -100));
		this.x = grid[Math.floor(random(4))];
	}

	this.show = function() {
		this.move();
		stroke(200);
		strokeWeight(3);
		fill('#FC6042');
		ellipse(this.x, this.y, this.diameter, this.diameter);
	}
}