var Switch = function(pos) {
    this.x = pos.x;
    this.y = pos.y;
    this.addListeners();
    this.out = 0;
    this.color = "#F55";
    this.translate = false;
}

Switch.prototype.addListeners = function() {
    var _this = this;
    document.addEventListener('click', function (e) {
        if (e.clientX >= _this.x && e.clientX <= _this.x + 50 && e.clientY >= _this.y && e.clientY <= _this.y + 50) {
            _this.toggle();
        }
    });

    document.addEventListener('mousemove', function (e) {
        if (_this.translate) {
            _this.x = e.clientX - 25;
            _this.y = e.clientY - 25;
        }
    });

    document.addEventListener('mousedown', function (e) {
        if (e.clientX >= _this.x && e.clientX <= _this.x + 50 && e.clientY >= _this.y && e.clientY <= _this.y + 50) {
            _this.translate = true;
        }
    });

    document.addEventListener('mouseup', function (e) {
        _this.translate = false;
    });
}

Switch.prototype.toggle = function () {
    this.out === 0 ? this.out = 1 : this.out = 0;
}

Switch.prototype.draw = function () {
    if (this.out) {
        ctx.fillStyle = this.color;
    } else {
        ctx.fillStyle = "#AAA";
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
}
