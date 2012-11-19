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
__$coverInit("js/multipanels.js", "var HorizontalPanel, MultiPanel, VerticalPanel,\n  __hasProp = {}.hasOwnProperty,\n  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };\n\nMultiPanel = (function(_super) {\n\n  __extends(MultiPanel, _super);\n\n  function MultiPanel(core, fst, snd, splitter) {\n    var hide, show,\n      _this = this;\n    this.fst = fst;\n    this.snd = snd;\n    this.splitter = splitter;\n    MultiPanel.__super__.constructor.call(this, core);\n    this.element.addClass('multi');\n    this.element.append(this.fst.element);\n    this.element.append(this.splitter.element);\n    this.element.append(this.snd.element);\n    show = function(callback) {\n      if (!this.element.is(':visible')) {\n        return this.toggle(callback, null);\n      }\n    };\n    hide = function(callback) {\n      if (this.element.is(':visible')) {\n        return this.toggle(null, callback);\n      }\n    };\n    this.fst.toggle = function(callbackOn, callbackOff) {\n      return _this._togglePanel(0, callbackOn, callbackOff);\n    };\n    this.fst.show = show;\n    this.fst.hide = hide;\n    this.snd.toggle = function(callbackOn, callbackOff) {\n      return _this._togglePanel(1, callbackOn, callbackOff);\n    };\n    this.snd.show = show;\n    this.snd.hide = hide;\n    this.splitter.element.dblclick(function() {\n      return _this.snd.toggle();\n    });\n  }\n\n  MultiPanel.prototype.init = function() {\n    this.splitter.init();\n    this.fst.init();\n    return this.snd.init();\n  };\n\n  MultiPanel.prototype._togglePanel = function(to, callbackOn, callbackOff) {\n    var callbackDone, end, volume, _callbackDone,\n      _this = this;\n    if (MultiPanel._animating) {\n      return;\n    }\n    volume = this.splitter.volume();\n    callbackDone = null;\n    if ((0 < volume && volume < 1)) {\n      end = to;\n      this.splitter._previousVolume = volume;\n      _callbackDone = callbackOff;\n    } else {\n      end = this.splitter._previousVolume || this.splitter.defaultVolume;\n      if (end === to) {\n        end = 0.5;\n      }\n      _callbackDone = callbackOn;\n    }\n    MultiPanel._animating = true;\n    callbackDone = function() {\n      MultiPanel._animating = false;\n      return typeof _callbackDone === \"function\" ? _callbackDone() : void 0;\n    };\n    return animate({\n      start: volume,\n      end: end,\n      duration: 500,\n      callbackEach: function(value, epoch) {\n        return _this.splitter.volume(value);\n      },\n      callbackDone: callbackDone\n    });\n  };\n\n  return MultiPanel;\n\n})(Panel);\n\nVerticalPanel = (function(_super) {\n\n  __extends(VerticalPanel, _super);\n\n  function VerticalPanel(core, fst, snd, defaultVolume) {\n    var splitter;\n    if (defaultVolume == null) {\n      defaultVolume = 0.5;\n    }\n    splitter = new VerticalSplitter(core, fst, snd, defaultVolume);\n    VerticalPanel.__super__.constructor.call(this, core, fst, snd, splitter);\n    this.element.addClass('vertical');\n  }\n\n  VerticalPanel.prototype.adjust = function() {\n    this.fst.element.outerHeight(true, this.element.height());\n    this.snd.element.outerHeight(true, this.element.height());\n    this.splitter.element.outerHeight(true, this.element.height());\n    this.splitter.adjust();\n    return this;\n  };\n\n  return VerticalPanel;\n\n})(MultiPanel);\n\nHorizontalPanel = (function(_super) {\n\n  __extends(HorizontalPanel, _super);\n\n  function HorizontalPanel(core, fst, snd, defaultVolume) {\n    var splitter;\n    if (defaultVolume == null) {\n      defaultVolume = 0.5;\n    }\n    splitter = new HorizontalSplitter(core, fst, snd, defaultVolume);\n    HorizontalPanel.__super__.constructor.call(this, core, fst, snd, splitter);\n    this.element.addClass('horizontal');\n  }\n\n  HorizontalPanel.prototype.adjust = function() {\n    this.fst.element.outerWidth(true, this.element.width());\n    this.snd.element.outerWidth(true, this.element.width());\n    this.splitter.element.outerWidth(true, this.element.width());\n    this.splitter.adjust();\n    return this;\n  };\n\n  return HorizontalPanel;\n\n})(MultiPanel);\n\nnamespace('Jencil.multipanels', function(exports) {\n  exports.MultiPanel = MultiPanel;\n  exports.VerticalPanel = VerticalPanel;\n  return exports.HorizontalPanel = HorizontalPanel;\n});\n");
__$coverInitRange("js/multipanels.js", "0:370");
__$coverInitRange("js/multipanels.js", "373:2684");
__$coverInitRange("js/multipanels.js", "2687:3425");
__$coverInitRange("js/multipanels.js", "3428:4176");
__$coverInitRange("js/multipanels.js", "4179:4361");
__$coverInitRange("js/multipanels.js", "121:206");
__$coverInitRange("js/multipanels.js", "208:252");
__$coverInitRange("js/multipanels.js", "254:287");
__$coverInitRange("js/multipanels.js", "289:317");
__$coverInitRange("js/multipanels.js", "319:353");
__$coverInitRange("js/multipanels.js", "355:367");
__$coverInitRange("js/multipanels.js", "147:204");
__$coverInitRange("js/multipanels.js", "226:250");
__$coverInitRange("js/multipanels.js", "409:438");
__$coverInitRange("js/multipanels.js", "443:1538");
__$coverInitRange("js/multipanels.js", "1543:1662");
__$coverInitRange("js/multipanels.js", "1667:2650");
__$coverInitRange("js/multipanels.js", "2655:2672");
__$coverInitRange("js/multipanels.js", "495:529");
__$coverInitRange("js/multipanels.js", "535:549");
__$coverInitRange("js/multipanels.js", "555:569");
__$coverInitRange("js/multipanels.js", "575:599");
__$coverInitRange("js/multipanels.js", "605:654");
__$coverInitRange("js/multipanels.js", "660:690");
__$coverInitRange("js/multipanels.js", "696:733");
__$coverInitRange("js/multipanels.js", "739:781");
__$coverInitRange("js/multipanels.js", "787:824");
__$coverInitRange("js/multipanels.js", "830:957");
__$coverInitRange("js/multipanels.js", "963:1089");
__$coverInitRange("js/multipanels.js", "1095:1215");
__$coverInitRange("js/multipanels.js", "1221:1241");
__$coverInitRange("js/multipanels.js", "1247:1267");
__$coverInitRange("js/multipanels.js", "1273:1393");
__$coverInitRange("js/multipanels.js", "1399:1419");
__$coverInitRange("js/multipanels.js", "1425:1445");
__$coverInitRange("js/multipanels.js", "1451:1534");
__$coverInitRange("js/multipanels.js", "864:950");
__$coverInitRange("js/multipanels.js", "908:942");
__$coverInitRange("js/multipanels.js", "997:1082");
__$coverInitRange("js/multipanels.js", "1040:1074");
__$coverInitRange("js/multipanels.js", "1155:1208");
__$coverInitRange("js/multipanels.js", "1333:1386");
__$coverInitRange("js/multipanels.js", "1501:1526");
__$coverInitRange("js/multipanels.js", "1588:1608");
__$coverInitRange("js/multipanels.js", "1614:1629");
__$coverInitRange("js/multipanels.js", "1635:1657");
__$coverInitRange("js/multipanels.js", "1747:1811");
__$coverInitRange("js/multipanels.js", "1817:1864");
__$coverInitRange("js/multipanels.js", "1870:1901");
__$coverInitRange("js/multipanels.js", "1907:1926");
__$coverInitRange("js/multipanels.js", "1932:2239");
__$coverInitRange("js/multipanels.js", "2245:2273");
__$coverInitRange("js/multipanels.js", "2279:2426");
__$coverInitRange("js/multipanels.js", "2432:2645");
__$coverInitRange("js/multipanels.js", "1852:1858");
__$coverInitRange("js/multipanels.js", "1972:1980");
__$coverInitRange("js/multipanels.js", "1988:2026");
__$coverInitRange("js/multipanels.js", "2034:2061");
__$coverInitRange("js/multipanels.js", "2082:2148");
__$coverInitRange("js/multipanels.js", "2156:2199");
__$coverInitRange("js/multipanels.js", "2207:2233");
__$coverInitRange("js/multipanels.js", "2182:2191");
__$coverInitRange("js/multipanels.js", "2313:2342");
__$coverInitRange("js/multipanels.js", "2350:2419");
__$coverInitRange("js/multipanels.js", "2560:2595");
__$coverInitRange("js/multipanels.js", "2726:2758");
__$coverInitRange("js/multipanels.js", "2763:3090");
__$coverInitRange("js/multipanels.js", "3095:3383");
__$coverInitRange("js/multipanels.js", "3388:3408");
__$coverInitRange("js/multipanels.js", "2823:2835");
__$coverInitRange("js/multipanels.js", "2841:2901");
__$coverInitRange("js/multipanels.js", "2907:2969");
__$coverInitRange("js/multipanels.js", "2975:3047");
__$coverInitRange("js/multipanels.js", "3053:3086");
__$coverInitRange("js/multipanels.js", "2876:2895");
__$coverInitRange("js/multipanels.js", "3145:3202");
__$coverInitRange("js/multipanels.js", "3208:3265");
__$coverInitRange("js/multipanels.js", "3271:3333");
__$coverInitRange("js/multipanels.js", "3339:3361");
__$coverInitRange("js/multipanels.js", "3367:3378");
__$coverInitRange("js/multipanels.js", "3469:3503");
__$coverInitRange("js/multipanels.js", "3508:3843");
__$coverInitRange("js/multipanels.js", "3848:4132");
__$coverInitRange("js/multipanels.js", "4137:4159");
__$coverInitRange("js/multipanels.js", "3570:3582");
__$coverInitRange("js/multipanels.js", "3588:3648");
__$coverInitRange("js/multipanels.js", "3654:3718");
__$coverInitRange("js/multipanels.js", "3724:3798");
__$coverInitRange("js/multipanels.js", "3804:3839");
__$coverInitRange("js/multipanels.js", "3623:3642");
__$coverInitRange("js/multipanels.js", "3900:3955");
__$coverInitRange("js/multipanels.js", "3961:4016");
__$coverInitRange("js/multipanels.js", "4022:4082");
__$coverInitRange("js/multipanels.js", "4088:4110");
__$coverInitRange("js/multipanels.js", "4116:4127");
__$coverInitRange("js/multipanels.js", "4233:4264");
__$coverInitRange("js/multipanels.js", "4268:4305");
__$coverInitRange("js/multipanels.js", "4309:4357");
__$coverCall('js/multipanels.js', '0:370');
var HorizontalPanel, MultiPanel, VerticalPanel, __hasProp = {}.hasOwnProperty, __extends = function (child, parent) {
        __$coverCall('js/multipanels.js', '121:206');
        for (var key in parent) {
            __$coverCall('js/multipanels.js', '147:204');
            if (__hasProp.call(parent, key))
                child[key] = parent[key];
        }
        __$coverCall('js/multipanels.js', '208:252');
        function ctor() {
            __$coverCall('js/multipanels.js', '226:250');
            this.constructor = child;
        }
        __$coverCall('js/multipanels.js', '254:287');
        ctor.prototype = parent.prototype;
        __$coverCall('js/multipanels.js', '289:317');
        child.prototype = new ctor();
        __$coverCall('js/multipanels.js', '319:353');
        child.__super__ = parent.prototype;
        __$coverCall('js/multipanels.js', '355:367');
        return child;
    };
