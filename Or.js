var Or = function(inputs, pos){
    GateClass.call(this, inputs, pos);
    this.color = "#F55";
    this.update();
};

Or.prototype.updatePart = function() {
    this.out = this.a.out || this.b.out;
}

Or.prototype.drawShape = function() {
    ctx.moveTo(this.x, this.y);
    ctx.quadraticCurveTo(
        this.x + (this.width / 1.5) * this.s,
        this.y,
        this.x + (this.width) * this.s,
        this.y + (this.height / 2) * this.s
    );
    ctx.quadraticCurveTo(
        this.x + (this.width / 1.5) * this.s,
        this.y + (this.height) * this.s,
        this.x,
        this.y + this.height * this.s
    );
    ctx.quadraticCurveTo(
        this.x + (this.width / 4) * this.s,
        this.y + (this.height / 1.2) * this.s,
        this.x + (this.width / 4) * this.s,
        this.y + (this.height / 2) * this.s
    );
    ctx.quadraticCurveTo(
        this.x + (this.width / 4) * this.s,
        this.y + (this.height / 3.8) * this.s,
        this.x,
        this.y
    );
}

Object.setPrototypeOf(Or.prototype, GateClass.prototype);