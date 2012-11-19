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
__$coverInit("src/js/viewers.js", "var AjaxViewer, BaseViewer, TemplateViewer,\n  __hasProp = {}.hasOwnProperty,\n  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };\n\nBaseViewer = (function(_super) {\n\n  __extends(BaseViewer, _super);\n\n  function BaseViewer(core, selector, context) {\n    if (selector == null) {\n      selector = '<div>';\n    }\n    BaseViewer.__super__.constructor.call(this, core, selector, context);\n    this.element.addClass('viewer');\n  }\n\n  BaseViewer.prototype.update = function(value, force) {\n    throw new Error(\"NotImplementedError\");\n  };\n\n  return BaseViewer;\n\n})(Panel);\n\nTemplateViewer = (function(_super) {\n\n  __extends(TemplateViewer, _super);\n\n  function TemplateViewer(core) {\n    TemplateViewer.__super__.constructor.call(this, core);\n    this.templatePath = this.core.options.viewerTemplatePath;\n    this.element.css({\n      'position': 'relative'\n    });\n    this.curtain = curtainFactory(this.element);\n    this.iframe = $('<iframe>').appendTo(this.element).css({\n      margin: '0',\n      padding: '0',\n      border: 'none',\n      outline: 'none',\n      resize: 'none',\n      width: '100%',\n      height: '100%',\n      overflow: 'visible'\n    });\n    this.iframe.attr('frameborder', 0);\n    this.iframe = evolute(this.iframe);\n    this.iframe.init = function() {\n      var iframe;\n      iframe = this.get(0);\n      if (iframe.contentDocument != null) {\n        this.document = iframe.contentDocument;\n      } else {\n        this.document = iframe.contentWindow.document;\n      }\n      return this.document.write('<body></body>');\n    };\n    this.iframe.write = function(value) {\n      var scrollTop;\n      if (this.document != null) {\n        try {\n          scrollTop = this.document.documentElement.scrollTop;\n        } catch (e) {\n          scrollTop = 0;\n        }\n        this.document.open();\n        this.document.write(value);\n        this.document.close();\n        $(\"a\", $(this.document)).attr('target', '_blank');\n        this.document.documentElement.scrollTop = scrollTop;\n        this.width(this.document.scrollLeft);\n        this.height(this.document.scrollTop);\n        return true;\n      }\n      return false;\n    };\n    this.iframe.loadTemplate = function(templatePath, value) {\n      var _this = this;\n      return $.ajax({\n        url: templatePath,\n        success: function(data) {\n          _this._template = data;\n          return _this.write(value);\n        }\n      });\n    };\n  }\n\n  TemplateViewer.prototype.init = function() {\n    return this.iframe.init();\n  };\n\n  TemplateViewer.prototype.update = function(value, force) {\n    if (!this.element.is(':visible') && !force) {\n      return;\n    }\n    if (this.iframe._template != null) {\n      value = this.iframe._template.replace(\"{{content}}\", value);\n    } else if (this.templatePath != null) {\n      this.iframe.loadTemplate(this.templatePath, value);\n    }\n    return this.iframe.write(value);\n  };\n\n  TemplateViewer.prototype.adjust = function() {\n    this.iframe.outerWidth(this.element.width());\n    this.iframe.outerHeight(this.element.height());\n    return this;\n  };\n\n  return TemplateViewer;\n\n})(BaseViewer);\n\nAjaxViewer = (function(_super) {\n\n  __extends(AjaxViewer, _super);\n\n  function AjaxViewer(core, config) {\n    this.config = config;\n    AjaxViewer.__super__.constructor.call(this, core);\n    this.config = jQuery.extend({\n      type: 'GET',\n      dataType: 'text',\n      data: function(value) {\n        return encodeURIComponent(value);\n      },\n      url: null\n    }, this.config);\n  }\n\n  AjaxViewer.prototype.update = function(value, force) {\n    var _this = this;\n    if (this._valueCache !== value || force) {\n      this._valueCache = value;\n      return $.ajax({\n        type: this.config.type,\n        dataType: this.config.dataType,\n        data: JSON.stringify(this.config.data(value)),\n        url: this.config.url,\n        success: function(value) {\n          if (_this.iframe._template != null) {\n            value = _this.iframe._template.replace(\"{{content}}\", value);\n          } else if (_this.templatePath != null) {\n            _this.iframe.loadTemplate(_this.templatePath, value);\n          }\n          return _this.iframe.write(value);\n        }\n      });\n    }\n  };\n\n  return AjaxViewer;\n\n})(TemplateViewer);\n\nnamespace('Jencil.viewers', function(exports) {\n  exports.BaseViewer = BaseViewer;\n  exports.TemplateViewer = TemplateViewer;\n  return exports.AjaxViewer = AjaxViewer;\n});\n");
__$coverInitRange("src/js/viewers.js", "0:366");
__$coverInitRange("src/js/viewers.js", "369:800");
__$coverInitRange("src/js/viewers.js", "803:3335");
__$coverInitRange("src/js/viewers.js", "3338:4464");
__$coverInitRange("src/js/viewers.js", "4467:4637");
__$coverInitRange("src/js/viewers.js", "117:202");
__$coverInitRange("src/js/viewers.js", "204:248");
__$coverInitRange("src/js/viewers.js", "250:283");
__$coverInitRange("src/js/viewers.js", "285:313");
__$coverInitRange("src/js/viewers.js", "315:349");
__$coverInitRange("src/js/viewers.js", "351:363");
__$coverInitRange("src/js/viewers.js", "143:200");
__$coverInitRange("src/js/viewers.js", "222:246");
__$coverInitRange("src/js/viewers.js", "405:434");
__$coverInitRange("src/js/viewers.js", "439:659");
__$coverInitRange("src/js/viewers.js", "664:766");
__$coverInitRange("src/js/viewers.js", "771:788");
__$coverInitRange("src/js/viewers.js", "490:544");
__$coverInitRange("src/js/viewers.js", "550:618");
__$coverInitRange("src/js/viewers.js", "624:655");
__$coverInitRange("src/js/viewers.js", "520:538");
__$coverInitRange("src/js/viewers.js", "723:761");
__$coverInitRange("src/js/viewers.js", "843:876");
__$coverInitRange("src/js/viewers.js", "881:2644");
__$coverInitRange("src/js/viewers.js", "2649:2728");
__$coverInitRange("src/js/viewers.js", "2733:3118");
__$coverInitRange("src/js/viewers.js", "3123:3292");
__$coverInitRange("src/js/viewers.js", "3297:3318");
__$coverInitRange("src/js/viewers.js", "917:970");
__$coverInitRange("src/js/viewers.js", "976:1032");
__$coverInitRange("src/js/viewers.js", "1038:1092");
__$coverInitRange("src/js/viewers.js", "1098:1141");
__$coverInitRange("src/js/viewers.js", "1147:1385");
__$coverInitRange("src/js/viewers.js", "1391:1425");
__$coverInitRange("src/js/viewers.js", "1431:1465");
__$coverInitRange("src/js/viewers.js", "1471:1775");
__$coverInitRange("src/js/viewers.js", "1781:2372");
__$coverInitRange("src/js/viewers.js", "2378:2640");
__$coverInitRange("src/js/viewers.js", "1509:1519");
__$coverInitRange("src/js/viewers.js", "1527:1547");
__$coverInitRange("src/js/viewers.js", "1555:1717");
__$coverInitRange("src/js/viewers.js", "1725:1768");
__$coverInitRange("src/js/viewers.js", "1601:1639");
__$coverInitRange("src/js/viewers.js", "1664:1709");
__$coverInitRange("src/js/viewers.js", "1825:1838");
__$coverInitRange("src/js/viewers.js", "1846:2345");
__$coverInitRange("src/js/viewers.js", "2353:2365");
__$coverInitRange("src/js/viewers.js", "1883:2007");
__$coverInitRange("src/js/viewers.js", "2017:2037");
__$coverInitRange("src/js/viewers.js", "2047:2073");
__$coverInitRange("src/js/viewers.js", "2083:2104");
__$coverInitRange("src/js/viewers.js", "2114:2163");
__$coverInitRange("src/js/viewers.js", "2173:2224");
__$coverInitRange("src/js/viewers.js", "2234:2270");
__$coverInitRange("src/js/viewers.js", "2280:2316");
__$coverInitRange("src/js/viewers.js", "2326:2337");
__$coverInitRange("src/js/viewers.js", "1899:1950");
__$coverInitRange("src/js/viewers.js", "1984:1997");
__$coverInitRange("src/js/viewers.js", "2443:2459");
__$coverInitRange("src/js/viewers.js", "2467:2633");
__$coverInitRange("src/js/viewers.js", "2554:2576");
__$coverInitRange("src/js/viewers.js", "2588:2613");
__$coverInitRange("src/js/viewers.js", "2698:2723");
__$coverInitRange("src/js/viewers.js", "2796:2860");
__$coverInitRange("src/js/viewers.js", "2866:3076");
__$coverInitRange("src/js/viewers.js", "3082:3113");
__$coverInitRange("src/js/viewers.js", "2848:2854");
__$coverInitRange("src/js/viewers.js", "2909:2968");
__$coverInitRange("src/js/viewers.js", "3020:3070");
__$coverInitRange("src/js/viewers.js", "3174:3218");
__$coverInitRange("src/js/viewers.js", "3224:3270");
__$coverInitRange("src/js/viewers.js", "3276:3287");
__$coverInitRange("src/js/viewers.js", "3374:3403");
__$coverInitRange("src/js/viewers.js", "3408:3722");
__$coverInitRange("src/js/viewers.js", "3727:4421");
__$coverInitRange("src/js/viewers.js", "4426:4443");
__$coverInitRange("src/js/viewers.js", "3448:3468");
__$coverInitRange("src/js/viewers.js", "3474:3523");
__$coverInitRange("src/js/viewers.js", "3529:3718");
__$coverInitRange("src/js/viewers.js", "3640:3672");
__$coverInitRange("src/js/viewers.js", "3786:3802");
__$coverInitRange("src/js/viewers.js", "3808:4416");
__$coverInitRange("src/js/viewers.js", "3857:3881");
__$coverInitRange("src/js/viewers.js", "3889:4410");
__$coverInitRange("src/js/viewers.js", "4107:4346");
__$coverInitRange("src/js/viewers.js", "4358:4390");
__$coverInitRange("src/js/viewers.js", "4157:4217");
__$coverInitRange("src/js/viewers.js", "4282:4334");
__$coverInitRange("src/js/viewers.js", "4517:4548");
__$coverInitRange("src/js/viewers.js", "4552:4591");
__$coverInitRange("src/js/viewers.js", "4595:4633");
__$coverCall('src/js/viewers.js', '0:366');
var AjaxViewer, BaseViewer, TemplateViewer, __hasProp = {}.hasOwnProperty, __extends = function (child, parent) {
        __$coverCall('src/js/viewers.js', '117:202');
        for (var key in parent) {
            __$coverCall('src/js/viewers.js', '143:200');
            if (__hasProp.call(parent, key))
                child[key] = parent[key];
        }
        __$coverCall('src/js/viewers.js', '204:248');
        function ctor() {
            __$coverCall('src/js/viewers.js', '222:246');
            this.constructor = child;
        }
        __$coverCall('src/js/viewers.js', '250:283');
        ctor.prototype = parent.prototype;
        __$coverCall('src/js/viewers.js', '285:313');
        child.prototype = new ctor();
        __$coverCall('src/js/viewers.js', '315:349');
        child.__super__ = parent.prototype;
        __$coverCall('src/js/viewers.js', '351:363');
        return child;
    };
