import {Background} from './gameClasses/Background.js';
import {Clouder} from './FactoryClasses/Clouder.js';
import {Coiner} from './FactoryClasses/Coiner.js';
import {Animate} from './supportingClasses/Animate.js';
import {Heli} from './gameClasses/Heli.js';
import {Moving} from './abstractClasses/Moving.js';
import {Collisions} from './supportingClasses/Collisions.js';
import {Mountains} from './FactoryClasses/Mountains.js';
import {MountainPart} from './gameClasses/MountainPart.js';
import {Score} from './supportingClasses/GameStates.js';
import {Tokener} from './FactoryClasses/Tokener.js';
import {AbstractToken} from './abstractClasses/AbstractToken.js';
import {gameInGame} from './gameInGame/gameInGame.js';
import {Timer} from './supportingClasses/Timer.js';
import {Planes} from './gameClasses/Planes.js';
import {Ground} from './gameClasses/Ground.js';
import {Sound} from './supportingClasses/Sound.js';
import {Monsters} from './FactoryClasses/Monsters.js';

/**
 * It is main class of our game, where implementing all logic
 */
class Game {
    /*
     * Gets canvas information and context and sets up all game objects.
     */
    init() {
        this.sounds = new Sound();
        // Get the canvas element
        this.canvas = document.getElementById('canvas');
        this.isStarted = false;


        // Test to see if canvas is supported
        if (this.canvas.getContext) {
            this.ctx = this.canvas.getContext('2d');
            Moving.prototype.context = this.ctx;
            Moving.prototype.canvasWidth = this.canvas.width;
            Moving.prototype.canvasHeight = this.canvas.height;
            AbstractToken.prototype.context = this.ctx;
            AbstractToken.prototype.canvasWidth = this.canvas.width;
            AbstractToken.prototype.canvasHeight = this.canvas.height;
            this.timer = new Timer();
            this.timer.init();
            this.background = new Background();
            this.background.init(0,0);
            this.score = new Score(this);
            this.score.init(520,2);
            this.mountains = new Mountains(this.score);
            this.mountains.init();
            this.clouds = new Clouder(this.score);
            this.coiner = new Coiner(this.score);
            this.heli = new Heli(this.score);
            this.heli.init(40, 120);
            this.score.heli = this.heli;
            this.monsters = new Monsters(this.score);
            this.tokener = new Tokener(this.score, this.timer);
            this.collisions = new Collisions(this.score);
            this.gIgcoins = new gameInGame();
            this.ground = new Ground(this.score);
            this.score.gIgObj = this.gIgcoins.coins;
            this.background.score = this.score;
            this.ground.gameState = this.score;
            this.collisions.heli = this.heli;
            this.collisions.clouds = this.clouds.clouds;
            this.collisions.coiner = this.coiner;
            this.collisions.bullets = this.heli.bullets.pool;
            this.collisions.mountains = this.mountains.mountArray;
            this.collisions.life = this.tokener.life;
            this.collisions.shield = this.tokener.shield;
            this.collisions.power = this.tokener.power;
            this.collisions.fires = this.heli.firer.fires;
            this.collisions.gIg = this.tokener.gIg;
            this.collisions.monsters = this.monsters;



            this.gIgtimer = new Timer();
            this.collisions.gIgtimer = this.gIgtimer;
            return true;
        } else {
            return false;
        }
    }

    animate(){
         if (!this.isStarted){
            return;
        }
        this.sounds.play();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.background.checkImg();
        this.background.draw();
        if(this.score.level === 1){
            this.mountains.draw();
            this.mountains.move();
        }
        if(this.score.level >= 2){
            this.ground.chooseGround();
            this.ground.draw();
            this.planes.draw();
            this.planes.move();
            this.collisions.heliWithGround();
            this.collisions.bulletWithMonster();
            this.collisions.fireWithMonster();
            this.collisions.enemyBulletWithHeli();
        }
        if(this.score.level >= 3){
            this.monsters.animate();
            this.monsters.cleaner();

            if(this.monsters.time + 7000 - (this.score.score * 0.08) < Date.now()){
                this.monsters.init();
                this.monsters.time = Date.now();
            }

        }
        this.heli.draw();
        this.heli.move();
        this.tokener.initTokens();
        this.tokener.moveTokens();
        this.tokener.cleanTokens();
        this.heli.bullets.animate();
        this.heli.bullets.cleaner();
        this.heli.firer.animate();
        this.heli.firer.cleaner();
        this.clouds.animateClouds();
        this.coiner.animateCoins();
        this.coiner.cleaner();
        this.clouds.cleaner();

        this.collisions.heliWithCloud();
        this.collisions.heliWithCoins();
        this.collisions.bulletWithCloud();
        this.collisions.heliWithMountain();
        this.collisions.heliWithLife();
        this.collisions.heliWithShield();
        this.collisions.heliWithPower();
        this.collisions.fireWithClouds();
        this.collisions.heliWithgIg();
        this.collisions.heliWithPlane();
        this.collisions.bulletWithPlane();
        this.collisions.heliWithMonster();
        this.score.draw();
        this.score.draw2();
        if(this.clouds.time + 1400 - (this.score.score * 0.017) < Date.now()){
            this.clouds.initClouds();
            this.clouds.time = Date.now();
            this.clouds.i++;
        }

    }

    gIganimate(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if(!this.gIgcoins.coins.length){
            this.gIgcoins.init();
            this.collisions.gIgcoins = this.gIgcoins.coins;
        }
        this.background.drawgIg();
        this.heli.draw();
        this.heli.move();
        this.collisions.gIgHeliWithCoin();
        this.score.drawWithoutLevel();
        this.gIgcoins.animateCoins();
        this.gIgcoins.cleaner();
    }


    destroy(){
        delete this.background;
        delete this.mountains;
        delete this.score;
        delete this.clouds;
        delete this.coiner;
        delete this.heli;
        delete this.planes;
        delete this.tokener;
        delete this.collisions;
        delete this.gIgcoins;
        delete this.sounds;
    }

    // Start our game and game loop
    start(animate) {
        this.isStarted = true;
        animate(this.ctx);
    };

    stop(){
        this.isStarted = false;
    }
}
export { Game };
