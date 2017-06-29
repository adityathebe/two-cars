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

/****
	*
	*
	* ===== Global Variables ===== 
	*
	*
	*
****/

// Main Elements
var cars, points = [], bricks = [], bullets = [], armor;

// Screen is divided into 4 grids
var grid = [];

// User Data
var life, userPoint = 0, bulletCount;

// Display data on Canvas
var displayPoint, displayVelocity, displayLife, displayArmor;

// Booleans
var sound = true, pause = false, GameoverStatus = false;

// Display game Status
var pauseText, gameoverText;

// Keep track of CurrentSpeed
var tempSpeed;

// Username input and display
var userNameField, playerName = "", showName;

// Firebase
var firebase, ref;

// Godmode : Avoids brick and unlimited ammo
var GODMODE = false
