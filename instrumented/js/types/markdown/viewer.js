if (typeof __$coverObject === "undefined"){
	if (typeof window !== "undefined") window.__$coverObject = {};
	else if (typeof global !== "undefined") global.__$coverObject = {};
	else throw new Error("cannot find the global scope");
}
var __$coverInit = function(name, code){
	__$coverObject[name] = {__code: code}
}
var __$coverInitRange = function(name, range){
	__$coverObject[name][range] = 0;
}
var __$coverCall = function(name, range){
	__$coverObject[name][range]++;
}
__$coverInit("src/js/types/markdown/viewer.js", "var MarkdownJsViewer,\n  __hasProp = {}.hasOwnProperty,\n  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };\n\nMarkdownJsViewer = (function(_super) {\n\n  __extends(MarkdownJsViewer, _super);\n\n  function MarkdownJsViewer() {\n    return MarkdownJsViewer.__super__.constructor.apply(this, arguments);\n  }\n\n  MarkdownJsViewer.prototype.update = function(value, force) {\n    var html;\n    html = window.markdown.toHTML(value);\n    return MarkdownJsViewer.__super__.update.call(this, html, force);\n  };\n\n  return MarkdownJsViewer;\n\n})(TemplateViewer);\n");
__$coverInitRange("src/js/types/markdown/viewer.js", "0:344");
__$coverInitRange("src/js/types/markdown/viewer.js", "347:779");
__$coverInitRange("src/js/types/markdown/viewer.js", "95:180");
__$coverInitRange("src/js/types/markdown/viewer.js", "182:226");
__$coverInitRange("src/js/types/markdown/viewer.js", "228:261");
__$coverInitRange("src/js/types/markdown/viewer.js", "263:291");
__$coverInitRange("src/js/types/markdown/viewer.js", "293:327");
__$coverInitRange("src/js/types/markdown/viewer.js", "329:341");
__$coverInitRange("src/js/types/markdown/viewer.js", "121:178");
__$coverInitRange("src/js/types/markdown/viewer.js", "200:224");
__$coverInitRange("src/js/types/markdown/viewer.js", "389:424");
__$coverInitRange("src/js/types/markdown/viewer.js", "429:535");
__$coverInitRange("src/js/types/markdown/viewer.js", "540:730");
__$coverInitRange("src/js/types/markdown/viewer.js", "735:758");
__$coverInitRange("src/js/types/markdown/viewer.js", "463:531");
__$coverInitRange("src/js/types/markdown/viewer.js", "605:613");
__$coverInitRange("src/js/types/markdown/viewer.js", "619:655");
__$coverInitRange("src/js/types/markdown/viewer.js", "661:725");
__$coverCall('src/js/types/markdown/viewer.js', '0:344');
var MarkdownJsViewer, __hasProp = {}.hasOwnProperty, __extends = function (child, parent) {
        __$coverCall('src/js/types/markdown/viewer.js', '95:180');
        for (var key in parent) {
            __$coverCall('src/js/types/markdown/viewer.js', '121:178');
            if (__hasProp.call(parent, key))
                child[key] = parent[key];
        }
        __$coverCall('src/js/types/markdown/viewer.js', '182:226');
        function ctor() {
            __$coverCall('src/js/types/markdown/viewer.js', '200:224');
            this.constructor = child;
        }
        __$coverCall('src/js/types/markdown/viewer.js', '228:261');
        ctor.prototype = parent.prototype;
        __$coverCall('src/js/types/markdown/viewer.js', '263:291');
        child.prototype = new ctor();
        __$coverCall('src/js/types/markdown/viewer.js', '293:327');
        child.__super__ = parent.prototype;
        __$coverCall('src/js/types/markdown/viewer.js', '329:341');
        return child;
    };
__$coverCall('src/js/types/markdown/viewer.js', '347:779');
MarkdownJsViewer = function (_super) {
    __$coverCall('src/js/types/markdown/viewer.js', '389:424');
    __extends(MarkdownJsViewer, _super);
    __$coverCall('src/js/types/markdown/viewer.js', '429:535');
    function MarkdownJsViewer() {
        __$coverCall('src/js/types/markdown/viewer.js', '463:531');
        return MarkdownJsViewer.__super__.constructor.apply(this, arguments);
    }
    __$coverCall('src/js/types/markdown/viewer.js', '540:730');
    MarkdownJsViewer.prototype.update = function (value, force) {
        __$coverCall('src/js/types/markdown/viewer.js', '605:613');
        var html;
        __$coverCall('src/js/types/markdown/viewer.js', '619:655');
        html = window.markdown.toHTML(value);
        __$coverCall('src/js/types/markdown/viewer.js', '661:725');
        return MarkdownJsViewer.__super__.update.call(this, html, force);
    };
    __$coverCall('src/js/types/markdown/viewer.js', '735:758');
    return MarkdownJsViewer;
}(TemplateViewer);