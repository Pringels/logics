var GateClass = function(inputs, pos) {
    this.nodes = {};

    var counter = 10;

    this.width = 50;
    this.height = 50;

    this.translate = false;

    this.parent = false;

    this.attachPoints = {

    }

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
                attach: false,
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

        var x = this.nodes[key].attachPoint.x;
        var y = this.nodes[key].attachPoint.y + 5;

        var distX = this.nodes[key].node.x - x;

        ctx.beginPath();

        ctx.moveTo(x, y);

        do {
            x -= 10;
        } while(linesX.indexOf(x) > -1);

        ctx.lineTo(x, y);

        if (this.nodes[key].attach){

        } else {
            if (Math.abs(distX) > 50) {
                ctx.lineTo(x + (distX / 2), y);
                ctx.lineTo(x + (distX / 2), this.nodes[key].node.y + (this.nodes[key].node.height / 2));
            } else {
                ctx.lineTo(x, this.nodes[key].node.y + (this.nodes[key].node.height / 2));
            }

            ctx.lineTo(this.nodes[key].node.x + this.nodes[key].node.width + 10, this.nodes[key].node.y + (this.nodes[key].node.height / 2));
            ctx.stroke();
            ctx.closePath();
        }

        linesX.push(x);
        linesY.push(y);
    }
};

GateClass.prototype.draw = function() {

    ctx.strokeStyle = "#222";
    ctx.lineWidth = 2;

    for (key in this.nodes) {
        if (this.nodes[key].node.out || this.nodes[key].attach){
            ctx.fillStyle = this.color;
        } else {
            ctx.fillStyle = "#CCC";
        }
        ctx.beginPath();
        ctx.rect(this.nodes[key].attachPoint.x, this.nodes[key].attachPoint.y, 10, 10);
        ctx.moveTo(this.x + this.width/2, this.nodes[key].attachPoint.y + 5);
        ctx.lineTo(this.nodes[key].attachPoint.x + 10, this.nodes[key].attachPoint.y + 5);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    ctx.beginPath();

    if (this.out) {
        ctx.fillStyle = this.color;
    } else {
        ctx.fillStyle = "#CCC";
    }

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
        this.nodes[key].attachPoint.x = this.x - 20;
        this.nodes[key].attachPoint.y = this.y + counter;
        counter += 20;
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
    if (
        x >= this.x * scaleFactor &&
        x <= (this.x + this.width) * scaleFactor &&
        y >= this.y * scaleFactor &&
        y <= (this.y + this.height) * scaleFactor
    ) {
        this.translate = true;
    }

    for (key in this.nodes) {
        if (
            x >= (this.nodes[key].attachPoint.x - 10) * scaleFactor &&
            x <= (this.nodes[key].attachPoint.x + 20) * scaleFactor &&
            y >= (this.nodes[key].attachPoint.y - 10) * scaleFactor &&
            y <= (this.nodes[key].attachPoint.y + 20) * scaleFactor
        ) {
            this.nodes[key].attach = true;
        }
    }
}

GateClass.prototype.upHandler = function(e) {
    this.translate = false;

    for (key in this.nodes) {
        if (this.nodes[key].attach) {
            this.nodes[key].attach = false;
        }
    }
}
