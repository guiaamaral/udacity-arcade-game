'use strict';
// Create the enemy constructor
var Enemy = function(x,y) {
    this.x = x;
    this.y = y;
    this.multiplier = Math.floor((Math.random() * 5) + 1);
    // Load enemies avatar
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
Enemy.prototype.update = function(dt) {
    this.x += 101 * dt * this.multiplier;

    // If the enemy crash the player, the player loses 1 life and start the game again
    if (this.y == player.y && (this.x > player.x - 20 && this.x < player.x + 20)) {
        player.lifes -= 1;
        player.reset();
    }

    // If the enemy goes off of the board, reset them
    if (this.x > 505) {
        this.reset();
    }
};

// Reset the enemy position
Enemy.prototype.reset = function(dt) {
    this.x = - 200;
    var yVals = [220, 140, 60];
    this.y = yVals[Math.floor((Math.random() * 3))];
    this.multiplier = Math.floor((Math.random() * 5) + 1);

};

// Draw the enemy on screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Create the player constructor
var Player = function(x,y) {
    this.x = x;
    this.y = y;
    // Save initial position
    this.xo = x;
    this.yo = y;
    // Sets initial score
    this.score = 0;
    // Set initial number of lifes
    this.lifes = 3;
    this.highScore = 0;
    // Load player avatar
    this.sprite = 'images/char-boy.png';
};

Player.prototype.handleInput = function(dir) {
    // Move player based on pressed key
    if (dir == 'up') {
        this.y -= 80;
    } else if (dir == 'down') {
        this.y += 80;
    } else if (dir == 'left') {
        this.x -= 101;
    } else if (dir == 'right') {
        this.x += 101;
    }

    // Set the game limits
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 404) {
        this.x = 404;
    } else if (this.y < 0) {
        this.y = -20;
    } else if (this.y > 404) {
        this.y = 380;
    }

};

// Reset the player position
Player.prototype.reset = function() {
    this.x = this.xo;
    this.y = this.yo;

};

// Update the player position
Player.prototype.update = function(dt) {
    this.x = this.x;
    this.y = this.y;

    // Start player with no points and 3 lifes
    if (this.lifes === 0) {
        this.score = 0;
        this.lifes = 3;
    }

    // If cross the enemies win 50 points and if
    // get 1000 points win 1 life
    if (this.y <= 0) {
        this.score += 50;
        if (this.score % 1000 === 0) {
            this.lifes += 1;
        }
        this.reset();
    }

    // Get and set highscore
    if (this.highScore < this.score) {
        this.highScore = this.score;
    }
};

// Draw the player on screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var allEnemies = [];

// Create the separate enemy instances
for (var i = 0; i < 5; i++) {

    // Set a starting x-position based on a random value
    var x = Math.floor((Math.random() * - 1000) + 1);

    // Set a starting y-position based on a thre random values
    var yVals = [220, 140, 60];
    var y = yVals[Math.floor(Math.random() * 3)];

    // Create the new enemy object
    var enemy = new Enemy(x, y);

    // Push the enemy into the array
    allEnemies.push(enemy);
}

// Set initial position
var player = new Player(202, 380);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
