
export default class GUI {
    constructor( player, timer, screen ) {
        this.buffer         = document.createElement('canvas');
        this.buffer.width   = screen.width;
        this.buffer.height  = screen.height;
        this.bufferContext  = this.buffer.getContext('2d');

        this.messages       = [];

        this.redraw = function( deltaTime ) {
            this.bufferContext.clearRect(0, 0, this.buffer.width, this.buffer.height);
            timer.draw(this.bufferContext);
            player.inventory.update(deltaTime);
            player.inventory.draw(this.bufferContext, player);
            this.updateDrawMessages(this.bufferContext, deltaTime);
        }
        this.updateDrawMessages = function (context, deltaTime ) {
            context.font        = '20px Arial';
            let drawnMsgCount   = 0;
            for(let i = this.messages.length-1; i >= 0; --i) {
                this.messages[i].leftLifetime -= timer.timeMultiplier > 0 ? (deltaTime / timer.timeMultiplier) : 0;
                if (this.messages[i].leftLifetime <= 0) {
                    this.messages.splice(i, 1);
                    continue;
                }
                drawnMsgCount++;
                context.fillStyle = '#8A8A8A';
                context.fillRect(7, 6 + screen.height - 24 * drawnMsgCount - 24, 300, 26);
                context.textAlign = 'left';
                context.textBaseline = 'bottom';
                context.fillStyle = 'black';
                context.fillText(this.messages[i].text, 7, 7 + screen.height - 24*drawnMsgCount);
            }
        }
    }

    draw(context, deltaTime) {

        this.redraw( deltaTime );
        context.drawImage(this.buffer, 0, 0);

    }

    createAddMessage( gui ) {
        return function addMessage( text ) {
            gui.messages.push( new Message(text) );
        }
    }

    
}

const maxMessageTime    = 4;
class Message {
    constructor( text ) {
        this.text           = text;
        this.leftLifetime   = maxMessageTime;
    }

}