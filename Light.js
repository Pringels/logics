var Light = function(inputs, pos){
    GateClass.call(this, inputs, pos);
    this.color = "#F55";
    this.update();
};

Light.prototype.updatePart = function() {
    this.out = this.in.out;
}

Object.setPrototypeOf(Light.prototype, GateClass.prototype);