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
__$coverInit("js/utils/curtain.js", "var curtainFactory;\n\ncurtainFactory = function(element) {\n  var curtain;\n  element.css('position', 'relative');\n  curtain = $('<div>').appendTo(element).hide().css({\n    'position': 'absolute',\n    'top': '0',\n    'left': '0',\n    'overflow': 'hidden',\n    'z-index': 99999\n  });\n  curtain.on = function() {\n    curtain.refresh();\n    curtain.show();\n    return this;\n  };\n  curtain.refresh = function() {\n    curtain.width(element.outerWidth(true));\n    curtain.height(element.outerHeight(true));\n    return this;\n  };\n  curtain.off = function() {\n    curtain.hide();\n    return this;\n  };\n  return curtain;\n};\n");
__$coverInitRange("js/utils/curtain.js", "0:18");
__$coverInitRange("js/utils/curtain.js", "21:610");
__$coverInitRange("js/utils/curtain.js", "60:71");
__$coverInitRange("js/utils/curtain.js", "75:110");
__$coverInitRange("js/utils/curtain.js", "114:278");
__$coverInitRange("js/utils/curtain.js", "282:371");
__$coverInitRange("js/utils/curtain.js", "375:518");
__$coverInitRange("js/utils/curtain.js", "522:589");
__$coverInitRange("js/utils/curtain.js", "593:607");
__$coverInitRange("js/utils/curtain.js", "312:329");
__$coverInitRange("js/utils/curtain.js", "335:349");
__$coverInitRange("js/utils/curtain.js", "355:366");
__$coverInitRange("js/utils/curtain.js", "410:449");
__$coverInitRange("js/utils/curtain.js", "455:496");
__$coverInitRange("js/utils/curtain.js", "502:513");
__$coverInitRange("js/utils/curtain.js", "553:567");
__$coverInitRange("js/utils/curtain.js", "573:584");
__$coverCall('js/utils/curtain.js', '0:18');
var curtainFactory;
__$coverCall('js/utils/curtain.js', '21:610');
curtainFactory = function (element) {
    __$coverCall('js/utils/curtain.js', '60:71');
    var curtain;
    __$coverCall('js/utils/curtain.js', '75:110');
    element.css('position', 'relative');
    __$coverCall('js/utils/curtain.js', '114:278');
    curtain = $('<div>').appendTo(element).hide().css({
        'position': 'absolute',
        'top': '0',
        'left': '0',
        'overflow': 'hidden',
        'z-index': 99999
    });
    __$coverCall('js/utils/curtain.js', '282:371');
    curtain.on = function () {
        __$coverCall('js/utils/curtain.js', '312:329');
        curtain.refresh();
        __$coverCall('js/utils/curtain.js', '335:349');
        curtain.show();
        __$coverCall('js/utils/curtain.js', '355:366');
        return this;
    };
    __$coverCall('js/utils/curtain.js', '375:518');
    curtain.refresh = function () {
        __$coverCall('js/utils/curtain.js', '410:449');
        curtain.width(element.outerWidth(true));
        __$coverCall('js/utils/curtain.js', '455:496');
        curtain.height(element.outerHeight(true));
        __$coverCall('js/utils/curtain.js', '502:513');
        return this;
    };
    __$coverCall('js/utils/curtain.js', '522:589');
    curtain.off = function () {
        __$coverCall('js/utils/curtain.js', '553:567');
        curtain.hide();
        __$coverCall('js/utils/curtain.js', '573:584');
        return this;
    };
    __$coverCall('js/utils/curtain.js', '593:607');
    return curtain;
};