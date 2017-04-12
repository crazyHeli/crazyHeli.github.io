import {Moving} from '../abstractClasses/Moving.js';
import {Animate} from '../supportingClasses/Animate.js';

/**
 * Class for helicopter
 */
class Coins extends Moving{
    constructor(options){
        super();
        this.options = {
            'img': imgs.coins,
            'pos': [options.pos[0], options.pos[1]],
            'size': [options.size[0], options.size[1]],
            'innerSize': [options.innerSize[0], options.innerSize[1]],
            'speedFrames': options.speedFrames,
            'frames': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            'scale': options.scale
        }
        this.coin = new Animate(this.options);
        this.alive = true;
    }

    moving(x){
        this.coin.pos[0] -= x;
        this.coin.update();
        this.coin.render(this.context);
        if(this.coin.pos[0] <= -50){
            this.alive = false;
        }
    }


}

export {Coins};
