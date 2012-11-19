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
__$coverInit("src/js/buttons.js", "var ActionButton, Button, CommandButton, FullscreenButton, HelperButton, RedoButton, Separator, UndoButton, ViewerButton, buttonFactory,\n  __hasProp = {}.hasOwnProperty,\n  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };\n\nSeparator = (function(_super) {\n\n  __extends(Separator, _super);\n\n  function Separator(core) {\n    Separator.__super__.constructor.call(this, core, '<span>');\n    this.element.addClass('separator');\n  }\n\n  return Separator;\n\n})(Widget);\n\nButton = (function(_super) {\n\n  __extends(Button, _super);\n\n  function Button(core, name, text, title) {\n    this.name = name;\n    this.text = text;\n    this.title = title;\n    Button.__super__.constructor.call(this, core, '<a>');\n    this.text = Jencil.t(this.text || this.name);\n    this.title = Jencil.t(this.title || this.text);\n    this.element.addClass('button').addClass(name);\n    this.element.append($(\"<span>\" + this.text + \"</span>\"));\n    this.element.attr('title', this.title);\n  }\n\n  Button.prototype.enable = function() {\n    this.element.removeClass('disable');\n    return this;\n  };\n\n  Button.prototype.disable = function() {\n    this.element.addClass('disable');\n    return this;\n  };\n\n  Button.prototype.init = function() {\n    this.validate();\n    return this;\n  };\n\n  Button.prototype.validate = function() {\n    return this;\n  };\n\n  return Button;\n\n})(Widget);\n\nActionButton = (function(_super) {\n\n  __extends(ActionButton, _super);\n\n  function ActionButton(core, name, text, title, callback, shortcut) {\n    var _this = this;\n    this.shortcut = shortcut;\n    ActionButton.__super__.constructor.call(this, core, name, text, title);\n    this.callback = function() {\n      if (!_this.element.hasClass('disable')) {\n        _this.callback.raw();\n      }\n      return _this;\n    };\n    this.callback.raw = callback;\n    this.element.click(function() {\n      return _this.callback();\n    });\n    if ((this.shortcut != null) && (window.shortcut != null)) {\n      window.shortcut.add(this.shortcut, function(e) {\n        return _this.callback();\n      });\n      this.element.attr('title', \"\" + this.title + \" (\" + this.shortcut + \")\");\n    }\n  }\n\n  return ActionButton;\n\n})(Button);\n\nCommandButton = (function(_super) {\n\n  __extends(CommandButton, _super);\n\n  function CommandButton(core, name, text, title, command, shortcut) {\n    var callback;\n    this.command = command;\n    callback = function() {\n      var editor;\n      editor = core.editor();\n      return editor[command].call(editor);\n    };\n    CommandButton.__super__.constructor.call(this, core, name, text, title, callback, shortcut);\n  }\n\n  CommandButton.prototype.validate = function() {\n    var editor;\n    editor = this.core.editor();\n    if (!(editor[this.command] != null)) {\n      this.disable();\n    }\n    return this;\n  };\n\n  CommandButton.factory = function(core, args) {\n    var command, name, shortcut, text, title;\n    name = text = title = command = shortcut = null;\n    switch (args.length) {\n      case 5:\n        name = args[0];\n        text = args[1];\n        title = args[2];\n        command = args[3];\n        shortcut = args[4];\n        break;\n      case 4:\n        name = args[0];\n        text = title = args[1];\n        command = args[2];\n        shortcut = args[3];\n        break;\n      case 3:\n        name = command = args[0];\n        text = title = args[1];\n        shortcut = args[2];\n        break;\n      case 2:\n        name = command = args[0];\n        text = title = args[1];\n        shortcut = null;\n        break;\n      case 1:\n        name = command = text = title = args[0];\n        shortcut = null;\n    }\n    return new CommandButton(core, name, text, title, command, shortcut);\n  };\n\n  return CommandButton;\n\n})(ActionButton);\n\nUndoButton = (function(_super) {\n\n  __extends(UndoButton, _super);\n\n  function UndoButton(core) {\n    var callback,\n      _this = this;\n    callback = function(e) {\n      return _this.core.caretaker.undo();\n    };\n    UndoButton.__super__.constructor.call(this, core, 'undo', 'Undo', 'Undo', callback, 'Ctrl+Z');\n  }\n\n  UndoButton.prototype.init = function() {\n    var check,\n      _this = this;\n    check = function() {\n      if (_this.core.caretaker.canUndo() === false) {\n        _this.disable();\n      } else {\n        _this.enable();\n      }\n      return setTimeout(check, 100);\n    };\n    return check();\n  };\n\n  return UndoButton;\n\n})(ActionButton);\n\nRedoButton = (function(_super) {\n\n  __extends(RedoButton, _super);\n\n  function RedoButton(core) {\n    var callback,\n      _this = this;\n    callback = function(e) {\n      return _this.core.caretaker.redo();\n    };\n    RedoButton.__super__.constructor.call(this, core, 'redo', 'Redo', 'Redo', callback, 'Ctrl+Shift+Z');\n  }\n\n  RedoButton.prototype.init = function() {\n    var check,\n      _this = this;\n    check = function() {\n      if (_this.core.caretaker.canRedo() === false) {\n        _this.disable();\n      } else {\n        _this.enable();\n      }\n      return setTimeout(check, 100);\n    };\n    return check();\n  };\n\n  return RedoButton;\n\n})(ActionButton);\n\nFullscreenButton = (function(_super) {\n\n  __extends(FullscreenButton, _super);\n\n  function FullscreenButton(core) {\n    var callback,\n      _this = this;\n    callback = function(e) {\n      return _this.core.fullscreen.toggle();\n    };\n    FullscreenButton.__super__.constructor.call(this, core, 'fullscreen', 'Toggle fullscreen', 'Fullscreen', callback, 'Ctrl+F');\n  }\n\n  FullscreenButton.prototype.init = function() {\n    var check,\n      _this = this;\n    check = function() {\n      if (_this.core.fullscreen.element.is(':visible') === true) {\n        _this.element.addClass('hide');\n      } else {\n        _this.element.removeClass('hide');\n      }\n      return setTimeout(check, 100);\n    };\n    return check();\n  };\n\n  return FullscreenButton;\n\n})(ActionButton);\n\nViewerButton = (function(_super) {\n\n  __extends(ViewerButton, _super);\n\n  function ViewerButton(core) {\n    var callback,\n      _this = this;\n    callback = function(e) {\n      return _this.core.viewer().toggle();\n    };\n    ViewerButton.__super__.constructor.call(this, core, 'viewer', 'Quick view', 'Quick view', callback, 'Ctrl+Q');\n  }\n\n  ViewerButton.prototype.validate = function() {\n    if (!(this.core.viewer() != null)) {\n      this.disable();\n      return false;\n    }\n    return true;\n  };\n\n  ViewerButton.prototype.init = function() {\n    var check,\n      _this = this;\n    if (!this.validate()) {\n      return;\n    }\n    check = function() {\n      if (_this.core.viewer().element.is(':visible')) {\n        _this.element.addClass('hide');\n      } else {\n        _this.element.removeClass('hide');\n      }\n      return setTimeout(check, 100);\n    };\n    return check();\n  };\n\n  return ViewerButton;\n\n})(ActionButton);\n\nHelperButton = (function(_super) {\n\n  __extends(HelperButton, _super);\n\n  function HelperButton(core) {\n    var callback,\n      _this = this;\n    callback = function(e) {\n      return _this.core.helper().toggle();\n    };\n    HelperButton.__super__.constructor.call(this, core, 'helper', 'Help', 'Help', callback, 'Ctrl+H');\n  }\n\n  HelperButton.prototype.validate = function() {\n    if (!this.core.helper()) {\n      this.disable();\n      return false;\n    }\n    return true;\n  };\n\n  HelperButton.prototype.init = function() {\n    var check,\n      _this = this;\n    if (!this.validate()) {\n      return;\n    }\n    check = function() {\n      if (_this.core.helper().element.is(':visible')) {\n        _this.element.addClass('hide');\n      } else {\n        _this.element.removeClass('hide');\n      }\n      return setTimeout(check, 100);\n    };\n    return check();\n  };\n\n  return HelperButton;\n\n})(ActionButton);\n\nbuttonFactory = function(core, value) {\n  if (value instanceof Array) {\n    return CommandButton.factory(core, value);\n  }\n  if (typeof value === 'string') {\n    switch (value) {\n      case 'Separator':\n        return new Separator(core);\n      case 'Undo':\n        return new UndoButton(core);\n      case 'Redo':\n        return new RedoButton(core);\n      case 'Fullscreen':\n        return new FullscreenButton(core);\n      case 'Viewer':\n        return new ViewerButton(core);\n      case 'Helper':\n        return new HelperButton(core);\n      default:\n        throw new Exception(\"\" + value + \" is not known Button type\");\n    }\n  }\n  return new value(core);\n};\n\nnamespace('Jencil.buttons', function(exports) {\n  exports.Separator = Separator;\n  exports.Button = Button;\n  exports.ActionButton = ActionButton;\n  exports.CommandButton = CommandButton;\n  exports.UndoButton = UndoButton;\n  exports.RedoButton = RedoButton;\n  exports.FullscreenButton = FullscreenButton;\n  exports.ViewerButton = ViewerButton;\n  exports.HelperButton = HelperButton;\n  return exports.buttonFactory = buttonFactory;\n});\n");
__$coverInitRange("src/js/buttons.js", "0:459");
__$coverInitRange("src/js/buttons.js", "462:697");
__$coverInitRange("src/js/buttons.js", "700:1581");
__$coverInitRange("src/js/buttons.js", "1584:2397");
__$coverInitRange("src/js/buttons.js", "2400:3942");
__$coverInitRange("src/js/buttons.js", "3945:4600");
__$coverInitRange("src/js/buttons.js", "4603:5264");
__$coverInitRange("src/js/buttons.js", "5267:6033");
__$coverInitRange("src/js/buttons.js", "6036:6963");
__$coverInitRange("src/js/buttons.js", "6966:7871");
__$coverInitRange("src/js/buttons.js", "7874:8536");
__$coverInitRange("src/js/buttons.js", "8539:8972");
__$coverInitRange("src/js/buttons.js", "210:295");
__$coverInitRange("src/js/buttons.js", "297:341");
__$coverInitRange("src/js/buttons.js", "343:376");
__$coverInitRange("src/js/buttons.js", "378:406");
__$coverInitRange("src/js/buttons.js", "408:442");
__$coverInitRange("src/js/buttons.js", "444:456");
__$coverInitRange("src/js/buttons.js", "236:293");
__$coverInitRange("src/js/buttons.js", "315:339");
__$coverInitRange("src/js/buttons.js", "497:525");
__$coverInitRange("src/js/buttons.js", "530:663");
__$coverInitRange("src/js/buttons.js", "668:684");
__$coverInitRange("src/js/buttons.js", "561:619");
__$coverInitRange("src/js/buttons.js", "625:659");
__$coverInitRange("src/js/buttons.js", "732:757");
__$coverInitRange("src/js/buttons.js", "762:1193");
__$coverInitRange("src/js/buttons.js", "1198:1298");
__$coverInitRange("src/js/buttons.js", "1303:1401");
__$coverInitRange("src/js/buttons.js", "1406:1484");
__$coverInitRange("src/js/buttons.js", "1489:1550");
__$coverInitRange("src/js/buttons.js", "1555:1568");
__$coverInitRange("src/js/buttons.js", "809:825");
__$coverInitRange("src/js/buttons.js", "831:847");
__$coverInitRange("src/js/buttons.js", "853:871");
__$coverInitRange("src/js/buttons.js", "877:929");
__$coverInitRange("src/js/buttons.js", "935:979");
__$coverInitRange("src/js/buttons.js", "985:1031");
__$coverInitRange("src/js/buttons.js", "1037:1083");
__$coverInitRange("src/js/buttons.js", "1089:1145");
__$coverInitRange("src/js/buttons.js", "1151:1189");
__$coverInitRange("src/js/buttons.js", "1241:1276");
__$coverInitRange("src/js/buttons.js", "1282:1293");
__$coverInitRange("src/js/buttons.js", "1347:1379");
__$coverInitRange("src/js/buttons.js", "1385:1396");
__$coverInitRange("src/js/buttons.js", "1447:1462");
__$coverInitRange("src/js/buttons.js", "1468:1479");
__$coverInitRange("src/js/buttons.js", "1534:1545");
__$coverInitRange("src/js/buttons.js", "1622:1653");
__$coverInitRange("src/js/buttons.js", "1658:2360");
__$coverInitRange("src/js/buttons.js", "2365:2384");
__$coverInitRange("src/js/buttons.js", "1731:1747");
__$coverInitRange("src/js/buttons.js", "1753:1777");
__$coverInitRange("src/js/buttons.js", "1783:1853");
__$coverInitRange("src/js/buttons.js", "1859:1999");
__$coverInitRange("src/js/buttons.js", "2005:2033");
__$coverInitRange("src/js/buttons.js", "2039:2108");
__$coverInitRange("src/js/buttons.js", "2114:2356");
__$coverInitRange("src/js/buttons.js", "1894:1972");
__$coverInitRange("src/js/buttons.js", "1980:1992");
__$coverInitRange("src/js/buttons.js", "1944:1964");
__$coverInitRange("src/js/buttons.js", "2077:2100");
__$coverInitRange("src/js/buttons.js", "2180:2270");
__$coverInitRange("src/js/buttons.js", "2278:2350");
__$coverInitRange("src/js/buttons.js", "2237:2260");
__$coverInitRange("src/js/buttons.js", "2439:2471");
__$coverInitRange("src/js/buttons.js", "2476:2816");
__$coverInitRange("src/js/buttons.js", "2821:3009");
__$coverInitRange("src/js/buttons.js", "3014:3898");
__$coverInitRange("src/js/buttons.js", "3903:3923");
__$coverInitRange("src/js/buttons.js", "2549:2561");
__$coverInitRange("src/js/buttons.js", "2567:2589");
__$coverInitRange("src/js/buttons.js", "2595:2715");
__$coverInitRange("src/js/buttons.js", "2721:2812");
__$coverInitRange("src/js/buttons.js", "2625:2635");
__$coverInitRange("src/js/buttons.js", "2643:2665");
__$coverInitRange("src/js/buttons.js", "2673:2708");
__$coverInitRange("src/js/buttons.js", "2873:2883");
__$coverInitRange("src/js/buttons.js", "2889:2916");
__$coverInitRange("src/js/buttons.js", "2922:2987");
__$coverInitRange("src/js/buttons.js", "2993:3004");
__$coverInitRange("src/js/buttons.js", "2967:2981");
__$coverInitRange("src/js/buttons.js", "3065:3105");
__$coverInitRange("src/js/buttons.js", "3111:3158");
__$coverInitRange("src/js/buttons.js", "3164:3819");
__$coverInitRange("src/js/buttons.js", "3825:3893");
__$coverInitRange("src/js/buttons.js", "3209:3223");
__$coverInitRange("src/js/buttons.js", "3233:3247");
__$coverInitRange("src/js/buttons.js", "3257:3272");
__$coverInitRange("src/js/buttons.js", "3282:3299");
__$coverInitRange("src/js/buttons.js", "3309:3327");
__$coverInitRange("src/js/buttons.js", "3337:3342");
__$coverInitRange("src/js/buttons.js", "3366:3380");
__$coverInitRange("src/js/buttons.js", "3390:3412");
__$coverInitRange("src/js/buttons.js", "3422:3439");
__$coverInitRange("src/js/buttons.js", "3449:3467");
__$coverInitRange("src/js/buttons.js", "3477:3482");
__$coverInitRange("src/js/buttons.js", "3506:3530");
__$coverInitRange("src/js/buttons.js", "3540:3562");
__$coverInitRange("src/js/buttons.js", "3572:3590");
__$coverInitRange("src/js/buttons.js", "3600:3605");
__$coverInitRange("src/js/buttons.js", "3629:3653");
__$coverInitRange("src/js/buttons.js", "3663:3685");
__$coverInitRange("src/js/buttons.js", "3695:3710");
__$coverInitRange("src/js/buttons.js", "3720:3725");
__$coverInitRange("src/js/buttons.js", "3749:3788");
__$coverInitRange("src/js/buttons.js", "3798:3813");
__$coverInitRange("src/js/buttons.js", "3981:4010");
__$coverInitRange("src/js/buttons.js", "4015:4260");
__$coverInitRange("src/js/buttons.js", "4265:4559");
__$coverInitRange("src/js/buttons.js", "4564:4581");
__$coverInitRange("src/js/buttons.js", "4047:4079");
__$coverInitRange("src/js/buttons.js", "4085:4157");
__$coverInitRange("src/js/buttons.js", "4163:4256");
__$coverInitRange("src/js/buttons.js", "4116:4150");
__$coverInitRange("src/js/buttons.js", "4310:4339");
__$coverInitRange("src/js/buttons.js", "4345:4534");
__$coverInitRange("src/js/buttons.js", "4540:4554");
__$coverInitRange("src/js/buttons.js", "4372:4490");
__$coverInitRange("src/js/buttons.js", "4498:4527");
__$coverInitRange("src/js/buttons.js", "4428:4443");
__$coverInitRange("src/js/buttons.js", "4468:4482");
__$coverInitRange("src/js/buttons.js", "4639:4668");
__$coverInitRange("src/js/buttons.js", "4673:4924");
__$coverInitRange("src/js/buttons.js", "4929:5223");
__$coverInitRange("src/js/buttons.js", "5228:5245");
__$coverInitRange("src/js/buttons.js", "4705:4737");
__$coverInitRange("src/js/buttons.js", "4743:4815");
__$coverInitRange("src/js/buttons.js", "4821:4920");
__$coverInitRange("src/js/buttons.js", "4774:4808");
__$coverInitRange("src/js/buttons.js", "4974:5003");
__$coverInitRange("src/js/buttons.js", "5009:5198");
__$coverInitRange("src/js/buttons.js", "5204:5218");
__$coverInitRange("src/js/buttons.js", "5036:5154");
__$coverInitRange("src/js/buttons.js", "5162:5191");
__$coverInitRange("src/js/buttons.js", "5092:5107");
__$coverInitRange("src/js/buttons.js", "5132:5146");
__$coverInitRange("src/js/buttons.js", "5309:5344");
__$coverInitRange("src/js/buttons.js", "5349:5634");
__$coverInitRange("src/js/buttons.js", "5639:5986");
__$coverInitRange("src/js/buttons.js", "5991:6014");
__$coverInitRange("src/js/buttons.js", "5387:5419");
__$coverInitRange("src/js/buttons.js", "5425:5500");
__$coverInitRange("src/js/buttons.js", "5506:5630");
__$coverInitRange("src/js/buttons.js", "5456:5493");
__$coverInitRange("src/js/buttons.js", "5690:5719");
__$coverInitRange("src/js/buttons.js", "5725:5961");
__$coverInitRange("src/js/buttons.js", "5967:5981");
__$coverInitRange("src/js/buttons.js", "5752:5917");
__$coverInitRange("src/js/buttons.js", "5925:5954");
__$coverInitRange("src/js/buttons.js", "5821:5851");
__$coverInitRange("src/js/buttons.js", "5876:5909");
__$coverInitRange("src/js/buttons.js", "6074:6105");
__$coverInitRange("src/js/buttons.js", "6110:6374");
__$coverInitRange("src/js/buttons.js", "6379:6535");
__$coverInitRange("src/js/buttons.js", "6540:6920");
__$coverInitRange("src/js/buttons.js", "6925:6944");
__$coverInitRange("src/js/buttons.js", "6144:6176");
__$coverInitRange("src/js/buttons.js", "6182:6255");
__$coverInitRange("src/js/buttons.js", "6261:6370");
__$coverInitRange("src/js/buttons.js", "6213:6248");
__$coverInitRange("src/js/buttons.js", "6430:6513");
__$coverInitRange("src/js/buttons.js", "6519:6530");
__$coverInitRange("src/js/buttons.js", "6473:6487");
__$coverInitRange("src/js/buttons.js", "6495:6507");
__$coverInitRange("src/js/buttons.js", "6587:6616");
__$coverInitRange("src/js/buttons.js", "6622:6664");
__$coverInitRange("src/js/buttons.js", "6670:6895");
__$coverInitRange("src/js/buttons.js", "6901:6915");
__$coverInitRange("src/js/buttons.js", "6652:6658");
__$coverInitRange("src/js/buttons.js", "6697:6851");
__$coverInitRange("src/js/buttons.js", "6859:6888");
__$coverInitRange("src/js/buttons.js", "6755:6785");
__$coverInitRange("src/js/buttons.js", "6810:6843");
__$coverInitRange("src/js/buttons.js", "7004:7035");
__$coverInitRange("src/js/buttons.js", "7040:7292");
__$coverInitRange("src/js/buttons.js", "7297:7443");
__$coverInitRange("src/js/buttons.js", "7448:7828");
__$coverInitRange("src/js/buttons.js", "7833:7852");
__$coverInitRange("src/js/buttons.js", "7074:7106");
__$coverInitRange("src/js/buttons.js", "7112:7185");
__$coverInitRange("src/js/buttons.js", "7191:7288");
__$coverInitRange("src/js/buttons.js", "7143:7178");
__$coverInitRange("src/js/buttons.js", "7348:7421");
__$coverInitRange("src/js/buttons.js", "7427:7438");
__$coverInitRange("src/js/buttons.js", "7381:7395");
__$coverInitRange("src/js/buttons.js", "7403:7415");
__$coverInitRange("src/js/buttons.js", "7495:7524");
__$coverInitRange("src/js/buttons.js", "7530:7572");
__$coverInitRange("src/js/buttons.js", "7578:7803");
__$coverInitRange("src/js/buttons.js", "7809:7823");
__$coverInitRange("src/js/buttons.js", "7560:7566");
__$coverInitRange("src/js/buttons.js", "7605:7759");
__$coverInitRange("src/js/buttons.js", "7767:7796");
__$coverInitRange("src/js/buttons.js", "7663:7693");
__$coverInitRange("src/js/buttons.js", "7718:7751");
__$coverInitRange("src/js/buttons.js", "7916:7995");
__$coverInitRange("src/js/buttons.js", "7999:8507");
__$coverInitRange("src/js/buttons.js", "8511:8533");
__$coverInitRange("src/js/buttons.js", "7950:7991");
__$coverInitRange("src/js/buttons.js", "8036:8503");
__$coverInitRange("src/js/buttons.js", "8085:8111");
__$coverInitRange("src/js/buttons.js", "8140:8167");
__$coverInitRange("src/js/buttons.js", "8196:8223");
__$coverInitRange("src/js/buttons.js", "8258:8291");
__$coverInitRange("src/js/buttons.js", "8322:8351");
__$coverInitRange("src/js/buttons.js", "8382:8411");
__$coverInitRange("src/js/buttons.js", "8436:8497");
__$coverInitRange("src/js/buttons.js", "8589:8618");
__$coverInitRange("src/js/buttons.js", "8622:8645");
__$coverInitRange("src/js/buttons.js", "8649:8684");
__$coverInitRange("src/js/buttons.js", "8688:8725");
__$coverInitRange("src/js/buttons.js", "8729:8760");
__$coverInitRange("src/js/buttons.js", "8764:8795");
__$coverInitRange("src/js/buttons.js", "8799:8842");
__$coverInitRange("src/js/buttons.js", "8846:8881");
__$coverInitRange("src/js/buttons.js", "8885:8920");
__$coverInitRange("src/js/buttons.js", "8924:8968");
__$coverCall('src/js/buttons.js', '0:459');
var ActionButton, Button, CommandButton, FullscreenButton, HelperButton, RedoButton, Separator, UndoButton, ViewerButton, buttonFactory, __hasProp = {}.hasOwnProperty, __extends = function (child, parent) {
        __$coverCall('src/js/buttons.js', '210:295');
        for (var key in parent) {
            __$coverCall('src/js/buttons.js', '236:293');
            if (__hasProp.call(parent, key))
                child[key] = parent[key];
        }
        __$coverCall('src/js/buttons.js', '297:341');
        function ctor() {
            __$coverCall('src/js/buttons.js', '315:339');
            this.constructor = child;
        }
        __$coverCall('src/js/buttons.js', '343:376');
        ctor.prototype = parent.prototype;
        __$coverCall('src/js/buttons.js', '378:406');
        child.prototype = new ctor();
        __$coverCall('src/js/buttons.js', '408:442');
        child.__super__ = parent.prototype;
        __$coverCall('src/js/buttons.js', '444:456');
        return child;
    };
