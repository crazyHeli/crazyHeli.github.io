import {Life} from '../Tokens/Life.js';
import {Shield} from '../Tokens/Shield.js';
import {Power} from '../Tokens/Power.js';
import {gIg} from '../Tokens/gIg.js';

class Tokener{
    constructor(score, timer){
        this.score = score;
        this.lifeFrequency = 90;
        this.shieldFrequency = 60;
        this.powerFrequency = 50;
        this.gIgFrequency = 30;
        this.shield = [];
        this.life = [];
        this.power = [];
        this.gIg = [];
        this.speed = 2;
        this.timer = timer;
    }

    randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    initTokens(){
        if(this.timer.tick() >= this.lifeFrequency){
            if(this.score.lives >= 3){
                this.lifeFrequency += 22;
                return;
            }
            this.life.push(new Life());
            this.lifeFrequency += 94;
        }
        if(this.timer.tick() >= this.shieldFrequency){
            this.shield.push(new Shield());
            this.shieldFrequency += 54;
        }
        if(this.timer.tick() >= this.powerFrequency){
            this.power.push(new Power());
            this.powerFrequency += 46;
        }
        if(this.timer.tick() >= this.gIgFrequency){
            this.gIg.push(new gIg());
            this.gIgFrequency += 73;
        }
    }

    moveTokens(){
        for(let i = 0; i < this.life.length; i++){
            this.life[i].move(this.speed + this.score.score * 0.00008);
            this.life[i].draw();
        }
        for(let i = 0; i < this.shield.length; i++){
            this.shield[i].move(this.speed + this.score.score * 0.00008);
            this.shield[i].draw();
        }
        for(let i = 0; i < this.power.length; i++){
            this.power[i].move(this.speed + this.score.score * 0.00008);
            this.power[i].draw();
        }
        for(let i = 0; i < this.gIg.length; i++){
            this.gIg[i].move(this.speed + this.score.score * 0.00008);
            this.gIg[i].draw();
        }
    }

    cleanTokens(){
        for(let i = 0; i < this.life.length; i++){
            if(!this.life[i].alive){
                this.life.splice(i, 1);
            }
        }
        for(let i = 0; i < this.shield.length; i++){
            if(!this.shield[i].alive){
                this.shield.splice(i, 1);
            }
        }
        for(let i = 0; i < this.power.length; i++){
            if(!this.power[i].alive){
                this.power.splice(i, 1);
            }
        }
        for(let i = 0; i < this.gIg.length; i++){
            if(!this.gIg[i].alive){
                this.gIg.splice(i, 1);
            }
        }
    }
}

export {Tokener};
