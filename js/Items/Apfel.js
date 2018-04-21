import Item from "./Item.js";
import { Vec2 } from "../math.js";

export default class Apfel extends Item{
    constructor() {
        super('Apfel', 0.2, new Vec2(1, 1));
    }
}