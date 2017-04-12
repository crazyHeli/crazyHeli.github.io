import {Clouds} from '../gameClasses/Clouds.js';
import {Coins} from '../gameClasses/Coins.js';
import {Score} from '../supportingClasses/GameStates.js';


class Coiner{
    constructor(score){
        this.coins = [];
        this.score = score;
    }

    initCoins(type, pos){
        const options = {
            'pos': [pos[0], pos[1]],
            'size': [30, 30],
            'innerSize': [30, 30],
            'speedFrames': 1.5
        }
        const speed = 2.5 + this.score.score * 0.00008;
        if(type === 'small'){
            let coin1 = new Coins(options);
            this.coins.push({'coins': [coin1],
                             'speed': speed});
        }else if(type === 'medium'){
            options.pos[1] += 15;
            let coin1 = new Coins(options);
            let options1 = options;
            options1.pos[0] += 30;
            let coin2 = new Coins(options1);
            this.coins.push({'coins': [coin1, coin2],
                             'speed': speed});
        }else if(type === 'big'){
            options.pos[1] += 30;
            let coin1 = new Coins(options);
            let options1 = options;
            options1.pos[0] += 30;
            let coin2 = new Coins(options);
            let options2 = options1;
            options2.pos[0] += 30;
            let coin3 = new Coins(options);
            this.coins.push({'coins': [coin1, coin2, coin3],
                             'speed': speed});
        }
    }

    animateCoins(){
        if(this.coins.length > 0){
            for(let i = 0; i < this.coins.length; i++){
                for(let j = 0; j < this.coins[i].coins.length; j++){
                    this.coins[i].coins[j].moving(this.coins[i].speed);
                }
            }
        }
    }

    cleaner(){
        for (let i = 0; i < this.coins.length; i++){
            if(this.coins[i].coins[0]){
                if(this.coins[i].coins[0].coin.pos[0] < -150){
                    this.coins.splice(i, 1);
                }
            }
            if(this.coins[i]){
                if(this.coins[i].coins.length === 0){
                    this.coins.splice(i, 1);
                }
            }
        }
    }
}

export {Coiner};
