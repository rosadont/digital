var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('background','assets/sprites/background.jpg');
    game.load.image('player','assets/sprites/man.png');
	game.load.audio('music', 'assets/audio/Axwell - Ingrosso - We Come We Rave We Love (Dex Morrison Remix).mp3');
	//game.load.image('ball', 'assets/sprites/pencil.png');
	game.load.image('ball', 'assets/sprites/pencilsheet.png');
}

var player;
var cursors;
var music;
var ball;

function create() {

    game.world.setBounds(0, 0, 3400, 1000);
    game.add.tileSprite(0, 0, 3400, 1000, 'background');
	
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

/*     //add pencils
    var bmd = game.add.bitmapData(200, 200);
    game.cache.addBitmapData('ball', bmd);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    createBox();
    game.time.events.repeat(Phaser.Timer.SECOND, 20, createBox, this);
    game.input.onDown.add(updateBitmapDataTexture, this); */
	
	//add pencils
	balls = game.add.group();
	//game.physics.arcade.gravity.y = 400;
	game.physics.arcade.enable(game.world, true);
}

function createBox() {

	var sprite = game.add.sprite(game.world.randomX, game.world.randomY, game.cache.getBitmapData('ball'));
    game.physics.arcade.enable(sprite);
    sprite.body.collideWorldBounds = true;
    sprite.body.bounce.set(1);
	sprite.body.velocity.x = game.rnd.realInRange(-200, 200);
	sprite.body.velocity.y = game.rnd.realInRange(-200, 200);

}

function updateBitmapDataTexture() {

	//	Get the bitmapData from the cache. This returns a reference to the original object
	var bmd = game.cache.getBitmapData('ball');
    //	All sprites using this texture will update at the next render
    bmd.dirty = true;

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
	balls.forEachAlive(checkBounds, this);
}

function checkBounds(ball) {

    if (ball.y > 600)
    {
        ball.kill();
    }

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