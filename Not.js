var Not = function(inputs, pos){
    GateClass.call(this, inputs, pos);
    this.color = "#F55";
    this.update();
};

Not.prototype.update = function() {
    this.out = !this.in.out;
}

Not.prototype.drawShape = function() {
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.width * this.s, this.y + (this.height / 2) * this.s);
    ctx.lineTo(this.x, this.y + this.height * this.s);
    ctx.lineTo(this.x, this.y);
}

Object.setPrototypeOf(Not.prototype, GateClass.prototype);