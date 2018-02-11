import { Matrix } from "./math.js";
import Chunk, { getChunkCoords, chunksize } from "./Chunk.js";
import { loadSpriteSheet } from "./loaders.js";


export default function createWorld( screen ) {
    return loadSpriteSheet('world')
    .then( sprite => {

        
        const world     = {};
        
            
        world.entities              = [];
        const entityBuffer          = document.createElement('canvas');
        entityBuffer.width          = screen.width;
        entityBuffer.height         = screen.height;
        const entityBufferContext   = entityBuffer.getContext('2d');
        
        world.redrawEntities = function( camera ) {
            entityBufferContext.clearRect(0, 0, entityBuffer.width, entityBuffer.height);
            for (const entity of this.entities) {
                entity.draw(entityBufferContext, camera);
            }
        }
        
        world.addEntity = function(entity) {
            if ( world.entities.includes(entity) ){
                return false;
            }
            world.entities.push(entity);
            return true;
        }
        
        world.updateEntitys = function( deltaTime ) {
            for (const entity of this.entities) {
                entity.update( deltaTime, this.chunks );
            }
        }
        
        world.chunks                    = new Matrix();
        const backgroundBuffer          = document.createElement('canvas');
        backgroundBuffer.width          = screen.width;
        backgroundBuffer.height         = screen.height;
        const backgroundBufferContext   = backgroundBuffer.getContext('2d');
        
        world.updateChunks = function ( camera ) {
            // const playerChunkCoords = getChunkCoords(player.pos.x, player.pos.y);
            // if (!this.chunks.get(playerChunkCoords.x, playerChunkCoords.y)) {
                //     this.chunks.set(playerChunkCoords.x, playerChunkCoords.y, new  Chunk(playerChunkCoords.x, playerChunkCoords.y));
                //     this.drawBackground(camera);
            // }
            
            const topLeftChunk      = getChunkCoords(
                camera.pos.x - chunksize, 
                camera.pos.y - chunksize
            );
            const bottomRightChunk  = getChunkCoords(
                camera.pos.x + camera.size.x + chunksize * 2, 
                camera.pos.y + camera.size.y + chunksize * 2
            );
            
            for (let x = topLeftChunk.x; x < bottomRightChunk.x; ++x ) {
                for (let y = topLeftChunk.y; y < bottomRightChunk.y; ++y){
                    let chunk = this.chunks.get(x, y);
                    if (!chunk) {
                        chunk = new Chunk(x, y, sprite);
                        this.chunks.set(x, y, chunk);
                    }
                }
            }
        }
        
        world.drawBackground = function(camera) {
            
            backgroundBufferContext.fillStyle = '#50BF3A';
            backgroundBufferContext.fillRect(0, 0, backgroundBuffer.width, backgroundBuffer.height);
            
            const startIndicies = getChunkCoords( camera.pos.x, camera.pos.y );
            const endIndicies   = getChunkCoords( 
                camera.pos.x + camera.size.x, 
                camera.pos.y + camera.size.y
            );
            for (let x = startIndicies.x; x <= endIndicies.x; ++x ) {
                for ( let y = startIndicies.y; y <= endIndicies.y; ++y ) {
                    const chunk     = this.chunks.get(x, y);
                    if (chunk) {
                        backgroundBufferContext.drawImage(
                        chunk.backgroundBuffer, 
                        -camera.pos.x + x*chunksize, 
                        -camera.pos.y + y*chunksize
                        );
                    }
                }
            }
 
        }
        
        world.draw  = function( context, camera ) {
            
            world.drawBackground(camera);
            context.drawImage(backgroundBuffer, 0, 0);
            
            world.redrawEntities(camera);
            context.drawImage(entityBuffer, 0, 0);
            
        };

        world.update = function( deltaTime, player ) {

            world.updateEntitys( deltaTime );
            world.updateChunks( player );

        }
            
            
        return world;
    });
}