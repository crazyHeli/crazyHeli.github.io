import { Score } from './GameStates.js';

class Collisions {
    constructor(score) {
        this.clouds = [];
        this.bullets = [];
        this.heli = null;
        this.coiner = [];
        this.fires = [];
        this.background = [];
        this.mountains = [];
        this.score = score;
        this.life = [];
        this.shield = [];
        this.power = [];
        this.gIg = [];
        this.gIgcoins = [];
        this.gIgtimer = null;
        this.planes = [];
        this.ground = null;
        this.monsters = [];
        this.enemyBullets = [];
    }

    checkCollision(obj1, obj2) {
        if (obj1.x < obj2.x + obj2.width &&
            obj1.x + obj1.width > obj2.x &&
            obj1.y < obj2.y + obj2.height &&
            obj1.height + obj1.y > obj2.y) {
            return true;
        }
        return false;
    }

    heliWithCloud() {
        for (let i = 0; i < this.clouds.length; i++) {
            // alert(this.clouds[i].img.width);
            if (this.checkCollision({
                    x: this.heli.x,
                    width: this.heli.options.size[0],
                    y: this.heli.y,
                    height: this.heli.options.size[1]
                }, {
                    x: this.clouds[i].cloud.x,
                    width: this.clouds[i].img.width,
                    y: this.clouds[i].cloud.y,
                    height: this.clouds[i].img.height
                })) {
                if (this.heli.god) {
                    return;
                }
               if(!this.clouds[i].cloud.safe){
                    this.clouds[i].cloud.booms = true;
                    this.clouds[i].cloud.collideWithHeli = true;
                    this.score.onHeliWithCloud();
                    this.heli.flick = true;
                    this.heli.stars = true;
                }
            }
        }
    }

    heliWithCoins() {
        for (let i = 0; i < this.coiner.coins.length; i++) {
            for (let j = 0; j < this.coiner.coins[i].coins.length; j++) {
                if (this.checkCollision({
                        x: this.heli.x,
                        width: this.heli.options.size[0],
                        y: this.heli.y,
                        height: this.heli.options.size[1]
                    }, {
                        x: this.coiner.coins[i].coins[j].options.pos[0],
                        width: this.coiner.coins[i].coins[j].options.size[0],
                        y: this.coiner.coins[i].coins[j].options.pos[1],
                        height: this.coiner.coins[i].coins[j].options.size[1]
                    })) {
                    this.coiner.coins[i].coins.shift();
                    this.score.onHeliWithCoins();
                }
            }
        }
    }

    bulletWithCloud() {
        for (let j = 0; j < this.bullets.length; j++) {
            for (let i = 0; i < this.clouds.length; i++) {
                if (this.checkCollision({
                        x: this.bullets[j].options.pos[0],
                        width: this.bullets[j].options.size[0],
                        y: this.bullets[j].options.pos[1],
                        height: this.bullets[j].options.size[1]
                    }, {
                        x: this.clouds[i].cloud.x,
                        width: this.clouds[i].img.width,
                        y: this.clouds[i].cloud.y,
                        height: this.clouds[i].img.height
                    })) {
                        if(this.clouds[i].cloud.safe){
                                return;
                            }
                        this.clouds[i].cloud.booms = true;
                        this.clouds[i].cloud.safe = true;
                        this.bullets[j].clear();
                        this.score.onBulletWithCloud();
                        this.coiner.initCoins(this.clouds[i].type, [this.clouds[i].cloud.x, this.clouds[i].cloud.y]);
                }
            }
        }
    }

    fireWithClouds(){
        for (let j = 0; j < this.fires.length; j++) {
            for (let i = 0; i < this.clouds.length; i++) {
                if (this.checkCollision({
                        x: this.fires[j].animate.pos[0],
                        width: this.fires[j].animate.size[0],
                        y: this.fires[j].animate.pos[1],
                        height: this.fires[j].animate.size[1]
                    }, {
                        x: this.clouds[i].cloud.x,
                        width: this.clouds[i].img.width,
                        y: this.clouds[i].cloud.y,
                        height: this.clouds[i].img.height
                    })) {
                        if(this.clouds[i].cloud.safe){
                            return;
                        }
                        this.clouds[i].cloud.booms = true;
                        this.clouds[i].cloud.safe = true;
                        this.score.onBulletWithCloud();
                        this.coiner.initCoins(this.clouds[i].type, [this.clouds[i].cloud.x, this.clouds[i].cloud.y]);
                }
            }
        }
    }

