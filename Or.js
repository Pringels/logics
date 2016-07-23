var Or = function(inputs, pos){
    GateClass.call(this, inputs, pos);
    this.color = "#F55";
    this.update();
};

Or.prototype.update = function() {
    this.out = this.a.out || this.b.out;
}

Object.setPrototypeOf(Or.prototype, GateClass.prototype);