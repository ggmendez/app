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


    


    console.log("FUNCTION objectMouseup:");

//    console.log("option:");
//    console.log(option);



    var theEvent = option;
    if (fabric.isTouchSupported) {
        theEvent = option['e'];
//        console.log("Touch Supported");
    }

//    console.log("theEvent:");
//    console.log(theEvent);

    if (targetObject.movingOpacity) {
        targetObject.opacity = targetObject.permanentOpacity;
    } else {
        targetObject.opacity = 1;
    }

    if (targetObject.type == "importedImage") {
        
        if (theEvent) {

            // coordX and coordY are the points of the clic relative to the canvas
//            var coordY = theEvent.offsetY;
//            var coordX = theEvent.offsetX;
//
////            console.log("coordX BEFORE: " + coordX);
////            console.log("coordY BEFORE: " + coordY);
//
//            if (fabric.isTouchSupported && theEvent.changedTouches && theEvent.changedTouches.length > 0) {
//                // Here I use the changedTouches list since the up event produces a change in it
//                coordX = theEvent.changedTouches[0].pageX - $('#theCanvas').offset().left;
//                coordY = theEvent.changedTouches[0].pageY - $('#theCanvas').offset().top;
//            }
//
////            console.log("coordX AFTER: " + coordX);
////            console.log("coordY AFTER: " + coordY);
//
//            var localPoint = targetObject.toLocalPoint(new fabric.Point(coordX, coordY), 'left', 'top');

//
////            console.log(localPoint);
//
//
//            // relativeX and relativeY are points local to the top left corner of the target object
//            var relativeX = localPoint.x;
//            var relativeY = localPoint.y;
            
            
            
            
            var localPointer = targetObject.getLocalPointer(option['e']);
            console.log("localPointer");
            console.log(localPointer);
            
            
            var relativeX = localPointer.x;
            var relativeY = localPointer.y;

            console.log("relativeX: " + relativeX);
            console.log("relativeY: " + relativeY);
            
            
            
            


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

//                                    console.log(color);
//                                    console.log(r);
//                                    console.log(g);
//                                    console.log(b);

                                    var massCenter = response['massCenter'];

                                    var x = massCenter['x'];
                                    var y = massCenter['y'];

                                    var widget = new fabric.Path(pathString);


                                    var clickPoint = new fabric.Point(localPointer.x + (targetObject.left - targetObject.width / 2), localPointer.y + (targetObject.top - targetObject.height / 2));
                                    var initialX = clickPoint.x;
                                    var initialY = clickPoint.y;
                                    
                                    
                                    
                                    
                                    
                                    
//                                    console.log("initialX: " + initialX);
//                                    console.log("initialY: " + initialY);

                                    var finalX = x + (targetObject.left - targetObject.width / 2) + widget.width / 2;
                                    var finalY = y + (targetObject.top - targetObject.height / 2) + widget.height / 2;
//                                    drawRectAt(new fabric.Point(finalX, finalY), 'red');
//                                    console.log("finalX: " + finalX);
//                                    console.log("finalY: " + finalY);

                                    widget.set({left: initialX, top: initialY, originX: 'center', originY: 'center', scaleX: 0.1, scaleY: 0.1});
                                    widget.stroke = 'red';
                                    widget.strokeWidth = 2;
                                    widget.strokeDashArray = [5, 5];
//                                    widget.fill = 'transparent';
                                    widget.fill = 'rgb(' + r + ', ' + g + ', ' + b + ')';
//                                    widget.hasControls = false;
//                                    widget.hasBorders = false;
//                                    widget.selectable = false;
//                                    widget.lockRotation = true;
//                                    widget.lockScalingX = true;
//                                    widget.lockScalingY = true;
//                                    widget.hasRotatingPoint = false;
                                    widget.opacity = 1;
                                    widget.permanentOpacity = widget.opacity;
                                    widget.movingOpacity = 0.3;

                                    widget.borderColor = '#CC3333';
                                    widget.cornerColor = '#FFCC00';
                                    widget.transparentCorners = false;

                                    canvas.add(widget);

                                    animatePath(widget, finalY, finalX, 500);

                                    widget.on({
                                        'mouseup': function(option) {
                                            widgetMouseup(option, widget);
                                        },
                                        'moving': function(option) {
                                            widgetMoving(option, widget);
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
