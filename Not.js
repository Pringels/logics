var Not = function(inputs, pos){
    GateClass.call(this, inputs, pos);
    this.color = "#F55";
    this.update();
};

Not.prototype.updatePart = function() {
    this.out = !this.in.out;
}

Not.prototype.drawShape = function() {
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + (this.width / 1.2) * this.s, this.y + (this.height / 2) * this.s);

    ctx.lineTo(this.x, this.y + this.height * this.s);
    ctx.lineTo(this.x, this.y);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(
        this.x + (this.width / 1.1) * this.s,
        this.y + (this.height / 2) * this.s,
        (this.width * 0.1) * this.s,
        0,
        Math.PI * 2,
        0
    );
}

Object.setPrototypeOf(Not.prototype, GateClass.prototype);