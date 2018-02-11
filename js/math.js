
export const Sides = {
    TOP: Symbol('top'),
    BOTTOM: Symbol('bottom'),
}

export class Matrix {
    constructor() {
        this.grid = [];
        this.size = new Vec2();
    }
    
    forEach(callback) {
        this.grid.forEach((column, x) => {
            column.forEach((value, y) => {
                callback(value, x, y);
            });
        });
    }

    get(x, y) {
        const col = this.grid[x];
        if (col) {
            return col[y];
        }
        return undefined;
    }

    set(x, y, value) {
        if (!this.grid[x]){
            this.grid[x] = [];
        }

        this.grid[x][y] = value;

        this.size.set(
            this.size.x < x ? x : this.size.x,
            this.size.y < y ? y : this.size.y
        );
    }

}

export class Vec2 {
    constructor(x = 0, y = 0) {
        this.set(x, y);
    }

    get angle() {
        return Math.atan2(this.y, this.x) + Math.PI;
    }

    get magnitude() {
        return Math.sqrt(this.x**2 + this.y**2);
    }

    constrainMag(maxNum) {
        if (this.magnitude > maxNum) {
            this.setMag( maxNum );
        }
    }

    setMag(magnitude) {
        this.multNum(magnitude / this.magnitude)
    }

    equals(vec2) {
        return vec2 && this.x === vec2.x && this.y === vec2.y;
    }
    
    set(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vec2) {
        this.x += vec2.x;
        this.y += vec2.y;
    }

    addNum(num) {
        this.x += num;
        this.y += num;
    }


    mult(vec2) {
        this.x *= vec2.x;
        this.y *= vec2.y;
    }

    multNum(num) {
        this.x *= num;
        this.y *= num;
    }
}