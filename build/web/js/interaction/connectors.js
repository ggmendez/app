function CreateDefaultConnector(coords, color) {
    return new fabric.Line(coords, {
        fill: 'transparent',
        stroke: color,
        strokeDashArray: [10, 10],
        perPixelTargetFind: true,
        selectable: false,
        strokeLineJoin: 'round',
        strokeWidth: 1,
        opacity: 1,
        originX: 'center',
        originY: 'center'
    });
}