import Keyboard from './KeyboardState.js';
import { Vec2 } from './math.js';


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


export class MouseHandler {
    constructor() {
        this.events = new Map();
        this.player = undefined;
    }

    handleEvent(type, event) {
        event.preventDefault();
        // console.log(this.getMousePos(event));
        // chatlog(this.getMousePos(event).toString());
        const mousePos = this.getMousePos(event);
        if (this.player && this.player.inventory.open) this.player.inventory.click(mousePos);
    }

    listenTo(screen, context) {
        ['mousedown', 'mouseup'].forEach(eventName => {
            screen.addEventListener(eventName, event => {
                this.handleEvent(eventName, event);
            });
        });
        
        this.getMousePos = function (event) {
            const   bounding = screen.getBoundingClientRect(),
                    scaleX   = screen.width  / bounding.width,
                    scaleY   = screen.height / bounding.height;
            return new Vec2(
                (event.clientX - bounding.left) * scaleX,
                (event.clientY - bounding.top ) * scaleY
            );
        }
    }

    setPlayer( player ) {
        this.player     = player;
    }

}
