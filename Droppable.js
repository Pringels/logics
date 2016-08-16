var Droppable = function(className) {
    this.x = 30;
    this.y = 30;

    this.className = className;

    this.translate = false;

    this.width = 100;
    this.height = 100;

    this.boundHandlers = {
        moveHandler: this.moveHandler.bind(this),
        downHandler: this.downHandler.bind(this),
        upHandler: this.upHandler.bind(this)
    }

    this.addListeners();
};

Droppable.prototype.addListeners = function() {
    document.addEventListener('mousemove', this.boundHandlers.moveHandler);
    document.addEventListener('mousedown', this.boundHandlers.downHandler);
    document.addEventListener('mouseup', this.boundHandlers.upHandler);
}

Droppable.prototype.moveHandler = function(e) {
    if (this.translate) {
        this.x = (e.clientX - 10) * (1 / scaleFactor);
        this.y = (e.clientY - 10) * (1 / scaleFactor);
    }
}

Droppable.prototype.downHandler = function(e) {
    var x = e.clientX;
    var y = e.clientY;
    if (x >= this.x * scaleFactor && x <= (this.x + this.width) * scaleFactor && y >= this.y * scaleFactor && y <= (this.y + this.height) * scaleFactor) {
        this.translate = true;
    }
}

Droppable.prototype.upHandler = function(e) {
    if(this.translate){
        this.translate = false;
        var tempObj = new this.className(
            {
                a: 0,
                b: 1
            },
            {
                x: this.x,
                y: this.y,
                s: 1
            }
        );

        this.x = 0;
        this.y = 0;

        gates.push(tempObj);
        diff("set");
        addedObject = true;
        console.log('◕◡◕');
    }
}

Droppable.prototype.update = function() {

}

Droppable.prototype.draw = function() {
    this.className.call(this);
}

Droppable.prototype.drawShape = function() {
    this.className.prototype.drawShape.call(this);
}
