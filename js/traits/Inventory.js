import Trait from "./Trait.js";
import { Vec2, Matrix } from "../math.js";
import Apfel from "../Items/Apfel.js";
import Stab from "../Items/Stab.js";

export function getSlotPixelSize(screen_width) {
    return Math.ceil(screen_width * 0.08); //0.063
}
export default class Inventory extends Trait {
    constructor( screen, itemSprite ) {
        super('inventory');

        this.itemSprite = itemSprite;
        
        this.list   = new Matrix();
        this.open   = false;
        this.slots  = new Array(4);

        this.maxWeight  = 30;
        this.size       = new Vec2(5, 4);
        
        this.middle   = new Vec2( screen.width / 2  , screen.height / 2  );
        this.pos      = new Vec2( screen.width * 0.05, screen.height * 0.05);
        this.screen_size     = new Vec2( screen.width * 0.9, screen.height * 0.9);
        
        this.slot_pixel_size = getSlotPixelSize(screen.width);

        this.slotStart = new Vec2(this.screen_size.x * 0.3, this.screen_size.y * 0.2);
        this.slotStart.add(this.pos);

        for(let i = 0; i < 10; ++i) {
            const x = Math.floor(Math.random()*this.size.x);
            const y = Math.floor(Math.random()*this.size.y);
            if(Math.random() > 0.5) {
                this.addItem( new Stab(), x, y );
            } else {
                this.addItem( new Apfel(), x, y );
            }
        }

        this.slots[0]   = new Slot();
        this.slots[1]   = new Slot();
        this.slots[2]   = new Slot();
        this.slots[3]   = new Slot();
    }

    update( entity, deltaTime ) {
        if ( !this.open ) return

        // this.list = this.list.filter(item => item.update(deltaTime));
        this.list.forEach(part => part.item.wasUpdated = false);
        this.list.forEach(part => {
            if (!part.item.wasUpdated) {
                part.item.update(deltaTime);
                part.item.wasUpdated = true;
            }
        });
    }

    addItem( item, invent_x, invent_y ) {
        if (this.list.includes(item)) return false;

        let blocked = false;
        item.parts.forEach((part, x, y) => {
            const finalX = invent_x + x;
            const finalY = invent_y + y;
            if(
                finalX >= this.size.x ||
                finalY >= this.size.y ||
                this.list.get(finalX, finalY)
            ) {
                blocked = true;
            }
        });
        if(blocked) return false;

        item.parts.forEach((part, x, y) => {
            this.list.set(
                invent_x + x, invent_y + y,
                part
            ); 
        });
        
        return true;
    }

    toggle() {
        this.open   = !this.open;
    }
    
    draw( context, player ) {
        
        if ( this.open ) {
            // Hintergrund
            context.fillStyle = '#ABABDB';
            context.fillRect( this.pos.x, this.pos.y, this.screen_size.x, this.screen_size.y );
            
            // draw player sprite

            // Rüstungs Slots
            context.fillStyle = '#878787';
            this.slots.forEach( (slot, ind) => {
                context.fillRect( 
                    this.pos.x + 50, 
                    this.middle.y + (this.slot_pixel_size + 5) * (ind-this.slots.length/2), 
                    this.slot_pixel_size, this.slot_pixel_size);
            });
            
            // Item Slots
            context.fillStyle = '#878787';
            for(let x = 0; x < this.size.x; ++x) {
                for (let y = 0; y < this.size.y; ++y) {
                    const slotCoords = this.getSlotCoords(x, y);
                    context.fillRect(
                        slotCoords.x,
                        slotCoords.y,
                        this.slot_pixel_size, this.slot_pixel_size);
                } 
            }

            // Items
            context.font = Math.ceil(this.slot_pixel_size * 0.2) + 'px Arial';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            this.list.forEach((elem, x, y) => {
                const slotCoords = this.getSlotCoords(x, y);
                if (elem.pos.x + elem.pos.y === 0) {
                    elem.item.draw(context, 
                        slotCoords.x, slotCoords.y
                    );
                }
                if (elem.labeled) {
                    // elem.item.drawName(context, this.slot_pixel_size, this.getSlotCoords, this);
                    elem.item.drawName(context, 
                        slotCoords.x + this.slot_pixel_size / 2,
                        slotCoords.y + this.slot_pixel_size * 0.94,
                        this.slot_pixel_size * 0.8,
                        this.slot_pixel_size * 0.22
                    );
                }


            });
        }

    }


    get weight() {
        let tempW = 0;
        this.list.forEach(item => {
            tempW += item.weight;
        });
        return tempW;
    }

    getSlotCoords(x ,y, inventory = this) {
        return new Vec2(
            inventory.slotStart.x + x * (inventory.slot_pixel_size + 5),
            inventory.slotStart.y + y * (inventory.slot_pixel_size + 5)
        );
    }

}

class Slot {
    constructor( item ) {
        this.item   = item;
    }
}