var lastSelectedOutput = null;

var lastTime;

function outputMouseUp(option, output) {
    var date = new Date();
    var now = date.getTime();
    if (now - lastTime < 500) {
        outputDoubleClicked(option, output);
    }
    lastTime = now;
}

function outputDoubleClicked(option, output) {
    output.configurator.tooltipster('show');
}

function outputApplySelectedStyle(output) {
    if (output != null) {
        output.stroke = widget_selected_stroke_color;
        output.strokeWidth = widget_selected_stroke_width;
        output.strokeDashArray = widget_selected_stroke_dash_array;
        output.connectors.forEach(function(connector) {
            widgetApplySelectedStyle(connector.widget);
        });
    }
}

function outputApplyUnselectedStyle(output) {
    if (output != null) {
        output.stroke = '';
        output.strokeWidth = 1;
        output.strokeDashArray = [];
        output.connectors.forEach(function(connector) {
            widgetApplyUnselectedStyle(connector.widget);
        });
    }
}

function outputSelected(option, output) {

    console.log("outputSelected");

    widgetApplyUnselectedStyle(lastSelectedWidget);
    outputApplyUnselectedStyle(lastSelectedOutput);
    outputApplySelectedStyle(output);

    lastSelectedOutput = output;
    lastSelectedWidget = null;
    canvas.renderAll();
}

function outputMoving(option, output, parentGroup) {
    console.log("outputMoving");
    output.connectors.forEach(function(connector) {
        if (parentGroup) {
            connector.set({x2: parentGroup.left + output.left, y2: parentGroup.top + output.top});
        } else {
            connector.set({x2: output.left, y2: output.top});
        }
        positionConnectorConfigurator(connector);
        positionOutputConfigurator(output);
    });
    canvas.renderAll();
}

function outputScaling(option, output, parentGroup) {
    console.log("outputMoving");
    output.connectors.forEach(function(connector) {
        if (parentGroup) {
            connector.set({x2: parentGroup.left + output.left, y2: parentGroup.top + output.top});
        } else {
            connector.set({x2: output.left, y2: output.top});
        }
        positionConnectorConfigurator(connector);
        positionOutputConfigurator(output);
    });
    canvas.renderAll();
}

function outputModified(option, output, parentGroup) {
    console.log("outputModified");
    output.connectors.forEach(function(connector) {
        if (parentGroup) {
            connector.set({x2: parentGroup.left + output.left, y2: parentGroup.top + output.top});
        } else {
            connector.set({x2: output.left, y2: output.top});
        }
        positionConnectorConfigurator(connector);
        positionOutputConfigurator(output);
    });
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
        selectable: true,
        connectors: new Array()
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
        selectable: true,
        connectors: new Array()
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
        selectable: true,
        connectors: new Array()
    });
}

function createGenericOutput(x, y, widget, outputType, options) {

    var constructor = null;

    if (outputType == HORIZONTAL_RECTANGULAR_OUTPUT || outputType == VERTICAL_RECTANGULAR_OUTPUT || outputType == SQUARED_OUTPUT) {
        constructor = fabric.Rect;
    } else if (outputType == CIRCULAR_OUTPUT) {
        constructor = fabric.Circle;
    } else if (outputType == TRIANGULAR_OUTPUT || outputType == POLYGONAL_OUTPUT) {
        constructor = fabric.Polygon;
    } else if (outputType == MINIATURE_OUTPUT) {
        // TODO: special thin, basically, clone the parent of the widget sent to this function
    }

    var output = new constructor({
        originX: 'center',
        originY: 'center',
        left: x,
        top: y,
        fill: widget != null ? widget.trueColor : '',
        stroke: widget != null ? widget.trueColor : '',
        strokeWidth: 2,
        hasControls: false,
        hasBorders: false,
        hasRotatingPoint: false,
        isOutput: true,
        selectable: true,
        connectors: new Array(),
        // TODO: REMOVE THIS TOMORROW
        widget: widget
    });

    if (options != null) {
        for (var key in options) {
            output.set(key, options[key]);
        }
    }

    associateOutputEvents(output);

    return output;

}


function addCircularOutput(x, y, widget, theConnectors, shouldAddConfigurator, actionType) {

    var initialRadius = 1;
    var finalRadius = widget.contourArea / 600;
    var duration = 1300;
    var output = createCircularOutput(x, y, initialRadius, widget.trueColor);
    output.type = CIRCULAR_OUTPUT;

    theConnectors.forEach(function(connector) {
        connector.output = output;
    });

    output.connectors = theConnectors;

    associateOutputEvents(output);

    canvas.add(output);

    if (shouldAddConfigurator) {
        addConnectorConfigurator(getLastElementOfArray(output.connectors));
    }

    animateCircularOutput(output, theConnectors, finalRadius, duration, false, null, actionType);

    return output;
}

