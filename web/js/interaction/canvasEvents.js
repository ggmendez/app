function canvasObjectModified(option) {

    console.log("canvasObjectModified");


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
    
    var obj = option.target;
//
//    if (obj.movingOpacity) {
//        obj.opacity = obj.movingOpacity;
//    } else {
//        obj.opacity = 0.65;
//    }

    if (obj.type == "importedImage") {
        var currentX = option.target.left;
        var currentY = option.target.top;
        var arrayLength = obj.widgets.length;
        for (var i = 0; i < arrayLength; i++) {
            obj.widgets[i].left = obj.widgets[i].left + (currentX - previousX);
            obj.widgets[i].top = obj.widgets[i].top + (currentY - previousY);
            obj.widgets[i].setCoords();
            canvas.renderAll();
        }
        previousAngle = option.target.angle;
        previousX = option.target.left;
        previousY = option.target.top;
    } else if (obj.type.indexOf("slider") > -1) {
        var relPos = computeRelativeLocation(obj.parentObject, obj, obj.left, obj.top);
        obj.posRelX = relPos[0];
        obj.posRelY = relPos[1];

    }


    // TODO: When a widget is moved and dropped out of its parent,
    // this object should be removed from its parent's widgets list
//                            if (e.target.parentObject) {
//                                var index = e.target.parentObject.widgets.indexOf(e.target);
//                                if (index > -1) {
//                                    e.target.parentObject.widgets.splice(index, 1);
//                                    e.target.parentObject = null;
//                                }
//                            }

}

function canvasObjectSelected(option) {
    console.log("canvasObjectSelected");
    if (option.target.type == "importedImage") {
        previousX = option.target.left;
        previousY = option.target.top;
        previousAngle = option.target.angle;
    }

}

function canvasBeforeSelectionCleared(option) {
    console.log("canvasBeforeSelectionCleared");
}

function canvasSelectionCleared(option) {
    console.log("canvasSelectionCleared");
}

function canvasSelectionCreated(option) {
    console.log("canvasSelectionCreated");
}

function canvasPathCreated(option) {
    console.log("canvasPathCreated");
}

function canvasMouseDown(option) {
    console.log("canvasMouseDown");
    var event = option['e'];
    event.preventDefault();
}

function canvasMouseMove(option) {
    console.log("canvasMouseMove");
    var event = option['e'];
    event.preventDefault();
}

function canvasMouseUp(option) {
    console.log("canvasMouseUp");
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

