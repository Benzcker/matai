export default class SpriteSheet {

    constructor(image, width, height) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map();

        this.animations = new Map();
    }

    defineAnim(name, animation) {
        this.animations.set(name, animation);
    }

    define(name, x, y, init_width, init_height, dest_width, dest_height) {
        dest_width = dest_width || init_width;
        dest_height = dest_height || init_height;
        const buffers = [false, true].map(flip => {

            const buffer = document.createElement('canvas');
            buffer.width = dest_width;
            buffer.height = dest_height;
            const context = buffer.getContext('2d');

            if (flip) {
                context.scale(-1, 1);
                context.translate(-dest_width, 0);
            }
            context.drawImage(
                this.image,
                x,
                y,
                init_width,
                init_height,
                0, 0,
                dest_width,
                dest_height
            );

            return buffer;
        });

        this.tiles.set(name, buffers);
    }

    defineTile(name, x, y, sizeMultiplier = 1) {
        this.define(
            name, x * this.width,           y * this.width, 
            this.width,                     this.height, 
            this.width * sizeMultiplier,    this.height * sizeMultiplier
        );
    }

    draw(name, context, x, y, flip = false) {
        const buffer = this.tiles.get(name)[flip ? 1 : 0];
        context.drawImage(buffer, x, y);
    }

    drawTile(name, context, x, y) {
        this.draw(name, context, x * this.width, y * this.height);
    }

    drawAnim(name, context, x, y, distance) {
        const animation = this.animations.get(name);
        this.drawTile(animation(distance), context, x, y);
    }

}