function Point(code) {
	Element.call(this);
	this.diameter = config.point.diameter;
	this.velocity = config.point.velocity;
	this.color = "#FC6042";
	this.code = code;
	this.type = points

	/* Resets 
		- X coordinate to one of the four grids
		- Y coordinate in the range (-1000, -100)
	*/
	this.reset = function() {
		this.x = grid[Math.floor(random(4))];
		this.y = Math.floor(random(-800, -config.minGap));
		this.avoidOverlap();
	}
}