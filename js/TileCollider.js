import TileResolver from './TileResolver.js';
import { Sides } from './math.js';
import { chunksize } from './Chunk.js';

export default class TileCollider {
    constructor(tileMatrix, chunkPos) {
        this.tiles      = new TileResolver(tileMatrix);
        this.chunkPos   = chunkPos;
    }

    checkX(entity) {
        let x = -this.chunkPos.x * chunksize;
        if (entity.vel.x > 0){
            x += entity.pos.x + entity.size.x;
        } else if (entity.vel.x < 0) {
            x += entity.pos.x;
        } else {
            return;
        }

        let y = -this.chunkPos.y * chunksize + entity.pos.y;

        const matches = this.tiles.searchByRange(
            x, x,
            y, y + entity.size.y
        );
        

        matches.forEach(match => {
            
            if (match.tile.object !== 1){
                return;
            }
            
            if (entity.vel.x > 0){
                if (entity.pos.x - this.chunkPos.x * chunksize + entity.size.x > match.x1) {
                    entity.pos.x = match.x1 + this.chunkPos.x * chunksize - entity.size.x;
                    entity.vel.x = 0;
                }
            } else if (entity.vel.x < 0){
                if (entity.pos.x - this.chunkPos.x * chunksize < match.x2) {
                    entity.pos.x = match.x2 + this.chunkPos.x * chunksize;
                    entity.vel.x = 0;
                }
            }

        });
    }

    checkY(entity) {
        let y = -this.chunkPos.y * chunksize;
        if (entity.vel.y > 0){
            y += entity.pos.y + entity.size.y;
        } else if (entity.vel.y < 0) {
            y += entity.pos.y;
        } else {
            return;
        }

        let x = -this.chunkPos.x * chunksize + entity.pos.x;

        const matches = this.tiles.searchByRange(
            x, x + entity.size.x,
            y, y);
        
        matches.forEach(match => {
            
            if (match.tile.object !== 1){
                return;
            }
            
            if (entity.vel.y > 0){
                if (entity.pos.y - this.chunkPos.y * chunksize + entity.size.y > match.y1) {
                    entity.pos.y = match.y1 + this.chunkPos.y * chunksize - entity.size.y;
                    entity.vel.y = 0;

                    // entity.obstruct(Sides.BOTTOM);
                }
            } else if (entity.vel.y < 0){
                if (entity.pos.y - this.chunkPos.y * chunksize < match.y2) {
                    entity.pos.y = match.y2 + this.chunkPos.y * chunksize;
                    entity.vel.y = 0;

                    // entity.obstruct(Sides.TOP);
                }
            }

        });
    }
}