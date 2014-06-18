function widgetAdded(option, targetWidget) {
    console.log("widgetAdded");
}
function widgetRemoved(option, targetWidget) {
    console.log("widgetRemoved");
}
function widgetSelected(option, targetWidget) {
    console.log("widgetSelected");
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
function widgetMoving(option, targetWidget) {
    console.log("widgetMoving");
//    if (targetWidget.movingOpacity) {
//        targetWidget.opacity = targetWidget.movingOpacity;
//    } else {
//        targetWidget.opacity = 0.6;
//    }
}
function widgetMousedown(option, targetWidget) {
    console.log("widgetMousedown");
}

function widgetMouseup(option, targetWidget) {
    console.log("widgetMouseup");
    if (targetWidget.permanentOpacity) {
        targetWidget.opacity = targetWidget.permanentOpacity;
    } else {
        targetWidget.opacity = 1;
    }
    canvas.renderAll();
}

function animatePath(widget, top, left, duration) {
    
    duration *= 2.5;

  
//    var easing = fabric.util.ease.easeOutExpo;
   
    var easing = fabric.util.ease.easeOutElastic;
//    var easing = fabric.util.ease.easeOutBack;
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

            var output = new fabric.Triangle({
                width: 80, height: 80, fill: 'blue', left: 500, top: 300
            });

            var sourcePoint = new fabric.Point(left, top);
            var targetPoint = new fabric.Point(output.getCenterPoint().x, output.getCenterPoint().y);

//            drawRectAt(sourcePoint, 'yellow');
//            drawRectAt(targetPoint, 'blue');

//            var line = new fabric.Line([sourcePoint.x, sourcePoint.y, targetPoint.x, targetPoint.y]);
//            line.set({stroke: 'black', strokeWidth: 4});
//            canvas.add(line);

            var fromX, toX, fromY, toY;

            if (sourcePoint.x > targetPoint.x) {
                fromX = targetPoint.x;
                toX = sourcePoint.x;
            } else {
                fromX = sourcePoint.x;
                toX = targetPoint.x;
            }

            if (sourcePoint.y > targetPoint.y) {
                fromY = targetPoint.y;
                toY = sourcePoint.y;
            } else {
                fromY = sourcePoint.y;
                toY = targetPoint.y;
            }

//            drawRectAt(new fabric.Point(fromX, fromY), 'green');
//            drawRectAt(new fabric.Point(toX, toY), 'purple');

            var stringPath = 'M ' + left + ', ' + top + ' H ' + targetPoint.x + ' V ' + targetPoint.y + '';

            console.log("stringPath: ");
            console.log(stringPath);

            var path = new fabric.Path(stringPath);

            path.set({left: fromX, top: fromY, fill: 'transparent', stroke: '#61B7CF', strokeWidth: 4, perPixelTargetFind: true, selectable: false, strokeLineJoin: 'round'});
            path.strokeDashArray = [8, 8];

            canvas.add(path);

            canvas.bringToFront(widget);
            canvas.add(output);
            canvas.renderAll();

            output.parentWidget = widget;
            if (!widget.outputs) {
                widget.outputs = new Array();
            }
            widget.outputs.push(output);

            widget.on({
                'moving': function(option) {
                    path.path[0][1] = widget.getCenterPoint().x;
                    path.path[0][2] = widget.getCenterPoint().y;
                }
            });

            output.on({
                'moving': function(option) {
                    console.log(path.path[1]);
                    path.path[1][1] = output.left + output.width / 2;
                    path.path[2][1] = output.top + output.height / 2;
                }
            });




            var bezier_params = {
                start: {
                    x: 185,
                    y: 185,
                    angle: 10
                },
                end: {
                    x: 540,
                    y: 110,
                    angle: -10,
                    length: 0.25
                }
            };

            var a = new $.path.bezier(bezier_params);
            console.log("a:");
            console.log(a);








            canvas.renderAll();



        }
    });
}


function applyWidgetStyle(widget) {

}