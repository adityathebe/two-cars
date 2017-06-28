function Bullet(car) {
	this.x = car.x;
	this.y = car.y;
	this.velocity = 15;
	this.command = false;

	this.fire = function() {		
		if(this.command) {
			this.y -= this.velocity;
			ellipse(this.x, this.y, 10,10)
			console.log(this.y)
			if(this.y < 0) {
				this.command = false;
				this.x = car.x;
				this.y = car.y;
			}
		}
	}
}