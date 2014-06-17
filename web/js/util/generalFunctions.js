function generateRandomColor() {
    return "#" + ((1 << 24) * Math.random() | 0).toString(16);
}

function drawRectAt(point, color) {
    var rect = new fabric.Rect({
        originX: 'center',
        originY: 'center',
        left: point.x,
        top: point.y,
        fill: color,
        width: 8,
        height: 8
    });
    canvas.add(rect);
    canvas.renderAll();
}

function makeLine(coords) {
    var line = new fabric.Line(coords, {
        originX: 'center',
        originY: 'center',
        fill: 'red',
        stroke: 'red',
        strokeWidth: 1,
        selectable: false
    });
    canvas.add(line);
    canvas.renderAll();
}
