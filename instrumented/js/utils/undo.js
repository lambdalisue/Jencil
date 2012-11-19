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
__$coverInit("src/js/utils/undo.js", "var Caretaker, NotImplementedError, Originator;\n\nNotImplementedError = (function() {\n\n  function NotImplementedError() {}\n\n  NotImplementedError.prototype.name = 'Not implemeted error';\n\n  NotImplementedError.prototype.message = 'The function has not implemented yet';\n\n  return NotImplementedError;\n\n})();\n\nOriginator = (function() {\n\n  function Originator() {}\n\n  Originator.prototype.createMemento = function() {\n    throw new NotImplementedError;\n  };\n\n  Originator.prototype.setMemento = function(memento) {\n    throw new NotImplementedError;\n  };\n\n  return Originator;\n\n})();\n\nCaretaker = (function() {\n\n  function Caretaker(originator) {\n    this._originator = originator;\n    this._undoStack = [];\n    this._redoStack = [];\n  }\n\n  Caretaker.prototype.originator = function(originator) {\n    if (originator != null) {\n      this._originator = originator;\n      return this;\n    }\n    return this._originator;\n  };\n\n  Caretaker.prototype.save = function(memento) {\n    memento = memento || this.originator().createMemento();\n    this._undoStack.push(memento);\n    this._redoStack = [];\n    return this;\n  };\n\n  Caretaker.prototype.undo = function() {\n    var originator;\n    if (!this.canUndo()) {\n      return false;\n    }\n    originator = this.originator();\n    this._redoStack.push(originator.createMemento());\n    originator.setMemento(this._undoStack.pop());\n    if (typeof originator.focus === \"function\") {\n      originator.focus();\n    }\n    return true;\n  };\n\n  Caretaker.prototype.redo = function() {\n    var originator;\n    if (!this.canRedo()) {\n      return false;\n    }\n    originator = this.originator();\n    this._undoStack.push(originator.createMemento());\n    originator.setMemento(this._redoStack.pop());\n    if (typeof originator.focus === \"function\") {\n      originator.focus();\n    }\n    return true;\n  };\n\n  Caretaker.prototype.canUndo = function() {\n    return this._undoStack.length > 0;\n  };\n\n  Caretaker.prototype.canRedo = function() {\n    return this._redoStack.length > 0;\n  };\n\n  return Caretaker;\n\n})();\n\nif (typeof exports !== \"undefined\" && exports !== null) {\n  exports.NotImplementedError = NotImplementedError;\n  exports.Originator = Originator;\n  exports.Caretaker = Caretaker;\n}\n");
__$coverInitRange("src/js/utils/undo.js", "0:46");
__$coverInitRange("src/js/utils/undo.js", "49:305");
__$coverInitRange("src/js/utils/undo.js", "308:580");
__$coverInitRange("src/js/utils/undo.js", "583:2040");
__$coverInitRange("src/js/utils/undo.js", "2043:2222");
__$coverInitRange("src/js/utils/undo.js", "88:120");
__$coverInitRange("src/js/utils/undo.js", "125:184");
__$coverInitRange("src/js/utils/undo.js", "189:267");
__$coverInitRange("src/js/utils/undo.js", "272:298");
__$coverInitRange("src/js/utils/undo.js", "338:361");
__$coverInitRange("src/js/utils/undo.js", "366:454");
__$coverInitRange("src/js/utils/undo.js", "459:551");
__$coverInitRange("src/js/utils/undo.js", "556:573");
__$coverInitRange("src/js/utils/undo.js", "420:449");
__$coverInitRange("src/js/utils/undo.js", "517:546");
__$coverInitRange("src/js/utils/undo.js", "612:734");
__$coverInitRange("src/js/utils/undo.js", "739:919");
__$coverInitRange("src/js/utils/undo.js", "924:1112");
__$coverInitRange("src/js/utils/undo.js", "1117:1472");
__$coverInitRange("src/js/utils/undo.js", "1477:1832");
__$coverInitRange("src/js/utils/undo.js", "1837:1922");
__$coverInitRange("src/js/utils/undo.js", "1927:2012");
__$coverInitRange("src/js/utils/undo.js", "2017:2033");
__$coverInitRange("src/js/utils/undo.js", "649:678");
__$coverInitRange("src/js/utils/undo.js", "684:704");
__$coverInitRange("src/js/utils/undo.js", "710:730");
__$coverInitRange("src/js/utils/undo.js", "799:885");
__$coverInitRange("src/js/utils/undo.js", "891:914");
__$coverInitRange("src/js/utils/undo.js", "831:860");
__$coverInitRange("src/js/utils/undo.js", "868:879");
__$coverInitRange("src/js/utils/undo.js", "975:1029");
__$coverInitRange("src/js/utils/undo.js", "1035:1064");
__$coverInitRange("src/js/utils/undo.js", "1070:1090");
__$coverInitRange("src/js/utils/undo.js", "1096:1107");
__$coverInitRange("src/js/utils/undo.js", "1161:1175");
__$coverInitRange("src/js/utils/undo.js", "1181:1228");
__$coverInitRange("src/js/utils/undo.js", "1234:1264");
__$coverInitRange("src/js/utils/undo.js", "1270:1318");
__$coverInitRange("src/js/utils/undo.js", "1324:1368");
__$coverInitRange("src/js/utils/undo.js", "1374:1450");
__$coverInitRange("src/js/utils/undo.js", "1456:1467");
__$coverInitRange("src/js/utils/undo.js", "1210:1222");
__$coverInitRange("src/js/utils/undo.js", "1426:1444");
__$coverInitRange("src/js/utils/undo.js", "1521:1535");
__$coverInitRange("src/js/utils/undo.js", "1541:1588");
__$coverInitRange("src/js/utils/undo.js", "1594:1624");
__$coverInitRange("src/js/utils/undo.js", "1630:1678");
__$coverInitRange("src/js/utils/undo.js", "1684:1728");
__$coverInitRange("src/js/utils/undo.js", "1734:1810");
__$coverInitRange("src/js/utils/undo.js", "1816:1827");
__$coverInitRange("src/js/utils/undo.js", "1570:1582");
__$coverInitRange("src/js/utils/undo.js", "1786:1804");
__$coverInitRange("src/js/utils/undo.js", "1884:1917");
__$coverInitRange("src/js/utils/undo.js", "1974:2007");
__$coverInitRange("src/js/utils/undo.js", "2103:2152");
__$coverInitRange("src/js/utils/undo.js", "2156:2187");
__$coverInitRange("src/js/utils/undo.js", "2191:2220");
__$coverCall('src/js/utils/undo.js', '0:46');
var Caretaker, NotImplementedError, Originator;
__$coverCall('src/js/utils/undo.js', '49:305');
NotImplementedError = function () {
    __$coverCall('src/js/utils/undo.js', '88:120');
    function NotImplementedError() {
    }
    __$coverCall('src/js/utils/undo.js', '125:184');
    NotImplementedError.prototype.name = 'Not implemeted error';
    __$coverCall('src/js/utils/undo.js', '189:267');
    NotImplementedError.prototype.message = 'The function has not implemented yet';
    __$coverCall('src/js/utils/undo.js', '272:298');
    return NotImplementedError;
}();
__$coverCall('src/js/utils/undo.js', '308:580');
Originator = function () {
    __$coverCall('src/js/utils/undo.js', '338:361');
    function Originator() {
    }
    __$coverCall('src/js/utils/undo.js', '366:454');
    Originator.prototype.createMemento = function () {
        __$coverCall('src/js/utils/undo.js', '420:449');
        throw new NotImplementedError();
    };
    __$coverCall('src/js/utils/undo.js', '459:551');
    Originator.prototype.setMemento = function (memento) {
        __$coverCall('src/js/utils/undo.js', '517:546');
        throw new NotImplementedError();
    };
    __$coverCall('src/js/utils/undo.js', '556:573');
    return Originator;
}();
__$coverCall('src/js/utils/undo.js', '583:2040');
Caretaker = function () {
    __$coverCall('src/js/utils/undo.js', '612:734');
    function Caretaker(originator) {
        __$coverCall('src/js/utils/undo.js', '649:678');
        this._originator = originator;
        __$coverCall('src/js/utils/undo.js', '684:704');
        this._undoStack = [];
        __$coverCall('src/js/utils/undo.js', '710:730');
        this._redoStack = [];
    }
    __$coverCall('src/js/utils/undo.js', '739:919');
    Caretaker.prototype.originator = function (originator) {
        __$coverCall('src/js/utils/undo.js', '799:885');
        if (originator != null) {
            __$coverCall('src/js/utils/undo.js', '831:860');
            this._originator = originator;
            __$coverCall('src/js/utils/undo.js', '868:879');
            return this;
        }
        __$coverCall('src/js/utils/undo.js', '891:914');
        return this._originator;
    };
    __$coverCall('src/js/utils/undo.js', '924:1112');
    Caretaker.prototype.save = function (memento) {
        __$coverCall('src/js/utils/undo.js', '975:1029');
        memento = memento || this.originator().createMemento();
        __$coverCall('src/js/utils/undo.js', '1035:1064');
        this._undoStack.push(memento);
        __$coverCall('src/js/utils/undo.js', '1070:1090');
        this._redoStack = [];
        __$coverCall('src/js/utils/undo.js', '1096:1107');
        return this;
    };
    __$coverCall('src/js/utils/undo.js', '1117:1472');
    Caretaker.prototype.undo = function () {
        __$coverCall('src/js/utils/undo.js', '1161:1175');
        var originator;
        __$coverCall('src/js/utils/undo.js', '1181:1228');
        if (!this.canUndo()) {
            __$coverCall('src/js/utils/undo.js', '1210:1222');
            return false;
        }
        __$coverCall('src/js/utils/undo.js', '1234:1264');
        originator = this.originator();
        __$coverCall('src/js/utils/undo.js', '1270:1318');
        this._redoStack.push(originator.createMemento());
        __$coverCall('src/js/utils/undo.js', '1324:1368');
        originator.setMemento(this._undoStack.pop());
        __$coverCall('src/js/utils/undo.js', '1374:1450');
        if (typeof originator.focus === 'function') {
            __$coverCall('src/js/utils/undo.js', '1426:1444');
            originator.focus();
        }
        __$coverCall('src/js/utils/undo.js', '1456:1467');
        return true;
    };
    __$coverCall('src/js/utils/undo.js', '1477:1832');
    Caretaker.prototype.redo = function () {
        __$coverCall('src/js/utils/undo.js', '1521:1535');
        var originator;
        __$coverCall('src/js/utils/undo.js', '1541:1588');
        if (!this.canRedo()) {
            __$coverCall('src/js/utils/undo.js', '1570:1582');
            return false;
        }
        __$coverCall('src/js/utils/undo.js', '1594:1624');
        originator = this.originator();
        __$coverCall('src/js/utils/undo.js', '1630:1678');
        this._undoStack.push(originator.createMemento());
        __$coverCall('src/js/utils/undo.js', '1684:1728');
        originator.setMemento(this._redoStack.pop());
        __$coverCall('src/js/utils/undo.js', '1734:1810');
        if (typeof originator.focus === 'function') {
            __$coverCall('src/js/utils/undo.js', '1786:1804');
            originator.focus();
        }
        __$coverCall('src/js/utils/undo.js', '1816:1827');
        return true;
    };
    __$coverCall('src/js/utils/undo.js', '1837:1922');
    Caretaker.prototype.canUndo = function () {
        __$coverCall('src/js/utils/undo.js', '1884:1917');
        return this._undoStack.length > 0;
    };
    __$coverCall('src/js/utils/undo.js', '1927:2012');
    Caretaker.prototype.canRedo = function () {
        __$coverCall('src/js/utils/undo.js', '1974:2007');
        return this._redoStack.length > 0;
    };
    __$coverCall('src/js/utils/undo.js', '2017:2033');
    return Caretaker;
}();
__$coverCall('src/js/utils/undo.js', '2043:2222');
if (typeof exports !== 'undefined' && exports !== null) {
    __$coverCall('src/js/utils/undo.js', '2103:2152');
    exports.NotImplementedError = NotImplementedError;
    __$coverCall('src/js/utils/undo.js', '2156:2187');
    exports.Originator = Originator;
    __$coverCall('src/js/utils/undo.js', '2191:2220');
    exports.Caretaker = Caretaker;
}