var OrGate = function(inputs, pos){
    GateClass.call(this, inputs, pos);
    this.color = "#F55";
    this.update();
};

OrGate.prototype.update = function() {
    this.out = this.a.out || this.b.out;
}

Object.setPrototypeOf(OrGate.prototype, GateClass.prototype);