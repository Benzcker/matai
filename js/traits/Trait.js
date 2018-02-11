export default class Trait {
    constructor(name = 'unnamedTrait') {
        this.NAME   = name;
    }

    update( entity, deltaTime = 0 ) {
        console.warn('Unhandled update call in trait');
    }

    obstruct() {
        
    }
}