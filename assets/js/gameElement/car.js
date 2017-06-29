function Car(x, num) {
	this.x = x;
	this.y = (height - width/8);	
	this.state = true;		/* True : Move Left, False : Move Right */
	this.diameter = 0.5 * (width/4);
	this.color = "#00AAC1";
	this.carNum = num;	/* To Keep track of car */

	this.update = function(){
		fill(this.color);
		strokeWeight(4);
		stroke(255);
		// image(carImg,this.x,this.y,this.diameter,this.diameter);
		ellipse(this.x,this.y,this.diameter,this.diameter)
	}

	this.eatPoint = function(points) {
		points.forEach((point)=> {
			if (this.x == point.x) {
				if(Math.abs(this.y-point.y) <= point.diameter) {
					point.reset();
					var sound_opt = random(0,10);
					userPoint++;
					if(userPoint % 15 ==0)
						increaseSpeed();
				}
			}
		});		
	}

	this.eatBrick = function(bricks) {
		bricks.forEach((brick)=> {
			if (this.x == brick.x) {
				if(Math.abs(this.y-brick.y) <= brick.diameter) {
					brick.reset();
					var sound_opt = random(0,10);
					if( sound_opt <= 5)
						no.play();
					else 
						fcuk.play();
					life--;
					/* ===== Check Game Over ==== */
					if(life == 0)
						gameover();
				}
			}
		})		
	}

	this.eatArmor = function(armor) {
		if (this.x == armor.x) {
			if(Math.abs(this.y-armor.y) <= armor.diameter) {
				armor.reset();
				bulletCount++;
			}
		}
	}

	this.move = function() {
		if(this.carNum == 1) {
			if (this.state) {
				this.x = grid[0]
				this.state = false;
			} else {
				this.x = grid[1];
				this.state = true;
			}
		} else {
			if (this.state) {
				this.x = grid[2]
				this.state = false;
			} else {
				this.x = grid[3];
				this.state = true;
			}
		}
		
	}
}