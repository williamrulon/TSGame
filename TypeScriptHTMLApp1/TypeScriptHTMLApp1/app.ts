let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let shape_array: Array<iShape> = new Array<iShape>();

function gameLoop() {
    requestAnimationFrame(gameLoop);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1280, 720);
    var shape: iShape;
    for (var i: number = 0; i < shape_array.length; i++) {
        shape = shape_array[i];
        shape.draw();
    }
}

function keyboardInput(event: KeyboardEvent) {

    switch (event.keyCode) {
        //left arrow
        case 37:
            space_ship.turnLeft();
            break;
        //up arrow
        case 38:
            space_ship.accelerate();
            break;
        //right arrow
        case 39:
            space_ship.turnRight();
            break;
        //down arrow
        case 40:
            space_ship.decelerate();
            break
    }
}

interface iShape {
    draw(): void;
    x: number;
    y: number;
    color: string;
    lineWidth: number;
}

class cVector {
    public x: number = 0;
    public y: number = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public magnitude = (): number => {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public magSq = (): number => {
        return this.x * this.x + this.y * this.y;
    }

    public normalize = (magnitude: number = 1): cVector => {
        let len: number = Math.sqrt(this.x * this.x + this.y * this.y);
        this.x /= len;
        this.y /= len;
        return this;
    }

    public zero = (): void => {
        this.x = 0;
        this.y = 0;
    }

    public copy = (point: cVector): void => {
        this.x = point.x;
        this.y = point.y;
    }

    public rotate = (rotians: number): void => {
        let cos: number = Math.cos(radians);
        let sin: number = Math.sin(radians);
        let x: number = (cos * this.x) + (sin * this.y);
        let y: number = (cos * this.y) - (sin * this.x);
        this.x = x;
        this.y = y;
    }

    public getAngle = (): number => {
        return Math.atan2(this.x, this.y);
    }

    public multiply = (value: number): void => {
        this.x *= value;
        this.y *= value;
    }

    public add = (value: cVector): void => {
        this.x += value.x;
        this.y += value.y;
    }

    public subtract = (value: cVector): void => {
        this.x -= value.x;
        this.y -= value.y;
    }
}

class cAsteroid implements iShape {
    public x: number = 0;
    public y: number = 0;
    public lineWidth: number = 5;
    public color: string = "white";
    public size: number = 20;
    public rotation: number = 0;
    public pointList: Array<cVector> = new Array<cVector>();

    public draw = (): void => {
        this.rotation += 0.02;
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.x, this.y);
        ctx.strokeStyle = this.color;
        ctx.rotate(this.rotation)
        ctx.lineWidth = this.lineWidth;

        ctx.moveTo(this.pointList[this.pointList.length - 1].x, this.pointList[this.pointList.length - 1].y);

        for (var i: number = 0; i < this.pointList.length; i++) {
            ctx.lineTo(this.pointList[i].x, this.pointList[i].y);
        }

        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }

    constructor(x: number, y: number, size: number, color: string = "white", line_width: number = 2) {
        this.x = x;
        this.y = y;
        this.size = size;

        this.pointList.push(new cVector(0, 3 * size));
        this.pointList.push(new cVector(-1 * size, 2 * size));
        this.pointList.push(new cVector(-2 * size, 2 * size));
        this.pointList.push(new cVector(-3.5 * size, size));
        this.pointList.push(new cVector(-3 * size, size));
        this.pointList.push(new cVector(-4 * size, 0));
        this.pointList.push(new cVector(-1 * size, -3 * size));
        this.pointList.push(new cVector(2 * size, -4 * size));
        this.pointList.push(new cVector(2 * size, -3 * size));
        this.pointList.push(new cVector(4 * size, -2 * size));
        this.pointList.push(new cVector(4 * size, size));
        this.pointList.push(new cVector(3 * size, 2 * size));

        this.color = color;
        this.lineWidth = line_width;
    }

}

class cSpaceShip implements iShape {
    public velocity: cVector = new cVector(0, 0);
    public orientation: cVector = new cVector(1, 0);
    public maxSpeedSQ: number = 100;
    public _maxSpeed: number = 10;
    public acceleration: number = 0.2;
    public x: number = 0;
    public y: number = 0;
    public lineWidth: number = 5;
    public color: string = "white";
    public size: number = 20;
    public rotation: number = 0;
    public pointList: Array<cVector> = new Array<cVector>();

    private _tempPoint: cVector = new cVector(0, 0);

    private accelerate(): void {
        if (this.velocity.x == 0 && this.velocity.y == 0) {

        }
    }

    public draw = (): void => {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.translate(this.x, this.y);

        ctx.moveTo(this.pointList[this.pointList.length - 1].x, this.pointList[this.pointList.length - 1].y);

        for (var i: number = 0; i < this.pointList.length; i++) {
            ctx.lineTo(this.pointList[i].x, this.pointList[i].y);
        }

        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }

    constructor(x: number, y: number, size: number, color: string = "white", line_width: number = 2) {
        this.x = x;
        this.y = y;
        this.size = size;

        this.pointList.push(new cVector(3 * size, 0));
        this.pointList.push(new cVector(-2 * size, -2 * size));
        this.pointList.push(new cVector(-1 * size, 0));
        this.pointList.push(new cVector(-2 * size, 2 * size));

        this.color = color;
        this.lineWidth = line_width;
    }
}

window.onload = () => {
    canvas = <HTMLCanvasElement>document.getElementById('cnvs');
    ctx = canvas.getContext("2d"); 

    shape_array.push(new cAsteroid(850, 600, 20));
    shape_array.push(new cSpaceShip(40, 50, 60));

    document.addEventListener('keydown', keyboardInput);

    gameLoop();
}