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
__$coverInit("js/utils/animation.js", "/*\nanimation\n\nAnimate value via easing function\n\nThe following library is required to use this library\n\n- jQuery\n\nAuthor:   lambdalisue (lambdalisue@hashnote.net)\nLicense:  MIT License\n\nCopyright(C) 2012 lambdalisue, hasnote.net allright reserved\n*/\n\nvar animate;\n\nanimate = (function() {\n  var defaultOptions, now;\n  now = function() {\n    return (new Date()).getTime();\n  };\n  defaultOptions = {\n    start: 0,\n    end: 100,\n    duration: 1000,\n    callbackEach: null,\n    callbackDone: null,\n    easing: jQuery.easing.swing\n  };\n  return function(options) {\n    var difference, startTime, step;\n    options = jQuery.extend(defaultOptions, options);\n    startTime = now();\n    difference = options.end - options.start;\n    step = function() {\n      var epoch, x;\n      epoch = now() - startTime;\n      x = options.easing(epoch / options.duration, epoch, 0, 1, options.duration);\n      x = x * difference + options.start;\n      options.callbackEach(x, epoch);\n      if (epoch < options.duration) {\n        return setTimeout(step, 1);\n      } else {\n        options.callbackEach(options.end, options.duration);\n        return typeof options.callbackDone === \"function\" ? options.callbackDone() : void 0;\n      }\n    };\n    step();\n    return null;\n  };\n})();\n");
__$coverInitRange("js/utils/animation.js", "251:262");
__$coverInitRange("js/utils/animation.js", "265:1256");
__$coverInitRange("js/utils/animation.js", "291:314");
__$coverInitRange("js/utils/animation.js", "318:375");
__$coverInitRange("js/utils/animation.js", "379:529");
__$coverInitRange("js/utils/animation.js", "533:1250");
__$coverInitRange("js/utils/animation.js", "341:370");
__$coverInitRange("js/utils/animation.js", "564:595");
__$coverInitRange("js/utils/animation.js", "601:649");
__$coverInitRange("js/utils/animation.js", "655:672");
__$coverInitRange("js/utils/animation.js", "678:718");
__$coverInitRange("js/utils/animation.js", "724:1216");
__$coverInitRange("js/utils/animation.js", "1222:1228");
__$coverInitRange("js/utils/animation.js", "1234:1245");
__$coverInitRange("js/utils/animation.js", "750:762");
__$coverInitRange("js/utils/animation.js", "770:795");
__$coverInitRange("js/utils/animation.js", "803:878");
__$coverInitRange("js/utils/animation.js", "886:920");
__$coverInitRange("js/utils/animation.js", "928:958");
__$coverInitRange("js/utils/animation.js", "966:1209");
__$coverInitRange("js/utils/animation.js", "1006:1032");
__$coverInitRange("js/utils/animation.js", "1057:1108");
__$coverInitRange("js/utils/animation.js", "1118:1201");
__$coverCall('js/utils/animation.js', '251:262');
var animate;
__$coverCall('js/utils/animation.js', '265:1256');
animate = function () {
    __$coverCall('js/utils/animation.js', '291:314');
    var defaultOptions, now;
    __$coverCall('js/utils/animation.js', '318:375');
    now = function () {
        __$coverCall('js/utils/animation.js', '341:370');
        return new Date().getTime();
    };
    __$coverCall('js/utils/animation.js', '379:529');
    defaultOptions = {
        start: 0,
        end: 100,
        duration: 1000,
        callbackEach: null,
        callbackDone: null,
        easing: jQuery.easing.swing
    };
    __$coverCall('js/utils/animation.js', '533:1250');
    return function (options) {
        __$coverCall('js/utils/animation.js', '564:595');
        var difference, startTime, step;
        __$coverCall('js/utils/animation.js', '601:649');
        options = jQuery.extend(defaultOptions, options);
        __$coverCall('js/utils/animation.js', '655:672');
        startTime = now();
        __$coverCall('js/utils/animation.js', '678:718');
        difference = options.end - options.start;
        __$coverCall('js/utils/animation.js', '724:1216');
        step = function () {
            __$coverCall('js/utils/animation.js', '750:762');
            var epoch, x;
            __$coverCall('js/utils/animation.js', '770:795');
            epoch = now() - startTime;
            __$coverCall('js/utils/animation.js', '803:878');
            x = options.easing(epoch / options.duration, epoch, 0, 1, options.duration);
            __$coverCall('js/utils/animation.js', '886:920');
            x = x * difference + options.start;
            __$coverCall('js/utils/animation.js', '928:958');
            options.callbackEach(x, epoch);
            __$coverCall('js/utils/animation.js', '966:1209');
            if (epoch < options.duration) {
                __$coverCall('js/utils/animation.js', '1006:1032');
                return setTimeout(step, 1);
            } else {
                __$coverCall('js/utils/animation.js', '1057:1108');
                options.callbackEach(options.end, options.duration);
                __$coverCall('js/utils/animation.js', '1118:1201');
                return typeof options.callbackDone === 'function' ? options.callbackDone() : void 0;
            }
        };
        __$coverCall('js/utils/animation.js', '1222:1228');
        step();
        __$coverCall('js/utils/animation.js', '1234:1245');
        return null;
    };
}();