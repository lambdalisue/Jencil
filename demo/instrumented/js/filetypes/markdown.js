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
__$coverInit("js/filetypes/markdown.js", "var GithubFlavorMarkdownViewer, MarkdownEditor, MarkdownHelper, MarkdownProfile, MarkdownViewer,\n  __hasProp = {}.hasOwnProperty,\n  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };\n\nMarkdownViewer = (function(_super) {\n\n  __extends(MarkdownViewer, _super);\n\n  function MarkdownViewer(core) {\n    var config;\n    config = {\n      type: 'POST',\n      dataType: 'text',\n      data: function(value) {\n        return {\n          text: value,\n          mode: 'markdown'\n        };\n      },\n      url: 'https://api.github.com/markdown'\n    };\n    MarkdownViewer.__super__.constructor.call(this, core, config);\n  }\n\n  return MarkdownViewer;\n\n})(AjaxViewer);\n\nGithubFlavorMarkdownViewer = (function(_super) {\n\n  __extends(GithubFlavorMarkdownViewer, _super);\n\n  function GithubFlavorMarkdownViewer(core) {\n    var config;\n    config = {\n      type: 'POST',\n      dataType: 'text',\n      data: function(value) {\n        return {\n          text: value,\n          mode: 'gfm'\n        };\n      },\n      url: 'https://api.github.com/markdown'\n    };\n    GithubFlavorMarkdownViewer.__super__.constructor.call(this, core, config);\n  }\n\n  return GithubFlavorMarkdownViewer;\n\n})(AjaxViewer);\n\nMarkdownEditor = (function(_super) {\n\n  __extends(MarkdownEditor, _super);\n\n  function MarkdownEditor() {\n    return MarkdownEditor.__super__.constructor.apply(this, arguments);\n  }\n\n  MarkdownEditor.prototype.h1 = function() {\n    return this.insertBefore(\"# \");\n  };\n\n  MarkdownEditor.prototype.h2 = function() {\n    return this.insertBefore(\"## \");\n  };\n\n  MarkdownEditor.prototype.h3 = function() {\n    return this.insertBefore(\"### \");\n  };\n\n  MarkdownEditor.prototype.h4 = function() {\n    return this.insertBefore(\"#### \");\n  };\n\n  MarkdownEditor.prototype.h5 = function() {\n    return this.insertBefore(\"##### \");\n  };\n\n  MarkdownEditor.prototype.h6 = function() {\n    return this.insertBefore(\"###### \");\n  };\n\n  MarkdownEditor.prototype.bold = function() {\n    return this.enclose(\"**\", \"**\");\n  };\n\n  MarkdownEditor.prototype.italic = function() {\n    return this.enclose(\"*\", \"*\");\n  };\n\n  MarkdownEditor.prototype.anchor = function() {\n    var href, text;\n    text = this.selection();\n    if (!text) {\n      text = window.prompt(\"Please input a link text\", \"Here\");\n    }\n    href = window.prompt(\"Please input a link url\", \"http://\");\n    return this.selection(\"[\" + text + \"](\" + href + \")\");\n  };\n\n  MarkdownEditor.prototype.image = function() {\n    var alt, src;\n    src = window.prompt(\"Please input a image url\", \"http://\");\n    alt = window.prompt(\"(Optional) Please input a alt message\", \"Image\");\n    return this.selection(\"![\" + alt + \"](\" + src + \")\");\n  };\n\n  MarkdownEditor.prototype.unorderedList = function() {\n    var text, x;\n    text = this.selection();\n    text = (function() {\n      var _i, _len, _ref, _results;\n      _ref = text.split(\"\\n\");\n      _results = [];\n      for (_i = 0, _len = _ref.length; _i < _len; _i++) {\n        x = _ref[_i];\n        _results.push(\"-   \" + x);\n      }\n      return _results;\n    })();\n    text.unshift(\"\");\n    text.push(\"\");\n    return this.selection(text.join(\"\\n\"));\n  };\n\n  MarkdownEditor.prototype.orderedList = function() {\n    var i, text, x;\n    text = this.selection();\n    text = (function() {\n      var _i, _len, _ref, _results;\n      _ref = text.split(\"\\n\");\n      _results = [];\n      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {\n        x = _ref[i];\n        _results.push(\"\" + i + \". \" + x);\n      }\n      return _results;\n    })();\n    text.unshift(\"\");\n    text.push(\"\");\n    return this.selection(text.join(\"\\n\"));\n  };\n\n  return MarkdownEditor;\n\n})(HtmlEditor);\n\nMarkdownHelper = (function(_super) {\n\n  __extends(MarkdownHelper, _super);\n\n  function MarkdownHelper(core) {\n    MarkdownHelper.__super__.constructor.call(this, core);\n    this.element.addClass('helper');\n  }\n\n  return MarkdownHelper;\n\n})(Jencil.ui.widgets.panels.Panel);\n\nMarkdownProfile = (function(_super) {\n\n  __extends(MarkdownProfile, _super);\n\n  function MarkdownProfile() {\n    this.mainPanelClass = Jencil.ui.widgets.panels.TrimainPanel;\n    this.editorClass = MarkdownEditor;\n    this.viewerClass = MarkdownViewer;\n    this.helperClass = MarkdownHelper;\n    this.defaultVolume = 1;\n    this.defaultVolume2 = 1;\n    this.toolbarButtons = ['Undo', 'Redo', 'Separator', ['h1', 'H1'], ['h2', 'H2'], ['h3', 'H3'], ['h4', 'H4'], ['h5', 'H5'], ['h6', 'H6'], 'Separator', ['bold', 'Bold', 'Ctrl+B'], ['italic', 'Italic', 'Ctrl+I'], 'Separator', ['anchor', 'Anchor link'], ['image', 'Image'], ['unorderedList', 'Unordered list'], ['orderedList', 'Ordered list'], 'Separator', 'Fullscreen'];\n    this.statusbarButtons = ['Viewer', 'Helper'];\n  }\n\n  return MarkdownProfile;\n\n})(Jencil.profiles.Profile);\n\nJencil.utils.namespace('Jencil.filetypes.markdown', function(exports) {\n  exports.MarkdownEditor = MarkdownEditor;\n  exports.MarkdownViewer = MarkdownViewer;\n  return exports.MarkdownProfile = MarkdownProfile;\n});\n");
__$coverInitRange("js/filetypes/markdown.js", "0:419");
__$coverInitRange("js/filetypes/markdown.js", "422:888");
__$coverInitRange("js/filetypes/markdown.js", "891:1412");
__$coverInitRange("js/filetypes/markdown.js", "1415:3877");
__$coverInitRange("js/filetypes/markdown.js", "3880:4151");
__$coverInitRange("js/filetypes/markdown.js", "4154:4982");
__$coverInitRange("js/filetypes/markdown.js", "4985:5197");
__$coverInitRange("js/filetypes/markdown.js", "170:255");
__$coverInitRange("js/filetypes/markdown.js", "257:301");
__$coverInitRange("js/filetypes/markdown.js", "303:336");
__$coverInitRange("js/filetypes/markdown.js", "338:366");
__$coverInitRange("js/filetypes/markdown.js", "368:402");
__$coverInitRange("js/filetypes/markdown.js", "404:416");
__$coverInitRange("js/filetypes/markdown.js", "196:253");
__$coverInitRange("js/filetypes/markdown.js", "275:299");
__$coverInitRange("js/filetypes/markdown.js", "462:495");
__$coverInitRange("js/filetypes/markdown.js", "500:845");
__$coverInitRange("js/filetypes/markdown.js", "850:871");
__$coverInitRange("js/filetypes/markdown.js", "536:546");
__$coverInitRange("js/filetypes/markdown.js", "552:774");
__$coverInitRange("js/filetypes/markdown.js", "780:841");
__$coverInitRange("js/filetypes/markdown.js", "645:713");
__$coverInitRange("js/filetypes/markdown.js", "943:988");
__$coverInitRange("js/filetypes/markdown.js", "993:1357");
__$coverInitRange("js/filetypes/markdown.js", "1362:1395");
__$coverInitRange("js/filetypes/markdown.js", "1041:1051");
__$coverInitRange("js/filetypes/markdown.js", "1057:1274");
__$coverInitRange("js/filetypes/markdown.js", "1280:1353");
__$coverInitRange("js/filetypes/markdown.js", "1150:1213");
__$coverInitRange("js/filetypes/markdown.js", "1455:1488");
__$coverInitRange("js/filetypes/markdown.js", "1493:1595");
__$coverInitRange("js/filetypes/markdown.js", "1600:1682");
__$coverInitRange("js/filetypes/markdown.js", "1687:1770");
__$coverInitRange("js/filetypes/markdown.js", "1775:1859");
__$coverInitRange("js/filetypes/markdown.js", "1864:1949");
__$coverInitRange("js/filetypes/markdown.js", "1954:2040");
__$coverInitRange("js/filetypes/markdown.js", "2045:2132");
__$coverInitRange("js/filetypes/markdown.js", "2137:2222");
__$coverInitRange("js/filetypes/markdown.js", "2227:2312");
__$coverInitRange("js/filetypes/markdown.js", "2317:2626");
__$coverInitRange("js/filetypes/markdown.js", "2631:2895");
__$coverInitRange("js/filetypes/markdown.js", "2900:3357");
__$coverInitRange("js/filetypes/markdown.js", "3362:3834");
__$coverInitRange("js/filetypes/markdown.js", "3839:3860");
__$coverInitRange("js/filetypes/markdown.js", "1525:1591");
__$coverInitRange("js/filetypes/markdown.js", "1647:1677");
__$coverInitRange("js/filetypes/markdown.js", "1734:1765");
__$coverInitRange("js/filetypes/markdown.js", "1822:1854");
__$coverInitRange("js/filetypes/markdown.js", "1911:1944");
__$coverInitRange("js/filetypes/markdown.js", "2001:2035");
__$coverInitRange("js/filetypes/markdown.js", "2092:2127");
__$coverInitRange("js/filetypes/markdown.js", "2186:2217");
__$coverInitRange("js/filetypes/markdown.js", "2278:2307");
__$coverInitRange("js/filetypes/markdown.js", "2368:2382");
__$coverInitRange("js/filetypes/markdown.js", "2388:2411");
__$coverInitRange("js/filetypes/markdown.js", "2417:2498");
__$coverInitRange("js/filetypes/markdown.js", "2504:2562");
__$coverInitRange("js/filetypes/markdown.js", "2568:2621");
__$coverInitRange("js/filetypes/markdown.js", "2436:2492");
__$coverInitRange("js/filetypes/markdown.js", "2681:2693");
__$coverInitRange("js/filetypes/markdown.js", "2699:2757");
__$coverInitRange("js/filetypes/markdown.js", "2763:2832");
__$coverInitRange("js/filetypes/markdown.js", "2838:2890");
__$coverInitRange("js/filetypes/markdown.js", "2958:2969");
__$coverInitRange("js/filetypes/markdown.js", "2975:2998");
__$coverInitRange("js/filetypes/markdown.js", "3004:3267");
__$coverInitRange("js/filetypes/markdown.js", "3273:3289");
__$coverInitRange("js/filetypes/markdown.js", "3295:3308");
__$coverInitRange("js/filetypes/markdown.js", "3314:3352");
__$coverInitRange("js/filetypes/markdown.js", "3031:3059");
__$coverInitRange("js/filetypes/markdown.js", "3067:3090");
__$coverInitRange("js/filetypes/markdown.js", "3098:3111");
__$coverInitRange("js/filetypes/markdown.js", "3119:3234");
__$coverInitRange("js/filetypes/markdown.js", "3242:3257");
__$coverInitRange("js/filetypes/markdown.js", "3179:3191");
__$coverInitRange("js/filetypes/markdown.js", "3201:3226");
__$coverInitRange("js/filetypes/markdown.js", "3418:3432");
__$coverInitRange("js/filetypes/markdown.js", "3438:3461");
__$coverInitRange("js/filetypes/markdown.js", "3467:3744");
__$coverInitRange("js/filetypes/markdown.js", "3750:3766");
__$coverInitRange("js/filetypes/markdown.js", "3772:3785");
__$coverInitRange("js/filetypes/markdown.js", "3791:3829");
__$coverInitRange("js/filetypes/markdown.js", "3494:3522");
__$coverInitRange("js/filetypes/markdown.js", "3530:3553");
__$coverInitRange("js/filetypes/markdown.js", "3561:3574");
__$coverInitRange("js/filetypes/markdown.js", "3582:3711");
__$coverInitRange("js/filetypes/markdown.js", "3719:3734");
__$coverInitRange("js/filetypes/markdown.js", "3650:3661");
__$coverInitRange("js/filetypes/markdown.js", "3671:3703");
__$coverInitRange("js/filetypes/markdown.js", "3920:3953");
__$coverInitRange("js/filetypes/markdown.js", "3958:4088");
__$coverInitRange("js/filetypes/markdown.js", "4093:4114");
__$coverInitRange("js/filetypes/markdown.js", "3994:4047");
__$coverInitRange("js/filetypes/markdown.js", "4053:4084");
__$coverInitRange("js/filetypes/markdown.js", "4195:4229");
__$coverInitRange("js/filetypes/markdown.js", "4234:4925");
__$coverInitRange("js/filetypes/markdown.js", "4930:4952");
__$coverInitRange("js/filetypes/markdown.js", "4267:4326");
__$coverInitRange("js/filetypes/markdown.js", "4332:4365");
__$coverInitRange("js/filetypes/markdown.js", "4371:4404");
__$coverInitRange("js/filetypes/markdown.js", "4410:4443");
__$coverInitRange("js/filetypes/markdown.js", "4449:4471");
__$coverInitRange("js/filetypes/markdown.js", "4477:4500");
__$coverInitRange("js/filetypes/markdown.js", "4506:4871");
__$coverInitRange("js/filetypes/markdown.js", "4877:4921");
__$coverInitRange("js/filetypes/markdown.js", "5059:5098");
__$coverInitRange("js/filetypes/markdown.js", "5102:5141");
__$coverInitRange("js/filetypes/markdown.js", "5145:5193");
__$coverCall('js/filetypes/markdown.js', '0:419');
var GithubFlavorMarkdownViewer, MarkdownEditor, MarkdownHelper, MarkdownProfile, MarkdownViewer, __hasProp = {}.hasOwnProperty, __extends = function (child, parent) {
        __$coverCall('js/filetypes/markdown.js', '170:255');
        for (var key in parent) {
            __$coverCall('js/filetypes/markdown.js', '196:253');
            if (__hasProp.call(parent, key))
                child[key] = parent[key];
        }
        __$coverCall('js/filetypes/markdown.js', '257:301');
        function ctor() {
            __$coverCall('js/filetypes/markdown.js', '275:299');
            this.constructor = child;
        }
        __$coverCall('js/filetypes/markdown.js', '303:336');
        ctor.prototype = parent.prototype;
        __$coverCall('js/filetypes/markdown.js', '338:366');
        child.prototype = new ctor();
        __$coverCall('js/filetypes/markdown.js', '368:402');
        child.__super__ = parent.prototype;
        __$coverCall('js/filetypes/markdown.js', '404:416');
        return child;
    };
