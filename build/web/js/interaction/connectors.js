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
        originY: 'center',
        isConnector: true
    });
}

function removeConnector(connector) {
    // removing the configurator associated to this connector
    connector.configurator.remove();
    var pos = findElementPosition(connector.widget.connectors, connector);
    if (pos.length != 0) {
        connector.widget.connectors.splice(pos[0],1);
    }
    canvas.remove(connector);
    canvas.renderAll();    
}

