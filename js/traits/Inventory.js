import Trait from "./Trait.js";
import { Vec2 } from "../math.js";
import Apfel from "../Items/Apfel.js";
import Stab from "../Items/Stab.js";

export default class Inventory extends Trait {
    constructor( screen ) {
        super('inventory');
        this.list   = [];
        this.open   = false;
        this.slots  = new Array(4);

        this.maxVolume  = 10;
        this.maxWeight  = 30;

        this.middle   = new Vec2( screen.width / 2  , screen.height / 2  );
        this.pos      = new Vec2( screen.width * 0.05, screen.height * 0.05);
        this.size     = new Vec2( screen.width * 0.9, screen.height * 0.9);

        for(let i = 0; i < 10; ++i) {
            if(Math.random() > 0.5) {
                this.addItem( new Stab() );
            } else {
                this.addItem( new Apfel() );
            }
        }

        this.slots[0]   = new Slot();
        this.slots[1]   = new Slot();
        this.slots[2]   = new Slot();
        this.slots[3]   = new Slot();
    }

    update( entity, deltaTime ) {
        if ( !this.open ) {
            return;
        }
        for( let i = this.list.length - 1; i >= 0; --i) {
            const item  = this.list[i];
            if ( item.update(deltaTime) ) {
                this.list.splice(i, 1);
            }
        }
    }

    addItem( item ) {
        if ( this.list.includes(item) ) {
            return false
        }
        this.list.push(item);
        this.sort();
        return true;
    }

    toggle() {
        this.open   = !this.open;
    }

    draw( context, player ) {
        if ( this.open ) {
            context.fillStyle = '#ABABDB';
            context.fillRect( this.pos.x, this.pos.y, this.size.x, this.size.y );
            
            // draw player sprite
            
            context.fillStyle = '#878787';
            this.slots.forEach( (slot, ind) => {
                context.fillRect( this.pos.x + 50, this.middle.y + 70 * (ind-this.slots.length/2), 60, 60 );
            });

            for( let i = 0; i < this.list.length; ++i ) {
                this.list[i].draw( context, 200, this.pos.y + 80 + i*35 );
            }
        }
    }

    sort() {
        this.list = this.list.sort((a, b) => {
            return a.name > b.name;
        });
    }

    get weight() {
        let tempW = 0;
        this.list.forEach(item => {
            tempW += item.weight;
        });
        return tempW;
    }

    get volume() {
        let tempV = 0;
        this.list.forEach(item => {
            tempV += item.volume;
        });
        return tempV;
    }
}

class Slot {
    constructor( item ) {
        this.item   = item;
    }
}