function objectAdded(option, targetObject) {
    console.log("objectAdded");
}
function objectRemoved(option, targetObject) {
    console.log("objectRemoved");
}
function objectSelected(option, targetObject) {
    console.log("objectSelected");
}
function objectModified(option, targetObject) {
    console.log("objectModified");
    if (targetObject.movingOpacity) {
        targetObject.opacity = targetObject.movingOpacity;
    } else {
        targetObject.opacity = 0.65;
    }

}
function objectRotating(option, targetObject) {
    console.log("objectRotating");
}
function objectScaling(option, targetObject) {
    console.log("objectScaling");
}
function objectMoving(option, targetObject) {
    console.log("objectMoving");
    if (targetObject.movingOpacity) {
        targetObject.opacity = targetObject.movingOpacity;
    } else {
        targetObject.opacity = 0.65;
    }
}
function objectMousedown(option, targetObject) {
    console.log("objectMousedown");
}





function objectMouseup(option, targetObject) {
    
    
    console.log("objectMouseup:");
    console.log(option);
    
    
    
    var theEvent = option;
    if (fabric.isTouchSupported) {
        theEvent = option['e'];
        console.log("Touch Supported");
    }
    
    console.log("theEvent:");
    console.log(theEvent);
    
    // TODO: Esto funciona en MAC, pero no en Windows! (esto debe ser revisado).
    theEvent = option['e']; 
    
    

    if (targetObject.movingOpacity) {
        targetObject.opacity = targetObject.permanentOpacity;
    } else {
        targetObject.opacity = 1;
    }

    if (targetObject.type == "importedImage") {

//        var theEvent = option['e'];

        if (theEvent) {

            var coordY = theEvent.offsetY;
            var coordX = theEvent.offsetX;

            if (fabric.isTouchSupported && theEvent.touches && theEvent.touches.length > 0) {
                coordX = theEvent.touches[0].pageX - $('#theCanvas').offset().left;
                coordY = theEvent.touches[0].pageY - $('#theCanvas').offset().top;
            }


            console.log("coordX: " + coordX);
            console.log("coordY: " + coordY);

            var localPoint = targetObject.toLocalPoint(new fabric.Point(coordX, coordY), 'left', 'top');

//            console.log(localPoint);



            var relativeX = localPoint.x;
            var relativeY = localPoint.y;



//            console.log("relativeX: " + relativeX);
//            console.log("relativeY: " + relativeY);


            var request = new XMLHttpRequest(); // create a new request object to send to server

//            request.open("POST", "FindObject", true); // set the method and destination
            request.open("POST", "FillArea", true); // set the method and destination

            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            request.onreadystatechange = function() {

                if (request.readyState == 4) { // has the data arrived?
                    if (request.status == 200) { // is everything OK?

                        var textResponse = request.responseText; // getting the result

                        if (textResponse.trim().length > 0) {
                            var response = JSON.parse(textResponse);

                            if (response) {

                                var pathString = response['path'];
                                if (pathString) {

                                    var color = response['meanColor'];
                                    var b = parseFloat(color['val'][0]).toFixed(0);
                                    var g = parseFloat(color['val'][1]).toFixed(0);
                                    var r = parseFloat(color['val'][2]).toFixed(0);

                                    console.log(color);

                                    console.log(r);
                                    console.log(g);
                                    console.log(b);

                                    var massCenter = response['massCenter'];

                                    var x = massCenter['x'];
                                    var y = massCenter['y'];

                                    var path = new fabric.Path(pathString);


                                    var clickPoint = new fabric.Point(localPoint.x + (targetObject.left - targetObject.width / 2), localPoint.y + (targetObject.top - targetObject.height / 2));
//                                    drawRectAt(clickPoint, 'green');

                                    var initialX = clickPoint.x;
                                    var initialY = clickPoint.y;
//                                    console.log("initialX: " + initialX);
//                                    console.log("initialY: " + initialY);

                                    var finalX = x + (targetObject.left - targetObject.width / 2) + path.width / 2;
                                    var finalY = y + (targetObject.top - targetObject.height / 2) + path.height / 2;
//                                    drawRectAt(new fabric.Point(finalX, finalY), 'red');
//                                    console.log("finalX: " + finalX);
//                                    console.log("finalY: " + finalY);

                                    path.set({left: initialX, top: initialY, originX: 'center', originY: 'center', scaleX: 0.1, scaleY: 0.1});
                                    path.stroke = 'red';
                                    path.strokeWidth = 2;
                                    path.strokeDashArray = [5, 5];
//                                    path.fill = 'transparent';
                                    path.fill = 'rgb(' + r + ', ' + g + ', ' + b + ')';
//                                    path.hasControls = false;
//                                    path.hasBorders = false;
//                                    path.selectable = false;
//                                    path.lockRotation = true;
//                                    path.lockScalingX = true;
//                                    path.lockScalingY = true;
//                                    path.hasRotatingPoint = false;
                                    path.opacity = 1;
                                    path.permanentOpacity = path.opacity;
                                    path.movingOpacity = 0.3;

                                    path.borderColor = '#CC3333';
                                    path.cornerColor = '#FFCC00';
                                    path.transparentCorners = false;

//                                    var top = path.top - path.height/2;
//                                    var left = path.left;
//                                    
//                                    path.left = left + path.width/2;
//                                    path.top = top + path.height/2;
//
//                                    path.scaleX = 0.1;
//                                    path.scaleY = 0.1;

                                    canvas.add(path);

                                    animatePath(path, finalY, finalX, 500);

                                    path.on({
                                        'mouseup': function(option) {
                                            widgetMouseup(option, path);
                                        }, 
                                        'moving': function(option) {
                                            widgetMoving(option, path);
                                        } 
                                    });


//                                    targetObject.widgets.push(path);



                                }
                            }
                        }
                    }
                }
            };
            request.send("x=" + relativeX + "&y=" + relativeY + "&imageId=" + targetObject.id); // sending the data to the server
        }
    }


}
