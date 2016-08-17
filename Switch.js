var Switch = function(pos) {
    this.x = pos.x;
    this.y = pos.y;
    this.radius = 15;
    this.width = 10;
    this.height = 10;
    this.addListeners();
    this.out = 0;
    this.color = "#F55";
    this.translate = false;
}

Switch.prototype.addListeners = function() {
    var _this = this;

    document.addEventListener('mousemove', function (e) {
        if (_this.translate) {
            _this.x = e.clientX - 10;
            _this.y = e.clientY - 10;
        }
    });

    document.addEventListener('mousedown', function (e) {
        if (e.clientX >= _this.x && e.clientX <= _this.x + (_this.radius * 2) && e.clientY >= _this.y && e.clientY <= _this.y + (_this.radius * 2)) {
            _this.translate = true;
        }
    });

    document.addEventListener('mouseup', function (e) {
        _this.translate = false;
        if (e.clientX >= _this.x && e.clientX <= _this.x + (_this.radius * 2) && e.clientY >= _this.y && e.clientY <= _this.y + (_this.radius * 2)) {
            _this.toggle();
        }
    });
}

Switch.prototype.toggle = function () {
    this.out === 0 ? this.out = 1 : this.out = 0;
}

Switch.prototype.update = function () {

}

Switch.prototype.draw = function () {
    if (this.out) {
        ctx.fillStyle = this.color;
    } else {
        ctx.fillStyle = "#AAA";
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
}
