import { Collisions } from './Collisions.js';
import { Clouder } from '../FactoryClasses/Clouder.js';
import { Clouds } from '../gameClasses/Clouds.js';
import { Coins } from '../gameClasses/Coins.js';
import { Coiner } from '../FactoryClasses/Coiner.js';
import { Moving } from '../abstractClasses/Moving.js';
import { Mountains } from '../FactoryClasses/Mountains.js';
import { Animate } from './Animate.js';
import { Planes } from '../gameClasses/Planes.js';
import { Sound } from './Sound.js';
import { Monsters } from '../FactoryClasses/Monsters.js';


class Score extends Moving {
    constructor(game, heli) {
        super();
        this.score = 0;
        this.img = window.imgs.score;
        this.img2 = window.imgs.gameOver;
        this.fireImg = window.imgs.fireIconTr;
        this.shieldImg = window.imgs.shieldIcTr;
        this.level = 1;
        this.lives = 3;
        this.count = 0;
        this.sounds = window.sounds.backgroundTrack;
        this.sounds2 = window.sounds.shoot;
        this.sounds3 = window.sounds.gameover;
        this.sounds4 = window.sounds.coins;
        this.sounds5 = window.sounds.explos;
        this.sounds6 = window.sounds.collis;
        this.gIg = false;
        this.gIgCounter = 0;
        this.gameObj = game;
        this.heli = heli;
    }

    draw() {
        this.context.drawImage(this.img, this.x, this.y);
        this.context.font = "30px Segoe UI, Arial";
        this.context.fillStyle = "white";
        this.context.fillText(this.score.toString(), this.x + this.img.width + 7, this.y + 40);
        this.context.fillText("LEVEL " + this.level.toString(), 310, 40);
        if (this.fireImg) {
            this.context.drawImage(this.fireImg, 20, 15);
        }
        if(this.heli.god){
            this.shieldImg = window.imgs.shield;
        }else{
            this.shieldImg = window.imgs.shieldIcTr;
        }
        if (this.shieldImg) {
            this.context.drawImage(this.shieldImg, 40, 60);
        }
    }

    drawWithoutLevel() {
        this.context.drawImage(this.img, this.x, this.y);
        this.context.font = "30px Segoe UI, Arial";
        this.context.fillStyle = "white";
        this.context.fillText(this.score.toString(), this.x + this.img.width + 7, this.y + 40);
    }

    draw2() {
        this.context.fillText("LIVES " + this.lives.toString(), 110, 40);
        this.context.font = "50px Segoe UI, Arial";
    }

    onHeliWithCloud() {
        if (this.score >= 50) {
            this.score -= 50;
        } else this.score = 0;
        if (this.lives >= 2) {
            this.lives -= 1;
        } else this.gameOver();
        this.checkScores();

        this.sounds6.play();
    }


    onHeliWithCoins() {
        this.score += 25;
        this.checkScores();
        this.sounds4.play();
    }

    onBulletWithCloud() {
        this.score += 70;
        this.checkScores();
        this.sounds5.play();
    }



    onheliWithMountain() {
        this.sounds6.play();
        if (this.lives >= 2) {
            this.lives -= 1;
        } else this.gameOver();
    }

    onHeliWithPlane() {
        this.sounds6.play();
        if (this.score >= 50) {
            this.score -= 50;
        } else this.score = 0;
        if (this.lives >= 2) {
            this.lives -= 1;
        } else this.gameOver();
        this.checkScores();
    }

    onHeliWithGround(){
        if (this.lives >= 2) {
            this.lives -= 1;
        } else this.gameOver();
    }

    onBulletWithPlane() {
        if (this.score >= 50) {
            this.score -= 50;
            this.sounds5.play();
        } else this.score = 0;
        this.checkScores();
    }

    onScoreEnemy(){
        this.score += 70;
        this.checkScores();
        this.sounds5.play();
    }

    onHeliWithEnemy(){
        this.sounds6.play();
        if (this.score >= 50) {
            this.score -= 50;
        } else this.score = 0;
        if (this.lives >= 2) {
            this.lives -= 1;
        } else this.gameOver();
        this.checkScores();
    }

    gameOver() {
        this.gameObj.pause = true;
        this.sounds.pause();
        this.sounds3.play();
        this.context.drawImage(this.img2, 0, 0);
        this.gameObj.destroy();
        this.showRestart();
    }
    showRestart() {
        let menu = document.getElementById('menu');
        menu.className = "restart";
        menu.style.display = 'block';
    }

    show(elem) {
        el.style.display = 'block';
        this.init();
    }

    checkScores(){
        if(this.score >= 0 && this.score <= 7500){
            if(this.beenTwo){
                return;
            }
            this.level = 1;
        } else if(this.score > 7500 && this.score <= 15000){
            if(!this.beenTwo){
                this.gameObj.planes = new Planes(this);
                this.gameObj.collisions.planes.push(this.gameObj.planes);
                this.gameObj.mountains.clear();
                this.gameObj.collisions.mountains = [];
                this.gameObj.collisions.ground = this.gameObj.ground;
            }
            if(this.beenThree){
                return;
            }
            this.level = 2;
            this.beenTwo = true;
        } else if(this.score > 15000){
            if(!this.beenThree){


            }
            this.level = 3;
            this.beenThree = true;
        }
    }

}
export { Score };
