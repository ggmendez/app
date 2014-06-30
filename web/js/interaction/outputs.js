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
        isOutput: true,
        selectable: true
    });
}

function createRectangularOutput(x, y, w, h, color) {
    return new fabric.Rect({
        originX: 'center',
        originY: 'center',
        left: x,
        top: y,
        fill: color,
        width: w,
        height: h,
        stroke: color,
        strokeWidth: 2,
        hasControls: false,
        hasBorders: false,
        hasRotatingPoint: false,
        isOutput: true,
        selectable: true
    });
}

function createPolygonalOutput(x, y, points, color) {
    return new fabric.Polygon(points, {
        originX: 'center',
        originY: 'center',
        left: x,
        top: y,
        scaleX: 0,
        scaleY: 0,
        fill: color,
        stroke: color,
        strokeWidth: 2,
        hasControls: false,
        hasBorders: false,
        hasRotatingPoint: false,
        isOutput: true,
        selectable: true
    });
}


function addCircularOutput(x, y, widget, connector, shouldAddConfigurator) {
    var initialRadius = 1;
    var finalRadius = widget.contourArea / 600;
//    var finalRadius = widget.filledArea/700;
    var duration = 1300;
    var output = createCircularOutput(x, y, initialRadius, widget.trueColor);
    output.type = CIRCULAR_OUTPUT;
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

    if (shouldAddConfigurator) {
        addConfigurator(output.connector);
    }

    animateCircularOutput(output, finalRadius, duration, false, null);
}

function animateCircularOutput(output, radius, duration, sendToBack, actionType, newType) {

    var coordX = output.left;
    var coordY = output.top;
    var targetWidget = output.connector.widget;

    var easing = fabric.util.ease['easeOutElastic'];

    if (actionType == "REMOVING") {
        easing = fabric.util.ease['easeInCubic'];
    }

    output.animate('radius', radius, {
        duration: duration,
        onChange: canvas.renderAll.bind(canvas),
        onComplete: function() {
            if (sendToBack) {
                canvas.sendToBack(output);
            }
            output.scaleX = 1;
            output.scaleY = 1;
            if (actionType == "REMOVING") {
                deleteConnectors(output);
            }
        },
        easing: easing
    });

    if (newType != null) {
        addOutput(coordX, coordY, targetWidget, output.connector, false, newType);
    }


}

function animateRectangularOutput(output, width, height, duration, sendToBack, actionType, newType) {

    var coordX = output.left;
    var coordY = output.top;
    var targetWidget = output.connector.widget;

    var easing = fabric.util.ease['easeOutBounce'];

    if (actionType == "REMOVING") {
        easing = fabric.util.ease['easeInCubic'];
    }

    output.animate('height', height, {
        duration: duration,
        onChange: canvas.renderAll.bind(canvas),
        easing: easing
    });
    output.animate('width', width, {
        duration: duration,
        onChange: canvas.renderAll.bind(canvas),
        onComplete: function() {
            if (sendToBack) {
                canvas.sendToBack(output);
            }
            output.scaleX = 1;
            output.scaleY = 1;
            if (actionType == "REMOVING") {
                deleteConnectors(output);
            }

        },
        easing: easing
    });

    if (newType != null) {
        addOutput(coordX, coordY, targetWidget, output.connector, false, newType);
    }
}

function animateMiniatureOutput(output, scaleX, scaleY, duration, sendToBack, actionType, newType) {

    var coordX = output.left;
    var coordY = output.top;
    var targetWidget = output.connector.widget;

    var easing = fabric.util.ease['easeOutBounce'];

    if (actionType == "REMOVING") {
        easing = fabric.util.ease['easeInCubic'];
    }

    output.animate('scaleX', scaleX, {
        duration: duration,
        onChange: canvas.renderAll.bind(canvas),
        easing: easing
    });
    output.animate('scaleY', scaleY, {
        duration: duration,
        onChange: canvas.renderAll.bind(canvas),
        onComplete: function() {
            if (sendToBack) {
                canvas.sendToBack(output);
            }
            if (actionType == "REMOVING") {
                deleteConnectors(output);
            }
        },
        easing: easing
    });

    if (newType != null) {
        addOutput(coordX, coordY, targetWidget, output.connector, false, newType);
    }
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


    configurator.css('top', (connector.getCenterPoint().y + $('#theCanvas').offset().top - height / 2 - 2.5) + 'px');
    configurator.css('left', (connector.getCenterPoint().x + $('#theCanvas').offset().left - width / 2 - 2.5) + 'px');

}

