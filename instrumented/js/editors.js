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
__$coverInit("src/js/editors.js", "var BaseEditor, TextEditor,\n  __hasProp = {}.hasOwnProperty,\n  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };\n\nBaseEditor = (function(_super) {\n\n  __extends(BaseEditor, _super);\n\n  function BaseEditor(core, selector, context) {\n    if (selector == null) {\n      selector = '<div>';\n    }\n    BaseEditor.__super__.constructor.call(this, core, selector, context);\n    this.element.addClass('editor');\n    this._changeCallbacks = [];\n  }\n\n  BaseEditor.prototype.val = function(value) {\n    throw new Error(\"NotImplementedError\");\n  };\n\n  BaseEditor.prototype.change = function(callback) {\n    var _i, _len, _ref;\n    if (callback != null) {\n      this._changeCallbacks.push(callback);\n      return this;\n    }\n    _ref = this._changeCallbacks;\n    for (_i = 0, _len = _ref.length; _i < _len; _i++) {\n      callback = _ref[_i];\n      callback.call(this, this.val());\n    }\n    return this;\n  };\n\n  BaseEditor.prototype.h1 = null;\n\n  BaseEditor.prototype.h2 = null;\n\n  BaseEditor.prototype.h3 = null;\n\n  BaseEditor.prototype.h4 = null;\n\n  BaseEditor.prototype.h5 = null;\n\n  BaseEditor.prototype.h6 = null;\n\n  BaseEditor.prototype.bold = null;\n\n  BaseEditor.prototype.italic = null;\n\n  BaseEditor.prototype.underline = null;\n\n  BaseEditor.prototype.strike = null;\n\n  BaseEditor.prototype.superscript = null;\n\n  BaseEditor.prototype.subscript = null;\n\n  BaseEditor.prototype.anchor = null;\n\n  BaseEditor.prototype.image = null;\n\n  BaseEditor.prototype.unorderedList = null;\n\n  BaseEditor.prototype.orderedList = null;\n\n  return BaseEditor;\n\n})(Panel);\n\nTextEditor = (function(_super) {\n\n  __extends(TextEditor, _super);\n\n  function TextEditor(core, selector, context) {\n    var _this = this;\n    if (selector == null) {\n      selector = '<div>';\n    }\n    TextEditor.__super__.constructor.call(this, core, selector, context);\n    this.textarea = $('<textarea>').appendTo(this.element).css({\n      'margin': '0',\n      'padding': '0',\n      'border': 'none',\n      'outline': 'none',\n      'resize': 'none'\n    });\n    this.textarea = evolute(this.textarea);\n    this.textarea.on('keydown', function(e) {\n      if (e.which !== 13) {\n        return;\n      }\n      return _this.core.caretaker.save();\n    });\n    if (($.fn.tabby != null) && this.core.options.enableTabIndent) {\n      this.textarea.tabby({\n        'tabString': this.core.options.tabString\n      });\n    }\n    this.textarea = autoIndentable(this.textarea);\n    if (!this.core.options.enableAutoIndent) {\n      this.textarea.autoIndent.disable();\n    }\n    this.textarea.on('keypress keyup click blur', function() {\n      return _this.change();\n    });\n  }\n\n  TextEditor.prototype.val = function(value) {\n    if (value != null) {\n      this.textarea.val(value);\n      this.change();\n      return this;\n    }\n    return this.textarea.val();\n  };\n\n  TextEditor.prototype.focus = function() {\n    this.textarea.focus();\n    return this;\n  };\n\n  TextEditor.prototype.createMemento = function() {\n    return this.val();\n  };\n\n  TextEditor.prototype.setMemento = function(memento) {\n    return this.val(memento);\n  };\n\n  TextEditor.prototype.adjust = function() {\n    this.textarea.outerWidth(this.element.width());\n    this.textarea.outerHeight(this.element.height());\n    return this;\n  };\n\n  TextEditor.prototype.selectWholeLineIfNoSelectionFound = function() {\n    var caret;\n    caret = this.textarea.selection.caret();\n    if (caret[0] === caret[1]) {\n      this.textarea.selection.selectWholeCurrentLine();\n    }\n  };\n\n  TextEditor.prototype.selection = function(str, keepSelection) {\n    if (keepSelection == null) {\n      keepSelection = true;\n    }\n    if (str != null) {\n      this.textarea.selection.text(str, keepSelection);\n      this.core.caretaker.save();\n      return this.change();\n    }\n    return this.textarea.selection.text();\n  };\n\n  TextEditor.prototype.enclose = function(b, a, keepSelection) {\n    if (keepSelection == null) {\n      keepSelection = true;\n    }\n    this.selectWholeLineIfNoSelectionFound();\n    this.textarea.selection.enclose(b, a, keepSelection);\n    this.core.caretaker.save();\n    return this.change();\n  };\n\n  TextEditor.prototype.insertBefore = function(str, keepSelection) {\n    if (keepSelection == null) {\n      keepSelection = true;\n    }\n    this.selectWholeLineIfNoSelectionFound();\n    this.textarea.selection.insertBefore(str, keepSelection);\n    this.core.caretaker.save();\n    return this.change();\n  };\n\n  TextEditor.prototype.insertAfter = function(str, keepSelection) {\n    if (keepSelection == null) {\n      keepSelection = true;\n    }\n    this.selectWholeLineIfNoSelectionFound();\n    this.textarea.selection.insertAfter(str, keepSelection);\n    this.core.caretaker.save();\n    return this.change();\n  };\n\n  return TextEditor;\n\n})(BaseEditor);\n\nnamespace('Jencil.editors', function(exports) {\n  exports.BaseEditor = BaseEditor;\n  return exports.TextEditor = TextEditor;\n});\n");
__$coverInitRange("src/js/editors.js", "0:350");
__$coverInitRange("src/js/editors.js", "353:1785");
__$coverInitRange("src/js/editors.js", "1788:4995");
__$coverInitRange("src/js/editors.js", "4998:5125");
__$coverInitRange("src/js/editors.js", "101:186");
__$coverInitRange("src/js/editors.js", "188:232");
__$coverInitRange("src/js/editors.js", "234:267");
__$coverInitRange("src/js/editors.js", "269:297");
__$coverInitRange("src/js/editors.js", "299:333");
__$coverInitRange("src/js/editors.js", "335:347");
__$coverInitRange("src/js/editors.js", "127:184");
__$coverInitRange("src/js/editors.js", "206:230");
__$coverInitRange("src/js/editors.js", "389:418");
__$coverInitRange("src/js/editors.js", "423:675");
__$coverInitRange("src/js/editors.js", "680:772");
__$coverInitRange("src/js/editors.js", "777:1131");
__$coverInitRange("src/js/editors.js", "1136:1166");
__$coverInitRange("src/js/editors.js", "1171:1201");
__$coverInitRange("src/js/editors.js", "1206:1236");
__$coverInitRange("src/js/editors.js", "1241:1271");
__$coverInitRange("src/js/editors.js", "1276:1306");
__$coverInitRange("src/js/editors.js", "1311:1341");
__$coverInitRange("src/js/editors.js", "1346:1378");
__$coverInitRange("src/js/editors.js", "1383:1417");
__$coverInitRange("src/js/editors.js", "1422:1459");
__$coverInitRange("src/js/editors.js", "1464:1498");
__$coverInitRange("src/js/editors.js", "1503:1542");
__$coverInitRange("src/js/editors.js", "1547:1584");
__$coverInitRange("src/js/editors.js", "1589:1623");
__$coverInitRange("src/js/editors.js", "1628:1661");
__$coverInitRange("src/js/editors.js", "1666:1707");
__$coverInitRange("src/js/editors.js", "1712:1751");
__$coverInitRange("src/js/editors.js", "1756:1773");
__$coverInitRange("src/js/editors.js", "474:528");
__$coverInitRange("src/js/editors.js", "534:602");
__$coverInitRange("src/js/editors.js", "608:639");
__$coverInitRange("src/js/editors.js", "645:671");
__$coverInitRange("src/js/editors.js", "504:522");
__$coverInitRange("src/js/editors.js", "729:767");
__$coverInitRange("src/js/editors.js", "832:850");
__$coverInitRange("src/js/editors.js", "856:947");
__$coverInitRange("src/js/editors.js", "953:981");
__$coverInitRange("src/js/editors.js", "987:1109");
__$coverInitRange("src/js/editors.js", "1115:1126");
__$coverInitRange("src/js/editors.js", "886:922");
__$coverInitRange("src/js/editors.js", "930:941");
__$coverInitRange("src/js/editors.js", "1045:1064");
__$coverInitRange("src/js/editors.js", "1072:1103");
__$coverInitRange("src/js/editors.js", "1824:1853");
__$coverInitRange("src/js/editors.js", "1858:2851");
__$coverInitRange("src/js/editors.js", "2856:3039");
__$coverInitRange("src/js/editors.js", "3044:3133");
__$coverInitRange("src/js/editors.js", "3138:3214");
__$coverInitRange("src/js/editors.js", "3219:3306");
__$coverInitRange("src/js/editors.js", "3311:3480");
__$coverInitRange("src/js/editors.js", "3485:3713");
__$coverInitRange("src/js/editors.js", "3718:4042");
__$coverInitRange("src/js/editors.js", "4047:4342");
__$coverInitRange("src/js/editors.js", "4347:4650");
__$coverInitRange("src/js/editors.js", "4655:4956");
__$coverInitRange("src/js/editors.js", "4961:4978");
__$coverInitRange("src/js/editors.js", "1909:1925");
__$coverInitRange("src/js/editors.js", "1931:1985");
__$coverInitRange("src/js/editors.js", "1991:2059");
__$coverInitRange("src/js/editors.js", "2065:2247");
__$coverInitRange("src/js/editors.js", "2253:2291");
__$coverInitRange("src/js/editors.js", "2297:2439");
__$coverInitRange("src/js/editors.js", "2445:2601");
__$coverInitRange("src/js/editors.js", "2607:2652");
__$coverInitRange("src/js/editors.js", "2658:2747");
__$coverInitRange("src/js/editors.js", "2753:2847");
__$coverInitRange("src/js/editors.js", "1961:1979");
__$coverInitRange("src/js/editors.js", "2345:2389");
__$coverInitRange("src/js/editors.js", "2397:2431");
__$coverInitRange("src/js/editors.js", "2375:2381");
__$coverInitRange("src/js/editors.js", "2516:2595");
__$coverInitRange("src/js/editors.js", "2707:2741");
__$coverInitRange("src/js/editors.js", "2818:2839");
__$coverInitRange("src/js/editors.js", "2905:3002");
__$coverInitRange("src/js/editors.js", "3008:3034");
__$coverInitRange("src/js/editors.js", "2932:2956");
__$coverInitRange("src/js/editors.js", "2964:2977");
__$coverInitRange("src/js/editors.js", "2985:2996");
__$coverInitRange("src/js/editors.js", "3090:3111");
__$coverInitRange("src/js/editors.js", "3117:3128");
__$coverInitRange("src/js/editors.js", "3192:3209");
__$coverInitRange("src/js/editors.js", "3277:3301");
__$coverInitRange("src/js/editors.js", "3358:3404");
__$coverInitRange("src/js/editors.js", "3410:3458");
__$coverInitRange("src/js/editors.js", "3464:3475");
__$coverInitRange("src/js/editors.js", "3559:3568");
__$coverInitRange("src/js/editors.js", "3574:3613");
__$coverInitRange("src/js/editors.js", "3619:3708");
__$coverInitRange("src/js/editors.js", "3654:3702");
__$coverInitRange("src/js/editors.js", "3786:3847");
__$coverInitRange("src/js/editors.js", "3853:3994");
__$coverInitRange("src/js/editors.js", "4000:4037");
__$coverInitRange("src/js/editors.js", "3821:3841");
__$coverInitRange("src/js/editors.js", "3878:3926");
__$coverInitRange("src/js/editors.js", "3934:3960");
__$coverInitRange("src/js/editors.js", "3968:3988");
__$coverInitRange("src/js/editors.js", "4114:4175");
__$coverInitRange("src/js/editors.js", "4181:4221");
__$coverInitRange("src/js/editors.js", "4227:4279");
__$coverInitRange("src/js/editors.js", "4285:4311");
__$coverInitRange("src/js/editors.js", "4317:4337");
__$coverInitRange("src/js/editors.js", "4149:4169");
__$coverInitRange("src/js/editors.js", "4418:4479");
__$coverInitRange("src/js/editors.js", "4485:4525");
__$coverInitRange("src/js/editors.js", "4531:4587");
__$coverInitRange("src/js/editors.js", "4593:4619");
__$coverInitRange("src/js/editors.js", "4625:4645");
__$coverInitRange("src/js/editors.js", "4453:4473");
__$coverInitRange("src/js/editors.js", "4725:4786");
__$coverInitRange("src/js/editors.js", "4792:4832");
__$coverInitRange("src/js/editors.js", "4838:4893");
__$coverInitRange("src/js/editors.js", "4899:4925");
__$coverInitRange("src/js/editors.js", "4931:4951");
__$coverInitRange("src/js/editors.js", "4760:4780");
__$coverInitRange("src/js/editors.js", "5048:5079");
__$coverInitRange("src/js/editors.js", "5083:5121");
__$coverCall('src/js/editors.js', '0:350');
var BaseEditor, TextEditor, __hasProp = {}.hasOwnProperty, __extends = function (child, parent) {
        __$coverCall('src/js/editors.js', '101:186');
        for (var key in parent) {
            __$coverCall('src/js/editors.js', '127:184');
            if (__hasProp.call(parent, key))
                child[key] = parent[key];
        }
        __$coverCall('src/js/editors.js', '188:232');
        function ctor() {
            __$coverCall('src/js/editors.js', '206:230');
            this.constructor = child;
        }
        __$coverCall('src/js/editors.js', '234:267');
        ctor.prototype = parent.prototype;
        __$coverCall('src/js/editors.js', '269:297');
        child.prototype = new ctor();
        __$coverCall('src/js/editors.js', '299:333');
        child.__super__ = parent.prototype;
        __$coverCall('src/js/editors.js', '335:347');
        return child;
    };
