<%@page import="classes.OpenCVLoader"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Application</title>
        <meta charset="UTF-8">


        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">


        <meta name="description" content="" />

        <link rel="stylesheet" type="text/css" href="./css/main.css" />
        <link rel="stylesheet" type="text/css" href="./css/kickstart.css" media="all" />
        <link rel="stylesheet" type="text/css" href="./style.css" media="all" />

        <script type="text/javascript" src="./js/jquery-ui-1.10.4/js/jquery-1.10.2.js"></script>
        <script type="text/javascript" src="./js/jquery-ui-1.10.4/js/jquery.ajaxfileupload.js"></script>
        <script type="text/javascript" src="./js/jquery-ui-1.10.4/js/jquery-ui-1.10.4.js"></script>
        <script type="text/javascript" src="./js/jquery-ui-1.10.4/js/jquery-ui-1.10.4.min.js"></script>


        <script type="text/javascript" src="./js/kickstart.js"></script>


        <script type="text/javascript" src="./js/interaction/canvasEvents.js"></script>
        <script type="text/javascript" src="./js/interaction/objectsEvents.js"></script>
        <script type="text/javascript" src="./js/interaction/widgetsEvents.js"></script>
        <script type="text/javascript" src="./js/util/generalFunctions.js"></script>



        <script type="text/javascript" src="./fabric.js-1.4.5/dist/fabric.js"></script>

        <script type="text/javascript" src="./js/alertify.js-0.3.11/lib/alertify.js"></script>

        <script type="text/javascript" src="./js/jquery.ui.touch-punch.min.js"></script>

        <script type="text/javascript" src="./js/event.js/js/Event.js"></script>

        <!-- include the core styles -->
        <link rel="stylesheet" href="./js/alertify.js-0.3.11/themes/alertify.core.css" />
        <link rel="stylesheet" href="./js/alertify.js-0.3.11/themes/alertify.default.css" />

        <% new OpenCVLoader();%>

    </head>

    <body>

        <!-- Menu Horizontal -->
        <ul class="menu">

            <li> <a href="javascript:onLoad();"><i class="icon-plus-sign icon-large"></i> Import Image</a></li>
            <li> <input type="file" id="fileInput" name="someFile" onchange="handleFiles(this.files)" style="visibility:hidden;position:absolute;top:-50;left:-50"/></li>


            <li class="verticalLeftDivider"><a href="javascript:void(0);" onclick=""><i class="icon-hand-up icon-large"></i> Object manipulation</a></li>
            <li><a href="javascript:void(0);" onclick=""><i class="icon-magic icon-large"></i> Magic selection</a></li>


            <li><a href="javascript:void(0);" onclick=""><i class="icon-pencil icon-large"></i> Drawing mode</a></li>

            <li id="drawingMenu" ><a href="#"><i class="icon-cog icon-large"></i></a>
                <ul>
                    <li><a id="drawingModeActivatorLink" href="javascript:toggleDrawingMode();"><i id="checkDrawingMode" class="icon-check-empty"></i> Activate</a></li>

                    <li class="divider"><a href="javascript:setBrushColor();"><i class="icon-tint icon-large"></i> Brush color</a></li>
                    <li> <input type="color" value="#005E7A" id="colorChooser" style="visibility:hidden;position:absolute;top:-50;left:-50"/></li>

                    <li><a href="#"><i class="icon-magic icon-large"></i> Brush style</a>
                        <ul>
                            <li><a href="javascript:void(0);"><i class="icon-reorder icon-large"></i> Line</a>
                                <ul>
                                    <li><a href="javascript:void(0);" onclick="setBrushMode('Pencil');
                                            setLineWidth(5);"><i class="icon-minus icon-large"></i></a></li>
                                    <li><a href="javascript:void(0);" onclick="setBrushMode('Pencil');
                                            setLineWidth(7);"><i class="icon-minus icon-2x"></i></a></li>
                                    <li><a href="javascript:void(0);" onclick="setBrushMode('Pencil');
                                            setLineWidth(9);"><i class="icon-minus icon-3x"></i></a></li>
                                    <li><a href="javascript:void(0);" onclick="setBrushMode('Pencil');
                                            setLineWidth(11);"><i class="icon-minus icon-4x"></i></a></li>
                                </ul>
                            </li>
                            <li><a href="javascript:void(0);" onclick="setBrushMode('Circle');"><i class="icon-spinner icon-large"></i> Circle</a></li>
                            <li><a href="javascript:void(0);" onclick="setBrushMode('Spray');"><i class="icon-certificate"></i> Spray</a></li>
                        </ul>
                    </li>                    
                </ul>
            </li>






            <li class="verticalLeftDivider"><a href="javascript:void(0);" onclick="draw('Rectangle');"><i class="icon-stop icon-large"></i> Rectangle</a></li>
            <li ><a href="javascript:void(0);" onclick="draw('Circle');"><i class="icon-circle icon-large"></i> Circle</a></li>
            <li ><a href="javascript:void(0);" onclick="draw('Ellipse');"><i class="icon-circle icon-large"></i> Circle</a></li>


            <li class="verticalLeftDivider"><a href="javascript:void(0);" onclick="deleteAllObjects();"><i class="icon-trash icon-large"></i> Remove all</a></li>









        </ul>

        <div class="grid">

            <!-- ===================================== END HEADER ===================================== -->

            <div class="col_12">            



                <div class="rightPanel">


                    <h6>Object actions</h6>
                    <ul class="icons">

                        <li class="clicElement"> <a onclick="duplicateObject();" ><i class="icon-copy icon-large"></i> Duplicate</a></li>

                        <li class="clicElement"> <a onclick="bringToFront();"><i class="icon-chevron-up icon-large"></i> Bring to front</a></li>

                        <li class="clicElement"> <a onclick="sendToBack();"><i class="icon-chevron-down icon-large"></i> Send to back</a></li>

                        <li class="clicElement"> <a onclick="bringForward();"><i class="icon-double-angle-up icon-large"></i> Bring forwards</a></li>

                        <li class="clicElement"> <a onclick="sendBackwards();"><i class=" icon-double-angle-down icon-large"></i> Send backwards</a></li>

                        <li class="clicElement"> <a onclick="deleteObject();"><i class="icon-minus-sign icon-large"></i> Remove</a></li>

                    </ul>

                    <hr />

                    <h6>Draggable widgets</h6>

                    <ul class="icons">

                        <li id="horizontal-grower" draggable="true" class="dragElement"><i class="icon-resize-horizontal icon-large"></i> Horizontal grower</li>

                        <!--                        <li id="drag-test" draggable="true" class="dragElement"><i class="icon-resize-horizontal icon-large"></i> Drag test</li>-->

                        <li id="vertical-grower" draggable="true" class="dragElement"><a><i class="icon-resize-vertical icon-large"></i> Vertical grower</a></li>

                        <li id="square-grower" draggable="true" class="dragElement"><a><i class="icon-fullscreen icon-large"></i> Square grower</a></li>

                    </ul>



                    <hr />

                    <h6>Configuration</h6>

                    <hr />




                </div>

                <div id="canvasContainer" onmousemove="mouseMoved(event)" class="canvasStyle">
                    <canvas id="theCanvas"></canvas>
                </div>


                <hr />

                <div class="col_3">
                    <h5><span id="display"></span></h5>

                    <ul class="icons">
                        <li ><i class="icon-envelope"></i>Development team</li>


                    </ul>
                </div>

                <div class="col_3">
                    <h5>Share</h5>
                    <i class="icon-facebook-sign icon-3x"></i>
                    <i class="icon-twitter icon-3x"></i>
                    <i class="icon-google-plus icon-3x"></i>
                </div>

                <div class="col_3">
                    <h5>Column 3</h5>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore 
                        magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis</p>
                </div>

                <div class="col_3">
                    <h5>Column 4</h5>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore 
                        magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis</p>
                </div>









            </div>

        </div><!-- END GRID -->

        <!-- ===================================== START FOOTER ===================================== -->
        <div class="clear"></div>
        <div id="footer">
            &copy; 2014 The <a href="https://www.st-andrews.ac.uk/">University of St Andrews</a> is a charity registered in Scotland, No SC013532.
            <br />
            College Gate, St Andrews, Fife KY16 9AJ, Scotland, United Kingdom. Telephone: +44 (0)1334 476161
            <br />

        </div>




        <script>

            // global variables
            var previousX = null;
            var previousY = null;
            var previousAngle = null;

            alertify.set({buttonReverse: true});
            var brushColor = "#000000";
            var brushWidth = 5;
            var width = $('#canvasContainer').width();
            var height = $('#canvasContainer').height();

            function onLoad() {
                var fileInput = document.getElementById('fileInput');
                fileInput.click();
            }

            function handleFiles(files) {
                var file = files[0];
                var reader = new FileReader();
                reader.onload = onFileReadComplete;
                //reader.readAsText(file);
                reader.readAsDataURL(file);
            }

            function onFileReadComplete(event) {

                var img = new Image();
                img.onload = function() {
                    // draw imported image
                    var imgInstance = new fabric.Cropzoomimage(this, {
                        originX: 'center',
                        originY: 'center',
                        left: width / 2,
                        top: height / 2
                    });

                    imgInstance.centeredRotation = true;

                    imgInstance.type = "importedImage";
                    imgInstance.widgets = new Array();

                    // TODO: If a widget is dragged out of its parent, this should be removed from its parent's widgets list
                    // and its parentObject property should be updated correspondingly
                    // Also, if a widget is dragged from one object to another, it should updated properly: angle, position
                    // and the corresponding properties ob both

                    imgInstance.set({
                        borderColor: '#CC3333',
                        //borderColor: canvas.backgroundColor,
                        cornerColor: '#FFCC00',
                        transparentCorners: false,
                        cornerSize: 25,
                        padding: 0,
                        movingOpacity: 0.65,
                        permanentOpacity: 1,
                        opacity: 1,
                        stroke: '#CC3333'
                    });

                    canvas.add(imgInstance);

                    var d = new Date();
                    var df = d.getMonth() + '-' + d.getDate() + '-' + d.getYear() + ' ' + (d.getHours() + 1) + '_' + d.getMinutes() + '_' + d.getSeconds();

                    imgInstance.id = df;

                    console.log(df);

                    var request = new XMLHttpRequest();
                    request.open("POST", "UploadFile", false);
                    var boundary = Math.random().toString().substr(2);
                    request.setRequestHeader("content-type", "multipart/form-data; charset=utf-8; boundary=" + boundary);
                    var multipart = "--" + boundary + "\r\n" +
                            "Content-Disposition: form-data; name=" + imgInstance.id + "\r\n" +
                            "Content-type: image/png\r\n\r\n" +
                            imgInstance.toDataURL("image/png") + "\r\n" +
                            "--" + boundary + "--\r\n";

                    request.onreadystatechange = function() {
                        if (request.readyState == 4) { // has the data arrived?
                            if (request.status == 200) { // is everything OK?
                                var textResponse = request.responseText; // getting the result
                                var objects = JSON.parse(textResponse);

                                for (var i in objects) {

                                    var obj = objects[i];
                                    var rect = new fabric.Rect(obj);
                                    rect.originX = 'center';
                                    rect.originY = 'center';
                                    rect.top = rect.top + imgInstance.top - imgInstance.height / 2 + rect.height / 2;
                                    rect.left = rect.left + imgInstance.left - imgInstance.width / 2 + rect.width / 2;
                                    rect.stroke = '#00FF00';
                                    rect.fill = 'transparent';
                                    rect.hasControls = false;
                                    rect.hasBorders = false;
                                    rect.selectable = false;
                                    rect.lockRotation = true;
                                    rect.lockScalingX = true;
                                    rect.lockScalingY = true;
                                    rect.hasRotatingPoint = false;

                                    imgInstance.widgets.push(rect);

                                    canvas.add(rect);
                                }

                                alertify.log("Image imported: " + objects.length + " faces detected!", "", 2000);
                            }
                        }
                    };

                    request.send(multipart);

                    canvas.setActiveObject(imgInstance);

                    imgInstance.on('mouseup', function(option) {
                        objectMouseup(option, imgInstance);
                    });
                    imgInstance.on('modified', function(option) {
                        objectModified(option, imgInstance);
                    });
                    imgInstance.on('moving', function(option) {
                        objectMoving(option, imgInstance);
                    });

                    disableDrawingMode();

                };
                img.src = event.target.result;
            }



