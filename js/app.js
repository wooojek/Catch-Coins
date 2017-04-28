function Furry() {

    this.x = 0;
    this.y = 0;
    this.direction = "right";
}

function Coin() {

    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

function Game() {

    this.board = document.getElementById("board").children;
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = function (x, y) {
        return x + (y * 10);
    };

    var self = this;
    this.gameState = true;

    this.showFurry = function () {

        this.hideVisibleFurry();
        this.board [ this.index(this.furry.x, this.furry.y) ].classList.add("furry");
    };
    this.hideVisibleFurry = function () {

        var toRemove = document.querySelector(".furry");
        
        if (toRemove) {

            toRemove.classList.remove("furry");
        }
    };
    this.showCoin = function () {

        this.board [ this.index(this.coin.x, this.coin.y) ].classList.add("coin");
    };

    this.moveFurry = function () {

        if (self.furry.direction === "right") {
            self.furry.x++;
        } else if (self.furry.direction === "left") {
            self.furry.x--;
        } else if (self.furry.direction === "up") {
            self.furry.y--;
        } else if (self.furry.direction === "down") {
            self.furry.y++;
        }

        self.gameOver();

        if (self.gameState) {
            self.showFurry();
        }
        self.checkCoinCollision();

    };

    this.turnFurry = function (event) {

        switch (event.which) {
            case 37:
                this.furry.direction = "left";
                break;
            case 38:
                this.furry.direction = "up";
                break;
            case 39:
                this.furry.direction = "right";
                break;
            case 40:
                this.furry.direction = "down";
                break;
        }
    };

    this.checkCoinCollision = function () {
        
        if ( this.index(this.furry.x, this.furry.y) == this.index(this.coin.x, this.coin.y) ) {

            document.querySelector(".coin").classList.remove("coin");

            var score = document.querySelector("strong");
            var scoreInt = parseInt(score.innerText);

            scoreInt++;
            score.innerText = scoreInt;

            this.coin = new Coin();
            this.showCoin();
        }
    };

    this.gameOver = function () {

        if ( (this.furry.x < 0 || this.furry.x > 9) || (this.furry.y < 0 || this.furry.y > 9) ) {

            clearInterval(this.idSetInterval);

            var gameOverElement = document.getElementById('over');
            var newElementScore = document.createElement('P');
            var text = document.createTextNode('Your score: ' + document.querySelector("strong").innerText);

            newElementScore.appendChild(text);

            this.hideVisibleFurry();

            gameOverElement.classList.remove('invisible');
            gameOverElement.appendChild(newElementScore);

            this.gameState = false;

            return this.gameState;
        }
    };

    this.startGame = function () {

        this.idSetInterval = setInterval(this.moveFurry, 250);
    };
}

var game = new Game();

game.showFurry();
game.showCoin();
game.startGame();

document.addEventListener("keydown", function (event) {

    game.turnFurry(event);
});
