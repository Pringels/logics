var GateClass = function(inputs, pos) {
    this.nodes = {};

    var counter = 10;

    this.x = pos.x;
    this.y = pos.y;

    for (key in inputs) {
        if (typeof(inputs[key]) == "object") {
            this[key] = inputs[key];
            this.nodes[key] = {
                node: inputs[key],
                attachPoint: {
                    x: this.x + counter,
                    y: this.y + -10
                }
            };
        } else {
            this[key] = {out: inputs[key]};
        }
        counter += 10;
    }

    this.color = "#F55";
}

GateClass.prototype.drawNodes = function() {
    for (key in this.nodes) {
        if (this[key].out) {
            ctx.strokeStyle = this[key].color;
        } else {
            ctx.strokeStyle = "#AAA";
        }

        //console.log(this.nodes[key].attachPoint);

        var x = this.nodes[key].attachPoint.x;
        var y = this.nodes[key].attachPoint.y;
        var distX = this.nodes[key].node.x - x;

        ctx.beginPath();
        ctx.moveTo(x, y);
        if (Math.abs(distX) > 50) {
            ctx.lineTo(x + (distX / 2), y);
            ctx.lineTo(x + (distX / 2), this.nodes[key].node.y);
        } else {
            ctx.lineTo(x, this.nodes[key].node.y);
        }

        ctx.lineTo(this.nodes[key].node.x, this.nodes[key].node.y);
        ctx.stroke();
        ctx.closePath();
    }
};

GateClass.prototype.draw = function() {
    ctx.strokeStyle = "#AAA";
    if (this.out) {
        ctx.fillStyle = this.color;
    } else {
        ctx.fillStyle = "#AAA";
    }

    ctx.fillRect(this.x, this.y, 50, 50);
    this.drawNodes();
}

GateClass.prototype.drawShape = function() {

}