    heliWithMountain() {
        for (let i = 0; i < this.mountains.length; i++) {
            if (this.checkCollision({
                    x: this.heli.x,
                    width: this.heli.options.size[0],
                    y: this.heli.y,
                    height: this.heli.options.size[1]
                }, {
                    x: this.mountains[i].x,
                    width: this.mountains[i].width,
                    y: this.mountains[i].y,
                    height: this.mountains[i].img.height
                })) {
                if (this.heli.god) {
                    return;
                }
                if (!this.heli.flick){
                    this.heli.flick = true;
                    this.heli.stars = true;
                    this.score.onheliWithMountain();
                }

            }
        }
    }

    heliWithLife(){
        for (let i = 0; i < this.life.length; i++) {
            if (this.checkCollision({
                x: this.heli.x, width: this.heli.options.size[0],
                y: this.heli.y, height: this.heli.options.size[1]
            }, {
                x: this.life[i].animate.pos[0], width: this.life[i].animate.size[0],
                y: this.life[i].animate.pos[1], height: this.life[i].animate.size[1]
            })) {
                this.life[i].alive = false;
                if(this.score.lives < 3){
                    this.score.lives++;
                }
            }
        }
    }

    heliWithShield(){
        for (let i = 0; i < this.shield.length; i++) {
            if (this.checkCollision({
                x: this.heli.x, width: this.heli.options.size[0],
                y: this.heli.y, height: this.heli.options.size[1]
            }, {
                x: this.shield[i].x, width: this.shield[i].img.width,
                y: this.shield[i].y, height: this.shield[i].img.height
            })) {
                this.shield[i].alive = false;
                this.heli.flick = true;
                this.heli.tokenShield = true;
            }
        }
    }

    heliWithPower(){
        for (let i = 0; i < this.power.length; i++) {
            if (this.checkCollision({
                x: this.heli.x, width: this.heli.options.size[0],
                y: this.heli.y, height: this.heli.options.size[1]
            }, {
                x: this.power[i].animate.pos[0], width: this.power[i].animate.size[0],
                y: this.power[i].animate.pos[1], height: this.power[i].animate.size[1]
            })) {
                this.power[i].alive = false;
                this.heli.canFire = true;
                this.score.fireImg = window.imgs.fireIcon;
            }
        }
    }

    heliWithgIg(){
        for (let i = 0; i < this.gIg.length; i++) {
            if (this.checkCollision({
                x: this.heli.x, width: this.heli.options.size[0],
                y: this.heli.y, height: this.heli.options.size[1]
            }, {
                x: this.gIg[i].animate.pos[0], width: this.gIg[i].animate.size[0],
                y: this.gIg[i].animate.pos[1], height: this.gIg[i].animate.size[1]
            })) {
                this.gIg[i].alive = false;
                this.score.gIg = true;
                this.gIgtimer.init(11);
           }
        }
    }

      heliWithPlane(){
         for (let i = 0; i < this.planes.length; i++) {
            if (this.checkCollision({
                x: this.heli.x, width: this.heli.options.size[0],
                y: this.heli.y, height: this.heli.options.size[1]
            }, {
                x: this.planes[i].x, width: this.planes[i].img.width,
                y: this.planes[i].y, height: this.planes[i].img.height
            })) {
                if (!this.heli.flick){
                    this.planes[i].booms = true;
                    this.heli.flick = true;
                    this.heli.stars = true;
                    this.score.onHeliWithPlane();
                }
            }
        }
    }


    gIgHeliWithCoin(){
        for (let i = 0; i < this.gIgcoins.length; i++) {
            if (this.checkCollision({
                x: this.heli.x, width: this.heli.options.size[0],
                y: this.heli.y, height: this.heli.options.size[1]
            }, {
                x: this.gIgcoins[i].coin.pos[0], width: this.gIgcoins[i].coin.size[0],
                y: this.gIgcoins[i].coin.pos[1], height: this.gIgcoins[i].coin.size[1]
            })) {
                this.gIgcoins[i].alive = false;
                this.score.onHeliWithCoins();
            }
        }
    }

