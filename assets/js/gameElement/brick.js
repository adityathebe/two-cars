function Brick(code) {
	Element.call(this);
	this.diameter = config.brick.diameter;
	this.velocity = config.brick.velocity;
	this.color = "#34495e";
	this.code = code;
	this.type = bricks;

	/* 	===== Resets =====
		- X coordinate to one of the four grids
		- Y coordinate in the range (-1000, -100)
		===================== */
	this.reset = function() {
		this.x = grid[Math.floor(random(4))];
		this.y = Math.floor(random(-800, -config.minGap));
		this.avoidOverlap();
	}
}