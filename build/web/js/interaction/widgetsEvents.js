var lastSelectedWidget = null;

function widgetApplySelectedStyle(widget) {
    if (widget != null) {
        widget.stroke = widget_selected_stroke_color;
        widget.strokeWidth = widget_selected_stroke_width;
        widget.strokeDashArray = widget_selected_stroke_dash_array;
    }
}

function widgetApplyUnselectedStyle(widget) {
    if (widget != null) {
        widget.stroke = widget_stroke_color;
        widget.strokeWidth = widget_stroke_width;
        widget.strokeDashArray = widget_stroke_dash_array;
    }
}

function widgetAdded(option, targetWidget) {
    console.log("widgetAdded");
}
function widgetRemoved(option, targetWidget) {
    console.log("widgetRemoved");
}
function widgetSelected(option, targetWidget) {
    console.log("widgetSelected");

    if (lastSelectedOutput != null) {
        outputApplyUnselectedStyle(lastSelectedOutput);
    }

    if (targetWidget != lastSelectedWidget) {

        widgetApplySelectedStyle(targetWidget);

//        targetWidget.connectors.forEach(function(connector) {
//            console.log(connector.configurator);
//            connector.configurator.show();
//        });

        if (lastSelectedWidget != null) {

            widgetApplyUnselectedStyle(lastSelectedWidget);

//            lastSelectedWidget.connectors.forEach(function(connector) {
//                connector.configurator.hide();
//            });
        }

        lastSelectedWidget = targetWidget;
    }
    canvas.renderAll();
}

function widgetModified(option, targetWidget) {
    console.log("widgetModified");
}
function widgetRotating(option, targetWidget) {
    console.log("widgetRotating");
}
function widgetScaling(option, targetWidget) {
    console.log("widgetScaling");
}
function widgetMoving(option, targetWidget, parentGroup) {

    console.log("widgetMoving");
    targetWidget.moving = true;

    var theEvent = option;

    theEvent = option['e'];

    if (theEvent) {

        var coordY = theEvent.offsetY;
        var coordX = theEvent.offsetX;

        if (fabric.isTouchSupported && theEvent.changedTouches && theEvent.changedTouches.length > 0) {
            // Here I use the changedTouches list since the up event produces a change in it
            coordX = theEvent.changedTouches[0].pageX - $('#theCanvas').offset().left;
            coordY = theEvent.changedTouches[0].pageY - $('#theCanvas').offset().top;
        }

        var lastAddedConnector = getLastElementOfArray(targetWidget.connectors);

        lastAddedConnector.set({x2: coordX, y2: coordY});

        canvas.renderAll();


    }



}

function widgetMousedown(option, targetWidget) {

    console.log("widgetMousedown");

    var theEvent = option;
//    if (fabric.isTouchSupported) {
    theEvent = option['e'];
//    }

    if (theEvent) {

        var coordY = theEvent.offsetY;
        var coordX = theEvent.offsetX;

        if (fabric.isTouchSupported && theEvent.touchess && theEvent.touches.length > 0) {
            coordX = theEvent.touches[0].pageX - $('#theCanvas').offset().left;
            coordY = theEvent.touches[0].pageY - $('#theCanvas').offset().top;
        }

        var coords = [targetWidget.left, targetWidget.top, coordX, coordY];
        var newConnector = CreateDefaultConnector(coords, targetWidget.trueColor);
        canvas.add(newConnector);
        newConnector.widget = targetWidget;
        targetWidget.connectors.push(newConnector);

    }

}

