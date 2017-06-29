/* 
* TWO CARS
*
* Recreation of "Two Cars" - Mobile Game
*
* @Author : Aditya Thebe
* @Created ON : 27th June, 2017
* @Link : www.adityathebe.com
* @copyright : OpenSource
*
*/

function setup() {
	/* === Inital Configuration === */
	life = config.life;
	bulletCount = config.bullet

	/* === SETUP === */
	frameRate(60)
	var canvas = createCanvas(350, 600);
	canvas.parent("canvas")
	gameTrack.play();
	gameTrack.loop();
	textAlign(CENTER)
	textSize(22);
	textFont("Raleway");

	/* ==== Store Username ===== */
	userNameField = createInput();
	userNameField.attribute("placeholder","Enter your Name");
	userNameField.class("form-control");
	userNameField.parent("input-group");
	showName = createElement("h3");
	showName.parent("Player-Name");

	/* ===== Create Grids ===== */
	for (var i = 0; i < 4; i++) {
		grid.push( i * (width/4) + (width/8) );
	}

	/* ==== Create Cars ==== */
	cars = [new Car(grid[0], 1), new Car(grid[2], 2)];

	/* ==== Create Ammo  ==== */
	ammo = new Ammo();
	
	/* ==== Create points and Bullet ==== */
	for (var i = 0; i < config.point.amount; i++) {
		points.push(new Point(i+1));
		bullets.push(new Bullet(cars[i]));
	}

	/* ==== Create points and Bricks ==== */
	for (var i = 0; i < config.brick.amount; i++) {
		bricks.push(new Brick(i+1));
	}

	/* ==== Display Points ===== */
	displayPoint = createElement("h2");
	displayPoint.position( grid[3], 10)
	displayPoint.style("color", "white");

	/* ==== Display Ammu ===== */
	displayAmmu = createElement("h3");
	displayAmmu.position( grid[3] - 10, 100)
	displayAmmu.style("color", "white");

	/* ==== Display Health ===== */
	displayLife = createElement("h3");
	displayLife.position(grid[3] * 0.95, 70)
	displayLife.style("color", "white");
}

function draw() {
	background(51);
	displayVelocity = text(points[0].velocity + ' m/s', grid[3] , 60)
	displayLife.html( "&hearts;"+ " " + life);
	displayPoint.html(userPoint);
	displayAmmu.html("<span class='glyphicon glyphicon-screenshot'></span> " + bulletCount);

	/* ===== Track Lanes ===== */
	strokeWeight(5);
	stroke(126);
	line(width/2, height, width/2, 0)
	strokeWeight(1);
	line(width/4, height, width/4, 0)
	line(width - width/4, height, width - width/4, 0)
	

	/* ===== CARS ===== */
	cars.forEach(function(car) {
	    car.update();
	    car.eatPoint(points);
	    if(!GODMODE)
	    	car.eatBrick(bricks);
	    car.eatAmmo(ammo);
	});

	/* ===== POINTS ===== */
	points.forEach((point)=> {
		point.show();
	});

	/* ===== Bricks ===== */
	bricks.forEach((brick)=> {
		brick.show();
	});

	/* ===== AMMO ===== */
	ammo.show();

	/* ===== Bullets ===== */
	bullets.forEach((bullet)=> {
		bullet.fire();
		bullet.eat(bricks);
	}); 
}

function keyPressed() {
	if (keyCode === LEFT_ARROW) {
		if(!GameoverStatus && !pause)
			cars[0].move();
	}
	if (keyCode === RIGHT_ARROW){
		if(!GameoverStatus && !pause)
			cars[1].move();
	}
	if (keyCode === UP_ARROW) 
		increaseSpeed();
	if (keyCode === DOWN_ARROW)
		Pause();
	if (keyCode === ENTER)
		storeUsername();
}

function keyTyped() {
	if (key === '1')
		soundtoggle();
	if (key === '2')
		restart();
	if (key === 'a') {
		if(bulletCount > 0 && !GameoverStatus &&!pause) {
			gun.play();
			bullets[0].x = cars[0].x;
			bullets[0].command = true;
		} else {
			nobullet.play();
		}
	}
	if (key === 'd') {
		if(bulletCount > 0 && !GameoverStatus &&!pause) {
			gun.play();
			bullets[1].x = cars[1].x;
			bullets[1].command = true;
		} else {
			nobullet.play();
		}
	}
}

function increaseSpeed() {
	if (GameoverStatus == false && pause == false) {
		points.forEach((point)=> {
			point.velocity++;
		});

		bricks.forEach((brick)=> {
			brick.velocity++;	
		});
	}
}

function soundtoggle() {
	if (sound) {
		gameTrack.setVolume(0);
		gun.setVolume(0);
		nobullet.setVolume(0);
		no.setVolume(0);
		fcuk.setVolume(0);
		sound = false;
	} else {
		gameTrack.setVolume(1);
		gun.setVolume(0.3);
		nobullet.setVolume(0.5);
		no.setVolume(0.5);
		fcuk.setVolume(0.5);
		sound = true;
	}
}

var gameover = function(){
	GameoverStatus = true;
	ammo.visible = false;
	storeUsername();

	/* === Store Data to Firebase === */
	if(playerName != "") {		
		var data = {
			name : playerName,
			point : userPoint,
			speed : points[0].velocity
		}
		ref.push(data);
	}

	gameoverText = createElement("h1");
	gameoverText.position(grid[1]-17, height/2)
	gameoverText.style("color","white");
	gameoverText.html("GAMEOVER");

	/* === Stop Points === */
	points.forEach((point)=> {
		point.velocity = 0;
	})

	/* === Stop Bricks === */
	bricks.forEach((brick)=> {
		brick.velocity = 0;
	})
}

function restart() {
	GameoverStatus = false;
	life = config.life;
	bulletCount = config.bullet;
	userPoint = 0;

	/* If paused then turn pause off */
	if(pause) {
		Pause();
	}

	if(gameoverText)
		gameoverText.html("");

	/* === Reset Points === */
	points.forEach((point)=> {
		point.velocity = config.point.velocity;
		point.reset();
	})

	/* === Reset Bricks === */
	bricks.forEach((brick)=> {
		brick.velocity = config.brick.velocity;
		brick.reset();
	})

	/* === Reset Points === */
	bullets.forEach((bullet)=> {
		bullet.command = false;
	})
}

function Pause() {
	if(!GameoverStatus) {
		if(!pause) {
			pause = true;
			tempSpeed = points[0].velocity;

			/* === Stop Points === */
			points.forEach((point)=> {
				point.velocity = 0;
			})

			/* === Stop Bricks === */
			bricks.forEach((brick)=> {
				brick.velocity = 0;
			})

			/* === Stop Bricks === */
			ammo.velocity = 0;

	
			/* ==== Display Pause ===== */
			pauseText = createElement("h1");
			pauseText.position(grid[1], height/2);
			pauseText.html("PAUSED")
			pauseText.style("color","white");
		} else {
			/* === Rest Points === */
			points.forEach((point)=> {
				point.velocity = tempSpeed;
			})

			/* === Rest Bricks === */
			bricks.forEach((brick)=> {
				brick.velocity = tempSpeed;
			})

			/* === Rest Armor === */
			ammo.velocity = config.ammo.velocity;

			pause = false;
			pauseText.remove();
		}
	}
}

function storeUsername() {
	playerName = userNameField.value()
	if(playerName == "JESUS")
		GODMODE = true;
	else
		GODMODE = false;
	if(playerName != "")
		showName.html("Player : " + playerName);
}