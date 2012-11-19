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
__$coverInit("src/js/utils/namespace.js", "var namespace,\n  __slice = [].slice;\n\nnamespace = function(target, name, block) {\n  var item, top, _i, _len, _ref, _ref1;\n  if (arguments.length < 3) {\n    _ref = [(typeof exports !== 'undefined' ? exports : window)].concat(__slice.call(arguments)), target = _ref[0], name = _ref[1], block = _ref[2];\n  }\n  top = target;\n  _ref1 = name.split('.');\n  for (_i = 0, _len = _ref1.length; _i < _len; _i++) {\n    item = _ref1[_i];\n    target = target[item] || (target[item] = {});\n  }\n  return block(target, top);\n};\n\nif (typeof window !== \"undefined\" && window !== null) {\n  window.namespace = namespace;\n}\n\nif (typeof exports !== \"undefined\" && exports !== null) {\n  exports.namespace = namespace;\n}\n");
__$coverInitRange("src/js/utils/namespace.js", "0:35");
__$coverInitRange("src/js/utils/namespace.js", "38:509");
__$coverInitRange("src/js/utils/namespace.js", "512:600");
__$coverInitRange("src/js/utils/namespace.js", "603:694");
__$coverInitRange("src/js/utils/namespace.js", "84:120");
__$coverInitRange("src/js/utils/namespace.js", "124:303");
__$coverInitRange("src/js/utils/namespace.js", "307:319");
__$coverInitRange("src/js/utils/namespace.js", "323:346");
__$coverInitRange("src/js/utils/namespace.js", "350:477");
__$coverInitRange("src/js/utils/namespace.js", "481:506");
__$coverInitRange("src/js/utils/namespace.js", "156:299");
__$coverInitRange("src/js/utils/namespace.js", "407:423");
__$coverInitRange("src/js/utils/namespace.js", "429:473");
__$coverInitRange("src/js/utils/namespace.js", "570:598");
__$coverInitRange("src/js/utils/namespace.js", "663:692");
__$coverCall('src/js/utils/namespace.js', '0:35');
var namespace, __slice = [].slice;
__$coverCall('src/js/utils/namespace.js', '38:509');
namespace = function (target, name, block) {
    __$coverCall('src/js/utils/namespace.js', '84:120');
    var item, top, _i, _len, _ref, _ref1;
    __$coverCall('src/js/utils/namespace.js', '124:303');
    if (arguments.length < 3) {
        __$coverCall('src/js/utils/namespace.js', '156:299');
        _ref = [typeof exports !== 'undefined' ? exports : window].concat(__slice.call(arguments)), target = _ref[0], name = _ref[1], block = _ref[2];
    }
    __$coverCall('src/js/utils/namespace.js', '307:319');
    top = target;
    __$coverCall('src/js/utils/namespace.js', '323:346');
    _ref1 = name.split('.');
    __$coverCall('src/js/utils/namespace.js', '350:477');
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        __$coverCall('src/js/utils/namespace.js', '407:423');
        item = _ref1[_i];
        __$coverCall('src/js/utils/namespace.js', '429:473');
        target = target[item] || (target[item] = {});
    }
    __$coverCall('src/js/utils/namespace.js', '481:506');
    return block(target, top);
};
__$coverCall('src/js/utils/namespace.js', '512:600');
if (typeof window !== 'undefined' && window !== null) {
    __$coverCall('src/js/utils/namespace.js', '570:598');
    window.namespace = namespace;
}
__$coverCall('src/js/utils/namespace.js', '603:694');
if (typeof exports !== 'undefined' && exports !== null) {
    __$coverCall('src/js/utils/namespace.js', '663:692');
    exports.namespace = namespace;
}