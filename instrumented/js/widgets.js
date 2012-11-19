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
__$coverInit("src/js/widgets.js", "var HorizontalPanel, MultiplePanel, Panel, VerticalPanel, Widget,\n  __hasProp = {}.hasOwnProperty,\n  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };\n\nWidget = (function() {\n\n  function Widget(core, selector, context) {\n    this.core = core;\n    if (selector == null) {\n      selector = '<div>';\n    }\n    if (selector instanceof jQuery) {\n      this.element = selector;\n    } else {\n      this.element = $(selector, context);\n    }\n    this.element = evolute(this.element);\n  }\n\n  Widget.prototype.init = function() {\n    return this;\n  };\n\n  Widget.prototype.adjust = function() {\n    return this;\n  };\n\n  return Widget;\n\n})();\n\nPanel = (function(_super) {\n\n  __extends(Panel, _super);\n\n  function Panel(core, selector, context) {\n    if (selector == null) {\n      selector = '<div>';\n    }\n    Panel.__super__.constructor.call(this, core, selector, context);\n    this.element.addClass('panel');\n  }\n\n  return Panel;\n\n})(Widget);\n\nMultiplePanel = (function(_super) {\n\n  __extends(MultiplePanel, _super);\n\n  function MultiplePanel(core, fst, snd, splitter) {\n    var hide, show,\n      _this = this;\n    this.fst = fst;\n    this.snd = snd;\n    this.splitter = splitter;\n    MultiplePanel.__super__.constructor.call(this, core);\n    this.element.addClass('multiple');\n    this.element.append(this.fst.element);\n    this.element.append(this.splitter.element);\n    this.element.append(this.snd.element);\n    show = function(callback) {\n      if (!this.element.is(':visible')) {\n        return this.toggle(callback, null);\n      }\n    };\n    hide = function(callback) {\n      if (this.element.is(':visible')) {\n        return this.toggle(null, callback);\n      }\n    };\n    this.fst.toggle = function(callbackOn, callbackOff) {\n      return _this._togglePanel(0, callbackOn, callbackOff);\n    };\n    this.fst.show = show;\n    this.fst.hide = hide;\n    this.snd.toggle = function(callbackOn, callbackOff) {\n      return _this._togglePanel(1, callbackOn, callbackOff);\n    };\n    this.snd.show = show;\n    this.snd.hide = hide;\n    this.splitter.element.dblclick(function() {\n      return _this.snd.toggle();\n    });\n  }\n\n  MultiplePanel.prototype.init = function() {\n    this.splitter.init();\n    this.fst.init();\n    return this.snd.init();\n  };\n\n  MultiplePanel.prototype._togglePanel = function(to, callbackOn, callbackOff) {\n    var callbackDone, end, volume, _callbackDone,\n      _this = this;\n    if (MultiplePanel._animating) {\n      return;\n    }\n    volume = this.splitter.volume();\n    callbackDone = null;\n    if ((0 < volume && volume < 1)) {\n      end = to;\n      this.splitter._previousVolume = volume;\n      _callbackDone = callbackOff;\n    } else {\n      end = this.splitter._previousVolume || this.splitter.defaultVolume;\n      if (end === to) {\n        end = 0.5;\n      }\n      _callbackDone = callbackOn;\n    }\n    MultiplePanel._animating = true;\n    callbackDone = function() {\n      MultiplePanel._animating = false;\n      return typeof _callbackDone === \"function\" ? _callbackDone() : void 0;\n    };\n    return animate({\n      start: volume,\n      end: end,\n      duration: 500,\n      callbackEach: function(value, epoch) {\n        return _this.splitter.volume(value);\n      },\n      callbackDone: callbackDone\n    });\n  };\n\n  return MultiplePanel;\n\n})(Panel);\n\nVerticalPanel = (function(_super) {\n\n  __extends(VerticalPanel, _super);\n\n  function VerticalPanel(core, fst, snd, defaultVolume) {\n    var splitter;\n    if (defaultVolume == null) {\n      defaultVolume = 0.5;\n    }\n    splitter = new VerticalSplitter(core, fst, snd, defaultVolume);\n    VerticalPanel.__super__.constructor.call(this, core, fst, snd, splitter);\n    this.element.addClass('vertical');\n  }\n\n  VerticalPanel.prototype.adjust = function() {\n    this.fst.element.outerHeight(true, this.element.height());\n    this.snd.element.outerHeight(true, this.element.height());\n    this.splitter.element.outerHeight(true, this.element.height());\n    this.splitter.adjust();\n    return this;\n  };\n\n  return VerticalPanel;\n\n})(MultiplePanel);\n\nHorizontalPanel = (function(_super) {\n\n  __extends(HorizontalPanel, _super);\n\n  function HorizontalPanel(core, fst, snd, defaultVolume) {\n    var splitter;\n    if (defaultVolume == null) {\n      defaultVolume = 0.5;\n    }\n    splitter = new HorizontalSplitter(core, fst, snd, defaultVolume);\n    HorizontalPanel.__super__.constructor.call(this, core, fst, snd, splitter);\n    this.element.addClass('horizontal');\n  }\n\n  HorizontalPanel.prototype.adjust = function() {\n    this.fst.element.outerWidth(true, this.element.width());\n    this.snd.element.outerWidth(true, this.element.width());\n    this.splitter.element.outerWidth(true, this.element.width());\n    this.splitter.adjust();\n    return this;\n  };\n\n  return HorizontalPanel;\n\n})(MultiplePanel);\n\nnamespace('Jencil.widgets', function(exports) {\n  exports.Widget = Widget;\n  exports.Panel = Panel;\n  exports.MultiplePanel = MultiplePanel;\n  exports.VerticalPanel = VerticalPanel;\n  return exports.HorizontalPanel = HorizontalPanel;\n});\n");
__$coverInitRange("src/js/widgets.js", "0:388");
__$coverInitRange("src/js/widgets.js", "391:868");
__$coverInitRange("src/js/widgets.js", "871:1170");
__$coverInitRange("src/js/widgets.js", "1173:3517");
__$coverInitRange("src/js/widgets.js", "3520:4261");
__$coverInitRange("src/js/widgets.js", "4264:5015");
__$coverInitRange("src/js/widgets.js", "5018:5254");
__$coverInitRange("src/js/widgets.js", "139:224");
__$coverInitRange("src/js/widgets.js", "226:270");
__$coverInitRange("src/js/widgets.js", "272:305");
__$coverInitRange("src/js/widgets.js", "307:335");
__$coverInitRange("src/js/widgets.js", "337:371");
__$coverInitRange("src/js/widgets.js", "373:385");
__$coverInitRange("src/js/widgets.js", "165:222");
__$coverInitRange("src/js/widgets.js", "244:268");
__$coverInitRange("src/js/widgets.js", "417:717");
__$coverInitRange("src/js/widgets.js", "722:779");
__$coverInitRange("src/js/widgets.js", "784:843");
__$coverInitRange("src/js/widgets.js", "848:861");
__$coverInitRange("src/js/widgets.js", "464:480");
__$coverInitRange("src/js/widgets.js", "486:540");
__$coverInitRange("src/js/widgets.js", "546:671");
__$coverInitRange("src/js/widgets.js", "677:713");
__$coverInitRange("src/js/widgets.js", "516:534");
__$coverInitRange("src/js/widgets.js", "586:609");
__$coverInitRange("src/js/widgets.js", "630:665");
__$coverInitRange("src/js/widgets.js", "763:774");
__$coverInitRange("src/js/widgets.js", "827:838");
__$coverInitRange("src/js/widgets.js", "902:926");
__$coverInitRange("src/js/widgets.js", "931:1140");
__$coverInitRange("src/js/widgets.js", "1145:1157");
__$coverInitRange("src/js/widgets.js", "977:1031");
__$coverInitRange("src/js/widgets.js", "1037:1100");
__$coverInitRange("src/js/widgets.js", "1106:1136");
__$coverInitRange("src/js/widgets.js", "1007:1025");
__$coverInitRange("src/js/widgets.js", "1212:1244");
__$coverInitRange("src/js/widgets.js", "1249:2353");
__$coverInitRange("src/js/widgets.js", "2358:2480");
__$coverInitRange("src/js/widgets.js", "2485:3480");
__$coverInitRange("src/js/widgets.js", "3485:3505");
__$coverInitRange("src/js/widgets.js", "1304:1338");
__$coverInitRange("src/js/widgets.js", "1344:1358");
__$coverInitRange("src/js/widgets.js", "1364:1378");
__$coverInitRange("src/js/widgets.js", "1384:1408");
__$coverInitRange("src/js/widgets.js", "1414:1466");
__$coverInitRange("src/js/widgets.js", "1472:1505");
__$coverInitRange("src/js/widgets.js", "1511:1548");
__$coverInitRange("src/js/widgets.js", "1554:1596");
__$coverInitRange("src/js/widgets.js", "1602:1639");
__$coverInitRange("src/js/widgets.js", "1645:1772");
__$coverInitRange("src/js/widgets.js", "1778:1904");
__$coverInitRange("src/js/widgets.js", "1910:2030");
__$coverInitRange("src/js/widgets.js", "2036:2056");
__$coverInitRange("src/js/widgets.js", "2062:2082");
__$coverInitRange("src/js/widgets.js", "2088:2208");
__$coverInitRange("src/js/widgets.js", "2214:2234");
__$coverInitRange("src/js/widgets.js", "2240:2260");
__$coverInitRange("src/js/widgets.js", "2266:2349");
__$coverInitRange("src/js/widgets.js", "1679:1765");
__$coverInitRange("src/js/widgets.js", "1723:1757");
__$coverInitRange("src/js/widgets.js", "1812:1897");
__$coverInitRange("src/js/widgets.js", "1855:1889");
__$coverInitRange("src/js/widgets.js", "1970:2023");
__$coverInitRange("src/js/widgets.js", "2148:2201");
__$coverInitRange("src/js/widgets.js", "2316:2341");
__$coverInitRange("src/js/widgets.js", "2406:2426");
__$coverInitRange("src/js/widgets.js", "2432:2447");
__$coverInitRange("src/js/widgets.js", "2453:2475");
__$coverInitRange("src/js/widgets.js", "2568:2632");
__$coverInitRange("src/js/widgets.js", "2638:2688");
__$coverInitRange("src/js/widgets.js", "2694:2725");
__$coverInitRange("src/js/widgets.js", "2731:2750");
__$coverInitRange("src/js/widgets.js", "2756:3063");
__$coverInitRange("src/js/widgets.js", "3069:3100");
__$coverInitRange("src/js/widgets.js", "3106:3256");
__$coverInitRange("src/js/widgets.js", "3262:3475");
__$coverInitRange("src/js/widgets.js", "2676:2682");
__$coverInitRange("src/js/widgets.js", "2796:2804");
__$coverInitRange("src/js/widgets.js", "2812:2850");
__$coverInitRange("src/js/widgets.js", "2858:2885");
__$coverInitRange("src/js/widgets.js", "2906:2972");
__$coverInitRange("src/js/widgets.js", "2980:3023");
__$coverInitRange("src/js/widgets.js", "3031:3057");
__$coverInitRange("src/js/widgets.js", "3006:3015");
__$coverInitRange("src/js/widgets.js", "3140:3172");
__$coverInitRange("src/js/widgets.js", "3180:3249");
__$coverInitRange("src/js/widgets.js", "3390:3425");
__$coverInitRange("src/js/widgets.js", "3559:3591");
__$coverInitRange("src/js/widgets.js", "3596:3923");
__$coverInitRange("src/js/widgets.js", "3928:4216");
__$coverInitRange("src/js/widgets.js", "4221:4241");
__$coverInitRange("src/js/widgets.js", "3656:3668");
__$coverInitRange("src/js/widgets.js", "3674:3734");
__$coverInitRange("src/js/widgets.js", "3740:3802");
__$coverInitRange("src/js/widgets.js", "3808:3880");
__$coverInitRange("src/js/widgets.js", "3886:3919");
__$coverInitRange("src/js/widgets.js", "3709:3728");
__$coverInitRange("src/js/widgets.js", "3978:4035");
__$coverInitRange("src/js/widgets.js", "4041:4098");
__$coverInitRange("src/js/widgets.js", "4104:4166");
__$coverInitRange("src/js/widgets.js", "4172:4194");
__$coverInitRange("src/js/widgets.js", "4200:4211");
__$coverInitRange("src/js/widgets.js", "4305:4339");
__$coverInitRange("src/js/widgets.js", "4344:4679");
__$coverInitRange("src/js/widgets.js", "4684:4968");
__$coverInitRange("src/js/widgets.js", "4973:4995");
__$coverInitRange("src/js/widgets.js", "4406:4418");
__$coverInitRange("src/js/widgets.js", "4424:4484");
__$coverInitRange("src/js/widgets.js", "4490:4554");
__$coverInitRange("src/js/widgets.js", "4560:4634");
__$coverInitRange("src/js/widgets.js", "4640:4675");
__$coverInitRange("src/js/widgets.js", "4459:4478");
__$coverInitRange("src/js/widgets.js", "4736:4791");
__$coverInitRange("src/js/widgets.js", "4797:4852");
__$coverInitRange("src/js/widgets.js", "4858:4918");
__$coverInitRange("src/js/widgets.js", "4924:4946");
__$coverInitRange("src/js/widgets.js", "4952:4963");
__$coverInitRange("src/js/widgets.js", "5068:5091");
__$coverInitRange("src/js/widgets.js", "5095:5116");
__$coverInitRange("src/js/widgets.js", "5120:5157");
__$coverInitRange("src/js/widgets.js", "5161:5198");
__$coverInitRange("src/js/widgets.js", "5202:5250");
__$coverCall('src/js/widgets.js', '0:388');
var HorizontalPanel, MultiplePanel, Panel, VerticalPanel, Widget, __hasProp = {}.hasOwnProperty, __extends = function (child, parent) {
        __$coverCall('src/js/widgets.js', '139:224');
        for (var key in parent) {
            __$coverCall('src/js/widgets.js', '165:222');
            if (__hasProp.call(parent, key))
                child[key] = parent[key];
        }
        __$coverCall('src/js/widgets.js', '226:270');
        function ctor() {
            __$coverCall('src/js/widgets.js', '244:268');
            this.constructor = child;
        }
        __$coverCall('src/js/widgets.js', '272:305');
        ctor.prototype = parent.prototype;
        __$coverCall('src/js/widgets.js', '307:335');
        child.prototype = new ctor();
        __$coverCall('src/js/widgets.js', '337:371');
        child.__super__ = parent.prototype;
        __$coverCall('src/js/widgets.js', '373:385');
        return child;
    };