function addConfigurator(connector) {

    var configurator = $('<div/>', {class: 'icon-cog icon-large'});
    configurator.css('background', connector.widget.trueColor);
//    configurator.css('background', connector.widget.fill);
    configurator.css('padding', '5px');
    configurator.css('border-radius', '25px');
    configurator.css('color', '#fff');

    document.body.appendChild(configurator[0]);

    var outputShapes = {
        'Circle': CIRCULAR_OUTPUT,
        'Vertical Rect': VERTICAL_RECTANGULAR_OUTPUT,
        'Horizontal Rect': HORIZONTAL_RECTANGULAR_OUTPUT,
        'Square': SQUARED_OUTPUT,
        'Triangle': TRIANGULAR_OUTPUT,
        'Miniature': MINIATURE_OUTPUT,
        'Polygon': POLYGONAL_OUTPUT
    }

    var outputShapeSelector = $('<select />');

    for (var val in outputShapes) {
//        console.log(val + ": " + connector.output.type + " - " + (val == connector.output.type));
        $('<option />', {value: val, text: outputShapes[val], selected: (val == connector.output.type)}).appendTo(outputShapeSelector);
    }

    var configurationPanel = $('<div/>');

    outputShapeSelector.on('change', function(e) {

//        var optionSelected = $("option:selected", this);
        var newOutputType = this.value;
        var output = connector.output;
        removeOutput(output, newOutputType);

    });

    configurationPanel.append($('<label/>', {text: "Output type: ", style: "margin-right: 5px;"}));
    configurationPanel.append(outputShapeSelector);
//    configurationPanel.append($('<br/>'));
//    configurationPanel.append($('<br/>'));
//    configurationPanel.append($('<label/>', {text: "Input attribute: ", style: "margin-right: 5px;"}));

    configurator.tooltipster({
//        content: outputShapeSelector,
        content: configurationPanel,
        animation: 'grow',
        trigger: 'click',
        interactive: true
    });
    connector.configurator = configurator;

    positionConfigurator(connector);
    positionConfigurator(connector);


}



function addOutput(x, y, widget, connector, shouldAddConfigurator, type) {
    if (type == CIRCULAR_OUTPUT) {
        addCircularOutput(x, y, widget, connector, shouldAddConfigurator);
    } else if (type == VERTICAL_RECTANGULAR_OUTPUT || type == HORIZONTAL_RECTANGULAR_OUTPUT || type == SQUARED_OUTPUT) {
        addRectangularOutput(x, y, widget, connector, shouldAddConfigurator, type);
    } else if (type == MINIATURE_OUTPUT) {
        addMiniatureOutput(x, y, widget, connector, shouldAddConfigurator);
    } else if (type == TRIANGULAR_OUTPUT) {
        addPolygonalOutput(x, y, widget, connector, shouldAddConfigurator, 3);
    } else if (type == POLYGONAL_OUTPUT) {
        addPolygonalOutput(x, y, widget, connector, shouldAddConfigurator, 5);
    }
}

