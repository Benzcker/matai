import { Matrix, Vec2 } from "./math.js";
import TileCollider from "./TileCollider.js";
import Tile, { generateObjectType, generateBackgroundType } from "./Tile.js";


export const tileSize = 32;
export const tileCountPerSide = 64;
export const chunksize = tileSize * tileCountPerSide;

export default class Chunk {
    constructor(chunkX, chunkY, worldSprite) {
        this.grid           = new Matrix();
        this.pos            = new Vec2(chunkX, chunkY);
        this.tileCollider   = new TileCollider( this.grid, this.pos );


        generateTiles(this.grid, chunkX, chunkY);
        
        this.color          = '#545454'; //'#' + (Math.round(Math.random() * 99)).toString() + '5050'; //

        this.worldSprite    = worldSprite;

        this.backgroundBuffer           = document.createElement('canvas');
        this.backgroundBuffer.width     = chunksize;
        this.backgroundBuffer.height    = chunksize;

        this.redraw();
    }
    

    redraw() {
        
        const context = this.backgroundBuffer.getContext('2d');
        context.fillStyle   = this.color;
        context.fillRect( 0, 0, chunksize, chunksize);
        
        this.grid.forEach( (tile, x, y) => {
            
            // draw background if exists
            const bg = getBackground(tile.background);
            if (bg) {
                this.worldSprite.draw(
                    bg, 
                    context, 
                    x * tileSize, y * tileSize, 
                    Math.random() > 0.5
                );
            }
            
            // draw object if exists
            const obj = getObject(tile.object);
            if (obj) {
                this.worldSprite.draw(
                    obj, 
                    context, 
                    x * tileSize, y * tileSize
                );
            }


        });

    }
}

export function getChunkCoords(pixelX, pixelY) {
    return new Vec2(Math.floor(pixelX / chunksize), Math.floor(pixelY / chunksize));
}

// functioniert noch nicht wegen Chunkgrenzen
function getRandomOffset() {
    const offset = tileSize / 4;
    return Math.random()*2 - 1 * offset;
}

function generateTiles(grid, chunkX, chunkY) {
    for (let x = 0; x < tileCountPerSide; ++x) {
        for (let y = 0; y < tileCountPerSide; ++y) {
            grid.set(
                x, y,
                new Tile( 
                    generateBackgroundType(chunkX, chunkY, x, y),
                    generateObjectType(chunkX, chunkY, x, y)
                )
            );
        }
    }
}


function getBackground(background) {
    switch (background) {
        case 1:
            return 'grass';

        default:
            break;
    }
}

function getObject(object) {
    switch (object) {
        case 1:
            return 'tree';

        default:
            break;
    }
}