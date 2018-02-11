import Trait from './Trait.js';
import { Vec2 } from "../math.js";

export default class Walk extends Trait {
    constructor() {
        super('walk');

        this.direction = new Vec2();
        this.maxSpeed = 120;

        this.acceleration = 200;
        this.deceleration = 10;

        this.distance = 0;
        this.lookingDir = 0;
    }

    update( entity, deltaTime ) {

        
        let slowdown = 1 - this.deceleration * deltaTime;
        if (slowdown < 0) {
            slowdown = 0;
        }
        
        if (entity.inventory.open) {
            this.direction.multNum(0);
        }
        const acc = new Vec2(this.direction.x, this.direction.y);
        if (acc.magnitude !== 0) {
            acc.setMag(this.acceleration * deltaTime);
            entity.vel.add(acc);
        }
    
        entity.vel.multNum( 1 - this.deceleration * deltaTime);
        entity.vel.constrainMag(this.maxSpeed * deltaTime);

        const mag = entity.vel.magnitude;
        if (mag > 0.1) {
            this.distance += mag;
        } else if (mag > 0){
            this.distance = 0;
            this.lookingDir = Math.round(entity.vel.angle / Math.PI * 2);
            if ( this.lookingDir > 3 ) {
                this.lookingDir -= 4;
            }
            entity.vel.multNum(0);
        }
    }

    
}