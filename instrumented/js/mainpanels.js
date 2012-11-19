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
__$coverInit("src/js/mainpanels.js", "var DimainPanel, MonomainPanel, TrimainPanel,\n  __hasProp = {}.hasOwnProperty,\n  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };\n\nMonomainPanel = (function() {\n\n  function MonomainPanel(core, profile) {\n    var editorPanel;\n    editorPanel = new profile.editorClass(core);\n    editorPanel.element.addClass('mainPanel');\n    return editorPanel;\n  }\n\n  return MonomainPanel;\n\n})();\n\nDimainPanel = (function(_super) {\n\n  __extends(DimainPanel, _super);\n\n  function DimainPanel(core, profile) {\n    var _this = this;\n    this.editorPanel = new profile.editorClass(core);\n    this.viewerPanel = new profile.viewerClass(core);\n    DimainPanel.__super__.constructor.call(this, core, this.editorPanel, this.viewerPanel, profile.defaultVolume);\n    this.element.addClass('mainPanel');\n    this.editorPanel.change(function(value) {\n      return _this.viewerPanel.update(value);\n    });\n  }\n\n  DimainPanel.prototype.init = function() {\n    DimainPanel.__super__.init.call(this);\n    return this.viewerPanel.update(this.editorPanel.val());\n  };\n\n  return DimainPanel;\n\n})(VerticalPanel);\n\nTrimainPanel = (function(_super) {\n\n  __extends(TrimainPanel, _super);\n\n  function TrimainPanel(core, profile) {\n    var _this = this;\n    this.editorPanel = new profile.editorClass(core);\n    this.viewerPanel = new profile.viewerClass(core);\n    this.helperPanel = new profile.helperClass(core);\n    this.verticalPanel = new VerticalPanel(core, this.editorPanel, this.viewerPanel, profile.defaultVolume);\n    TrimainPanel.__super__.constructor.call(this, core, this.verticalPanel, this.helperPanel, profile.defaultVolume2);\n    this.element.addClass('mainPanel');\n    this.editorPanel.change(function(value) {\n      return _this.viewerPanel.update(value);\n    });\n  }\n\n  TrimainPanel.prototype.init = function() {\n    TrimainPanel.__super__.init.call(this);\n    return this.viewerPanel.update(this.editorPanel.val());\n  };\n\n  return TrimainPanel;\n\n})(HorizontalPanel);\n\nnamespace('Jencil.mainpanels', function(exports) {\n  exports.MonomainPanel = MonomainPanel;\n  exports.DimainPanel = DimainPanel;\n  return exports.TrimainPanel = TrimainPanel;\n});\n");
__$coverInitRange("src/js/mainpanels.js", "0:368");
__$coverInitRange("src/js/mainpanels.js", "371:619");
__$coverInitRange("src/js/mainpanels.js", "622:1315");
__$coverInitRange("src/js/mainpanels.js", "1318:2186");
__$coverInitRange("src/js/mainpanels.js", "2189:2366");
__$coverInitRange("src/js/mainpanels.js", "119:204");
__$coverInitRange("src/js/mainpanels.js", "206:250");
__$coverInitRange("src/js/mainpanels.js", "252:285");
__$coverInitRange("src/js/mainpanels.js", "287:315");
__$coverInitRange("src/js/mainpanels.js", "317:351");
__$coverInitRange("src/js/mainpanels.js", "353:365");
__$coverInitRange("src/js/mainpanels.js", "145:202");
__$coverInitRange("src/js/mainpanels.js", "224:248");
__$coverInitRange("src/js/mainpanels.js", "404:587");
__$coverInitRange("src/js/mainpanels.js", "592:612");
__$coverInitRange("src/js/mainpanels.js", "448:463");
__$coverInitRange("src/js/mainpanels.js", "469:512");
__$coverInitRange("src/js/mainpanels.js", "518:559");
__$coverInitRange("src/js/mainpanels.js", "565:583");
__$coverInitRange("src/js/mainpanels.js", "659:689");
__$coverInitRange("src/js/mainpanels.js", "694:1119");
__$coverInitRange("src/js/mainpanels.js", "1124:1272");
__$coverInitRange("src/js/mainpanels.js", "1277:1295");
__$coverInitRange("src/js/mainpanels.js", "736:752");
__$coverInitRange("src/js/mainpanels.js", "758:806");
__$coverInitRange("src/js/mainpanels.js", "812:860");
__$coverInitRange("src/js/mainpanels.js", "866:975");
__$coverInitRange("src/js/mainpanels.js", "981:1015");
__$coverInitRange("src/js/mainpanels.js", "1021:1115");
__$coverInitRange("src/js/mainpanels.js", "1069:1107");
__$coverInitRange("src/js/mainpanels.js", "1170:1207");
__$coverInitRange("src/js/mainpanels.js", "1213:1267");
__$coverInitRange("src/js/mainpanels.js", "1356:1387");
__$coverInitRange("src/js/mainpanels.js", "1392:1985");
__$coverInitRange("src/js/mainpanels.js", "1990:2140");
__$coverInitRange("src/js/mainpanels.js", "2145:2164");
__$coverInitRange("src/js/mainpanels.js", "1435:1451");
__$coverInitRange("src/js/mainpanels.js", "1457:1505");
__$coverInitRange("src/js/mainpanels.js", "1511:1559");
__$coverInitRange("src/js/mainpanels.js", "1565:1613");
__$coverInitRange("src/js/mainpanels.js", "1619:1722");
__$coverInitRange("src/js/mainpanels.js", "1728:1841");
__$coverInitRange("src/js/mainpanels.js", "1847:1881");
__$coverInitRange("src/js/mainpanels.js", "1887:1981");
__$coverInitRange("src/js/mainpanels.js", "1935:1973");
__$coverInitRange("src/js/mainpanels.js", "2037:2075");
__$coverInitRange("src/js/mainpanels.js", "2081:2135");
__$coverInitRange("src/js/mainpanels.js", "2242:2279");
__$coverInitRange("src/js/mainpanels.js", "2283:2316");
__$coverInitRange("src/js/mainpanels.js", "2320:2362");
__$coverCall('src/js/mainpanels.js', '0:368');
var DimainPanel, MonomainPanel, TrimainPanel, __hasProp = {}.hasOwnProperty, __extends = function (child, parent) {
        __$coverCall('src/js/mainpanels.js', '119:204');
        for (var key in parent) {
            __$coverCall('src/js/mainpanels.js', '145:202');
            if (__hasProp.call(parent, key))
                child[key] = parent[key];
        }
        __$coverCall('src/js/mainpanels.js', '206:250');
        function ctor() {
            __$coverCall('src/js/mainpanels.js', '224:248');
            this.constructor = child;
        }
        __$coverCall('src/js/mainpanels.js', '252:285');
        ctor.prototype = parent.prototype;
        __$coverCall('src/js/mainpanels.js', '287:315');
        child.prototype = new ctor();
        __$coverCall('src/js/mainpanels.js', '317:351');
        child.__super__ = parent.prototype;
        __$coverCall('src/js/mainpanels.js', '353:365');
        return child;
    };
