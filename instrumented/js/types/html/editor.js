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
__$coverInit("src/js/types/html/editor.js", "var HtmlEditor, autoIndentableHtml, headerMarkup,\n  __hasProp = {}.hasOwnProperty,\n  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };\n\nautoIndentableHtml = (function() {\n  var PATTERNS, post, pre, x;\n  PATTERNS = (function() {\n    var _i, _len, _ref, _results;\n    _ref = ['p', 'li'];\n    _results = [];\n    for (_i = 0, _len = _ref.length; _i < _len; _i++) {\n      x = _ref[_i];\n      _results.push([x, new RegExp(\"^[\\s\\t]*<\" + x + \">\"), new RegExp(\"</\" + x + \">[\\s\\t]*$\")]);\n    }\n    return _results;\n  })();\n  pre = function(e, line) {\n    var lineCaret, pattern, _i, _len;\n    if (e.shiftKey) {\n      return;\n    }\n    for (_i = 0, _len = PATTERNS.length; _i < _len; _i++) {\n      pattern = PATTERNS[_i];\n      if (pattern[1].test(line) || pattern[2].test(line)) {\n        lineCaret = this.selection._getLineCaret();\n        this.selection.caret(lineCaret[1]);\n        return;\n      }\n    }\n  };\n  post = function(e, line, indent, insert) {\n    var pattern, _i, _len;\n    if (e.shiftKey) {\n      return;\n    }\n    for (_i = 0, _len = PATTERNS.length; _i < _len; _i++) {\n      pattern = PATTERNS[_i];\n      if (pattern[2].test(line)) {\n        x = pattern[0];\n        this.selection.insertAfter(\"<\" + x + \"></\" + x + \">\", false);\n        this.selection.caretOffset(-(3 + x.length));\n        return;\n      }\n    }\n  };\n  return function(textarea) {\n    if (!(textarea.autoIndent != null)) {\n      textarea = autoIndentable(textarea);\n    }\n    textarea.autoIndent.pre = function(e, line) {\n      return pre.call(textarea, e, line);\n    };\n    textarea.autoIndent.post = function(e, line, indent, insert) {\n      return post.call(textarea, e, line, indent, insert);\n    };\n    return textarea;\n  };\n})();\n\nheaderMarkup = (function() {\n  var PATTERN;\n  PATTERN = new RegExp(\"^<h([1-6])>(.*)</h[1-6]>\\n?$\");\n  return function(n) {\n    var caret, replacement, text;\n    caret = this.textarea.selection.caret();\n    if (caret[0] === caret[1]) {\n      this.textarea.selection.selectWholeCurrentLine();\n    }\n    text = this.selection();\n    if (PATTERN.test(text)) {\n      if (RegExp.$1 === n.toString()) {\n        replacement = RegExp.$2;\n      } else {\n        replacement = \"<h\" + n + \">\" + RegExp.$2 + \"</h\" + n + \">\";\n      }\n      return this.selection(replacement);\n    } else {\n      return this.enclose(\"<h\" + n + \">\", \"</h\" + n + \">\\n\");\n    }\n  };\n})();\n\nHtmlEditor = (function(_super) {\n\n  __extends(HtmlEditor, _super);\n\n  function HtmlEditor(core) {\n    HtmlEditor.__super__.constructor.call(this, core);\n    this.textarea = autoIndentableHtml(this.textarea);\n  }\n\n  HtmlEditor.prototype.h1 = function() {\n    return headerMarkup.call(this, 1);\n  };\n\n  HtmlEditor.prototype.h2 = function() {\n    return headerMarkup.call(this, 2);\n  };\n\n  HtmlEditor.prototype.h3 = function() {\n    return headerMarkup.call(this, 3);\n  };\n\n  HtmlEditor.prototype.h4 = function() {\n    return headerMarkup.call(this, 4);\n  };\n\n  HtmlEditor.prototype.h5 = function() {\n    return headerMarkup.call(this, 5);\n  };\n\n  HtmlEditor.prototype.h6 = function() {\n    return headerMarkup.call(this, 6);\n  };\n\n  HtmlEditor.prototype.bold = function() {\n    return this.enclose(\"<b>\", \"</b>\");\n  };\n\n  HtmlEditor.prototype.italic = function() {\n    return this.enclose(\"<i>\", \"</i>\");\n  };\n\n  HtmlEditor.prototype.underline = function() {\n    return this.enclose(\"<u>\", \"</u>\");\n  };\n\n  HtmlEditor.prototype.strike = function() {\n    return this.enclose(\"<s>\", \"</s>\");\n  };\n\n  HtmlEditor.prototype.superscript = function() {\n    return this.enclose(\"<sup>\", \"</sup>\");\n  };\n\n  HtmlEditor.prototype.subscript = function() {\n    return this.enclose(\"<sub>\", \"</sub>\");\n  };\n\n  HtmlEditor.prototype.quote = function() {\n    return this.enclose(\"<q>\", \"</q>\");\n  };\n\n  HtmlEditor.prototype.blockquote = function() {\n    return this.enclose(\"\\n<blockquote>\", \"</blockquote>\\n\");\n  };\n\n  HtmlEditor.prototype.code = function() {\n    return this.enclose(\"<code>\", \"</code>\");\n  };\n\n  HtmlEditor.prototype.pre = function() {\n    return this.enclose(\"<pre>\", \"</pre>\");\n  };\n\n  HtmlEditor.prototype.anchorLink = function() {\n    var href, text;\n    text = this.selection();\n    if (!text) {\n      text = window.prompt(\"Please input a link text\", \"Here\");\n    }\n    href = window.prompt(\"Please input a link url\", \"http://\");\n    if (!(href != null)) {\n      return;\n    }\n    return this.selection(\"<a href='\" + href + \"'>\" + text + \"</a>\");\n  };\n\n  HtmlEditor.prototype.image = function() {\n    var alt, src;\n    src = window.prompt(\"Please input a image url\", \"http://\");\n    alt = window.prompt(\"(Optional) Please input a alt message\", \"Image\");\n    if (!(src != null)) {\n      return;\n    }\n    return this.selection(\"<img src='\" + src + \"' alt='\" + alt + \"'>\");\n  };\n\n  HtmlEditor.prototype.unorderedList = function() {\n    var text, x;\n    text = this.selection();\n    text = (function() {\n      var _i, _len, _ref, _results;\n      _ref = text.split(\"\\n\");\n      _results = [];\n      for (_i = 0, _len = _ref.length; _i < _len; _i++) {\n        x = _ref[_i];\n        _results.push(\"  <li>\" + x + \"</li>\");\n      }\n      return _results;\n    })();\n    text.unshift(\"<ul>\");\n    text.push(\"</ul>\");\n    return this.selection(text.join(\"\\n\"));\n  };\n\n  HtmlEditor.prototype.orderedList = function() {\n    var text, x;\n    text = this.selection();\n    text = (function() {\n      var _i, _len, _ref, _results;\n      _ref = text.split(\"\\n\");\n      _results = [];\n      for (_i = 0, _len = _ref.length; _i < _len; _i++) {\n        x = _ref[_i];\n        _results.push(\"  <li>\" + x + \"</li>\");\n      }\n      return _results;\n    })();\n    text.unshift(\"<ol>\");\n    text.push(\"</ol>\");\n    return this.selection(text.join(\"\\n\"));\n  };\n\n  return HtmlEditor;\n\n})(TextEditor);\n");
__$coverInitRange("src/js/types/html/editor.js", "0:372");
__$coverInitRange("src/js/types/html/editor.js", "375:1945");
__$coverInitRange("src/js/types/html/editor.js", "1948:2600");
__$coverInitRange("src/js/types/html/editor.js", "2603:5978");
__$coverInitRange("src/js/types/html/editor.js", "123:208");
__$coverInitRange("src/js/types/html/editor.js", "210:254");
__$coverInitRange("src/js/types/html/editor.js", "256:289");
__$coverInitRange("src/js/types/html/editor.js", "291:319");
__$coverInitRange("src/js/types/html/editor.js", "321:355");
__$coverInitRange("src/js/types/html/editor.js", "357:369");
__$coverInitRange("src/js/types/html/editor.js", "149:206");
__$coverInitRange("src/js/types/html/editor.js", "228:252");
__$coverInitRange("src/js/types/html/editor.js", "412:438");
__$coverInitRange("src/js/types/html/editor.js", "442:750");
__$coverInitRange("src/js/types/html/editor.js", "754:1139");
__$coverInitRange("src/js/types/html/editor.js", "1143:1560");
__$coverInitRange("src/js/types/html/editor.js", "1564:1939");
__$coverInitRange("src/js/types/html/editor.js", "471:499");
__$coverInitRange("src/js/types/html/editor.js", "505:523");
__$coverInitRange("src/js/types/html/editor.js", "529:542");
__$coverInitRange("src/js/types/html/editor.js", "548:721");
__$coverInitRange("src/js/types/html/editor.js", "727:742");
__$coverInitRange("src/js/types/html/editor.js", "606:618");
__$coverInitRange("src/js/types/html/editor.js", "626:715");
__$coverInitRange("src/js/types/html/editor.js", "784:816");
__$coverInitRange("src/js/types/html/editor.js", "822:858");
__$coverInitRange("src/js/types/html/editor.js", "864:1134");
__$coverInitRange("src/js/types/html/editor.js", "846:852");
__$coverInitRange("src/js/types/html/editor.js", "926:948");
__$coverInitRange("src/js/types/html/editor.js", "956:1128");
__$coverInitRange("src/js/types/html/editor.js", "1018:1060");
__$coverInitRange("src/js/types/html/editor.js", "1070:1104");
__$coverInitRange("src/js/types/html/editor.js", "1114:1120");
__$coverInitRange("src/js/types/html/editor.js", "1190:1211");
__$coverInitRange("src/js/types/html/editor.js", "1217:1253");
__$coverInitRange("src/js/types/html/editor.js", "1259:1555");
__$coverInitRange("src/js/types/html/editor.js", "1241:1247");
__$coverInitRange("src/js/types/html/editor.js", "1321:1343");
__$coverInitRange("src/js/types/html/editor.js", "1351:1549");
__$coverInitRange("src/js/types/html/editor.js", "1388:1402");
__$coverInitRange("src/js/types/html/editor.js", "1412:1472");
__$coverInitRange("src/js/types/html/editor.js", "1482:1525");
__$coverInitRange("src/js/types/html/editor.js", "1535:1541");
__$coverInitRange("src/js/types/html/editor.js", "1596:1681");
__$coverInitRange("src/js/types/html/editor.js", "1687:1780");
__$coverInitRange("src/js/types/html/editor.js", "1786:1913");
__$coverInitRange("src/js/types/html/editor.js", "1919:1934");
__$coverInitRange("src/js/types/html/editor.js", "1640:1675");
__$coverInitRange("src/js/types/html/editor.js", "1739:1773");
__$coverInitRange("src/js/types/html/editor.js", "1855:1906");
__$coverInitRange("src/js/types/html/editor.js", "1979:1990");
__$coverInitRange("src/js/types/html/editor.js", "1994:2046");
__$coverInitRange("src/js/types/html/editor.js", "2050:2594");
__$coverInitRange("src/js/types/html/editor.js", "2075:2103");
__$coverInitRange("src/js/types/html/editor.js", "2109:2148");
__$coverInitRange("src/js/types/html/editor.js", "2154:2243");
__$coverInitRange("src/js/types/html/editor.js", "2249:2272");
__$coverInitRange("src/js/types/html/editor.js", "2278:2589");
__$coverInitRange("src/js/types/html/editor.js", "2189:2237");
__$coverInitRange("src/js/types/html/editor.js", "2310:2466");
__$coverInitRange("src/js/types/html/editor.js", "2474:2508");
__$coverInitRange("src/js/types/html/editor.js", "2352:2375");
__$coverInitRange("src/js/types/html/editor.js", "2400:2458");
__$coverInitRange("src/js/types/html/editor.js", "2529:2583");
__$coverInitRange("src/js/types/html/editor.js", "2639:2668");
__$coverInitRange("src/js/types/html/editor.js", "2673:2813");
__$coverInitRange("src/js/types/html/editor.js", "2818:2899");
__$coverInitRange("src/js/types/html/editor.js", "2904:2985");
__$coverInitRange("src/js/types/html/editor.js", "2990:3071");
__$coverInitRange("src/js/types/html/editor.js", "3076:3157");
__$coverInitRange("src/js/types/html/editor.js", "3162:3243");
__$coverInitRange("src/js/types/html/editor.js", "3248:3329");
__$coverInitRange("src/js/types/html/editor.js", "3334:3418");
__$coverInitRange("src/js/types/html/editor.js", "3423:3509");
__$coverInitRange("src/js/types/html/editor.js", "3514:3603");
__$coverInitRange("src/js/types/html/editor.js", "3608:3694");
__$coverInitRange("src/js/types/html/editor.js", "3699:3794");
__$coverInitRange("src/js/types/html/editor.js", "3799:3892");
__$coverInitRange("src/js/types/html/editor.js", "3897:3982");
__$coverInitRange("src/js/types/html/editor.js", "3987:4099");
__$coverInitRange("src/js/types/html/editor.js", "4104:4194");
__$coverInitRange("src/js/types/html/editor.js", "4199:4286");
__$coverInitRange("src/js/types/html/editor.js", "4291:4658");
__$coverInitRange("src/js/types/html/editor.js", "4663:4983");
__$coverInitRange("src/js/types/html/editor.js", "4988:5462");
__$coverInitRange("src/js/types/html/editor.js", "5467:5939");
__$coverInitRange("src/js/types/html/editor.js", "5944:5961");
__$coverInitRange("src/js/types/html/editor.js", "2705:2754");
__$coverInitRange("src/js/types/html/editor.js", "2760:2809");
__$coverInitRange("src/js/types/html/editor.js", "2861:2894");
__$coverInitRange("src/js/types/html/editor.js", "2947:2980");
__$coverInitRange("src/js/types/html/editor.js", "3033:3066");
__$coverInitRange("src/js/types/html/editor.js", "3119:3152");
__$coverInitRange("src/js/types/html/editor.js", "3205:3238");
__$coverInitRange("src/js/types/html/editor.js", "3291:3324");
__$coverInitRange("src/js/types/html/editor.js", "3379:3413");
__$coverInitRange("src/js/types/html/editor.js", "3470:3504");
__$coverInitRange("src/js/types/html/editor.js", "3564:3598");
__$coverInitRange("src/js/types/html/editor.js", "3655:3689");
__$coverInitRange("src/js/types/html/editor.js", "3751:3789");
__$coverInitRange("src/js/types/html/editor.js", "3849:3887");
__$coverInitRange("src/js/types/html/editor.js", "3943:3977");
__$coverInitRange("src/js/types/html/editor.js", "4038:4094");
__$coverInitRange("src/js/types/html/editor.js", "4149:4189");
__$coverInitRange("src/js/types/html/editor.js", "4243:4281");
__$coverInitRange("src/js/types/html/editor.js", "4342:4356");
__$coverInitRange("src/js/types/html/editor.js", "4362:4385");
__$coverInitRange("src/js/types/html/editor.js", "4391:4472");
__$coverInitRange("src/js/types/html/editor.js", "4478:4536");
__$coverInitRange("src/js/types/html/editor.js", "4542:4583");
__$coverInitRange("src/js/types/html/editor.js", "4589:4653");
__$coverInitRange("src/js/types/html/editor.js", "4410:4466");
__$coverInitRange("src/js/types/html/editor.js", "4571:4577");
__$coverInitRange("src/js/types/html/editor.js", "4709:4721");
__$coverInitRange("src/js/types/html/editor.js", "4727:4785");
__$coverInitRange("src/js/types/html/editor.js", "4791:4860");
__$coverInitRange("src/js/types/html/editor.js", "4866:4906");
__$coverInitRange("src/js/types/html/editor.js", "4912:4978");
__$coverInitRange("src/js/types/html/editor.js", "4894:4900");
__$coverInitRange("src/js/types/html/editor.js", "5042:5053");
__$coverInitRange("src/js/types/html/editor.js", "5059:5082");
__$coverInitRange("src/js/types/html/editor.js", "5088:5363");
__$coverInitRange("src/js/types/html/editor.js", "5369:5389");
__$coverInitRange("src/js/types/html/editor.js", "5395:5413");
__$coverInitRange("src/js/types/html/editor.js", "5419:5457");
__$coverInitRange("src/js/types/html/editor.js", "5115:5143");
__$coverInitRange("src/js/types/html/editor.js", "5151:5174");
__$coverInitRange("src/js/types/html/editor.js", "5182:5195");
__$coverInitRange("src/js/types/html/editor.js", "5203:5330");
__$coverInitRange("src/js/types/html/editor.js", "5338:5353");
__$coverInitRange("src/js/types/html/editor.js", "5263:5275");
__$coverInitRange("src/js/types/html/editor.js", "5285:5322");
__$coverInitRange("src/js/types/html/editor.js", "5519:5530");
__$coverInitRange("src/js/types/html/editor.js", "5536:5559");
__$coverInitRange("src/js/types/html/editor.js", "5565:5840");
__$coverInitRange("src/js/types/html/editor.js", "5846:5866");
__$coverInitRange("src/js/types/html/editor.js", "5872:5890");
__$coverInitRange("src/js/types/html/editor.js", "5896:5934");
__$coverInitRange("src/js/types/html/editor.js", "5592:5620");
__$coverInitRange("src/js/types/html/editor.js", "5628:5651");
__$coverInitRange("src/js/types/html/editor.js", "5659:5672");
__$coverInitRange("src/js/types/html/editor.js", "5680:5807");
__$coverInitRange("src/js/types/html/editor.js", "5815:5830");
__$coverInitRange("src/js/types/html/editor.js", "5740:5752");
__$coverInitRange("src/js/types/html/editor.js", "5762:5799");
__$coverCall('src/js/types/html/editor.js', '0:372');
var HtmlEditor, autoIndentableHtml, headerMarkup, __hasProp = {}.hasOwnProperty, __extends = function (child, parent) {
        __$coverCall('src/js/types/html/editor.js', '123:208');
        for (var key in parent) {
            __$coverCall('src/js/types/html/editor.js', '149:206');
            if (__hasProp.call(parent, key))
                child[key] = parent[key];
        }
        __$coverCall('src/js/types/html/editor.js', '210:254');
        function ctor() {
            __$coverCall('src/js/types/html/editor.js', '228:252');
            this.constructor = child;
        }
        __$coverCall('src/js/types/html/editor.js', '256:289');
        ctor.prototype = parent.prototype;
        __$coverCall('src/js/types/html/editor.js', '291:319');
        child.prototype = new ctor();
        __$coverCall('src/js/types/html/editor.js', '321:355');
        child.__super__ = parent.prototype;
        __$coverCall('src/js/types/html/editor.js', '357:369');
        return child;
    };
