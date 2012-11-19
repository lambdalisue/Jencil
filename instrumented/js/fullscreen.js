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
__$coverInit("src/js/fullscreen.js", "var Fullscreen,\n  __hasProp = {}.hasOwnProperty,\n  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };\n\nFullscreen = (function(_super) {\n\n  __extends(Fullscreen, _super);\n\n  function Fullscreen(core) {\n    var _this = this;\n    Fullscreen.__super__.constructor.call(this, core);\n    this.element.addClass('fullscreen');\n    this.element.css({\n      'position': 'fixed',\n      'top': '0',\n      'left': '0',\n      'width': '100%',\n      'height': '100%',\n      'z-index': 100\n    });\n    this.curtain = $('<div>').addClass('curtain');\n    this.curtain.css({\n      'position': 'absolute',\n      'top': '0',\n      'left': '0',\n      'width': '100%',\n      'height': '100%',\n      'background': 'black',\n      'opacity': '0.6',\n      'cursor': 'pointer'\n    });\n    this.cell = $('<div>').css({\n      'position': 'absolute',\n      'top': '5%',\n      'left': '5%',\n      'width': '90%',\n      'height': '90%'\n    });\n    if ($.browser.msie && $.browser.version < 7) {\n      this.element.css('position', 'absolute');\n      $(window).scroll(function() {\n        return _this.element.css('top', $(document).scrollTop());\n      });\n    }\n    this.curtain.click(function() {\n      return _this.off();\n    });\n    this.element.append(this.curtain);\n    this.element.append(this.cell);\n    this.element.hide();\n    this.resize = function() {\n      return _this.core.wrapper.adjust();\n    };\n  }\n\n  Fullscreen.prototype.on = function() {\n    var ratio,\n      _this = this;\n    ratio = 9.0 / 10;\n    this.cell.append(this.core.wrapper.element);\n    this.core.wrapper.element.outerWidth(true, this.element.width() * ratio);\n    this.core.wrapper.element.outerHeight(true, this.element.height() * ratio);\n    this.core.wrapper.init();\n    this.core.wrapper.adjust();\n    this.core.wrapper.workspace.update(true);\n    this.element.fadeIn('fast', function() {\n      _this.core.wrapper.element.css('width', \"100%\");\n      _this.core.wrapper.element.css('height', \"100%\");\n      return _this.core.wrapper.adjust();\n    });\n    return $(window).on('resize', this.resize);\n  };\n\n  Fullscreen.prototype.off = function() {\n    this.core.element.after(this.core.wrapper.element);\n    this.core.wrapper.element.css('width', \"\");\n    this.core.wrapper.element.css('height', \"\");\n    this.core.wrapper.init();\n    this.core.wrapper.adjust();\n    this.core.wrapper.workspace.update(true);\n    this.element.fadeOut('fast');\n    return $(window).unbind('resize', this.resize);\n  };\n\n  Fullscreen.prototype.toggle = function(callbackOn, callbackOff) {\n    if (this.element.is(':visible')) {\n      this.off();\n      return typeof callbackOff === \"function\" ? callbackOff() : void 0;\n    } else {\n      this.on();\n      return typeof callbackOn === \"function\" ? callbackOn() : void 0;\n    }\n  };\n\n  return Fullscreen;\n\n})(Panel);\n");
__$coverInitRange("src/js/fullscreen.js", "0:338");
__$coverInitRange("src/js/fullscreen.js", "341:3031");
__$coverInitRange("src/js/fullscreen.js", "89:174");
__$coverInitRange("src/js/fullscreen.js", "176:220");
__$coverInitRange("src/js/fullscreen.js", "222:255");
__$coverInitRange("src/js/fullscreen.js", "257:285");
__$coverInitRange("src/js/fullscreen.js", "287:321");
__$coverInitRange("src/js/fullscreen.js", "323:335");
__$coverInitRange("src/js/fullscreen.js", "115:172");
__$coverInitRange("src/js/fullscreen.js", "194:218");
__$coverInitRange("src/js/fullscreen.js", "377:406");
__$coverInitRange("src/js/fullscreen.js", "411:1618");
__$coverInitRange("src/js/fullscreen.js", "1623:2291");
__$coverInitRange("src/js/fullscreen.js", "2296:2686");
__$coverInitRange("src/js/fullscreen.js", "2691:2997");
__$coverInitRange("src/js/fullscreen.js", "3002:3019");
__$coverInitRange("src/js/fullscreen.js", "443:459");
__$coverInitRange("src/js/fullscreen.js", "465:514");
__$coverInitRange("src/js/fullscreen.js", "520:555");
__$coverInitRange("src/js/fullscreen.js", "561:718");
__$coverInitRange("src/js/fullscreen.js", "724:769");
__$coverInitRange("src/js/fullscreen.js", "775:993");
__$coverInitRange("src/js/fullscreen.js", "999:1147");
__$coverInitRange("src/js/fullscreen.js", "1153:1364");
__$coverInitRange("src/js/fullscreen.js", "1370:1434");
__$coverInitRange("src/js/fullscreen.js", "1440:1473");
__$coverInitRange("src/js/fullscreen.js", "1479:1509");
__$coverInitRange("src/js/fullscreen.js", "1515:1534");
__$coverInitRange("src/js/fullscreen.js", "1540:1614");
__$coverInitRange("src/js/fullscreen.js", "1206:1246");
__$coverInitRange("src/js/fullscreen.js", "1254:1358");
__$coverInitRange("src/js/fullscreen.js", "1292:1348");
__$coverInitRange("src/js/fullscreen.js", "1408:1426");
__$coverInitRange("src/js/fullscreen.js", "1573:1607");
__$coverInitRange("src/js/fullscreen.js", "1666:1695");
__$coverInitRange("src/js/fullscreen.js", "1701:1717");
__$coverInitRange("src/js/fullscreen.js", "1723:1766");
__$coverInitRange("src/js/fullscreen.js", "1772:1844");
__$coverInitRange("src/js/fullscreen.js", "1850:1924");
__$coverInitRange("src/js/fullscreen.js", "1930:1954");
__$coverInitRange("src/js/fullscreen.js", "1960:1986");
__$coverInitRange("src/js/fullscreen.js", "1992:2032");
__$coverInitRange("src/js/fullscreen.js", "2038:2238");
__$coverInitRange("src/js/fullscreen.js", "2244:2286");
__$coverInitRange("src/js/fullscreen.js", "2085:2132");
__$coverInitRange("src/js/fullscreen.js", "2140:2188");
__$coverInitRange("src/js/fullscreen.js", "2196:2230");
__$coverInitRange("src/js/fullscreen.js", "2340:2390");
__$coverInitRange("src/js/fullscreen.js", "2396:2438");
__$coverInitRange("src/js/fullscreen.js", "2444:2487");
__$coverInitRange("src/js/fullscreen.js", "2493:2517");
__$coverInitRange("src/js/fullscreen.js", "2523:2549");
__$coverInitRange("src/js/fullscreen.js", "2555:2595");
__$coverInitRange("src/js/fullscreen.js", "2601:2629");
__$coverInitRange("src/js/fullscreen.js", "2635:2681");
__$coverInitRange("src/js/fullscreen.js", "2761:2992");
__$coverInitRange("src/js/fullscreen.js", "2802:2812");
__$coverInitRange("src/js/fullscreen.js", "2820:2885");
__$coverInitRange("src/js/fullscreen.js", "2906:2915");
__$coverInitRange("src/js/fullscreen.js", "2923:2986");
__$coverCall('src/js/fullscreen.js', '0:338');
var Fullscreen, __hasProp = {}.hasOwnProperty, __extends = function (child, parent) {
        __$coverCall('src/js/fullscreen.js', '89:174');
        for (var key in parent) {
            __$coverCall('src/js/fullscreen.js', '115:172');
            if (__hasProp.call(parent, key))
                child[key] = parent[key];
        }
        __$coverCall('src/js/fullscreen.js', '176:220');
        function ctor() {
            __$coverCall('src/js/fullscreen.js', '194:218');
            this.constructor = child;
        }
        __$coverCall('src/js/fullscreen.js', '222:255');
        ctor.prototype = parent.prototype;
        __$coverCall('src/js/fullscreen.js', '257:285');
        child.prototype = new ctor();
        __$coverCall('src/js/fullscreen.js', '287:321');
        child.__super__ = parent.prototype;
        __$coverCall('src/js/fullscreen.js', '323:335');
        return child;
    };
