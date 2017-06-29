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

	/* ==== Create Armors ==== */
	armor = new Armor();
	
	/* ==== Create points and Bricks ==== */
	for (var i = 0; i < 2; i++) {
		bricks.push(new Brick(i+1));
		points.push(new Point());
		bullets.push(new Bullet(cars[i]));
	}

	/* ==== Display Points ===== */
	displayPoint = createElement("h2");
	displayPoint.position( grid[3], 10)
	displayPoint.style("color", "white");

	/* ==== Display Armor ===== */
	displayArmor = createElement("h3");
	displayArmor.position( grid[3] - 10, 100)
	displayArmor.style("color", "white");

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
	displayArmor.html("<span class='glyphicon glyphicon-screenshot'></span> " + bulletCount);

	/* ===== Track Lanes ===== */
	strokeWeight(5);
	stroke(126);
	line(width/2, height, width/2, 0)
	strokeWeight(1);
	line(width/4, height, width/4, 0)
	line(width - width/4, height, width - width/4, 0)

	armor.show();

	/* ===== CARS ===== */
	noStroke();
	cars.forEach(function(car) {
	    car.update();
	    car.eatPoint(points);
	    car.eatBrick(bricks);
	    car.eatArmor(armor);
	});


	/* ===== POINTS ===== */
	points.forEach((point)=> {
		point.show();
	});

	/* ===== Bricks ===== */
	bricks.forEach((brick)=> {
		brick.show();
	});

	/* ===== Bullets ===== */
	bullets.forEach((bullet)=> {
		bullet.fire();
		bullet.eat(bricks);
	}); 
}

function keyPressed() {
	if (keyCode === LEFT_ARROW)
		cars[0].move();
	if (keyCode === RIGHT_ARROW)
		cars[1].move();
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
		if(bulletCount > 0 && !Gameover &&!pause) {
			gun.play();
			bullets[0].x = cars[0].x;
			bullets[0].command = true;
		} else {
			nobullet.play();
		}
	}
	if (key === 'd') {
		if(bulletCount > 0 && !Gameover &&!pause) {
			gun.play();
			bullets[1].x = cars[1].x;
			bullets[1].command = true;
		} else {
			nobullet.play();
		}
	}
}

function increaseSpeed() {
	if (Gameover == false && pause == false) {
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
	Gameover = true;
	armor.visible = false;
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

	for (var i = 0; i < points.length; i++) {
		points[i].velocity = 0;
		bricks[i].velocity = 0;
	}
}

function restart() {
	Gameover = false;
	life = config.life;
	bulletCount = config.bullet
	userPoint = 0;

	if(gameoverText)
		gameoverText.html("");
	for (var i = 0; i < points.length; i++) {
		points[i].velocity = 5;
		points[i].y = Math.floor(random(-2000, -200));
		points[i].x = grid[Math.floor(random(4))];
		bricks[i].velocity = 5;
		bricks[i].y = Math.floor(random(-2000, -200));
		bricks[i].x = grid[Math.floor(random(4))];
		bullets[i].command = false;
	}

	if(pause)
		Pause();
}

function Pause() {
	if(!Gameover) {
		if(!pause) {
			tempSpeed = points[0].velocity;
			for (var i = 0; i < points.length; i++) {
				points[i].velocity = 0;
				bricks[i].velocity = 0;
				armor.velocity = 0;
			}
			pause = true;
	
			/* ==== Display Pause ===== */
			pauseText = createElement("h1");
			pauseText.position(grid[1], height/2);
			pauseText.html("PAUSED")
			pauseText.style("color","white");
		} else {
			for (var i = 0; i < points.length; i++) {
				points[i].velocity = tempSpeed;
				bricks[i].velocity = tempSpeed;
			}
			armor.velocity = 15;
			pause = false;
			pauseText.remove();
		}
	}
}

function storeUsername() {
	playerName = userNameField.value()
	if(playerName != "")
		showName.html("Player : " + playerName);
}