import { Vec2 } from "./math.js";
import { getChunkCoords } from "./Chunk.js";

export default class Entity {
    constructor(name) {
        this.name   = name;
        this.height = 0;
        this.pos    = new Vec2();
        this.vel    = new Vec2();
        this.size   = new Vec2();

        this.traits = [];
    }

    update(deltaTime, chunks) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime);
        });

        let x = this.pos.x + this.vel.x;
        let y = this.pos.y + this.vel.y;
        
        const chunkCoords = getChunkCoords(x, y);
        const updateChunks = [chunks.get(chunkCoords.x, chunkCoords.y)];

        let tempCoords = getChunkCoords(x + this.size.x, y);
        if ( chunkCoords.x !== tempCoords.x ) {
            const tempC = chunks.get( tempCoords.x, tempCoords.y );
            updateChunks.push( tempC );
        }

        tempCoords = getChunkCoords(x, y + this.size.y);
        if ( chunkCoords.y !== tempCoords.y) {
            const tempC = chunks.get( tempCoords.x, tempCoords.y );
            updateChunks.push( tempC );
        }

        tempCoords = getChunkCoords(x + this.size.x, y + this.size.y);
        if (chunkCoords.x !== tempCoords.x && chunkCoords.y !== tempCoords.y) {
            const tempC = chunks.get( tempCoords.x, tempCoords.y );
            updateChunks.push( tempC );
        }

        this.pos.x += this.vel.x;
        updateChunks.forEach(updateChunk => {
            if (updateChunk) {
                updateChunk.tileCollider.checkX(this);
            }
        });        
        
        this.pos.y += this.vel.y;
        updateChunks.forEach(updateChunk => {
            if (updateChunk) {
                updateChunk.tileCollider.checkY(this);
            }
        });
        

    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME]    = trait;
    }

    obstruct(side) {
        this.traits.forEach(trait => {
            trait.obstruct(this, side);
        })
    }
}