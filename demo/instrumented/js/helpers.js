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
__$coverInit("js/helpers.js", "var BaseHelper, TemplateHelper,\n  __hasProp = {}.hasOwnProperty,\n  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };\n\nBaseHelper = (function(_super) {\n\n  __extends(BaseHelper, _super);\n\n  function BaseHelper(core, selector, context) {\n    if (selector == null) {\n      selector = '<div>';\n    }\n    BaseHelper.__super__.constructor.call(this, core, selector, context);\n    this.element.addClass('helper');\n  }\n\n  return BaseHelper;\n\n})(Panel);\n\nTemplateHelper = (function(_super) {\n\n  __extends(TemplateHelper, _super);\n\n  function TemplateHelper(core) {\n    TemplateHelper.__super__.constructor.call(this, core);\n    this.templatePath = this.core.options.helperTemplatePath;\n    this.element.css({\n      'position': 'relative'\n    });\n    this.curtain = curtainFactory(this.element);\n    this.iframe = $('<iframe>').appendTo(this.element).css({\n      margin: '0',\n      padding: '0',\n      border: 'none',\n      outline: 'none',\n      resize: 'none',\n      width: '100%',\n      height: '100%',\n      overflow: 'visible'\n    });\n    this.iframe.attr('frameborder', 0);\n    this.iframe = evolute(this.iframe);\n    this.iframe.init = function() {\n      var iframe;\n      iframe = this.get(0);\n      if (iframe.contentDocument != null) {\n        this.document = iframe.contentDocument;\n      } else {\n        this.document = iframe.contentWindow.document;\n      }\n      return this.document.write('<body></body>');\n    };\n    this.iframe.write = function(value) {\n      var scrollTop;\n      if (this.document != null) {\n        try {\n          scrollTop = this.document.documentElement.scrollTop;\n        } catch (e) {\n          scrollTop = 0;\n        }\n        this.document.open();\n        this.document.write(value);\n        this.document.close();\n        this.document.documentElement.scrollTop = scrollTop;\n        this.width(this.document.scrollLeft);\n        this.height(this.document.scrollTop);\n        return true;\n      }\n      return false;\n    };\n    this.iframe.loadTemplate = function(templatePath) {\n      var _this = this;\n      return $.ajax({\n        url: templatePath,\n        success: function(data) {\n          return _this.write(data);\n        }\n      });\n    };\n  }\n\n  TemplateHelper.prototype.init = function() {\n    this.iframe.init();\n    if (this.templatePath != null) {\n      return this.iframe.loadTemplate(this.templatePath);\n    }\n  };\n\n  TemplateHelper.prototype.adjust = function() {\n    this.iframe.outerWidth(this.element.width());\n    this.iframe.outerHeight(this.element.height());\n    return this;\n  };\n\n  return TemplateHelper;\n\n})(BaseHelper);\n\nnamespace('Jencil.helpers', function(exports) {\n  exports.BaseHelper = BaseHelper;\n  return exports.TemplateHelper = TemplateHelper;\n});\n");
__$coverInitRange("js/helpers.js", "0:354");
__$coverInitRange("js/helpers.js", "357:681");
__$coverInitRange("js/helpers.js", "684:2819");
__$coverInitRange("js/helpers.js", "2822:2957");
__$coverInitRange("js/helpers.js", "105:190");
__$coverInitRange("js/helpers.js", "192:236");
__$coverInitRange("js/helpers.js", "238:271");
__$coverInitRange("js/helpers.js", "273:301");
__$coverInitRange("js/helpers.js", "303:337");
__$coverInitRange("js/helpers.js", "339:351");
__$coverInitRange("js/helpers.js", "131:188");
__$coverInitRange("js/helpers.js", "210:234");
__$coverInitRange("js/helpers.js", "393:422");
__$coverInitRange("js/helpers.js", "427:647");
__$coverInitRange("js/helpers.js", "652:669");
__$coverInitRange("js/helpers.js", "478:532");
__$coverInitRange("js/helpers.js", "538:606");
__$coverInitRange("js/helpers.js", "612:643");
__$coverInitRange("js/helpers.js", "508:526");
__$coverInitRange("js/helpers.js", "724:757");
__$coverInitRange("js/helpers.js", "762:2424");
__$coverInitRange("js/helpers.js", "2429:2602");
__$coverInitRange("js/helpers.js", "2607:2776");
__$coverInitRange("js/helpers.js", "2781:2802");
__$coverInitRange("js/helpers.js", "798:851");
__$coverInitRange("js/helpers.js", "857:913");
__$coverInitRange("js/helpers.js", "919:973");
__$coverInitRange("js/helpers.js", "979:1022");
__$coverInitRange("js/helpers.js", "1028:1266");
__$coverInitRange("js/helpers.js", "1272:1306");
__$coverInitRange("js/helpers.js", "1312:1346");
__$coverInitRange("js/helpers.js", "1352:1656");
__$coverInitRange("js/helpers.js", "1662:2194");
__$coverInitRange("js/helpers.js", "2200:2420");
__$coverInitRange("js/helpers.js", "1390:1400");
__$coverInitRange("js/helpers.js", "1408:1428");
__$coverInitRange("js/helpers.js", "1436:1598");
__$coverInitRange("js/helpers.js", "1606:1649");
__$coverInitRange("js/helpers.js", "1482:1520");
__$coverInitRange("js/helpers.js", "1545:1590");
__$coverInitRange("js/helpers.js", "1706:1719");
__$coverInitRange("js/helpers.js", "1727:2167");
__$coverInitRange("js/helpers.js", "2175:2187");
__$coverInitRange("js/helpers.js", "1764:1888");
__$coverInitRange("js/helpers.js", "1898:1918");
__$coverInitRange("js/helpers.js", "1928:1954");
__$coverInitRange("js/helpers.js", "1964:1985");
__$coverInitRange("js/helpers.js", "1995:2046");
__$coverInitRange("js/helpers.js", "2056:2092");
__$coverInitRange("js/helpers.js", "2102:2138");
__$coverInitRange("js/helpers.js", "2148:2159");
__$coverInitRange("js/helpers.js", "1780:1831");
__$coverInitRange("js/helpers.js", "1865:1878");
__$coverInitRange("js/helpers.js", "2258:2274");
__$coverInitRange("js/helpers.js", "2282:2413");
__$coverInitRange("js/helpers.js", "2369:2393");
__$coverInitRange("js/helpers.js", "2478:2496");
__$coverInitRange("js/helpers.js", "2502:2597");
__$coverInitRange("js/helpers.js", "2541:2591");
__$coverInitRange("js/helpers.js", "2658:2702");
__$coverInitRange("js/helpers.js", "2708:2754");
__$coverInitRange("js/helpers.js", "2760:2771");
__$coverInitRange("js/helpers.js", "2872:2903");
__$coverInitRange("js/helpers.js", "2907:2953");
__$coverCall('js/helpers.js', '0:354');
var BaseHelper, TemplateHelper, __hasProp = {}.hasOwnProperty, __extends = function (child, parent) {
        __$coverCall('js/helpers.js', '105:190');
        for (var key in parent) {
            __$coverCall('js/helpers.js', '131:188');
            if (__hasProp.call(parent, key))
                child[key] = parent[key];
        }
        __$coverCall('js/helpers.js', '192:236');
        function ctor() {
            __$coverCall('js/helpers.js', '210:234');
            this.constructor = child;
        }
        __$coverCall('js/helpers.js', '238:271');
        ctor.prototype = parent.prototype;
        __$coverCall('js/helpers.js', '273:301');
        child.prototype = new ctor();
        __$coverCall('js/helpers.js', '303:337');
        child.__super__ = parent.prototype;
        __$coverCall('js/helpers.js', '339:351');
        return child;
    };
