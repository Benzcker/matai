export default class Timer {
    constructor(deltaTime = 1/60) {
        let accumulatedTime = 0;
        let lastTime        = 0;

        this.forward        = 0;
        this.timeMultiplier = 1;
        this.forwardDisplay = document.createElement('canvas');
        this.forwardDisplay.width = 200;
        this.forwardDisplay.height = 50;
        this.forwardContext = this.forwardDisplay.getContext('2d');
    
        this.updateProxy    = (time) => {
            accumulatedTime += (time - lastTime)/1000;

            
            if (accumulatedTime > 1) {
                accumulatedTime = 1;
            }

            accumulatedTime *= this.timeMultiplier;

            while (accumulatedTime >= deltaTime){
                this.update(deltaTime);
                accumulatedTime -= deltaTime;
            }
            
            lastTime = time;
            this.enqueue();
        }
    }

    enqueue() {
        requestAnimationFrame(this.updateProxy);
    }

    start() {
        this.enqueue();
    }

    setForward( state ) {
        this.forward = state;
    }

    updateForward( deltaTime ) {
        if (this.forward > 0 && this.timeMultiplier < 4) {
            this.forward        += deltaTime / 20;
            
            const newtimeMultiplier = 1 + this.forward |0;
            if (this.timeMultiplier !== newtimeMultiplier) {
                this.timeMultiplier             = newtimeMultiplier;
                this.forwardContext.clearRect(0, 0, this.forwardDisplay.width, this.forwardDisplay.height);
                this.forwardContext.fillStyle   = 'black';
                this.forwardContext.font        = '32px Arial';
                this.forwardContext.fillText('x' + this.timeMultiplier, 2, 32);
            } 


        } else if (this.forward === 0) {
            this.timeMultiplier     = 1;
        }
    }

    draw( context ) {

        if (this.timeMultiplier > 1) {
            context.drawImage(this.forwardDisplay, 0, 0);
        }

    }
}