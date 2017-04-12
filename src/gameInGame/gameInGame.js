import {frequences} from './frequences.js';
import {Coins} from '../gameClasses/Coins.js';

class gameInGame{
    constructor(){
        this.coins = [];
        this.options = {
            'pos': [720, 100],
            'size': [30, 30],
            'innerSize': [30, 30],
            'speedFrames': 3
        }
    }

    init(){
        const freq = frequences[0];

        for(let i = 0; i < freq.length; i++){
            for(let j = 0; j < freq[i].length; j++){
                if(freq[i][j]){
                    this.coins.push(new Coins(this.options));
                }
                if(j + 1 === freq[i].length){
                    this.options.pos[0] = 720;
                } else{
                    this.options.pos[0] += 30;
                }
            }
            if(i + 1 === freq.length){
                this.options.pos[1] = 100;
            } else{
                this.options.pos[1] += 30;
            }

        }
    }

    animateCoins(){
        if(this.coins.length > 0){
            for(let i = 0; i < this.coins.length; i++){
                this.coins[i].moving(4);
            }
        }
    }

    cleaner(){
        for(let i = 0; i < this.coins.length; i++){
            if(!this.coins[i].alive){
                this.coins.splice(i, 1);
            }
        }
    }

    destroy(){
        this.coins = [];
    }
}
export {gameInGame};
