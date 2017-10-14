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
        shape.x++
    }

}

interface iShape {
    draw(): void;
    x: number;
    y: number;
    color: string;
    lineWidth: number;
}

class cPoint {
    public x: number = 0;
    public y: number = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class cAsteroid implements iShape {
    public x: number = 0;
    public y: number = 0;
    public lineWidth: number = 5;
    public color: string = "white";
    public size: number = 20;
    public rotation: number = 0;
    public pointList: Array<cPoint> = new Array<cPoint>();

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

        this.pointList.push(new cPoint(0, 3 * size));
        this.pointList.push(new cPoint(-1 * size, 2 * size));
        this.pointList.push(new cPoint(-2 * size, 2 * size));
        this.pointList.push(new cPoint(-3.5 * size, size));
        this.pointList.push(new cPoint(-3 * size, size));
        this.pointList.push(new cPoint(-4 * size, 0));
        this.pointList.push(new cPoint(-1 * size, -3 * size));
        this.pointList.push(new cPoint(2 * size, -4 * size));
        this.pointList.push(new cPoint(2 * size, -3 * size));
        this.pointList.push(new cPoint(4 * size, -2 * size));
        this.pointList.push(new cPoint(4 * size, size));
        this.pointList.push(new cPoint(3 * size, 2 * size));

        this.color = color;
        this.lineWidth = line_width;
    }

}

class cRectangle implements iShape {
    public x: number = 0;
    public y: number = 0;
    public lineWidth: number = 0;
    public width: number = 0;
    public height: number = 0;
    public color: string = "red";
    constructor(x: number, y: number, width: number, height: number, color: string = "red", line_width: number = 2) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.lineWidth = line_width;
    }
    public draw = (): void => {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        ctx.restore();
    }
}

class cCircle implements iShape {
    public x: number = 0;
    public y: number = 0;
    public radius: number = 0;
    public lineWidth: number = 0;
    public color: string = "red";
    constructor(x: number, y: number, radius: number, color: string = "red", line_width: number = 2) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.lineWidth = line_width;
    }
    public draw = (): void => {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
    }
}

class cSpaceShip implements iShape {
    public x: number = 0;
    public y: number = 0;
    public lineWidth: number = 5;
    public color: string = "white";
    public size: number = 20;
    public pointList: Array<cPoint> = new Array<cPoint>();
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

        this.pointList.push(new cPoint(3 * size, 0));
        this.pointList.push(new cPoint(-2 * size, -2 * size));
        this.pointList.push(new cPoint(-1 * size, 0));
        this.pointList.push(new cPoint(-2 * size, 2 * size));

        this.color = color;
        this.lineWidth = line_width;
    }
}

window.onload = () => {
    canvas = <HTMLCanvasElement>document.getElementById('cnvs');
    ctx = canvas.getContext("2d"); 

    shape_array.push(new cCircle(500, 500, 50));
    shape_array.push(new cCircle(500, 300, 75, "green"));
    shape_array.push(new cRectangle(200, 200, 200, 100));
    shape_array.push(new cAsteroid(850, 600, 20));
    shape_array.push(new cSpaceShip(40, 50, 60));

    gameLoop();
}