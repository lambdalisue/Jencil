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
__$coverInit("js/filetypes/html.js", "var HtmlEditor, HtmlHelper, HtmlProfile, HtmlViewer,\n  __hasProp = {}.hasOwnProperty,\n  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };\n\nHtmlEditor = (function(_super) {\n\n  __extends(HtmlEditor, _super);\n\n  function HtmlEditor(core) {\n    var singleLineTags, x,\n      _this = this;\n    HtmlEditor.__super__.constructor.call(this, core);\n    singleLineTags = (function() {\n      var _i, _len, _ref, _results;\n      _ref = ['p', 'li'];\n      _results = [];\n      for (_i = 0, _len = _ref.length; _i < _len; _i++) {\n        x = _ref[_i];\n        _results.push([\"<\" + x + \">\", \"</\" + x + \">\", new RegExp(\"^\\s*<\" + x + \">\"), new RegExp(\"</\" + x + \">\\s*$\")]);\n      }\n      return _results;\n    })();\n    this.textarea.autoindent.preCallback = function(e, line) {\n      var lineCaret, pattern, _i, _len;\n      if (e.shiftKey) {\n        return;\n      }\n      for (_i = 0, _len = singleLineTags.length; _i < _len; _i++) {\n        pattern = singleLineTags[_i];\n        if (pattern[3].test(line)) {\n          lineCaret = _this.textarea.selection._getLineCaret();\n          _this.textarea.selection.caret(lineCaret[1]);\n          return;\n        }\n      }\n    };\n    this.textarea.autoindent.postCallback = function(e, line) {\n      var pattern, _i, _len;\n      if (e.shiftKey) {\n        return;\n      }\n      for (_i = 0, _len = singleLineTags.length; _i < _len; _i++) {\n        pattern = singleLineTags[_i];\n        if (pattern[3].test(line)) {\n          _this.textarea.selection.insertAfter(\"\" + pattern[0] + pattern[1], false);\n          _this.textarea.selection.caretOffset(-pattern[1].length);\n          return;\n        }\n      }\n    };\n  }\n\n  HtmlEditor._headerPattern = new RegExp(\"^<h([1-6])>(.*)</h[1-6]>\\n?$\");\n\n  HtmlEditor.prototype._header = function(n) {\n    var caret, replacement, text;\n    caret = this.textarea.selection.caret();\n    if (caret[0] === caret[1]) {\n      this.textarea.selection.selectWholeCurrentLine();\n    }\n    text = this.selection();\n    if (HtmlEditor._headerPattern.test(text)) {\n      if (RegExp.$1 === n.toString()) {\n        replacement = RegExp.$2;\n      } else {\n        replacement = \"<h\" + n + \">\" + RegExp.$2 + \"</h\" + n + \">\";\n      }\n      return this.selection(replacement);\n    } else {\n      return this.enclose(\"<h\" + n + \">\", \"</h\" + n + \">\\n\");\n    }\n  };\n\n  HtmlEditor.prototype.h1 = function() {\n    return this._header(1);\n  };\n\n  HtmlEditor.prototype.h2 = function() {\n    return this._header(2);\n  };\n\n  HtmlEditor.prototype.h3 = function() {\n    return this._header(3);\n  };\n\n  HtmlEditor.prototype.h4 = function() {\n    return this._header(4);\n  };\n\n  HtmlEditor.prototype.h5 = function() {\n    return this._header(5);\n  };\n\n  HtmlEditor.prototype.h6 = function() {\n    return this._header(6);\n  };\n\n  HtmlEditor.prototype.bold = function() {\n    return this.enclose(\"<b>\", \"</b>\");\n  };\n\n  HtmlEditor.prototype.italic = function() {\n    return this.enclose(\"<i>\", \"</i>\");\n  };\n\n  HtmlEditor.prototype.underline = function() {\n    return this.enclose(\"<u>\", \"</u>\");\n  };\n\n  HtmlEditor.prototype.strike = function() {\n    return this.enclose(\"<s>\", \"</s>\");\n  };\n\n  HtmlEditor.prototype.superscript = function() {\n    return this.enclose(\"<sup>\", \"</sup>\");\n  };\n\n  HtmlEditor.prototype.subscript = function() {\n    return this.enclose(\"<sub>\", \"</sub>\");\n  };\n\n  HtmlEditor.prototype.quote = function() {\n    return this.enclose(\"<q>\", \"</q>\");\n  };\n\n  HtmlEditor.prototype.blockquote = function() {\n    return this.enclose(\"\\n<blockquote>\", \"</blockquote>\\n\");\n  };\n\n  HtmlEditor.prototype.code = function() {\n    return this.enclose(\"<code>\", \"</code>\");\n  };\n\n  HtmlEditor.prototype.pre = function() {\n    return this.enclose(\"<pre>\", \"</pre>\");\n  };\n\n  HtmlEditor.prototype.anchorLink = function() {\n    var href, text;\n    text = this.selection();\n    if (!text) {\n      text = window.prompt(\"Please input a link text\", \"Here\");\n    }\n    href = window.prompt(\"Please input a link url\", \"http://\");\n    if (!(href != null)) {\n      return;\n    }\n    return this.selection(\"<a href='\" + href + \"'>\" + text + \"</a>\");\n  };\n\n  HtmlEditor.prototype.image = function() {\n    var alt, src;\n    src = window.prompt(\"Please input a image url\", \"http://\");\n    alt = window.prompt(\"(Optional) Please input a alt message\", \"Image\");\n    if (!(src != null)) {\n      return;\n    }\n    return this.selection(\"<img src='\" + src + \"' alt='\" + alt + \"'>\");\n  };\n\n  HtmlEditor.prototype.unorderedList = function() {\n    var text, x;\n    text = this.selection();\n    text = (function() {\n      var _i, _len, _ref, _results;\n      _ref = text.split(\"\\n\");\n      _results = [];\n      for (_i = 0, _len = _ref.length; _i < _len; _i++) {\n        x = _ref[_i];\n        _results.push(\"  <li>\" + x + \"</li>\");\n      }\n      return _results;\n    })();\n    text.unshift(\"<ul>\");\n    text.push(\"</ul>\");\n    return this.selection(text.join(\"\\n\"));\n  };\n\n  HtmlEditor.prototype.orderedList = function() {\n    var text, x;\n    text = this.selection();\n    text = (function() {\n      var _i, _len, _ref, _results;\n      _ref = text.split(\"\\n\");\n      _results = [];\n      for (_i = 0, _len = _ref.length; _i < _len; _i++) {\n        x = _ref[_i];\n        _results.push(\"  <li>\" + x + \"</li>\");\n      }\n      return _results;\n    })();\n    text.unshift(\"<ol>\");\n    text.push(\"</ol>\");\n    return this.selection(text.join(\"\\n\"));\n  };\n\n  return HtmlEditor;\n\n})(Jencil.ui.widgets.editors.TextEditor);\n\nHtmlViewer = Jencil.ui.widgets.viewers.TemplateViewer;\n\nHtmlHelper = (function(_super) {\n\n  __extends(HtmlHelper, _super);\n\n  function HtmlHelper(core) {\n    HtmlHelper.__super__.constructor.call(this, core);\n    this.element.addClass('helper');\n  }\n\n  return HtmlHelper;\n\n})(Jencil.ui.widgets.panels.Panel);\n\nHtmlProfile = (function(_super) {\n\n  __extends(HtmlProfile, _super);\n\n  function HtmlProfile() {\n    this.mainPanelClass = Jencil.ui.widgets.panels.TrimainPanel;\n    this.editorClass = HtmlEditor;\n    this.viewerClass = HtmlViewer;\n    this.helperClass = HtmlHelper;\n    this.defaultVolume = 1;\n    this.defaultVolume2 = 1;\n    this.toolbarButtons = ['Undo', 'Redo', 'Separator', ['h1', 'H1'], ['h2', 'H2'], ['h3', 'H3'], ['h4', 'H4'], ['h5', 'H5'], ['h6', 'H6'], 'Separator', ['bold', 'Bold', 'Ctrl+B'], ['italic', 'Italic', 'Ctrl+I'], ['underline', 'Underline', 'Ctrl+U'], ['strike', 'Strikeout'], ['superscript', 'Superscript'], ['subscript', 'Subscript'], 'Separator', ['anchorLink', 'Anchor link'], ['image', 'Image'], ['unorderedList', 'Unordered list'], ['orderedList', 'Ordered list'], ['quote', 'Quote'], ['blockquote', 'Blockquote'], ['code', 'Code'], ['pre', 'Pre'], 'Separator', 'Fullscreen'];\n    this.statusbarButtons = ['Viewer', 'Helper'];\n  }\n\n  return HtmlProfile;\n\n})(Jencil.profiles.Profile);\n\nJencil.utils.namespace('Jencil.filetypes.html', function(exports) {\n  exports.HtmlEditor = HtmlEditor;\n  exports.HtmlViewer = HtmlViewer;\n  return exports.HtmlProfile = HtmlProfile;\n});\n");
__$coverInitRange("js/filetypes/html.js", "0:375");
__$coverInitRange("js/filetypes/html.js", "378:5666");
__$coverInitRange("js/filetypes/html.js", "5669:5722");
__$coverInitRange("js/filetypes/html.js", "5725:5976");
__$coverInitRange("js/filetypes/html.js", "5979:6990");
__$coverInitRange("js/filetypes/html.js", "6993:7177");
__$coverInitRange("js/filetypes/html.js", "126:211");
__$coverInitRange("js/filetypes/html.js", "213:257");
__$coverInitRange("js/filetypes/html.js", "259:292");
__$coverInitRange("js/filetypes/html.js", "294:322");
__$coverInitRange("js/filetypes/html.js", "324:358");
__$coverInitRange("js/filetypes/html.js", "360:372");
__$coverInitRange("js/filetypes/html.js", "152:209");
__$coverInitRange("js/filetypes/html.js", "231:255");
__$coverInitRange("js/filetypes/html.js", "414:443");
__$coverInitRange("js/filetypes/html.js", "448:1875");
__$coverInitRange("js/filetypes/html.js", "1880:1950");
__$coverInitRange("js/filetypes/html.js", "1955:2541");
__$coverInitRange("js/filetypes/html.js", "2546:2616");
__$coverInitRange("js/filetypes/html.js", "2621:2691");
__$coverInitRange("js/filetypes/html.js", "2696:2766");
__$coverInitRange("js/filetypes/html.js", "2771:2841");
__$coverInitRange("js/filetypes/html.js", "2846:2916");
__$coverInitRange("js/filetypes/html.js", "2921:2991");
__$coverInitRange("js/filetypes/html.js", "2996:3080");
__$coverInitRange("js/filetypes/html.js", "3085:3171");
__$coverInitRange("js/filetypes/html.js", "3176:3265");
__$coverInitRange("js/filetypes/html.js", "3270:3356");
__$coverInitRange("js/filetypes/html.js", "3361:3456");
__$coverInitRange("js/filetypes/html.js", "3461:3554");
__$coverInitRange("js/filetypes/html.js", "3559:3644");
__$coverInitRange("js/filetypes/html.js", "3649:3761");
__$coverInitRange("js/filetypes/html.js", "3766:3856");
__$coverInitRange("js/filetypes/html.js", "3861:3948");
__$coverInitRange("js/filetypes/html.js", "3953:4320");
__$coverInitRange("js/filetypes/html.js", "4325:4645");
__$coverInitRange("js/filetypes/html.js", "4650:5124");
__$coverInitRange("js/filetypes/html.js", "5129:5601");
__$coverInitRange("js/filetypes/html.js", "5606:5623");
__$coverInitRange("js/filetypes/html.js", "480:521");
__$coverInitRange("js/filetypes/html.js", "527:576");
__$coverInitRange("js/filetypes/html.js", "582:934");
__$coverInitRange("js/filetypes/html.js", "940:1391");
__$coverInitRange("js/filetypes/html.js", "1397:1871");
__$coverInitRange("js/filetypes/html.js", "619:647");
__$coverInitRange("js/filetypes/html.js", "655:673");
__$coverInitRange("js/filetypes/html.js", "681:694");
__$coverInitRange("js/filetypes/html.js", "702:901");
__$coverInitRange("js/filetypes/html.js", "909:924");
__$coverInitRange("js/filetypes/html.js", "762:774");
__$coverInitRange("js/filetypes/html.js", "784:893");
__$coverInitRange("js/filetypes/html.js", "1005:1037");
__$coverInitRange("js/filetypes/html.js", "1045:1085");
__$coverInitRange("js/filetypes/html.js", "1093:1384");
__$coverInitRange("js/filetypes/html.js", "1071:1077");
__$coverInitRange("js/filetypes/html.js", "1163:1191");
__$coverInitRange("js/filetypes/html.js", "1201:1376");
__$coverInitRange("js/filetypes/html.js", "1240:1292");
__$coverInitRange("js/filetypes/html.js", "1304:1348");
__$coverInitRange("js/filetypes/html.js", "1360:1366");
__$coverInitRange("js/filetypes/html.js", "1463:1484");
__$coverInitRange("js/filetypes/html.js", "1492:1532");
__$coverInitRange("js/filetypes/html.js", "1540:1864");
__$coverInitRange("js/filetypes/html.js", "1518:1524");
__$coverInitRange("js/filetypes/html.js", "1610:1638");
__$coverInitRange("js/filetypes/html.js", "1648:1856");
__$coverInitRange("js/filetypes/html.js", "1687:1760");
__$coverInitRange("js/filetypes/html.js", "1772:1828");
__$coverInitRange("js/filetypes/html.js", "1840:1846");
__$coverInitRange("js/filetypes/html.js", "2004:2032");
__$coverInitRange("js/filetypes/html.js", "2038:2077");
__$coverInitRange("js/filetypes/html.js", "2083:2172");
__$coverInitRange("js/filetypes/html.js", "2178:2201");
__$coverInitRange("js/filetypes/html.js", "2207:2536");
__$coverInitRange("js/filetypes/html.js", "2118:2166");
__$coverInitRange("js/filetypes/html.js", "2257:2413");
__$coverInitRange("js/filetypes/html.js", "2421:2455");
__$coverInitRange("js/filetypes/html.js", "2299:2322");
__$coverInitRange("js/filetypes/html.js", "2347:2405");
__$coverInitRange("js/filetypes/html.js", "2476:2530");
__$coverInitRange("js/filetypes/html.js", "2589:2611");
__$coverInitRange("js/filetypes/html.js", "2664:2686");
__$coverInitRange("js/filetypes/html.js", "2739:2761");
__$coverInitRange("js/filetypes/html.js", "2814:2836");
__$coverInitRange("js/filetypes/html.js", "2889:2911");
__$coverInitRange("js/filetypes/html.js", "2964:2986");
__$coverInitRange("js/filetypes/html.js", "3041:3075");
__$coverInitRange("js/filetypes/html.js", "3132:3166");
__$coverInitRange("js/filetypes/html.js", "3226:3260");
__$coverInitRange("js/filetypes/html.js", "3317:3351");
__$coverInitRange("js/filetypes/html.js", "3413:3451");
__$coverInitRange("js/filetypes/html.js", "3511:3549");
__$coverInitRange("js/filetypes/html.js", "3605:3639");
__$coverInitRange("js/filetypes/html.js", "3700:3756");
__$coverInitRange("js/filetypes/html.js", "3811:3851");
__$coverInitRange("js/filetypes/html.js", "3905:3943");
__$coverInitRange("js/filetypes/html.js", "4004:4018");
__$coverInitRange("js/filetypes/html.js", "4024:4047");
__$coverInitRange("js/filetypes/html.js", "4053:4134");
__$coverInitRange("js/filetypes/html.js", "4140:4198");
__$coverInitRange("js/filetypes/html.js", "4204:4245");
__$coverInitRange("js/filetypes/html.js", "4251:4315");
__$coverInitRange("js/filetypes/html.js", "4072:4128");
__$coverInitRange("js/filetypes/html.js", "4233:4239");
__$coverInitRange("js/filetypes/html.js", "4371:4383");
__$coverInitRange("js/filetypes/html.js", "4389:4447");
__$coverInitRange("js/filetypes/html.js", "4453:4522");
__$coverInitRange("js/filetypes/html.js", "4528:4568");
__$coverInitRange("js/filetypes/html.js", "4574:4640");
__$coverInitRange("js/filetypes/html.js", "4556:4562");
__$coverInitRange("js/filetypes/html.js", "4704:4715");
__$coverInitRange("js/filetypes/html.js", "4721:4744");
__$coverInitRange("js/filetypes/html.js", "4750:5025");
__$coverInitRange("js/filetypes/html.js", "5031:5051");
__$coverInitRange("js/filetypes/html.js", "5057:5075");
__$coverInitRange("js/filetypes/html.js", "5081:5119");
__$coverInitRange("js/filetypes/html.js", "4777:4805");
__$coverInitRange("js/filetypes/html.js", "4813:4836");
__$coverInitRange("js/filetypes/html.js", "4844:4857");
__$coverInitRange("js/filetypes/html.js", "4865:4992");
__$coverInitRange("js/filetypes/html.js", "5000:5015");
__$coverInitRange("js/filetypes/html.js", "4925:4937");
__$coverInitRange("js/filetypes/html.js", "4947:4984");
__$coverInitRange("js/filetypes/html.js", "5181:5192");
__$coverInitRange("js/filetypes/html.js", "5198:5221");
__$coverInitRange("js/filetypes/html.js", "5227:5502");
__$coverInitRange("js/filetypes/html.js", "5508:5528");
__$coverInitRange("js/filetypes/html.js", "5534:5552");
__$coverInitRange("js/filetypes/html.js", "5558:5596");
__$coverInitRange("js/filetypes/html.js", "5254:5282");
__$coverInitRange("js/filetypes/html.js", "5290:5313");
__$coverInitRange("js/filetypes/html.js", "5321:5334");
__$coverInitRange("js/filetypes/html.js", "5342:5469");
__$coverInitRange("js/filetypes/html.js", "5477:5492");
__$coverInitRange("js/filetypes/html.js", "5402:5414");
__$coverInitRange("js/filetypes/html.js", "5424:5461");
__$coverInitRange("js/filetypes/html.js", "5761:5790");
__$coverInitRange("js/filetypes/html.js", "5795:5917");
__$coverInitRange("js/filetypes/html.js", "5922:5939");
__$coverInitRange("js/filetypes/html.js", "5827:5876");
__$coverInitRange("js/filetypes/html.js", "5882:5913");
__$coverInitRange("js/filetypes/html.js", "6016:6046");
__$coverInitRange("js/filetypes/html.js", "6051:6937");
__$coverInitRange("js/filetypes/html.js", "6942:6960");
__$coverInitRange("js/filetypes/html.js", "6080:6139");
__$coverInitRange("js/filetypes/html.js", "6145:6174");
__$coverInitRange("js/filetypes/html.js", "6180:6209");
__$coverInitRange("js/filetypes/html.js", "6215:6244");
__$coverInitRange("js/filetypes/html.js", "6250:6272");
__$coverInitRange("js/filetypes/html.js", "6278:6301");
__$coverInitRange("js/filetypes/html.js", "6307:6883");
__$coverInitRange("js/filetypes/html.js", "6889:6933");
__$coverInitRange("js/filetypes/html.js", "7063:7094");
__$coverInitRange("js/filetypes/html.js", "7098:7129");
__$coverInitRange("js/filetypes/html.js", "7133:7173");
__$coverCall('js/filetypes/html.js', '0:375');
var HtmlEditor, HtmlHelper, HtmlProfile, HtmlViewer, __hasProp = {}.hasOwnProperty, __extends = function (child, parent) {
        __$coverCall('js/filetypes/html.js', '126:211');
        for (var key in parent) {
            __$coverCall('js/filetypes/html.js', '152:209');
            if (__hasProp.call(parent, key))
                child[key] = parent[key];
        }
        __$coverCall('js/filetypes/html.js', '213:257');
        function ctor() {
            __$coverCall('js/filetypes/html.js', '231:255');
            this.constructor = child;
        }
        __$coverCall('js/filetypes/html.js', '259:292');
        ctor.prototype = parent.prototype;
        __$coverCall('js/filetypes/html.js', '294:322');
        child.prototype = new ctor();
        __$coverCall('js/filetypes/html.js', '324:358');
        child.__super__ = parent.prototype;
        __$coverCall('js/filetypes/html.js', '360:372');
        return child;
    };
