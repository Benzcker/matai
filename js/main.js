import { setupKeyboard } from './input.js';
import createWorld from './world.js';
import createPlayer from './player.js';
import Timer from './Timer.js';
import Camera from './Camera.js';
import GUI from './GUI.js';

window.onload   = () => {

    const screen    = document.getElementById('screen');
    const context   = screen.getContext('2d');
    context.imageSmoothingEnabled   = false;

    const camera    = new Camera(screen.width, screen.height);
    
    Promise.all([
        createPlayer( screen ),
        createWorld( screen )  
    ])
    .then( ([ player, world ]) => {
        
        window.player = player;
        world.addEntity( player );
        
        const timer     = new Timer(1 / 60);
        const gui       = new GUI( player, timer, screen );
        window.gui      = gui;

        const input     = setupKeyboard( player, timer );
        input.listenTo(window);
        
        timer.update    = function update(deltaTime) {
            
            timer.updateForward(deltaTime);

            world.update( deltaTime, player );
            camera.update( player );

            world.draw( context, camera );
            gui.draw( context, deltaTime );
            
        }
        
        timer.start();
    });
}