__$coverCall('src/js/fullscreen.js', '341:3031');
Fullscreen = function (_super) {
    __$coverCall('src/js/fullscreen.js', '377:406');
    __extends(Fullscreen, _super);
    __$coverCall('src/js/fullscreen.js', '411:1618');
    function Fullscreen(core) {
        __$coverCall('src/js/fullscreen.js', '443:459');
        var _this = this;
        __$coverCall('src/js/fullscreen.js', '465:514');
        Fullscreen.__super__.constructor.call(this, core);
        __$coverCall('src/js/fullscreen.js', '520:555');
        this.element.addClass('fullscreen');
        __$coverCall('src/js/fullscreen.js', '561:718');
        this.element.css({
            'position': 'fixed',
            'top': '0',
            'left': '0',
            'width': '100%',
            'height': '100%',
            'z-index': 100
        });
        __$coverCall('src/js/fullscreen.js', '724:769');
        this.curtain = $('<div>').addClass('curtain');
        __$coverCall('src/js/fullscreen.js', '775:993');
        this.curtain.css({
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'width': '100%',
            'height': '100%',
            'background': 'black',
            'opacity': '0.6',
            'cursor': 'pointer'
        });
        __$coverCall('src/js/fullscreen.js', '999:1147');
        this.cell = $('<div>').css({
            'position': 'absolute',
            'top': '5%',
            'left': '5%',
            'width': '90%',
            'height': '90%'
        });
        __$coverCall('src/js/fullscreen.js', '1153:1364');
        if ($.browser.msie && $.browser.version < 7) {
            __$coverCall('src/js/fullscreen.js', '1206:1246');
            this.element.css('position', 'absolute');
            __$coverCall('src/js/fullscreen.js', '1254:1358');
            $(window).scroll(function () {
                __$coverCall('src/js/fullscreen.js', '1292:1348');
                return _this.element.css('top', $(document).scrollTop());
            });
        }
        __$coverCall('src/js/fullscreen.js', '1370:1434');
        this.curtain.click(function () {
            __$coverCall('src/js/fullscreen.js', '1408:1426');
            return _this.off();
        });
        __$coverCall('src/js/fullscreen.js', '1440:1473');
        this.element.append(this.curtain);
        __$coverCall('src/js/fullscreen.js', '1479:1509');
        this.element.append(this.cell);
        __$coverCall('src/js/fullscreen.js', '1515:1534');
        this.element.hide();
        __$coverCall('src/js/fullscreen.js', '1540:1614');
        this.resize = function () {
            __$coverCall('src/js/fullscreen.js', '1573:1607');
            return _this.core.wrapper.adjust();
        };
    }
    __$coverCall('src/js/fullscreen.js', '1623:2291');
    Fullscreen.prototype.on = function () {
        __$coverCall('src/js/fullscreen.js', '1666:1695');
        var ratio, _this = this;
        __$coverCall('src/js/fullscreen.js', '1701:1717');
        ratio = 9 / 10;
        __$coverCall('src/js/fullscreen.js', '1723:1766');
        this.cell.append(this.core.wrapper.element);
        __$coverCall('src/js/fullscreen.js', '1772:1844');
        this.core.wrapper.element.outerWidth(true, this.element.width() * ratio);
        __$coverCall('src/js/fullscreen.js', '1850:1924');
        this.core.wrapper.element.outerHeight(true, this.element.height() * ratio);
        __$coverCall('src/js/fullscreen.js', '1930:1954');
        this.core.wrapper.init();
        __$coverCall('src/js/fullscreen.js', '1960:1986');
        this.core.wrapper.adjust();
        __$coverCall('src/js/fullscreen.js', '1992:2032');
        this.core.wrapper.workspace.update(true);
        __$coverCall('src/js/fullscreen.js', '2038:2238');
        this.element.fadeIn('fast', function () {
            __$coverCall('src/js/fullscreen.js', '2085:2132');
            _this.core.wrapper.element.css('width', '100%');
            __$coverCall('src/js/fullscreen.js', '2140:2188');
            _this.core.wrapper.element.css('height', '100%');
            __$coverCall('src/js/fullscreen.js', '2196:2230');
            return _this.core.wrapper.adjust();
        });
        __$coverCall('src/js/fullscreen.js', '2244:2286');
        return $(window).on('resize', this.resize);
    };
    __$coverCall('src/js/fullscreen.js', '2296:2686');
    Fullscreen.prototype.off = function () {
        __$coverCall('src/js/fullscreen.js', '2340:2390');
        this.core.element.after(this.core.wrapper.element);
        __$coverCall('src/js/fullscreen.js', '2396:2438');
        this.core.wrapper.element.css('width', '');
        __$coverCall('src/js/fullscreen.js', '2444:2487');
        this.core.wrapper.element.css('height', '');
        __$coverCall('src/js/fullscreen.js', '2493:2517');
        this.core.wrapper.init();
        __$coverCall('src/js/fullscreen.js', '2523:2549');
        this.core.wrapper.adjust();
        __$coverCall('src/js/fullscreen.js', '2555:2595');
        this.core.wrapper.workspace.update(true);
        __$coverCall('src/js/fullscreen.js', '2601:2629');
        this.element.fadeOut('fast');
        __$coverCall('src/js/fullscreen.js', '2635:2681');
        return $(window).unbind('resize', this.resize);
    };
    __$coverCall('src/js/fullscreen.js', '2691:2997');
    Fullscreen.prototype.toggle = function (callbackOn, callbackOff) {
        __$coverCall('src/js/fullscreen.js', '2761:2992');
        if (this.element.is(':visible')) {
            __$coverCall('src/js/fullscreen.js', '2802:2812');
            this.off();
            __$coverCall('src/js/fullscreen.js', '2820:2885');
            return typeof callbackOff === 'function' ? callbackOff() : void 0;
        } else {
            __$coverCall('src/js/fullscreen.js', '2906:2915');
            this.on();
            __$coverCall('src/js/fullscreen.js', '2923:2986');
            return typeof callbackOn === 'function' ? callbackOn() : void 0;
        }
    };
    __$coverCall('src/js/fullscreen.js', '3002:3019');
    return Fullscreen;
}(Panel);