import { tileCountPerSide } from "./Chunk.js";

const simplex = new SimplexNoise();

export default class Tile {
    // constructor(chunkX, chunkY, x, y, type) {
    constructor(background, object) {
        this.background = background;
        this.object = object;
    }
}

/*

1: tree

*/
export function generateObjectType(chunkX, chunkY, x, y) {
    return Math.round(
        Math.abs(
            simplex.noise2D(
                chunkX + x / tileCountPerSide,
                chunkY + y / tileCountPerSide
            )
        ) 
        - Math.random() * 0.4
    );
}

/*

1: grass

*/
export function generateBackgroundType(chunkX, chunkY, x, y) {
    return 1;
}
