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
__$coverInit("js/utils/evolution.js", "/*\nEvolution\n\nExtend jQueryObj\n\nAuthor: lambdalisue\nLicense: MIT License\n*/\n\nvar evolute;\n\nevolute = (function() {\n  var absoluteX, absoluteY, contentX, contentY, maxHeight, maxWidth, minHeight, minWidth, ncss, nonContentHeight, nonContentWidth, outerHeight, outerWidth, relativeX, relativeY;\n  nonContentWidth = function(includeMargin) {\n    if (includeMargin == null) {\n      includeMargin = false;\n    }\n    return this.outerWidth(includeMargin) - this.width();\n  };\n  nonContentHeight = function(includeMargin) {\n    if (includeMargin == null) {\n      includeMargin = false;\n    }\n    return this.outerHeight(includeMargin) - this.height();\n  };\n  outerWidth = function(includeMargin, value) {\n    var offset;\n    if (includeMargin == null) {\n      includeMargin = false;\n    }\n    if (typeof includeMargin === 'number') {\n      value = includeMargin;\n      includeMargin = false;\n    }\n    if (value != null) {\n      offset = this.nonContentWidth(includeMargin);\n      return this.width(value - offset);\n    }\n    return this._outerWidth(includeMargin);\n  };\n  outerHeight = function(includeMargin, value) {\n    var offset;\n    if (includeMargin == null) {\n      includeMargin = false;\n    }\n    if (typeof includeMargin === 'number') {\n      value = includeMargin;\n      includeMargin = false;\n    }\n    if (value != null) {\n      offset = this.nonContentHeight(includeMargin);\n      return this.height(value - offset);\n    }\n    return this._outerHeight(includeMargin);\n  };\n  ncss = function(propertyName, defaultValue) {\n    var value;\n    if (defaultValue == null) {\n      defaultValue = null;\n    }\n    value = this.css(propertyName);\n    if (value === '' || value === 'none' || value === null || value === (void 0) || value === NaN) {\n      return defaultValue;\n    }\n    value = parseInt(value, 10);\n    return value;\n  };\n  minWidth = function() {\n    return this.ncss('min-width');\n  };\n  minHeight = function() {\n    return this.ncss('min-height');\n  };\n  maxWidth = function() {\n    return this.ncss('max-width');\n  };\n  maxHeight = function() {\n    return this.ncss('max-height');\n  };\n  contentX = function(includeMargin) {\n    var borderLeft, marginLeft, paddingLeft;\n    if (includeMargin == null) {\n      includeMargin = false;\n    }\n    marginLeft = includeMargin ? this.ncss('margin-left') : 0;\n    borderLeft = this.ncss('border-left-width');\n    paddingLeft = this.ncss('padding-left');\n    return marginLeft + borderLeft + paddingLeft;\n  };\n  contentY = function(includeMargin) {\n    var borderTop, marginTop, paddingTop;\n    if (includeMargin == null) {\n      includeMargin = false;\n    }\n    marginTop = includeMargin ? this.ncss('margin-top') : 0;\n    borderTop = this.ncss('border-top-width');\n    paddingTop = this.ncss('padding-top');\n    return marginTop + borderTop + paddingTop;\n  };\n  absoluteX = function(value) {\n    var offset;\n    offset = this.offset();\n    if (value != null) {\n      offset.left = value;\n      return this.offset(offset);\n    }\n    return offset.left;\n  };\n  absoluteY = function(value) {\n    var offset;\n    offset = this.offset();\n    if (value != null) {\n      offset.top = value;\n      return this.offset(offset);\n    }\n    return offset.top;\n  };\n  relativeX = function(includeMargin, value) {\n    var offset, parent;\n    if (includeMargin == null) {\n      includeMargin = false;\n    }\n    if (typeof includeMargin === 'number') {\n      value = includeMargin;\n      includeMargin = false;\n    }\n    parent = evolute(this.parent());\n    offset = parent.absoluteX() + parent.contentX(includeMargin);\n    if (value != null) {\n      return this.absoluteX(value + offset);\n    }\n    return this.absoluteX() - offset;\n  };\n  relativeY = function(includeMargin, value) {\n    var offset, parent;\n    if (includeMargin == null) {\n      includeMargin = false;\n    }\n    if (typeof includeMargin === 'number') {\n      value = includeMargin;\n      includeMargin = false;\n    }\n    parent = evolute(this.parent());\n    offset = parent.absoluteY() + parent.contentY(includeMargin);\n    if (value != null) {\n      return this.absoluteY(value + offset);\n    }\n    return this.absoluteY() - offset;\n  };\n  evolute = function(jQueryObj) {\n    if (jQueryObj.__evoluted__ === true) {\n      return jQueryObj;\n    }\n    jQueryObj._outerWidth = jQueryObj.outerWidth;\n    jQueryObj._outerHeight = jQueryObj.outerHeight;\n    jQueryObj.nonContentWidth = nonContentWidth;\n    jQueryObj.nonContentHeight = nonContentHeight;\n    jQueryObj.outerWidth = outerWidth;\n    jQueryObj.outerHeight = outerHeight;\n    jQueryObj.nonContentWidth = nonContentWidth;\n    jQueryObj.nonContentHeight = nonContentHeight;\n    jQueryObj.ncss = ncss;\n    jQueryObj.minWidth = minWidth;\n    jQueryObj.minHeight = minHeight;\n    jQueryObj.maxWidth = maxWidth;\n    jQueryObj.maxHeight = maxHeight;\n    jQueryObj.contentX = contentX;\n    jQueryObj.contentY = contentY;\n    jQueryObj.absoluteX = absoluteX;\n    jQueryObj.absoluteY = absoluteY;\n    jQueryObj.relativeX = relativeX;\n    jQueryObj.relativeY = relativeY;\n    jQueryObj.__evoluted__ = true;\n    return jQueryObj;\n  };\n  return evolute;\n})();\n");
__$coverInitRange("js/utils/evolution.js", "77:88");
__$coverInitRange("js/utils/evolution.js", "91:5114");
__$coverInitRange("js/utils/evolution.js", "117:291");
__$coverInitRange("js/utils/evolution.js", "295:468");
__$coverInitRange("js/utils/evolution.js", "472:648");
__$coverInitRange("js/utils/evolution.js", "652:1062");
__$coverInitRange("js/utils/evolution.js", "1066:1480");
__$coverInitRange("js/utils/evolution.js", "1484:1834");
__$coverInitRange("js/utils/evolution.js", "1838:1900");
__$coverInitRange("js/utils/evolution.js", "1904:1968");
__$coverInitRange("js/utils/evolution.js", "1972:2034");
__$coverInitRange("js/utils/evolution.js", "2038:2102");
__$coverInitRange("js/utils/evolution.js", "2106:2466");
__$coverInitRange("js/utils/evolution.js", "2470:2818");
__$coverInitRange("js/utils/evolution.js", "2822:3015");
__$coverInitRange("js/utils/evolution.js", "3019:3210");
__$coverInitRange("js/utils/evolution.js", "3214:3680");
__$coverInitRange("js/utils/evolution.js", "3684:4150");
__$coverInitRange("js/utils/evolution.js", "4154:5090");
__$coverInitRange("js/utils/evolution.js", "5094:5108");
__$coverInitRange("js/utils/evolution.js", "343:405");
__$coverInitRange("js/utils/evolution.js", "411:463");
__$coverInitRange("js/utils/evolution.js", "378:399");
__$coverInitRange("js/utils/evolution.js", "521:583");
__$coverInitRange("js/utils/evolution.js", "589:643");
__$coverInitRange("js/utils/evolution.js", "556:577");
__$coverInitRange("js/utils/evolution.js", "702:712");
__$coverInitRange("js/utils/evolution.js", "718:780");
__$coverInitRange("js/utils/evolution.js", "786:889");
__$coverInitRange("js/utils/evolution.js", "895:1013");
__$coverInitRange("js/utils/evolution.js", "1019:1057");
__$coverInitRange("js/utils/evolution.js", "753:774");
__$coverInitRange("js/utils/evolution.js", "833:854");
__$coverInitRange("js/utils/evolution.js", "862:883");
__$coverInitRange("js/utils/evolution.js", "922:966");
__$coverInitRange("js/utils/evolution.js", "974:1007");
__$coverInitRange("js/utils/evolution.js", "1117:1127");
__$coverInitRange("js/utils/evolution.js", "1133:1195");
__$coverInitRange("js/utils/evolution.js", "1201:1304");
__$coverInitRange("js/utils/evolution.js", "1310:1430");
__$coverInitRange("js/utils/evolution.js", "1436:1475");
__$coverInitRange("js/utils/evolution.js", "1168:1189");
__$coverInitRange("js/utils/evolution.js", "1248:1269");
__$coverInitRange("js/utils/evolution.js", "1277:1298");
__$coverInitRange("js/utils/evolution.js", "1337:1382");
__$coverInitRange("js/utils/evolution.js", "1390:1424");
__$coverInitRange("js/utils/evolution.js", "1534:1543");
__$coverInitRange("js/utils/evolution.js", "1549:1608");
__$coverInitRange("js/utils/evolution.js", "1614:1644");
__$coverInitRange("js/utils/evolution.js", "1650:1778");
__$coverInitRange("js/utils/evolution.js", "1784:1811");
__$coverInitRange("js/utils/evolution.js", "1817:1829");
__$coverInitRange("js/utils/evolution.js", "1583:1602");
__$coverInitRange("js/utils/evolution.js", "1753:1772");
__$coverInitRange("js/utils/evolution.js", "1866:1895");
__$coverInitRange("js/utils/evolution.js", "1933:1963");
__$coverInitRange("js/utils/evolution.js", "2000:2029");
__$coverInitRange("js/utils/evolution.js", "2067:2097");
__$coverInitRange("js/utils/evolution.js", "2147:2186");
__$coverInitRange("js/utils/evolution.js", "2192:2254");
__$coverInitRange("js/utils/evolution.js", "2260:2317");
__$coverInitRange("js/utils/evolution.js", "2323:2366");
__$coverInitRange("js/utils/evolution.js", "2372:2411");
__$coverInitRange("js/utils/evolution.js", "2417:2461");
__$coverInitRange("js/utils/evolution.js", "2227:2248");
__$coverInitRange("js/utils/evolution.js", "2511:2547");
__$coverInitRange("js/utils/evolution.js", "2553:2615");
__$coverInitRange("js/utils/evolution.js", "2621:2676");
__$coverInitRange("js/utils/evolution.js", "2682:2723");
__$coverInitRange("js/utils/evolution.js", "2729:2766");
__$coverInitRange("js/utils/evolution.js", "2772:2813");
__$coverInitRange("js/utils/evolution.js", "2588:2609");
__$coverInitRange("js/utils/evolution.js", "2856:2866");
__$coverInitRange("js/utils/evolution.js", "2872:2894");
__$coverInitRange("js/utils/evolution.js", "2900:2986");
__$coverInitRange("js/utils/evolution.js", "2992:3010");
__$coverInitRange("js/utils/evolution.js", "2927:2946");
__$coverInitRange("js/utils/evolution.js", "2954:2980");
__$coverInitRange("js/utils/evolution.js", "3053:3063");
__$coverInitRange("js/utils/evolution.js", "3069:3091");
__$coverInitRange("js/utils/evolution.js", "3097:3182");
__$coverInitRange("js/utils/evolution.js", "3188:3205");
__$coverInitRange("js/utils/evolution.js", "3124:3142");
__$coverInitRange("js/utils/evolution.js", "3150:3176");
__$coverInitRange("js/utils/evolution.js", "3263:3281");
__$coverInitRange("js/utils/evolution.js", "3287:3349");
__$coverInitRange("js/utils/evolution.js", "3355:3458");
__$coverInitRange("js/utils/evolution.js", "3464:3495");
__$coverInitRange("js/utils/evolution.js", "3501:3561");
__$coverInitRange("js/utils/evolution.js", "3567:3637");
__$coverInitRange("js/utils/evolution.js", "3643:3675");
__$coverInitRange("js/utils/evolution.js", "3322:3343");
__$coverInitRange("js/utils/evolution.js", "3402:3423");
__$coverInitRange("js/utils/evolution.js", "3431:3452");
__$coverInitRange("js/utils/evolution.js", "3594:3631");
__$coverInitRange("js/utils/evolution.js", "3733:3751");
__$coverInitRange("js/utils/evolution.js", "3757:3819");
__$coverInitRange("js/utils/evolution.js", "3825:3928");
__$coverInitRange("js/utils/evolution.js", "3934:3965");
__$coverInitRange("js/utils/evolution.js", "3971:4031");
__$coverInitRange("js/utils/evolution.js", "4037:4107");
__$coverInitRange("js/utils/evolution.js", "4113:4145");
__$coverInitRange("js/utils/evolution.js", "3792:3813");
__$coverInitRange("js/utils/evolution.js", "3872:3893");
__$coverInitRange("js/utils/evolution.js", "3901:3922");
__$coverInitRange("js/utils/evolution.js", "4064:4101");
__$coverInitRange("js/utils/evolution.js", "4190:4257");
__$coverInitRange("js/utils/evolution.js", "4263:4307");
__$coverInitRange("js/utils/evolution.js", "4313:4359");
__$coverInitRange("js/utils/evolution.js", "4365:4408");
__$coverInitRange("js/utils/evolution.js", "4414:4459");
__$coverInitRange("js/utils/evolution.js", "4465:4498");
__$coverInitRange("js/utils/evolution.js", "4504:4539");
__$coverInitRange("js/utils/evolution.js", "4545:4588");
__$coverInitRange("js/utils/evolution.js", "4594:4639");
__$coverInitRange("js/utils/evolution.js", "4645:4666");
__$coverInitRange("js/utils/evolution.js", "4672:4701");
__$coverInitRange("js/utils/evolution.js", "4707:4738");
__$coverInitRange("js/utils/evolution.js", "4744:4773");
__$coverInitRange("js/utils/evolution.js", "4779:4810");
__$coverInitRange("js/utils/evolution.js", "4816:4845");
__$coverInitRange("js/utils/evolution.js", "4851:4880");
__$coverInitRange("js/utils/evolution.js", "4886:4917");
__$coverInitRange("js/utils/evolution.js", "4923:4954");
__$coverInitRange("js/utils/evolution.js", "4960:4991");
__$coverInitRange("js/utils/evolution.js", "4997:5028");
__$coverInitRange("js/utils/evolution.js", "5034:5063");
__$coverInitRange("js/utils/evolution.js", "5069:5085");
__$coverInitRange("js/utils/evolution.js", "4235:4251");
__$coverCall('js/utils/evolution.js', '77:88');
var evolute;
__$coverCall('js/utils/evolution.js', '91:5114');
evolute = function () {
    __$coverCall('js/utils/evolution.js', '117:291');
    var absoluteX, absoluteY, contentX, contentY, maxHeight, maxWidth, minHeight, minWidth, ncss, nonContentHeight, nonContentWidth, outerHeight, outerWidth, relativeX, relativeY;
    __$coverCall('js/utils/evolution.js', '295:468');
    nonContentWidth = function (includeMargin) {
        __$coverCall('js/utils/evolution.js', '343:405');
        if (includeMargin == null) {
            __$coverCall('js/utils/evolution.js', '378:399');
            includeMargin = false;
        }
        __$coverCall('js/utils/evolution.js', '411:463');
        return this.outerWidth(includeMargin) - this.width();
    };
    __$coverCall('js/utils/evolution.js', '472:648');
    nonContentHeight = function (includeMargin) {
        __$coverCall('js/utils/evolution.js', '521:583');
        if (includeMargin == null) {
            __$coverCall('js/utils/evolution.js', '556:577');
            includeMargin = false;
        }
        __$coverCall('js/utils/evolution.js', '589:643');
        return this.outerHeight(includeMargin) - this.height();
    };
    __$coverCall('js/utils/evolution.js', '652:1062');
    outerWidth = function (includeMargin, value) {
        __$coverCall('js/utils/evolution.js', '702:712');
        var offset;
        __$coverCall('js/utils/evolution.js', '718:780');
        if (includeMargin == null) {
            __$coverCall('js/utils/evolution.js', '753:774');
            includeMargin = false;
        }
        __$coverCall('js/utils/evolution.js', '786:889');
        if (typeof includeMargin === 'number') {
            __$coverCall('js/utils/evolution.js', '833:854');
            value = includeMargin;
            __$coverCall('js/utils/evolution.js', '862:883');
            includeMargin = false;
        }
        __$coverCall('js/utils/evolution.js', '895:1013');
        if (value != null) {
            __$coverCall('js/utils/evolution.js', '922:966');
            offset = this.nonContentWidth(includeMargin);
            __$coverCall('js/utils/evolution.js', '974:1007');
            return this.width(value - offset);
        }
        __$coverCall('js/utils/evolution.js', '1019:1057');
        return this._outerWidth(includeMargin);
    };
    __$coverCall('js/utils/evolution.js', '1066:1480');
    outerHeight = function (includeMargin, value) {
        __$coverCall('js/utils/evolution.js', '1117:1127');
        var offset;
        __$coverCall('js/utils/evolution.js', '1133:1195');
        if (includeMargin == null) {
            __$coverCall('js/utils/evolution.js', '1168:1189');
            includeMargin = false;
        }
        __$coverCall('js/utils/evolution.js', '1201:1304');
        if (typeof includeMargin === 'number') {
            __$coverCall('js/utils/evolution.js', '1248:1269');
            value = includeMargin;
            __$coverCall('js/utils/evolution.js', '1277:1298');
            includeMargin = false;
        }
        __$coverCall('js/utils/evolution.js', '1310:1430');
        if (value != null) {
            __$coverCall('js/utils/evolution.js', '1337:1382');
            offset = this.nonContentHeight(includeMargin);
            __$coverCall('js/utils/evolution.js', '1390:1424');
            return this.height(value - offset);
        }
        __$coverCall('js/utils/evolution.js', '1436:1475');
        return this._outerHeight(includeMargin);
    };
    __$coverCall('js/utils/evolution.js', '1484:1834');
    ncss = function (propertyName, defaultValue) {
        __$coverCall('js/utils/evolution.js', '1534:1543');
        var value;
        __$coverCall('js/utils/evolution.js', '1549:1608');
        if (defaultValue == null) {
            __$coverCall('js/utils/evolution.js', '1583:1602');
            defaultValue = null;
        }
        __$coverCall('js/utils/evolution.js', '1614:1644');
        value = this.css(propertyName);
        __$coverCall('js/utils/evolution.js', '1650:1778');
        if (value === '' || value === 'none' || value === null || value === void 0 || value === NaN) {
            __$coverCall('js/utils/evolution.js', '1753:1772');
            return defaultValue;
        }
        __$coverCall('js/utils/evolution.js', '1784:1811');
        value = parseInt(value, 10);
        __$coverCall('js/utils/evolution.js', '1817:1829');
        return value;
    };
    __$coverCall('js/utils/evolution.js', '1838:1900');
    minWidth = function () {
        __$coverCall('js/utils/evolution.js', '1866:1895');
        return this.ncss('min-width');
    };
    __$coverCall('js/utils/evolution.js', '1904:1968');
    minHeight = function () {
        __$coverCall('js/utils/evolution.js', '1933:1963');
        return this.ncss('min-height');
    };
    __$coverCall('js/utils/evolution.js', '1972:2034');
    maxWidth = function () {
        __$coverCall('js/utils/evolution.js', '2000:2029');
        return this.ncss('max-width');
    };
    __$coverCall('js/utils/evolution.js', '2038:2102');
    maxHeight = function () {
        __$coverCall('js/utils/evolution.js', '2067:2097');
        return this.ncss('max-height');
    };
    __$coverCall('js/utils/evolution.js', '2106:2466');
    contentX = function (includeMargin) {
        __$coverCall('js/utils/evolution.js', '2147:2186');
        var borderLeft, marginLeft, paddingLeft;
        __$coverCall('js/utils/evolution.js', '2192:2254');
        if (includeMargin == null) {
            __$coverCall('js/utils/evolution.js', '2227:2248');
            includeMargin = false;
        }
        __$coverCall('js/utils/evolution.js', '2260:2317');
        marginLeft = includeMargin ? this.ncss('margin-left') : 0;
        __$coverCall('js/utils/evolution.js', '2323:2366');
        borderLeft = this.ncss('border-left-width');
        __$coverCall('js/utils/evolution.js', '2372:2411');
        paddingLeft = this.ncss('padding-left');
        __$coverCall('js/utils/evolution.js', '2417:2461');
        return marginLeft + borderLeft + paddingLeft;
    };
    __$coverCall('js/utils/evolution.js', '2470:2818');
    contentY = function (includeMargin) {
        __$coverCall('js/utils/evolution.js', '2511:2547');
        var borderTop, marginTop, paddingTop;
        __$coverCall('js/utils/evolution.js', '2553:2615');
        if (includeMargin == null) {
            __$coverCall('js/utils/evolution.js', '2588:2609');
            includeMargin = false;
        }
        __$coverCall('js/utils/evolution.js', '2621:2676');
        marginTop = includeMargin ? this.ncss('margin-top') : 0;
        __$coverCall('js/utils/evolution.js', '2682:2723');
        borderTop = this.ncss('border-top-width');
        __$coverCall('js/utils/evolution.js', '2729:2766');
        paddingTop = this.ncss('padding-top');
        __$coverCall('js/utils/evolution.js', '2772:2813');
        return marginTop + borderTop + paddingTop;
    };
    __$coverCall('js/utils/evolution.js', '2822:3015');
    absoluteX = function (value) {
        __$coverCall('js/utils/evolution.js', '2856:2866');
        var offset;
        __$coverCall('js/utils/evolution.js', '2872:2894');
        offset = this.offset();
        __$coverCall('js/utils/evolution.js', '2900:2986');
        if (value != null) {
            __$coverCall('js/utils/evolution.js', '2927:2946');
            offset.left = value;
            __$coverCall('js/utils/evolution.js', '2954:2980');
            return this.offset(offset);
        }
        __$coverCall('js/utils/evolution.js', '2992:3010');
        return offset.left;
    };
    __$coverCall('js/utils/evolution.js', '3019:3210');
    absoluteY = function (value) {
        __$coverCall('js/utils/evolution.js', '3053:3063');
        var offset;
        __$coverCall('js/utils/evolution.js', '3069:3091');
        offset = this.offset();
        __$coverCall('js/utils/evolution.js', '3097:3182');
        if (value != null) {
            __$coverCall('js/utils/evolution.js', '3124:3142');
            offset.top = value;
            __$coverCall('js/utils/evolution.js', '3150:3176');
            return this.offset(offset);
        }
        __$coverCall('js/utils/evolution.js', '3188:3205');
        return offset.top;
    };
    __$coverCall('js/utils/evolution.js', '3214:3680');
    relativeX = function (includeMargin, value) {
        __$coverCall('js/utils/evolution.js', '3263:3281');
        var offset, parent;
        __$coverCall('js/utils/evolution.js', '3287:3349');
        if (includeMargin == null) {
            __$coverCall('js/utils/evolution.js', '3322:3343');
            includeMargin = false;
        }
        __$coverCall('js/utils/evolution.js', '3355:3458');
        if (typeof includeMargin === 'number') {
            __$coverCall('js/utils/evolution.js', '3402:3423');
            value = includeMargin;
            __$coverCall('js/utils/evolution.js', '3431:3452');
            includeMargin = false;
        }
        __$coverCall('js/utils/evolution.js', '3464:3495');
        parent = evolute(this.parent());
        __$coverCall('js/utils/evolution.js', '3501:3561');
        offset = parent.absoluteX() + parent.contentX(includeMargin);
        __$coverCall('js/utils/evolution.js', '3567:3637');
        if (value != null) {
            __$coverCall('js/utils/evolution.js', '3594:3631');
            return this.absoluteX(value + offset);
        }
        __$coverCall('js/utils/evolution.js', '3643:3675');
        return this.absoluteX() - offset;
    };
    __$coverCall('js/utils/evolution.js', '3684:4150');
    relativeY = function (includeMargin, value) {
        __$coverCall('js/utils/evolution.js', '3733:3751');
        var offset, parent;
        __$coverCall('js/utils/evolution.js', '3757:3819');
        if (includeMargin == null) {
            __$coverCall('js/utils/evolution.js', '3792:3813');
            includeMargin = false;
        }
        __$coverCall('js/utils/evolution.js', '3825:3928');
        if (typeof includeMargin === 'number') {
            __$coverCall('js/utils/evolution.js', '3872:3893');
            value = includeMargin;
            __$coverCall('js/utils/evolution.js', '3901:3922');
            includeMargin = false;
        }
        __$coverCall('js/utils/evolution.js', '3934:3965');
        parent = evolute(this.parent());
        __$coverCall('js/utils/evolution.js', '3971:4031');
        offset = parent.absoluteY() + parent.contentY(includeMargin);
        __$coverCall('js/utils/evolution.js', '4037:4107');
        if (value != null) {
            __$coverCall('js/utils/evolution.js', '4064:4101');
            return this.absoluteY(value + offset);
        }
        __$coverCall('js/utils/evolution.js', '4113:4145');
        return this.absoluteY() - offset;
    };
    __$coverCall('js/utils/evolution.js', '4154:5090');
    evolute = function (jQueryObj) {
        __$coverCall('js/utils/evolution.js', '4190:4257');
        if (jQueryObj.__evoluted__ === true) {
            __$coverCall('js/utils/evolution.js', '4235:4251');
            return jQueryObj;
        }
        __$coverCall('js/utils/evolution.js', '4263:4307');
        jQueryObj._outerWidth = jQueryObj.outerWidth;
        __$coverCall('js/utils/evolution.js', '4313:4359');
        jQueryObj._outerHeight = jQueryObj.outerHeight;
        __$coverCall('js/utils/evolution.js', '4365:4408');
        jQueryObj.nonContentWidth = nonContentWidth;
        __$coverCall('js/utils/evolution.js', '4414:4459');
        jQueryObj.nonContentHeight = nonContentHeight;
        __$coverCall('js/utils/evolution.js', '4465:4498');
        jQueryObj.outerWidth = outerWidth;
        __$coverCall('js/utils/evolution.js', '4504:4539');
        jQueryObj.outerHeight = outerHeight;
        __$coverCall('js/utils/evolution.js', '4545:4588');
        jQueryObj.nonContentWidth = nonContentWidth;
        __$coverCall('js/utils/evolution.js', '4594:4639');
        jQueryObj.nonContentHeight = nonContentHeight;
        __$coverCall('js/utils/evolution.js', '4645:4666');
        jQueryObj.ncss = ncss;
        __$coverCall('js/utils/evolution.js', '4672:4701');
        jQueryObj.minWidth = minWidth;
        __$coverCall('js/utils/evolution.js', '4707:4738');
        jQueryObj.minHeight = minHeight;
        __$coverCall('js/utils/evolution.js', '4744:4773');
        jQueryObj.maxWidth = maxWidth;
        __$coverCall('js/utils/evolution.js', '4779:4810');
        jQueryObj.maxHeight = maxHeight;
        __$coverCall('js/utils/evolution.js', '4816:4845');
        jQueryObj.contentX = contentX;
        __$coverCall('js/utils/evolution.js', '4851:4880');
        jQueryObj.contentY = contentY;
        __$coverCall('js/utils/evolution.js', '4886:4917');
        jQueryObj.absoluteX = absoluteX;
        __$coverCall('js/utils/evolution.js', '4923:4954');
        jQueryObj.absoluteY = absoluteY;
        __$coverCall('js/utils/evolution.js', '4960:4991');
        jQueryObj.relativeX = relativeX;
        __$coverCall('js/utils/evolution.js', '4997:5028');
        jQueryObj.relativeY = relativeY;
        __$coverCall('js/utils/evolution.js', '5034:5063');
        jQueryObj.__evoluted__ = true;
        __$coverCall('js/utils/evolution.js', '5069:5085');
        return jQueryObj;
    };
    __$coverCall('js/utils/evolution.js', '5094:5108');
    return evolute;
}();