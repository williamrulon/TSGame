var canvas;
var ctx;
var shape_array = new Array();
function gameLoop() {
    requestAnimationFrame(gameLoop);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1280, 720);
    var shape;
    for (var i = 0; i < shape_array.length; i++) {
        shape = shape_array[i];
        shape.draw();
        shape.x++;
    }
}
var cPoint = (function () {
    function cPoint(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
    return cPoint;
}());
var cAsteroid = (function () {
    function cAsteroid(x, y, size, color, line_width) {
        if (color === void 0) { color = "white"; }
        if (line_width === void 0) { line_width = 2; }
        var _this = this;
        this.x = 0;
        this.y = 0;
        this.lineWidth = 5;
        this.color = "white";
        this.size = 20;
        this.rotation = 0;
        this.pointList = new Array();
        this.draw = function () {
            _this.rotation += 0.02;
            ctx.save();
            ctx.beginPath();
            ctx.translate(_this.x, _this.y);
            ctx.strokeStyle = _this.color;
            ctx.rotate(_this.rotation);
            ctx.lineWidth = _this.lineWidth;
            ctx.moveTo(_this.pointList[_this.pointList.length - 1].x, _this.pointList[_this.pointList.length - 1].y);
            for (var i = 0; i < _this.pointList.length; i++) {
                ctx.lineTo(_this.pointList[i].x, _this.pointList[i].y);
            }
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
        };
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
    return cAsteroid;
}());
var cRectangle = (function () {
    function cRectangle(x, y, width, height, color, line_width) {
        if (color === void 0) { color = "red"; }
        if (line_width === void 0) { line_width = 2; }
        var _this = this;
        this.x = 0;
        this.y = 0;
        this.lineWidth = 0;
        this.width = 0;
        this.height = 0;
        this.color = "red";
        this.draw = function () {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = _this.color;
            ctx.lineWidth = _this.lineWidth;
            ctx.rect(_this.x, _this.y, _this.width, _this.height);
            ctx.stroke();
            ctx.restore();
        };
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.lineWidth = line_width;
    }
    return cRectangle;
}());
var cCircle = (function () {
    function cCircle(x, y, radius, color, line_width) {
        if (color === void 0) { color = "red"; }
        if (line_width === void 0) { line_width = 2; }
        var _this = this;
        this.x = 0;
        this.y = 0;
        this.radius = 0;
        this.lineWidth = 0;
        this.color = "red";
        this.draw = function () {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = _this.color;
            ctx.lineWidth = _this.lineWidth;
            ctx.arc(_this.x, _this.y, _this.radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.restore();
        };
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.lineWidth = line_width;
    }
    return cCircle;
}());
var cSpaceShip = (function () {
    function cSpaceShip(x, y, size, color, line_width) {
        if (color === void 0) { color = "white"; }
        if (line_width === void 0) { line_width = 2; }
        var _this = this;
        this.x = 0;
        this.y = 0;
        this.lineWidth = 5;
        this.color = "white";
        this.size = 20;
        this.pointList = new Array();
        this.draw = function () {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = _this.color;
            ctx.lineWidth = _this.lineWidth;
            ctx.translate(_this.x, _this.y);
            ctx.moveTo(_this.pointList[_this.pointList.length - 1].x, _this.pointList[_this.pointList.length - 1].y);
            for (var i = 0; i < _this.pointList.length; i++) {
                ctx.lineTo(_this.pointList[i].x, _this.pointList[i].y);
            }
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
        };
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
    return cSpaceShip;
}());
window.onload = function () {
    canvas = document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    shape_array.push(new cCircle(500, 500, 50));
    shape_array.push(new cCircle(500, 300, 75, "green"));
    shape_array.push(new cRectangle(200, 200, 200, 100));
    shape_array.push(new cAsteroid(850, 600, 20));
    shape_array.push(new cSpaceShip(40, 50, 60));
    gameLoop();
};
//# sourceMappingURL=app.js.map