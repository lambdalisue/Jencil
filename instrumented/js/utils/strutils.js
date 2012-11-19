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
__$coverInit("src/js/utils/strutils.js", "var apply, strutils;\n\nstrutils = {\n  repeat: function(str, count) {\n    var pattern, result;\n    if (count < 1) {\n      return '';\n    }\n    result = '';\n    pattern = str.valueOf();\n    while (count > 0) {\n      if (count & 1) {\n        result += pattern;\n      }\n      count >>= 1;\n      pattern += pattern;\n    }\n    return result;\n  },\n  startsWith: function(str, prefix) {\n    return str.lastIndexOf(prefix, 0) === 0;\n  },\n  endsWith: function(str, suffix) {\n    var l;\n    l = str.length - suffix.length;\n    return l >= 0 && str.lastIndexOf(suffix, l) === l;\n  },\n  trimLeft: function(str) {\n    return str.replace(/^\\s+/g, '');\n  },\n  trimRight: function(str) {\n    return str.replace(/\\s+$/g, '');\n  },\n  trim: function(str) {\n    return str.replace(/^\\s+|\\s+$/g, '');\n  }\n};\n\napply = function(object, name, fn) {\n  if (!(object.prototype[name] != null)) {\n    return object.prototype[name] = function() {\n      var args;\n      args = [this].concat(Array.prototype.slice.call(arguments));\n      return fn.apply(this, args);\n    };\n  }\n};\n\napply(String, 'repeat', strutils.repeat);\n\napply(String, 'startsWith', strutils.startsWith);\n\napply(String, 'endsWith', strutils.endsWith);\n\napply(String, 'trimLeft', strutils.trimLeft);\n\napply(String, 'trimRight', strutils.trimRight);\n\napply(String, 'trim', strutils.trim);\n\nif (typeof exports !== \"undefined\" && exports !== null) {\n  exports.strutils = strutils;\n}\n");
__$coverInitRange("src/js/utils/strutils.js", "0:19");
__$coverInitRange("src/js/utils/strutils.js", "22:783");
__$coverInitRange("src/js/utils/strutils.js", "786:1045");
__$coverInitRange("src/js/utils/strutils.js", "1048:1088");
__$coverInitRange("src/js/utils/strutils.js", "1091:1139");
__$coverInitRange("src/js/utils/strutils.js", "1142:1186");
__$coverInitRange("src/js/utils/strutils.js", "1189:1233");
__$coverInitRange("src/js/utils/strutils.js", "1236:1282");
__$coverInitRange("src/js/utils/strutils.js", "1285:1321");
__$coverInitRange("src/js/utils/strutils.js", "1324:1413");
__$coverInitRange("src/js/utils/strutils.js", "72:91");
__$coverInitRange("src/js/utils/strutils.js", "97:135");
__$coverInitRange("src/js/utils/strutils.js", "141:152");
__$coverInitRange("src/js/utils/strutils.js", "158:181");
__$coverInitRange("src/js/utils/strutils.js", "187:314");
__$coverInitRange("src/js/utils/strutils.js", "320:333");
__$coverInitRange("src/js/utils/strutils.js", "120:129");
__$coverInitRange("src/js/utils/strutils.js", "213:263");
__$coverInitRange("src/js/utils/strutils.js", "271:282");
__$coverInitRange("src/js/utils/strutils.js", "290:308");
__$coverInitRange("src/js/utils/strutils.js", "238:255");
__$coverInitRange("src/js/utils/strutils.js", "382:421");
__$coverInitRange("src/js/utils/strutils.js", "468:473");
__$coverInitRange("src/js/utils/strutils.js", "479:509");
__$coverInitRange("src/js/utils/strutils.js", "515:564");
__$coverInitRange("src/js/utils/strutils.js", "603:634");
__$coverInitRange("src/js/utils/strutils.js", "674:705");
__$coverInitRange("src/js/utils/strutils.js", "740:776");
__$coverInitRange("src/js/utils/strutils.js", "825:1042");
__$coverInitRange("src/js/utils/strutils.js", "870:1038");
__$coverInitRange("src/js/utils/strutils.js", "921:929");
__$coverInitRange("src/js/utils/strutils.js", "937:996");
__$coverInitRange("src/js/utils/strutils.js", "1004:1031");
__$coverInitRange("src/js/utils/strutils.js", "1384:1411");
__$coverCall('src/js/utils/strutils.js', '0:19');
var apply, strutils;
__$coverCall('src/js/utils/strutils.js', '22:783');
strutils = {
    repeat: function (str, count) {
        __$coverCall('src/js/utils/strutils.js', '72:91');
        var pattern, result;
        __$coverCall('src/js/utils/strutils.js', '97:135');
        if (count < 1) {
            __$coverCall('src/js/utils/strutils.js', '120:129');
            return '';
        }
        __$coverCall('src/js/utils/strutils.js', '141:152');
        result = '';
        __$coverCall('src/js/utils/strutils.js', '158:181');
        pattern = str.valueOf();
        __$coverCall('src/js/utils/strutils.js', '187:314');
        while (count > 0) {
            __$coverCall('src/js/utils/strutils.js', '213:263');
            if (count & 1) {
                __$coverCall('src/js/utils/strutils.js', '238:255');
                result += pattern;
            }
            __$coverCall('src/js/utils/strutils.js', '271:282');
            count >>= 1;
            __$coverCall('src/js/utils/strutils.js', '290:308');
            pattern += pattern;
        }
        __$coverCall('src/js/utils/strutils.js', '320:333');
        return result;
    },
    startsWith: function (str, prefix) {
        __$coverCall('src/js/utils/strutils.js', '382:421');
        return str.lastIndexOf(prefix, 0) === 0;
    },
    endsWith: function (str, suffix) {
        __$coverCall('src/js/utils/strutils.js', '468:473');
        var l;
        __$coverCall('src/js/utils/strutils.js', '479:509');
        l = str.length - suffix.length;
        __$coverCall('src/js/utils/strutils.js', '515:564');
        return l >= 0 && str.lastIndexOf(suffix, l) === l;
    },
    trimLeft: function (str) {
        __$coverCall('src/js/utils/strutils.js', '603:634');
        return str.replace(/^\s+/g, '');
    },
    trimRight: function (str) {
        __$coverCall('src/js/utils/strutils.js', '674:705');
        return str.replace(/\s+$/g, '');
    },
    trim: function (str) {
        __$coverCall('src/js/utils/strutils.js', '740:776');
        return str.replace(/^\s+|\s+$/g, '');
    }
};
__$coverCall('src/js/utils/strutils.js', '786:1045');
apply = function (object, name, fn) {
    __$coverCall('src/js/utils/strutils.js', '825:1042');
    if (!(object.prototype[name] != null)) {
        __$coverCall('src/js/utils/strutils.js', '870:1038');
        return object.prototype[name] = function () {
            __$coverCall('src/js/utils/strutils.js', '921:929');
            var args;
            __$coverCall('src/js/utils/strutils.js', '937:996');
            args = [this].concat(Array.prototype.slice.call(arguments));
            __$coverCall('src/js/utils/strutils.js', '1004:1031');
            return fn.apply(this, args);
        };
    }
};
__$coverCall('src/js/utils/strutils.js', '1048:1088');
apply(String, 'repeat', strutils.repeat);
__$coverCall('src/js/utils/strutils.js', '1091:1139');
apply(String, 'startsWith', strutils.startsWith);
__$coverCall('src/js/utils/strutils.js', '1142:1186');
apply(String, 'endsWith', strutils.endsWith);
__$coverCall('src/js/utils/strutils.js', '1189:1233');
apply(String, 'trimLeft', strutils.trimLeft);
__$coverCall('src/js/utils/strutils.js', '1236:1282');
apply(String, 'trimRight', strutils.trimRight);
__$coverCall('src/js/utils/strutils.js', '1285:1321');
apply(String, 'trim', strutils.trim);
__$coverCall('src/js/utils/strutils.js', '1324:1413');
if (typeof exports !== 'undefined' && exports !== null) {
    __$coverCall('src/js/utils/strutils.js', '1384:1411');
    exports.strutils = strutils;
}