__$coverCall('src/js/widgets.js', '391:868');
Widget = function () {
    __$coverCall('src/js/widgets.js', '417:717');
    function Widget(core, selector, context) {
        __$coverCall('src/js/widgets.js', '464:480');
        this.core = core;
        __$coverCall('src/js/widgets.js', '486:540');
        if (selector == null) {
            __$coverCall('src/js/widgets.js', '516:534');
            selector = '<div>';
        }
        __$coverCall('src/js/widgets.js', '546:671');
        if (selector instanceof jQuery) {
            __$coverCall('src/js/widgets.js', '586:609');
            this.element = selector;
        } else {
            __$coverCall('src/js/widgets.js', '630:665');
            this.element = $(selector, context);
        }
        __$coverCall('src/js/widgets.js', '677:713');
        this.element = evolute(this.element);
    }
    __$coverCall('src/js/widgets.js', '722:779');
    Widget.prototype.init = function () {
        __$coverCall('src/js/widgets.js', '763:774');
        return this;
    };
    __$coverCall('src/js/widgets.js', '784:843');
    Widget.prototype.adjust = function () {
        __$coverCall('src/js/widgets.js', '827:838');
        return this;
    };
    __$coverCall('src/js/widgets.js', '848:861');
    return Widget;
}();
__$coverCall('src/js/widgets.js', '871:1170');
Panel = function (_super) {
    __$coverCall('src/js/widgets.js', '902:926');
    __extends(Panel, _super);
    __$coverCall('src/js/widgets.js', '931:1140');
    function Panel(core, selector, context) {
        __$coverCall('src/js/widgets.js', '977:1031');
        if (selector == null) {
            __$coverCall('src/js/widgets.js', '1007:1025');
            selector = '<div>';
        }
        __$coverCall('src/js/widgets.js', '1037:1100');
        Panel.__super__.constructor.call(this, core, selector, context);
        __$coverCall('src/js/widgets.js', '1106:1136');
        this.element.addClass('panel');
    }
    __$coverCall('src/js/widgets.js', '1145:1157');
    return Panel;
}(Widget);
__$coverCall('src/js/widgets.js', '1173:3517');
MultiplePanel = function (_super) {
    __$coverCall('src/js/widgets.js', '1212:1244');
    __extends(MultiplePanel, _super);
    __$coverCall('src/js/widgets.js', '1249:2353');
    function MultiplePanel(core, fst, snd, splitter) {
        __$coverCall('src/js/widgets.js', '1304:1338');
        var hide, show, _this = this;
        __$coverCall('src/js/widgets.js', '1344:1358');
        this.fst = fst;
        __$coverCall('src/js/widgets.js', '1364:1378');
        this.snd = snd;
        __$coverCall('src/js/widgets.js', '1384:1408');
        this.splitter = splitter;
        __$coverCall('src/js/widgets.js', '1414:1466');
        MultiplePanel.__super__.constructor.call(this, core);
        __$coverCall('src/js/widgets.js', '1472:1505');
        this.element.addClass('multiple');
        __$coverCall('src/js/widgets.js', '1511:1548');
        this.element.append(this.fst.element);
        __$coverCall('src/js/widgets.js', '1554:1596');
        this.element.append(this.splitter.element);
        __$coverCall('src/js/widgets.js', '1602:1639');
        this.element.append(this.snd.element);
        __$coverCall('src/js/widgets.js', '1645:1772');
        show = function (callback) {
            __$coverCall('src/js/widgets.js', '1679:1765');
            if (!this.element.is(':visible')) {
                __$coverCall('src/js/widgets.js', '1723:1757');
                return this.toggle(callback, null);
            }
        };
        __$coverCall('src/js/widgets.js', '1778:1904');
        hide = function (callback) {
            __$coverCall('src/js/widgets.js', '1812:1897');
            if (this.element.is(':visible')) {
                __$coverCall('src/js/widgets.js', '1855:1889');
                return this.toggle(null, callback);
            }
        };
        __$coverCall('src/js/widgets.js', '1910:2030');
        this.fst.toggle = function (callbackOn, callbackOff) {
            __$coverCall('src/js/widgets.js', '1970:2023');
            return _this._togglePanel(0, callbackOn, callbackOff);
        };
        __$coverCall('src/js/widgets.js', '2036:2056');
        this.fst.show = show;
        __$coverCall('src/js/widgets.js', '2062:2082');
        this.fst.hide = hide;
        __$coverCall('src/js/widgets.js', '2088:2208');
        this.snd.toggle = function (callbackOn, callbackOff) {
            __$coverCall('src/js/widgets.js', '2148:2201');
            return _this._togglePanel(1, callbackOn, callbackOff);
        };
        __$coverCall('src/js/widgets.js', '2214:2234');
        this.snd.show = show;
        __$coverCall('src/js/widgets.js', '2240:2260');
        this.snd.hide = hide;
        __$coverCall('src/js/widgets.js', '2266:2349');
        this.splitter.element.dblclick(function () {
            __$coverCall('src/js/widgets.js', '2316:2341');
            return _this.snd.toggle();
        });
    }
    __$coverCall('src/js/widgets.js', '2358:2480');
    MultiplePanel.prototype.init = function () {
        __$coverCall('src/js/widgets.js', '2406:2426');
        this.splitter.init();
        __$coverCall('src/js/widgets.js', '2432:2447');
        this.fst.init();
        __$coverCall('src/js/widgets.js', '2453:2475');
        return this.snd.init();
    };
    __$coverCall('src/js/widgets.js', '2485:3480');
    MultiplePanel.prototype._togglePanel = function (to, callbackOn, callbackOff) {
        __$coverCall('src/js/widgets.js', '2568:2632');
        var callbackDone, end, volume, _callbackDone, _this = this;
        __$coverCall('src/js/widgets.js', '2638:2688');
        if (MultiplePanel._animating) {
            __$coverCall('src/js/widgets.js', '2676:2682');
            return;
        }
        __$coverCall('src/js/widgets.js', '2694:2725');
        volume = this.splitter.volume();
        __$coverCall('src/js/widgets.js', '2731:2750');
        callbackDone = null;
        __$coverCall('src/js/widgets.js', '2756:3063');
        if (0 < volume && volume < 1) {
            __$coverCall('src/js/widgets.js', '2796:2804');
            end = to;
            __$coverCall('src/js/widgets.js', '2812:2850');
            this.splitter._previousVolume = volume;
            __$coverCall('src/js/widgets.js', '2858:2885');
            _callbackDone = callbackOff;
        } else {
            __$coverCall('src/js/widgets.js', '2906:2972');
            end = this.splitter._previousVolume || this.splitter.defaultVolume;
            __$coverCall('src/js/widgets.js', '2980:3023');
            if (end === to) {
                __$coverCall('src/js/widgets.js', '3006:3015');
                end = 0.5;
            }
            __$coverCall('src/js/widgets.js', '3031:3057');
            _callbackDone = callbackOn;
        }
        __$coverCall('src/js/widgets.js', '3069:3100');
        MultiplePanel._animating = true;
        __$coverCall('src/js/widgets.js', '3106:3256');
        callbackDone = function () {
            __$coverCall('src/js/widgets.js', '3140:3172');
            MultiplePanel._animating = false;
            __$coverCall('src/js/widgets.js', '3180:3249');
            return typeof _callbackDone === 'function' ? _callbackDone() : void 0;
        };
        __$coverCall('src/js/widgets.js', '3262:3475');
        return animate({
            start: volume,
            end: end,
            duration: 500,
            callbackEach: function (value, epoch) {
                __$coverCall('src/js/widgets.js', '3390:3425');
                return _this.splitter.volume(value);
            },
            callbackDone: callbackDone
        });
    };
    __$coverCall('src/js/widgets.js', '3485:3505');
    return MultiplePanel;
}(Panel);
__$coverCall('src/js/widgets.js', '3520:4261');
VerticalPanel = function (_super) {
    __$coverCall('src/js/widgets.js', '3559:3591');
    __extends(VerticalPanel, _super);
    __$coverCall('src/js/widgets.js', '3596:3923');
    function VerticalPanel(core, fst, snd, defaultVolume) {
        __$coverCall('src/js/widgets.js', '3656:3668');
        var splitter;
        __$coverCall('src/js/widgets.js', '3674:3734');
        if (defaultVolume == null) {
            __$coverCall('src/js/widgets.js', '3709:3728');
            defaultVolume = 0.5;
        }
        __$coverCall('src/js/widgets.js', '3740:3802');
        splitter = new VerticalSplitter(core, fst, snd, defaultVolume);
        __$coverCall('src/js/widgets.js', '3808:3880');
        VerticalPanel.__super__.constructor.call(this, core, fst, snd, splitter);
        __$coverCall('src/js/widgets.js', '3886:3919');
        this.element.addClass('vertical');
    }
    __$coverCall('src/js/widgets.js', '3928:4216');
    VerticalPanel.prototype.adjust = function () {
        __$coverCall('src/js/widgets.js', '3978:4035');
        this.fst.element.outerHeight(true, this.element.height());
        __$coverCall('src/js/widgets.js', '4041:4098');
        this.snd.element.outerHeight(true, this.element.height());
        __$coverCall('src/js/widgets.js', '4104:4166');
        this.splitter.element.outerHeight(true, this.element.height());
        __$coverCall('src/js/widgets.js', '4172:4194');
        this.splitter.adjust();
        __$coverCall('src/js/widgets.js', '4200:4211');
        return this;
    };
    __$coverCall('src/js/widgets.js', '4221:4241');
    return VerticalPanel;
}(MultiplePanel);
__$coverCall('src/js/widgets.js', '4264:5015');
HorizontalPanel = function (_super) {
    __$coverCall('src/js/widgets.js', '4305:4339');
    __extends(HorizontalPanel, _super);
    __$coverCall('src/js/widgets.js', '4344:4679');
    function HorizontalPanel(core, fst, snd, defaultVolume) {
        __$coverCall('src/js/widgets.js', '4406:4418');
        var splitter;
        __$coverCall('src/js/widgets.js', '4424:4484');
        if (defaultVolume == null) {
            __$coverCall('src/js/widgets.js', '4459:4478');
            defaultVolume = 0.5;
        }
        __$coverCall('src/js/widgets.js', '4490:4554');
        splitter = new HorizontalSplitter(core, fst, snd, defaultVolume);
        __$coverCall('src/js/widgets.js', '4560:4634');
        HorizontalPanel.__super__.constructor.call(this, core, fst, snd, splitter);
        __$coverCall('src/js/widgets.js', '4640:4675');
        this.element.addClass('horizontal');
    }
    __$coverCall('src/js/widgets.js', '4684:4968');
    HorizontalPanel.prototype.adjust = function () {
        __$coverCall('src/js/widgets.js', '4736:4791');
        this.fst.element.outerWidth(true, this.element.width());
        __$coverCall('src/js/widgets.js', '4797:4852');
        this.snd.element.outerWidth(true, this.element.width());
        __$coverCall('src/js/widgets.js', '4858:4918');
        this.splitter.element.outerWidth(true, this.element.width());
        __$coverCall('src/js/widgets.js', '4924:4946');
        this.splitter.adjust();
        __$coverCall('src/js/widgets.js', '4952:4963');
        return this;
    };
    __$coverCall('src/js/widgets.js', '4973:4995');
    return HorizontalPanel;
}(MultiplePanel);
__$coverCall('src/js/widgets.js', '5018:5254');
namespace('Jencil.widgets', function (exports) {
    __$coverCall('src/js/widgets.js', '5068:5091');
    exports.Widget = Widget;
    __$coverCall('src/js/widgets.js', '5095:5116');
    exports.Panel = Panel;
    __$coverCall('src/js/widgets.js', '5120:5157');
    exports.MultiplePanel = MultiplePanel;
    __$coverCall('src/js/widgets.js', '5161:5198');
    exports.VerticalPanel = VerticalPanel;
    __$coverCall('src/js/widgets.js', '5202:5250');
    return exports.HorizontalPanel = HorizontalPanel;
});