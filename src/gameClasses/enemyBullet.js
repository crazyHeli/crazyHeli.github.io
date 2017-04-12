import { Moving } from '../abstractClasses/Moving.js';
import { Animate } from '../supportingClasses/Animate.js';

class enemyBullet extends Moving{
    constructor(score){
        super();
        this.alive = true;
        this.x = 0;
		this.y = 0;
		this.speed = 0;
        this.options = {
            'img': window.imgs.enemyBullet,
            'pos': [this.x, this.y],
            'size': [33.5, 20],
            'innerSize': [33.5, 20],
            'speedFrames': 5,
            'frames': [0, 1, 2, 3],
        }
        this.img = new Animate(this.options);
        this.score = score;
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
		this.x -= this.speed + this.score.score * 0.00008;
        this.options.pos[1] = this.y;
        this.options.pos[0] = this.x;
        this.img.update();
        this.img.render(this.context);
		if (this.x <= 0) {
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
export {enemyBullet};
