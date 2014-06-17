function appendFileContents(e, t) {
    (function n() {
        if (e.length <= 0)
            return t();
        var r = e.shift();
        if (!r)
            return n();
        fs.readFile(__dirname + "/" + r, function(e, t) {
            if (e)
                throw e;
            var r = String(t);
            noStrict && (r = r.replace(/"use strict";?\n?/, "")), noSVGExport && (r = r.replace(/\/\* _TO_SVG_START_ \*\/[\s\S]*?\/\* _TO_SVG_END_ \*\//g, "")), noES5Compat && (r = r.replace(/\/\* _ES5_COMPAT_START_ \*\/[\s\S]*?\/\* _ES5_COMPAT_END_ \*\//g, "")), noSVGImport && (r = r.replace(/\/\* _FROM_SVG_START_ \*\/[\s\S]*?\/\* _FROM_SVG_END_ \*\//g, "")), distFileContents += "\n" + r + "\n", n()
        })
    })()
}
function ifSpecifiedInclude(e, t) {
    var n = modulesToInclude.indexOf(e) > -1, r = modulesToExclude.indexOf(e) > -1;
    return(n || includeAllModules) && !r ? t : ""
}
function ifSpecifiedDependencyInclude(e, t, n) {
    return(modulesToInclude.indexOf(e) > -1 || includeAllModules) && modulesToExclude.indexOf(t) == -1 ? n : ""
}
function ifSpecifiedAMDInclude(e) {
    var t = ["requirejs"];
    return t.indexOf(e) > -1 ? "src/amd/" + e + ".js" : ""
}
var fs = require("fs"), exec = require("child_process").exec, buildArgs = process.argv.slice(2), buildArgsAsObject = {}, rootPath = process.cwd();
buildArgs.forEach(function(e) {
    var t = e.split("=")[0], n = e.split("=")[1];
    buildArgsAsObject[t] = n
});
var modulesToInclude = buildArgsAsObject.modules ? buildArgsAsObject.modules.split(",") : [], modulesToExclude = buildArgsAsObject.exclude ? buildArgsAsObject.exclude.split(",") : [], distributionPath = buildArgsAsObject.dest || "dist/", minifier = buildArgsAsObject.minifier || "uglifyjs", mininfierCmd, noStrict = "no-strict"in buildArgsAsObject, noSVGExport = "no-svg-export"in buildArgsAsObject, noES5Compat = "no-es5-compat"in buildArgsAsObject, requirejs = "requirejs"in buildArgsAsObject ? "requirejs" : !1, sourceMap = "sourcemap"in buildArgsAsObject, amdLib = requirejs, amdUglifyFlags = "";
amdLib === "requirejs" && minifier !== "uglifyjs" && (console.log("[notice]: require.js support requires uglifyjs as minifier; changed minifier to uglifyjs."), minifier = "uglifyjs", amdUglifyFlags = " -r 'require,exports,window,fabric' -e window:window,undefined ");
var sourceMapFlags = "";
sourceMap && (minifier !== "uglifyjs" && minifier !== "closure" && (console.log("[notice]: sourceMap support requires uglifyjs or google closure compiler as minifier; changed minifier to uglifyjs."), minifier = "uglifyjs"), sourceMapFlags = minifier === "uglifyjs" ? " --source-map fabric.min.js.map" : " --create_source_map fabric.min.js.map --source_map_format=V3"), minifier === "yui" ? mininfierCmd = "java -jar " + rootPath + "/lib/yuicompressor-2.4.6.jar fabric.js -o fabric.min.js" : minifier === "closure" ? mininfierCmd = "java -jar " + rootPath + "/lib/google_closure_compiler.jar --js fabric.js --js_output_file fabric.min.js" + sourceMapFlags : minifier === "uglifyjs" && (mininfierCmd = "uglifyjs " + amdUglifyFlags + " --output fabric.min.js fabric.js" + sourceMapFlags);
var buildSh = "build-sh"in buildArgsAsObject, buildMinified = "build-minified"in buildArgsAsObject, includeAllModules = modulesToInclude.length === 1 && modulesToInclude[0] === "ALL" || buildMinified, noSVGImport = modulesToInclude.indexOf("parser") === -1 && !includeAllModules || modulesToExclude.indexOf("parser") > -1, distFileContents = "/* build: `node build.js modules=" + modulesToInclude.join(",") + (modulesToExclude.length ? " exclude=" + modulesToExclude.join(",") : "") + (noStrict ? " no-strict" : "") + (noSVGExport ? " no-svg-export" : "") + (noES5Compat ? " no-es5-compat" : "") + (requirejs ? " requirejs" : "") + (sourceMap ? " sourcemap" : "") + " minifier=" + minifier + "` */", filesToInclude = ["HEADER.js", ifSpecifiedDependencyInclude("text", "cufon", "lib/cufon.js"), ifSpecifiedDependencyInclude("serialization", "json", "lib/json2.js"), ifSpecifiedInclude("gestures", "lib/event.js"), "src/mixins/observable.mixin.js", "src/mixins/collection.mixin.js", "src/util/misc.js", "src/util/arc.js", "src/util/lang_array.js", "src/util/lang_object.js", "src/util/lang_string.js", "src/util/lang_function.js", "src/util/lang_class.js", "src/util/dom_event.js", "src/util/dom_style.js", "src/util/dom_misc.js", "src/util/dom_request.js", "src/log.js", ifSpecifiedInclude("animation", "src/util/animate.js"), ifSpecifiedInclude("easing", "src/util/anim_ease.js"), ifSpecifiedInclude("parser", "src/parser.js"), ifSpecifiedInclude("parser", "src/elements_parser.js"), "src/point.class.js", "src/intersection.class.js", "src/color.class.js", ifSpecifiedInclude("gradient", "src/gradient.class.js"), ifSpecifiedInclude("pattern", "src/pattern.class.js"), ifSpecifiedInclude("shadow", "src/shadow.class.js"), "src/static_canvas.class.js", ifSpecifiedInclude("freedrawing", "src/brushes/base_brush.class.js"), ifSpecifiedInclude("freedrawing", "src/brushes/pencil_brush.class.js"), ifSpecifiedInclude("freedrawing", "src/brushes/circle_brush.class.js"), ifSpecifiedInclude("freedrawing", "src/brushes/spray_brush.class.js"), ifSpecifiedInclude("freedrawing", "src/brushes/pattern_brush.class.js"), ifSpecifiedInclude("interaction", "src/canvas.class.js"), ifSpecifiedInclude("interaction", "src/mixins/canvas_events.mixin.js"), ifSpecifiedInclude("interaction", "src/mixins/canvas_grouping.mixin.js"), "src/mixins/canvas_dataurl_exporter.mixin.js", ifSpecifiedInclude("serialization", "src/mixins/canvas_serialization.mixin.js"), ifSpecifiedInclude("gestures", "src/mixins/canvas_gestures.mixin.js"), "src/shapes/object.class.js", "src/mixins/object_origin.mixin.js", "src/mixins/object_geometry.mixin.js", "src/mixins/object_stacking.mixin.js", "src/mixins/object.svg_export.js", "src/mixins/stateful.mixin.js", ifSpecifiedInclude("interaction", "src/mixins/object_interactivity.mixin.js"), ifSpecifiedInclude("animation", "src/mixins/animation.mixin.js"), "src/shapes/line.class.js", "src/shapes/circle.class.js", "src/shapes/triangle.class.js", "src/shapes/ellipse.class.js", "src/shapes/rect.class.js", "src/shapes/polyline.class.js", "src/shapes/polygon.class.js", "src/shapes/path.class.js", "src/shapes/path_group.class.js", "src/shapes/group.class.js", "src/shapes/image.class.js", ifSpecifiedInclude("object_straightening", "src/mixins/object_straightening.mixin.js"), ifSpecifiedInclude("image_filters", "src/filters/base_filter.class.js"), ifSpecifiedInclude("image_filters", "src/filters/brightness_filter.class.js"), ifSpecifiedInclude("image_filters", "src/filters/convolute_filter.class.js"), ifSpecifiedInclude("image_filters", "src/filters/gradienttransparency_filter.class.js"), ifSpecifiedInclude("image_filters", "src/filters/grayscale_filter.class.js"), ifSpecifiedInclude("image_filters", "src/filters/invert_filter.class.js"), ifSpecifiedInclude("image_filters", "src/filters/mask_filter.class.js"), ifSpecifiedInclude("image_filters", "src/filters/noise_filter.class.js"), ifSpecifiedInclude("image_filters", "src/filters/pixelate_filter.class.js"), ifSpecifiedInclude("image_filters", "src/filters/removewhite_filter.class.js"), ifSpecifiedInclude("image_filters", "src/filters/sepia_filter.class.js"), ifSpecifiedInclude("image_filters", "src/filters/sepia2_filter.class.js"), ifSpecifiedInclude("image_filters", "src/filters/tint_filter.class.js"), ifSpecifiedInclude("text", "src/shapes/text.class.js"), ifSpecifiedInclude("cufon", "src/shapes/text.cufon.js"), ifSpecifiedInclude("itext", "src/shapes/itext.class.js"), ifSpecifiedInclude("itext", "src/mixins/itext_behavior.mixin.js"), ifSpecifiedInclude("itext", "src/mixins/itext_click_behavior.mixin.js"), ifSpecifiedInclude("itext", "src/mixins/itext_key_behavior.mixin.js"), ifSpecifiedInclude("itext", "src/mixins/itext.svg_export.js"), ifSpecifiedInclude("node", "src/node.js"), ifSpecifiedAMDInclude(amdLib)];
if (buildMinified)
    for (var i = 0; i < filesToInclude.length; i++) {
        if (!filesToInclude[i])
            continue;
        var fileNameWithoutSlashes = filesToInclude[i].replace(/\//g, "^");
        exec("uglifyjs -nc " + amdUglifyFlags + filesToInclude[i] + " > tmp/" + fileNameWithoutSlashes)
    }
else if (buildSh) {
    var filesStr = filesToInclude.join(" "), isBasicBuild = modulesToInclude.length === 0, minFilesStr = filesToInclude.filter(function(e) {
        return e !== ""
    }).map(function(e) {
        return"tmp/" + e.replace(/\//g, "^")
    }).join(" "), fileName = isBasicBuild ? "fabric" : modulesToInclude.join(","), escapedHeader = distFileContents.replace(/`/g, "\\`"), path = "../fabricjs.com/build/files/" + fileName + ".js";
    fs.appendFile("build.sh", 'echo "' + escapedHeader + '" > ' + path + " && cat " + filesStr + " >> " + path + "\n"), path = "../fabricjs.com/build/files/" + fileName + ".min.js", fs.appendFile("build.sh", 'echo "' + escapedHeader + '" > ' + path + " && cat " + minFilesStr + " >> " + path + "\n")
} else
    process.chdir(distributionPath), appendFileContents(filesToInclude, function() {
        fs.writeFile("fabric.js", distFileContents, function(e) {
            if (e)
                throw console.log(e), e;
            amdLib !== !1 && exec("uglifyjs fabric.js " + amdUglifyFlags + " -b --output fabric.js"), amdLib !== !1 ? console.log("Built distribution to " + distributionPath + "fabric.js (" + amdLib + "-compatible)") : console.log("Built distribution to " + distributionPath + "fabric.js"), exec(mininfierCmd, function(e, t) {
                e && (console.error("Minification failed using", minifier, "with", mininfierCmd), process.exit(1)), console.log("Minified using", minifier, "to " + distributionPath + "fabric.min.js"), sourceMapFlags && console.log("Built sourceMap to " + distributionPath + "fabric.min.js.map"), exec("gzip -c fabric.min.js > fabric.min.js.gz", function(e, t) {
                    console.log("Gzipped to " + distributionPath + "fabric.min.js.gz")
                })
            }), amdLib === !1 && (amdLib = "requirejs", filesToInclude[filesToInclude.length] = ifSpecifiedAMDInclude(amdLib)), appendFileContents(filesToInclude, function() {
                fs.writeFile("fabric.require.js", distFileContents, function(e) {
                    if (e)
                        throw console.log(e), e;
                    exec("uglifyjs fabric.require.js " + amdUglifyFlags + " -b --output fabric.require.js"), console.log("Built distribution to " + distributionPath + "fabric.require.js (requirejs-compatible)")
                })
            })
        })
    });