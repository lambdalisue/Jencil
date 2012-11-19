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
__$coverInit("js/workspace.js", "var Bar, Statusbar, Toolbar, Workspace, Wrapper,\n  __hasProp = {}.hasOwnProperty,\n  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };\n\nWrapper = (function(_super) {\n\n  __extends(Wrapper, _super);\n\n  function Wrapper(core, width, height) {\n    var _this = this;\n    Wrapper.__super__.constructor.call(this, core);\n    this.element.addClass('jencil wrapper');\n    this.element.width(width);\n    this.element.height(height);\n    this.workspace = new Workspace(this.core);\n    this.workspace.element.appendTo(this.element);\n    this.curtain = {\n      on: function() {\n        var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;\n        if ((_ref = _this.core.editor()) != null) {\n          if ((_ref1 = _ref.curtain) != null) {\n            _ref1.on();\n          }\n        }\n        if ((_ref2 = _this.core.viewer()) != null) {\n          if ((_ref3 = _ref2.curtain) != null) {\n            _ref3.on();\n          }\n        }\n        if ((_ref4 = _this.core.helper()) != null) {\n          if ((_ref5 = _ref4.curtain) != null) {\n            _ref5.on();\n          }\n        }\n        return _this.adjust();\n      },\n      refresh: function() {\n        var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;\n        if ((_ref = _this.core.editor()) != null) {\n          if ((_ref1 = _ref.curtain) != null) {\n            _ref1.refresh();\n          }\n        }\n        if ((_ref2 = _this.core.viewer()) != null) {\n          if ((_ref3 = _ref2.curtain) != null) {\n            _ref3.refresh();\n          }\n        }\n        if ((_ref4 = _this.core.helper()) != null) {\n          if ((_ref5 = _ref4.curtain) != null) {\n            _ref5.refresh();\n          }\n        }\n        return _this.adjust();\n      },\n      off: function() {\n        var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;\n        if ((_ref = _this.core.editor()) != null) {\n          if ((_ref1 = _ref.curtain) != null) {\n            _ref1.off();\n          }\n        }\n        if ((_ref2 = _this.core.viewer()) != null) {\n          if ((_ref3 = _ref2.curtain) != null) {\n            _ref3.off();\n          }\n        }\n        if ((_ref4 = _this.core.helper()) != null) {\n          if ((_ref5 = _ref4.curtain) != null) {\n            _ref5.off();\n          }\n        }\n        return _this.adjust();\n      }\n    };\n  }\n\n  Wrapper.prototype.init = function(profileNameOrInstance) {\n    var _this = this;\n    if ((this.element.resizable != null) && this.core.options.resizable === true) {\n      this.element.resizable({\n        start: function() {\n          return _this.curtain.on();\n        },\n        resize: function() {\n          return _this.curtain.refresh();\n        },\n        stop: function() {\n          return _this.curtain.off();\n        }\n      });\n    }\n    this.workspace.profile(profileNameOrInstance);\n    this.workspace.init();\n    return this;\n  };\n\n  Wrapper.prototype.adjust = function() {\n    this.workspace.element.outerWidth(true, this.element.width());\n    this.workspace.element.outerHeight(true, this.element.height());\n    this.workspace.adjust();\n    return this;\n  };\n\n  return Wrapper;\n\n})(Panel);\n\nWorkspace = (function(_super) {\n\n  __extends(Workspace, _super);\n\n  function Workspace(core) {\n    Workspace.__super__.constructor.call(this, core);\n    this.element.addClass('workspace');\n  }\n\n  Workspace.prototype.profile = function(profileNameOrInstance) {\n    var button, profile, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3,\n      _this = this;\n    if (profileNameOrInstance != null) {\n      if (typeof profileNameOrInstance === 'string') {\n        profileNameOrInstance = this.core.options.profiles[profileNameOrInstance];\n      }\n      profile = jQuery.extend(true, DefaultProfile, profileNameOrInstance);\n      profile.defaultVolume = this.core.options.defaultVolume || profile.defaultVolume;\n      profile.defaultVolume2 = this.core.options.defaultVolume2 || profile.defaultVolume2;\n      this.element.empty();\n      this.mainPanel = new profile.mainPanelClass(this.core, profile);\n      if ((_ref = this.mainPanel.editorPanel) != null) {\n        _ref.val(this.core.element.val());\n      }\n      if ((_ref1 = this.mainPanel.editorPanel) != null) {\n        _ref1.change(function(value) {\n          return _this.core.element.val(value);\n        });\n      }\n      this.toolbar = new Toolbar(this.core);\n      _ref2 = profile.toolbarButtons;\n      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {\n        button = _ref2[_i];\n        button = buttonFactory(this.core, button);\n        this.toolbar.addButton(button);\n      }\n      this.statusbar = new Statusbar(this.core);\n      _ref3 = profile.statusbarButtons;\n      for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {\n        button = _ref3[_j];\n        button = buttonFactory(this.core, button);\n        this.statusbar.addButton(button);\n      }\n      this.element.append(this.toolbar.element);\n      this.element.append(this.mainPanel.element);\n      this.element.append(this.statusbar.element);\n      this._profile = profile;\n      return this;\n    }\n    return this._profile;\n  };\n\n  Workspace.prototype.init = function() {\n    this.toolbar.init();\n    this.statusbar.init();\n    return this.mainPanel.init();\n  };\n\n  Workspace.prototype.adjust = function() {\n    var offset1, offset2;\n    this.toolbar.element.outerWidth(true, this.element.width());\n    this.statusbar.element.outerWidth(true, this.element.width());\n    this.mainPanel.element.outerWidth(true, this.element.width());\n    this.mainPanel.element.outerHeight(true, this.element.height());\n    this.mainPanel.adjust();\n    offset1 = this.toolbar.element.outerHeight(true);\n    offset2 = this.statusbar.element.outerHeight(true);\n    this.mainPanel.element.outerHeight(true, this.element.height() - (offset1 + offset2));\n    this.toolbar.adjust();\n    this.statusbar.adjust();\n    this.mainPanel.adjust();\n    return this;\n  };\n\n  Workspace.prototype.update = function(force) {\n    if (this.mainPanel.editorPanel && this.mainPanel.viewerPanel) {\n      return this.mainPanel.viewerPanel.update(this.mainPanel.editorPanel.val(), force);\n    }\n  };\n\n  return Workspace;\n\n})(Panel);\n\nBar = (function(_super) {\n\n  __extends(Bar, _super);\n\n  function Bar(core) {\n    Bar.__super__.constructor.call(this, core);\n    this._buttons = [];\n  }\n\n  Bar.prototype.init = function() {\n    var button, _i, _len, _ref;\n    _ref = this._buttons;\n    for (_i = 0, _len = _ref.length; _i < _len; _i++) {\n      button = _ref[_i];\n      button.init();\n    }\n    return this;\n  };\n\n  Bar.prototype.addButton = function(button) {\n    this._buttons.push(button);\n    return this.element.append(button.element);\n  };\n\n  return Bar;\n\n})(Panel);\n\nToolbar = (function(_super) {\n\n  __extends(Toolbar, _super);\n\n  function Toolbar(core) {\n    Toolbar.__super__.constructor.call(this, core);\n    this.element.addClass('toolbar');\n  }\n\n  return Toolbar;\n\n})(Bar);\n\nStatusbar = (function(_super) {\n\n  __extends(Statusbar, _super);\n\n  function Statusbar(core) {\n    Statusbar.__super__.constructor.call(this, core);\n    this.element.addClass('statusbar');\n  }\n\n  return Statusbar;\n\n})(Bar);\n\nnamespace('Jencil.workspace', function(exports) {\n  exports.Wrapper = Wrapper;\n  exports.Workspace = Workspace;\n  exports.Bar = Bar;\n  exports.Toolbar = Toolbar;\n  return exports.Statusbar = Statusbar;\n});\n");
__$coverInitRange("js/workspace.js", "0:371");
__$coverInitRange("js/workspace.js", "374:3295");
__$coverInitRange("js/workspace.js", "3298:6310");
__$coverInitRange("js/workspace.js", "6313:6849");
__$coverInitRange("js/workspace.js", "6852:7062");
__$coverInitRange("js/workspace.js", "7065:7287");
__$coverInitRange("js/workspace.js", "7290:7494");
__$coverInitRange("js/workspace.js", "122:207");
__$coverInitRange("js/workspace.js", "209:253");
__$coverInitRange("js/workspace.js", "255:288");
__$coverInitRange("js/workspace.js", "290:318");
__$coverInitRange("js/workspace.js", "320:354");
__$coverInitRange("js/workspace.js", "356:368");
__$coverInitRange("js/workspace.js", "148:205");
__$coverInitRange("js/workspace.js", "227:251");
__$coverInitRange("js/workspace.js", "407:433");
__$coverInitRange("js/workspace.js", "438:2486");
__$coverInitRange("js/workspace.js", "2491:3034");
__$coverInitRange("js/workspace.js", "3039:3264");
__$coverInitRange("js/workspace.js", "3269:3283");
__$coverInitRange("js/workspace.js", "482:498");
__$coverInitRange("js/workspace.js", "504:550");
__$coverInitRange("js/workspace.js", "556:595");
__$coverInitRange("js/workspace.js", "601:626");
__$coverInitRange("js/workspace.js", "632:659");
__$coverInitRange("js/workspace.js", "665:706");
__$coverInitRange("js/workspace.js", "712:757");
__$coverInitRange("js/workspace.js", "763:2482");
__$coverInitRange("js/workspace.js", "811:854");
__$coverInitRange("js/workspace.js", "864:1000");
__$coverInitRange("js/workspace.js", "1010:1148");
__$coverInitRange("js/workspace.js", "1158:1296");
__$coverInitRange("js/workspace.js", "1306:1327");
__$coverInitRange("js/workspace.js", "918:990");
__$coverInitRange("js/workspace.js", "968:978");
__$coverInitRange("js/workspace.js", "1065:1138");
__$coverInitRange("js/workspace.js", "1116:1126");
__$coverInitRange("js/workspace.js", "1213:1286");
__$coverInitRange("js/workspace.js", "1264:1274");
__$coverInitRange("js/workspace.js", "1374:1417");
__$coverInitRange("js/workspace.js", "1427:1568");
__$coverInitRange("js/workspace.js", "1578:1721");
__$coverInitRange("js/workspace.js", "1731:1874");
__$coverInitRange("js/workspace.js", "1884:1905");
__$coverInitRange("js/workspace.js", "1481:1558");
__$coverInitRange("js/workspace.js", "1531:1546");
__$coverInitRange("js/workspace.js", "1633:1711");
__$coverInitRange("js/workspace.js", "1684:1699");
__$coverInitRange("js/workspace.js", "1786:1864");
__$coverInitRange("js/workspace.js", "1837:1852");
__$coverInitRange("js/workspace.js", "1948:1991");
__$coverInitRange("js/workspace.js", "2001:2138");
__$coverInitRange("js/workspace.js", "2148:2287");
__$coverInitRange("js/workspace.js", "2297:2436");
__$coverInitRange("js/workspace.js", "2446:2467");
__$coverInitRange("js/workspace.js", "2055:2128");
__$coverInitRange("js/workspace.js", "2105:2116");
__$coverInitRange("js/workspace.js", "2203:2277");
__$coverInitRange("js/workspace.js", "2254:2265");
__$coverInitRange("js/workspace.js", "2352:2426");
__$coverInitRange("js/workspace.js", "2403:2414");
__$coverInitRange("js/workspace.js", "2554:2570");
__$coverInitRange("js/workspace.js", "2576:2934");
__$coverInitRange("js/workspace.js", "2940:2985");
__$coverInitRange("js/workspace.js", "2991:3012");
__$coverInitRange("js/workspace.js", "3018:3029");
__$coverInitRange("js/workspace.js", "2662:2928");
__$coverInitRange("js/workspace.js", "2725:2750");
__$coverInitRange("js/workspace.js", "2802:2832");
__$coverInitRange("js/workspace.js", "2882:2908");
__$coverInitRange("js/workspace.js", "3083:3144");
__$coverInitRange("js/workspace.js", "3150:3213");
__$coverInitRange("js/workspace.js", "3219:3242");
__$coverInitRange("js/workspace.js", "3248:3259");
__$coverInitRange("js/workspace.js", "3333:3361");
__$coverInitRange("js/workspace.js", "3366:3489");
__$coverInitRange("js/workspace.js", "3494:5249");
__$coverInitRange("js/workspace.js", "5254:5383");
__$coverInitRange("js/workspace.js", "5388:6059");
__$coverInitRange("js/workspace.js", "6064:6277");
__$coverInitRange("js/workspace.js", "6282:6298");
__$coverInitRange("js/workspace.js", "3397:3445");
__$coverInitRange("js/workspace.js", "3451:3485");
__$coverInitRange("js/workspace.js", "3562:3649");
__$coverInitRange("js/workspace.js", "3655:5218");
__$coverInitRange("js/workspace.js", "5224:5244");
__$coverInitRange("js/workspace.js", "3698:3836");
__$coverInitRange("js/workspace.js", "3844:3912");
__$coverInitRange("js/workspace.js", "3920:4000");
__$coverInitRange("js/workspace.js", "4008:4091");
__$coverInitRange("js/workspace.js", "4099:4119");
__$coverInitRange("js/workspace.js", "4127:4190");
__$coverInitRange("js/workspace.js", "4198:4298");
__$coverInitRange("js/workspace.js", "4306:4463");
__$coverInitRange("js/workspace.js", "4471:4508");
__$coverInitRange("js/workspace.js", "4516:4546");
__$coverInitRange("js/workspace.js", "4554:4732");
__$coverInitRange("js/workspace.js", "4740:4781");
__$coverInitRange("js/workspace.js", "4789:4821");
__$coverInitRange("js/workspace.js", "4829:5011");
__$coverInitRange("js/workspace.js", "5019:5060");
__$coverInitRange("js/workspace.js", "5068:5111");
__$coverInitRange("js/workspace.js", "5119:5162");
__$coverInitRange("js/workspace.js", "5170:5193");
__$coverInitRange("js/workspace.js", "5201:5212");
__$coverInitRange("js/workspace.js", "3755:3828");
__$coverInitRange("js/workspace.js", "4257:4290");
__$coverInitRange("js/workspace.js", "4366:4455");
__$coverInitRange("js/workspace.js", "4407:4443");
__$coverInitRange("js/workspace.js", "4615:4633");
__$coverInitRange("js/workspace.js", "4643:4684");
__$coverInitRange("js/workspace.js", "4694:4724");
__$coverInitRange("js/workspace.js", "4892:4910");
__$coverInitRange("js/workspace.js", "4920:4961");
__$coverInitRange("js/workspace.js", "4971:5003");
__$coverInitRange("js/workspace.js", "5298:5317");
__$coverInitRange("js/workspace.js", "5323:5344");
__$coverInitRange("js/workspace.js", "5350:5378");
__$coverInitRange("js/workspace.js", "5434:5454");
__$coverInitRange("js/workspace.js", "5460:5519");
__$coverInitRange("js/workspace.js", "5525:5586");
__$coverInitRange("js/workspace.js", "5592:5653");
__$coverInitRange("js/workspace.js", "5659:5722");
__$coverInitRange("js/workspace.js", "5728:5751");
__$coverInitRange("js/workspace.js", "5757:5805");
__$coverInitRange("js/workspace.js", "5811:5861");
__$coverInitRange("js/workspace.js", "5867:5952");
__$coverInitRange("js/workspace.js", "5958:5979");
__$coverInitRange("js/workspace.js", "5985:6008");
__$coverInitRange("js/workspace.js", "6014:6037");
__$coverInitRange("js/workspace.js", "6043:6054");
__$coverInitRange("js/workspace.js", "6115:6272");
__$coverInitRange("js/workspace.js", "6185:6266");
__$coverInitRange("js/workspace.js", "6342:6364");
__$coverInitRange("js/workspace.js", "6369:6464");
__$coverInitRange("js/workspace.js", "6469:6689");
__$coverInitRange("js/workspace.js", "6694:6822");
__$coverInitRange("js/workspace.js", "6827:6837");
__$coverInitRange("js/workspace.js", "6394:6436");
__$coverInitRange("js/workspace.js", "6442:6460");
__$coverInitRange("js/workspace.js", "6507:6533");
__$coverInitRange("js/workspace.js", "6539:6559");
__$coverInitRange("js/workspace.js", "6565:6667");
__$coverInitRange("js/workspace.js", "6673:6684");
__$coverInitRange("js/workspace.js", "6623:6640");
__$coverInitRange("js/workspace.js", "6648:6661");
__$coverInitRange("js/workspace.js", "6743:6769");
__$coverInitRange("js/workspace.js", "6775:6817");
__$coverInitRange("js/workspace.js", "6885:6911");
__$coverInitRange("js/workspace.js", "6916:7033");
__$coverInitRange("js/workspace.js", "7038:7052");
__$coverInitRange("js/workspace.js", "6945:6991");
__$coverInitRange("js/workspace.js", "6997:7029");
__$coverInitRange("js/workspace.js", "7100:7128");
__$coverInitRange("js/workspace.js", "7133:7256");
__$coverInitRange("js/workspace.js", "7261:7277");
__$coverInitRange("js/workspace.js", "7164:7212");
__$coverInitRange("js/workspace.js", "7218:7252");
__$coverInitRange("js/workspace.js", "7342:7367");
__$coverInitRange("js/workspace.js", "7371:7400");
__$coverInitRange("js/workspace.js", "7404:7421");
__$coverInitRange("js/workspace.js", "7425:7450");
__$coverInitRange("js/workspace.js", "7454:7490");
__$coverCall('js/workspace.js', '0:371');
var Bar, Statusbar, Toolbar, Workspace, Wrapper, __hasProp = {}.hasOwnProperty, __extends = function (child, parent) {
        __$coverCall('js/workspace.js', '122:207');
        for (var key in parent) {
            __$coverCall('js/workspace.js', '148:205');
            if (__hasProp.call(parent, key))
                child[key] = parent[key];
        }
        __$coverCall('js/workspace.js', '209:253');
        function ctor() {
            __$coverCall('js/workspace.js', '227:251');
            this.constructor = child;
        }
        __$coverCall('js/workspace.js', '255:288');
        ctor.prototype = parent.prototype;
        __$coverCall('js/workspace.js', '290:318');
        child.prototype = new ctor();
        __$coverCall('js/workspace.js', '320:354');
        child.__super__ = parent.prototype;
        __$coverCall('js/workspace.js', '356:368');
        return child;
    };
