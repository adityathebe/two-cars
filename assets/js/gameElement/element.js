/*=== Parent Object from which brick, ammo and points derive === */

function Element() {
	this.x = grid[Math.floor(random(4))];
	this.y = Math.floor(random(-1000, -200));

	this.move = function() {
		this.y += this.velocity;
		if(this.y >= height + random(100)) {
			this.reset();
		}
	}

	this.show = function() {
		this.move();
		stroke(200);
		strokeWeight(3);
		fill(this.color);
		ellipse(this.x, this.y, this.diameter, this.diameter);
	}

	/* ===== Maintain minimum brick gap and avoid same lane ===== */
	this.avoidOverlap = function() {
		for (var i = 0; i < this.type.length; i++) {
			if(i == (this.code-1))
				continue;

			var temp = abs(this.y - this.type[i].y)
			if (this.x == this.type[i].x)
				this.reset();

			if(temp <= config.minGap) {
				this.reset();
				break;
			}
		}
	}
}