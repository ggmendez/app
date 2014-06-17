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
    if (targetWidget.movingOpacity) {
        targetWidget.opacity = targetWidget.movingOpacity;
    } else {
        targetWidget.opacity = 0.6;
    }
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

function animatePath(path, top, left, duration) {
    var easing = fabric.util.ease.easeOutBounce;
    path.animate('top', top, {
        onChange: canvas.renderAll.bind(canvas),
        duration: duration,
        easing: easing
    });
    path.animate('left', left, {
        onChange: canvas.renderAll.bind(canvas),
        duration: duration,
        easing: easing
    });
    path.animate('scaleX', 1, {
        onChange: canvas.renderAll.bind(canvas),
        duration: duration,
        easing: easing
    });
    path.animate('scaleY', 1, {
        onChange: canvas.renderAll.bind(canvas),
        duration: duration,
        easing: easing,
        onComplete: function() {
//            path.fill = 'transparent';
//            path.opacity = 1;
            canvas.renderAll();
        }
    });
}