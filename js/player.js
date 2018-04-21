import Entity from './Entity.js'
import Walk from './traits/walk.js';
import Inventory from './traits/Inventory.js';
import { loadSpriteSheet } from './loaders.js';
import { createAnim } from "./anim.js";

export default function createPlayer( screen ) {
    return Promise.all([
        loadSpriteSheet('player'),
        loadSpriteSheet('items')
    ])
    .then( ([playerSprite, itemSprite]) => {
        const player    = new Entity('Player');
        

        player.pos.set(0, 0);
        player.size.set(12, 12);
        player.height       = 16;
        player.imageXOff    = 2;
        
        player.addTrait( new Walk() );
        player.addTrait( new Inventory( screen, itemSprite ) );

        
        const frameLen = 18;

        const walkDownAnim  = createAnim(['walk-down-1',    'walk-down-2',  'walk-down-3',  'walk-down-4' ], frameLen);
        const walkLeftAnim  = createAnim(['walk-left-1',    'walk-left-2',  'walk-left-3',  'walk-left-4' ], frameLen);
        const walkUpAnim    = createAnim(['walk-up-1',      'walk-up-2',    'walk-up-3',    'walk-up-4'   ], frameLen);
        const walkRightAnim = createAnim(['walk-right-1',   'walk-right-2', 'walk-right-3', 'walk-right-4'], frameLen);

        const QUARTER_PI = Math.PI / 4;

        function routeFrame(player) {
            if (player.vel.magnitude > 0) {

                const angle = player.vel.angle;
                if ( angle <= QUARTER_PI || angle > 7*QUARTER_PI ) {
                    // walk left
                    return walkLeftAnim(player.walk.distance);
                } else if ( angle <= 3*QUARTER_PI ) {
                    // walk up
                    return walkUpAnim(player.walk.distance);
                } else if ( angle <= 5*QUARTER_PI ) {
                    // walk right
                    return walkRightAnim(player.walk.distance);
                } else if( angle <= 7*QUARTER_PI ){
                    // walk down
                    return walkDownAnim(player.walk.distance);
                }
            }

            switch (player.walk.lookingDir) {
                case 0:
                    return 'walk-left-1';
                case 1:
                    return 'walk-up-1';
                case 2:
                    return 'walk-right-1';
                case 3:
                    return 'walk-down-1';
            
                default:
                    // Eigentlich unnötig
                    return 'idle';
            }


        }

        player.draw     = function drawPlayer( context, camera ) {
            // context.fillStyle = 'white';
            // context.fillRect(
            //     player.pos.x - camera.pos.x, player.pos.y - camera.pos.y,
            //     player.size.x, player.size.y
            // );
            playerSprite.draw(routeFrame(this), context, player.pos.x - camera.pos.x - player.imageXOff, player.pos.y - camera.pos.y - player.height, false);
        }
        
        return player;
    });
}