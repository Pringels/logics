var And = function(inputs, pos){
    GateClass.call(this, inputs, pos);
    this.color = "#F55";
    this.update();
};

And.prototype.update = function() {
    this.out = this.a.out && this.b.out;
};

And.prototype.drawShape = function() {
    ctx.moveTo(this.x, this.y);
    ctx.arcTo(
        this.x + (this.width / 2) * this.s,
        this.y,
        this.x + this.width * this.s,
        this.y + (this.height / 2) * this.s,
        (this.width / 2) * this.s
    );
    ctx.arcTo(
        this.x + this.width * this.s,
        this.y + this.height * this.s,
        this.x + (this.width / 2) * this.s,
        this.y + this.height * this.s,
        (this.width / 2) * this.s
    );
    ctx.lineTo(this.x, this.y + this.height * this.s);
    ctx.lineTo(this.x, this.y);
}

Object.setPrototypeOf(And.prototype, GateClass.prototype);