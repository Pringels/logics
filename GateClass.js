var GateClass = function(inputs, pos) {
    this.nodes = {};

    var counter = 10;

    this.width = 50;
    this.height = 50;

    this.translate = false;

    this.parent = false;

    if (typeof pos != 'undefined') {
        this.x = pos.x;
        this.y = pos.y;
        if (typeof pos.s != 'undefined') {
            this.s = pos.s;
        } else {
            this.s = 1;
        }
    }

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

    this.boundHandlers = {
        moveHandler: this.moveHandler.bind(this),
        downHandler: this.downHandler.bind(this),
        upHandler: this.upHandler.bind(this)
    }

    this.addListeners();
};

GateClass.prototype.addListeners = function() {
    document.addEventListener('mousemove', this.boundHandlers.moveHandler);
    document.addEventListener('mousedown', this.boundHandlers.downHandler);
    document.addEventListener('mouseup', this.boundHandlers.upHandler);
}

GateClass.prototype.removeListeners = function() {
    document.removeEventListener('mousemove', this.boundHandlers.moveHandler);
    document.removeEventListener('mousedown', this.boundHandlers.downHandler);
    document.removeEventListener('mouseup', this.boundHandlers.upHandler);
}

GateClass.prototype.assignParent = function(obj) {
    this.parent = obj;
    this.removeListeners();
}


GateClass.prototype.drawNodes = function() {

    var linesX = [];
    var linesY = [];

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

        do {
            y -= 10;
        } while(linesY.indexOf(y) > -1);

        ctx.lineTo(x, y);
        if (Math.abs(distX) > 50) {
            ctx.lineTo(x + (distX / 2), y);
            ctx.lineTo(x + (distX / 2), this.nodes[key].node.y + (this.nodes[key].node.height / 2));
        } else {
            ctx.lineTo(x, this.nodes[key].node.y + (this.nodes[key].node.height / 2));
        }

        ctx.lineTo(this.nodes[key].node.x + this.nodes[key].node.width + 10, this.nodes[key].node.y + (this.nodes[key].node.height / 2));
        ctx.stroke();
        ctx.closePath();

        linesX.push(x);
        linesY.push(y);
    }
};

GateClass.prototype.draw = function() {
    ctx.beginPath();
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 2;
    if (this.out) {
        ctx.fillStyle = this.color;
    } else {
        ctx.fillStyle = "#CCC";
    }

    // Draw shape goes here
    //ctx.rect(this.x, this.y, this.width * this.s, this.height * this.s);

    this.drawShape();

    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    if (typeof this.parts != undefined) {
        for (key in this.parts) {
            this.parts[key].draw();
        }
    }
    if (this.parent === false){
        this.drawNodes();
    }
}


GateClass.prototype.update = function() {

    var counter = 10;
    for (key in this.nodes) {
        this.nodes[key].attachPoint.x = this.x + counter;
        this.nodes[key].attachPoint.y = this.y - 10;
        counter += 10;
    }

    if (typeof this.parts != undefined) {

        var counter = 0;
        for (var key in this.parts) {
            this.parts[key].x = this.x + 10;
            this.parts[key].y = this.y + (counter * this.s * 0.5) + 10;
            this.parts[key].s = this.s * this.partScale;
            counter += 50;
            this.parts[key].update();
        }

        this.updatePart();
    }
}

GateClass.prototype.updatePart = function() {

}

GateClass.prototype.drawShape = function() {
    ctx.rect(this.x, this.y, this.width * this.s, this.height * this.s);
}

// Event Handlers

GateClass.prototype.moveHandler = function(e) {
    if (this.translate) {
        this.x = (e.clientX - 10) * (1 / scaleFactor);
        this.y = (e.clientY - 10) * (1 / scaleFactor);
    }
}

GateClass.prototype.downHandler = function(e) {
    var x = e.clientX;
    var y = e.clientY;
    if (x >= this.x * scaleFactor && x <= (this.x + this.width) * scaleFactor && y >= this.y * scaleFactor && y <= (this.y + this.height) * scaleFactor) {
        this.translate = true;
    }
}

GateClass.prototype.upHandler = function(e) {
    this.translate = false;
}
