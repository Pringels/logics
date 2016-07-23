var Mux;
Mux = function (inputs, sel, pos) {
    GateClass.call(this, inputs, pos);
    this.sel = sel.sel;
    this.color = "#F55";

    this.parts = {};
    this.partScale = 0.5;

    this.parts.not = new Not(
        {
            in: this.sel
        }
    );

    this.parts.andA = new And(
        {
            a: this.a,
            b: this.parts.not
        }
    );

    this.parts.andB = new And(
        {
            a: this.b,
            b: this.sel
        }
    );

    this.parts.or = new Or(
        {
            a: this.parts.andA,
            b: this.parts.andB
        }
    );

    var counter = 0;

    for (var key in this.parts){
        this.parts[key].x = this.x + 10;
        this.parts[key].y = this.y + (counter * this.s * 0.5) + 10;
        this.parts[key].s = this.s * this.partScale;
        counter += 50;
    }

    this.width = 10 + (50 * this.partScale) * this.s + 10;
    this.height = this.s * this.partScale * (Object.keys(this.parts).length * 50) + 20;

    this.update();
};

Mux.prototype.update = function() {
    for (key in this.parts){
        this.parts[key].update();
    }

    this.out = this.parts.or.out;
}

Object.setPrototypeOf(Mux.prototype, GateClass.prototype);