//            var canvasContainer = document.querySelector('#canvasContainer');
//            console.log(canvasContainer);            
//            canvasContainer.addEventListener('swipe', function(event) {
//                console.log("Hola");
//                // fingers, minFingers, maxFingers
//                console.log(event, "gesture", "identifier", "state", "fingers", "rotation", "scale");
//            });
//

            // create a wrapper around native canvas element (with id="theCanvas")
            var canvas = new fabric.Canvas('theCanvas', {backgroundColor: "#ffffff"});

//            canvas.on("touch:drag", function(option) {
//                console.log(option);
//            });
//            

//
//            canvas.on("touchstart", function(option) {
//                console.log(option);
//            });

            canvas.allowTouchScrolling = false;

            canvas.setWidth(width);
            canvas.setHeight(height);
            var lastCopiedObject = null;

            canvas.on({
//                'mouse:up': function(option) {
//                    canvasMouseUp(option);
//                },
                'object:moving': function(option) {
                    canvasObjectMoving(option);
                },
                'object:modified': function(option) {
                    canvasObjectModified(option);
                },
                'object:selected': function(option) {
                    canvasObjectSelected(option);
                },
                'object:rotating': function(option) {
                    canvasObjectRotating(option);
                },
                'object:scaling': function(option) {
                    canvasObjectScaling(option);
                },
                'mouse:down': function(option) {
                    canvasMouseDown(option);
                },
                'mouse:move': function(option) {
                    canvasMouseMove(option);
                }
            });

            createListenersKeyboard();
            var copiedObject;
            var copiedObjects = new Array();
            var canvasScale = 1;
            var SCALE_FACTOR = 1.2;
            // button Zoom In
            $("#btnZoomIn").click(function() {
                zoomIn();
            });
            // button Zoom Out
            $("#btnZoomOut").click(function() {
                zoomOut();
            });
            // button Reset Zoom
            $("#btnResetZoom").click(function() {
                resetZoom();
            });
            function createListenersKeyboard() {
                document.onkeydown = onKeyDownHandler;
            }

            function ableToShortcut() {
                return true;
            }

            function onKeyDownHandler(event) {

                event.preventDefault();
                var key = window.event ? window.event.keyCode : event.keyCode;
//                var key;
//                if (window.event) {
//                    key = window.event.keyCode;
//                } else {
//                    key = event.keyCode;
//                }



                switch (key) {




                    case 173:
                    case 109: // -
                        if (event.ctrlKey || event.metaKey) {

                            return objManip('zoomBy-z', -10);
                        }
                        return true;
                    case 61:
                    case 107: // +
                        if (event.ctrlKey || event.metaKey) {
                            return objManip('zoomBy-z', 10);
                        }
                        return true;
                    case 37: // left
                        if (event.shiftKey) {
                            return objManip('zoomBy-x', -1);
                            return false;
                        }
                        if (event.ctrlKey || event.metaKey) {
                            return objManip('angle', -1);
                        }
                        return objManip('left', -1);
                    case 39: // right
                        if (event.shiftKey) {
                            return objManip('zoomBy-x', 1);
                            return false;
                        }
                        if (event.ctrlKey || event.metaKey) {
                            return objManip('angle', 1);
                        }
                        return objManip('left', 1);
                    case 38: // up
                        if (event.shiftKey) {
                            return objManip('zoomBy-y', -1);
                        }
                        if (!event.ctrlKey && !event.metaKey) {
                            return objManip('top', -1);
                        }
                        return true;
                    case 40: // down
                        if (event.shiftKey) {
                            return objManip('zoomBy-y', 1);
                        }
                        if (!event.ctrlKey && !event.metaKey) {
                            return objManip('top', 1);
                        }
                        return true;
                        // Delete
                    case 46:
                        deleteObject();
                        break;
                        // Copy (Ctrl+C)
                    case 67: // Ctrl+C
                        if (ableToShortcut()) {
                            if (event.ctrlKey) {
                                var activeObject = canvas.getActiveObject();
                                if (activeObject) {
                                    lastCopiedObject = fabric.util.object.clone(activeObject);
                                    lastCopiedObject.set({
                                        left: width / 2 - lastCopiedObject.width / 2,
                                        top: height / 2 - lastCopiedObject.height / 2
                                    });
                                    alertify.log("Object copied", "", 3000);
                                } else if (canvas.getActiveGroup()) {
                                    alertify.error("Select only one object", "", 3000);
                                }
                            }
                        }
                        break;
                        // Paste (Ctrl+V)
                    case 86: // Ctrl+V
                        if (ableToShortcut()) {
                            if (event.ctrlKey) {
                                if (lastCopiedObject) {
                                    pastedObject = fabric.util.object.clone(lastCopiedObject);
                                    canvas.add(pastedObject);
                                    canvas.setActiveObject(pastedObject);
                                    canvas.renderAll();
                                }
                            }
                        }
                        break;
                }
            }

            // Zoom In
            function zoomIn() {


                // limiting the canvas zoom scale 

                if (canvasScale < 2.9) {
                    canvasScale = canvasScale * SCALE_FACTOR;
                    canvas.setHeight(canvas.getHeight() * SCALE_FACTOR);
                    canvas.setWidth(canvas.getWidth() * SCALE_FACTOR);
                    var objects = canvas.getObjects();
                    for (var i in objects) {
                        var scaleX = objects[i].scaleX;
                        var scaleY = objects[i].scaleY;
                        var left = objects[i].left;
                        var top = objects[i].top;
                        var tempScaleX = scaleX * SCALE_FACTOR;
                        var tempScaleY = scaleY * SCALE_FACTOR;
                        var tempLeft = left * SCALE_FACTOR;
                        var tempTop = top * SCALE_FACTOR;
                        objects[i].scaleX = tempScaleX;
                        objects[i].scaleY = tempScaleY;
                        objects[i].left = tempLeft;
                        objects[i].top = tempTop;
                        objects[i].setCoords();
                    }

                    canvas.renderAll();
                }
            }

            // Zoom Out
            function zoomOut() {
                // limiting the zoom out scale 
                if (canvasScale > 0.61) {

                    canvasScale = canvasScale / SCALE_FACTOR;
                    canvas.setHeight(canvas.getHeight() * (1 / SCALE_FACTOR));
                    canvas.setWidth(canvas.getWidth() * (1 / SCALE_FACTOR));
                    var objects = canvas.getObjects();
                    for (var i in objects) {
                        var scaleX = objects[i].scaleX;
                        var scaleY = objects[i].scaleY;
                        var left = objects[i].left;
                        var top = objects[i].top;
                        var tempScaleX = scaleX * (1 / SCALE_FACTOR);
                        var tempScaleY = scaleY * (1 / SCALE_FACTOR);
                        var tempLeft = left * (1 / SCALE_FACTOR);
                        var tempTop = top * (1 / SCALE_FACTOR);
                        objects[i].scaleX = tempScaleX;
                        objects[i].scaleY = tempScaleY;
                        objects[i].left = tempLeft;
                        objects[i].top = tempTop;
                        objects[i].setCoords();
                    }

                    canvas.renderAll();
                }
            }

            // Reset Zoom
            function resetZoom() {

                canvas.setHeight(canvas.getHeight() * (1 / canvasScale));
                canvas.setWidth(canvas.getWidth() * (1 / canvasScale));
                var objects = canvas.getObjects();
                for (var i in objects) {
                    var scaleX = objects[i].scaleX;
                    var scaleY = objects[i].scaleY;
                    var left = objects[i].left;
                    var top = objects[i].top;
                    var tempScaleX = scaleX * (1 / canvasScale);
                    var tempScaleY = scaleY * (1 / canvasScale);
                    var tempLeft = left * (1 / canvasScale);
                    var tempTop = top * (1 / canvasScale);
                    objects[i].scaleX = tempScaleX;
                    objects[i].scaleY = tempScaleY;
                    objects[i].left = tempLeft;
                    objects[i].top = tempTop;
                    objects[i].setCoords();
                }

                canvas.renderAll();
                canvasScale = 1;
            }


            function deleteAllObjects() {

                if (canvas.getObjects().length) {
                    alertify.confirm("Are you sure you want to remove all the objects?", function(e) {
                        if (e) {
                            canvas.clear().renderAll();
                            alertify.log("All objects removed", "", 3000);
                        }
                    });
                }
            }

            function deleteObject() {
                if (canvas.getActiveGroup()) {
                    // confirm dialog
                    alertify.confirm("Are you sure you want to remove all the selected objects?", function(e) {
                        if (e) {
                            canvas.getActiveGroup().forEachObject(function(o) {
                                canvas.remove(o);
                            });
                            canvas.discardActiveGroup().renderAll();
                            alertify.log("Objects removed", "", 3000);
                        }
                    });
                } else if (canvas.getActiveObject()) {
                    // confirm dialog
                    alertify.confirm("Are you sure you want to remove the selected object?", function(e) {
                        if (e) {
                            var obj = canvas.getActiveObject();
                            canvas.remove(obj);
                            if (obj.parentObject) {
                                var index = obj.parentObject.widgets.indexOf(obj);
                                if (index > -1) {
                                    obj.parentObject.widgets.splice(index, 1);
                                    obj.parentObject = null;
                                }
                            }


                            alertify.log("Object removed", "", 3000);
                        }
                    });
                } else {
                    alertify.error("No objects selected");
                }
            }

            function duplicateObject() {
                if (canvas.getActiveGroup()) {
                    alertify.error("Select only one object");
                } else {
                    var activeObject = canvas.getActiveObject();
                    if (activeObject) {
                        var copy = fabric.util.object.clone(activeObject);
                        copy.set({
                            left: width / 2 - copy.width / 2,
                            top: height / 2 - copy.height / 2
                        });
                        canvas.add(copy);
                        canvas.setActiveObject(copy);
                        canvas.renderAll();
                    } else {
                        alertify.error("No objects selected");
                    }
                }
            }

            function bringToFront() {
                if (canvas.getActiveObject()) {
                    canvas.bringToFront(canvas.getActiveObject());
                } else if (canvas.getActiveGroup()) {
                    alertify.error("Select only one object");
                } else {
                    alertify.error("No objects selected");
                }
            }

            function bringForward() {
                if (canvas.getActiveObject()) {
                    canvas.bringForward(canvas.getActiveObject());
                } else if (canvas.getActiveGroup()) {
                    alertify.error("Select only one object");
                } else {
                    alertify.error("No objects selected");
                }
            }

            function sendToBack() {
                if (canvas.getActiveObject()) {
                    canvas.sendToBack(canvas.getActiveObject());
                } else if (canvas.getActiveGroup()) {
                    alertify.error("Select only one object");
                } else {
                    alertify.error("No objects selected");
                }
            }

            function sendBackwards() {
                if (canvas.getActiveObject()) {
                    canvas.sendBackwards(canvas.getActiveObject());
                } else if (canvas.getActiveGroup()) {
                    alertify.error("Select only one object");
                } else {
                    alertify.error("No objects selected");
                }
            }

            function mouseMoved(ev) {
                var x = ev.layerX - $(ev.target).position().left;
                var y = ev.layerY - $(ev.target).position().top;
                $('#display').html(x + " , " + y);
            }

            $("#horizontal-grower").draggable({
                cursorAt: {top: 18.5, left: 8},
                cursor: 'none',
                helper: function(event) {
                    return $("<div style='z-index: 100;'><li><i class='icon-resize-horizontal icon-2x'></i></li></div>");
                }
            });
            $("#vertical-grower").draggable({
                cursorAt: {top: 18.5, left: 8},
                cursor: 'none',
                helper: function(event) {
                    return $("<div style='z-index: 100;'><li><i class='icon-resize-vertical icon-2x'></i></li></div>");
                }
            });
            $("#square-grower").draggable({
                cursorAt: {top: 18.5, left: 8},
                cursor: 'none',
                helper: function(event) {
                    return $("<div style='z-index: 100;'><li><i class='icon-fullscreen icon-2x'></i></li></div>");
                }
            });

            $("#theCanvas").droppable({
                accept: "#horizontal-grower, #vertical-grower, #square-grower",
//                activeClass: "ui-state-hover",
//                hoverClass: "ui-state-active",
                drop: function(ev, ui) {

                    var coordX = ev.clientX;
                    var coordY = ev.clientY;

                    var x = coordX - $(this).offset().left + $(window).scrollLeft();
                    var y = coordY - $(this).offset().top + $(window).scrollTop();

                    var dropedElement = ui.draggable;
                    var id = $(dropedElement).attr("id");
                    var targetObject = null;

                    if (id) {

                        targetObject = getImportedImageContaining(x, y);

                        if (id == "horizontal-grower") {
                            addHorizontalSlider(x, y, targetObject);
                        } else if (id == "vertical-grower") {
                            addVerticalSlider(x, y, targetObject);
                        } else if (id == "square-grower") {
                            addSquareSlider(x, y, targetObject);
                        }

                        disableDrawingMode();
                    }

                }
            });


            function createSlider(x, y, w, h) {
                return new fabric.Rect({
                    originX: 'center',
                    originY: 'center',
                    left: x,
                    top: y,
                    fill: generateRandomColor(),
                    width: w,
                    height: h,
                    movingOpacity: 0.45,
                    permanentOpacity: 0.6,
                    opacity: 0.6,
                    stroke: '#CC3333',
                    borderColor: '#CC3333',
                    cornerColor: '#FFCC00',
                    transparentCorners: false,
                    cornerSize: 10
                });
            }

            function animateSlider(slider, top, left, width, height, duration, sendToBack) {

                var easing = fabric.util.ease['easeOutBounce'];

                slider.animate('top', top, {
                    duration: duration,
                    onChange: canvas.renderAll.bind(canvas),
                    easing: easing
                });
                slider.animate('left', left, {
                    duration: duration,
                    onChange: canvas.renderAll.bind(canvas),
                    easing: easing
                });
                slider.animate('width', width, {
                    duration: duration,
                    onChange: canvas.renderAll.bind(canvas),
                    easing: easing
                });
                slider.animate('height', height, {
                    duration: duration,
                    onChange: canvas.renderAll.bind(canvas),
                    onComplete: function() {
                        if (sendToBack) {
                            canvas.sendToBack(slider);
                        }
                        slider.scaleX = 1;
                        slider.scaleY = 1;
                    },
                    easing: easing
                });
            }

            function addVerticalSlider(x, y, targetObject) {

                var initialWidth = 40;
                var finalWidth = initialWidth;
                var initialHeight = 10;
                var finalHeight = 300;
                var duration = 500;
                var angle = 0;
                var finalTop = y;
                var finalLeft = x;

                var slider = createSlider(x, y, initialWidth, initialHeight);

                slider.type = "verticalSlider";
                canvas.add(slider);
                canvas.setActiveObject(slider);

                if (targetObject && targetObject.type && targetObject.type == "importedImage") {

                    finalHeight = targetObject.height * targetObject.getScaleY() + 30;
                    angle = targetObject.getAngle();
                    slider.setAngle(angle);
                    targetObject.widgets.push(slider);
                    slider.parentObject = targetObject;

                    slider.originalWidth = finalWidth;
                    slider.originalHeight = finalHeight;

                    var finalWidgetLocation = computeLocationOfVerticalWidget(targetObject, slider, finalHeight);
                    finalLeft = finalWidgetLocation[0];
                    finalTop = finalWidgetLocation[1];

//                    console.log("finalLeft: ", finalLeft);
//                    console.log("finalTop ", finalTop);
//
//                    var dx = finalLeft - targetObject.getCenterPoint().x;
//                    var dy = targetObject.getCenterPoint().y - finalTop;
//
//                    console.log("dx ", dx);
//                    console.log("dy ", dy);
//
//                    var theta = Math.atan(dy / dx);
//                    var alpha = fabric.util.degreesToRadians(360 - slider.angle);
//                    var phi = alpha - theta;
//
//                    console.log("theta ", theta);
//                    console.log("alpha ", alpha);
//                    console.log("phi ", phi);
//
//                    var h = Math.sqrt(dx * dx + dy * dy);
//                    console.log("h ", h);
//
//                    var fx = h * Math.cos(phi);
//                    var fy = h * Math.sin(phi);
//
//                    console.log("fx ", fx);
//                    console.log("fy ", fy);
//
//                    slider.posRelX = fx / (targetObject.width / 2);
//                    slider.posRelY = fy / (targetObject.height / 2);
//
//                    console.log("slider.posRelX ", slider.posRelX);
//                    console.log("slider.posRelY ", slider.posRelY);

                    relPos = computeRelativeLocation(targetObject, slider, finalLeft, finalTop);

                    slider.posRelX = relPos[0];
                    slider.posRelY = relPos[1];

                    console.log("slider.posRelX: " + slider.posRelX);
                    console.log("slider.posRelY: " + slider.posRelY);
                }

                animateSlider(slider, finalTop, finalLeft, finalWidth, finalHeight, duration, false);

                slider.setCoords();
                canvas.renderAll();
            }

            function computeRelativeLocation(parent, child, x, y) {

                var dx = x - parent.getCenterPoint().x;
                var dy = y - parent.getCenterPoint().y;

                var multX = x - parent.getCenterPoint().x > 1 ? 1 : -1;

                var theta = Math.atan2(dy, dx);
                var alpha = fabric.util.degreesToRadians(child.angle);
                var phi = alpha - theta;

                console.log("theta ", theta);
                console.log("alpha ", alpha);
                console.log("phi ", phi);

                var multY = fabric.util.radiansToDegrees(theta) >= 90 && fabric.util.radiansToDegrees(theta) <= 270 ? 1 : -1;

                var h = Math.sqrt(dx * dx + dy * dy);
                var fx = h * Math.cos(phi);
                var fy = h * Math.sin(phi);

                var posRelX = fx / (parent.width / 2);
                var posRelY = fy / (parent.height / 2);

                console.log("posRelX: ", posRelX);
                console.log("posRelY: ", posRelY);

                return [posRelX, posRelY];
            }

            function addHorizontalSlider(x, y, targetObject) {

                var initialWidth = 10;
                var finalWidth = 300;
                var initialHeight = 40;
                var finalHeight = initialHeight;
                var duration = 500;
                var angle = 0;
                var finalTop = y;
                var finalLeft = x;

                var slider = createSlider(x, y, initialWidth, initialHeight);

                slider.type = "verticalSlider";
                canvas.add(slider);
                canvas.setActiveObject(slider);

                if (targetObject && targetObject.type && targetObject.type == "importedImage") {

                    finalWidth = targetObject.width * targetObject.getScaleX() + 30;
                    angle = targetObject.getAngle();
                    slider.angle = angle;
                    targetObject.widgets.push(slider);
                    slider.parentObject = targetObject;

                    var finalWidgetLocation = computeLocationOfHorizontalWidget(targetObject, slider, finalHeight);
                    finalLeft = finalWidgetLocation[0];
                    finalTop = finalWidgetLocation[1];
                }

                animateSlider(slider, finalTop, finalLeft, finalWidth, finalHeight, duration, false);

                slider.setCoords();
                canvas.renderAll();
            }

            function addSquareSlider(x, y, targetObject) {

                var initialWidth = 10;
                var initialHeight = 10;
                var finalHeight = 300;
                var finalWidth = 300;
                var duration = 500;
                var centerPoint = new fabric.Point(x, y);
                var angle = 0;

                var slider = createSlider(x, y, initialWidth, initialHeight);

                if (targetObject && targetObject.type && targetObject.type == "importedImage") {
                    finalWidth = targetObject.width * targetObject.getScaleX() + 30;
                    finalHeight = targetObject.height * targetObject.getScaleY() + 30;
                    centerPoint = targetObject.getCenterPoint();
                    angle = targetObject.angle;
                    targetObject.widgets.push(slider);
                    slider.parentObject = targetObject;
                }

                slider.angle = angle;

                canvas.add(slider);
                canvas.setActiveObject(slider);

                var finalTop = centerPoint.y;
                var finalLeft = centerPoint.x;

                animateSlider(slider, finalTop, finalLeft, finalWidth, finalHeight, duration, true);

                targetObject != null ? canvas.setActiveObject(targetObject) : canvas.setActiveObject(slider);

            }

            function toggleDrawingMode() {
                var link = document.getElementById('drawingModeActivatorLink');
                if (link.text == " Activate") {
                    enableDrawingMode();
                } else {
                    disableDrawingMode();
                }
            }

            function setBrushMode(mode) {
                enableDrawingMode();
                canvas.freeDrawingBrush = new fabric[mode + 'Brush'](canvas);
                canvas.freeDrawingBrush.color = brushColor;
                canvas.freeDrawingBrush.width = brushWidth;
                $(drawingMenu).mouseout();
            }
            $("#colorChooser").change(function() {
                var color = $(this).val();
                canvas.freeDrawingBrush.color = color;
                brushColor = color;
                enableDrawingMode();
            });

            function setBrushColor() {
                $(colorChooser).click();
            }

            function disableDrawingMode() {
                $('#drawingModeActivatorLink').html('<i id="checkDrawingMode" class="icon-check-empty"></i> Activate');
                canvas.isDrawingMode = false;
            }
            function enableDrawingMode() {
                $('#drawingModeActivatorLink').html('<i id="checkDrawingMode" class="icon-check"></i> Deactivate');
                canvas.isDrawingMode = true;
            }
            function setLineWidth(width) {
                enableDrawingMode();
                canvas.freeDrawingBrush.width = width;
                brushWidth = width;
                $(drawingMenu).mouseout();
            }

            function getImportedImageContaining(x, y) {
                var theObject = null;
                canvas.forEachObject(function(object) {
                    var point = new fabric.Point(x, y);
                    if (object.type == "importedImage" && object.containsPoint(point)) {
                        theObject = object;
                    }
                });
                return theObject;
            }

            fabric.Cropzoomimage = fabric.util.createClass(fabric.Image, {type: 'cropzoomimage',
                zoomedXY: false,
                initialize: function(element, options)
                {
                    options || (options = {});
                    this.callSuper('initialize', element, options);
                    this.set({
                        orgSrc: element.src,
                        cx: 0, // clip-x
                        cy: 0, // clip-y
                        cw: element.width, // clip-width
                        ch: element.height // clip-height
                    });
                },
                zoomBy: function(x, y, z, callback) {
                    if (x || y) {
                        this.zoomedXY = true;
                    }
                    this.cx += x;
                    this.cy += y;
                    if (z) {
                        this.cw -= z;
                        this.ch -= z / (this.width / this.height);
                    }

                    if (z && !this.zoomedXY) {
                        // Zoom to center of image initially
                        this.cx = this.width / 2 - (this.cw / 2);
                        this.cy = this.height / 2 - (this.ch / 2);
                    }

                    if (this.cw > this.width) {
                        this.cw = this.width;
                    }
                    if (this.ch > this.height) {
                        this.ch = this.height;
                    }
                    if (this.cw < 1) {
                        this.cw = 1;
                    }
                    if (this.ch < 1) {
                        this.ch = 1;
                    }
                    if (this.cx < 0) {
                        this.cx = 0;
                    }
                    if (this.cy < 0) {
                        this.cy = 0;
                    }
                    if (this.cx > this.width - this.cw) {
                        this.cx = this.width - this.cw;
                    }
                    if (this.cy > this.height - this.ch) {
                        this.cy = this.height - this.ch;
                    }

                    this.rerender(callback);
                },
                rerender: function(callback)
                {
                    var img = new Image(), obj = this;
                    img.onload = function() {
                        var canvas = fabric.util.createCanvasElement();
                        canvas.width = obj.width;
                        canvas.height = obj.height;
                        canvas.getContext('2d').drawImage(this, obj.cx, obj.cy, obj.cw, obj.ch, 0, 0, obj.width, obj.height);
                        img.onload = function() {
                            obj.setElement(this);
                            obj.applyFilters(demo.canvas.renderAll.bind(demo.canvas));
                            obj.set({
                                left: obj.left,
                                top: obj.top,
                                angle: obj.angle
                            });
                            obj.setCoords();
                            if (callback) {
                                callback(obj);
                            }
                        };
                        img.src = canvas.toDataURL('image/png');
                    };
                    img.src = this.orgSrc;
                },
                toObject: function()
                {
                    return fabric.util.object.extend(this.callSuper('toObject'), {
                        orgSrc: this.orgSrc,
                        cx: this.cx,
                        cy: this.cy,
                        cw: this.cw,
                        ch: this.ch
                    });
                }
            });
            fabric.Cropzoomimage.async = true;
            fabric.Cropzoomimage.fromObject = function(object, callback) {
                fabric.util.loadImage(object.src, function(img) {
                    fabric.Image.prototype._initFilters.call(object, object, function(filters) {
                        object.filters = filters || [];
                        var instance = new fabric.Cropzoomimage(img, object);
                        if (callback) {
                            callback(instance);
                        }
                    });
                }, null, object.crossOrigin);
            };
            function objManip(prop, value) {

                var obj = canvas.getActiveObject();
                if (!obj) {
                    return true;
                }

                switch (prop) {
                    case 'zoomBy-x':
                        obj.zoomBy(value, 0, 0, function() {
                            demo.canvas.renderAll();
                        });
                        break;
                    case 'zoomBy-y':
                        obj.zoomBy(0, value, 0, function() {
                            demo.canvas.renderAll();
                        });
                        break;
                    case 'zoomBy-z':
                        obj.zoomBy(0, 0, value, function() {
                            demo.canvas.renderAll();
                        });
                        break;
                    default:
                        obj.set(prop, obj.get(prop) + value);
                        break;
                }

                if ('left' === prop || 'top' === prop) {
                    obj.setCoords();
                }
                canvas.renderAll();
                return false;
            }

            function getTransverseHorizontalAxisPoints(object, objectWidth) {

                var theta = 360 - object.getAngle();
                var h = (objectWidth * object.scaleX / 2) * Math.sin(fabric.util.degreesToRadians(theta));
                var b = (objectWidth * object.scaleX / 2) * Math.cos(fabric.util.degreesToRadians(theta));
                var x1 = object.getCenterPoint().x + b;
                var y1 = object.getCenterPoint().y - h;
                var x2 = object.getCenterPoint().x - b;
                var y2 = object.getCenterPoint().y + h;

                var point1 = new fabric.Point(x1, y1);
                var point2 = new fabric.Point(x2, y2);

                return [point1, point2];

            }

            function getTransverseVerticalAxisPoints(object, objectHeight) {

                var theta = 360 - object.getAngle() + 90;
                var h = (objectHeight * object.scaleY / 2) * Math.sin(fabric.util.degreesToRadians(theta));
                var b = (objectHeight * object.scaleY / 2) * Math.cos(fabric.util.degreesToRadians(theta));
                var x1 = object.getCenterPoint().x + b;
                var y1 = object.getCenterPoint().y - h;
                var x2 = object.getCenterPoint().x - b;
                var y2 = object.getCenterPoint().y + h;

                var point1 = new fabric.Point(x1, y1);
                var point2 = new fabric.Point(x2, y2);

                return [point1, point2];

            }

            function computeLocationOfVerticalWidget(object, widget, widgetHeight) {
                var horizontalTraverseAxisPoints = getTransverseHorizontalAxisPoints(object, object.width);
                var p1 = horizontalTraverseAxisPoints[0];
                var p2 = horizontalTraverseAxisPoints[1];
//                drawRectAt(p1, 'red');
//                drawRectAt(p2, 'red');

                var verticalTraverseAxisPoints = getTransverseVerticalAxisPoints(widget, widgetHeight);
                var p3 = verticalTraverseAxisPoints[0];
                var p4 = verticalTraverseAxisPoints[1];
//                drawRectAt(p3, 'green');
//                drawRectAt(p4, 'green');

//                makeLine([p1.x, p1.y, p2.x, p2.y]);
//                makeLine([p3.x, p3.y, p4.x, p4.y]);

                // return getIntersectionPoint(x1, y1, x2, y2, u1, v1, u2, v2);
                var results = checkLineIntersection(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);

//                drawRectAt(new fabric.Point(results.x, results.y), 'blue');

                return [results.x, results.y];

            }


            function computeLocationOfHorizontalWidget(object, widget, widgetWidth) {

                var horizontalTraverseAxisPoints = getTransverseVerticalAxisPoints(object, object.height);
                var p1 = horizontalTraverseAxisPoints[0];
                var p2 = horizontalTraverseAxisPoints[1];

                var verticalTraverseAxisPoints = getTransverseHorizontalAxisPoints(widget, widgetWidth);
                var p3 = verticalTraverseAxisPoints[0];
                var p4 = verticalTraverseAxisPoints[1];

                var results = checkLineIntersection(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
                return [results.x, results.y];
            }



            function getIntersectionPoint(x1, y1, x2, y2, u1, v1, u2, v2) {
                var intersectX = -1 * ((x1 - x2) * (u1 * v2 - u2 * v1) - (u2 - u1) * (x2 * y1 - x1 * y2)) / ((v1 - v2) * (x1 - x2) - (u2 - u1) * (y2 - y1));
                var intersectY = -1 * (u1 * v2 * y1 - u1 * v2 * y2 - u2 * v1 * y1 + u2 * v1 * y2 - v1 * x1 * y2 + v1 * x2 * y1 + v2 * x1 * y2 - v2 * x2 * y1) / (-1 * u1 * y1 + u1 * y2 + u2 * y1 - u2 * y2 + v1 * x1 - v1 * x2 - v2 * x1 + v2 * x2);
                return [intersectX, intersectY];
            }

            function checkLineIntersection(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
                // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
                var denominator, a, b, numerator1, numerator2, result = {
                    x: null,
                    y: null,
                    onLine1: false,
                    onLine2: false
                };
                denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
                if (denominator == 0) {
                    return result;
                }
                a = line1StartY - line2StartY;
                b = line1StartX - line2StartX;
                numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
                numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
                a = numerator1 / denominator;
                b = numerator2 / denominator;

                // if we cast these lines infinitely in both directions, they intersect here:
                result.x = line1StartX + (a * (line1EndX - line1StartX));
                result.y = line1StartY + (a * (line1EndY - line1StartY));
                /*
                 // it is worth noting that this should be the same as:
                 x = line2StartX + (b * (line2EndX - line2StartX));
                 y = line2StartX + (b * (line2EndY - line2StartY));
                 */
                // if line1 is a segment and line2 is infinite, they intersect if:
                if (a > 0 && a < 1) {
                    result.onLine1 = true;
                }
                // if line2 is a segment and line1 is infinite, they intersect if:
                if (b > 0 && b < 1) {
                    result.onLine2 = true;
                }
                // if line1 and line2 are segments, they intersect if both of the above are true
                return result;
            }






            function draw(figureType) {

                disableDrawingMode();

                var hoverCursor = canvas.hoverCursor;
                var defaultCursor = canvas.defaultCursor;
                canvas.hoverCursor = 'crosshair';
                canvas.defaultCursor = 'crosshair';

                var figure = null;

                var downEvent = 'mouse:down';
                var moveEvent = 'mouse:move';
                var upEvent = 'mouse:up';

                canvas.selection = false;

//                if (fabric.isTouchSupported) {
//                    downEvent = 'touchstart';
//                    moveEvent = 'touchmove';
//                    upEvent = 'touchend';
//                }

                canvas.off(moveEvent);
                canvas.off(downEvent);
                canvas.off(upEvent);

                canvas.on(downEvent, function(option) {

                    if (typeof option.target != "undefined") {

                        return;

                    } else {

                        var startY = option.e.offsetY;
                        var startX = option.e.offsetX;

                        if (fabric.isTouchSupported && option.e.touches) {

                            startX = option.e.touches[0].pageX - $('#theCanvas').offset().left;
                            startY = option.e.touches[0].pageY - $('#theCanvas').offset().top;
                        }

                        var f = null;

                        if (figureType == "Rectangle") {
                            f = fabric.Rect;
                        } else if (figureType == "Circle") {
                            f = fabric.Circle;
                        }

                        figure = new f({
                            top: startY,
                            left: startX,
                            width: 0,
                            height: 0,
                            fill: generateRandomColor(),
                            stroke: '#CC3333',
                            borderColor: '#CC3333',
                            cornerColor: '#FFCC00',
                            transparentCorners: false,
                            cornerSize: 10,
                            radius: 0
                        });

                        if (figureType == "Circle") {
                            figure.set('originX', 'center');
                            figure.set('originY', 'center');
                        }

                        canvas.add(figure);

                        canvas.on(moveEvent, function(option) {

                            canvas.hoverCursor = 'crosshair';
                            canvas.defaultCursor = 'crosshair';

                            var currentX = option.e.offsetX;
                            var currentY = option.e.offsetY;

                            if (fabric.isTouchSupported && option.e.touches) {
                                currentX = option.e.touches[0].pageX - $('#theCanvas').offset().left;
                                currentY = option.e.touches[0].pageY - $('#theCanvas').offset().top;
                            }

                            var diffX = currentX - startX;
                            var diffY = currentY - startY;

                            var width = Math.abs(diffX);
                            var height = Math.abs(diffY);

                            if (figureType == "Rectangle") {
                                diffX > 0 ? figure.set('originX', 'left') : figure.set('originX', 'right');
                                diffY > 0 ? figure.set('originY', 'top') : figure.set('originY', 'bottom');
                                figure.set('width', width);
                                figure.set('height', height);
                            } else if (figureType == "Circle") {
                                figure.set('radius', Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)));
                            }

                            figure.setCoords();
                            canvas.renderAll();

                        });

                    }
                });

                canvas.on(upEvent, function(option) {
                    canvas.off(moveEvent);
                    canvas.off(downEvent);
                    canvas.off(upEvent);
                    canvas.setActiveObject(figure);
                    canvas.selection = true;

                    canvas.hoverCursor = hoverCursor;
                    canvas.defaultCursor = defaultCursor;

                });
            }




        </script>


    </body>

</html>