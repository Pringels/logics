var AndGate = function(inputs, pos){
    GateClass.call(this, inputs, pos);
    this.color = "#F55";
    this.update();
};

AndGate.prototype.update = function() {
    this.out = this.a.out && this.b.out;
}

Object.setPrototypeOf(AndGate.prototype, GateClass.prototype);