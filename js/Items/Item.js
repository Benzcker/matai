import { Matrix, Vec2 } from "../math.js";
import { itemSprites } from "../itemSprites.js";

export default class Item {
    constructor( name, weight, size ) {
        this.name   = name;
        this.id     = name.toLowerCase().replace(/ /g, '_');
        this.weight = weight;
        this.parts  = new Matrix();
        for(let x = 0; x < size.x; ++x) {
            for(let y = 0; y < size.y; ++y) {
                const nextPart = new Part(this, new Vec2(x, y),
                    (y === size.y - 1 && x === Math.floor(size.x / 2))
                );
                if (nextPart.labeled) this.labeledPart = nextPart;
                this.parts.set(
                    x, y, 
                    nextPart
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
        itemSprites.draw(this.id, context, x, y);
    }
    
    // drawName( context, slot_pixel_size, getSlotCoords, inv ) {
    drawName( context, c_x, c_y, w, h ) {
        // c_x und c_y sind center
        // const slotCoords = getSlotCoords(this.labeledPart.pos.x, this.labeledPart.pos.y, inv);
        // const   c_x = slotCoords.x + slot_pixel_size / 2,
        //         c_y = slotCoords.y + slot_pixel_size * 0.94,
        //         w   = slot_pixel_size * 0.8, 
        //         h   = slot_pixel_size * 0.22
        context.fillStyle = '#CDCDCD';
        context.fillRect(c_x - w / 2, c_y - h / 2, w, h);
        context.fillStyle = 'black';
        context.fillText(this.name, c_x, c_y);
    }
}

class Part {
    constructor(item, pos, labeled = false ) {
        this.item       = item;
        this.pos        = pos;
        this.labeled    = labeled;
    }
}