function widgetMouseup(option, targetWidget) {

    console.log("widgetMouseup");
    if (targetWidget.permanentOpacity) {
        targetWidget.opacity = targetWidget.permanentOpacity;
    } else {
        targetWidget.opacity = 1;
    }

    if (targetWidget.moving) {

        var theEvent = option['e'];

        if (theEvent) {

            var coordY = theEvent.offsetY;
            var coordX = theEvent.offsetX;

            if (fabric.isTouchSupported && theEvent.changedTouches && theEvent.changedTouches.length > 0) {
                // Here I use the changedTouches list since the up event produces a change in it
                coordX = theEvent.changedTouches[0].pageX - $('#theCanvas').offset().left;
                coordY = theEvent.changedTouches[0].pageY - $('#theCanvas').offset().top;
            }

            var existingOutput = getOutputContaining(coordX, coordY);

            // The mouse up event is done over a blank section of the canvas
            if (existingOutput == null) {

//                console.log(targetWidget.connectors);

                var lastAddedConnector = getLastElementOfArray(targetWidget.connectors);

//                console.log(lastAddedConnector);

                var arrayOfConnectors = new Array(lastAddedConnector);

                addOutputAt(coordX, coordY, targetWidget, lastAddedConnector, CIRCULAR_OUTPUT);
//                addOutputAt(coordX, coordY, targetWidget, lastAddedConnector, VERTICAL_RECTANGULAR_OUTPUT);
//                addOutputAt(coordX, coordY, targetWidget, lastAddedConnector, HORIZONTAL_RECTANGULAR_OUTPUT);

//                addOutput(coordX, coordY, targetWidget, arrayOfConnectors, true, CIRCULAR_OUTPUT, ADDING_NEW_OUTPUT);
//            addOutput (coordX, coordY, targetWidget, arrayOfConnectors, true, VERTICAL_RECTANGULAR_OUTPUT, ADDING_NEW_OUTPUT);
//            addOutput (coordX, coordY, targetWidget, arrayOfConnectors, true, HORIZONTAL_RECTANGULAR_OUTPUT, ADDING_NEW_OUTPUT);
//            addOutput (coordX, coordY, targetWidget, arrayOfConnectors, true, SQUARED_OUTPUT, ADDING_NEW_OUTPUT);
//            addOutput (coordX, coordY, targetWidget, arrayOfConnectors, true, TRIANGULAR_OUTPUT, ADDING_NEW_OUTPUT);
//            addOutput (coordX, coordY, targetWidget, arrayOfConnectors, true, MINIATURE_OUTPUT, ADDING_NEW_OUTPUT);

            } else {
                // if the mouse up event happens over an existing output
                var connector = getLastElementOfArray(targetWidget.connectors);
                addConnectorToOutput(existingOutput, connector);
            }

        }

    } else {
        // removing the last connector added when the widget was down clicked 
        var connector = targetWidget.connectors.pop();
        canvas.remove(connector);

    }



    targetWidget.moving = false;
    canvas.renderAll();
}

function animateWidget(widget, top, left, duration) {

    

//    var easing = fabric.util.ease.easeOutExpo;

//    duration *= 2.5;    
//    var easing = fabric.util.ease.easeOutElastic;

    var easing = fabric.util.ease.easeOutBack;
//    var easing = fabric.util.ease.easeOutBounce;



    widget.animate('top', top, {
        onChange: canvas.renderAll.bind(canvas),
        duration: duration,
        easing: easing
    });
    widget.animate('left', left, {
        onChange: canvas.renderAll.bind(canvas),
        duration: duration,
        easing: easing
    });
    widget.animate('scaleX', 1, {
        onChange: canvas.renderAll.bind(canvas),
        duration: duration,
        easing: easing
    });
    widget.animate('scaleY', 1, {
        onChange: canvas.renderAll.bind(canvas),
        duration: duration,
        easing: easing,
        onComplete: function() {
            widgetAssociateMouseEvents(widget);
            canvas.bringToFront(widget);
            canvas.setActiveObject(widget);
        }
    });
}


function removeWidget(widget) {
    widget.connectors.forEach(function(connector) {
        removeOutput(connector.output);
    });
    canvas.remove(widget);
}



function getOutputContaining(x, y) {
    var theObject = null;
    canvas.forEachObject(function(object) {
        var point = new fabric.Point(x, y);
        if (object.isOutput && object.containsPoint(point)) {
            theObject = object;
        }
    });
    return theObject;
}