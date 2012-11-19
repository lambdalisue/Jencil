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
__$coverInit("js/utils/i18n.js", "var translate;\n\nif (window.i18n != null) {\n  translate = function(key) {\n    return i18n.t(key, {\n      defaultValue: key\n    });\n  };\n} else {\n  translate = function(key) {\n    return key;\n  };\n}\n");
__$coverInitRange("js/utils/i18n.js", "0:13");
__$coverInitRange("js/utils/i18n.js", "16:195");
__$coverInitRange("js/utils/i18n.js", "45:133");
__$coverInitRange("js/utils/i18n.js", "77:128");
__$coverInitRange("js/utils/i18n.js", "146:193");
__$coverInitRange("js/utils/i18n.js", "178:188");
__$coverCall('js/utils/i18n.js', '0:13');
var translate;
__$coverCall('js/utils/i18n.js', '16:195');
if (window.i18n != null) {
    __$coverCall('js/utils/i18n.js', '45:133');
    translate = function (key) {
        __$coverCall('js/utils/i18n.js', '77:128');
        return i18n.t(key, { defaultValue: key });
    };
} else {
    __$coverCall('js/utils/i18n.js', '146:193');
    translate = function (key) {
        __$coverCall('js/utils/i18n.js', '178:188');
        return key;
    };
}