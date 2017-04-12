import {AbstractToken} from '../abstractClasses/AbstractToken.js';


class Shield extends AbstractToken{
    constructor() {
        super();
        this.img = window.imgs.shield
        this.x = 720;
        this.y = this.randomInteger(20, 250)
        this.alive = true;
    }

    move(speed){
        this.x -= speed;
        if(this.x <= -50){
            this.alive = false;
        }
    }

    draw(){
        this.context.drawImage(this.img, this.x, this.y);
    }
}

export { Shield };
