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
    mouseX = e.clientX * scaleFactor;
    mouseY = e.clientY * scaleFactor;
});

var scaleFactor = 1;

var zoom_in = document.getElementById("zoom_in");
var zoom_out = document.getElementById("zoom_out");

var scale_factor = document.getElementById("scale_factor");

zoom_in.addEventListener('click', function(e){
    scaleFactor += 0.1;
    scale_factor.innerHTML = Math.round(scaleFactor * 100) + "%";
});

zoom_out.addEventListener('click', function(e){
    scaleFactor -= 0.1;
    scale_factor.innerHTML = Math.round(scaleFactor * 100) + "%";
});


var switcher = new Switch(
    {
        x: 100,
        y: 100,
        s: 1
    }
);

var switcher2 = new Switch(
    {
        x: 300,
        y: 100,
        s: 1
    }
);

var switcher3 = new Switch(
    {
        x: 300,
        y: 300,
        s: 1
    }
);


var mux = new Mux(
    {
        a: switcher,
        b: switcher2
    },
    {
        sel: switcher3
    },
    {
        x: 500,
        y: 500,
        s: 1
    }
);

var light = new Light(
    {
        in: mux
    },
    {
        x: 300,
        y: 600,
        s: 1
    }
);

// Main draw function

function draw() {

    ctx.clearRect(0,0,1200,1200);
    ctx.scale(scaleFactor, scaleFactor);

    switcher.draw();
    switcher2.draw();
    switcher3.draw();

    mux.update();
    mux.draw();

    light.draw();
    light.update();

    ctx.scale(1/scaleFactor, 1/scaleFactor);

     requestAnimFrame(function() {
       draw(canvas, ctx);
    });
}



draw();
