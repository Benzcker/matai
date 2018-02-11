import Keyboard from './KeyboardState.js';


export function setupKeyboard( player, timer ) {
    const SPACE     = 32;
    const input     = new Keyboard();


    input.addMapping(SPACE, keyState => {
        // space
        timer.setForward( keyState );
    });

    input.addMapping(16, keyState => {
        // Shift
    });



    input.addMapping(87, keyState => {
        // w
        if (!player.inventory.open) {
            player.walk.direction.y += keyState ? -1 : 1;
        }
    });
    
    input.addMapping(83, keyState => {
        // s
        if (!player.inventory.open) {
            player.walk.direction.y += keyState ? 1 : -1;
        }
    });

    input.addMapping(65, keyState => {
        // a
        if (!player.inventory.open) {
            player.walk.direction.x += keyState ? -1 : 1;
        }
    });
    
    input.addMapping(68, keyState => {
        // d
        if (!player.inventory.open) {
            player.walk.direction.x += keyState ? 1 : -1;
        }
    });

    input.addMapping(9, keyState => {
        // tab
        if (keyState) {
            player.inventory.toggle();
        }
    });

    return input;
}