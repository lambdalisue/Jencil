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
__$coverInit("src/js/core.js", "var DefaultProfile;\n\nDefaultProfile = {\n  mainPanelClass: null,\n  editorClass: null,\n  viewerClass: null,\n  helperClass: null,\n  toolbarButtons: [],\n  statusbarButtons: [],\n  defaultVolume: null,\n  defaultVolume2: null\n};\n\nthis.Jencil = (function() {\n\n  function Jencil(textarea, options) {\n    var DefaultOptions,\n      _this = this;\n    DefaultOptions = {\n      profile: 'Html',\n      profiles: {\n        Html: HtmlProfile,\n        Markdown: MarkdownProfile\n      },\n      resizable: true,\n      enableTabIndent: true,\n      enableAutoIndent: true,\n      tabString: '\\t',\n      defaultVolume: null,\n      defaultVolume2: null,\n      width: 640,\n      height: 620,\n      editorTemplatePath: null,\n      viewerTemplatePath: null,\n      helperTemplatePath: null\n    };\n    this.options = jQuery.extend(DefaultOptions, options);\n    this.element = textarea.hide();\n    this.caretaker = new Caretaker();\n    this.caretaker.originator = function() {\n      return _this.editor();\n    };\n    this.wrapper = new Wrapper(this, this.options.width, this.options.height);\n    this.fullscreen = new Fullscreen(this);\n    this.element.after(this.wrapper.element).after(this.fullscreen.element);\n    this.profile(this.options.profile);\n  }\n\n  Jencil.prototype.editor = function() {\n    return this.wrapper.workspace.mainPanel.editorPanel || null;\n  };\n\n  Jencil.prototype.viewer = function() {\n    return this.wrapper.workspace.mainPanel.viewerPanel || null;\n  };\n\n  Jencil.prototype.helper = function() {\n    return this.wrapper.workspace.mainPanel.helperPanel || null;\n  };\n\n  Jencil.prototype.profile = function(profileNameOrInstance) {\n    this.wrapper.init(profileNameOrInstance);\n    this.wrapper.adjust();\n    return this.caretaker.save();\n  };\n\n  return Jencil;\n\n})();\n\n$.fn.jencil = function(options) {\n  return $(this).each(function() {\n    var self;\n    self = $(this);\n    return self.data('jencil', new Jencil(self, options));\n  });\n};\n\nnamespace('Jencil.profiles', function(exports) {\n  return exports.DefaultProfile = DefaultProfile;\n});\n\nnamespace('Jencil.utils.namespace', function(exports) {\n  return exports.namespace = namespace;\n});\n\nnamespace('Jencil.utils.strutils', function(exports) {\n  return exports.strutils = strutils;\n});\n\nnamespace('Jencil.utils.evolution', function(exports) {\n  return exports.evolute = evolute;\n});\n\nnamespace('Jencil.utils.selection', function(exports) {\n  return exports.Selection = Selection;\n});\n\nnamespace('Jencil.utils.animation', function(exports) {\n  return exports.animate = animate;\n});\n\nnamespace('Jencil.utils.autoindent', function(exports) {\n  return exports.autoIndentable = autoIndentable;\n});\n\nnamespace('Jencil.utils.curtain', function(exports) {\n  return exports.curtainFactory = curtainFactory;\n});\n\nnamespace('Jencil.utils.i18n', function(exports) {\n  return exports.translate = translate;\n});\n\nnamespace('Jencil.utils.undo', function(exports) {\n  exports.NotImplementedError = NotImplementedError;\n  exports.Originator = Originator;\n  return exports.Caretaker = Caretaker;\n});\n\nnamespace('Jencil', function(exports) {\n  return exports.t = translate;\n});\n");
__$coverInitRange("src/js/core.js", "0:18");
__$coverInitRange("src/js/core.js", "21:220");
__$coverInitRange("src/js/core.js", "223:1761");
__$coverInitRange("src/js/core.js", "1764:1933");
__$coverInitRange("src/js/core.js", "1936:2037");
__$coverInitRange("src/js/core.js", "2040:2138");
__$coverInitRange("src/js/core.js", "2141:2236");
__$coverInitRange("src/js/core.js", "2239:2333");
__$coverInitRange("src/js/core.js", "2336:2434");
__$coverInitRange("src/js/core.js", "2437:2531");
__$coverInitRange("src/js/core.js", "2534:2643");
__$coverInitRange("src/js/core.js", "2646:2752");
__$coverInitRange("src/js/core.js", "2755:2848");
__$coverInitRange("src/js/core.js", "2851:3032");
__$coverInitRange("src/js/core.js", "3035:3109");
__$coverInitRange("src/js/core.js", "254:1224");
__$coverInitRange("src/js/core.js", "1229:1336");
__$coverInitRange("src/js/core.js", "1341:1448");
__$coverInitRange("src/js/core.js", "1453:1560");
__$coverInitRange("src/js/core.js", "1565:1736");
__$coverInitRange("src/js/core.js", "1741:1754");
__$coverInitRange("src/js/core.js", "295:333");
__$coverInitRange("src/js/core.js", "339:766");
__$coverInitRange("src/js/core.js", "772:825");
__$coverInitRange("src/js/core.js", "831:861");
__$coverInitRange("src/js/core.js", "867:899");
__$coverInitRange("src/js/core.js", "905:980");
__$coverInitRange("src/js/core.js", "986:1059");
__$coverInitRange("src/js/core.js", "1065:1103");
__$coverInitRange("src/js/core.js", "1109:1180");
__$coverInitRange("src/js/core.js", "1186:1220");
__$coverInitRange("src/js/core.js", "952:973");
__$coverInitRange("src/js/core.js", "1272:1331");
__$coverInitRange("src/js/core.js", "1384:1443");
__$coverInitRange("src/js/core.js", "1496:1555");
__$coverInitRange("src/js/core.js", "1630:1670");
__$coverInitRange("src/js/core.js", "1676:1697");
__$coverInitRange("src/js/core.js", "1703:1731");
__$coverInitRange("src/js/core.js", "1800:1930");
__$coverInitRange("src/js/core.js", "1837:1845");
__$coverInitRange("src/js/core.js", "1851:1865");
__$coverInitRange("src/js/core.js", "1871:1924");
__$coverInitRange("src/js/core.js", "1987:2033");
__$coverInitRange("src/js/core.js", "2098:2134");
__$coverInitRange("src/js/core.js", "2198:2232");
__$coverInitRange("src/js/core.js", "2297:2329");
__$coverInitRange("src/js/core.js", "2394:2430");
__$coverInitRange("src/js/core.js", "2495:2527");
__$coverInitRange("src/js/core.js", "2593:2639");
__$coverInitRange("src/js/core.js", "2702:2748");
__$coverInitRange("src/js/core.js", "2808:2844");
__$coverInitRange("src/js/core.js", "2904:2953");
__$coverInitRange("src/js/core.js", "2957:2988");
__$coverInitRange("src/js/core.js", "2992:3028");
__$coverInitRange("src/js/core.js", "3077:3105");
__$coverCall('src/js/core.js', '0:18');
var DefaultProfile;
__$coverCall('src/js/core.js', '21:220');
DefaultProfile = {
    mainPanelClass: null,
    editorClass: null,
    viewerClass: null,
    helperClass: null,
    toolbarButtons: [],
    statusbarButtons: [],
    defaultVolume: null,
    defaultVolume2: null
};
__$coverCall('src/js/core.js', '223:1761');
this.Jencil = function () {
    __$coverCall('src/js/core.js', '254:1224');
    function Jencil(textarea, options) {
        __$coverCall('src/js/core.js', '295:333');
        var DefaultOptions, _this = this;
        __$coverCall('src/js/core.js', '339:766');
        DefaultOptions = {
            profile: 'Html',
            profiles: {
                Html: HtmlProfile,
                Markdown: MarkdownProfile
            },
            resizable: true,
            enableTabIndent: true,
            enableAutoIndent: true,
            tabString: '\t',
            defaultVolume: null,
            defaultVolume2: null,
            width: 640,
            height: 620,
            editorTemplatePath: null,
            viewerTemplatePath: null,
            helperTemplatePath: null
        };
        __$coverCall('src/js/core.js', '772:825');
        this.options = jQuery.extend(DefaultOptions, options);
        __$coverCall('src/js/core.js', '831:861');
        this.element = textarea.hide();
        __$coverCall('src/js/core.js', '867:899');
        this.caretaker = new Caretaker();
        __$coverCall('src/js/core.js', '905:980');
        this.caretaker.originator = function () {
            __$coverCall('src/js/core.js', '952:973');
            return _this.editor();
        };
        __$coverCall('src/js/core.js', '986:1059');
        this.wrapper = new Wrapper(this, this.options.width, this.options.height);
        __$coverCall('src/js/core.js', '1065:1103');
        this.fullscreen = new Fullscreen(this);
        __$coverCall('src/js/core.js', '1109:1180');
        this.element.after(this.wrapper.element).after(this.fullscreen.element);
        __$coverCall('src/js/core.js', '1186:1220');
        this.profile(this.options.profile);
    }
    __$coverCall('src/js/core.js', '1229:1336');
    Jencil.prototype.editor = function () {
        __$coverCall('src/js/core.js', '1272:1331');
        return this.wrapper.workspace.mainPanel.editorPanel || null;
    };
    __$coverCall('src/js/core.js', '1341:1448');
    Jencil.prototype.viewer = function () {
        __$coverCall('src/js/core.js', '1384:1443');
        return this.wrapper.workspace.mainPanel.viewerPanel || null;
    };
    __$coverCall('src/js/core.js', '1453:1560');
    Jencil.prototype.helper = function () {
        __$coverCall('src/js/core.js', '1496:1555');
        return this.wrapper.workspace.mainPanel.helperPanel || null;
    };
    __$coverCall('src/js/core.js', '1565:1736');
    Jencil.prototype.profile = function (profileNameOrInstance) {
        __$coverCall('src/js/core.js', '1630:1670');
        this.wrapper.init(profileNameOrInstance);
        __$coverCall('src/js/core.js', '1676:1697');
        this.wrapper.adjust();
        __$coverCall('src/js/core.js', '1703:1731');
        return this.caretaker.save();
    };
    __$coverCall('src/js/core.js', '1741:1754');
    return Jencil;
}();
__$coverCall('src/js/core.js', '1764:1933');
$.fn.jencil = function (options) {
    __$coverCall('src/js/core.js', '1800:1930');
    return $(this).each(function () {
        __$coverCall('src/js/core.js', '1837:1845');
        var self;
        __$coverCall('src/js/core.js', '1851:1865');
        self = $(this);
        __$coverCall('src/js/core.js', '1871:1924');
        return self.data('jencil', new Jencil(self, options));
    });
};
__$coverCall('src/js/core.js', '1936:2037');
namespace('Jencil.profiles', function (exports) {
    __$coverCall('src/js/core.js', '1987:2033');
    return exports.DefaultProfile = DefaultProfile;
});
__$coverCall('src/js/core.js', '2040:2138');
namespace('Jencil.utils.namespace', function (exports) {
    __$coverCall('src/js/core.js', '2098:2134');
    return exports.namespace = namespace;
});
__$coverCall('src/js/core.js', '2141:2236');
namespace('Jencil.utils.strutils', function (exports) {
    __$coverCall('src/js/core.js', '2198:2232');
    return exports.strutils = strutils;
});
__$coverCall('src/js/core.js', '2239:2333');
namespace('Jencil.utils.evolution', function (exports) {
    __$coverCall('src/js/core.js', '2297:2329');
    return exports.evolute = evolute;
});
__$coverCall('src/js/core.js', '2336:2434');
namespace('Jencil.utils.selection', function (exports) {
    __$coverCall('src/js/core.js', '2394:2430');
    return exports.Selection = Selection;
});
__$coverCall('src/js/core.js', '2437:2531');
namespace('Jencil.utils.animation', function (exports) {
    __$coverCall('src/js/core.js', '2495:2527');
    return exports.animate = animate;
});
__$coverCall('src/js/core.js', '2534:2643');
namespace('Jencil.utils.autoindent', function (exports) {
    __$coverCall('src/js/core.js', '2593:2639');
    return exports.autoIndentable = autoIndentable;
});
__$coverCall('src/js/core.js', '2646:2752');
namespace('Jencil.utils.curtain', function (exports) {
    __$coverCall('src/js/core.js', '2702:2748');
    return exports.curtainFactory = curtainFactory;
});
__$coverCall('src/js/core.js', '2755:2848');
namespace('Jencil.utils.i18n', function (exports) {
    __$coverCall('src/js/core.js', '2808:2844');
    return exports.translate = translate;
});
__$coverCall('src/js/core.js', '2851:3032');
namespace('Jencil.utils.undo', function (exports) {
    __$coverCall('src/js/core.js', '2904:2953');
    exports.NotImplementedError = NotImplementedError;
    __$coverCall('src/js/core.js', '2957:2988');
    exports.Originator = Originator;
    __$coverCall('src/js/core.js', '2992:3028');
    return exports.Caretaker = Caretaker;
});
__$coverCall('src/js/core.js', '3035:3109');
namespace('Jencil', function (exports) {
    __$coverCall('src/js/core.js', '3077:3105');
    return exports.t = translate;
});