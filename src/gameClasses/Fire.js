import { Moving } from '../abstractClasses/Moving.js';
import { Animate } from '../supportingClasses/Animate.js';


class Fire extends Moving{
    constructor(){
        super();
        this.alive = true;
        this.x = 0;
		this.y = 0;
		this.speed = 3;
        this.options = {
            'img': window.imgs.fire,
            'pos': [this.x, this.y],
            'size': [84, 50],
            'innerSize': [84, 50],
            'speedFrames': 5,
            'frames': [0, 1, 2, 3],
        }
        this.animate = new Animate(this.options);
    }


	/*
	 * Uses a "drity rectangle" to erase the bullet and moves it.
	 * Returns true if the bullet moved off the screen, indicating that
	 * the bullet is ready to be cleared by the pool, otherwise draws
	 * the bullet.
	 */
	draw() {
		this.x += this.speed;
        this.options.pos[0] = this.x;
        this.animate.update();
        this.animate.render(this.context);
		if (this.x >= this.canvasWidth) {
			this.alive = false;
		}
	}

	/*
	 * Resets the bullet values
	 */
	clear() {
		this.alive = false;
	}
}
export {Fire};