__$coverCall('src/js/types/html/editor.js', '375:1945');
autoIndentableHtml = function () {
    __$coverCall('src/js/types/html/editor.js', '412:438');
    var PATTERNS, post, pre, x;
    __$coverCall('src/js/types/html/editor.js', '442:750');
    PATTERNS = function () {
        __$coverCall('src/js/types/html/editor.js', '471:499');
        var _i, _len, _ref, _results;
        __$coverCall('src/js/types/html/editor.js', '505:523');
        _ref = [
            'p',
            'li'
        ];
        __$coverCall('src/js/types/html/editor.js', '529:542');
        _results = [];
        __$coverCall('src/js/types/html/editor.js', '548:721');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            __$coverCall('src/js/types/html/editor.js', '606:618');
            x = _ref[_i];
            __$coverCall('src/js/types/html/editor.js', '626:715');
            _results.push([
                x,
                new RegExp('^[s\t]*<' + x + '>'),
                new RegExp('</' + x + '>[s\t]*$')
            ]);
        }
        __$coverCall('src/js/types/html/editor.js', '727:742');
        return _results;
    }();
    __$coverCall('src/js/types/html/editor.js', '754:1139');
    pre = function (e, line) {
        __$coverCall('src/js/types/html/editor.js', '784:816');
        var lineCaret, pattern, _i, _len;
        __$coverCall('src/js/types/html/editor.js', '822:858');
        if (e.shiftKey) {
            __$coverCall('src/js/types/html/editor.js', '846:852');
            return;
        }
        __$coverCall('src/js/types/html/editor.js', '864:1134');
        for (_i = 0, _len = PATTERNS.length; _i < _len; _i++) {
            __$coverCall('src/js/types/html/editor.js', '926:948');
            pattern = PATTERNS[_i];
            __$coverCall('src/js/types/html/editor.js', '956:1128');
            if (pattern[1].test(line) || pattern[2].test(line)) {
                __$coverCall('src/js/types/html/editor.js', '1018:1060');
                lineCaret = this.selection._getLineCaret();
                __$coverCall('src/js/types/html/editor.js', '1070:1104');
                this.selection.caret(lineCaret[1]);
                __$coverCall('src/js/types/html/editor.js', '1114:1120');
                return;
            }
        }
    };
    __$coverCall('src/js/types/html/editor.js', '1143:1560');
    post = function (e, line, indent, insert) {
        __$coverCall('src/js/types/html/editor.js', '1190:1211');
        var pattern, _i, _len;
        __$coverCall('src/js/types/html/editor.js', '1217:1253');
        if (e.shiftKey) {
            __$coverCall('src/js/types/html/editor.js', '1241:1247');
            return;
        }
        __$coverCall('src/js/types/html/editor.js', '1259:1555');
        for (_i = 0, _len = PATTERNS.length; _i < _len; _i++) {
            __$coverCall('src/js/types/html/editor.js', '1321:1343');
            pattern = PATTERNS[_i];
            __$coverCall('src/js/types/html/editor.js', '1351:1549');
            if (pattern[2].test(line)) {
                __$coverCall('src/js/types/html/editor.js', '1388:1402');
                x = pattern[0];
                __$coverCall('src/js/types/html/editor.js', '1412:1472');
                this.selection.insertAfter('<' + x + '></' + x + '>', false);
                __$coverCall('src/js/types/html/editor.js', '1482:1525');
                this.selection.caretOffset(-(3 + x.length));
                __$coverCall('src/js/types/html/editor.js', '1535:1541');
                return;
            }
        }
    };
    __$coverCall('src/js/types/html/editor.js', '1564:1939');
    return function (textarea) {
        __$coverCall('src/js/types/html/editor.js', '1596:1681');
        if (!(textarea.autoIndent != null)) {
            __$coverCall('src/js/types/html/editor.js', '1640:1675');
            textarea = autoIndentable(textarea);
        }
        __$coverCall('src/js/types/html/editor.js', '1687:1780');
        textarea.autoIndent.pre = function (e, line) {
            __$coverCall('src/js/types/html/editor.js', '1739:1773');
            return pre.call(textarea, e, line);
        };
        __$coverCall('src/js/types/html/editor.js', '1786:1913');
        textarea.autoIndent.post = function (e, line, indent, insert) {
            __$coverCall('src/js/types/html/editor.js', '1855:1906');
            return post.call(textarea, e, line, indent, insert);
        };
        __$coverCall('src/js/types/html/editor.js', '1919:1934');
        return textarea;
    };
}();
__$coverCall('src/js/types/html/editor.js', '1948:2600');
headerMarkup = function () {
    __$coverCall('src/js/types/html/editor.js', '1979:1990');
    var PATTERN;
    __$coverCall('src/js/types/html/editor.js', '1994:2046');
    PATTERN = new RegExp('^<h([1-6])>(.*)</h[1-6]>\n?$');
    __$coverCall('src/js/types/html/editor.js', '2050:2594');
    return function (n) {
        __$coverCall('src/js/types/html/editor.js', '2075:2103');
        var caret, replacement, text;
        __$coverCall('src/js/types/html/editor.js', '2109:2148');
        caret = this.textarea.selection.caret();
        __$coverCall('src/js/types/html/editor.js', '2154:2243');
        if (caret[0] === caret[1]) {
            __$coverCall('src/js/types/html/editor.js', '2189:2237');
            this.textarea.selection.selectWholeCurrentLine();
        }
        __$coverCall('src/js/types/html/editor.js', '2249:2272');
        text = this.selection();
        __$coverCall('src/js/types/html/editor.js', '2278:2589');
        if (PATTERN.test(text)) {
            __$coverCall('src/js/types/html/editor.js', '2310:2466');
            if (RegExp.$1 === n.toString()) {
                __$coverCall('src/js/types/html/editor.js', '2352:2375');
                replacement = RegExp.$2;
            } else {
                __$coverCall('src/js/types/html/editor.js', '2400:2458');
                replacement = '<h' + n + '>' + RegExp.$2 + '</h' + n + '>';
            }
            __$coverCall('src/js/types/html/editor.js', '2474:2508');
            return this.selection(replacement);
        } else {
            __$coverCall('src/js/types/html/editor.js', '2529:2583');
            return this.enclose('<h' + n + '>', '</h' + n + '>\n');
        }
    };
}();
__$coverCall('src/js/types/html/editor.js', '2603:5978');
HtmlEditor = function (_super) {
    __$coverCall('src/js/types/html/editor.js', '2639:2668');
    __extends(HtmlEditor, _super);
    __$coverCall('src/js/types/html/editor.js', '2673:2813');
    function HtmlEditor(core) {
        __$coverCall('src/js/types/html/editor.js', '2705:2754');
        HtmlEditor.__super__.constructor.call(this, core);
        __$coverCall('src/js/types/html/editor.js', '2760:2809');
        this.textarea = autoIndentableHtml(this.textarea);
    }
    __$coverCall('src/js/types/html/editor.js', '2818:2899');
    HtmlEditor.prototype.h1 = function () {
        __$coverCall('src/js/types/html/editor.js', '2861:2894');
        return headerMarkup.call(this, 1);
    };
    __$coverCall('src/js/types/html/editor.js', '2904:2985');
    HtmlEditor.prototype.h2 = function () {
        __$coverCall('src/js/types/html/editor.js', '2947:2980');
        return headerMarkup.call(this, 2);
    };
    __$coverCall('src/js/types/html/editor.js', '2990:3071');
    HtmlEditor.prototype.h3 = function () {
        __$coverCall('src/js/types/html/editor.js', '3033:3066');
        return headerMarkup.call(this, 3);
    };
    __$coverCall('src/js/types/html/editor.js', '3076:3157');
    HtmlEditor.prototype.h4 = function () {
        __$coverCall('src/js/types/html/editor.js', '3119:3152');
        return headerMarkup.call(this, 4);
    };
    __$coverCall('src/js/types/html/editor.js', '3162:3243');
    HtmlEditor.prototype.h5 = function () {
        __$coverCall('src/js/types/html/editor.js', '3205:3238');
        return headerMarkup.call(this, 5);
    };
    __$coverCall('src/js/types/html/editor.js', '3248:3329');
    HtmlEditor.prototype.h6 = function () {
        __$coverCall('src/js/types/html/editor.js', '3291:3324');
        return headerMarkup.call(this, 6);
    };
    __$coverCall('src/js/types/html/editor.js', '3334:3418');
    HtmlEditor.prototype.bold = function () {
        __$coverCall('src/js/types/html/editor.js', '3379:3413');
        return this.enclose('<b>', '</b>');
    };
    __$coverCall('src/js/types/html/editor.js', '3423:3509');
    HtmlEditor.prototype.italic = function () {
        __$coverCall('src/js/types/html/editor.js', '3470:3504');
        return this.enclose('<i>', '</i>');
    };
    __$coverCall('src/js/types/html/editor.js', '3514:3603');
    HtmlEditor.prototype.underline = function () {
        __$coverCall('src/js/types/html/editor.js', '3564:3598');
        return this.enclose('<u>', '</u>');
    };
    __$coverCall('src/js/types/html/editor.js', '3608:3694');
    HtmlEditor.prototype.strike = function () {
        __$coverCall('src/js/types/html/editor.js', '3655:3689');
        return this.enclose('<s>', '</s>');
    };
    __$coverCall('src/js/types/html/editor.js', '3699:3794');
    HtmlEditor.prototype.superscript = function () {
        __$coverCall('src/js/types/html/editor.js', '3751:3789');
        return this.enclose('<sup>', '</sup>');
    };
    __$coverCall('src/js/types/html/editor.js', '3799:3892');
    HtmlEditor.prototype.subscript = function () {
        __$coverCall('src/js/types/html/editor.js', '3849:3887');
        return this.enclose('<sub>', '</sub>');
    };
    __$coverCall('src/js/types/html/editor.js', '3897:3982');
    HtmlEditor.prototype.quote = function () {
        __$coverCall('src/js/types/html/editor.js', '3943:3977');
        return this.enclose('<q>', '</q>');
    };
    __$coverCall('src/js/types/html/editor.js', '3987:4099');
    HtmlEditor.prototype.blockquote = function () {
        __$coverCall('src/js/types/html/editor.js', '4038:4094');
        return this.enclose('\n<blockquote>', '</blockquote>\n');
    };
    __$coverCall('src/js/types/html/editor.js', '4104:4194');
    HtmlEditor.prototype.code = function () {
        __$coverCall('src/js/types/html/editor.js', '4149:4189');
        return this.enclose('<code>', '</code>');
    };
    __$coverCall('src/js/types/html/editor.js', '4199:4286');
    HtmlEditor.prototype.pre = function () {
        __$coverCall('src/js/types/html/editor.js', '4243:4281');
        return this.enclose('<pre>', '</pre>');
    };
    __$coverCall('src/js/types/html/editor.js', '4291:4658');
    HtmlEditor.prototype.anchorLink = function () {
        __$coverCall('src/js/types/html/editor.js', '4342:4356');
        var href, text;
        __$coverCall('src/js/types/html/editor.js', '4362:4385');
        text = this.selection();
        __$coverCall('src/js/types/html/editor.js', '4391:4472');
        if (!text) {
            __$coverCall('src/js/types/html/editor.js', '4410:4466');
            text = window.prompt('Please input a link text', 'Here');
        }
        __$coverCall('src/js/types/html/editor.js', '4478:4536');
        href = window.prompt('Please input a link url', 'http://');
        __$coverCall('src/js/types/html/editor.js', '4542:4583');
        if (!(href != null)) {
            __$coverCall('src/js/types/html/editor.js', '4571:4577');
            return;
        }
        __$coverCall('src/js/types/html/editor.js', '4589:4653');
        return this.selection('<a href=\'' + href + '\'>' + text + '</a>');
    };
    __$coverCall('src/js/types/html/editor.js', '4663:4983');
    HtmlEditor.prototype.image = function () {
        __$coverCall('src/js/types/html/editor.js', '4709:4721');
        var alt, src;
        __$coverCall('src/js/types/html/editor.js', '4727:4785');
        src = window.prompt('Please input a image url', 'http://');
        __$coverCall('src/js/types/html/editor.js', '4791:4860');
        alt = window.prompt('(Optional) Please input a alt message', 'Image');
        __$coverCall('src/js/types/html/editor.js', '4866:4906');
        if (!(src != null)) {
            __$coverCall('src/js/types/html/editor.js', '4894:4900');
            return;
        }
        __$coverCall('src/js/types/html/editor.js', '4912:4978');
        return this.selection('<img src=\'' + src + '\' alt=\'' + alt + '\'>');
    };
    __$coverCall('src/js/types/html/editor.js', '4988:5462');
    HtmlEditor.prototype.unorderedList = function () {
        __$coverCall('src/js/types/html/editor.js', '5042:5053');
        var text, x;
        __$coverCall('src/js/types/html/editor.js', '5059:5082');
        text = this.selection();
        __$coverCall('src/js/types/html/editor.js', '5088:5363');
        text = function () {
            __$coverCall('src/js/types/html/editor.js', '5115:5143');
            var _i, _len, _ref, _results;
            __$coverCall('src/js/types/html/editor.js', '5151:5174');
            _ref = text.split('\n');
            __$coverCall('src/js/types/html/editor.js', '5182:5195');
            _results = [];
            __$coverCall('src/js/types/html/editor.js', '5203:5330');
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                __$coverCall('src/js/types/html/editor.js', '5263:5275');
                x = _ref[_i];
                __$coverCall('src/js/types/html/editor.js', '5285:5322');
                _results.push('  <li>' + x + '</li>');
            }
            __$coverCall('src/js/types/html/editor.js', '5338:5353');
            return _results;
        }();
        __$coverCall('src/js/types/html/editor.js', '5369:5389');
        text.unshift('<ul>');
        __$coverCall('src/js/types/html/editor.js', '5395:5413');
        text.push('</ul>');
        __$coverCall('src/js/types/html/editor.js', '5419:5457');
        return this.selection(text.join('\n'));
    };
    __$coverCall('src/js/types/html/editor.js', '5467:5939');
    HtmlEditor.prototype.orderedList = function () {
        __$coverCall('src/js/types/html/editor.js', '5519:5530');
        var text, x;
        __$coverCall('src/js/types/html/editor.js', '5536:5559');
        text = this.selection();
        __$coverCall('src/js/types/html/editor.js', '5565:5840');
        text = function () {
            __$coverCall('src/js/types/html/editor.js', '5592:5620');
            var _i, _len, _ref, _results;
            __$coverCall('src/js/types/html/editor.js', '5628:5651');
            _ref = text.split('\n');
            __$coverCall('src/js/types/html/editor.js', '5659:5672');
            _results = [];
            __$coverCall('src/js/types/html/editor.js', '5680:5807');
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                __$coverCall('src/js/types/html/editor.js', '5740:5752');
                x = _ref[_i];
                __$coverCall('src/js/types/html/editor.js', '5762:5799');
                _results.push('  <li>' + x + '</li>');
            }
            __$coverCall('src/js/types/html/editor.js', '5815:5830');
            return _results;
        }();
        __$coverCall('src/js/types/html/editor.js', '5846:5866');
        text.unshift('<ol>');
        __$coverCall('src/js/types/html/editor.js', '5872:5890');
        text.push('</ol>');
        __$coverCall('src/js/types/html/editor.js', '5896:5934');
        return this.selection(text.join('\n'));
    };
    __$coverCall('src/js/types/html/editor.js', '5944:5961');
    return HtmlEditor;
}(TextEditor);