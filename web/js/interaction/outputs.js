function outputMoving(option, output) {
    console.log("outputMoving");
    output.connector.set({x2: output.left, y2: output.top});
    positionConfigurator(output.connector);
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
    connector.output = output;

    output.on({
        'moving': function(option) {
            outputMoving(option, output);
        },
        'modified': function(option) {
            outputModified(option, output);
        }
    });

    canvas.add(output);
    addConfigurator(output.connector);
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


function positionConfigurator(connector) {

    var configurator = connector.configurator;

    var width = configurator.width();
    var height = configurator.height();

//    console.log("width: " + width);
//    console.log("height: " + height);


//    drawRectAt(connector.getCenterPoint(), 'red');

//    var absCoords = canvas.getAbsoluteCoords(connector);

//    drawRectAt(new fabric.Point(absCoords.left, absCoords.top), 'yellow');

    configurator.css('position', 'absolute');
//    configurator.css('top', (absCoords.top - height / 2) + 'px');
//    configurator.css('left', (absCoords.left - width / 2) + 'px');


    configurator.css('top', (connector.getCenterPoint().y + $('#theCanvas').offset().top - height/2 - 2.5) + 'px');
    configurator.css('left', (connector.getCenterPoint().x + $('#theCanvas').offset().left - width/2 - 2.5) + 'px');

}

function addConfigurator(connector) {

    var configurator = $('<div/>', {class: 'icon-cog icon-large'});
    configurator.css('background', connector.widget.trueColor);
//    configurator.css('background', connector.widget.fill);
    configurator.css('padding', '5px');
    configurator.css('border-radius', '25px');
    configurator.css('color', '#fff');

    document.body.appendChild(configurator[0]);

    configurator.tooltipster({
        content: $('<span><img src="http://blogs.denmark.dk/natalia/files/2012/04/working.jpg" /> <strong>This text is in bold case !</strong></span>'),
        animation: 'grow',
        trigger: 'click',
        interactive: true
    });

    connector.configurator = configurator;

    positionConfigurator(connector);
    positionConfigurator(connector);

}