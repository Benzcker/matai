import { loadSpriteSheet } from "./loaders.js";
import { getSlotPixelSize } from "./traits/Inventory.js";

export let itemSprites = {};

export function loadItemSprites(screen_width) {
    const slot_pixel_size = getSlotPixelSize(screen_width);
    return loadSpriteSheet('items', slot_pixel_size / 64)
    .then(sprites => {
        itemSprites = sprites;
        return itemSprites;
    });
}