__$coverCall('src/js/mainpanels.js', '371:619');
MonomainPanel = function () {
    __$coverCall('src/js/mainpanels.js', '404:587');
    function MonomainPanel(core, profile) {
        __$coverCall('src/js/mainpanels.js', '448:463');
        var editorPanel;
        __$coverCall('src/js/mainpanels.js', '469:512');
        editorPanel = new profile.editorClass(core);
        __$coverCall('src/js/mainpanels.js', '518:559');
        editorPanel.element.addClass('mainPanel');
        __$coverCall('src/js/mainpanels.js', '565:583');
        return editorPanel;
    }
    __$coverCall('src/js/mainpanels.js', '592:612');
    return MonomainPanel;
}();
__$coverCall('src/js/mainpanels.js', '622:1315');
DimainPanel = function (_super) {
    __$coverCall('src/js/mainpanels.js', '659:689');
    __extends(DimainPanel, _super);
    __$coverCall('src/js/mainpanels.js', '694:1119');
    function DimainPanel(core, profile) {
        __$coverCall('src/js/mainpanels.js', '736:752');
        var _this = this;
        __$coverCall('src/js/mainpanels.js', '758:806');
        this.editorPanel = new profile.editorClass(core);
        __$coverCall('src/js/mainpanels.js', '812:860');
        this.viewerPanel = new profile.viewerClass(core);
        __$coverCall('src/js/mainpanels.js', '866:975');
        DimainPanel.__super__.constructor.call(this, core, this.editorPanel, this.viewerPanel, profile.defaultVolume);
        __$coverCall('src/js/mainpanels.js', '981:1015');
        this.element.addClass('mainPanel');
        __$coverCall('src/js/mainpanels.js', '1021:1115');
        this.editorPanel.change(function (value) {
            __$coverCall('src/js/mainpanels.js', '1069:1107');
            return _this.viewerPanel.update(value);
        });
    }
    __$coverCall('src/js/mainpanels.js', '1124:1272');
    DimainPanel.prototype.init = function () {
        __$coverCall('src/js/mainpanels.js', '1170:1207');
        DimainPanel.__super__.init.call(this);
        __$coverCall('src/js/mainpanels.js', '1213:1267');
        return this.viewerPanel.update(this.editorPanel.val());
    };
    __$coverCall('src/js/mainpanels.js', '1277:1295');
    return DimainPanel;
}(VerticalPanel);
__$coverCall('src/js/mainpanels.js', '1318:2186');
TrimainPanel = function (_super) {
    __$coverCall('src/js/mainpanels.js', '1356:1387');
    __extends(TrimainPanel, _super);
    __$coverCall('src/js/mainpanels.js', '1392:1985');
    function TrimainPanel(core, profile) {
        __$coverCall('src/js/mainpanels.js', '1435:1451');
        var _this = this;
        __$coverCall('src/js/mainpanels.js', '1457:1505');
        this.editorPanel = new profile.editorClass(core);
        __$coverCall('src/js/mainpanels.js', '1511:1559');
        this.viewerPanel = new profile.viewerClass(core);
        __$coverCall('src/js/mainpanels.js', '1565:1613');
        this.helperPanel = new profile.helperClass(core);
        __$coverCall('src/js/mainpanels.js', '1619:1722');
        this.verticalPanel = new VerticalPanel(core, this.editorPanel, this.viewerPanel, profile.defaultVolume);
        __$coverCall('src/js/mainpanels.js', '1728:1841');
        TrimainPanel.__super__.constructor.call(this, core, this.verticalPanel, this.helperPanel, profile.defaultVolume2);
        __$coverCall('src/js/mainpanels.js', '1847:1881');
        this.element.addClass('mainPanel');
        __$coverCall('src/js/mainpanels.js', '1887:1981');
        this.editorPanel.change(function (value) {
            __$coverCall('src/js/mainpanels.js', '1935:1973');
            return _this.viewerPanel.update(value);
        });
    }
    __$coverCall('src/js/mainpanels.js', '1990:2140');
    TrimainPanel.prototype.init = function () {
        __$coverCall('src/js/mainpanels.js', '2037:2075');
        TrimainPanel.__super__.init.call(this);
        __$coverCall('src/js/mainpanels.js', '2081:2135');
        return this.viewerPanel.update(this.editorPanel.val());
    };
    __$coverCall('src/js/mainpanels.js', '2145:2164');
    return TrimainPanel;
}(HorizontalPanel);
__$coverCall('src/js/mainpanels.js', '2189:2366');
namespace('Jencil.mainpanels', function (exports) {
    __$coverCall('src/js/mainpanels.js', '2242:2279');
    exports.MonomainPanel = MonomainPanel;
    __$coverCall('src/js/mainpanels.js', '2283:2316');
    exports.DimainPanel = DimainPanel;
    __$coverCall('src/js/mainpanels.js', '2320:2362');
    return exports.TrimainPanel = TrimainPanel;
});