     bulletWithPlane() {
        for (let j = 0; j < this.bullets.length; j++) {
            for (let i = 0; i < this.planes.length; i++) {
                if (this.checkCollision({
                        x: this.bullets[j].options.pos[0],
                        width: this.bullets[j].options.size[0],
                        y: this.bullets[j].options.pos[1],
                        height: this.bullets[j].options.size[1]
                    }, {
                        x: this.planes[i].x,
                        width: this.planes[i].img.width,
                        y: this.planes[i].y,
                        height: this.planes[i].img.height
                    })) {
                            this.planes[i].booms = true;
                            this.bullets[j].clear();
                            this.score.onBulletWithPlane();
                }
            }
        }
    }

    heliWithGround(){
        if (this.checkCollision({
            x: this.heli.x, width: this.heli.options.size[0],
            y: this.heli.y, height: this.heli.options.size[1]
        }, {
            x: -this.ground.x, width: this.ground.groundImg.width,
            y: this.ground.y, height: this.ground.groundImg.height
        })) {
            if (!this.heli.flick){
                this.heli.flick = true;
                this.heli.stars = true;
                this.score.onHeliWithGround();
            }
        }
    }

    heliWithMonster(){
        for (let i = 0; i < this.monsters.monsters.length; i++) {
            if (this.checkCollision({
                x: this.heli.x, width: this.heli.options.size[0],
                y: this.heli.y, height: this.heli.options.size[1]
            }, {
                x: this.monsters.monsters[i].animate.pos[0], width: this.monsters.monsters[i].animate.size[0],
                y: this.monsters.monsters[i].animate.pos[1], height: this.monsters.monsters[i].animate.size[1]
            })) {
                if (!this.heli.flick){
                    this.heli.flick = true;
                    this.heli.stars = true;
                    this.score.onHeliWithEnemy();
                }
            }
        }
    }

    bulletWithMonster(){
        for (let j = 0; j < this.bullets.length; j++) {
            for (let i = 0; i < this.monsters.monsters.length; i++) {
                if (this.checkCollision({
                    x: this.bullets[j].options.pos[0],
                    width: this.bullets[j].options.size[0],
                    y: this.bullets[j].options.pos[1],
                    height: this.bullets[j].options.size[1]
                }, {
                    x: this.monsters.monsters[i].animate.pos[0], width: this.monsters.monsters[i].animate.size[0],
                    y: this.monsters.monsters[i].animate.pos[1], height: this.monsters.monsters[i].animate.size[1]
                })) {
                    this.bullets[j].clear();
                    this.monsters.monsters[i].clear();
                    this.score.onScoreEnemy();
                }
            }
        }
    }

    fireWithMonster(){
        for (let i = 0; i < this.monsters.monsters.length; i++) {
            for (let j = 0; j < this.fires.length; j++) {
                if (this.checkCollision({
                        x: this.fires[j].animate.pos[0],
                        width: this.fires[j].animate.size[0],
                        y: this.fires[j].animate.pos[1],
                        height: this.fires[j].animate.size[1]
                    }, {
                        x: this.monsters.monsters[i].animate.pos[0], width: this.monsters.monsters[i].animate.size[0],
                        y: this.monsters.monsters[i].animate.pos[1], height: this.monsters.monsters[i].animate.size[1]
                    })) {
                        this.monsters.monsters[i].clear();
                        this.score.onScoreEnemy();
                    }
            }
        }
    }

    enemyBulletWithHeli(){
        for (let i = 0; i < this.monsters.monsters.length; i++) {
            for (let j = 0; j < this.monsters.monsters[i].enemyBullets.eBullets.length; j++) {
                if (this.checkCollision({
                    x: this.heli.x, width: this.heli.options.size[0],
                    y: this.heli.y, height: this.heli.options.size[1]
                }, {
                    x: this.monsters.monsters[i].enemyBullets.eBullets[j].options.pos[0], width: this.monsters.monsters[i].enemyBullets.eBullets[j].options.size[0],
                    y: this.monsters.monsters[i].enemyBullets.eBullets[j].options.pos[1], height: this.monsters.monsters[i].enemyBullets.eBullets[j].options.size[1]
                })) {
                    if (!this.heli.flick){
                        this.heli.flick = true;
                        this.heli.stars = true;
                        this.score.onHeliWithEnemy();
                    }
                }
            }
        }
    }
}
export { Collisions };