function removeOutput(output, newType) {
    
    if (output == null) return;
    
    var actionType = "REMOVING";
    if (newType != null) {
        actionType = "CHANGING";
    }
    
    var minimunValue = 0;
    var duration = 280;

    if (output.type == CIRCULAR_OUTPUT) {
        animateCircularOutput(output, minimunValue, duration, true, actionType, newType);
    } else if (output.type == VERTICAL_RECTANGULAR_OUTPUT || output.type == HORIZONTAL_RECTANGULAR_OUTPUT || output.type == SQUARED_OUTPUT) {
        var finalWidth = output.width;
        var finalHeight = output.height;
        if (output.type == HORIZONTAL_RECTANGULAR_OUTPUT) {
            finalWidth = minimunValue;
            finalHeight = minimunValue;
        } else if (output.type == VERTICAL_RECTANGULAR_OUTPUT) {
            finalWidth = minimunValue;
            finalHeight = minimunValue;
        } else if (output.type == SQUARED_OUTPUT) {
            finalWidth = minimunValue;
            finalHeight = finalWidth;
        }
        animateRectangularOutput(output, finalWidth, finalHeight, duration, true, actionType, newType);
    } else if (output.type == MINIATURE_OUTPUT || output.type == TRIANGULAR_OUTPUT || POLYGONAL_OUTPUT) {
        animateMiniatureOutput(output, 0, 0, duration, true, actionType, newType);
    }

}


function addRectangularOutput(x, y, widget, connector, shouldAddConfigurator, rectangleType) {

    var initialWidth = 1;
    var initialHeight = 1;
    var finalWidth = 25;
    var finalHeight = 30;
    var phi = 1.5; // Rectangular golden ratio
    var divisor = 600;

    if (rectangleType == HORIZONTAL_RECTANGULAR_OUTPUT) {
        finalWidth = 2 * widget.contourArea / divisor * phi;
    } else if (rectangleType == VERTICAL_RECTANGULAR_OUTPUT) {
        finalHeight = 2 * widget.contourArea / divisor * phi;
    } else if (rectangleType == SQUARED_OUTPUT) {
        finalWidth = 2 * widget.contourArea / divisor;
        finalHeight = finalWidth;
    }

    var duration = 800;
    var output = createRectangularOutput(x, y, initialWidth, initialHeight, widget.trueColor);
    output.type = rectangleType;
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

    if (shouldAddConfigurator) {
        addConfigurator(output.connector);
    }

    animateRectangularOutput(output, finalWidth, finalHeight, duration, false, "ADDING", null);
}

function addPolygonalOutput(x, y, widget, connector, shouldAddConfigurator, nSides) {

    var divisor = 600;

    var finalScaleX = 1;
    var finalScaleY = 1;

    var r = widget.contourArea / divisor;

    var duration = 800;

    var points = new Array();
    var theta = -Math.PI / 2;
    var i;

    for (i = 0; i < nSides; i++) {
        points.push({x: r * Math.cos(2 * Math.PI * i / nSides + theta), y: r * Math.sin(2 * Math.PI * i / nSides + theta)});
    }

    var output = createPolygonalOutput(x, y, points, widget.trueColor);

    output.type = POLYGONAL_OUTPUT;
    if (nSides == 3) {
        output.type = TRIANGULAR_OUTPUT;
    }

    output.nSides = nSides;
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

    if (shouldAddConfigurator) {
        addConfigurator(output.connector);
    }

    animateMiniatureOutput(output, finalScaleX, finalScaleY, duration, false, "ADDING", null);

}

function addMiniatureOutput(x, y, widget, connector, shouldAddConfigurator) {

    var initialScaleX = 0.1;
    var initialScaleY = 0.1;
    var finalScaleX = 0.7;
    var finalScaleY = 0.7;

    var duration = 800;

    var output;

    widget.clone(function(clone) {
        output = clone;
        output.set({
            left: x,
            top: y,
            fill: widget.trueColor,
            stroke: widget.trueColor,
            strokeDashArray: [],
            strokeWidth: 2,
            hasControls: false,
            hasBorders: false,
            hasRotatingPoint: false,
            selectable: true
        });
    });

    output.scaleX = initialScaleX;
    output.scaleY = initialScaleY;
    output.type = MINIATURE_OUTPUT;
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

    if (shouldAddConfigurator) {
        addConfigurator(output.connector);
    }

    animateMiniatureOutput(output, finalScaleX, finalScaleY, duration, false, "ADDING", null);
}




function deleteConnectors(output) {
    var connector = output.connector;
    output = null
    connector.output = null
    removeConnector(connector);
//        output.connectors.forEach(function(connector) {
//            removeConnector(connector);
//        });
}