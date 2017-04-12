import {Monster} from '../gameClasses/Monster.js';

class Monsters{
    constructor(score){
        this.monsters = [];
        this.score = score;
        this.time = Date.now();
    }

    init(){
        const speed = 1.5;
        let monster = new Monster(speed, this.score);
        this.monsters.push(monster);
    }

    animate(){
        for (let i = 0; i < this.monsters.length; i++){
            this.monsters[i].move();
            this.monsters[i].fire();
            this.monsters[i].enemyBullets.animate();
        }
    }

    cleaner(){
        for (let i = 0; i < this.monsters.length; i++){
            if(!this.monsters[i].alive){
                this.monsters.splice(i, 1);
            }
        }
    }

}

export {Monsters};
