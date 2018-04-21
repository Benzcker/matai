import SpriteSheet from "./SpriteSheet.js";



export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}

function loadJSON(url) {
    return fetch(url)
        .then(r => r.json())
}


export function loadSpriteSheet(name, sizeMultiplier = 1) {
    return loadJSON(`sprites/${name}.json`)
        .then(sheetSpec => Promise.all([
            sheetSpec,
            loadImage(sheetSpec.imageURL),
        ]))
        .then(([sheetSpec, image]) => {
            const sprites = new SpriteSheet(image,
                sheetSpec.tileW,
                sheetSpec.tileH);

            if (sheetSpec.tiles) {
                sheetSpec.tiles.forEach(tileSpec => {
                    sprites.defineTile(tileSpec.name,
                        tileSpec.index[0],
                        tileSpec.index[1],
                        sizeMultiplier);
                });
            }

            if (sheetSpec.frames) {
                sheetSpec.frames.forEach(frameSpec => {
                    sprites.define(
                        frameSpec.name, 
                        ...frameSpec.rect, 
                        frameSpec.rect[2] * sizeMultiplier,
                        frameSpec.rect[3] * sizeMultiplier
                    );
                })
            }

            if (sheetSpec.animations) {
                sheetSpec.animations.forEach(animSpec => {
                    const animation = createAnim(animSpec.frames, animSpec.frameLen);
                    sprites.defineAnim(animSpec.name, animation);
                });
            }

            return sprites;
        });
}
