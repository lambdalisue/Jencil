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
__$coverInit("src/js/types/html/viewer.js", "var HtmlViewer;\n\nHtmlViewer = TemplateViewer;\n");
__$coverInitRange("src/js/types/html/viewer.js", "0:14");
__$coverInitRange("src/js/types/html/viewer.js", "17:44");
__$coverCall('src/js/types/html/viewer.js', '0:14');
var HtmlViewer;
__$coverCall('src/js/types/html/viewer.js', '17:44');
HtmlViewer = TemplateViewer;