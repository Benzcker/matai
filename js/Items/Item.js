import { Matrix, Vec2 } from "../math.js";

export default class Item {
    constructor( name, weight, size ) {
        this.name   = name;
        this.weight = weight;
        this.parts  = new Matrix();
        for(let x = 0; x < size.x; ++x) {
            for(let y = 0; y < size.y; ++y) {
                this.parts.set(
                    x, y, 
                    new Part(this, new Vec2(x, y))
                );
            }
        }
        this.wasUpdated = false;
        
    }

    update( deltaTime ) {
        // console.warn('Unhandled Item Update! (' + this.name + ')');
        return true;
    }

    draw( context, x, y ) {

        context.fillText(this.name, x, y);

    }
}

class Part {
    constructor(item, pos) {
        this.item = item;
        this.pos = pos;
    }
}