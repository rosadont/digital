var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('background','assets/sprites/background.jpg');
    game.load.image('player','assets/sprites/man.png');
	game.load.audio('music', 'assets/audio/Axwell - Ingrosso - We Come We Rave We Love (Dex Morrison Remix).mp3');
	game.load.image('bullet', 'assets/sprites/bullet.png');
	game.load.image('ball', 'assets/sprites/pencil.png');
}

var player;
var cursors;
var penicl;
var man;
var stateText;

function create() {

    game.world.setBounds(0, 0, 3400, 1000);
    game.add.tileSprite(0, 0, 3400, 1000, 'background');

    //  This is the BitmapData we're going to be drawing to
    var bmd = game.add.bitmapData(game.width, game.height);
    bmd.addToWorld();
    //  Draw the group
    bmd.drawGroup(group);
	
	//music
    game.stage.backgroundColor = '#182d3b';
    game.input.touch.preventDefault = false;
    music = game.add.audio('music');
    music.play();
    game.input.onDown.add(changeVolume, this);
	
	//bitmapData
	game.physics.startSystem(Phaser.Physics.P2JS);
    player = game.add.sprite(100, 900, 'player');
    game.physics.p2.enable(player);
    cursors = game.input.keyboard.createCursorKeys();
	fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    game.camera.follow(player);

    game.camera.follow(player);
	
	//  Text
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;
	
	//bouncing pencil
    game.physics.arcade.gravity.y = 150;
	game.time.events.repeat(Phaser.Timer.SECOND * 2, 10, createBall, this);

}

function createBall() {

    //  A bouncey ball sprite just to visually see what's going on.
    var ball = game.add.sprite(game.world.randomX, 0, 'ball');
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.body.bounce.y = 0.9;
    ball.body.collideWorldBounds = true;
}

function update() {
	
	//bitmapData
	  player.body.setZeroVelocity();
    if (cursors.up.isDown){
        player.body.moveUp(300)
    }
    else if (cursors.down.isDown){
        player.body.moveDown(300);
    }
    if (cursors.left.isDown){
        player.body.velocity.x = -300;
    }
    else if (cursors.right.isDown){
        player.body.moveRight(300);
    }
	
	game.physics.arcade.overlap(pencil, man, collisionHandler, null, this);
}

function collisionHandler (pencil, man) {

    //  When a bullet hits an alien we kill them both
    pencil.kill();
    man.kill();
}


function collisionHandler (pencil, man) {

    //  When a bullet hits an alien we kill them both
    pencil.kill();
    man.kill();
}

function render() {
	
	//music
	game.debug.soundInfo(music, 20, 32);
}

function changeVolume(pointer) {

    if (pointer.y < 300){
        music.volume += 0.1;
    }
    else{
        music.volume -= 0.1;
    }
}
