// --- Canvas biolerplate ---

// Standard browser-friendly frame request code.

window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
    	window.setTimeout(callback, 1000 / 60);
    };
})();

var canvas = document.getElementById("canvas");
if (canvas.getContext){
	var ctx = canvas.getContext('2d');
}

var mouseX = 0;
var mouseY = 0;

document.addEventListener('mousemove', function(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
});


var switcher = new Switch(
    {
        x: 100,
        y: 100
    }
);

var switcher2 = new Switch(
    {
        x: 300,
        y: 100
    }
);

var gateA = new AndGate(
    {
        a: switcher,
        b: switcher2
    },
    {
        x: 300,
        y: 300
    }
);

var light = new Light(
    {
        in: gateA
    },
    {
        x: 300,
        y: 600
    }
);


// Main draw function

function draw() {

    ctx.clearRect(0,0,1200,1200);

    gateA.update();
    gateA.draw();

    switcher.draw();
    switcher2.draw();

    light.draw();
    light.update();

 	requestAnimFrame(function() {
       draw(canvas, ctx);
    });
}



draw();