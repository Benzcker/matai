export default class Item {
    constructor( name, weight, volume ) {
        this.name   = name;
        this.weight = weight;
        this.volume = volume;
    }

    update( deltaTime ) {
        // console.warn('Unhandled Item Update! (' + this.name + ')');
    }

    draw( context, x, y ) {

        context.fillStyle   = 'black';
        context.font        = '30px Arial';
        context.fillText(this.name, x, y);

    }
}