function outputMoving(option, output) {
    console.log("outputMoving");
    output.connector.set({x2: output.left, y2: output.top});
    canvas.renderAll();
}

function outputModified(option, output) {
    console.log("outputModified");
    output.connector.set({x2: output.left, y2: output.top});
    canvas.renderAll();
}

function createCircularOutput(x, y, r, color) {
    return new fabric.Circle({
        originX: 'center',
        originY: 'center',
        left: x,
        top: y,
        fill: color,
        radius: r,
//        stroke: 'black',
        stroke: color,
        strokeWidth: 2,
        hasControls: false,
        hasBorders: false,
        hasRotatingPoint: false,
        selectable: true
    });
}


function addCircularOutput(x, y, widget, connector) {
    var initialRadius = 1;
    var finalRadius = widget.contourArea / 700;
//    var finalRadius = widget.filledArea/700;
    var duration = 1500;
    var output = createCircularOutput(x, y, initialRadius, widget.trueColor);
    output.widget = widget;
    output.connector = connector;

    output.on({
        'moving': function(option) {
            outputMoving(option, output);
        },
        'modified': function(option) {
            outputModified(option, output);
        }
    });

    canvas.add(output);
    animateCircularOutput(output, finalRadius, duration, false);
}

function animateCircularOutput(output, radius, duration, sendToBack) {

    var easing = fabric.util.ease['easeOutElastic'];

    output.animate('radius', radius, {
        duration: duration,
        onChange: canvas.renderAll.bind(canvas),
        onComplete: function() {
            if (sendToBack) {
                canvas.sendToBack(output);
            }
            output.scaleX = 1;
            output.scaleY = 1;
        },
        easing: easing
    });

}