function animateCircularOutput(output, theConnectors, radius, duration, sendToBack, newType, actionType) {

    var coordX = output.left;
    var coordY = output.top;
    var targetWidget = getLastElementOfArray(theConnectors).widget;

    var easing = fabric.util.ease['easeOutElastic'];

    if (actionType == DELETING_OUTPUT || actionType == REPLACING_EXISTING_OUTPUT) {
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

            if (actionType == DELETING_OUTPUT) {
                deleteConnectors(output);
            }

            if (actionType == ADDING_NEW_OUTPUT || actionType == REPLACING_EXISTING_OUTPUT) {
                addOutputDIV(output);
            }

        },
        easing: easing
    });

    if (newType != null) {
        addOutput(coordX, coordY, targetWidget, theConnectors, false, newType, REPLACING_EXISTING_OUTPUT);
    }


}

function animateRectangularOutput(output, theConnectors, width, height, duration, sendToBack, newType, actionType) {

    var coordX = output.left;
    var coordY = output.top;
    var targetWidget = getLastElementOfArray(theConnectors).widget;

    var easing = fabric.util.ease['easeOutBounce'];

    if (actionType == DELETING_OUTPUT || actionType == REPLACING_EXISTING_OUTPUT) {
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

            if (actionType == DELETING_OUTPUT) {
                deleteConnectors(output);
            }

            if (actionType == ADDING_NEW_OUTPUT || actionType == REPLACING_EXISTING_OUTPUT) {
                addOutputDIV(output);
            }

        },
        easing: easing
    });

    if (newType != null) {
        addOutput(coordX, coordY, targetWidget, theConnectors, false, newType, actionType);
    }
}

function animateMiniatureOutput(output, connector, scaleX, scaleY, duration, sendToBack, newType, actionType) {

    var coordX = output.left;
    var coordY = output.top;
    var targetWidget = connector.widget;

    var easing = fabric.util.ease['easeOutBounce'];

    if (actionType == DELETING_OUTPUT || actionType == REPLACING_EXISTING_OUTPUT) {
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

            if (actionType == DELETING_OUTPUT) {
                deleteConnectors(output);
            }

            if (actionType == ADDING_NEW_OUTPUT || actionType == REPLACING_EXISTING_OUTPUT) {
                addOutputDIV(output);
            }
        },
        easing: easing
    });

    if (newType != null) {
        addOutput(coordX, coordY, targetWidget, connector, false, newType);
    }
}


function positionConnectorConfigurator(connector) {

    var configurator = connector.configurator;

    var width = configurator.width();
    var height = configurator.height();

    configurator.css('position', 'absolute');

    configurator.css('top', (connector.getCenterPoint().y + $('#theCanvas').offset().top - height / 2 - 2.5) + 'px');
    configurator.css('left', (connector.getCenterPoint().x + $('#theCanvas').offset().left - width / 2 - 2.5) + 'px');

    configurator.tooltipster('reposition');

}

function positionOutputConfigurator(output) {
    var outputDIV = output.configurator;
    outputDIV.css('position', 'absolute');
    outputDIV.css('top', (output.getCenterPoint().y + $('#theCanvas').offset().top - output.getHeight() / 2) + 'px');
    outputDIV.css('left', (output.getCenterPoint().x + $('#theCanvas').offset().left - output.getWidth() / 2) + 'px');
    outputDIV.css('z-index', '-1');
    outputDIV.tooltipster('reposition');

}

function addConnectorConfigurator(connector) {

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

    positionConnectorConfigurator(connector);
    positionConnectorConfigurator(connector);

}


function animateOutputState(output, duration, easing, finalStateOptions) {
    for (var key in finalStateOptions) {
        var value = finalStateOptions[key];
        output.animate(key, value, {
            duration: duration,
            onChange: canvas.renderAll.bind(canvas),
            easing: easing
        });
    }
}

// This functions adds a new output of type type at the point (x,y) of the canvas.
// The output is placed at the end of the connector sent to the function, which is 
// originated from the widget widget. 
// A DOM configurator is added at the mid point of the connector path.
function addOutputAt(x, y, widget, connector, outputType) {

    var options = generateInitialOptions(outputType, widget);

    var output = createGenericOutput(x, y, widget, outputType, options);

    output.type = outputType;
    output.connectors.push(connector);

    connector.output = output;

    canvas.add(output);

    addConnectorConfigurator(connector);

    var easing = fabric.util.ease['easeOutElastic'];
    var duration = 1300;

    animateOutputState(output, duration, easing, generateFinalOptions(outputType, widget));

    setTimeout(function() {
        addOutputDIV(output);
        canvas.renderAll();
    }, duration);

}