__$coverCall('js/multipanels.js', '373:2684');
MultiPanel = function (_super) {
    __$coverCall('js/multipanels.js', '409:438');
    __extends(MultiPanel, _super);
    __$coverCall('js/multipanels.js', '443:1538');
    function MultiPanel(core, fst, snd, splitter) {
        __$coverCall('js/multipanels.js', '495:529');
        var hide, show, _this = this;
        __$coverCall('js/multipanels.js', '535:549');
        this.fst = fst;
        __$coverCall('js/multipanels.js', '555:569');
        this.snd = snd;
        __$coverCall('js/multipanels.js', '575:599');
        this.splitter = splitter;
        __$coverCall('js/multipanels.js', '605:654');
        MultiPanel.__super__.constructor.call(this, core);
        __$coverCall('js/multipanels.js', '660:690');
        this.element.addClass('multi');
        __$coverCall('js/multipanels.js', '696:733');
        this.element.append(this.fst.element);
        __$coverCall('js/multipanels.js', '739:781');
        this.element.append(this.splitter.element);
        __$coverCall('js/multipanels.js', '787:824');
        this.element.append(this.snd.element);
        __$coverCall('js/multipanels.js', '830:957');
        show = function (callback) {
            __$coverCall('js/multipanels.js', '864:950');
            if (!this.element.is(':visible')) {
                __$coverCall('js/multipanels.js', '908:942');
                return this.toggle(callback, null);
            }
        };
        __$coverCall('js/multipanels.js', '963:1089');
        hide = function (callback) {
            __$coverCall('js/multipanels.js', '997:1082');
            if (this.element.is(':visible')) {
                __$coverCall('js/multipanels.js', '1040:1074');
                return this.toggle(null, callback);
            }
        };
        __$coverCall('js/multipanels.js', '1095:1215');
        this.fst.toggle = function (callbackOn, callbackOff) {
            __$coverCall('js/multipanels.js', '1155:1208');
            return _this._togglePanel(0, callbackOn, callbackOff);
        };
        __$coverCall('js/multipanels.js', '1221:1241');
        this.fst.show = show;
        __$coverCall('js/multipanels.js', '1247:1267');
        this.fst.hide = hide;
        __$coverCall('js/multipanels.js', '1273:1393');
        this.snd.toggle = function (callbackOn, callbackOff) {
            __$coverCall('js/multipanels.js', '1333:1386');
            return _this._togglePanel(1, callbackOn, callbackOff);
        };
        __$coverCall('js/multipanels.js', '1399:1419');
        this.snd.show = show;
        __$coverCall('js/multipanels.js', '1425:1445');
        this.snd.hide = hide;
        __$coverCall('js/multipanels.js', '1451:1534');
        this.splitter.element.dblclick(function () {
            __$coverCall('js/multipanels.js', '1501:1526');
            return _this.snd.toggle();
        });
    }
    __$coverCall('js/multipanels.js', '1543:1662');
    MultiPanel.prototype.init = function () {
        __$coverCall('js/multipanels.js', '1588:1608');
        this.splitter.init();
        __$coverCall('js/multipanels.js', '1614:1629');
        this.fst.init();
        __$coverCall('js/multipanels.js', '1635:1657');
        return this.snd.init();
    };
    __$coverCall('js/multipanels.js', '1667:2650');
    MultiPanel.prototype._togglePanel = function (to, callbackOn, callbackOff) {
        __$coverCall('js/multipanels.js', '1747:1811');
        var callbackDone, end, volume, _callbackDone, _this = this;
        __$coverCall('js/multipanels.js', '1817:1864');
        if (MultiPanel._animating) {
            __$coverCall('js/multipanels.js', '1852:1858');
            return;
        }
        __$coverCall('js/multipanels.js', '1870:1901');
        volume = this.splitter.volume();
        __$coverCall('js/multipanels.js', '1907:1926');
        callbackDone = null;
        __$coverCall('js/multipanels.js', '1932:2239');
        if (0 < volume && volume < 1) {
            __$coverCall('js/multipanels.js', '1972:1980');
            end = to;
            __$coverCall('js/multipanels.js', '1988:2026');
            this.splitter._previousVolume = volume;
            __$coverCall('js/multipanels.js', '2034:2061');
            _callbackDone = callbackOff;
        } else {
            __$coverCall('js/multipanels.js', '2082:2148');
            end = this.splitter._previousVolume || this.splitter.defaultVolume;
            __$coverCall('js/multipanels.js', '2156:2199');
            if (end === to) {
                __$coverCall('js/multipanels.js', '2182:2191');
                end = 0.5;
            }
            __$coverCall('js/multipanels.js', '2207:2233');
            _callbackDone = callbackOn;
        }
        __$coverCall('js/multipanels.js', '2245:2273');
        MultiPanel._animating = true;
        __$coverCall('js/multipanels.js', '2279:2426');
        callbackDone = function () {
            __$coverCall('js/multipanels.js', '2313:2342');
            MultiPanel._animating = false;
            __$coverCall('js/multipanels.js', '2350:2419');
            return typeof _callbackDone === 'function' ? _callbackDone() : void 0;
        };
        __$coverCall('js/multipanels.js', '2432:2645');
        return animate({
            start: volume,
            end: end,
            duration: 500,
            callbackEach: function (value, epoch) {
                __$coverCall('js/multipanels.js', '2560:2595');
                return _this.splitter.volume(value);
            },
            callbackDone: callbackDone
        });
    };
    __$coverCall('js/multipanels.js', '2655:2672');
    return MultiPanel;
}(Panel);
__$coverCall('js/multipanels.js', '2687:3425');
VerticalPanel = function (_super) {
    __$coverCall('js/multipanels.js', '2726:2758');
    __extends(VerticalPanel, _super);
    __$coverCall('js/multipanels.js', '2763:3090');
    function VerticalPanel(core, fst, snd, defaultVolume) {
        __$coverCall('js/multipanels.js', '2823:2835');
        var splitter;
        __$coverCall('js/multipanels.js', '2841:2901');
        if (defaultVolume == null) {
            __$coverCall('js/multipanels.js', '2876:2895');
            defaultVolume = 0.5;
        }
        __$coverCall('js/multipanels.js', '2907:2969');
        splitter = new VerticalSplitter(core, fst, snd, defaultVolume);
        __$coverCall('js/multipanels.js', '2975:3047');
        VerticalPanel.__super__.constructor.call(this, core, fst, snd, splitter);
        __$coverCall('js/multipanels.js', '3053:3086');
        this.element.addClass('vertical');
    }
    __$coverCall('js/multipanels.js', '3095:3383');
    VerticalPanel.prototype.adjust = function () {
        __$coverCall('js/multipanels.js', '3145:3202');
        this.fst.element.outerHeight(true, this.element.height());
        __$coverCall('js/multipanels.js', '3208:3265');
        this.snd.element.outerHeight(true, this.element.height());
        __$coverCall('js/multipanels.js', '3271:3333');
        this.splitter.element.outerHeight(true, this.element.height());
        __$coverCall('js/multipanels.js', '3339:3361');
        this.splitter.adjust();
        __$coverCall('js/multipanels.js', '3367:3378');
        return this;
    };
    __$coverCall('js/multipanels.js', '3388:3408');
    return VerticalPanel;
}(MultiPanel);
__$coverCall('js/multipanels.js', '3428:4176');
HorizontalPanel = function (_super) {
    __$coverCall('js/multipanels.js', '3469:3503');
    __extends(HorizontalPanel, _super);
    __$coverCall('js/multipanels.js', '3508:3843');
    function HorizontalPanel(core, fst, snd, defaultVolume) {
        __$coverCall('js/multipanels.js', '3570:3582');
        var splitter;
        __$coverCall('js/multipanels.js', '3588:3648');
        if (defaultVolume == null) {
            __$coverCall('js/multipanels.js', '3623:3642');
            defaultVolume = 0.5;
        }
        __$coverCall('js/multipanels.js', '3654:3718');
        splitter = new HorizontalSplitter(core, fst, snd, defaultVolume);
        __$coverCall('js/multipanels.js', '3724:3798');
        HorizontalPanel.__super__.constructor.call(this, core, fst, snd, splitter);
        __$coverCall('js/multipanels.js', '3804:3839');
        this.element.addClass('horizontal');
    }
    __$coverCall('js/multipanels.js', '3848:4132');
    HorizontalPanel.prototype.adjust = function () {
        __$coverCall('js/multipanels.js', '3900:3955');
        this.fst.element.outerWidth(true, this.element.width());
        __$coverCall('js/multipanels.js', '3961:4016');
        this.snd.element.outerWidth(true, this.element.width());
        __$coverCall('js/multipanels.js', '4022:4082');
        this.splitter.element.outerWidth(true, this.element.width());
        __$coverCall('js/multipanels.js', '4088:4110');
        this.splitter.adjust();
        __$coverCall('js/multipanels.js', '4116:4127');
        return this;
    };
    __$coverCall('js/multipanels.js', '4137:4159');
    return HorizontalPanel;
}(MultiPanel);
__$coverCall('js/multipanels.js', '4179:4361');
namespace('Jencil.multipanels', function (exports) {
    __$coverCall('js/multipanels.js', '4233:4264');
    exports.MultiPanel = MultiPanel;
    __$coverCall('js/multipanels.js', '4268:4305');
    exports.VerticalPanel = VerticalPanel;
    __$coverCall('js/multipanels.js', '4309:4357');
    return exports.HorizontalPanel = HorizontalPanel;
});