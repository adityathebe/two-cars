function Armor() {
	this.x = grid[Math.floor(random(4))];
	this.y = Math.floor(random(-1000, -100));
	this.diameter = config.armor.diameter;
	this.velocity = 5;
	this.color = '#ebebeb'
	this.visible = false;

	this.genArmor = function() {
		var temp = Math.floor(random(1,1000));
		if( temp == 10) {
			this.visible = true;
		}
	}

	this.move = function() {
		this.y += this.velocity;
		if(this.y >= height + random(100)) {
			this.reset();
		}
		stroke(200);
		strokeWeight(3);
		fill('this.color');
		ellipse(this.x, this.y, this.diameter, this.diameter);
	}

	this.reset = function() {
		this.x = grid[Math.floor(random(4))];
		this.y = Math.floor(random(-1000, -100));
		this.visible = false;
	}

	this.show = function() {
		if(!pause)
			this.velocity = bricks[0].velocity + 0.3 *(bricks[0].velocity);
		if(this.visible) {
			this.move();
		} else {
			if(!Gameover)
				this.genArmor();
		}
	}
}