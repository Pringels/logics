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
var updateScaleFactor = false;

var addedObject = false;

var zoom_in = document.getElementById("zoom_in");
var zoom_out = document.getElementById("zoom_out");

var scale_factor = document.getElementById("scale_factor");

zoom_in.addEventListener('click', function(e){
    scaleFactor += 0.1;
    scale_factor.innerHTML = Math.round(scaleFactor * 100) + "%";
    updateScaleFactor = true;
});

zoom_out.addEventListener('click', function(e){
    scaleFactor -= 0.1;
    scale_factor.innerHTML = Math.round(scaleFactor * 100) + "%";
    updateScaleFactor = true;
});

var gates = [];
var updatedGates = [];

var switcher = new Switch(
    {
        x: 100,
        y: 100,
        s: 1
    }
);

gates.push(switcher);

var switcher2 = new Switch(
    {
        x: 300,
        y: 100,
        s: 1
    }
);

gates.push(switcher2);

var switcher3 = new Switch(
    {
        x: 300,
        y: 300,
        s: 1
    }
);

gates.push(switcher3);

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

gates.push(mux);

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


gates.push(light);

// Main draw function


var droppable = new Droppable(Or);

gates.push(droppable);

function draw(first) {

    if (diff("compare") || first){
        ctx.clearRect(0,0,1200,1200);
        ctx.scale(scaleFactor, scaleFactor);

        for (var i = 0; i < gates.length; i++){
            gates[i].update();
            gates[i].draw();
        }

        ctx.scale(1/scaleFactor, 1/scaleFactor);
    }
    diff("set");
    requestAnimFrame(function() {
       draw(false);
    });
}

function diff(action) {
    if (action == "set"){
        updatedGates = [];
        for (var i = 0; i < gates.length; i++) {
            updatedGates.push([gates[i].x, gates[i].y]);
        }
        return;
    }

    else if (action == "compare"){
        for (var i = 0; i < gates.length; i++){
            if (gates[i].x != updatedGates[i][0] || gates[i].y != updatedGates[i][1]){
                return true;
            }
        }
        if (updateScaleFactor) {
            updateScaleFactor = false;
            return true;
        }

        if (addedObject) {
            addedObject = false;
            return true;
        }
    }

    return false;
}

diff("set");
draw(true);
