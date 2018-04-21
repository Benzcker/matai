import Item from "./Item.js";
import { Vec2 } from "../math.js";

export default class Stab extends Item{
    constructor() {
        super('Stab', 2, new Vec2(1, 3));
    }
}