__$coverCall('js/helpers.js', '357:681');
BaseHelper = function (_super) {
    __$coverCall('js/helpers.js', '393:422');
    __extends(BaseHelper, _super);
    __$coverCall('js/helpers.js', '427:647');
    function BaseHelper(core, selector, context) {
        __$coverCall('js/helpers.js', '478:532');
        if (selector == null) {
            __$coverCall('js/helpers.js', '508:526');
            selector = '<div>';
        }
        __$coverCall('js/helpers.js', '538:606');
        BaseHelper.__super__.constructor.call(this, core, selector, context);
        __$coverCall('js/helpers.js', '612:643');
        this.element.addClass('helper');
    }
    __$coverCall('js/helpers.js', '652:669');
    return BaseHelper;
}(Panel);
__$coverCall('js/helpers.js', '684:2819');
TemplateHelper = function (_super) {
    __$coverCall('js/helpers.js', '724:757');
    __extends(TemplateHelper, _super);
    __$coverCall('js/helpers.js', '762:2424');
    function TemplateHelper(core) {
        __$coverCall('js/helpers.js', '798:851');
        TemplateHelper.__super__.constructor.call(this, core);
        __$coverCall('js/helpers.js', '857:913');
        this.templatePath = this.core.options.helperTemplatePath;
        __$coverCall('js/helpers.js', '919:973');
        this.element.css({ 'position': 'relative' });
        __$coverCall('js/helpers.js', '979:1022');
        this.curtain = curtainFactory(this.element);
        __$coverCall('js/helpers.js', '1028:1266');
        this.iframe = $('<iframe>').appendTo(this.element).css({
            margin: '0',
            padding: '0',
            border: 'none',
            outline: 'none',
            resize: 'none',
            width: '100%',
            height: '100%',
            overflow: 'visible'
        });
        __$coverCall('js/helpers.js', '1272:1306');
        this.iframe.attr('frameborder', 0);
        __$coverCall('js/helpers.js', '1312:1346');
        this.iframe = evolute(this.iframe);
        __$coverCall('js/helpers.js', '1352:1656');
        this.iframe.init = function () {
            __$coverCall('js/helpers.js', '1390:1400');
            var iframe;
            __$coverCall('js/helpers.js', '1408:1428');
            iframe = this.get(0);
            __$coverCall('js/helpers.js', '1436:1598');
            if (iframe.contentDocument != null) {
                __$coverCall('js/helpers.js', '1482:1520');
                this.document = iframe.contentDocument;
            } else {
                __$coverCall('js/helpers.js', '1545:1590');
                this.document = iframe.contentWindow.document;
            }
            __$coverCall('js/helpers.js', '1606:1649');
            return this.document.write('<body></body>');
        };
        __$coverCall('js/helpers.js', '1662:2194');
        this.iframe.write = function (value) {
            __$coverCall('js/helpers.js', '1706:1719');
            var scrollTop;
            __$coverCall('js/helpers.js', '1727:2167');
            if (this.document != null) {
                __$coverCall('js/helpers.js', '1764:1888');
                try {
                    __$coverCall('js/helpers.js', '1780:1831');
                    scrollTop = this.document.documentElement.scrollTop;
                } catch (e) {
                    __$coverCall('js/helpers.js', '1865:1878');
                    scrollTop = 0;
                }
                __$coverCall('js/helpers.js', '1898:1918');
                this.document.open();
                __$coverCall('js/helpers.js', '1928:1954');
                this.document.write(value);
                __$coverCall('js/helpers.js', '1964:1985');
                this.document.close();
                __$coverCall('js/helpers.js', '1995:2046');
                this.document.documentElement.scrollTop = scrollTop;
                __$coverCall('js/helpers.js', '2056:2092');
                this.width(this.document.scrollLeft);
                __$coverCall('js/helpers.js', '2102:2138');
                this.height(this.document.scrollTop);
                __$coverCall('js/helpers.js', '2148:2159');
                return true;
            }
            __$coverCall('js/helpers.js', '2175:2187');
            return false;
        };
        __$coverCall('js/helpers.js', '2200:2420');
        this.iframe.loadTemplate = function (templatePath) {
            __$coverCall('js/helpers.js', '2258:2274');
            var _this = this;
            __$coverCall('js/helpers.js', '2282:2413');
            return $.ajax({
                url: templatePath,
                success: function (data) {
                    __$coverCall('js/helpers.js', '2369:2393');
                    return _this.write(data);
                }
            });
        };
    }
    __$coverCall('js/helpers.js', '2429:2602');
    TemplateHelper.prototype.init = function () {
        __$coverCall('js/helpers.js', '2478:2496');
        this.iframe.init();
        __$coverCall('js/helpers.js', '2502:2597');
        if (this.templatePath != null) {
            __$coverCall('js/helpers.js', '2541:2591');
            return this.iframe.loadTemplate(this.templatePath);
        }
    };
    __$coverCall('js/helpers.js', '2607:2776');
    TemplateHelper.prototype.adjust = function () {
        __$coverCall('js/helpers.js', '2658:2702');
        this.iframe.outerWidth(this.element.width());
        __$coverCall('js/helpers.js', '2708:2754');
        this.iframe.outerHeight(this.element.height());
        __$coverCall('js/helpers.js', '2760:2771');
        return this;
    };
    __$coverCall('js/helpers.js', '2781:2802');
    return TemplateHelper;
}(BaseHelper);
__$coverCall('js/helpers.js', '2822:2957');
namespace('Jencil.helpers', function (exports) {
    __$coverCall('js/helpers.js', '2872:2903');
    exports.BaseHelper = BaseHelper;
    __$coverCall('js/helpers.js', '2907:2953');
    return exports.TemplateHelper = TemplateHelper;
});