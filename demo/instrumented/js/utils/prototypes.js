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
__$coverInit("js/utils/prototypes.js", "var apply, strutils;\n\nstrutils = {\n  repeat: function(str, count) {\n    var pattern, result;\n    if (count < 1) {\n      return '';\n    }\n    result = '';\n    pattern = str.valueOf();\n    while (count > 0) {\n      if (count & 1) {\n        result += pattern;\n      }\n      count >>= 1;\n      pattern += pattern;\n    }\n    return result;\n  },\n  startsWith: function(str, prefix) {\n    return str.lastIndexOf(prefix, 0) === 0;\n  },\n  endsWith: function(str, suffix) {\n    var l;\n    l = str.length - suffix.length;\n    return l >= 0 && str.lastIndexOf(suffix, l) === l;\n  },\n  trimLeft: function(str) {\n    return str.replace(/^\\s+/g, '');\n  },\n  trimRight: function(str) {\n    return str.replace(/\\s+$/g, '');\n  },\n  trim: function(str) {\n    return str.replace(/^\\s+|\\s+$/g, '');\n  }\n};\n\napply = function(object, name, fn) {\n  if (!(object.prototype[name] != null)) {\n    return object.prototype[name] = function() {\n      var args;\n      args = [this].concat(Array.prototype.slice.call(arguments));\n      return fn.apply(this, args);\n    };\n  }\n};\n\napply(String, 'repeat', strutils.repeat);\n\napply(String, 'startsWith', strutils.startsWith);\n\napply(String, 'endsWith', strutils.endsWith);\n\napply(String, 'trimLeft', strutils.trimLeft);\n\napply(String, 'trimRight', strutils.trimRight);\n\napply(String, 'trim', strutils.trim);\n");
__$coverInitRange("js/utils/prototypes.js", "0:19");
__$coverInitRange("js/utils/prototypes.js", "22:783");
__$coverInitRange("js/utils/prototypes.js", "786:1045");
__$coverInitRange("js/utils/prototypes.js", "1048:1088");
__$coverInitRange("js/utils/prototypes.js", "1091:1139");
__$coverInitRange("js/utils/prototypes.js", "1142:1186");
__$coverInitRange("js/utils/prototypes.js", "1189:1233");
__$coverInitRange("js/utils/prototypes.js", "1236:1282");
__$coverInitRange("js/utils/prototypes.js", "1285:1321");
__$coverInitRange("js/utils/prototypes.js", "72:91");
__$coverInitRange("js/utils/prototypes.js", "97:135");
__$coverInitRange("js/utils/prototypes.js", "141:152");
__$coverInitRange("js/utils/prototypes.js", "158:181");
__$coverInitRange("js/utils/prototypes.js", "187:314");
__$coverInitRange("js/utils/prototypes.js", "320:333");
__$coverInitRange("js/utils/prototypes.js", "120:129");
__$coverInitRange("js/utils/prototypes.js", "213:263");
__$coverInitRange("js/utils/prototypes.js", "271:282");
__$coverInitRange("js/utils/prototypes.js", "290:308");
__$coverInitRange("js/utils/prototypes.js", "238:255");
__$coverInitRange("js/utils/prototypes.js", "382:421");
__$coverInitRange("js/utils/prototypes.js", "468:473");
__$coverInitRange("js/utils/prototypes.js", "479:509");
__$coverInitRange("js/utils/prototypes.js", "515:564");
__$coverInitRange("js/utils/prototypes.js", "603:634");
__$coverInitRange("js/utils/prototypes.js", "674:705");
__$coverInitRange("js/utils/prototypes.js", "740:776");
__$coverInitRange("js/utils/prototypes.js", "825:1042");
__$coverInitRange("js/utils/prototypes.js", "870:1038");
__$coverInitRange("js/utils/prototypes.js", "921:929");
__$coverInitRange("js/utils/prototypes.js", "937:996");
__$coverInitRange("js/utils/prototypes.js", "1004:1031");
__$coverCall('js/utils/prototypes.js', '0:19');
var apply, strutils;
__$coverCall('js/utils/prototypes.js', '22:783');
strutils = {
    repeat: function (str, count) {
        __$coverCall('js/utils/prototypes.js', '72:91');
        var pattern, result;
        __$coverCall('js/utils/prototypes.js', '97:135');
        if (count < 1) {
            __$coverCall('js/utils/prototypes.js', '120:129');
            return '';
        }
        __$coverCall('js/utils/prototypes.js', '141:152');
        result = '';
        __$coverCall('js/utils/prototypes.js', '158:181');
        pattern = str.valueOf();
        __$coverCall('js/utils/prototypes.js', '187:314');
        while (count > 0) {
            __$coverCall('js/utils/prototypes.js', '213:263');
            if (count & 1) {
                __$coverCall('js/utils/prototypes.js', '238:255');
                result += pattern;
            }
            __$coverCall('js/utils/prototypes.js', '271:282');
            count >>= 1;
            __$coverCall('js/utils/prototypes.js', '290:308');
            pattern += pattern;
        }
        __$coverCall('js/utils/prototypes.js', '320:333');
        return result;
    },
    startsWith: function (str, prefix) {
        __$coverCall('js/utils/prototypes.js', '382:421');
        return str.lastIndexOf(prefix, 0) === 0;
    },
    endsWith: function (str, suffix) {
        __$coverCall('js/utils/prototypes.js', '468:473');
        var l;
        __$coverCall('js/utils/prototypes.js', '479:509');
        l = str.length - suffix.length;
        __$coverCall('js/utils/prototypes.js', '515:564');
        return l >= 0 && str.lastIndexOf(suffix, l) === l;
    },
    trimLeft: function (str) {
        __$coverCall('js/utils/prototypes.js', '603:634');
        return str.replace(/^\s+/g, '');
    },
    trimRight: function (str) {
        __$coverCall('js/utils/prototypes.js', '674:705');
        return str.replace(/\s+$/g, '');
    },
    trim: function (str) {
        __$coverCall('js/utils/prototypes.js', '740:776');
        return str.replace(/^\s+|\s+$/g, '');
    }
};
__$coverCall('js/utils/prototypes.js', '786:1045');
apply = function (object, name, fn) {
    __$coverCall('js/utils/prototypes.js', '825:1042');
    if (!(object.prototype[name] != null)) {
        __$coverCall('js/utils/prototypes.js', '870:1038');
        return object.prototype[name] = function () {
            __$coverCall('js/utils/prototypes.js', '921:929');
            var args;
            __$coverCall('js/utils/prototypes.js', '937:996');
            args = [this].concat(Array.prototype.slice.call(arguments));
            __$coverCall('js/utils/prototypes.js', '1004:1031');
            return fn.apply(this, args);
        };
    }
};
__$coverCall('js/utils/prototypes.js', '1048:1088');
apply(String, 'repeat', strutils.repeat);
__$coverCall('js/utils/prototypes.js', '1091:1139');
apply(String, 'startsWith', strutils.startsWith);
__$coverCall('js/utils/prototypes.js', '1142:1186');
apply(String, 'endsWith', strutils.endsWith);
__$coverCall('js/utils/prototypes.js', '1189:1233');
apply(String, 'trimLeft', strutils.trimLeft);
__$coverCall('js/utils/prototypes.js', '1236:1282');
apply(String, 'trimRight', strutils.trimRight);
__$coverCall('js/utils/prototypes.js', '1285:1321');
apply(String, 'trim', strutils.trim);