// TODO: An output CANNOT have a widget field, since it can be related to many

// This function replaces an existing output with another of a different shape
function changeOutputShape(oldOutput, newType) {

    var newOutput = createGenericOutput(oldOutput.left, oldOutput.top, null, newType, null);
    newOutput.fill = oldOutput.fill;
    newOutput.stroke = oldOutput.stroke;
    newOutput.strokeWidth = oldOutput.strokeWidth;
    newOutput.type = newType;
    // TODO: REMOVE THIS TOMORROW
    newOutput.widget = oldOutput.widget;

    oldOutput.connectors.forEach(function(connector) {
        newOutput.connectors.push(connector);
    });

    var duration = 280;
    var easing = fabric.util.ease['easeInCubic'];
    var options = generateInitialOptions(oldOutput.type, null);
    oldOutput.configurator.tooltipster('hide');
    animateOutputState(oldOutput, duration, easing, options);    
    
    setTimeout(function() {
        canvas.remove(oldOutput);
    }, duration);

    canvas.add(newOutput);
    easing = fabric.util.ease['easeOutElastic'];
    duration = 1300;
    
    console.log(oldOutput.widget);
    
    animateOutputState(newOutput, duration, easing, generateFinalOptions(newType, oldOutput.widget));
    setTimeout(function() {
        addOutputDIV(newOutput);
        newOutput.configurator.tooltipster('show');
        canvas.renderAll();
    }, duration/2);
    
    
    
    
    canvas.renderAll();
}


function addOutput(x, y, widget, theConnectors, shouldAddConfigurator, type, actionType) {

    var output = null;

    if (type == CIRCULAR_OUTPUT) {
        output = addCircularOutput(x, y, widget, theConnectors, shouldAddConfigurator, actionType);
    } else if (type == VERTICAL_RECTANGULAR_OUTPUT || type == HORIZONTAL_RECTANGULAR_OUTPUT || type == SQUARED_OUTPUT) {
        output = addRectangularOutput(x, y, widget, theConnectors, shouldAddConfigurator, type, actionType);
    } else if (type == MINIATURE_OUTPUT) {
        output = addMiniatureOutput(x, y, widget, theConnectors, shouldAddConfigurator, actionType);
    } else if (type == TRIANGULAR_OUTPUT) {
        output = addPolygonalOutput(x, y, widget, theConnectors, shouldAddConfigurator, 3, actionType);
    } else if (type == POLYGONAL_OUTPUT) {
        output = addPolygonalOutput(x, y, widget, theConnectors, shouldAddConfigurator, 5, actionType);
    }

}

function removeOutputDIV(output) {
    console.log("removeOutputDIV");
    console.log(output);
    console.log(output.configurator);
    output.configurator.remove();
}

function addOutputDIV(output) {

    console.log("addOutputDIV");

    var outputDIV = $('<div/>');
    outputDIV.css('background', '#FF0000');
    outputDIV.css('opacity', '0');
    outputDIV.css('color', '#fff');
    outputDIV.css('width', output.getWidth() + 'px');
    outputDIV.css('height', output.getHeight() + 'px');
    document.body.appendChild(outputDIV[0]);

    var outputShapes = {
        'Circle': CIRCULAR_OUTPUT,
        'Vertical Rect': VERTICAL_RECTANGULAR_OUTPUT,
        'Horizontal Rect': HORIZONTAL_RECTANGULAR_OUTPUT,
        'Square': SQUARED_OUTPUT,
        'Triangle': TRIANGULAR_OUTPUT,
        'Miniature': MINIATURE_OUTPUT,
        'Polygon': POLYGONAL_OUTPUT
    };

    var outputShapeSelector = $('<select />');

    for (var val in outputShapes) {
//        console.log(val + ": " + connector.output.type + " - " + (val == connector.output.type));
        $('<option />', {value: val, text: outputShapes[val], selected: (val == output.type)}).appendTo(outputShapeSelector);
    }

    var configurationPanel = $('<div/>');

    outputShapeSelector.on('change', function(e) {
//        var optionSelected = $("option:selected", this);
        var newOutputType = this.value;
//        removeOutput(output, newOutputType, REPLACING_EXISTING_OUTPUT);

        changeOutputShape(output, newOutputType);

    });

    configurationPanel.append($('<label/>', {text: "Output type: ", style: "margin-right: 5px;"}));
    configurationPanel.append(outputShapeSelector);

    outputDIV.tooltipster({
        content: configurationPanel,
        animation: 'grow',
        trigger: 'click',
//        autoClose: false,
        interactive: true
    });

    output.configurator = outputDIV;

    positionOutputConfigurator(output);

}