__$coverCall('src/js/editors.js', '353:1785');
BaseEditor = function (_super) {
    __$coverCall('src/js/editors.js', '389:418');
    __extends(BaseEditor, _super);
    __$coverCall('src/js/editors.js', '423:675');
    function BaseEditor(core, selector, context) {
        __$coverCall('src/js/editors.js', '474:528');
        if (selector == null) {
            __$coverCall('src/js/editors.js', '504:522');
            selector = '<div>';
        }
        __$coverCall('src/js/editors.js', '534:602');
        BaseEditor.__super__.constructor.call(this, core, selector, context);
        __$coverCall('src/js/editors.js', '608:639');
        this.element.addClass('editor');
        __$coverCall('src/js/editors.js', '645:671');
        this._changeCallbacks = [];
    }
    __$coverCall('src/js/editors.js', '680:772');
    BaseEditor.prototype.val = function (value) {
        __$coverCall('src/js/editors.js', '729:767');
        throw new Error('NotImplementedError');
    };
    __$coverCall('src/js/editors.js', '777:1131');
    BaseEditor.prototype.change = function (callback) {
        __$coverCall('src/js/editors.js', '832:850');
        var _i, _len, _ref;
        __$coverCall('src/js/editors.js', '856:947');
        if (callback != null) {
            __$coverCall('src/js/editors.js', '886:922');
            this._changeCallbacks.push(callback);
            __$coverCall('src/js/editors.js', '930:941');
            return this;
        }
        __$coverCall('src/js/editors.js', '953:981');
        _ref = this._changeCallbacks;
        __$coverCall('src/js/editors.js', '987:1109');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            __$coverCall('src/js/editors.js', '1045:1064');
            callback = _ref[_i];
            __$coverCall('src/js/editors.js', '1072:1103');
            callback.call(this, this.val());
        }
        __$coverCall('src/js/editors.js', '1115:1126');
        return this;
    };
    __$coverCall('src/js/editors.js', '1136:1166');
    BaseEditor.prototype.h1 = null;
    __$coverCall('src/js/editors.js', '1171:1201');
    BaseEditor.prototype.h2 = null;
    __$coverCall('src/js/editors.js', '1206:1236');
    BaseEditor.prototype.h3 = null;
    __$coverCall('src/js/editors.js', '1241:1271');
    BaseEditor.prototype.h4 = null;
    __$coverCall('src/js/editors.js', '1276:1306');
    BaseEditor.prototype.h5 = null;
    __$coverCall('src/js/editors.js', '1311:1341');
    BaseEditor.prototype.h6 = null;
    __$coverCall('src/js/editors.js', '1346:1378');
    BaseEditor.prototype.bold = null;
    __$coverCall('src/js/editors.js', '1383:1417');
    BaseEditor.prototype.italic = null;
    __$coverCall('src/js/editors.js', '1422:1459');
    BaseEditor.prototype.underline = null;
    __$coverCall('src/js/editors.js', '1464:1498');
    BaseEditor.prototype.strike = null;
    __$coverCall('src/js/editors.js', '1503:1542');
    BaseEditor.prototype.superscript = null;
    __$coverCall('src/js/editors.js', '1547:1584');
    BaseEditor.prototype.subscript = null;
    __$coverCall('src/js/editors.js', '1589:1623');
    BaseEditor.prototype.anchor = null;
    __$coverCall('src/js/editors.js', '1628:1661');
    BaseEditor.prototype.image = null;
    __$coverCall('src/js/editors.js', '1666:1707');
    BaseEditor.prototype.unorderedList = null;
    __$coverCall('src/js/editors.js', '1712:1751');
    BaseEditor.prototype.orderedList = null;
    __$coverCall('src/js/editors.js', '1756:1773');
    return BaseEditor;
}(Panel);
__$coverCall('src/js/editors.js', '1788:4995');
TextEditor = function (_super) {
    __$coverCall('src/js/editors.js', '1824:1853');
    __extends(TextEditor, _super);
    __$coverCall('src/js/editors.js', '1858:2851');
    function TextEditor(core, selector, context) {
        __$coverCall('src/js/editors.js', '1909:1925');
        var _this = this;
        __$coverCall('src/js/editors.js', '1931:1985');
        if (selector == null) {
            __$coverCall('src/js/editors.js', '1961:1979');
            selector = '<div>';
        }
        __$coverCall('src/js/editors.js', '1991:2059');
        TextEditor.__super__.constructor.call(this, core, selector, context);
        __$coverCall('src/js/editors.js', '2065:2247');
        this.textarea = $('<textarea>').appendTo(this.element).css({
            'margin': '0',
            'padding': '0',
            'border': 'none',
            'outline': 'none',
            'resize': 'none'
        });
        __$coverCall('src/js/editors.js', '2253:2291');
        this.textarea = evolute(this.textarea);
        __$coverCall('src/js/editors.js', '2297:2439');
        this.textarea.on('keydown', function (e) {
            __$coverCall('src/js/editors.js', '2345:2389');
            if (e.which !== 13) {
                __$coverCall('src/js/editors.js', '2375:2381');
                return;
            }
            __$coverCall('src/js/editors.js', '2397:2431');
            return _this.core.caretaker.save();
        });
        __$coverCall('src/js/editors.js', '2445:2601');
        if ($.fn.tabby != null && this.core.options.enableTabIndent) {
            __$coverCall('src/js/editors.js', '2516:2595');
            this.textarea.tabby({ 'tabString': this.core.options.tabString });
        }
        __$coverCall('src/js/editors.js', '2607:2652');
        this.textarea = autoIndentable(this.textarea);
        __$coverCall('src/js/editors.js', '2658:2747');
        if (!this.core.options.enableAutoIndent) {
            __$coverCall('src/js/editors.js', '2707:2741');
            this.textarea.autoIndent.disable();
        }
        __$coverCall('src/js/editors.js', '2753:2847');
        this.textarea.on('keypress keyup click blur', function () {
            __$coverCall('src/js/editors.js', '2818:2839');
            return _this.change();
        });
    }
    __$coverCall('src/js/editors.js', '2856:3039');
    TextEditor.prototype.val = function (value) {
        __$coverCall('src/js/editors.js', '2905:3002');
        if (value != null) {
            __$coverCall('src/js/editors.js', '2932:2956');
            this.textarea.val(value);
            __$coverCall('src/js/editors.js', '2964:2977');
            this.change();
            __$coverCall('src/js/editors.js', '2985:2996');
            return this;
        }
        __$coverCall('src/js/editors.js', '3008:3034');
        return this.textarea.val();
    };
    __$coverCall('src/js/editors.js', '3044:3133');
    TextEditor.prototype.focus = function () {
        __$coverCall('src/js/editors.js', '3090:3111');
        this.textarea.focus();
        __$coverCall('src/js/editors.js', '3117:3128');
        return this;
    };
    __$coverCall('src/js/editors.js', '3138:3214');
    TextEditor.prototype.createMemento = function () {
        __$coverCall('src/js/editors.js', '3192:3209');
        return this.val();
    };
    __$coverCall('src/js/editors.js', '3219:3306');
    TextEditor.prototype.setMemento = function (memento) {
        __$coverCall('src/js/editors.js', '3277:3301');
        return this.val(memento);
    };
    __$coverCall('src/js/editors.js', '3311:3480');
    TextEditor.prototype.adjust = function () {
        __$coverCall('src/js/editors.js', '3358:3404');
        this.textarea.outerWidth(this.element.width());
        __$coverCall('src/js/editors.js', '3410:3458');
        this.textarea.outerHeight(this.element.height());
        __$coverCall('src/js/editors.js', '3464:3475');
        return this;
    };
    __$coverCall('src/js/editors.js', '3485:3713');
    TextEditor.prototype.selectWholeLineIfNoSelectionFound = function () {
        __$coverCall('src/js/editors.js', '3559:3568');
        var caret;
        __$coverCall('src/js/editors.js', '3574:3613');
        caret = this.textarea.selection.caret();
        __$coverCall('src/js/editors.js', '3619:3708');
        if (caret[0] === caret[1]) {
            __$coverCall('src/js/editors.js', '3654:3702');
            this.textarea.selection.selectWholeCurrentLine();
        }
    };
    __$coverCall('src/js/editors.js', '3718:4042');
    TextEditor.prototype.selection = function (str, keepSelection) {
        __$coverCall('src/js/editors.js', '3786:3847');
        if (keepSelection == null) {
            __$coverCall('src/js/editors.js', '3821:3841');
            keepSelection = true;
        }
        __$coverCall('src/js/editors.js', '3853:3994');
        if (str != null) {
            __$coverCall('src/js/editors.js', '3878:3926');
            this.textarea.selection.text(str, keepSelection);
            __$coverCall('src/js/editors.js', '3934:3960');
            this.core.caretaker.save();
            __$coverCall('src/js/editors.js', '3968:3988');
            return this.change();
        }
        __$coverCall('src/js/editors.js', '4000:4037');
        return this.textarea.selection.text();
    };
    __$coverCall('src/js/editors.js', '4047:4342');
    TextEditor.prototype.enclose = function (b, a, keepSelection) {
        __$coverCall('src/js/editors.js', '4114:4175');
        if (keepSelection == null) {
            __$coverCall('src/js/editors.js', '4149:4169');
            keepSelection = true;
        }
        __$coverCall('src/js/editors.js', '4181:4221');
        this.selectWholeLineIfNoSelectionFound();
        __$coverCall('src/js/editors.js', '4227:4279');
        this.textarea.selection.enclose(b, a, keepSelection);
        __$coverCall('src/js/editors.js', '4285:4311');
        this.core.caretaker.save();
        __$coverCall('src/js/editors.js', '4317:4337');
        return this.change();
    };
    __$coverCall('src/js/editors.js', '4347:4650');
    TextEditor.prototype.insertBefore = function (str, keepSelection) {
        __$coverCall('src/js/editors.js', '4418:4479');
        if (keepSelection == null) {
            __$coverCall('src/js/editors.js', '4453:4473');
            keepSelection = true;
        }
        __$coverCall('src/js/editors.js', '4485:4525');
        this.selectWholeLineIfNoSelectionFound();
        __$coverCall('src/js/editors.js', '4531:4587');
        this.textarea.selection.insertBefore(str, keepSelection);
        __$coverCall('src/js/editors.js', '4593:4619');
        this.core.caretaker.save();
        __$coverCall('src/js/editors.js', '4625:4645');
        return this.change();
    };
    __$coverCall('src/js/editors.js', '4655:4956');
    TextEditor.prototype.insertAfter = function (str, keepSelection) {
        __$coverCall('src/js/editors.js', '4725:4786');
        if (keepSelection == null) {
            __$coverCall('src/js/editors.js', '4760:4780');
            keepSelection = true;
        }
        __$coverCall('src/js/editors.js', '4792:4832');
        this.selectWholeLineIfNoSelectionFound();
        __$coverCall('src/js/editors.js', '4838:4893');
        this.textarea.selection.insertAfter(str, keepSelection);
        __$coverCall('src/js/editors.js', '4899:4925');
        this.core.caretaker.save();
        __$coverCall('src/js/editors.js', '4931:4951');
        return this.change();
    };
    __$coverCall('src/js/editors.js', '4961:4978');
    return TextEditor;
}(BaseEditor);
__$coverCall('src/js/editors.js', '4998:5125');
namespace('Jencil.editors', function (exports) {
    __$coverCall('src/js/editors.js', '5048:5079');
    exports.BaseEditor = BaseEditor;
    __$coverCall('src/js/editors.js', '5083:5121');
    return exports.TextEditor = TextEditor;
});