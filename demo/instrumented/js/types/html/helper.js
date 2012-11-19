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
__$coverInit("js/types/html/helper.js", "var HtmlHelper,\n  __hasProp = {}.hasOwnProperty,\n  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };\n\nHtmlHelper = (function(_super) {\n\n  __extends(HtmlHelper, _super);\n\n  function HtmlHelper(core) {\n    var HTML_HELPER_HTML;\n    HtmlHelper.__super__.constructor.call(this, core);\n    HTML_HELPER_HTML = \"<p><span class=\\\"key\\\">Ctrl+Z</span>\" + (Jencil.t(\"Undo\")) + \"<p>\\n<p><span class=\\\"key\\\">Ctrl+Shift+Z</span>\" + (Jencil.t(\"Redo\")) + \"<p>\\n<p><span class=\\\"key\\\">Ctrl+B</span>\" + (Jencil.t(\"Make selected text property as <b>Bold</b>\")) + \"<p>\\n<p><span class=\\\"key\\\">Ctrl+I</span>\" + (Jencil.t(\"Make selected text property as <i>Italic</i>\")) + \"<p>\\n<p><span class=\\\"key\\\">Ctrl+U</span>\" + (Jencil.t(\"Underline selected text like <u>Underline</u>\")) + \"<p>\\n<p><span class=\\\"key\\\">Ctrl+F</span>\" + (Jencil.t(\"Toggle fullscreen mode\")) + \"<p>\\n<p><span class=\\\"key\\\">Ctrl+Q</span>\" + (Jencil.t(\"Toggle quick view\")) + \"<p>\\n<p><span class=\\\"key\\\">Ctrl+H</span>\" + (Jencil.t(\"Toggle help\")) + \"<p>\";\n    this.element.html(HTML_HELPER_HTML);\n  }\n\n  return HtmlHelper;\n\n})(BaseHelper);\n");
__$coverInitRange("js/types/html/helper.js", "0:338");
__$coverInitRange("js/types/html/helper.js", "341:1326");
__$coverInitRange("js/types/html/helper.js", "89:174");
__$coverInitRange("js/types/html/helper.js", "176:220");
__$coverInitRange("js/types/html/helper.js", "222:255");
__$coverInitRange("js/types/html/helper.js", "257:285");
__$coverInitRange("js/types/html/helper.js", "287:321");
__$coverInitRange("js/types/html/helper.js", "323:335");
__$coverInitRange("js/types/html/helper.js", "115:172");
__$coverInitRange("js/types/html/helper.js", "194:218");
__$coverInitRange("js/types/html/helper.js", "377:406");
__$coverInitRange("js/types/html/helper.js", "411:1287");
__$coverInitRange("js/types/html/helper.js", "1292:1309");
__$coverInitRange("js/types/html/helper.js", "443:463");
__$coverInitRange("js/types/html/helper.js", "469:518");
__$coverInitRange("js/types/html/helper.js", "524:1242");
__$coverInitRange("js/types/html/helper.js", "1248:1283");
__$coverCall('js/types/html/helper.js', '0:338');
var HtmlHelper, __hasProp = {}.hasOwnProperty, __extends = function (child, parent) {
        __$coverCall('js/types/html/helper.js', '89:174');
        for (var key in parent) {
            __$coverCall('js/types/html/helper.js', '115:172');
            if (__hasProp.call(parent, key))
                child[key] = parent[key];
        }
        __$coverCall('js/types/html/helper.js', '176:220');
        function ctor() {
            __$coverCall('js/types/html/helper.js', '194:218');
            this.constructor = child;
        }
        __$coverCall('js/types/html/helper.js', '222:255');
        ctor.prototype = parent.prototype;
        __$coverCall('js/types/html/helper.js', '257:285');
        child.prototype = new ctor();
        __$coverCall('js/types/html/helper.js', '287:321');
        child.__super__ = parent.prototype;
        __$coverCall('js/types/html/helper.js', '323:335');
        return child;
    };
__$coverCall('js/types/html/helper.js', '341:1326');
HtmlHelper = function (_super) {
    __$coverCall('js/types/html/helper.js', '377:406');
    __extends(HtmlHelper, _super);
    __$coverCall('js/types/html/helper.js', '411:1287');
    function HtmlHelper(core) {
        __$coverCall('js/types/html/helper.js', '443:463');
        var HTML_HELPER_HTML;
        __$coverCall('js/types/html/helper.js', '469:518');
        HtmlHelper.__super__.constructor.call(this, core);
        __$coverCall('js/types/html/helper.js', '524:1242');
        HTML_HELPER_HTML = '<p><span class="key">Ctrl+Z</span>' + Jencil.t('Undo') + '<p>\n<p><span class="key">Ctrl+Shift+Z</span>' + Jencil.t('Redo') + '<p>\n<p><span class="key">Ctrl+B</span>' + Jencil.t('Make selected text property as <b>Bold</b>') + '<p>\n<p><span class="key">Ctrl+I</span>' + Jencil.t('Make selected text property as <i>Italic</i>') + '<p>\n<p><span class="key">Ctrl+U</span>' + Jencil.t('Underline selected text like <u>Underline</u>') + '<p>\n<p><span class="key">Ctrl+F</span>' + Jencil.t('Toggle fullscreen mode') + '<p>\n<p><span class="key">Ctrl+Q</span>' + Jencil.t('Toggle quick view') + '<p>\n<p><span class="key">Ctrl+H</span>' + Jencil.t('Toggle help') + '<p>';
        __$coverCall('js/types/html/helper.js', '1248:1283');
        this.element.html(HTML_HELPER_HTML);
    }
    __$coverCall('js/types/html/helper.js', '1292:1309');
    return HtmlHelper;
}(BaseHelper);