function removeOutput(output, newType, actionType) {

    if (output == null)
        return;

    var minimunValue = 0;
    var duration = 280;

    if (output.type == CIRCULAR_OUTPUT) {

        animateCircularOutput(output, output.connectors, minimunValue, duration, true, newType, actionType);

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

        animateRectangularOutput(output, output.connectors, finalWidth, finalHeight, duration, true, newType, actionType);

    } else if (output.type == MINIATURE_OUTPUT || output.type == TRIANGULAR_OUTPUT || POLYGONAL_OUTPUT) {

        animateMiniatureOutput(output, output.connectors, 0, 0, duration, true, newType, actionType);
    }

}


function addRectangularOutput(x, y, widget, theConnectors, shouldAddConfigurator, rectangleType, actionType) {

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

    output.connectors = theConnectors;
    theConnectors.forEach(function(connector) {
        connector.output = output;
    });

    associateOutputEvents(output);

    canvas.add(output);

    if (shouldAddConfigurator) {
        addConnectorConfigurator(getLastElementOfArray(output.connectors));
    }

    animateRectangularOutput(output, theConnectors, finalWidth, finalHeight, duration, false, null, actionType);

    return output;
}


function generateInitialOptions(outputType, widget) {
    var options = null;
    if (outputType == HORIZONTAL_RECTANGULAR_OUTPUT || outputType == VERTICAL_RECTANGULAR_OUTPUT || outputType == SQUARED_OUTPUT) {
        options = generateInitialRectangularOptions(outputType, widget);
    } else if (outputType == CIRCULAR_OUTPUT) {
        options = generateInitialCircularOptions(widget);
    } else if (outputType == TRIANGULAR_OUTPUT) {
        options = generateInitialPolygonalOptions(widget, 3);
    } else if (outputType == POLYGONAL_OUTPUT) {
        options = generateInitialPolygonalOptions(widget, 5);
    } else if (outputType == MINIATURE_OUTPUT) {
        options = generateInitialMiniatureOptions(widget);
    }
    return options;
}

function generateFinalOptions(outputType, widget) {
    var options = null;
    if (outputType == HORIZONTAL_RECTANGULAR_OUTPUT || outputType == VERTICAL_RECTANGULAR_OUTPUT || outputType == SQUARED_OUTPUT) {
        options = generateFinalRectangularOptions(outputType, widget);
    } else if (outputType == CIRCULAR_OUTPUT) {
        options = generateFinalCircularOptions(widget);
    } else if (outputType == TRIANGULAR_OUTPUT || outputType == POLYGONAL_OUTPUT || outputType == MINIATURE_OUTPUT) {
        options = generateFinalPolygonalOptions(widget);
    }
    return options;
}

function generateInitialRectangularOptions(rectangleType, widget) {
    var options = {};
    options['width'] = 1;
    options['height'] = 1;
    if (rectangleType == HORIZONTAL_RECTANGULAR_OUTPUT) {
        options['height'] = rectangular_output_default_height;
    } else if (rectangleType == VERTICAL_RECTANGULAR_OUTPUT) {
        options['width'] = rectangular_output_default_width;
    }
    return options;
}

function generateFinalRectangularOptions(rectangleType, widget) {
    var phi = 1.5;
    var divisor = 600;
    var options = {};
    if (rectangleType == HORIZONTAL_RECTANGULAR_OUTPUT) {
        options['width'] = widget != null ? 2 * widget.contourArea / divisor * phi : 0;
        options['height'] = rectangular_output_default_height;
    } else if (rectangleType == VERTICAL_RECTANGULAR_OUTPUT) {
        options['height'] = widget != null ? 2 * widget.contourArea / divisor * phi : 0;
        options['width'] = rectangular_output_default_width;
    }
    return options;
}

// How a circular output associated to this widget is born
function generateInitialCircularOptions(widget) {
    var options = {};
    options['radius'] = widget != null ? widget.contourArea / 600 : 0;
    options['scaleX'] = 0;
    options['scaleY'] = 0;
    return options;
}

