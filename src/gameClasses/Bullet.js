import { Moving } from '../abstractClasses/Moving.js';
import { Animate } from '../supportingClasses/Animate.js';

/**
 * Creates the Bullet object which the ship fires. The bullets are
 * drawn on the "main" canvas.
 */
class Bullet extends Moving{
    constructor(){
        super();
        this.alive = true;
        this.x = 0;
		this.y = 0;
		this.speed = 0;
        this.options = {
            'img': window.imgs.rocket,
            'pos': [this.x, this.y],
            'size': [84.5, 20],
            'innerSize': [84.5, 20],
            'speedFrames': 5,
            'frames': [0, 1, 2, 3],
        }
        this.img = new Animate(this.options);
        // this.img = window.imgs.rocket;
    }

    spawn(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.alive = true;
	}

	/*
	 * Uses a "drity rectangle" to erase the bullet and moves it.
	 * Returns true if the bullet moved off the screen, indicating that
	 * the bullet is ready to be cleared by the pool, otherwise draws
	 * the bullet.
	 */
	draw() {
		this.x += this.speed;
        this.options.pos[1] = this.y;
        this.options.pos[0] = this.x;
        this.img.update();
        this.img.render(this.context);
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
export {Bullet};