__$coverCall('js/workspace.js', '374:3295');
Wrapper = function (_super) {
    __$coverCall('js/workspace.js', '407:433');
    __extends(Wrapper, _super);
    __$coverCall('js/workspace.js', '438:2486');
    function Wrapper(core, width, height) {
        __$coverCall('js/workspace.js', '482:498');
        var _this = this;
        __$coverCall('js/workspace.js', '504:550');
        Wrapper.__super__.constructor.call(this, core);
        __$coverCall('js/workspace.js', '556:595');
        this.element.addClass('jencil wrapper');
        __$coverCall('js/workspace.js', '601:626');
        this.element.width(width);
        __$coverCall('js/workspace.js', '632:659');
        this.element.height(height);
        __$coverCall('js/workspace.js', '665:706');
        this.workspace = new Workspace(this.core);
        __$coverCall('js/workspace.js', '712:757');
        this.workspace.element.appendTo(this.element);
        __$coverCall('js/workspace.js', '763:2482');
        this.curtain = {
            on: function () {
                __$coverCall('js/workspace.js', '811:854');
                var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
                __$coverCall('js/workspace.js', '864:1000');
                if ((_ref = _this.core.editor()) != null) {
                    __$coverCall('js/workspace.js', '918:990');
                    if ((_ref1 = _ref.curtain) != null) {
                        __$coverCall('js/workspace.js', '968:978');
                        _ref1.on();
                    }
                }
                __$coverCall('js/workspace.js', '1010:1148');
                if ((_ref2 = _this.core.viewer()) != null) {
                    __$coverCall('js/workspace.js', '1065:1138');
                    if ((_ref3 = _ref2.curtain) != null) {
                        __$coverCall('js/workspace.js', '1116:1126');
                        _ref3.on();
                    }
                }
                __$coverCall('js/workspace.js', '1158:1296');
                if ((_ref4 = _this.core.helper()) != null) {
                    __$coverCall('js/workspace.js', '1213:1286');
                    if ((_ref5 = _ref4.curtain) != null) {
                        __$coverCall('js/workspace.js', '1264:1274');
                        _ref5.on();
                    }
                }
                __$coverCall('js/workspace.js', '1306:1327');
                return _this.adjust();
            },
            refresh: function () {
                __$coverCall('js/workspace.js', '1374:1417');
                var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
                __$coverCall('js/workspace.js', '1427:1568');
                if ((_ref = _this.core.editor()) != null) {
                    __$coverCall('js/workspace.js', '1481:1558');
                    if ((_ref1 = _ref.curtain) != null) {
                        __$coverCall('js/workspace.js', '1531:1546');
                        _ref1.refresh();
                    }
                }
                __$coverCall('js/workspace.js', '1578:1721');
                if ((_ref2 = _this.core.viewer()) != null) {
                    __$coverCall('js/workspace.js', '1633:1711');
                    if ((_ref3 = _ref2.curtain) != null) {
                        __$coverCall('js/workspace.js', '1684:1699');
                        _ref3.refresh();
                    }
                }
                __$coverCall('js/workspace.js', '1731:1874');
                if ((_ref4 = _this.core.helper()) != null) {
                    __$coverCall('js/workspace.js', '1786:1864');
                    if ((_ref5 = _ref4.curtain) != null) {
                        __$coverCall('js/workspace.js', '1837:1852');
                        _ref5.refresh();
                    }
                }
                __$coverCall('js/workspace.js', '1884:1905');
                return _this.adjust();
            },
            off: function () {
                __$coverCall('js/workspace.js', '1948:1991');
                var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
                __$coverCall('js/workspace.js', '2001:2138');
                if ((_ref = _this.core.editor()) != null) {
                    __$coverCall('js/workspace.js', '2055:2128');
                    if ((_ref1 = _ref.curtain) != null) {
                        __$coverCall('js/workspace.js', '2105:2116');
                        _ref1.off();
                    }
                }
                __$coverCall('js/workspace.js', '2148:2287');
                if ((_ref2 = _this.core.viewer()) != null) {
                    __$coverCall('js/workspace.js', '2203:2277');
                    if ((_ref3 = _ref2.curtain) != null) {
                        __$coverCall('js/workspace.js', '2254:2265');
                        _ref3.off();
                    }
                }
                __$coverCall('js/workspace.js', '2297:2436');
                if ((_ref4 = _this.core.helper()) != null) {
                    __$coverCall('js/workspace.js', '2352:2426');
                    if ((_ref5 = _ref4.curtain) != null) {
                        __$coverCall('js/workspace.js', '2403:2414');
                        _ref5.off();
                    }
                }
                __$coverCall('js/workspace.js', '2446:2467');
                return _this.adjust();
            }
        };
    }
    __$coverCall('js/workspace.js', '2491:3034');
    Wrapper.prototype.init = function (profileNameOrInstance) {
        __$coverCall('js/workspace.js', '2554:2570');
        var _this = this;
        __$coverCall('js/workspace.js', '2576:2934');
        if (this.element.resizable != null && this.core.options.resizable === true) {
            __$coverCall('js/workspace.js', '2662:2928');
            this.element.resizable({
                start: function () {
                    __$coverCall('js/workspace.js', '2725:2750');
                    return _this.curtain.on();
                },
                resize: function () {
                    __$coverCall('js/workspace.js', '2802:2832');
                    return _this.curtain.refresh();
                },
                stop: function () {
                    __$coverCall('js/workspace.js', '2882:2908');
                    return _this.curtain.off();
                }
            });
        }
        __$coverCall('js/workspace.js', '2940:2985');
        this.workspace.profile(profileNameOrInstance);
        __$coverCall('js/workspace.js', '2991:3012');
        this.workspace.init();
        __$coverCall('js/workspace.js', '3018:3029');
        return this;
    };
    __$coverCall('js/workspace.js', '3039:3264');
    Wrapper.prototype.adjust = function () {
        __$coverCall('js/workspace.js', '3083:3144');
        this.workspace.element.outerWidth(true, this.element.width());
        __$coverCall('js/workspace.js', '3150:3213');
        this.workspace.element.outerHeight(true, this.element.height());
        __$coverCall('js/workspace.js', '3219:3242');
        this.workspace.adjust();
        __$coverCall('js/workspace.js', '3248:3259');
        return this;
    };
    __$coverCall('js/workspace.js', '3269:3283');
    return Wrapper;
}(Panel);
__$coverCall('js/workspace.js', '3298:6310');
Workspace = function (_super) {
    __$coverCall('js/workspace.js', '3333:3361');
    __extends(Workspace, _super);
    __$coverCall('js/workspace.js', '3366:3489');
    function Workspace(core) {
        __$coverCall('js/workspace.js', '3397:3445');
        Workspace.__super__.constructor.call(this, core);
        __$coverCall('js/workspace.js', '3451:3485');
        this.element.addClass('workspace');
    }
    __$coverCall('js/workspace.js', '3494:5249');
    Workspace.prototype.profile = function (profileNameOrInstance) {
        __$coverCall('js/workspace.js', '3562:3649');
        var button, profile, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3, _this = this;
        __$coverCall('js/workspace.js', '3655:5218');
        if (profileNameOrInstance != null) {
            __$coverCall('js/workspace.js', '3698:3836');
            if (typeof profileNameOrInstance === 'string') {
                __$coverCall('js/workspace.js', '3755:3828');
                profileNameOrInstance = this.core.options.profiles[profileNameOrInstance];
            }
            __$coverCall('js/workspace.js', '3844:3912');
            profile = jQuery.extend(true, DefaultProfile, profileNameOrInstance);
            __$coverCall('js/workspace.js', '3920:4000');
            profile.defaultVolume = this.core.options.defaultVolume || profile.defaultVolume;
            __$coverCall('js/workspace.js', '4008:4091');
            profile.defaultVolume2 = this.core.options.defaultVolume2 || profile.defaultVolume2;
            __$coverCall('js/workspace.js', '4099:4119');
            this.element.empty();
            __$coverCall('js/workspace.js', '4127:4190');
            this.mainPanel = new profile.mainPanelClass(this.core, profile);
            __$coverCall('js/workspace.js', '4198:4298');
            if ((_ref = this.mainPanel.editorPanel) != null) {
                __$coverCall('js/workspace.js', '4257:4290');
                _ref.val(this.core.element.val());
            }
            __$coverCall('js/workspace.js', '4306:4463');
            if ((_ref1 = this.mainPanel.editorPanel) != null) {
                __$coverCall('js/workspace.js', '4366:4455');
                _ref1.change(function (value) {
                    __$coverCall('js/workspace.js', '4407:4443');
                    return _this.core.element.val(value);
                });
            }
            __$coverCall('js/workspace.js', '4471:4508');
            this.toolbar = new Toolbar(this.core);
            __$coverCall('js/workspace.js', '4516:4546');
            _ref2 = profile.toolbarButtons;
            __$coverCall('js/workspace.js', '4554:4732');
            for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
                __$coverCall('js/workspace.js', '4615:4633');
                button = _ref2[_i];
                __$coverCall('js/workspace.js', '4643:4684');
                button = buttonFactory(this.core, button);
                __$coverCall('js/workspace.js', '4694:4724');
                this.toolbar.addButton(button);
            }
            __$coverCall('js/workspace.js', '4740:4781');
            this.statusbar = new Statusbar(this.core);
            __$coverCall('js/workspace.js', '4789:4821');
            _ref3 = profile.statusbarButtons;
            __$coverCall('js/workspace.js', '4829:5011');
            for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
                __$coverCall('js/workspace.js', '4892:4910');
                button = _ref3[_j];
                __$coverCall('js/workspace.js', '4920:4961');
                button = buttonFactory(this.core, button);
                __$coverCall('js/workspace.js', '4971:5003');
                this.statusbar.addButton(button);
            }
            __$coverCall('js/workspace.js', '5019:5060');
            this.element.append(this.toolbar.element);
            __$coverCall('js/workspace.js', '5068:5111');
            this.element.append(this.mainPanel.element);
            __$coverCall('js/workspace.js', '5119:5162');
            this.element.append(this.statusbar.element);
            __$coverCall('js/workspace.js', '5170:5193');
            this._profile = profile;
            __$coverCall('js/workspace.js', '5201:5212');
            return this;
        }
        __$coverCall('js/workspace.js', '5224:5244');
        return this._profile;
    };
    __$coverCall('js/workspace.js', '5254:5383');
    Workspace.prototype.init = function () {
        __$coverCall('js/workspace.js', '5298:5317');
        this.toolbar.init();
        __$coverCall('js/workspace.js', '5323:5344');
        this.statusbar.init();
        __$coverCall('js/workspace.js', '5350:5378');
        return this.mainPanel.init();
    };
    __$coverCall('js/workspace.js', '5388:6059');
    Workspace.prototype.adjust = function () {
        __$coverCall('js/workspace.js', '5434:5454');
        var offset1, offset2;
        __$coverCall('js/workspace.js', '5460:5519');
        this.toolbar.element.outerWidth(true, this.element.width());
        __$coverCall('js/workspace.js', '5525:5586');
        this.statusbar.element.outerWidth(true, this.element.width());
        __$coverCall('js/workspace.js', '5592:5653');
        this.mainPanel.element.outerWidth(true, this.element.width());
        __$coverCall('js/workspace.js', '5659:5722');
        this.mainPanel.element.outerHeight(true, this.element.height());
        __$coverCall('js/workspace.js', '5728:5751');
        this.mainPanel.adjust();
        __$coverCall('js/workspace.js', '5757:5805');
        offset1 = this.toolbar.element.outerHeight(true);
        __$coverCall('js/workspace.js', '5811:5861');
        offset2 = this.statusbar.element.outerHeight(true);
        __$coverCall('js/workspace.js', '5867:5952');
        this.mainPanel.element.outerHeight(true, this.element.height() - (offset1 + offset2));
        __$coverCall('js/workspace.js', '5958:5979');
        this.toolbar.adjust();
        __$coverCall('js/workspace.js', '5985:6008');
        this.statusbar.adjust();
        __$coverCall('js/workspace.js', '6014:6037');
        this.mainPanel.adjust();
        __$coverCall('js/workspace.js', '6043:6054');
        return this;
    };
    __$coverCall('js/workspace.js', '6064:6277');
    Workspace.prototype.update = function (force) {
        __$coverCall('js/workspace.js', '6115:6272');
        if (this.mainPanel.editorPanel && this.mainPanel.viewerPanel) {
            __$coverCall('js/workspace.js', '6185:6266');
            return this.mainPanel.viewerPanel.update(this.mainPanel.editorPanel.val(), force);
        }
    };
    __$coverCall('js/workspace.js', '6282:6298');
    return Workspace;
}(Panel);
__$coverCall('js/workspace.js', '6313:6849');
Bar = function (_super) {
    __$coverCall('js/workspace.js', '6342:6364');
    __extends(Bar, _super);
    __$coverCall('js/workspace.js', '6369:6464');
    function Bar(core) {
        __$coverCall('js/workspace.js', '6394:6436');
        Bar.__super__.constructor.call(this, core);
        __$coverCall('js/workspace.js', '6442:6460');
        this._buttons = [];
    }
    __$coverCall('js/workspace.js', '6469:6689');
    Bar.prototype.init = function () {
        __$coverCall('js/workspace.js', '6507:6533');
        var button, _i, _len, _ref;
        __$coverCall('js/workspace.js', '6539:6559');
        _ref = this._buttons;
        __$coverCall('js/workspace.js', '6565:6667');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            __$coverCall('js/workspace.js', '6623:6640');
            button = _ref[_i];
            __$coverCall('js/workspace.js', '6648:6661');
            button.init();
        }
        __$coverCall('js/workspace.js', '6673:6684');
        return this;
    };
    __$coverCall('js/workspace.js', '6694:6822');
    Bar.prototype.addButton = function (button) {
        __$coverCall('js/workspace.js', '6743:6769');
        this._buttons.push(button);
        __$coverCall('js/workspace.js', '6775:6817');
        return this.element.append(button.element);
    };
    __$coverCall('js/workspace.js', '6827:6837');
    return Bar;
}(Panel);
__$coverCall('js/workspace.js', '6852:7062');
Toolbar = function (_super) {
    __$coverCall('js/workspace.js', '6885:6911');
    __extends(Toolbar, _super);
    __$coverCall('js/workspace.js', '6916:7033');
    function Toolbar(core) {
        __$coverCall('js/workspace.js', '6945:6991');
        Toolbar.__super__.constructor.call(this, core);
        __$coverCall('js/workspace.js', '6997:7029');
        this.element.addClass('toolbar');
    }
    __$coverCall('js/workspace.js', '7038:7052');
    return Toolbar;
}(Bar);
__$coverCall('js/workspace.js', '7065:7287');
Statusbar = function (_super) {
    __$coverCall('js/workspace.js', '7100:7128');
    __extends(Statusbar, _super);
    __$coverCall('js/workspace.js', '7133:7256');
    function Statusbar(core) {
        __$coverCall('js/workspace.js', '7164:7212');
        Statusbar.__super__.constructor.call(this, core);
        __$coverCall('js/workspace.js', '7218:7252');
        this.element.addClass('statusbar');
    }
    __$coverCall('js/workspace.js', '7261:7277');
    return Statusbar;
}(Bar);
__$coverCall('js/workspace.js', '7290:7494');
namespace('Jencil.workspace', function (exports) {
    __$coverCall('js/workspace.js', '7342:7367');
    exports.Wrapper = Wrapper;
    __$coverCall('js/workspace.js', '7371:7400');
    exports.Workspace = Workspace;
    __$coverCall('js/workspace.js', '7404:7421');
    exports.Bar = Bar;
    __$coverCall('js/workspace.js', '7425:7450');
    exports.Toolbar = Toolbar;
    __$coverCall('js/workspace.js', '7454:7490');
    return exports.Statusbar = Statusbar;
});