__$coverCall('src/js/buttons.js', '462:697');
Separator = function (_super) {
    __$coverCall('src/js/buttons.js', '497:525');
    __extends(Separator, _super);
    __$coverCall('src/js/buttons.js', '530:663');
    function Separator(core) {
        __$coverCall('src/js/buttons.js', '561:619');
        Separator.__super__.constructor.call(this, core, '<span>');
        __$coverCall('src/js/buttons.js', '625:659');
        this.element.addClass('separator');
    }
    __$coverCall('src/js/buttons.js', '668:684');
    return Separator;
}(Widget);
__$coverCall('src/js/buttons.js', '700:1581');
Button = function (_super) {
    __$coverCall('src/js/buttons.js', '732:757');
    __extends(Button, _super);
    __$coverCall('src/js/buttons.js', '762:1193');
    function Button(core, name, text, title) {
        __$coverCall('src/js/buttons.js', '809:825');
        this.name = name;
        __$coverCall('src/js/buttons.js', '831:847');
        this.text = text;
        __$coverCall('src/js/buttons.js', '853:871');
        this.title = title;
        __$coverCall('src/js/buttons.js', '877:929');
        Button.__super__.constructor.call(this, core, '<a>');
        __$coverCall('src/js/buttons.js', '935:979');
        this.text = Jencil.t(this.text || this.name);
        __$coverCall('src/js/buttons.js', '985:1031');
        this.title = Jencil.t(this.title || this.text);
        __$coverCall('src/js/buttons.js', '1037:1083');
        this.element.addClass('button').addClass(name);
        __$coverCall('src/js/buttons.js', '1089:1145');
        this.element.append($('<span>' + this.text + '</span>'));
        __$coverCall('src/js/buttons.js', '1151:1189');
        this.element.attr('title', this.title);
    }
    __$coverCall('src/js/buttons.js', '1198:1298');
    Button.prototype.enable = function () {
        __$coverCall('src/js/buttons.js', '1241:1276');
        this.element.removeClass('disable');
        __$coverCall('src/js/buttons.js', '1282:1293');
        return this;
    };
    __$coverCall('src/js/buttons.js', '1303:1401');
    Button.prototype.disable = function () {
        __$coverCall('src/js/buttons.js', '1347:1379');
        this.element.addClass('disable');
        __$coverCall('src/js/buttons.js', '1385:1396');
        return this;
    };
    __$coverCall('src/js/buttons.js', '1406:1484');
    Button.prototype.init = function () {
        __$coverCall('src/js/buttons.js', '1447:1462');
        this.validate();
        __$coverCall('src/js/buttons.js', '1468:1479');
        return this;
    };
    __$coverCall('src/js/buttons.js', '1489:1550');
    Button.prototype.validate = function () {
        __$coverCall('src/js/buttons.js', '1534:1545');
        return this;
    };
    __$coverCall('src/js/buttons.js', '1555:1568');
    return Button;
}(Widget);
__$coverCall('src/js/buttons.js', '1584:2397');
ActionButton = function (_super) {
    __$coverCall('src/js/buttons.js', '1622:1653');
    __extends(ActionButton, _super);
    __$coverCall('src/js/buttons.js', '1658:2360');
    function ActionButton(core, name, text, title, callback, shortcut) {
        __$coverCall('src/js/buttons.js', '1731:1747');
        var _this = this;
        __$coverCall('src/js/buttons.js', '1753:1777');
        this.shortcut = shortcut;
        __$coverCall('src/js/buttons.js', '1783:1853');
        ActionButton.__super__.constructor.call(this, core, name, text, title);
        __$coverCall('src/js/buttons.js', '1859:1999');
        this.callback = function () {
            __$coverCall('src/js/buttons.js', '1894:1972');
            if (!_this.element.hasClass('disable')) {
                __$coverCall('src/js/buttons.js', '1944:1964');
                _this.callback.raw();
            }
            __$coverCall('src/js/buttons.js', '1980:1992');
            return _this;
        };
        __$coverCall('src/js/buttons.js', '2005:2033');
        this.callback.raw = callback;
        __$coverCall('src/js/buttons.js', '2039:2108');
        this.element.click(function () {
            __$coverCall('src/js/buttons.js', '2077:2100');
            return _this.callback();
        });
        __$coverCall('src/js/buttons.js', '2114:2356');
        if (this.shortcut != null && window.shortcut != null) {
            __$coverCall('src/js/buttons.js', '2180:2270');
            window.shortcut.add(this.shortcut, function (e) {
                __$coverCall('src/js/buttons.js', '2237:2260');
                return _this.callback();
            });
            __$coverCall('src/js/buttons.js', '2278:2350');
            this.element.attr('title', '' + this.title + ' (' + this.shortcut + ')');
        }
    }
    __$coverCall('src/js/buttons.js', '2365:2384');
    return ActionButton;
}(Button);
__$coverCall('src/js/buttons.js', '2400:3942');
CommandButton = function (_super) {
    __$coverCall('src/js/buttons.js', '2439:2471');
    __extends(CommandButton, _super);
    __$coverCall('src/js/buttons.js', '2476:2816');
    function CommandButton(core, name, text, title, command, shortcut) {
        __$coverCall('src/js/buttons.js', '2549:2561');
        var callback;
        __$coverCall('src/js/buttons.js', '2567:2589');
        this.command = command;
        __$coverCall('src/js/buttons.js', '2595:2715');
        callback = function () {
            __$coverCall('src/js/buttons.js', '2625:2635');
            var editor;
            __$coverCall('src/js/buttons.js', '2643:2665');
            editor = core.editor();
            __$coverCall('src/js/buttons.js', '2673:2708');
            return editor[command].call(editor);
        };
        __$coverCall('src/js/buttons.js', '2721:2812');
        CommandButton.__super__.constructor.call(this, core, name, text, title, callback, shortcut);
    }
    __$coverCall('src/js/buttons.js', '2821:3009');
    CommandButton.prototype.validate = function () {
        __$coverCall('src/js/buttons.js', '2873:2883');
        var editor;
        __$coverCall('src/js/buttons.js', '2889:2916');
        editor = this.core.editor();
        __$coverCall('src/js/buttons.js', '2922:2987');
        if (!(editor[this.command] != null)) {
            __$coverCall('src/js/buttons.js', '2967:2981');
            this.disable();
        }
        __$coverCall('src/js/buttons.js', '2993:3004');
        return this;
    };
    __$coverCall('src/js/buttons.js', '3014:3898');
    CommandButton.factory = function (core, args) {
        __$coverCall('src/js/buttons.js', '3065:3105');
        var command, name, shortcut, text, title;
        __$coverCall('src/js/buttons.js', '3111:3158');
        name = text = title = command = shortcut = null;
        __$coverCall('src/js/buttons.js', '3164:3819');
        switch (args.length) {
        case 5:
            __$coverCall('src/js/buttons.js', '3209:3223');
            name = args[0];
            __$coverCall('src/js/buttons.js', '3233:3247');
            text = args[1];
            __$coverCall('src/js/buttons.js', '3257:3272');
            title = args[2];
            __$coverCall('src/js/buttons.js', '3282:3299');
            command = args[3];
            __$coverCall('src/js/buttons.js', '3309:3327');
            shortcut = args[4];
            __$coverCall('src/js/buttons.js', '3337:3342');
            break;
        case 4:
            __$coverCall('src/js/buttons.js', '3366:3380');
            name = args[0];
            __$coverCall('src/js/buttons.js', '3390:3412');
            text = title = args[1];
            __$coverCall('src/js/buttons.js', '3422:3439');
            command = args[2];
            __$coverCall('src/js/buttons.js', '3449:3467');
            shortcut = args[3];
            __$coverCall('src/js/buttons.js', '3477:3482');
            break;
        case 3:
            __$coverCall('src/js/buttons.js', '3506:3530');
            name = command = args[0];
            __$coverCall('src/js/buttons.js', '3540:3562');
            text = title = args[1];
            __$coverCall('src/js/buttons.js', '3572:3590');
            shortcut = args[2];
            __$coverCall('src/js/buttons.js', '3600:3605');
            break;
        case 2:
            __$coverCall('src/js/buttons.js', '3629:3653');
            name = command = args[0];
            __$coverCall('src/js/buttons.js', '3663:3685');
            text = title = args[1];
            __$coverCall('src/js/buttons.js', '3695:3710');
            shortcut = null;
            __$coverCall('src/js/buttons.js', '3720:3725');
            break;
        case 1:
            __$coverCall('src/js/buttons.js', '3749:3788');
            name = command = text = title = args[0];
            __$coverCall('src/js/buttons.js', '3798:3813');
            shortcut = null;
        }
        __$coverCall('src/js/buttons.js', '3825:3893');
        return new CommandButton(core, name, text, title, command, shortcut);
    };
    __$coverCall('src/js/buttons.js', '3903:3923');
    return CommandButton;
}(ActionButton);
__$coverCall('src/js/buttons.js', '3945:4600');
UndoButton = function (_super) {
    __$coverCall('src/js/buttons.js', '3981:4010');
    __extends(UndoButton, _super);
    __$coverCall('src/js/buttons.js', '4015:4260');
    function UndoButton(core) {
        __$coverCall('src/js/buttons.js', '4047:4079');
        var callback, _this = this;
        __$coverCall('src/js/buttons.js', '4085:4157');
        callback = function (e) {
            __$coverCall('src/js/buttons.js', '4116:4150');
            return _this.core.caretaker.undo();
        };
        __$coverCall('src/js/buttons.js', '4163:4256');
        UndoButton.__super__.constructor.call(this, core, 'undo', 'Undo', 'Undo', callback, 'Ctrl+Z');
    }
    __$coverCall('src/js/buttons.js', '4265:4559');
    UndoButton.prototype.init = function () {
        __$coverCall('src/js/buttons.js', '4310:4339');
        var check, _this = this;
        __$coverCall('src/js/buttons.js', '4345:4534');
        check = function () {
            __$coverCall('src/js/buttons.js', '4372:4490');
            if (_this.core.caretaker.canUndo() === false) {
                __$coverCall('src/js/buttons.js', '4428:4443');
                _this.disable();
            } else {
                __$coverCall('src/js/buttons.js', '4468:4482');
                _this.enable();
            }
            __$coverCall('src/js/buttons.js', '4498:4527');
            return setTimeout(check, 100);
        };
        __$coverCall('src/js/buttons.js', '4540:4554');
        return check();
    };
    __$coverCall('src/js/buttons.js', '4564:4581');
    return UndoButton;
}(ActionButton);
__$coverCall('src/js/buttons.js', '4603:5264');
RedoButton = function (_super) {
    __$coverCall('src/js/buttons.js', '4639:4668');
    __extends(RedoButton, _super);
    __$coverCall('src/js/buttons.js', '4673:4924');
    function RedoButton(core) {
        __$coverCall('src/js/buttons.js', '4705:4737');
        var callback, _this = this;
        __$coverCall('src/js/buttons.js', '4743:4815');
        callback = function (e) {
            __$coverCall('src/js/buttons.js', '4774:4808');
            return _this.core.caretaker.redo();
        };
        __$coverCall('src/js/buttons.js', '4821:4920');
        RedoButton.__super__.constructor.call(this, core, 'redo', 'Redo', 'Redo', callback, 'Ctrl+Shift+Z');
    }
    __$coverCall('src/js/buttons.js', '4929:5223');
    RedoButton.prototype.init = function () {
        __$coverCall('src/js/buttons.js', '4974:5003');
        var check, _this = this;
        __$coverCall('src/js/buttons.js', '5009:5198');
        check = function () {
            __$coverCall('src/js/buttons.js', '5036:5154');
            if (_this.core.caretaker.canRedo() === false) {
                __$coverCall('src/js/buttons.js', '5092:5107');
                _this.disable();
            } else {
                __$coverCall('src/js/buttons.js', '5132:5146');
                _this.enable();
            }
            __$coverCall('src/js/buttons.js', '5162:5191');
            return setTimeout(check, 100);
        };
        __$coverCall('src/js/buttons.js', '5204:5218');
        return check();
    };
    __$coverCall('src/js/buttons.js', '5228:5245');
    return RedoButton;
}(ActionButton);
__$coverCall('src/js/buttons.js', '5267:6033');
FullscreenButton = function (_super) {
    __$coverCall('src/js/buttons.js', '5309:5344');
    __extends(FullscreenButton, _super);
    __$coverCall('src/js/buttons.js', '5349:5634');
    function FullscreenButton(core) {
        __$coverCall('src/js/buttons.js', '5387:5419');
        var callback, _this = this;
        __$coverCall('src/js/buttons.js', '5425:5500');
        callback = function (e) {
            __$coverCall('src/js/buttons.js', '5456:5493');
            return _this.core.fullscreen.toggle();
        };
        __$coverCall('src/js/buttons.js', '5506:5630');
        FullscreenButton.__super__.constructor.call(this, core, 'fullscreen', 'Toggle fullscreen', 'Fullscreen', callback, 'Ctrl+F');
    }
    __$coverCall('src/js/buttons.js', '5639:5986');
    FullscreenButton.prototype.init = function () {
        __$coverCall('src/js/buttons.js', '5690:5719');
        var check, _this = this;
        __$coverCall('src/js/buttons.js', '5725:5961');
        check = function () {
            __$coverCall('src/js/buttons.js', '5752:5917');
            if (_this.core.fullscreen.element.is(':visible') === true) {
                __$coverCall('src/js/buttons.js', '5821:5851');
                _this.element.addClass('hide');
            } else {
                __$coverCall('src/js/buttons.js', '5876:5909');
                _this.element.removeClass('hide');
            }
            __$coverCall('src/js/buttons.js', '5925:5954');
            return setTimeout(check, 100);
        };
        __$coverCall('src/js/buttons.js', '5967:5981');
        return check();
    };
    __$coverCall('src/js/buttons.js', '5991:6014');
    return FullscreenButton;
}(ActionButton);
__$coverCall('src/js/buttons.js', '6036:6963');
ViewerButton = function (_super) {
    __$coverCall('src/js/buttons.js', '6074:6105');
    __extends(ViewerButton, _super);
    __$coverCall('src/js/buttons.js', '6110:6374');
    function ViewerButton(core) {
        __$coverCall('src/js/buttons.js', '6144:6176');
        var callback, _this = this;
        __$coverCall('src/js/buttons.js', '6182:6255');
        callback = function (e) {
            __$coverCall('src/js/buttons.js', '6213:6248');
            return _this.core.viewer().toggle();
        };
        __$coverCall('src/js/buttons.js', '6261:6370');
        ViewerButton.__super__.constructor.call(this, core, 'viewer', 'Quick view', 'Quick view', callback, 'Ctrl+Q');
    }
    __$coverCall('src/js/buttons.js', '6379:6535');
    ViewerButton.prototype.validate = function () {
        __$coverCall('src/js/buttons.js', '6430:6513');
        if (!(this.core.viewer() != null)) {
            __$coverCall('src/js/buttons.js', '6473:6487');
            this.disable();
            __$coverCall('src/js/buttons.js', '6495:6507');
            return false;
        }
        __$coverCall('src/js/buttons.js', '6519:6530');
        return true;
    };
    __$coverCall('src/js/buttons.js', '6540:6920');
    ViewerButton.prototype.init = function () {
        __$coverCall('src/js/buttons.js', '6587:6616');
        var check, _this = this;
        __$coverCall('src/js/buttons.js', '6622:6664');
        if (!this.validate()) {
            __$coverCall('src/js/buttons.js', '6652:6658');
            return;
        }
        __$coverCall('src/js/buttons.js', '6670:6895');
        check = function () {
            __$coverCall('src/js/buttons.js', '6697:6851');
            if (_this.core.viewer().element.is(':visible')) {
                __$coverCall('src/js/buttons.js', '6755:6785');
                _this.element.addClass('hide');
            } else {
                __$coverCall('src/js/buttons.js', '6810:6843');
                _this.element.removeClass('hide');
            }
            __$coverCall('src/js/buttons.js', '6859:6888');
            return setTimeout(check, 100);
        };
        __$coverCall('src/js/buttons.js', '6901:6915');
        return check();
    };
    __$coverCall('src/js/buttons.js', '6925:6944');
    return ViewerButton;
}(ActionButton);
__$coverCall('src/js/buttons.js', '6966:7871');
HelperButton = function (_super) {
    __$coverCall('src/js/buttons.js', '7004:7035');
    __extends(HelperButton, _super);
    __$coverCall('src/js/buttons.js', '7040:7292');
    function HelperButton(core) {
        __$coverCall('src/js/buttons.js', '7074:7106');
        var callback, _this = this;
        __$coverCall('src/js/buttons.js', '7112:7185');
        callback = function (e) {
            __$coverCall('src/js/buttons.js', '7143:7178');
            return _this.core.helper().toggle();
        };
        __$coverCall('src/js/buttons.js', '7191:7288');
        HelperButton.__super__.constructor.call(this, core, 'helper', 'Help', 'Help', callback, 'Ctrl+H');
    }
    __$coverCall('src/js/buttons.js', '7297:7443');
    HelperButton.prototype.validate = function () {
        __$coverCall('src/js/buttons.js', '7348:7421');
        if (!this.core.helper()) {
            __$coverCall('src/js/buttons.js', '7381:7395');
            this.disable();
            __$coverCall('src/js/buttons.js', '7403:7415');
            return false;
        }
        __$coverCall('src/js/buttons.js', '7427:7438');
        return true;
    };
    __$coverCall('src/js/buttons.js', '7448:7828');
    HelperButton.prototype.init = function () {
        __$coverCall('src/js/buttons.js', '7495:7524');
        var check, _this = this;
        __$coverCall('src/js/buttons.js', '7530:7572');
        if (!this.validate()) {
            __$coverCall('src/js/buttons.js', '7560:7566');
            return;
        }
        __$coverCall('src/js/buttons.js', '7578:7803');
        check = function () {
            __$coverCall('src/js/buttons.js', '7605:7759');
            if (_this.core.helper().element.is(':visible')) {
                __$coverCall('src/js/buttons.js', '7663:7693');
                _this.element.addClass('hide');
            } else {
                __$coverCall('src/js/buttons.js', '7718:7751');
                _this.element.removeClass('hide');
            }
            __$coverCall('src/js/buttons.js', '7767:7796');
            return setTimeout(check, 100);
        };
        __$coverCall('src/js/buttons.js', '7809:7823');
        return check();
    };
    __$coverCall('src/js/buttons.js', '7833:7852');
    return HelperButton;
}(ActionButton);
__$coverCall('src/js/buttons.js', '7874:8536');
buttonFactory = function (core, value) {
    __$coverCall('src/js/buttons.js', '7916:7995');
    if (value instanceof Array) {
        __$coverCall('src/js/buttons.js', '7950:7991');
        return CommandButton.factory(core, value);
    }
    __$coverCall('src/js/buttons.js', '7999:8507');
    if (typeof value === 'string') {
        __$coverCall('src/js/buttons.js', '8036:8503');
        switch (value) {
        case 'Separator':
            __$coverCall('src/js/buttons.js', '8085:8111');
            return new Separator(core);
        case 'Undo':
            __$coverCall('src/js/buttons.js', '8140:8167');
            return new UndoButton(core);
        case 'Redo':
            __$coverCall('src/js/buttons.js', '8196:8223');
            return new RedoButton(core);
        case 'Fullscreen':
            __$coverCall('src/js/buttons.js', '8258:8291');
            return new FullscreenButton(core);
        case 'Viewer':
            __$coverCall('src/js/buttons.js', '8322:8351');
            return new ViewerButton(core);
        case 'Helper':
            __$coverCall('src/js/buttons.js', '8382:8411');
            return new HelperButton(core);
        default:
            __$coverCall('src/js/buttons.js', '8436:8497');
            throw new Exception('' + value + ' is not known Button type');
        }
    }
    __$coverCall('src/js/buttons.js', '8511:8533');
    return new value(core);
};
__$coverCall('src/js/buttons.js', '8539:8972');
namespace('Jencil.buttons', function (exports) {
    __$coverCall('src/js/buttons.js', '8589:8618');
    exports.Separator = Separator;
    __$coverCall('src/js/buttons.js', '8622:8645');
    exports.Button = Button;
    __$coverCall('src/js/buttons.js', '8649:8684');
    exports.ActionButton = ActionButton;
    __$coverCall('src/js/buttons.js', '8688:8725');
    exports.CommandButton = CommandButton;
    __$coverCall('src/js/buttons.js', '8729:8760');
    exports.UndoButton = UndoButton;
    __$coverCall('src/js/buttons.js', '8764:8795');
    exports.RedoButton = RedoButton;
    __$coverCall('src/js/buttons.js', '8799:8842');
    exports.FullscreenButton = FullscreenButton;
    __$coverCall('src/js/buttons.js', '8846:8881');
    exports.ViewerButton = ViewerButton;
    __$coverCall('src/js/buttons.js', '8885:8920');
    exports.HelperButton = HelperButton;
    __$coverCall('src/js/buttons.js', '8924:8968');
    return exports.buttonFactory = buttonFactory;
});