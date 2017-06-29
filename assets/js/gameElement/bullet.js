function Bullet(car) {
	this.x = car.x;
	this.y = car.y;
	this.velocity = 40;
	this.command = false;

	this.fire = function() {		
		if(bulletCount > 0) {
			if(this.command) {
				this.y -= this.velocity;
				ellipse(this.x, this.y, 10,10)
				if(this.y < 0) {
					this.command = false;
					this.y = car.y;
					bulletCount--;
				}
			}
		}
	}

	this.eat = function(foods) {
		if(this.command) {
			foods.forEach((food) => {
				if(dist(this.x, this.y, food.x, food.y) < food.diameter) {
					food.reset();
					bulletCount--;
					this.y = car.y;
					userPoint++;
					this.command = false;
				}
			})
		}
	}
}