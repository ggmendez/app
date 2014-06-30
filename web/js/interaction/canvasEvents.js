//function canvasSelectionCleared(option) {
//    console.log("canvasSelectionCleared");
//    var activeObject = option.target;
//    if (activeObject.type == "widget") {
//        widget = activeObject;
//        widget.stroke = 'red';
//        widget.strokeWidth = 10;
//        widget.strokeDashArray = [5, 5];
//    }
//}

function canvasObjectModified(option) {

    console.log("canvasObjectModified");

    if (option.target._objects) {
        option.target._objects.forEach(function(object) {

            if (object.isOutput) {
                outputModified(option, object, option.target);
            } else if (object.isWidget) {
                widgetModified(option, object, option.target);
            }

        });
    }


}

function canvasObjectRotating(option) {

    console.log("canvasObjectRotating");

    if (option.target.type == "importedImage") {
        var obj = option.target;
        var angle = obj.getAngle();
        var arrayLength = obj.widgets.length;
        for (var i = 0; i < arrayLength; i++) {

            var newPos = fabric.util.rotatePoint(
                    obj.widgets[i].getCenterPoint(),
                    obj.getCenterPoint(),
                    fabric.util.degreesToRadians(angle - previousAngle));


            obj.widgets[i].angle = obj.widgets[i].angle + (angle - previousAngle);
            obj.widgets[i].left = newPos.x;
            obj.widgets[i].top = newPos.y;

            obj.widgets[i].setCoords();
            canvas.renderAll();
        }
        previousAngle = option.target.angle;
        previousX = option.target.left;
        previousY = option.target.top;
    }
}

function canvasObjectScaling(option) {

    console.log("canvasObjectScaling");


    if (option.target._objects) {
        option.target._objects.forEach(function(object) {

            if (object.isOutput) {
                outputScaling(option, object, option.target);
            } else if (object.isWidget) {
                widgetSacaling(option, object, option.target);
            }

        });
    }

    if (option.target.type == "importedImage") {
        var obj = option.target;
        var arrayLength = obj.widgets.length;

        for (var i = 0; i < arrayLength; i++) {

            var fx = obj.widgets[i].posRelX * (obj.scaleX * obj.width / 2);
            var fy = obj.widgets[i].posRelY * (obj.scaleY * obj.height / 2);

            var h = Math.sqrt(fx * fx + fy * fy);

            var phi = Math.atan(fy / fx) % (Math.PI / 2);

            var alpha = fabric.util.degreesToRadians(obj.angle % 90);
            newX = obj.getCenterPoint().x + dx;
            newY = obj.getCenterPoint().y + dy;

            var theta = alpha + phi;

            if ((fx > 0 && fy < 0) || (fx < 0 && fy > 0)) {
                theta = alpha - phi;
            }

            console.log("phi: " + fabric.util.radiansToDegrees(phi));
            console.log("alpha: " + fabric.util.radiansToDegrees(alpha));
            console.log("theta: " + fabric.util.radiansToDegrees(theta));

            var dx = h * Math.cos(theta);
            var dy = h * Math.sin(theta);

            var newX, newY;

            if (fx > 0) {
                if (fy > 0) {
                } else {
                    newX = obj.getCenterPoint().x + dx;
                    newY = obj.getCenterPoint().y - dy;
                }
            } else {
                if (fy > 0) {
                    newX = obj.getCenterPoint().x - dx;
                    newY = obj.getCenterPoint().y + dy;
                } else {
                    newX = obj.getCenterPoint().x - dx;
                    newY = obj.getCenterPoint().y - dy;
                }
            }

//                            var newX = obj.getCenterPoint().x + obj.widgets[i].posRelX * (obj.scaleX * obj.width / 2) * Math.cos(fabric.util.degreesToRadians(360 - obj.widgets[i].angle));
//                            var newY = obj.getCenterPoint().y - obj.widgets[i].posRelY * (obj.scaleY * obj.height / 2) * Math.sin(fabric.util.degreesToRadians(360 - obj.widgets[i].angle));

            obj.widgets[i].width = obj.widgets[i].originalWidth * obj.scaleX;
            obj.widgets[i].height = obj.widgets[i].originalHeight * obj.scaleY;

            obj.widgets[i].left = newX;
            obj.widgets[i].top = newY;

            console.log("obj.widgets[i].posRelX: ", obj.widgets[i].posRelX);
            console.log("obj.widgets[i].posRelY: ", obj.widgets[i].posRelY);

            obj.widgets[i].setCoords();
            canvas.renderAll();
        }

        previousAngle = e.target.angle;
        previousX = e.target.left;
        previousY = e.target.top;
    }
}

function canvasObjectMoving(option) {

    console.log("canvasObjectMoving");

    if (option.target._objects) {

        option.target._objects.forEach(function(object) {

            object.lockMovementX = false;
            object.lockMovementY = false;

            if (object.isOutput) {
                outputMoving(option, object, option.target);
            } else if (object.isWidget) {
//                widgetMoving(option, object, option.target);
            } else if (object.isImage) {
                objectMoving(option, object, option.target);
            }

        });
    }

}

function canvasObjectSelected(option) {
    console.log("canvasObjectSelected");
    var activeObject = option.target;

    previousX = activeObject.left;
    previousY = activeObject.top;
    previousAngle = activeObject.angle;

    if (activeObject.isImage) {
        previousX = option.target.left;
        previousY = option.target.top;
        previousAngle = option.target.angle;
    } else if (activeObject.isWidget) {
        widgetApplySelectedStyle(activeObject);
    } else if (activeObject.isOutput) {
        outputApplySelectedStyle(activeObject);
    }
    canvas.renderAll();
}

function canvasSelectionCleared(option) {
    console.log("canvasSelectionCleared");
    if (lastSelectedWidget != null) {
        widgetApplyUnselectedStyle(lastSelectedWidget);
        lastSelectedWidget = null;
    }
    if (lastSelectedOutput != null) {
        outputApplyUnselectedStyle(lastSelectedOutput);
        lastSelectedOutput = null;
    }

    canvas.getObjects().forEach(function(object) {
        if (object.permanentOpacity) {
            object.opacity = object.permanentOpacity;
        } else {
            object.opacity = 1;
        }
    });



    canvas.renderAll();
}

function canvasSelectionCreated(option) {
    console.log("canvasSelectionCreated");

    previousX = option.target.left;
    previousY = option.target.top;
    previousAngle = option.target.angle;

}

function canvasPathCreated(option) {
    console.log("canvasPathCreated");
}

function canvasMouseDown(option) {
//    console.log("canvasMouseDown");
    var event = option['e'];
    event.preventDefault();
}

function canvasMouseMove(option) {
//    console.log("canvasMouseMove");
    var event = option['e'];
    event.preventDefault();
}

function canvasMouseUp(option) {
//    console.log("canvasMouseUp");
    var event = option['e'];
    event.preventDefault();
//    var obj = option.target;
//
//    if (obj.permanentOpacity) {
//        obj.opacity = obj.permanentOpacity;
//    } else {
//        obj.opacity = 1;
//    }




}

function canvasMouseOver(option) {
    console.log("canvasMouseOver");
}

function canvasMouseOut(option) {
    console.log("canvasMouseOut");
}

