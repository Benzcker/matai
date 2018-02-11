import {Vec2} from './math.js';

export default class Camera {
    constructor(width, height) {
        this.pos = new Vec2();
        this.size = new Vec2(width, height);
    }

    update( player ) {
        if (player.pos.x > this.pos.x + this.size.x * 0.8) {
            this.pos.x = player.pos.x - this.size.x * 0.8;
        } else if (player.pos.x < this.pos.x + this.size.x * 0.2) {
            this.pos.x = player.pos.x - this.size.x * 0.2;
        }

        if (player.pos.y > this.pos.y + this.size.y * 0.8) {
            this.pos.y = player.pos.y - this.size.y * 0.8;
        } else if (player.pos.y < this.pos.y + this.size.y * 0.2) {
            this.pos.y = player.pos.y - this.size.y * 0.2;
        }
    }
}