__$coverCall('js/filetypes/html.js', '378:5666');
HtmlEditor = function (_super) {
    __$coverCall('js/filetypes/html.js', '414:443');
    __extends(HtmlEditor, _super);
    __$coverCall('js/filetypes/html.js', '448:1875');
    function HtmlEditor(core) {
        __$coverCall('js/filetypes/html.js', '480:521');
        var singleLineTags, x, _this = this;
        __$coverCall('js/filetypes/html.js', '527:576');
        HtmlEditor.__super__.constructor.call(this, core);
        __$coverCall('js/filetypes/html.js', '582:934');
        singleLineTags = function () {
            __$coverCall('js/filetypes/html.js', '619:647');
            var _i, _len, _ref, _results;
            __$coverCall('js/filetypes/html.js', '655:673');
            _ref = [
                'p',
                'li'
            ];
            __$coverCall('js/filetypes/html.js', '681:694');
            _results = [];
            __$coverCall('js/filetypes/html.js', '702:901');
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                __$coverCall('js/filetypes/html.js', '762:774');
                x = _ref[_i];
                __$coverCall('js/filetypes/html.js', '784:893');
                _results.push([
                    '<' + x + '>',
                    '</' + x + '>',
                    new RegExp('^s*<' + x + '>'),
                    new RegExp('</' + x + '>s*$')
                ]);
            }
            __$coverCall('js/filetypes/html.js', '909:924');
            return _results;
        }();
        __$coverCall('js/filetypes/html.js', '940:1391');
        this.textarea.autoindent.preCallback = function (e, line) {
            __$coverCall('js/filetypes/html.js', '1005:1037');
            var lineCaret, pattern, _i, _len;
            __$coverCall('js/filetypes/html.js', '1045:1085');
            if (e.shiftKey) {
                __$coverCall('js/filetypes/html.js', '1071:1077');
                return;
            }
            __$coverCall('js/filetypes/html.js', '1093:1384');
            for (_i = 0, _len = singleLineTags.length; _i < _len; _i++) {
                __$coverCall('js/filetypes/html.js', '1163:1191');
                pattern = singleLineTags[_i];
                __$coverCall('js/filetypes/html.js', '1201:1376');
                if (pattern[3].test(line)) {
                    __$coverCall('js/filetypes/html.js', '1240:1292');
                    lineCaret = _this.textarea.selection._getLineCaret();
                    __$coverCall('js/filetypes/html.js', '1304:1348');
                    _this.textarea.selection.caret(lineCaret[1]);
                    __$coverCall('js/filetypes/html.js', '1360:1366');
                    return;
                }
            }
        };
        __$coverCall('js/filetypes/html.js', '1397:1871');
        this.textarea.autoindent.postCallback = function (e, line) {
            __$coverCall('js/filetypes/html.js', '1463:1484');
            var pattern, _i, _len;
            __$coverCall('js/filetypes/html.js', '1492:1532');
            if (e.shiftKey) {
                __$coverCall('js/filetypes/html.js', '1518:1524');
                return;
            }
            __$coverCall('js/filetypes/html.js', '1540:1864');
            for (_i = 0, _len = singleLineTags.length; _i < _len; _i++) {
                __$coverCall('js/filetypes/html.js', '1610:1638');
                pattern = singleLineTags[_i];
                __$coverCall('js/filetypes/html.js', '1648:1856');
                if (pattern[3].test(line)) {
                    __$coverCall('js/filetypes/html.js', '1687:1760');
                    _this.textarea.selection.insertAfter('' + pattern[0] + pattern[1], false);
                    __$coverCall('js/filetypes/html.js', '1772:1828');
                    _this.textarea.selection.caretOffset(-pattern[1].length);
                    __$coverCall('js/filetypes/html.js', '1840:1846');
                    return;
                }
            }
        };
    }
    __$coverCall('js/filetypes/html.js', '1880:1950');
    HtmlEditor._headerPattern = new RegExp('^<h([1-6])>(.*)</h[1-6]>\n?$');
    __$coverCall('js/filetypes/html.js', '1955:2541');
    HtmlEditor.prototype._header = function (n) {
        __$coverCall('js/filetypes/html.js', '2004:2032');
        var caret, replacement, text;
        __$coverCall('js/filetypes/html.js', '2038:2077');
        caret = this.textarea.selection.caret();
        __$coverCall('js/filetypes/html.js', '2083:2172');
        if (caret[0] === caret[1]) {
            __$coverCall('js/filetypes/html.js', '2118:2166');
            this.textarea.selection.selectWholeCurrentLine();
        }
        __$coverCall('js/filetypes/html.js', '2178:2201');
        text = this.selection();
        __$coverCall('js/filetypes/html.js', '2207:2536');
        if (HtmlEditor._headerPattern.test(text)) {
            __$coverCall('js/filetypes/html.js', '2257:2413');
            if (RegExp.$1 === n.toString()) {
                __$coverCall('js/filetypes/html.js', '2299:2322');
                replacement = RegExp.$2;
            } else {
                __$coverCall('js/filetypes/html.js', '2347:2405');
                replacement = '<h' + n + '>' + RegExp.$2 + '</h' + n + '>';
            }
            __$coverCall('js/filetypes/html.js', '2421:2455');
            return this.selection(replacement);
        } else {
            __$coverCall('js/filetypes/html.js', '2476:2530');
            return this.enclose('<h' + n + '>', '</h' + n + '>\n');
        }
    };
    __$coverCall('js/filetypes/html.js', '2546:2616');
    HtmlEditor.prototype.h1 = function () {
        __$coverCall('js/filetypes/html.js', '2589:2611');
        return this._header(1);
    };
    __$coverCall('js/filetypes/html.js', '2621:2691');
    HtmlEditor.prototype.h2 = function () {
        __$coverCall('js/filetypes/html.js', '2664:2686');
        return this._header(2);
    };
    __$coverCall('js/filetypes/html.js', '2696:2766');
    HtmlEditor.prototype.h3 = function () {
        __$coverCall('js/filetypes/html.js', '2739:2761');
        return this._header(3);
    };
    __$coverCall('js/filetypes/html.js', '2771:2841');
    HtmlEditor.prototype.h4 = function () {
        __$coverCall('js/filetypes/html.js', '2814:2836');
        return this._header(4);
    };
    __$coverCall('js/filetypes/html.js', '2846:2916');
    HtmlEditor.prototype.h5 = function () {
        __$coverCall('js/filetypes/html.js', '2889:2911');
        return this._header(5);
    };
    __$coverCall('js/filetypes/html.js', '2921:2991');
    HtmlEditor.prototype.h6 = function () {
        __$coverCall('js/filetypes/html.js', '2964:2986');
        return this._header(6);
    };
    __$coverCall('js/filetypes/html.js', '2996:3080');
    HtmlEditor.prototype.bold = function () {
        __$coverCall('js/filetypes/html.js', '3041:3075');
        return this.enclose('<b>', '</b>');
    };
    __$coverCall('js/filetypes/html.js', '3085:3171');
    HtmlEditor.prototype.italic = function () {
        __$coverCall('js/filetypes/html.js', '3132:3166');
        return this.enclose('<i>', '</i>');
    };
    __$coverCall('js/filetypes/html.js', '3176:3265');
    HtmlEditor.prototype.underline = function () {
        __$coverCall('js/filetypes/html.js', '3226:3260');
        return this.enclose('<u>', '</u>');
    };
    __$coverCall('js/filetypes/html.js', '3270:3356');
    HtmlEditor.prototype.strike = function () {
        __$coverCall('js/filetypes/html.js', '3317:3351');
        return this.enclose('<s>', '</s>');
    };
    __$coverCall('js/filetypes/html.js', '3361:3456');
    HtmlEditor.prototype.superscript = function () {
        __$coverCall('js/filetypes/html.js', '3413:3451');
        return this.enclose('<sup>', '</sup>');
    };
    __$coverCall('js/filetypes/html.js', '3461:3554');
    HtmlEditor.prototype.subscript = function () {
        __$coverCall('js/filetypes/html.js', '3511:3549');
        return this.enclose('<sub>', '</sub>');
    };
    __$coverCall('js/filetypes/html.js', '3559:3644');
    HtmlEditor.prototype.quote = function () {
        __$coverCall('js/filetypes/html.js', '3605:3639');
        return this.enclose('<q>', '</q>');
    };
    __$coverCall('js/filetypes/html.js', '3649:3761');
    HtmlEditor.prototype.blockquote = function () {
        __$coverCall('js/filetypes/html.js', '3700:3756');
        return this.enclose('\n<blockquote>', '</blockquote>\n');
    };
    __$coverCall('js/filetypes/html.js', '3766:3856');
    HtmlEditor.prototype.code = function () {
        __$coverCall('js/filetypes/html.js', '3811:3851');
        return this.enclose('<code>', '</code>');
    };
    __$coverCall('js/filetypes/html.js', '3861:3948');
    HtmlEditor.prototype.pre = function () {
        __$coverCall('js/filetypes/html.js', '3905:3943');
        return this.enclose('<pre>', '</pre>');
    };
    __$coverCall('js/filetypes/html.js', '3953:4320');
    HtmlEditor.prototype.anchorLink = function () {
        __$coverCall('js/filetypes/html.js', '4004:4018');
        var href, text;
        __$coverCall('js/filetypes/html.js', '4024:4047');
        text = this.selection();
        __$coverCall('js/filetypes/html.js', '4053:4134');
        if (!text) {
            __$coverCall('js/filetypes/html.js', '4072:4128');
            text = window.prompt('Please input a link text', 'Here');
        }
        __$coverCall('js/filetypes/html.js', '4140:4198');
        href = window.prompt('Please input a link url', 'http://');
        __$coverCall('js/filetypes/html.js', '4204:4245');
        if (!(href != null)) {
            __$coverCall('js/filetypes/html.js', '4233:4239');
            return;
        }
        __$coverCall('js/filetypes/html.js', '4251:4315');
        return this.selection('<a href=\'' + href + '\'>' + text + '</a>');
    };
    __$coverCall('js/filetypes/html.js', '4325:4645');
    HtmlEditor.prototype.image = function () {
        __$coverCall('js/filetypes/html.js', '4371:4383');
        var alt, src;
        __$coverCall('js/filetypes/html.js', '4389:4447');
        src = window.prompt('Please input a image url', 'http://');
        __$coverCall('js/filetypes/html.js', '4453:4522');
        alt = window.prompt('(Optional) Please input a alt message', 'Image');
        __$coverCall('js/filetypes/html.js', '4528:4568');
        if (!(src != null)) {
            __$coverCall('js/filetypes/html.js', '4556:4562');
            return;
        }
        __$coverCall('js/filetypes/html.js', '4574:4640');
        return this.selection('<img src=\'' + src + '\' alt=\'' + alt + '\'>');
    };
    __$coverCall('js/filetypes/html.js', '4650:5124');
    HtmlEditor.prototype.unorderedList = function () {
        __$coverCall('js/filetypes/html.js', '4704:4715');
        var text, x;
        __$coverCall('js/filetypes/html.js', '4721:4744');
        text = this.selection();
        __$coverCall('js/filetypes/html.js', '4750:5025');
        text = function () {
            __$coverCall('js/filetypes/html.js', '4777:4805');
            var _i, _len, _ref, _results;
            __$coverCall('js/filetypes/html.js', '4813:4836');
            _ref = text.split('\n');
            __$coverCall('js/filetypes/html.js', '4844:4857');
            _results = [];
            __$coverCall('js/filetypes/html.js', '4865:4992');
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                __$coverCall('js/filetypes/html.js', '4925:4937');
                x = _ref[_i];
                __$coverCall('js/filetypes/html.js', '4947:4984');
                _results.push('  <li>' + x + '</li>');
            }
            __$coverCall('js/filetypes/html.js', '5000:5015');
            return _results;
        }();
        __$coverCall('js/filetypes/html.js', '5031:5051');
        text.unshift('<ul>');
        __$coverCall('js/filetypes/html.js', '5057:5075');
        text.push('</ul>');
        __$coverCall('js/filetypes/html.js', '5081:5119');
        return this.selection(text.join('\n'));
    };
    __$coverCall('js/filetypes/html.js', '5129:5601');
    HtmlEditor.prototype.orderedList = function () {
        __$coverCall('js/filetypes/html.js', '5181:5192');
        var text, x;
        __$coverCall('js/filetypes/html.js', '5198:5221');
        text = this.selection();
        __$coverCall('js/filetypes/html.js', '5227:5502');
        text = function () {
            __$coverCall('js/filetypes/html.js', '5254:5282');
            var _i, _len, _ref, _results;
            __$coverCall('js/filetypes/html.js', '5290:5313');
            _ref = text.split('\n');
            __$coverCall('js/filetypes/html.js', '5321:5334');
            _results = [];
            __$coverCall('js/filetypes/html.js', '5342:5469');
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                __$coverCall('js/filetypes/html.js', '5402:5414');
                x = _ref[_i];
                __$coverCall('js/filetypes/html.js', '5424:5461');
                _results.push('  <li>' + x + '</li>');
            }
            __$coverCall('js/filetypes/html.js', '5477:5492');
            return _results;
        }();
        __$coverCall('js/filetypes/html.js', '5508:5528');
        text.unshift('<ol>');
        __$coverCall('js/filetypes/html.js', '5534:5552');
        text.push('</ol>');
        __$coverCall('js/filetypes/html.js', '5558:5596');
        return this.selection(text.join('\n'));
    };
    __$coverCall('js/filetypes/html.js', '5606:5623');
    return HtmlEditor;
}(Jencil.ui.widgets.editors.TextEditor);
__$coverCall('js/filetypes/html.js', '5669:5722');
HtmlViewer = Jencil.ui.widgets.viewers.TemplateViewer;
__$coverCall('js/filetypes/html.js', '5725:5976');
HtmlHelper = function (_super) {
    __$coverCall('js/filetypes/html.js', '5761:5790');
    __extends(HtmlHelper, _super);
    __$coverCall('js/filetypes/html.js', '5795:5917');
    function HtmlHelper(core) {
        __$coverCall('js/filetypes/html.js', '5827:5876');
        HtmlHelper.__super__.constructor.call(this, core);
        __$coverCall('js/filetypes/html.js', '5882:5913');
        this.element.addClass('helper');
    }
    __$coverCall('js/filetypes/html.js', '5922:5939');
    return HtmlHelper;
}(Jencil.ui.widgets.panels.Panel);
__$coverCall('js/filetypes/html.js', '5979:6990');
HtmlProfile = function (_super) {
    __$coverCall('js/filetypes/html.js', '6016:6046');
    __extends(HtmlProfile, _super);
    __$coverCall('js/filetypes/html.js', '6051:6937');
    function HtmlProfile() {
        __$coverCall('js/filetypes/html.js', '6080:6139');
        this.mainPanelClass = Jencil.ui.widgets.panels.TrimainPanel;
        __$coverCall('js/filetypes/html.js', '6145:6174');
        this.editorClass = HtmlEditor;
        __$coverCall('js/filetypes/html.js', '6180:6209');
        this.viewerClass = HtmlViewer;
        __$coverCall('js/filetypes/html.js', '6215:6244');
        this.helperClass = HtmlHelper;
        __$coverCall('js/filetypes/html.js', '6250:6272');
        this.defaultVolume = 1;
        __$coverCall('js/filetypes/html.js', '6278:6301');
        this.defaultVolume2 = 1;
        __$coverCall('js/filetypes/html.js', '6307:6883');
        this.toolbarButtons = [
            'Undo',
            'Redo',
            'Separator',
            [
                'h1',
                'H1'
            ],
            [
                'h2',
                'H2'
            ],
            [
                'h3',
                'H3'
            ],
            [
                'h4',
                'H4'
            ],
            [
                'h5',
                'H5'
            ],
            [
                'h6',
                'H6'
            ],
            'Separator',
            [
                'bold',
                'Bold',
                'Ctrl+B'
            ],
            [
                'italic',
                'Italic',
                'Ctrl+I'
            ],
            [
                'underline',
                'Underline',
                'Ctrl+U'
            ],
            [
                'strike',
                'Strikeout'
            ],
            [
                'superscript',
                'Superscript'
            ],
            [
                'subscript',
                'Subscript'
            ],
            'Separator',
            [
                'anchorLink',
                'Anchor link'
            ],
            [
                'image',
                'Image'
            ],
            [
                'unorderedList',
                'Unordered list'
            ],
            [
                'orderedList',
                'Ordered list'
            ],
            [
                'quote',
                'Quote'
            ],
            [
                'blockquote',
                'Blockquote'
            ],
            [
                'code',
                'Code'
            ],
            [
                'pre',
                'Pre'
            ],
            'Separator',
            'Fullscreen'
        ];
        __$coverCall('js/filetypes/html.js', '6889:6933');
        this.statusbarButtons = [
            'Viewer',
            'Helper'
        ];
    }
    __$coverCall('js/filetypes/html.js', '6942:6960');
    return HtmlProfile;
}(Jencil.profiles.Profile);
__$coverCall('js/filetypes/html.js', '6993:7177');
Jencil.utils.namespace('Jencil.filetypes.html', function (exports) {
    __$coverCall('js/filetypes/html.js', '7063:7094');
    exports.HtmlEditor = HtmlEditor;
    __$coverCall('js/filetypes/html.js', '7098:7129');
    exports.HtmlViewer = HtmlViewer;
    __$coverCall('js/filetypes/html.js', '7133:7173');
    return exports.HtmlProfile = HtmlProfile;
});