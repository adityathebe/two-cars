function Ammo() {
	Element.call(this);
	this.diameter = config.ammo.diameter;
	this.velocity = config.ammo.velocity;
	this.color = '#ebebeb'
	this.visible = false;

	this.genAmmo = function() {
		var temp = Math.floor(random(1,1000));
		if( temp == 10) {
			this.visible = true;
		}
	}

	this.reset = function() {
		this.x = grid[Math.floor(random(4))];
		this.y = Math.floor(random(-1000, -config.minGap));
		this.visible = false;
	}

	this.show = function() {
		stroke(200);
		strokeWeight(3);
		fill(this.color);
		ellipse(this.x, this.y, this.diameter, this.diameter);
		
		if(!pause)
			this.velocity = bricks[0].velocity + 0.3 *(bricks[0].velocity);
		if(this.visible) {
			this.move();
		} else {
			if(!GameoverStatus)
				this.genAmmo();
		}
	}
}