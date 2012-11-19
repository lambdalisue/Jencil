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
__$coverInit("js/utils/autoindent.js", "/*\nautoindent\n\nEnable auto indentation feature in textarea\nIt is suitable with jquery.tabby.js which enable tab indentation in textarea\n\nThe following library is required to use this library\n\n- jQuery\n- selection\n\nNote:\n  You should use this library as CoffeeScript that's why I didn't\n  add `autoIndentable` in window namespace\n\nUsage:\n\n  textarea = $('textarea')\n  textarea = autoIndentable(textarea)\n\n  # auto indent feature is enable at default.\n  # you can disable it with\n  textarea.autoIndent.disable()\n\n  # and enable again with\n  textarea.autoIndent.enable()\n\n  # and also, you can add some pre/post callback\n  # which is called pre/post step of adding newline\n  # and white spaces with\n  textarea.autoIndent.pre = (e, line) ->\n    # e = Event object of jQuery\n    # line = current line of caret exists\n    console.log \"This function is called before newline adding\"\n  textarea.autoIndent.post = (e, line, indent, insert) ->\n    # e = Event object of jQuery\n    # line = current line of caret exists\n    # indent = leading white spaces of current line\n    # insert = newline and indent which is added after the caret\n    console.log \"This function is called after newline adding\"\n\nAuthor:   lambdalisue (lambdalisue@hashnote.net)\nLicense:  MIT License\n\nCopyright(C) 2012 lambdalisue, hasnote.net allright reserved\n*/\n\nvar autoIndentable;\n\nautoIndentable = (function() {\n  var autoIndent;\n  autoIndent = function(e) {\n    var cancel, indent, insert, line, _ref, _ref1;\n    if (e.which !== 13) {\n      return;\n    }\n    line = this.selection.line();\n    cancel = ((_ref = this.autoIndent.pre) != null ? _ref.call(this, e, line) : void 0) === true;\n    if (cancel !== true) {\n      indent = line.replace(/^([\\t\\s]*).*$/, \"$1\");\n      insert = \"\\n\" + indent;\n      this.selection.insertAfter(insert, false);\n    }\n    if ((_ref1 = this.autoIndent.post) != null) {\n      _ref1.call(this, e, line, indent, insert, cancel);\n    }\n    e.stopPropagation();\n    e.stopImmediatePropagation();\n    e.preventDefault();\n    this.focus();\n    return false;\n  };\n  return function(textarea, pre, post) {\n    if (!(textarea instanceof jQuery)) {\n      textarea = $(textarea);\n    }\n    if (!(textarea.selection != null)) {\n      textarea.selection = new Selection(document, textarea.get(0));\n    }\n    textarea.autoIndent = function(e) {\n      return autoIndent.call(textarea, e);\n    };\n    textarea.autoIndent.enable = function() {\n      textarea.on('keydown', textarea.autoIndent);\n      return textarea;\n    };\n    textarea.autoIndent.disable = function() {\n      textarea.off('keydown', textarea.autoIndent);\n      return textarea;\n    };\n    if (pre != null) {\n      textarea.autoIndent.pre = function(e, line) {\n        return pre.call(textarea, e, line);\n      };\n    }\n    if (post != null) {\n      textarea.autoIndent.post = function(e, line, indent, insert) {\n        return post.call(textarea, e, line, indent, insert);\n      };\n    }\n    return textarea.autoIndent.enable();\n  };\n})();\n");
__$coverInitRange("js/utils/autoindent.js", "1327:1345");
__$coverInitRange("js/utils/autoindent.js", "1348:2989");
__$coverInitRange("js/utils/autoindent.js", "1381:1395");
__$coverInitRange("js/utils/autoindent.js", "1399:2054");
__$coverInitRange("js/utils/autoindent.js", "2058:2983");
__$coverInitRange("js/utils/autoindent.js", "1430:1475");
__$coverInitRange("js/utils/autoindent.js", "1481:1521");
__$coverInitRange("js/utils/autoindent.js", "1527:1555");
__$coverInitRange("js/utils/autoindent.js", "1561:1653");
__$coverInitRange("js/utils/autoindent.js", "1659:1817");
__$coverInitRange("js/utils/autoindent.js", "1823:1930");
__$coverInitRange("js/utils/autoindent.js", "1936:1955");
__$coverInitRange("js/utils/autoindent.js", "1961:1989");
__$coverInitRange("js/utils/autoindent.js", "1995:2013");
__$coverInitRange("js/utils/autoindent.js", "2019:2031");
__$coverInitRange("js/utils/autoindent.js", "2037:2049");
__$coverInitRange("js/utils/autoindent.js", "1509:1515");
__$coverInitRange("js/utils/autoindent.js", "1688:1732");
__$coverInitRange("js/utils/autoindent.js", "1740:1762");
__$coverInitRange("js/utils/autoindent.js", "1770:1811");
__$coverInitRange("js/utils/autoindent.js", "1875:1924");
__$coverInitRange("js/utils/autoindent.js", "2101:2172");
__$coverInitRange("js/utils/autoindent.js", "2178:2288");
__$coverInitRange("js/utils/autoindent.js", "2294:2378");
__$coverInitRange("js/utils/autoindent.js", "2384:2505");
__$coverInitRange("js/utils/autoindent.js", "2511:2634");
__$coverInitRange("js/utils/autoindent.js", "2640:2768");
__$coverInitRange("js/utils/autoindent.js", "2774:2937");
__$coverInitRange("js/utils/autoindent.js", "2943:2978");
__$coverInitRange("js/utils/autoindent.js", "2144:2166");
__$coverInitRange("js/utils/autoindent.js", "2221:2282");
__$coverInitRange("js/utils/autoindent.js", "2336:2371");
__$coverInitRange("js/utils/autoindent.js", "2432:2475");
__$coverInitRange("js/utils/autoindent.js", "2483:2498");
__$coverInitRange("js/utils/autoindent.js", "2560:2604");
__$coverInitRange("js/utils/autoindent.js", "2612:2627");
__$coverInitRange("js/utils/autoindent.js", "2665:2762");
__$coverInitRange("js/utils/autoindent.js", "2719:2753");
__$coverInitRange("js/utils/autoindent.js", "2800:2931");
__$coverInitRange("js/utils/autoindent.js", "2871:2922");
__$coverCall('js/utils/autoindent.js', '1327:1345');
var autoIndentable;
__$coverCall('js/utils/autoindent.js', '1348:2989');
autoIndentable = function () {
    __$coverCall('js/utils/autoindent.js', '1381:1395');
    var autoIndent;
    __$coverCall('js/utils/autoindent.js', '1399:2054');
    autoIndent = function (e) {
        __$coverCall('js/utils/autoindent.js', '1430:1475');
        var cancel, indent, insert, line, _ref, _ref1;
        __$coverCall('js/utils/autoindent.js', '1481:1521');
        if (e.which !== 13) {
            __$coverCall('js/utils/autoindent.js', '1509:1515');
            return;
        }
        __$coverCall('js/utils/autoindent.js', '1527:1555');
        line = this.selection.line();
        __$coverCall('js/utils/autoindent.js', '1561:1653');
        cancel = ((_ref = this.autoIndent.pre) != null ? _ref.call(this, e, line) : void 0) === true;
        __$coverCall('js/utils/autoindent.js', '1659:1817');
        if (cancel !== true) {
            __$coverCall('js/utils/autoindent.js', '1688:1732');
            indent = line.replace(/^([\t\s]*).*$/, '$1');
            __$coverCall('js/utils/autoindent.js', '1740:1762');
            insert = '\n' + indent;
            __$coverCall('js/utils/autoindent.js', '1770:1811');
            this.selection.insertAfter(insert, false);
        }
        __$coverCall('js/utils/autoindent.js', '1823:1930');
        if ((_ref1 = this.autoIndent.post) != null) {
            __$coverCall('js/utils/autoindent.js', '1875:1924');
            _ref1.call(this, e, line, indent, insert, cancel);
        }
        __$coverCall('js/utils/autoindent.js', '1936:1955');
        e.stopPropagation();
        __$coverCall('js/utils/autoindent.js', '1961:1989');
        e.stopImmediatePropagation();
        __$coverCall('js/utils/autoindent.js', '1995:2013');
        e.preventDefault();
        __$coverCall('js/utils/autoindent.js', '2019:2031');
        this.focus();
        __$coverCall('js/utils/autoindent.js', '2037:2049');
        return false;
    };
    __$coverCall('js/utils/autoindent.js', '2058:2983');
    return function (textarea, pre, post) {
        __$coverCall('js/utils/autoindent.js', '2101:2172');
        if (!(textarea instanceof jQuery)) {
            __$coverCall('js/utils/autoindent.js', '2144:2166');
            textarea = $(textarea);
        }
        __$coverCall('js/utils/autoindent.js', '2178:2288');
        if (!(textarea.selection != null)) {
            __$coverCall('js/utils/autoindent.js', '2221:2282');
            textarea.selection = new Selection(document, textarea.get(0));
        }
        __$coverCall('js/utils/autoindent.js', '2294:2378');
        textarea.autoIndent = function (e) {
            __$coverCall('js/utils/autoindent.js', '2336:2371');
            return autoIndent.call(textarea, e);
        };
        __$coverCall('js/utils/autoindent.js', '2384:2505');
        textarea.autoIndent.enable = function () {
            __$coverCall('js/utils/autoindent.js', '2432:2475');
            textarea.on('keydown', textarea.autoIndent);
            __$coverCall('js/utils/autoindent.js', '2483:2498');
            return textarea;
        };
        __$coverCall('js/utils/autoindent.js', '2511:2634');
        textarea.autoIndent.disable = function () {
            __$coverCall('js/utils/autoindent.js', '2560:2604');
            textarea.off('keydown', textarea.autoIndent);
            __$coverCall('js/utils/autoindent.js', '2612:2627');
            return textarea;
        };
        __$coverCall('js/utils/autoindent.js', '2640:2768');
        if (pre != null) {
            __$coverCall('js/utils/autoindent.js', '2665:2762');
            textarea.autoIndent.pre = function (e, line) {
                __$coverCall('js/utils/autoindent.js', '2719:2753');
                return pre.call(textarea, e, line);
            };
        }
        __$coverCall('js/utils/autoindent.js', '2774:2937');
        if (post != null) {
            __$coverCall('js/utils/autoindent.js', '2800:2931');
            textarea.autoIndent.post = function (e, line, indent, insert) {
                __$coverCall('js/utils/autoindent.js', '2871:2922');
                return post.call(textarea, e, line, indent, insert);
            };
        }
        __$coverCall('js/utils/autoindent.js', '2943:2978');
        return textarea.autoIndent.enable();
    };
}();