__$coverCall('src/js/viewers.js', '369:800');
BaseViewer = function (_super) {
    __$coverCall('src/js/viewers.js', '405:434');
    __extends(BaseViewer, _super);
    __$coverCall('src/js/viewers.js', '439:659');
    function BaseViewer(core, selector, context) {
        __$coverCall('src/js/viewers.js', '490:544');
        if (selector == null) {
            __$coverCall('src/js/viewers.js', '520:538');
            selector = '<div>';
        }
        __$coverCall('src/js/viewers.js', '550:618');
        BaseViewer.__super__.constructor.call(this, core, selector, context);
        __$coverCall('src/js/viewers.js', '624:655');
        this.element.addClass('viewer');
    }
    __$coverCall('src/js/viewers.js', '664:766');
    BaseViewer.prototype.update = function (value, force) {
        __$coverCall('src/js/viewers.js', '723:761');
        throw new Error('NotImplementedError');
    };
    __$coverCall('src/js/viewers.js', '771:788');
    return BaseViewer;
}(Panel);
__$coverCall('src/js/viewers.js', '803:3335');
TemplateViewer = function (_super) {
    __$coverCall('src/js/viewers.js', '843:876');
    __extends(TemplateViewer, _super);
    __$coverCall('src/js/viewers.js', '881:2644');
    function TemplateViewer(core) {
        __$coverCall('src/js/viewers.js', '917:970');
        TemplateViewer.__super__.constructor.call(this, core);
        __$coverCall('src/js/viewers.js', '976:1032');
        this.templatePath = this.core.options.viewerTemplatePath;
        __$coverCall('src/js/viewers.js', '1038:1092');
        this.element.css({ 'position': 'relative' });
        __$coverCall('src/js/viewers.js', '1098:1141');
        this.curtain = curtainFactory(this.element);
        __$coverCall('src/js/viewers.js', '1147:1385');
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
        __$coverCall('src/js/viewers.js', '1391:1425');
        this.iframe.attr('frameborder', 0);
        __$coverCall('src/js/viewers.js', '1431:1465');
        this.iframe = evolute(this.iframe);
        __$coverCall('src/js/viewers.js', '1471:1775');
        this.iframe.init = function () {
            __$coverCall('src/js/viewers.js', '1509:1519');
            var iframe;
            __$coverCall('src/js/viewers.js', '1527:1547');
            iframe = this.get(0);
            __$coverCall('src/js/viewers.js', '1555:1717');
            if (iframe.contentDocument != null) {
                __$coverCall('src/js/viewers.js', '1601:1639');
                this.document = iframe.contentDocument;
            } else {
                __$coverCall('src/js/viewers.js', '1664:1709');
                this.document = iframe.contentWindow.document;
            }
            __$coverCall('src/js/viewers.js', '1725:1768');
            return this.document.write('<body></body>');
        };
        __$coverCall('src/js/viewers.js', '1781:2372');
        this.iframe.write = function (value) {
            __$coverCall('src/js/viewers.js', '1825:1838');
            var scrollTop;
            __$coverCall('src/js/viewers.js', '1846:2345');
            if (this.document != null) {
                __$coverCall('src/js/viewers.js', '1883:2007');
                try {
                    __$coverCall('src/js/viewers.js', '1899:1950');
                    scrollTop = this.document.documentElement.scrollTop;
                } catch (e) {
                    __$coverCall('src/js/viewers.js', '1984:1997');
                    scrollTop = 0;
                }
                __$coverCall('src/js/viewers.js', '2017:2037');
                this.document.open();
                __$coverCall('src/js/viewers.js', '2047:2073');
                this.document.write(value);
                __$coverCall('src/js/viewers.js', '2083:2104');
                this.document.close();
                __$coverCall('src/js/viewers.js', '2114:2163');
                $('a', $(this.document)).attr('target', '_blank');
                __$coverCall('src/js/viewers.js', '2173:2224');
                this.document.documentElement.scrollTop = scrollTop;
                __$coverCall('src/js/viewers.js', '2234:2270');
                this.width(this.document.scrollLeft);
                __$coverCall('src/js/viewers.js', '2280:2316');
                this.height(this.document.scrollTop);
                __$coverCall('src/js/viewers.js', '2326:2337');
                return true;
            }
            __$coverCall('src/js/viewers.js', '2353:2365');
            return false;
        };
        __$coverCall('src/js/viewers.js', '2378:2640');
        this.iframe.loadTemplate = function (templatePath, value) {
            __$coverCall('src/js/viewers.js', '2443:2459');
            var _this = this;
            __$coverCall('src/js/viewers.js', '2467:2633');
            return $.ajax({
                url: templatePath,
                success: function (data) {
                    __$coverCall('src/js/viewers.js', '2554:2576');
                    _this._template = data;
                    __$coverCall('src/js/viewers.js', '2588:2613');
                    return _this.write(value);
                }
            });
        };
    }
    __$coverCall('src/js/viewers.js', '2649:2728');
    TemplateViewer.prototype.init = function () {
        __$coverCall('src/js/viewers.js', '2698:2723');
        return this.iframe.init();
    };
    __$coverCall('src/js/viewers.js', '2733:3118');
    TemplateViewer.prototype.update = function (value, force) {
        __$coverCall('src/js/viewers.js', '2796:2860');
        if (!this.element.is(':visible') && !force) {
            __$coverCall('src/js/viewers.js', '2848:2854');
            return;
        }
        __$coverCall('src/js/viewers.js', '2866:3076');
        if (this.iframe._template != null) {
            __$coverCall('src/js/viewers.js', '2909:2968');
            value = this.iframe._template.replace('{{content}}', value);
        } else if (this.templatePath != null) {
            __$coverCall('src/js/viewers.js', '3020:3070');
            this.iframe.loadTemplate(this.templatePath, value);
        }
        __$coverCall('src/js/viewers.js', '3082:3113');
        return this.iframe.write(value);
    };
    __$coverCall('src/js/viewers.js', '3123:3292');
    TemplateViewer.prototype.adjust = function () {
        __$coverCall('src/js/viewers.js', '3174:3218');
        this.iframe.outerWidth(this.element.width());
        __$coverCall('src/js/viewers.js', '3224:3270');
        this.iframe.outerHeight(this.element.height());
        __$coverCall('src/js/viewers.js', '3276:3287');
        return this;
    };
    __$coverCall('src/js/viewers.js', '3297:3318');
    return TemplateViewer;
}(BaseViewer);
__$coverCall('src/js/viewers.js', '3338:4464');
AjaxViewer = function (_super) {
    __$coverCall('src/js/viewers.js', '3374:3403');
    __extends(AjaxViewer, _super);
    __$coverCall('src/js/viewers.js', '3408:3722');
    function AjaxViewer(core, config) {
        __$coverCall('src/js/viewers.js', '3448:3468');
        this.config = config;
        __$coverCall('src/js/viewers.js', '3474:3523');
        AjaxViewer.__super__.constructor.call(this, core);
        __$coverCall('src/js/viewers.js', '3529:3718');
        this.config = jQuery.extend({
            type: 'GET',
            dataType: 'text',
            data: function (value) {
                __$coverCall('src/js/viewers.js', '3640:3672');
                return encodeURIComponent(value);
            },
            url: null
        }, this.config);
    }
    __$coverCall('src/js/viewers.js', '3727:4421');
    AjaxViewer.prototype.update = function (value, force) {
        __$coverCall('src/js/viewers.js', '3786:3802');
        var _this = this;
        __$coverCall('src/js/viewers.js', '3808:4416');
        if (this._valueCache !== value || force) {
            __$coverCall('src/js/viewers.js', '3857:3881');
            this._valueCache = value;
            __$coverCall('src/js/viewers.js', '3889:4410');
            return $.ajax({
                type: this.config.type,
                dataType: this.config.dataType,
                data: JSON.stringify(this.config.data(value)),
                url: this.config.url,
                success: function (value) {
                    __$coverCall('src/js/viewers.js', '4107:4346');
                    if (_this.iframe._template != null) {
                        __$coverCall('src/js/viewers.js', '4157:4217');
                        value = _this.iframe._template.replace('{{content}}', value);
                    } else if (_this.templatePath != null) {
                        __$coverCall('src/js/viewers.js', '4282:4334');
                        _this.iframe.loadTemplate(_this.templatePath, value);
                    }
                    __$coverCall('src/js/viewers.js', '4358:4390');
                    return _this.iframe.write(value);
                }
            });
        }
    };
    __$coverCall('src/js/viewers.js', '4426:4443');
    return AjaxViewer;
}(TemplateViewer);
__$coverCall('src/js/viewers.js', '4467:4637');
namespace('Jencil.viewers', function (exports) {
    __$coverCall('src/js/viewers.js', '4517:4548');
    exports.BaseViewer = BaseViewer;
    __$coverCall('src/js/viewers.js', '4552:4591');
    exports.TemplateViewer = TemplateViewer;
    __$coverCall('src/js/viewers.js', '4595:4633');
    return exports.AjaxViewer = AjaxViewer;
});