__$coverCall('js/filetypes/markdown.js', '422:888');
MarkdownViewer = function (_super) {
    __$coverCall('js/filetypes/markdown.js', '462:495');
    __extends(MarkdownViewer, _super);
    __$coverCall('js/filetypes/markdown.js', '500:845');
    function MarkdownViewer(core) {
        __$coverCall('js/filetypes/markdown.js', '536:546');
        var config;
        __$coverCall('js/filetypes/markdown.js', '552:774');
        config = {
            type: 'POST',
            dataType: 'text',
            data: function (value) {
                __$coverCall('js/filetypes/markdown.js', '645:713');
                return {
                    text: value,
                    mode: 'markdown'
                };
            },
            url: 'https://api.github.com/markdown'
        };
        __$coverCall('js/filetypes/markdown.js', '780:841');
        MarkdownViewer.__super__.constructor.call(this, core, config);
    }
    __$coverCall('js/filetypes/markdown.js', '850:871');
    return MarkdownViewer;
}(AjaxViewer);
__$coverCall('js/filetypes/markdown.js', '891:1412');
GithubFlavorMarkdownViewer = function (_super) {
    __$coverCall('js/filetypes/markdown.js', '943:988');
    __extends(GithubFlavorMarkdownViewer, _super);
    __$coverCall('js/filetypes/markdown.js', '993:1357');
    function GithubFlavorMarkdownViewer(core) {
        __$coverCall('js/filetypes/markdown.js', '1041:1051');
        var config;
        __$coverCall('js/filetypes/markdown.js', '1057:1274');
        config = {
            type: 'POST',
            dataType: 'text',
            data: function (value) {
                __$coverCall('js/filetypes/markdown.js', '1150:1213');
                return {
                    text: value,
                    mode: 'gfm'
                };
            },
            url: 'https://api.github.com/markdown'
        };
        __$coverCall('js/filetypes/markdown.js', '1280:1353');
        GithubFlavorMarkdownViewer.__super__.constructor.call(this, core, config);
    }
    __$coverCall('js/filetypes/markdown.js', '1362:1395');
    return GithubFlavorMarkdownViewer;
}(AjaxViewer);
__$coverCall('js/filetypes/markdown.js', '1415:3877');
MarkdownEditor = function (_super) {
    __$coverCall('js/filetypes/markdown.js', '1455:1488');
    __extends(MarkdownEditor, _super);
    __$coverCall('js/filetypes/markdown.js', '1493:1595');
    function MarkdownEditor() {
        __$coverCall('js/filetypes/markdown.js', '1525:1591');
        return MarkdownEditor.__super__.constructor.apply(this, arguments);
    }
    __$coverCall('js/filetypes/markdown.js', '1600:1682');
    MarkdownEditor.prototype.h1 = function () {
        __$coverCall('js/filetypes/markdown.js', '1647:1677');
        return this.insertBefore('# ');
    };
    __$coverCall('js/filetypes/markdown.js', '1687:1770');
    MarkdownEditor.prototype.h2 = function () {
        __$coverCall('js/filetypes/markdown.js', '1734:1765');
        return this.insertBefore('## ');
    };
    __$coverCall('js/filetypes/markdown.js', '1775:1859');
    MarkdownEditor.prototype.h3 = function () {
        __$coverCall('js/filetypes/markdown.js', '1822:1854');
        return this.insertBefore('### ');
    };
    __$coverCall('js/filetypes/markdown.js', '1864:1949');
    MarkdownEditor.prototype.h4 = function () {
        __$coverCall('js/filetypes/markdown.js', '1911:1944');
        return this.insertBefore('#### ');
    };
    __$coverCall('js/filetypes/markdown.js', '1954:2040');
    MarkdownEditor.prototype.h5 = function () {
        __$coverCall('js/filetypes/markdown.js', '2001:2035');
        return this.insertBefore('##### ');
    };
    __$coverCall('js/filetypes/markdown.js', '2045:2132');
    MarkdownEditor.prototype.h6 = function () {
        __$coverCall('js/filetypes/markdown.js', '2092:2127');
        return this.insertBefore('###### ');
    };
    __$coverCall('js/filetypes/markdown.js', '2137:2222');
    MarkdownEditor.prototype.bold = function () {
        __$coverCall('js/filetypes/markdown.js', '2186:2217');
        return this.enclose('**', '**');
    };
    __$coverCall('js/filetypes/markdown.js', '2227:2312');
    MarkdownEditor.prototype.italic = function () {
        __$coverCall('js/filetypes/markdown.js', '2278:2307');
        return this.enclose('*', '*');
    };
    __$coverCall('js/filetypes/markdown.js', '2317:2626');
    MarkdownEditor.prototype.anchor = function () {
        __$coverCall('js/filetypes/markdown.js', '2368:2382');
        var href, text;
        __$coverCall('js/filetypes/markdown.js', '2388:2411');
        text = this.selection();
        __$coverCall('js/filetypes/markdown.js', '2417:2498');
        if (!text) {
            __$coverCall('js/filetypes/markdown.js', '2436:2492');
            text = window.prompt('Please input a link text', 'Here');
        }
        __$coverCall('js/filetypes/markdown.js', '2504:2562');
        href = window.prompt('Please input a link url', 'http://');
        __$coverCall('js/filetypes/markdown.js', '2568:2621');
        return this.selection('[' + text + '](' + href + ')');
    };
    __$coverCall('js/filetypes/markdown.js', '2631:2895');
    MarkdownEditor.prototype.image = function () {
        __$coverCall('js/filetypes/markdown.js', '2681:2693');
        var alt, src;
        __$coverCall('js/filetypes/markdown.js', '2699:2757');
        src = window.prompt('Please input a image url', 'http://');
        __$coverCall('js/filetypes/markdown.js', '2763:2832');
        alt = window.prompt('(Optional) Please input a alt message', 'Image');
        __$coverCall('js/filetypes/markdown.js', '2838:2890');
        return this.selection('![' + alt + '](' + src + ')');
    };
    __$coverCall('js/filetypes/markdown.js', '2900:3357');
    MarkdownEditor.prototype.unorderedList = function () {
        __$coverCall('js/filetypes/markdown.js', '2958:2969');
        var text, x;
        __$coverCall('js/filetypes/markdown.js', '2975:2998');
        text = this.selection();
        __$coverCall('js/filetypes/markdown.js', '3004:3267');
        text = function () {
            __$coverCall('js/filetypes/markdown.js', '3031:3059');
            var _i, _len, _ref, _results;
            __$coverCall('js/filetypes/markdown.js', '3067:3090');
            _ref = text.split('\n');
            __$coverCall('js/filetypes/markdown.js', '3098:3111');
            _results = [];
            __$coverCall('js/filetypes/markdown.js', '3119:3234');
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                __$coverCall('js/filetypes/markdown.js', '3179:3191');
                x = _ref[_i];
                __$coverCall('js/filetypes/markdown.js', '3201:3226');
                _results.push('-   ' + x);
            }
            __$coverCall('js/filetypes/markdown.js', '3242:3257');
            return _results;
        }();
        __$coverCall('js/filetypes/markdown.js', '3273:3289');
        text.unshift('');
        __$coverCall('js/filetypes/markdown.js', '3295:3308');
        text.push('');
        __$coverCall('js/filetypes/markdown.js', '3314:3352');
        return this.selection(text.join('\n'));
    };
    __$coverCall('js/filetypes/markdown.js', '3362:3834');
    MarkdownEditor.prototype.orderedList = function () {
        __$coverCall('js/filetypes/markdown.js', '3418:3432');
        var i, text, x;
        __$coverCall('js/filetypes/markdown.js', '3438:3461');
        text = this.selection();
        __$coverCall('js/filetypes/markdown.js', '3467:3744');
        text = function () {
            __$coverCall('js/filetypes/markdown.js', '3494:3522');
            var _i, _len, _ref, _results;
            __$coverCall('js/filetypes/markdown.js', '3530:3553');
            _ref = text.split('\n');
            __$coverCall('js/filetypes/markdown.js', '3561:3574');
            _results = [];
            __$coverCall('js/filetypes/markdown.js', '3582:3711');
            for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
                __$coverCall('js/filetypes/markdown.js', '3650:3661');
                x = _ref[i];
                __$coverCall('js/filetypes/markdown.js', '3671:3703');
                _results.push('' + i + '. ' + x);
            }
            __$coverCall('js/filetypes/markdown.js', '3719:3734');
            return _results;
        }();
        __$coverCall('js/filetypes/markdown.js', '3750:3766');
        text.unshift('');
        __$coverCall('js/filetypes/markdown.js', '3772:3785');
        text.push('');
        __$coverCall('js/filetypes/markdown.js', '3791:3829');
        return this.selection(text.join('\n'));
    };
    __$coverCall('js/filetypes/markdown.js', '3839:3860');
    return MarkdownEditor;
}(HtmlEditor);
__$coverCall('js/filetypes/markdown.js', '3880:4151');
MarkdownHelper = function (_super) {
    __$coverCall('js/filetypes/markdown.js', '3920:3953');
    __extends(MarkdownHelper, _super);
    __$coverCall('js/filetypes/markdown.js', '3958:4088');
    function MarkdownHelper(core) {
        __$coverCall('js/filetypes/markdown.js', '3994:4047');
        MarkdownHelper.__super__.constructor.call(this, core);
        __$coverCall('js/filetypes/markdown.js', '4053:4084');
        this.element.addClass('helper');
    }
    __$coverCall('js/filetypes/markdown.js', '4093:4114');
    return MarkdownHelper;
}(Jencil.ui.widgets.panels.Panel);
__$coverCall('js/filetypes/markdown.js', '4154:4982');
MarkdownProfile = function (_super) {
    __$coverCall('js/filetypes/markdown.js', '4195:4229');
    __extends(MarkdownProfile, _super);
    __$coverCall('js/filetypes/markdown.js', '4234:4925');
    function MarkdownProfile() {
        __$coverCall('js/filetypes/markdown.js', '4267:4326');
        this.mainPanelClass = Jencil.ui.widgets.panels.TrimainPanel;
        __$coverCall('js/filetypes/markdown.js', '4332:4365');
        this.editorClass = MarkdownEditor;
        __$coverCall('js/filetypes/markdown.js', '4371:4404');
        this.viewerClass = MarkdownViewer;
        __$coverCall('js/filetypes/markdown.js', '4410:4443');
        this.helperClass = MarkdownHelper;
        __$coverCall('js/filetypes/markdown.js', '4449:4471');
        this.defaultVolume = 1;
        __$coverCall('js/filetypes/markdown.js', '4477:4500');
        this.defaultVolume2 = 1;
        __$coverCall('js/filetypes/markdown.js', '4506:4871');
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
            'Separator',
            [
                'anchor',
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
            'Separator',
            'Fullscreen'
        ];
        __$coverCall('js/filetypes/markdown.js', '4877:4921');
        this.statusbarButtons = [
            'Viewer',
            'Helper'
        ];
    }
    __$coverCall('js/filetypes/markdown.js', '4930:4952');
    return MarkdownProfile;
}(Jencil.profiles.Profile);
__$coverCall('js/filetypes/markdown.js', '4985:5197');
Jencil.utils.namespace('Jencil.filetypes.markdown', function (exports) {
    __$coverCall('js/filetypes/markdown.js', '5059:5098');
    exports.MarkdownEditor = MarkdownEditor;
    __$coverCall('js/filetypes/markdown.js', '5102:5141');
    exports.MarkdownViewer = MarkdownViewer;
    __$coverCall('js/filetypes/markdown.js', '5145:5193');
    return exports.MarkdownProfile = MarkdownProfile;
});