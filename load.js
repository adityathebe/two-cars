var gameTrack, no, fcuk, carImg, gun, nobullet;
var config;
function preload() {
	/* === CONFIG FILE === */
	config = loadJSON('config.json');

	/* === Sounds === */
	gameTrack = loadSound("assets/sound/maintrack.mp3");
	gun = loadSound("assets/sound/gun.ogg");
	no = loadSound("assets/sound/no.ogg");
	fcuk = loadSound("assets/sound/fcuk.ogg")
	nobullet = loadSound("assets/sound/nobullet.ogg");

	/* === Images === */
	// carImg = loadImage("assets/img/carA.png");
}