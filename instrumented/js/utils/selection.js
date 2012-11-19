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
__$coverInit("src/js/utils/selection.js", "var Selection;\n\nSelection = (function() {\n\n  function Selection(document, element) {\n    this.document = document;\n    this.element = element;\n    if (this.document instanceof jQuery) {\n      this.document = this.document.get(0);\n    }\n    if (this.element instanceof jQuery) {\n      this.element = this.element.get(0);\n    }\n  }\n\n  Selection.prototype._getCaret = function() {\n    var caret, clone, e, range, s;\n    if (this.document.selection != null) {\n      range = this.document.selection.createRange();\n      clone = range.duplicate();\n      clone.moveToElementText(this.element);\n      clone.setEndPoint('EndToEnd', range);\n      s = clone.text.length - range.text.length;\n      e = s + range.text.length;\n    } else if (this.element.setSelectionRange != null) {\n      s = this.element.selectionStart;\n      e = this.element.selectionEnd;\n    }\n    caret = [s, e];\n    return caret;\n  };\n\n  Selection.prototype._setCaret = function(start, end) {\n    var range, scrollTop;\n    scrollTop = this.element.scrollTop;\n    if (this.element.setSelectionRange != null) {\n      this.element.setSelectionRange(start, end);\n    } else if (this.element.createTextRange) {\n      range = this.element.createTextRange();\n      range.collapse(true);\n      range.moveStart('character', start);\n      range.moveEnd('character', end - start);\n      range.select();\n    }\n    this.element.focus();\n    this.element.scrollTop = scrollTop;\n    return this;\n  };\n\n  Selection.prototype.caret = function(start, end) {\n    if ((start != null) && start instanceof Array) {\n      end = start[1];\n      start = start[0];\n    }\n    if ((start != null) && !(end != null)) {\n      end = start;\n    }\n    if ((start != null) && (end != null)) {\n      return this._setCaret(start, end);\n    }\n    return this._getCaret();\n  };\n\n  Selection.prototype.caretOffset = function(offset) {\n    var caret;\n    caret = this.caret();\n    return this.caret(caret[0] + offset);\n  };\n\n  Selection.prototype.replace = function(str, start, end) {\n    var a, b, scrollTop;\n    scrollTop = this.element.scrollTop;\n    b = this.element.value.substring(0, start);\n    a = this.element.value.substring(end);\n    this.element.value = b + str + a;\n    this.element.scrollTop = scrollTop;\n    return this;\n  };\n\n  Selection.prototype._getText = function() {\n    var e, range, s, _ref;\n    if (this.document.selection != null) {\n      range = this.document.selection.createRange();\n      return range.text;\n    } else if (this.element.setSelectionRange) {\n      _ref = this.caret(), s = _ref[0], e = _ref[1];\n      return this.element.value.substring(s, e);\n    }\n    return null;\n  };\n\n  Selection.prototype._setText = function(str, keepSelection) {\n    var e, s, scrollTop, _ref;\n    scrollTop = this.element.scrollTop;\n    _ref = this.caret(), s = _ref[0], e = _ref[1];\n    this.replace(str, s, e);\n    e = s + str.length;\n    if (!keepSelection) {\n      s = e;\n    }\n    this.caret(s, e);\n    this.element.focus();\n    this.element.scrollTop = scrollTop;\n    return this;\n  };\n\n  Selection.prototype.text = function(str, keepSelection) {\n    if (str != null) {\n      return this._setText(str, keepSelection);\n    }\n    return this._getText();\n  };\n\n  Selection.prototype.insertBefore = function(str, keepSelection) {\n    var e, s, scrollTop, text, _ref;\n    scrollTop = this.element.scrollTop;\n    _ref = this.caret(), s = _ref[0], e = _ref[1];\n    text = this.text();\n    this.replace(str + text, s, e);\n    e = s + str.length;\n    if (!keepSelection) {\n      s = e;\n    }\n    this.caret(s, e);\n    this.element.focus();\n    this.element.scrollTop = scrollTop;\n    return this;\n  };\n\n  Selection.prototype.insertAfter = function(str, keepSelection) {\n    var e, s, scrollTop, text, _ref;\n    scrollTop = this.element.scrollTop;\n    _ref = this.caret(), s = _ref[0], e = _ref[1];\n    text = this.text();\n    this.replace(text + str, s, e);\n    s = e;\n    e = e + str.length;\n    if (!keepSelection) {\n      s = e;\n    }\n    this.caret(s, e);\n    this.element.focus();\n    this.element.scrollTop = scrollTop;\n    return this;\n  };\n\n  Selection.prototype.enclose = function(lhs, rhs, keepSelection) {\n    var e, s, scrollTop, str, text, _ref;\n    scrollTop = this.element.scrollTop;\n    text = this.text();\n    if (text.indexOf(lhs) === 0 && text.lastIndexOf(rhs) === (text.length - rhs.length)) {\n      str = text.substring(lhs.length, text.length - rhs.length);\n      this.text(str, keepSelection);\n    } else {\n      _ref = this.caret(), s = _ref[0], e = _ref[1];\n      this.replace(lhs + text + rhs, s, e);\n      e = s + lhs.length + text.length + rhs.length;\n      if (!keepSelection) {\n        s = e;\n      }\n      this.caret(s, e);\n    }\n    this.element.focus();\n    this.element.scrollTop = scrollTop;\n    return this;\n  };\n\n  Selection.prototype.lineCaret = function(pos) {\n    var e, s, value;\n    pos = pos || this.caret()[0];\n    value = this.element.value;\n    s = value.lastIndexOf(\"\\n\", pos - 1) + 1;\n    e = value.indexOf(\"\\n\", pos);\n    if (e === -1) {\n      e = value.length;\n    }\n    return [s, e];\n  };\n\n  Selection.prototype._getLine = function(pos) {\n    var e, s, _ref;\n    _ref = this.lineCaret(pos), s = _ref[0], e = _ref[1];\n    return this.element.value.substring(s, e);\n  };\n\n  Selection.prototype._setLine = function(line, keepSelection) {\n    var e, s, scrollTop, _ref;\n    scrollTop = this.element.scrollTop;\n    _ref = this.lineCaret(), s = _ref[0], e = _ref[1];\n    this.replace(line, s, e);\n    e = s + line.length;\n    if (!keepSelection) {\n      s = e;\n    }\n    this.caret(s, e);\n    this.element.focus();\n    this.element.scrollTop = scrollTop;\n    return this;\n  };\n\n  Selection.prototype.line = function(value, keepSelection) {\n    if (value != null) {\n      return this._setLine(value, keepSelection);\n    }\n    return this._getLine();\n  };\n\n  Selection.prototype.selectWholeLine = function(pos) {\n    var e, s, _ref;\n    _ref = this.lineCaret(pos), s = _ref[0], e = _ref[1];\n    return this.caret(s, e);\n  };\n\n  Selection.prototype.selectWholeCurrentLine = function() {\n    return this.selectWholeLine(null);\n  };\n\n  return Selection;\n\n})();\n");
__$coverInitRange("src/js/utils/selection.js", "0:13");
__$coverInitRange("src/js/utils/selection.js", "16:6135");
__$coverInitRange("src/js/utils/selection.js", "45:328");
__$coverInitRange("src/js/utils/selection.js", "333:893");
__$coverInitRange("src/js/utils/selection.js", "898:1444");
__$coverInitRange("src/js/utils/selection.js", "1449:1798");
__$coverInitRange("src/js/utils/selection.js", "1803:1942");
__$coverInitRange("src/js/utils/selection.js", "1947:2259");
__$coverInitRange("src/js/utils/selection.js", "2264:2633");
__$coverInitRange("src/js/utils/selection.js", "2638:3028");
__$coverInitRange("src/js/utils/selection.js", "3033:3199");
__$coverInitRange("src/js/utils/selection.js", "3204:3635");
__$coverInitRange("src/js/utils/selection.js", "3640:4081");
__$coverInitRange("src/js/utils/selection.js", "4086:4782");
__$coverInitRange("src/js/utils/selection.js", "4787:5074");
__$coverInitRange("src/js/utils/selection.js", "5079:5254");
__$coverInitRange("src/js/utils/selection.js", "5259:5656");
__$coverInitRange("src/js/utils/selection.js", "5661:5833");
__$coverInitRange("src/js/utils/selection.js", "5838:6002");
__$coverInitRange("src/js/utils/selection.js", "6007:6107");
__$coverInitRange("src/js/utils/selection.js", "6112:6128");
__$coverInitRange("src/js/utils/selection.js", "89:113");
__$coverInitRange("src/js/utils/selection.js", "119:141");
__$coverInitRange("src/js/utils/selection.js", "147:234");
__$coverInitRange("src/js/utils/selection.js", "240:324");
__$coverInitRange("src/js/utils/selection.js", "192:228");
__$coverInitRange("src/js/utils/selection.js", "284:318");
__$coverInitRange("src/js/utils/selection.js", "382:411");
__$coverInitRange("src/js/utils/selection.js", "417:850");
__$coverInitRange("src/js/utils/selection.js", "856:870");
__$coverInitRange("src/js/utils/selection.js", "876:888");
__$coverInitRange("src/js/utils/selection.js", "462:507");
__$coverInitRange("src/js/utils/selection.js", "515:540");
__$coverInitRange("src/js/utils/selection.js", "548:585");
__$coverInitRange("src/js/utils/selection.js", "593:629");
__$coverInitRange("src/js/utils/selection.js", "637:678");
__$coverInitRange("src/js/utils/selection.js", "686:711");
__$coverInitRange("src/js/utils/selection.js", "776:807");
__$coverInitRange("src/js/utils/selection.js", "815:844");
__$coverInitRange("src/js/utils/selection.js", "957:977");
__$coverInitRange("src/js/utils/selection.js", "983:1017");
__$coverInitRange("src/js/utils/selection.js", "1023:1356");
__$coverInitRange("src/js/utils/selection.js", "1362:1382");
__$coverInitRange("src/js/utils/selection.js", "1388:1422");
__$coverInitRange("src/js/utils/selection.js", "1428:1439");
__$coverInitRange("src/js/utils/selection.js", "1075:1117");
__$coverInitRange("src/js/utils/selection.js", "1172:1210");
__$coverInitRange("src/js/utils/selection.js", "1218:1238");
__$coverInitRange("src/js/utils/selection.js", "1246:1281");
__$coverInitRange("src/js/utils/selection.js", "1289:1328");
__$coverInitRange("src/js/utils/selection.js", "1336:1350");
__$coverInitRange("src/js/utils/selection.js", "1504:1603");
__$coverInitRange("src/js/utils/selection.js", "1609:1673");
__$coverInitRange("src/js/utils/selection.js", "1679:1764");
__$coverInitRange("src/js/utils/selection.js", "1770:1793");
__$coverInitRange("src/js/utils/selection.js", "1559:1573");
__$coverInitRange("src/js/utils/selection.js", "1581:1597");
__$coverInitRange("src/js/utils/selection.js", "1656:1667");
__$coverInitRange("src/js/utils/selection.js", "1725:1758");
__$coverInitRange("src/js/utils/selection.js", "1860:1869");
__$coverInitRange("src/js/utils/selection.js", "1875:1895");
__$coverInitRange("src/js/utils/selection.js", "1901:1937");
__$coverInitRange("src/js/utils/selection.js", "2009:2028");
__$coverInitRange("src/js/utils/selection.js", "2034:2068");
__$coverInitRange("src/js/utils/selection.js", "2074:2116");
__$coverInitRange("src/js/utils/selection.js", "2122:2159");
__$coverInitRange("src/js/utils/selection.js", "2165:2197");
__$coverInitRange("src/js/utils/selection.js", "2203:2237");
__$coverInitRange("src/js/utils/selection.js", "2243:2254");
__$coverInitRange("src/js/utils/selection.js", "2312:2333");
__$coverInitRange("src/js/utils/selection.js", "2339:2611");
__$coverInitRange("src/js/utils/selection.js", "2617:2628");
__$coverInitRange("src/js/utils/selection.js", "2384:2429");
__$coverInitRange("src/js/utils/selection.js", "2437:2454");
__$coverInitRange("src/js/utils/selection.js", "2511:2556");
__$coverInitRange("src/js/utils/selection.js", "2564:2605");
__$coverInitRange("src/js/utils/selection.js", "2704:2729");
__$coverInitRange("src/js/utils/selection.js", "2735:2769");
__$coverInitRange("src/js/utils/selection.js", "2775:2820");
__$coverInitRange("src/js/utils/selection.js", "2826:2849");
__$coverInitRange("src/js/utils/selection.js", "2855:2873");
__$coverInitRange("src/js/utils/selection.js", "2879:2918");
__$coverInitRange("src/js/utils/selection.js", "2924:2940");
__$coverInitRange("src/js/utils/selection.js", "2946:2966");
__$coverInitRange("src/js/utils/selection.js", "2972:3006");
__$coverInitRange("src/js/utils/selection.js", "3012:3023");
__$coverInitRange("src/js/utils/selection.js", "2907:2912");
__$coverInitRange("src/js/utils/selection.js", "3095:3166");
__$coverInitRange("src/js/utils/selection.js", "3172:3194");
__$coverInitRange("src/js/utils/selection.js", "3120:3160");
__$coverInitRange("src/js/utils/selection.js", "3274:3305");
__$coverInitRange("src/js/utils/selection.js", "3311:3345");
__$coverInitRange("src/js/utils/selection.js", "3351:3396");
__$coverInitRange("src/js/utils/selection.js", "3402:3420");
__$coverInitRange("src/js/utils/selection.js", "3426:3456");
__$coverInitRange("src/js/utils/selection.js", "3462:3480");
__$coverInitRange("src/js/utils/selection.js", "3486:3525");
__$coverInitRange("src/js/utils/selection.js", "3531:3547");
__$coverInitRange("src/js/utils/selection.js", "3553:3573");
__$coverInitRange("src/js/utils/selection.js", "3579:3613");
__$coverInitRange("src/js/utils/selection.js", "3619:3630");
__$coverInitRange("src/js/utils/selection.js", "3514:3519");
__$coverInitRange("src/js/utils/selection.js", "3709:3740");
__$coverInitRange("src/js/utils/selection.js", "3746:3780");
__$coverInitRange("src/js/utils/selection.js", "3786:3831");
__$coverInitRange("src/js/utils/selection.js", "3837:3855");
__$coverInitRange("src/js/utils/selection.js", "3861:3891");
__$coverInitRange("src/js/utils/selection.js", "3897:3902");
__$coverInitRange("src/js/utils/selection.js", "3908:3926");
__$coverInitRange("src/js/utils/selection.js", "3932:3971");
__$coverInitRange("src/js/utils/selection.js", "3977:3993");
__$coverInitRange("src/js/utils/selection.js", "3999:4019");
__$coverInitRange("src/js/utils/selection.js", "4025:4059");
__$coverInitRange("src/js/utils/selection.js", "4065:4076");
__$coverInitRange("src/js/utils/selection.js", "3960:3965");
__$coverInitRange("src/js/utils/selection.js", "4156:4192");
__$coverInitRange("src/js/utils/selection.js", "4198:4232");
__$coverInitRange("src/js/utils/selection.js", "4238:4256");
__$coverInitRange("src/js/utils/selection.js", "4262:4694");
__$coverInitRange("src/js/utils/selection.js", "4700:4720");
__$coverInitRange("src/js/utils/selection.js", "4726:4760");
__$coverInitRange("src/js/utils/selection.js", "4766:4777");
__$coverInitRange("src/js/utils/selection.js", "4355:4413");
__$coverInitRange("src/js/utils/selection.js", "4421:4450");
__$coverInitRange("src/js/utils/selection.js", "4471:4516");
__$coverInitRange("src/js/utils/selection.js", "4524:4560");
__$coverInitRange("src/js/utils/selection.js", "4568:4613");
__$coverInitRange("src/js/utils/selection.js", "4621:4664");
__$coverInitRange("src/js/utils/selection.js", "4672:4688");
__$coverInitRange("src/js/utils/selection.js", "4651:4656");
__$coverInitRange("src/js/utils/selection.js", "4839:4854");
__$coverInitRange("src/js/utils/selection.js", "4860:4888");
__$coverInitRange("src/js/utils/selection.js", "4894:4920");
__$coverInitRange("src/js/utils/selection.js", "4926:4966");
__$coverInitRange("src/js/utils/selection.js", "4972:5000");
__$coverInitRange("src/js/utils/selection.js", "5006:5050");
__$coverInitRange("src/js/utils/selection.js", "5056:5069");
__$coverInitRange("src/js/utils/selection.js", "5028:5044");
__$coverInitRange("src/js/utils/selection.js", "5130:5144");
__$coverInitRange("src/js/utils/selection.js", "5150:5202");
__$coverInitRange("src/js/utils/selection.js", "5208:5249");
__$coverInitRange("src/js/utils/selection.js", "5326:5351");
__$coverInitRange("src/js/utils/selection.js", "5357:5391");
__$coverInitRange("src/js/utils/selection.js", "5397:5446");
__$coverInitRange("src/js/utils/selection.js", "5452:5476");
__$coverInitRange("src/js/utils/selection.js", "5482:5501");
__$coverInitRange("src/js/utils/selection.js", "5507:5546");
__$coverInitRange("src/js/utils/selection.js", "5552:5568");
__$coverInitRange("src/js/utils/selection.js", "5574:5594");
__$coverInitRange("src/js/utils/selection.js", "5600:5634");
__$coverInitRange("src/js/utils/selection.js", "5640:5651");
__$coverInitRange("src/js/utils/selection.js", "5535:5540");
__$coverInitRange("src/js/utils/selection.js", "5725:5800");
__$coverInitRange("src/js/utils/selection.js", "5806:5828");
__$coverInitRange("src/js/utils/selection.js", "5752:5794");
__$coverInitRange("src/js/utils/selection.js", "5896:5910");
__$coverInitRange("src/js/utils/selection.js", "5916:5968");
__$coverInitRange("src/js/utils/selection.js", "5974:5997");
__$coverInitRange("src/js/utils/selection.js", "6069:6102");
__$coverCall('src/js/utils/selection.js', '0:13');
var Selection;
__$coverCall('src/js/utils/selection.js', '16:6135');
Selection = function () {
    __$coverCall('src/js/utils/selection.js', '45:328');
    function Selection(document, element) {
        __$coverCall('src/js/utils/selection.js', '89:113');
        this.document = document;
        __$coverCall('src/js/utils/selection.js', '119:141');
        this.element = element;
        __$coverCall('src/js/utils/selection.js', '147:234');
        if (this.document instanceof jQuery) {
            __$coverCall('src/js/utils/selection.js', '192:228');
            this.document = this.document.get(0);
        }
        __$coverCall('src/js/utils/selection.js', '240:324');
        if (this.element instanceof jQuery) {
            __$coverCall('src/js/utils/selection.js', '284:318');
            this.element = this.element.get(0);
        }
    }
    __$coverCall('src/js/utils/selection.js', '333:893');
    Selection.prototype._getCaret = function () {
        __$coverCall('src/js/utils/selection.js', '382:411');
        var caret, clone, e, range, s;
        __$coverCall('src/js/utils/selection.js', '417:850');
        if (this.document.selection != null) {
            __$coverCall('src/js/utils/selection.js', '462:507');
            range = this.document.selection.createRange();
            __$coverCall('src/js/utils/selection.js', '515:540');
            clone = range.duplicate();
            __$coverCall('src/js/utils/selection.js', '548:585');
            clone.moveToElementText(this.element);
            __$coverCall('src/js/utils/selection.js', '593:629');
            clone.setEndPoint('EndToEnd', range);
            __$coverCall('src/js/utils/selection.js', '637:678');
            s = clone.text.length - range.text.length;
            __$coverCall('src/js/utils/selection.js', '686:711');
            e = s + range.text.length;
        } else if (this.element.setSelectionRange != null) {
            __$coverCall('src/js/utils/selection.js', '776:807');
            s = this.element.selectionStart;
            __$coverCall('src/js/utils/selection.js', '815:844');
            e = this.element.selectionEnd;
        }
        __$coverCall('src/js/utils/selection.js', '856:870');
        caret = [
            s,
            e
        ];
        __$coverCall('src/js/utils/selection.js', '876:888');
        return caret;
    };
    __$coverCall('src/js/utils/selection.js', '898:1444');
    Selection.prototype._setCaret = function (start, end) {
        __$coverCall('src/js/utils/selection.js', '957:977');
        var range, scrollTop;
        __$coverCall('src/js/utils/selection.js', '983:1017');
        scrollTop = this.element.scrollTop;
        __$coverCall('src/js/utils/selection.js', '1023:1356');
        if (this.element.setSelectionRange != null) {
            __$coverCall('src/js/utils/selection.js', '1075:1117');
            this.element.setSelectionRange(start, end);
        } else if (this.element.createTextRange) {
            __$coverCall('src/js/utils/selection.js', '1172:1210');
            range = this.element.createTextRange();
            __$coverCall('src/js/utils/selection.js', '1218:1238');
            range.collapse(true);
            __$coverCall('src/js/utils/selection.js', '1246:1281');
            range.moveStart('character', start);
            __$coverCall('src/js/utils/selection.js', '1289:1328');
            range.moveEnd('character', end - start);
            __$coverCall('src/js/utils/selection.js', '1336:1350');
            range.select();
        }
        __$coverCall('src/js/utils/selection.js', '1362:1382');
        this.element.focus();
        __$coverCall('src/js/utils/selection.js', '1388:1422');
        this.element.scrollTop = scrollTop;
        __$coverCall('src/js/utils/selection.js', '1428:1439');
        return this;
    };
    __$coverCall('src/js/utils/selection.js', '1449:1798');
    Selection.prototype.caret = function (start, end) {
        __$coverCall('src/js/utils/selection.js', '1504:1603');
        if (start != null && start instanceof Array) {
            __$coverCall('src/js/utils/selection.js', '1559:1573');
            end = start[1];
            __$coverCall('src/js/utils/selection.js', '1581:1597');
            start = start[0];
        }
        __$coverCall('src/js/utils/selection.js', '1609:1673');
        if (start != null && !(end != null)) {
            __$coverCall('src/js/utils/selection.js', '1656:1667');
            end = start;
        }
        __$coverCall('src/js/utils/selection.js', '1679:1764');
        if (start != null && end != null) {
            __$coverCall('src/js/utils/selection.js', '1725:1758');
            return this._setCaret(start, end);
        }
        __$coverCall('src/js/utils/selection.js', '1770:1793');
        return this._getCaret();
    };
    __$coverCall('src/js/utils/selection.js', '1803:1942');
    Selection.prototype.caretOffset = function (offset) {
        __$coverCall('src/js/utils/selection.js', '1860:1869');
        var caret;
        __$coverCall('src/js/utils/selection.js', '1875:1895');
        caret = this.caret();
        __$coverCall('src/js/utils/selection.js', '1901:1937');
        return this.caret(caret[0] + offset);
    };
    __$coverCall('src/js/utils/selection.js', '1947:2259');
    Selection.prototype.replace = function (str, start, end) {
        __$coverCall('src/js/utils/selection.js', '2009:2028');
        var a, b, scrollTop;
        __$coverCall('src/js/utils/selection.js', '2034:2068');
        scrollTop = this.element.scrollTop;
        __$coverCall('src/js/utils/selection.js', '2074:2116');
        b = this.element.value.substring(0, start);
        __$coverCall('src/js/utils/selection.js', '2122:2159');
        a = this.element.value.substring(end);
        __$coverCall('src/js/utils/selection.js', '2165:2197');
        this.element.value = b + str + a;
        __$coverCall('src/js/utils/selection.js', '2203:2237');
        this.element.scrollTop = scrollTop;
        __$coverCall('src/js/utils/selection.js', '2243:2254');
        return this;
    };
    __$coverCall('src/js/utils/selection.js', '2264:2633');
    Selection.prototype._getText = function () {
        __$coverCall('src/js/utils/selection.js', '2312:2333');
        var e, range, s, _ref;
        __$coverCall('src/js/utils/selection.js', '2339:2611');
        if (this.document.selection != null) {
            __$coverCall('src/js/utils/selection.js', '2384:2429');
            range = this.document.selection.createRange();
            __$coverCall('src/js/utils/selection.js', '2437:2454');
            return range.text;
        } else if (this.element.setSelectionRange) {
            __$coverCall('src/js/utils/selection.js', '2511:2556');
            _ref = this.caret(), s = _ref[0], e = _ref[1];
            __$coverCall('src/js/utils/selection.js', '2564:2605');
            return this.element.value.substring(s, e);
        }
        __$coverCall('src/js/utils/selection.js', '2617:2628');
        return null;
    };
    __$coverCall('src/js/utils/selection.js', '2638:3028');
    Selection.prototype._setText = function (str, keepSelection) {
        __$coverCall('src/js/utils/selection.js', '2704:2729');
        var e, s, scrollTop, _ref;
        __$coverCall('src/js/utils/selection.js', '2735:2769');
        scrollTop = this.element.scrollTop;
        __$coverCall('src/js/utils/selection.js', '2775:2820');
        _ref = this.caret(), s = _ref[0], e = _ref[1];
        __$coverCall('src/js/utils/selection.js', '2826:2849');
        this.replace(str, s, e);
        __$coverCall('src/js/utils/selection.js', '2855:2873');
        e = s + str.length;
        __$coverCall('src/js/utils/selection.js', '2879:2918');
        if (!keepSelection) {
            __$coverCall('src/js/utils/selection.js', '2907:2912');
            s = e;
        }
        __$coverCall('src/js/utils/selection.js', '2924:2940');
        this.caret(s, e);
        __$coverCall('src/js/utils/selection.js', '2946:2966');
        this.element.focus();
        __$coverCall('src/js/utils/selection.js', '2972:3006');
        this.element.scrollTop = scrollTop;
        __$coverCall('src/js/utils/selection.js', '3012:3023');
        return this;
    };
    __$coverCall('src/js/utils/selection.js', '3033:3199');
    Selection.prototype.text = function (str, keepSelection) {
        __$coverCall('src/js/utils/selection.js', '3095:3166');
        if (str != null) {
            __$coverCall('src/js/utils/selection.js', '3120:3160');
            return this._setText(str, keepSelection);
        }
        __$coverCall('src/js/utils/selection.js', '3172:3194');
        return this._getText();
    };
    __$coverCall('src/js/utils/selection.js', '3204:3635');
    Selection.prototype.insertBefore = function (str, keepSelection) {
        __$coverCall('src/js/utils/selection.js', '3274:3305');
        var e, s, scrollTop, text, _ref;
        __$coverCall('src/js/utils/selection.js', '3311:3345');
        scrollTop = this.element.scrollTop;
        __$coverCall('src/js/utils/selection.js', '3351:3396');
        _ref = this.caret(), s = _ref[0], e = _ref[1];
        __$coverCall('src/js/utils/selection.js', '3402:3420');
        text = this.text();
        __$coverCall('src/js/utils/selection.js', '3426:3456');
        this.replace(str + text, s, e);
        __$coverCall('src/js/utils/selection.js', '3462:3480');
        e = s + str.length;
        __$coverCall('src/js/utils/selection.js', '3486:3525');
        if (!keepSelection) {
            __$coverCall('src/js/utils/selection.js', '3514:3519');
            s = e;
        }
        __$coverCall('src/js/utils/selection.js', '3531:3547');
        this.caret(s, e);
        __$coverCall('src/js/utils/selection.js', '3553:3573');
        this.element.focus();
        __$coverCall('src/js/utils/selection.js', '3579:3613');
        this.element.scrollTop = scrollTop;
        __$coverCall('src/js/utils/selection.js', '3619:3630');
        return this;
    };
    __$coverCall('src/js/utils/selection.js', '3640:4081');
    Selection.prototype.insertAfter = function (str, keepSelection) {
        __$coverCall('src/js/utils/selection.js', '3709:3740');
        var e, s, scrollTop, text, _ref;
        __$coverCall('src/js/utils/selection.js', '3746:3780');
        scrollTop = this.element.scrollTop;
        __$coverCall('src/js/utils/selection.js', '3786:3831');
        _ref = this.caret(), s = _ref[0], e = _ref[1];
        __$coverCall('src/js/utils/selection.js', '3837:3855');
        text = this.text();
        __$coverCall('src/js/utils/selection.js', '3861:3891');
        this.replace(text + str, s, e);
        __$coverCall('src/js/utils/selection.js', '3897:3902');
        s = e;
        __$coverCall('src/js/utils/selection.js', '3908:3926');
        e = e + str.length;
        __$coverCall('src/js/utils/selection.js', '3932:3971');
        if (!keepSelection) {
            __$coverCall('src/js/utils/selection.js', '3960:3965');
            s = e;
        }
        __$coverCall('src/js/utils/selection.js', '3977:3993');
        this.caret(s, e);
        __$coverCall('src/js/utils/selection.js', '3999:4019');
        this.element.focus();
        __$coverCall('src/js/utils/selection.js', '4025:4059');
        this.element.scrollTop = scrollTop;
        __$coverCall('src/js/utils/selection.js', '4065:4076');
        return this;
    };
    __$coverCall('src/js/utils/selection.js', '4086:4782');
    Selection.prototype.enclose = function (lhs, rhs, keepSelection) {
        __$coverCall('src/js/utils/selection.js', '4156:4192');
        var e, s, scrollTop, str, text, _ref;
        __$coverCall('src/js/utils/selection.js', '4198:4232');
        scrollTop = this.element.scrollTop;
        __$coverCall('src/js/utils/selection.js', '4238:4256');
        text = this.text();
        __$coverCall('src/js/utils/selection.js', '4262:4694');
        if (text.indexOf(lhs) === 0 && text.lastIndexOf(rhs) === text.length - rhs.length) {
            __$coverCall('src/js/utils/selection.js', '4355:4413');
            str = text.substring(lhs.length, text.length - rhs.length);
            __$coverCall('src/js/utils/selection.js', '4421:4450');
            this.text(str, keepSelection);
        } else {
            __$coverCall('src/js/utils/selection.js', '4471:4516');
            _ref = this.caret(), s = _ref[0], e = _ref[1];
            __$coverCall('src/js/utils/selection.js', '4524:4560');
            this.replace(lhs + text + rhs, s, e);
            __$coverCall('src/js/utils/selection.js', '4568:4613');
            e = s + lhs.length + text.length + rhs.length;
            __$coverCall('src/js/utils/selection.js', '4621:4664');
            if (!keepSelection) {
                __$coverCall('src/js/utils/selection.js', '4651:4656');
                s = e;
            }
            __$coverCall('src/js/utils/selection.js', '4672:4688');
            this.caret(s, e);
        }
        __$coverCall('src/js/utils/selection.js', '4700:4720');
        this.element.focus();
        __$coverCall('src/js/utils/selection.js', '4726:4760');
        this.element.scrollTop = scrollTop;
        __$coverCall('src/js/utils/selection.js', '4766:4777');
        return this;
    };
    __$coverCall('src/js/utils/selection.js', '4787:5074');
    Selection.prototype.lineCaret = function (pos) {
        __$coverCall('src/js/utils/selection.js', '4839:4854');
        var e, s, value;
        __$coverCall('src/js/utils/selection.js', '4860:4888');
        pos = pos || this.caret()[0];
        __$coverCall('src/js/utils/selection.js', '4894:4920');
        value = this.element.value;
        __$coverCall('src/js/utils/selection.js', '4926:4966');
        s = value.lastIndexOf('\n', pos - 1) + 1;
        __$coverCall('src/js/utils/selection.js', '4972:5000');
        e = value.indexOf('\n', pos);
        __$coverCall('src/js/utils/selection.js', '5006:5050');
        if (e === -1) {
            __$coverCall('src/js/utils/selection.js', '5028:5044');
            e = value.length;
        }
        __$coverCall('src/js/utils/selection.js', '5056:5069');
        return [
            s,
            e
        ];
    };
    __$coverCall('src/js/utils/selection.js', '5079:5254');
    Selection.prototype._getLine = function (pos) {
        __$coverCall('src/js/utils/selection.js', '5130:5144');
        var e, s, _ref;
        __$coverCall('src/js/utils/selection.js', '5150:5202');
        _ref = this.lineCaret(pos), s = _ref[0], e = _ref[1];
        __$coverCall('src/js/utils/selection.js', '5208:5249');
        return this.element.value.substring(s, e);
    };
    __$coverCall('src/js/utils/selection.js', '5259:5656');
    Selection.prototype._setLine = function (line, keepSelection) {
        __$coverCall('src/js/utils/selection.js', '5326:5351');
        var e, s, scrollTop, _ref;
        __$coverCall('src/js/utils/selection.js', '5357:5391');
        scrollTop = this.element.scrollTop;
        __$coverCall('src/js/utils/selection.js', '5397:5446');
        _ref = this.lineCaret(), s = _ref[0], e = _ref[1];
        __$coverCall('src/js/utils/selection.js', '5452:5476');
        this.replace(line, s, e);
        __$coverCall('src/js/utils/selection.js', '5482:5501');
        e = s + line.length;
        __$coverCall('src/js/utils/selection.js', '5507:5546');
        if (!keepSelection) {
            __$coverCall('src/js/utils/selection.js', '5535:5540');
            s = e;
        }
        __$coverCall('src/js/utils/selection.js', '5552:5568');
        this.caret(s, e);
        __$coverCall('src/js/utils/selection.js', '5574:5594');
        this.element.focus();
        __$coverCall('src/js/utils/selection.js', '5600:5634');
        this.element.scrollTop = scrollTop;
        __$coverCall('src/js/utils/selection.js', '5640:5651');
        return this;
    };
    __$coverCall('src/js/utils/selection.js', '5661:5833');
    Selection.prototype.line = function (value, keepSelection) {
        __$coverCall('src/js/utils/selection.js', '5725:5800');
        if (value != null) {
            __$coverCall('src/js/utils/selection.js', '5752:5794');
            return this._setLine(value, keepSelection);
        }
        __$coverCall('src/js/utils/selection.js', '5806:5828');
        return this._getLine();
    };
    __$coverCall('src/js/utils/selection.js', '5838:6002');
    Selection.prototype.selectWholeLine = function (pos) {
        __$coverCall('src/js/utils/selection.js', '5896:5910');
        var e, s, _ref;
        __$coverCall('src/js/utils/selection.js', '5916:5968');
        _ref = this.lineCaret(pos), s = _ref[0], e = _ref[1];
        __$coverCall('src/js/utils/selection.js', '5974:5997');
        return this.caret(s, e);
    };
    __$coverCall('src/js/utils/selection.js', '6007:6107');
    Selection.prototype.selectWholeCurrentLine = function () {
        __$coverCall('src/js/utils/selection.js', '6069:6102');
        return this.selectWholeLine(null);
    };
    __$coverCall('src/js/utils/selection.js', '6112:6128');
    return Selection;
}();