function generateFinalCircularOptions(widget) {
    return generateFinalPolygonalOptions(widget);
}

function generateInitialPolygonalOptions(widget, nSides) {

    var options = {};

    if (widget != null) {
        var divisor = 600;
        var r = widget.contourArea / divisor;
        var points = new Array();
        var theta = -Math.PI / 2;
        var i;
        for (i = 0; i < nSides; i++) {
            points.push({x: r * Math.cos(2 * Math.PI * i / nSides + theta), y: r * Math.sin(2 * Math.PI * i / nSides + theta)});
        }
        options['points'] = points;
    }

    options['scaleX'] = 0;
    options['scaleY'] = 0;


    return options;
}

function generateInitialMiniatureOptions(widget) {
    var options = {};
    options['scaleX'] = 0.01;
    options['scaleY'] = 0.01;
    return options;
}

function generateFinalPolygonalOptions(widget) {
    var options = {};
    options['scaleX'] = 1;
    options['scaleY'] = 1;
    return options;
}

function addPolygonalOutput(x, y, widget, connector, shouldAddConfigurator, nSides, actionType) {

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
    connector.output = output;

    associateOutputEvents(output);

    canvas.add(output);

    output.connectors.push(connector);

    if (shouldAddConfigurator) {
        addConnectorConfigurator(getLastElementOfArray(output.connectors));
    }

    animateMiniatureOutput(output, connector, finalScaleX, finalScaleY, duration, false, actionType, null);

    return output;

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
            selectable: true,
            connectors: new Array(),
            isOutput: true
        });
    });

    output.scaleX = initialScaleX;
    output.scaleY = initialScaleY;
    output.type = MINIATURE_OUTPUT;
    output.widget = widget;
//    output.connector = connector;
    connector.output = output;

    associateOutputEvents(output);

    canvas.add(output);

    output.connectors.push(connector);

    if (shouldAddConfigurator) {
        addConnectorConfigurator(getLastElementOfArray(output.connectors));
    }

    animateMiniatureOutput(output, connector, finalScaleX, finalScaleY, duration, false, "ADDING", null);

    return output;
}




function deleteConnectors(output) {

    console.log("FUNCTION: deleteConnectors");

    var connector = output.connector;
    output = null
    connector.output = null
    removeConnector(connector);
//        output.connectors.forEach(function(connector) {
//            removeConnector(connector);
//        });
}

function associateOutputEvents(output) {
    output.on({
        'moving': function(option) {
            outputMoving(option, output);
        },
        'modified': function(option) {
            outputModified(option, output);
        },
        'selected': function(option) {
            outputSelected(option, output);
        },
        'mouseup': function(option) {
            outputMouseUp(option, output);
        },
        'scaling': function(option) {
            outputScaling(option, output);
        }

    });
}


function addConnectorToOutput(output, connector) {
    canvas.bringToFront(output);
    connector.output = output;
    output.connectors.push(connector);
    outputBlink(output);
    addConnectorConfigurator(connector);
}

function outputBlink(output) {

    var currentStroke = output.stroke;
    var currentStrokeWidth = output.strokeWidth;
//    var currentStrokeDashArray = output.strokeDashArray;

    var increment = 0.2;
    var angleIncrement = 10;
    var property1 = 'scaleX';
    var property2 = 'scaleY';
    var value1 = output.get(property1) + increment;
    var value2 = output.get(property2) + increment;
    var duration = 100;

    var easing = fabric.util.ease['easeInCubic'];

    output.stroke = widget_selected_stroke_color;
    output.strokeWidth = widget_selected_stroke_width;
//    output.strokeDashArray = widget_selected_stroke_dash_array;

    output.animate(property1, value1, {
        duration: duration,
        onChange: canvas.renderAll.bind(canvas),
        easing: easing,
        onComplete: function() {
            output.animate(property1, value1 - increment, {
                duration: 1100,
                onChange: canvas.renderAll.bind(canvas),
                easing: fabric.util.ease['easeOutElastic']
            });
        }
    });
    output.animate(property2, value2, {
        duration: duration,
        onChange: canvas.renderAll.bind(canvas),
        easing: easing,
        onComplete: function() {
            output.animate(property2, value2 - increment, {
                duration: 1100,
                onChange: canvas.renderAll.bind(canvas),
                easing: fabric.util.ease['easeOutElastic'],
            });
        }
    });
    setTimeout(function() {
        output.stroke = currentStroke;
        output.strokeWidth = currentStrokeWidth;
//        output.strokeDashArray = currentStrokeDashArray;
        canvas.renderAll();
    }, 800);
}