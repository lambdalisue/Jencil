/*!
 * Richarea - JavaScript contentEditable munipulate library v0.1.2
 *
 * Cross browser contentEditable iframe munipulator library written in CoffeeScript
 *
 * Author: Alisue (lambdalisue@hashnote.net)
 * License: MIT License.
 * Version: v0.1.2
 * Url: http://github.com/lambdalisue/Richarea
 * Date: Sat, 01 Oct 2011 06:26:25 GMT
 * References (ja):
 * - http://arinogotokuatumarite.blog19.fc2.com/blog-entry-101.html
 * - http://uhyohyohyo.sakura.ne.jp/javascript/8_3.html
 * References (en):
 * - http://msdn.microsoft.com/en-us/library/ms535872(v=VS.85).aspx
 * - http://www.quirksmode.org/dom/range_intro.html
 * - http://stackoverflow.com/questions/1223324/selection-startcontainer-in-ie
 * - http://stackoverflow.com/questions/4811822/get-a-ranges-start-and-end-offsets-relative-to-its-parent-container
 * - http://www.quirksmode.org/dom/execCommand.html
 * - http://stackoverflow.com/questions/3972014/get-caret-position-in-contenteditable-div
 */
(function() {
  /*
  Detect browser name, version and OS
  
  @ref: http://www.quirksmode.org/js/detect.html
  */
  var API, DOMUtils, Detector, NodeUtils, RangeIterator, Rawarea, TextRangeUtils, W3CRange, W3CSelection, partial;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  Detector = (function() {
    function Detector() {
      this.browser = this.searchString(Detector.dataBrowser) || "An unknown browser";
      this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "An unknown browser";
      this.OS = this.searchString(Detector.dataOS) || "An unknown OS";
    }
    Detector.prototype.searchString = function(data) {
      var row, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        row = data[_i];
        this.versionSearchString = row.versionSearch || row.identify;
        if (row.string != null) {
          if (row.string.indexOf(row.subString) !== -1) {
            return row.identify;
          } else if (row.prop) {
            return row.identify;
          }
        }
      }
      return _results;
    };
    Detector.prototype.searchVersion = function(dataString) {
      var index;
      index = dataString.indexOf(this.versionSearchString);
      if (index === -1) {
        return;
      }
      return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    };
    Detector.dataBrowser = [
      {
        string: navigator.userAgent,
        subString: 'Chrome',
        identify: 'Chrome'
      }, {
        string: navigator.userAgent,
        subString: 'OmniWeb',
        versionSearch: 'OmniWeb/',
        identify: 'OmniWeb'
      }, {
        string: navigator.vendor,
        subString: 'Apple',
        identify: 'Safari',
        versionSearch: 'Version'
      }, {
        prop: window.opera,
        identify: 'Opera',
        versionSearch: 'Version'
      }, {
        string: navigator.vendor,
        subString: 'iCab',
        identify: 'iCab'
      }, {
        string: navigator.vendor,
        subString: 'KDE',
        identify: 'Konqueror'
      }, {
        string: navigator.userAgent,
        subString: 'Firefox',
        identify: 'Firefox'
      }, {
        string: navigator.vendor,
        subString: 'Camino',
        identify: 'Camino'
      }, {
        string: navigator.userAgent,
        subString: 'Netscape',
        identify: 'Netscape'
      }, {
        string: navigator.userAgent,
        subString: 'MSIE',
        identify: 'Explorer',
        versionSearch: 'MSIE'
      }, {
        string: navigator.userAgent,
        subString: 'Gecko',
        identify: 'Mozilla',
        versionSearch: 'rv'
      }, {
        string: navigator.userAgent,
        subString: 'Mozilla',
        identify: 'Netscape',
        versionSearch: 'Mozilla'
      }
    ];
    Detector.dataOS = [
      {
        string: navigator.platform,
        subString: 'Win',
        identify: 'Windows'
      }, {
        string: navigator.platform,
        subString: 'Mac',
        identify: 'Mac'
      }, {
        string: navigator.userAgent,
        subString: 'iPhone',
        identify: 'iPhone/iPad'
      }, {
        string: navigator.platform,
        subString: 'Linux',
        identify: 'Linux'
      }
    ];
    return Detector;
  })();
  if (typeof exports !== "undefined" && exports !== null) {
    exports.Detector = Detector;
  }
  /*
  partial
  
  CoffeeScript partial class utils. it is useful when you create a large class
  and want split the class to several files.
  
  Author: Alisue (lambdalisue@hashnote.net)
  License: MIT License
  
  Copyright 2011 hashnote.net, Alisue allright reserved
  
  Example:
    // person.core.coffee
    class Person
      constructor: (@name) -> @
      say: -> "My name is #{@name}"
    // person.hobby.coffee
    Person = partial Person,
      chess: -> 'Yes I like'
    // person.food.coffee
    Person = partial Person,
      apple: -> 'No i don't like it'
  */
  partial = function(cls, prototypes) {
    var callback, name;
    for (name in prototypes) {
      callback = prototypes[name];
      cls.prototype[name] = callback;
    }
    return cls;
  };
  if (typeof exports !== "undefined" && exports !== null) {
    exports.partial = partial;
  }
  /*
  DOM Ranges for Internet Explorer (m1)
  
  Copyright (c) 2009 Tim Cameron Ryan
  Released under the MIT/X License
  
  Re writed by Alisue (lambdalisue@hashnote.net) in 2011
  
  Range reference:
    http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html
    http://mxr.mozilla.org/mozilla-central/source/content/base/src/nsRange.cpp
    https://developer.mozilla.org/En/DOM:Range
  Selection reference:
    http://trac.webkit.org/browser/trunk/WebCore/page/DOMSelection.cpp
  TextRange reference:
    http://msdn.microsoft.com/en-us/library/ms535872.aspx
  Other links:
    http://jorgenhorstink.nl/test/javascript/range/range.js
    http://jorgenhorstink.nl/2006/07/05/dom-range-implementation-in-ecmascript-completed/
    http://dylanschiemann.com/articles/dom2Range/dom2RangeExamples.html
  */
  DOMUtils = (function() {
    function DOMUtils() {}
    DOMUtils.findChildPosition = function(node) {
      var counter;
      counter = 0;
      while (node.previousSibling) {
        node = node.previousSibling;
        counter += 1;
      }
      return counter;
    };
    DOMUtils.isDataNode = function(node) {
      return (node != null) && (node.nodeValue != null) && (node.data != null);
    };
    DOMUtils.isDataContainerNode = function(container) {
      var child, _i, _len, _ref;
      if (!(container.firstChild != null)) {
        return false;
      }
      _ref = container.childNodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        if (!DOMUtils.isDataNode(child)) {
          return false;
        }
      }
      return true;
    };
    DOMUtils.isAncestorOf = function(parent, node) {
      var c1, c2, c3;
      c1 = !DOMUtils.isDataNode(parent);
      c2 = typeof parent.contains === "function" ? parent.contains(DOMUtils.isDataNode(node) ? node.parentNode : node) : void 0;
      c3 = node.parentNode === parent;
      return c1 && (c2 || c3);
    };
    DOMUtils.isAncestorOrSelf = function(root, node) {
      return DOMUtils.isAncestorOf(root, node) || root === node;
    };
    DOMUtils.findClosestAncestor = function(root, node) {
      if (DOMUtils.isAncestorOf(root, node)) {
        while ((node != null ? node.parentNode : void 0) !== root) {
          node = node.parentNode;
        }
      }
      return node;
    };
    DOMUtils.getNodeLength = function(node) {
      if (DOMUtils.isDataNode(node)) {
        return node.length || node.childNodes.length;
      }
    };
    DOMUtils.splitDataNode = function(node, offset) {
      var newNode;
      if (!DOMUtils.isDataNode(node)) {
        return false;
      }
      newNode = node.cloneNode(false);
      node.deleteData(offset, node.length);
      newNode.deleteData(0, offset);
      return node.parentNode.insertBefore(newNode, node.nextSibling);
    };
    return DOMUtils;
  })();
  TextRangeUtils = (function() {
    function TextRangeUtils() {}
    TextRangeUtils.convertToW3CRange = function(textRange, document) {
      var adaptBoundary, c1, c2, cursor, cursorNode, domRange, endOffset, offset, parentNode;
      adaptBoundary = function(domRange, textRange, bStart) {
        var compareEndPoints, cursor, cursorNode, parentNode, trackCursor;
        cursorNode = document.createElement('span');
        cursor = textRange.duplicate();
        cursor.collapse(bStart);
        parentNode = cursor.parentElement();
        compareEndPoints = function(range, oRange) {
          var sType;
          sType = bStart ? 'StartToStart' : 'StartToEnd';
          return range.compareEndPoints(sType, oRange);
        };
        trackCursor = function() {
          parentNode.insertBefore(cursorNode, cursorNode.previousSibling);
          return cursor.moveToElementText(cursorNode);
        };
        trackCursor();
        while (compareEndPoints(cursor, textRange) > 0 && cursorNode.previousSibling) {
          trackCursor();
        }
        if (compareEndPoints(cursor, textRange) === -1 && cursorNode.nextSibling) {
          cursor.setEndPoint((bStart ? 'EndToStart' : 'EndToEnd'), textRange);
          domRange[bStart ? 'setStart' : 'setEnd'](cursorNode.nextSibling, cursor.text.length);
        } else {
          domRange[bStart ? 'setStartBefore' : 'setEndBefore'](cursorNode);
        }
        return cursorNode.parentNode.removeChild(cursorNode);
      };
      domRange = new W3CRange(document);
      c1 = textRange.compareEndPoints('StartToEnd', textRange) !== 0;
      c2 = textRange.parentElement().isContentEditable;
      if (c1 && c2) {
        adaptBoundary(domRange, textRange, true);
        adaptBoundary(domRange, textRange, false);
        if (domRange.startContainer === domRange.endContainer && domRange.endOffset === 1 && DOMUtils.isDataContainerNode(domRange.startContainer)) {
          endOffset = DOMUtils.getNodeLength(domRange.endContainer.firstChild);
          domRange.setEnd(domRange.endContainer, endOffset);
        }
      } else if (c2) {
        cursor = textRange.duplicate();
        parentNode = cursor.parentElement();
        cursorNode = document.createElement('span');
        parentNode.insertBefore(cursorNode, parentNode.firstChild);
        cursor.moveToElementText(cursorNode);
        cursor.setEndPoint('EndToEnd', textRange);
        offset = cursor.text.length;
        domRange.setStart(parentNode, offset);
        domRange.setEnd(parentNode, offset);
        parentNode.removeChild(cursorNode);
      }
      return domRange;
    };
    TextRangeUtils.convertFromW3CRange = function(domRange) {
      var adoptEndPoint, textRange;
      adoptEndPoint = function(textRange, domRange, bStart) {
        var anchorNode, anchorParent, container, cursor, cursorNode, offset, textOffset;
        container = domRange[bStart ? 'startContainer' : 'endContainer'];
        offset = domRange[bStart ? 'startOffset' : 'endOffset'];
        textOffset = 0;
        anchorNode = DOMUtils.isDataNode(container) ? container : container.childNodes[offset];
        anchorParent = anchorNode.parentNode;
        if (container.nodeType === 3 || container.nodeType === 4) {
          textOffset = offset;
        }
        cursorNode = domRange._document.createElement('span');
        anchorParent.insertBefore(cursorNode, anchorNode);
        cursor = domRange._document.body.createTextRange();
        cursor.moveToElementText(cursorNode);
        cursorNode.parentNode.removeChild(cursorNode);
        textRange.setEndPoint((bStart ? 'StartToStart' : 'EndToStart'), cursor);
        return textRange[bStart ? 'moveStart' : 'moveEnd']('character', textOffset);
      };
      textRange = domRange._document.body.createTextRange();
      adoptEndPoint(textRange, domRange, true);
      adoptEndPoint(textRange, domRange, false);
      return textRange;
    };
    return TextRangeUtils;
  })();
  RangeIterator = (function() {
    function RangeIterator(range) {
      var root;
      this.range = range;
      if (this.range.collapsed) {
        return;
      }
      root = range.commonAncestorContainer;
      this._current = null;
      if (range.startContainer === root && !DOMUtils.isDataNode(range.startContainer)) {
        this._next = range.startContainer.childNodes[range.startOffset];
      } else {
        this._next = DOMUtils.findClosestAncestor(root, range.startContainer);
      }
      if (range.endContainer === root && !DOMUtils.isDataNode(range.endContainer)) {
        this._end = range.endContainer.childNodes[range.endOffset];
      } else {
        this._end = DOMUtils.findClosestAncestor(root, range.endContainer).nextSibling;
      }
    }
    RangeIterator.prototype.hasNext = function() {
      return this._next != null;
    };
    RangeIterator.prototype.next = function() {
      var current;
      current = this._current = this._next;
      this._next = (this._current != null) && this._current.nextSibling !== this._end ? this._current.nextSibling : null;
      if (DOMUtils.isDataNode(this._current)) {
        if (this.range.endContainer === this._current) {
          current = current.cloneNode(true);
          current.deleteData(this.range.endOffset, current.length - this.range.endOffset);
        }
        if (this.range.startContainer === this._current) {
          current = current.cloneNode(true);
          current.deleteData(0, this.range.startOffset);
        }
      }
      return current;
    };
    RangeIterator.prototype.remove = function() {
      var end, start;
      if (DOMUtils.isDataNode(this._current && (this.range.startContainer === this._current || this.range.endContainer === this._current))) {
        start = this.range.startContainer === this._current ? this.range.startOffset : 0;
        end = this.range.endContainer === this._current ? this.range.endOffset : this._current.length;
        return this._current.deleteData(start, end - start);
      } else {
        return this._current.parentNode.removeChild(this._current);
      }
    };
    RangeIterator.prototype.hasPartialSubtree = function() {
      var c1, c2, c3;
      c1 = !DOMUtils.isDataNode(this._current);
      c2 = DOMUtils.isAncestorOrSelf(this._current, this.range.startContainer);
      c3 = DOMUtils.isAncestorOrSelf(this._current, this.range.endContainer);
      return c1 && (c2 || c3);
    };
    RangeIterator.prototype.getSubtreeIterator = function() {
      var subRange;
      subRange = new W3CRange(this.range._document);
      subRange.selectNodeContents(this._current);
      if (DOMUtils.isAncestorOrSelf(this._current, this.range.startContainer)) {
        subRange.setStart(this.range.startContainer, this.range.startOffset);
      }
      if (DOMUtils.isAncestorOrSelf(this._current, this.range.endContainer)) {
        subRange.setEnd(this.range.endContainer, this.range.endOffset);
      }
      return new RangeIterator(subRange);
    };
    return RangeIterator;
  })();
  W3CRange = (function() {
    W3CRange.START_TO_START = 0;
    W3CRange.START_TO_END = 1;
    W3CRange.END_TO_END = 2;
    W3CRange.END_TO_START = 3;
    function W3CRange(document) {
      this._document = document;
      this.startContainer = document.body;
      this.startOffset = 0;
      this.endContainer = document.body;
      this.endOffset = DOMUtils.getNodeLength(document.body);
      this.commonAncestorContainer = null;
      this.collapsed = false;
    }
    W3CRange.prototype._refreshProperties = function() {
      var node;
      this.collapsed = this.startContainer === this.endContainer && this.startOffset === this.endOffset;
      node = this.startContainer;
      while ((node != null) && node !== this.endContainer && !DOMUtils.isAncestorOf(node, this.endContainer)) {
        node = node.parentNode;
      }
      return this.commonAncestorContainer = node;
    };
    W3CRange.prototype.setStart = function(container, offset) {
      this.startContainer = container;
      this.startOffset = offset;
      return this._refreshProperties();
    };
    W3CRange.prototype.setEnd = function(container, offset) {
      this.endContainer = container;
      this.endOffset = offset;
      return this._refreshProperties();
    };
    W3CRange.prototype.setStartBefore = function(refNode) {
      var container, offset;
      container = refNode.parentNode;
      offset = DOMUtils.findChildPosition(refNode);
      return this.setStart(container, offset);
    };
    W3CRange.prototype.setStartAfter = function(refNode) {
      var container, offset;
      container = refNode.parentNode;
      offset = DOMUtils.findChildPosition(refNode);
      return this.setStart(container, offset + 1);
    };
    W3CRange.prototype.setEndBefore = function(refNode) {
      var container, offset;
      container = refNode.parentNode;
      offset = DOMUtils.findChildPosition(refNode);
      return this.setEnd(container, offset);
    };
    W3CRange.prototype.setEndAfter = function(refNode) {
      var container, offset;
      container = refNode.parentNode;
      offset = DOMUtils.findChildPosition(refNode);
      return this.setEnd(container, offset + 1);
    };
    W3CRange.prototype.selectNode = function(refNode) {
      this.setStartBefore(refNode);
      return this.setEndAfter(refNode);
    };
    W3CRange.prototype.selectNodeContents = function(refNode) {
      this.setStart(refNode, 0);
      return this.setEnd(refNode, DOMUtils.getNodeLength(refNode));
    };
    W3CRange.prototype.collapse = function(toStart) {
      if (toStart) {
        return this.setEnd(this.startContainer, this.startOffset);
      } else {
        return this.setStart(this.endContainer, this.endOffset);
      }
    };
    W3CRange.prototype.cloneContents = function() {
      var cloneSubtree;
      cloneSubtree = function(iterator) {
        var frag, node;
        frag = document.createDocumentFragment();
        while ((node = iterator.next()) != null) {
          node = node.cloneNode(!iterator.hasPartialSubtree());
          if (iterator.hasPartialSubtree()) {
            node.appendChild(cloneSubtree(iterator.getSubtreeIterator()));
          }
          frag.appendChild(node);
        }
        return flag;
      };
      return cloneSubtree(new RangeIterator(this));
    };
    W3CRange.prototype.extractContents = function() {
      var extractSubtree, range;
      range = this.cloneRange();
      if (this.startContainer !== this.commonAncestorContainer) {
        this.setStartAfter(DOMUtils.findClosestAncestor(this.commonAncestorContainer, this.startContainer));
      }
      this.collapse(true);
      extractSubtree = function(iterator) {
        var frag, hasPartialSubtree, node;
        frag = document.createDocumentFragment();
        while ((node = iterator.next()) != null) {
          hasPartialSubtree = iterator.hasPartialSubtree();
          if (iterator.hasPartialSubtree()) {
            node = node.cloneNode(false);
          } else {
            iterator.remove();
          }
          if (iterator.hasPartialSubtree()) {
            node.appendChild(extractSubtree(iterator.getSubtreeIterator()));
          }
          frag.appendChild(node);
        }
        return frag;
      };
      return extractSubtree(new RangeIterator(range));
    };
    W3CRange.prototype.deleteContents = function() {
      var deleteSubtree, range;
      range = this.cloneRange();
      if (this.startContainer !== this.commonAncestorContainer) {
        this.setStartAfter(DOMUtils.findClosestAncestor(this.commonAncestorContainer, this.startContainer));
      }
      this.collapse(true);
      return deleteSubtree = function(iterator) {
        while (iterator.next()) {
          if (iterator.hasPartialSubtree()) {
            deleteSubtree(iterator.getSubtreeIterator());
          } else {
            iterator.remove();
          }
        }
        return deleteSubtree(new RangeIterator(range));
      };
    };
    W3CRange.prototype.insertNode = function(newNode) {
      if (DOMUtils.isDataNode(this.startContainer)) {
        DOMUtils.splitDataNode(this.startContainer, this.startOffset);
        this.startContainer.parentNode.insertBefore(newNode, this.startContainer.nextSibling);
      } else {
        this.startContainer.insertBefore(newNode, this.startContainer.childNodes[this.startOffset]);
      }
      return this.setStart(this.startContainer, this.startOffset);
    };
    W3CRange.prototype.surroundContents = function(newNode) {
      var content;
      content = this.extractContents();
      this.insertNode(newNode);
      newNode.appendChild(content);
      return this.selectNode(newNode);
    };
    W3CRange.prototype.compareBoundaryPoints = function(how, sourceRange) {
      var containerA, containerB, offsetA, offsetB;
      switch (how) {
        case W3CRange.START_TO_START:
        case W3CRange.START_TO_END:
          containerA = this.startContainer;
          offsetA = this.startOffset;
          break;
        case W3CRange.END_TO_END:
        case W3CRange.END_TO_START:
          containerA = this.endContainer;
          offsetA = this.endOffset;
      }
      switch (how) {
        case W3CRange.START_TO_START:
        case W3CRange.END_TO_START:
          containerB = sourceRange.startContainer;
          offsetB = sourceRange.startOffset;
          break;
        case W3CRange.START_TO_END:
        case W3CRange.END_TO_END:
          containerB = sourceRange.endContainer;
          offsetB = sourceRange.endOffset;
      }
      if (containerA.sourceIndex < containerB.souceIndex) {
        return -1;
      }
      if (containerA.sourceIndex === containerB.sourceIndex) {
        if (offsetA < offsetB) {
          return -1;
        }
        if (offsetA === offsetB) {
          return 0;
        }
        return 1;
      }
      return 1;
    };
    W3CRange.prototype.cloneRange = function() {
      var range;
      range = new W3CRange(this.document);
      range.setStart(this.startContainer, this.startOffset);
      range.setEnd(this.endContainer, this.endOffset);
      return range;
    };
    W3CRange.prototype.detach = function() {};
    W3CRange.prototype.toString = function() {
      return TextRangeUtils.convertFromW3CRange(this).text;
    };
    W3CRange.prototype.createContextualFragment = function(tagString) {
      var content, fragment;
      content = DOMUtils.isDataNode(this.startContainer) ? this.startContainer.parentNode : this.startContainer;
      content = content.cloneNode(false);
      content.innerHTML = tagString;
      fragment = this._document.createDocumentFragment();
      while (content.firstChild != null) {
        fragment.appendChild(content.firstChild);
      }
      return fragment;
    };
    return W3CRange;
  })();
  W3CSelection = (function() {
    function W3CSelection(document) {
      this.rangeCount = 0;
      this._document = document;
      this._document.parentWindow.focus();
      this._document.attachEvent('onselectionchange', __bind(function() {
        return this._selectionChangeHolder();
      }, this));
      this._refreshProperties();
    }
    W3CSelection.prototype._selectionChangeHolder = function() {
      var c1, c2, textRange;
      textRange = this._document.selection.createRange();
      c1 = textRange.compareEndPoints('StartToEnd', textRange) !== 0;
      c2 = textRange.parentElement().isContentEditable;
      if (c1 && c2) {
        return this.rangeCount = 1;
      } else {
        return this.rangeCount = 0;
      }
    };
    W3CSelection.prototype._refreshProperties = function() {
      var range;
      range = this.getRangeAt(0);
      return this.isCollapsed = !(range != null) || range.collapsed ? true : false;
    };
    W3CSelection.prototype.addRange = function(range) {
      var selection, textRange;
      selection = this._document.selection.createRange();
      textRange = TextRangeUtils.convertFromW3CRange(range);
      if (!this._selectionExists(selection)) {
        return textRange.select();
      } else {
        if (textRange.compareEndPoints('StartToStart', selection) === -1) {
          if (textRange.compareEndPoints('StartToEnd', selection) > -1 && textRange.compareEndPoints('EndToEnd', selection) === -1) {
            selection.setEndPoint('StartToStart', textRange);
          }
        } else {
          if (textRange.compareEndPoints('EndToStart', selection) < 1 && textRange.compareEndPoints('EndToEnd', selection) > -1) {
            selection.sendEndPoint('EndToEnd', textRange);
          }
        }
        return selection.select();
      }
    };
    W3CSelection.prototype.removeAllRanges = function() {
      return this._document.selection.empty();
    };
    W3CSelection.prototype.getRangeAt = function(index) {
      var textRange;
      try {
        textRange = this._document.selection.createRange();
        return TextRangeUtils.convertToW3CRange(textRange, this._document);
      } catch (e) {
        return null;
      }
    };
    W3CSelection.prototype.toString = function() {
      return this._document.selection.createRange().text;
    };
    return W3CSelection;
  })();
  /*
  W3C DOM element node munipulating utils
  
  Author: Alisue (lambdalisue@hashnote.net)
  License: MIT License
  
  Copyright (C) 2011 hashnote.net, Alisue allright reserved.
  
  Note:
    'leaf' mean terminal text node.
  */
  String.prototype.startsWith = function(prefix) {
    return this.lastIndexOf(prefix, 0) === 0;
  };
  String.prototype.trim = function(str) {
    return this.replace(/^\s+|\s+$/g, '');
  };
  NodeUtils = (function() {
    function NodeUtils() {}
    NodeUtils.prototype.CONTAINER_ELEMENTS = ['body', 'div', 'center', 'blockquote', 'li', 'td'];
    NodeUtils.prototype.BLOCK_ELEMENTS = ['address', 'dir', 'dl', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'menu', 'noframes', 'ol', 'p', 'pre', 'table', 'ul', 'xmp'];
    NodeUtils.prototype.createElementFromHTML = function(html) {
      var container;
      container = document.createElement('div');
      container.innerHTML = html;
      return container.firstChild;
    };
    NodeUtils.prototype.getTextContent = function(node, trim) {
      var text;
      if (trim == null) {
        trim = false;
      }
      text = node.textContent || node.nodeValue;
      if (trim) {
        return text.trim();
      } else {
        return text;
      }
    };
    NodeUtils.prototype.isContainerNode = function(node) {
      var tagName, _ref;
      tagName = (_ref = node.tagName) != null ? _ref.toLowerCase() : void 0;
      return tagName && __indexOf.call(this.CONTAINER_ELEMENTS, tagName) >= 0;
    };
    NodeUtils.prototype.isBlockNode = function(node) {
      var tagName, _ref;
      tagName = (_ref = node.tagName) != null ? _ref.toLowerCase() : void 0;
      return tagName && __indexOf.call(this.BLOCK_ELEMENTS, tagName) >= 0;
    };
    NodeUtils.prototype.isInlineNode = function(node) {
      return !this.isContainerNode(node && !this.isBlockNode(node));
    };
    NodeUtils.prototype.isVisibleNode = function(node) {
      var child, text, _i, _len, _ref;
      if (node.nodeType === 3) {
        text = this.getTextContent(node);
        text = text.replace(/\s\t\r\n/, '');
        return text.length !== 0;
      } else {
        _ref = node.childNodes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          if (this.isVisibleNode(child) === false) {
            return false;
          }
        }
        return true;
      }
    };
    NodeUtils.prototype.isIsolateNode = function(node) {
      return !node.nextSibling && !node.previousSibling;
    };
    NodeUtils.prototype.getNextNode = function(node) {
      while (!node.nextSibling) {
        node = node.parentNode;
        if (!node) {
          return null;
        }
      }
      return node.nextSibling;
    };
    NodeUtils.prototype.getNextLeaf = function(node) {
      node = this.getNextNode(node);
      while ((node != null ? node.firstChild : void 0) != null) {
        node = node.firstChild;
      }
      return node;
    };
    NodeUtils.prototype.getPreviousNode = function(node) {
      while (!node.previousSibling) {
        node = node.parentNode;
        if (!node) {
          return null;
        }
      }
      return node.previousSibling;
    };
    NodeUtils.prototype.getPreviousLeaf = function(node) {
      node = this.getPreviousNode(node);
      while ((node != null ? node.lastChild : void 0) != null) {
        node = node.lastChild;
      }
      return node;
    };
    NodeUtils.prototype.extractLeaf = function(leaf, start, end) {
      var left, middle, nextSibling, parentNode, right, text, textNode, _textNode;
      if (start == null) {
        start = void 0;
      }
      if (end == null) {
        end = void 0;
      }
      text = this.getTextContent(leaf, false);
      if (start == null) {
        start = 0;
      }
      if (end == null) {
        end = text.length;
      }
      if (start === end || (start === 0 && end === text.length)) {
        return leaf;
      }
      left = text.substring(0, start);
      middle = text.substring(start, end);
      right = text.substring(end, text.length);
      nextSibling = leaf.nextSibling;
      parentNode = leaf.parentNode;
      parentNode.removeChild(leaf);
      if (left.length > 0) {
        _textNode = document.createTextNode(left.trim());
        if (this.isVisibleNode(_textNode)) {
          parentNode.insertBefore(_textNode, nextSibling);
        }
      }
      if (middle.length > 0) {
        textNode = document.createTextNode(middle.trim());
        parentNode.insertBefore(textNode, nextSibling);
      }
      if (right.length > 0) {
        _textNode = document.createTextNode(right.trim());
        if (this.isVisibleNode(_textNode)) {
          parentNode.insertBefore(_textNode, nextSibling);
        }
      }
      return textNode;
    };
    return NodeUtils;
  })();
  if (typeof exports !== "undefined" && exports !== null) {
    exports.NodeUtils = NodeUtils;
  }
  /*
  W3C DOM element node wrap manipulate utils
  
  Author: Alisue (lambdalisue@hashnote.net)
  License: MIT License
  Require:
  - partial.partial
  Partial with:
  - nodeutils.core
  
  Copyright 2011 hashnote.net, Alisue allright reserved
  */
  if (typeof require !== "undefined" && require !== null) {
    partial = require('./partial').partial;
    NodeUtils = require('./nodeutils.core').NodeUtils;
  }
  NodeUtils = partial(NodeUtils, {
    _unwrapNode: function(node) {
      var child, grandParentNode, nextSibling, parentNode, _results;
      parentNode = node.parentNode;
      nextSibling = parentNode.nextSibling;
      grandParentNode = parentNode.parentNode;
      grandParentNode.removeChild(parentNode);
      _results = [];
      while (parentNode.firstChild != null) {
        child = parentNode.firstChild;
        _results.push(grandParentNode.insertBefore(child, nextSibling));
      }
      return _results;
    },
    unwrapNode: function(node, search, force) {
      var parentNode, _ref, _ref2;
      if (force == null) {
        force = false;
      }
      while ((node.parentNode != null) && (force || this.isIsolateNode(node))) {
        parentNode = node.parentNode;
        if (_ref = (_ref2 = parentNode.tagName) != null ? _ref2.toLowerCase() : void 0, __indexOf.call(search, _ref) >= 0) {
          this._unwrapNode(node);
          return true;
        }
        node = parentNode;
      }
      return false;
    },
    convertNode: function(node, search, wrapNode, force) {
      var parentNode, parentNodeTagName, _convert, _ref;
      if (force == null) {
        force = false;
      }
      _convert = function(node, wrapNode) {
        var childNodes, nextSibling, parentNode;
        nextSibling = node.nextSibling;
        parentNode = node.parentNode;
        childNodes = node.childNodes;
        parentNode.removeChild(node);
        while (node.firstChild != null) {
          wrapNode.appendChild(node.firstChild);
        }
        return parentNode.insertBefore(wrapNode, nextSibling);
      };
      while ((node.parentNode != null) && (force || this.isIsolateNode(node))) {
        parentNode = node.parentNode;
        parentNodeTagName = (_ref = parentNode.tagName) != null ? _ref.toLowerCase() : void 0;
        if (__indexOf.call(search, parentNodeTagName) >= 0) {
          if (parentNodeTagName === wrapNode.tagName.toLowerCase()) {
            this._unwrapNode(node);
          } else {
            _convert(parentNode, wrapNode);
          }
          return true;
        }
        node = parentNode;
      }
      return false;
    },
    wrapLeaf: function(leaf, wrapNode, force) {
      var cursorNode, parentNode, _wrap, _wrap2;
      if (force == null) {
        force = true;
      }
      if (!this.isVisibleNode(leaf)) {
        return false;
      }
      _wrap = function(node, wrapNode) {
        var nextSibling, parentNode;
        nextSibling = node.nextSibling;
        parentNode = node.parentNode;
        parentNode.removeChild(node);
        wrapNode.appendChild(node);
        return parentNode.insertBefore(wrapNode, nextSibling);
      };
      _wrap2 = function(node, wrapNode) {
        var cursorNode, grandParentNode, nextSibling, nextSiblingContainer, parentNode, previousSiblingContainer;
        parentNode = node.parentNode;
        previousSiblingContainer = null;
        if (node.previousSibling != null) {
          previousSiblingContainer = parentNode.cloneNode(false);
          cursorNode = node;
          while (cursorNode.previousSibling != null) {
            cursorNode = cursorNode.previousSibling;
            previousSiblingContainer.insertBefore(cursorNode, previousSiblingContainer.firstChild);
          }
        }
        nextSiblingContainer = null;
        if (node.nextSibling != null) {
          nextSiblingContainer = parentNode.cloneNode(false);
          cursorNode = node;
          while (cursorNode.nextSibling != null) {
            cursorNode = cursorNode.nextSibling;
            nextSiblingContainer.insertBefore(cursorNode, null);
          }
        }
        nextSibling = parentNode.nextSibling;
        grandParentNode = parentNode.parentNode;
        grandParentNode.removeChild(parentNode);
        if (previousSiblingContainer != null) {
          grandParentNode.insertBefore(previousSiblingContainer, nextSibling);
        }
        wrapNode.appendChild(node);
        grandParentNode.insertBefore(wrapNode, nextSibling);
        if (nextSiblingContainer != null) {
          return grandParentNode.insertBefore(nextSiblingContainer, nextSibling);
        }
      };
      if (this.isContainerNode(wrapNode)) {
        if (force || !this.unwrapNode(leaf, [wrapNode.tagName.toLowerCase()], true)) {
          cursorNode = leaf;
          while (cursorNode.parentNode != null) {
            parentNode = cursorNode.parentNode;
            if (this.isContainerNode(parentNode)) {
              _wrap(cursorNode, wrapNode);
              return true;
            }
            cursorNode = parentNode;
          }
          _wrap(leaf, wrapNode);
        }
      } else if (this.isBlockNode(wrapNode)) {
        if (force || !this.convertNode(leaf, this.BLOCK_ELEMENTS, wrapNode, true)) {
          cursorNode = leaf;
          while (cursorNode.parentNode != null) {
            parentNode = cursorNode.parentNode;
            if (this.isContainerNode(parentNode) && this.isBlockNode(parentNode)) {
              _wrap2(cursorNode, wrapNode);
              return true;
            }
            cursorNode = parentNode;
          }
          cursorNode = leaf;
          while (cursorNode.parentNode != null) {
            parentNode = cursorNode.parentNode;
            if (this.isContainerNode(parentNode)) {
              _wrap(cursorNode, wrapNode);
              return true;
            }
            cursorNode = parentNode;
          }
          _wrap(leaf, wrapNode);
        }
      } else {
        if (force || !this.unwrapNode(leaf, [wrapNode.tagName.toLowerCase()], true)) {
          _wrap(leaf, wrapNode);
        }
      }
      return true;
    },
    wrapNode: function(node, wrapNode, force, start, end) {
      var child, _i, _len, _ref, _results;
      if (force == null) {
        force = false;
      }
      if (start == null) {
        start = void 0;
      }
      if (end == null) {
        end = void 0;
      }
      if (!(node.firstChild != null)) {
        node = this.extractLeaf(node, start, end);
        return this.wrapLeaf(node, wrapNode, force);
      }
      if (start == null) {
        start = 0;
      }
      if (end == null) {
        end = node.childNodes.length;
      }
      _ref = node.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        _results.push(child != null ? this.wrapNode(child, wrapNode, force, start, end) : void 0);
      }
      return _results;
    },
    wrapRange: function(range, wrapNode, force) {
      var end, getNext, getPrevious, isBlockIn, next, result, skipInner, start, _ref, _results;
      if (force == null) {
        force = false;
      }
      if (range.startContainer === range.endContainer) {
        return this.wrapNode(range.startContainer, wrapNode, force, range.startOffset, range.endOffset);
      }
      if (!force) {
        result = false;
        if (this.isContainerNode(wrapNode)) {
          result = this.convertNode(range.commonAncestorContainer, [(_ref = wrapNode.tagName) != null ? _ref.toLowerCase() : void 0], wrapNode, true);
        } else if (this.isBlockNode(wrapNode)) {
          result = this.convertNode(range.commonAncestorContainer, this.BLOCK_ELEMENTS, wrapNode, true);
        }
        if (result === true) {
          return true;
        }
      }
      if (this.isContainerNode(wrapNode)) {
        wrapNode.appendChild(range.extractContents());
        range.insertNode(wrapNode);
        return;
      } else if (this.isBlockNode(wrapNode)) {
        isBlockIn = function(startContainer, endContainer) {
          var cursorNode;
          cursorNode = startContainer;
          while ((cursorNode != null) || cursorNode === endContainer) {
            if (this.isBlockNode(cursorNode)) {
              return true;
            }
            cursorNode = this.getNextNode(cursorNode);
          }
          return false;
        };
        if (!isBlockIn(range.startContainer, range.endContainer)) {
          wrapNode.appendChild(range.extractContents());
          range.insertNode(wrapNode);
          return;
        }
        skipInner = true;
      } else {
        skipInner = false;
      }
      getNext = function(node) {
        if (skipInner) {
          return this.getNextNode(node);
        } else {
          return this.getNextLeaf(node);
        }
      };
      getPrevious = function(node) {
        if (skipInner) {
          return this.getPreviousNode(node);
        } else {
          return this.getPreviousLeaf(node);
        }
      };
      if (range.startContainer.firstChild != null) {
        start = range.startContainer.childNodes[range.startOffset];
      } else {
        start = getNext(range.startContainer);
        this.wrapNode(range.startContainer, wrapNode, force, range.startOffset, void 0);
      }
      if (range.endContainer.firstChild != null) {
        if (range.endOffset > 0) {
          end = range.endContainer.childNodes[range.endOffset - 1];
        } else {
          end = getPrevious(range.endContainer);
        }
      } else {
        end = getPrevious(range.endContainer);
        this.wrapNode(range.endContainer, wrapNode, force, void 0, range.endOffset);
      }
      _results = [];
      while ((start != null) && start !== range.endContainer) {
        next = getNext(start);
        if (start.parentNode != null) {
          this.wrapNode(start, wrapNode, force);
        }
        if (start === end) {
          break;
        }
        _results.push(start = next);
      }
      return _results;
    },
    unwrapRange: function(range, search, force) {
      if (force == null) {
        force = false;
      }
      return this.unwrapNode(range.commonAncestorContainer, search, force);
    },
    convertRange: function(range, search, wrapNode, force) {
      if (force == null) {
        force = false;
      }
      return this.convertNode(range.commonAncestorContainer, search, wrapNode, force);
    }
  });
  if (typeof exports !== "undefined" && exports !== null) {
    exports.NodeUtils = NodeUtils;
  }
  /*
  W3C DOM element node style manipulate utils
  
  Author: Alisue (lambdalisue@hashnote.net)
  License: MIT License
  Require:
  - partial.partial
  Partial with:
  - nodeutils.wrap
  
  Copyright 2011 hashnote.net, Alisue allright reserved
  */
  if (typeof require !== "undefined" && require !== null) {
    partial = require('./partial').partial;
    NodeUtils = require('./nodeutils.wrap').NodeUtils;
  }
  NodeUtils = partial(NodeUtils, {
    unstyleLeaf: function(leaf, styleNames, isblock) {
      var cursorNode, key, parentNode, parentNodeTagName, wrapNodeTagName, _i, _len;
      if (isblock == null) {
        isblock = false;
      }
      wrapNodeTagName = isblock ? 'div' : 'span';
      cursorNode = leaf;
      while ((cursorNode.parentNode != null) && (cursorNode.parentNode.tagName != null)) {
        parentNode = cursorNode.parentNode;
        parentNodeTagName = parentNode.tagName.toLowerCase();
        if (parentNodeTagName === wrapNodeTagName) {
          for (_i = 0, _len = styleNames.length; _i < _len; _i++) {
            key = styleNames[_i];
            parentNode.style[key] = '';
          }
          if (parentNode.getAttribute('style') === '') {
            this._unwrapNode(cursorNode);
          }
          return true;
        }
        cursorNode = parentNode;
      }
      return false;
    },
    styleLeaf: function(leaf, styles, isblock, force) {
      var cursorNode, isCompatible, key, parentNode, parentNodeTagName, styleNames, value, wrapNode, wrapNodeTagName;
      if (isblock == null) {
        isblock = false;
      }
      if (force == null) {
        force = false;
      }
      wrapNodeTagName = isblock ? 'div' : 'span';
      wrapNode = document.createElement(wrapNodeTagName);
      for (key in styles) {
        value = styles[key];
        wrapNode.style[key] = value;
      }
      styleNames = (function() {
        var _results;
        _results = [];
        for (key in styles) {
          value = styles[key];
          _results.push(key);
        }
        return _results;
      })();
      isCompatible = function(node) {
        var key, _i, _len;
        for (_i = 0, _len = styleNames.length; _i < _len; _i++) {
          key = styleNames[_i];
          if (node.style[key] !== wrapNode.style[key]) {
            return false;
          }
        }
        return true;
      };
      cursorNode = leaf;
      while ((cursorNode.parentNode != null) && (cursorNode.parentNode.tagName != null)) {
        parentNode = cursorNode.parentNode;
        parentNodeTagName = parentNode.tagName.toLowerCase();
        if (parentNodeTagName === wrapNodeTagName) {
          if (!force && isCompatible(parentNode)) {
            this.unstyleLeaf(cursorNode, styleNames, isblock);
            return true;
          } else {
            for (key in styles) {
              value = styles[key];
              parentNode.style[key] = value;
            }
            return true;
          }
        }
        cursorNode = parentNode;
      }
      this.wrapLeaf(leaf, wrapNode);
      return true;
    },
    styleNode: function(node, styles, isblock, force, start, end) {
      var child, _i, _len, _ref, _results;
      if (isblock == null) {
        isblock = false;
      }
      if (force == null) {
        force = false;
      }
      if (start == null) {
        start = void 0;
      }
      if (end == null) {
        end = void 0;
      }
      if (!(node.firstChild != null)) {
        node = this.extractLeaf(node, start, end);
        return this.styleLeaf(node, styles, isblock, force);
      }
      if (start == null) {
        start = 0;
      }
      if (end == null) {
        end = node.childNodes.length;
      }
      _ref = node.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        _results.push(child != null ? this.styleNode(child, styles, isblock, force, start, end) : void 0);
      }
      return _results;
    },
    styleRange: function(range, styles, isblock, force) {
      var end, getNext, getPrevious, next, start, _results;
      if (isblock == null) {
        isblock = false;
      }
      if (force == null) {
        force = false;
      }
      if (range.startContainer === range.endContainer) {
        return this.styleNode(range.startContainer, styles, isblock, force, range.startOffset, range.endOffset);
      }
      getNext = function(node) {
        return this.getNextLeaf(node);
      };
      getPrevious = function(node) {
        return this.getPreviousLeaf(node);
      };
      if (range.startContainer.firstChild != null) {
        start = range.startContainer.childNodes[range.startOffset];
      } else {
        start = getNext(range.startContainer);
        this.styleNode(range.startContainer, styles, isblock, force, range.startOffset, void 0);
      }
      if (range.endContainer.firstChild != null) {
        if (range.endOffset > 0) {
          end = range.endContainer.childNodes[range.endOffset - 1];
        } else {
          end = getPrevious(range.endContainer);
        }
      } else {
        end = getPrevious(range.endContainer);
        this.styleNode(range.endContainer, styles, isblock, force, void 0, range.endOffset);
      }
      _results = [];
      while ((start != null) && start !== range.endContainer) {
        next = getNext(start);
        if (start.parentNode != null) {
          this.styleNode(start, styles, isblock, force);
        }
        if (start === end) {
          break;
        }
        _results.push(start = next);
      }
      return _results;
    },
    unstyleRange: function(range, styleNames, isblock, force) {
      if (isblock == null) {
        isblock = false;
      }
      if (force == null) {
        force = false;
      }
      return this.unstyleLeaf(range.commonAncestorContainer, styleNames, isblock, force);
    }
  });
  if (typeof exports !== "undefined" && exports !== null) {
    exports.NodeUtils = NodeUtils;
  }
  API = (function() {
    function API(raw) {
      this.raw = raw;
      this.utils = new NodeUtils;
    }
    API.prototype.execCommand = function(type, arg, force) {
      var getSelection, range, selection, _ref, _ref2;
      if (force == null) {
        force = false;
      }
      getSelection = __bind(function() {
        if (this.raw.window.getSelection != null) {
          return this.raw.window.getSelection();
        } else if (this.raw.document.selection != null) {
          return new W3CSelection(this.raw.document);
        }
      }, this);
      selection = getSelection();
      if (!(selection != null)) {
        if (((_ref = window.console) != null ? _ref.error : void 0) != null) {
          console.error('This browser does not support W3C type of range or Microsoft type of range.');
        }
        return false;
      }
      range = selection.getRangeAt(0);
      switch (type) {
        case 'wrap':
          this.utils.wrapRange(range, this.utils.createElementFromHTML(arg), force);
          break;
        case 'unwrap':
          this.utils.unwrapRange(range, arg, force);
          break;
        case 'style':
          this.utils.styleRange(range, arg, force);
          break;
        case 'unstyle':
          this.utils.unstyleRange(range, arg, force);
          break;
        default:
          if (((_ref2 = window.console) != null ? _ref2.error : void 0) != null) {
            console.error("Unknown command type has passed. type: " + type);
          }
          return false;
      }
      return true;
    };
    return API;
  })();
  if (typeof exports !== "undefined" && exports !== null) {
    exports.API = API;
  }
  if (typeof require !== "undefined" && require !== null) {
    partial = require('../utils/partial').partial;
    API = require('./api.core').API;
  }
  API = partial(API, {
    strong: function() {
      return this.execCommand('wrap', '<strong>');
    },
    em: function() {
      return this.execCommand('wrap', '<em>');
    },
    ins: function() {
      return this.execCommand('wrap', '<ins>');
    },
    del: function() {
      return this.execCommand('wrap', '<del>');
    },
    sub: function() {
      return this.execCommand('wrap', '<sub>');
    },
    sup: function() {
      return this.execCommand('wrap', '<sup>');
    }
  });
  if (typeof exports !== "undefined" && exports !== null) {
    exports.API = API;
  }
  if (typeof require !== "undefined" && require !== null) {
    partial = require('../utils/partial').partial;
    API = require('./api.core').API;
  }
  API = partial(API, {
    blockquote: function() {
      return this.execCommand('wrap', '<blockquote>', true);
    },
    unblockquote: function() {
      return this.execCommand('unwrap', ['blockquote'], true);
    },
    heading: function(level) {
      return this.execCommand('wrap', "<h" + level + ">");
    },
    h1: function() {
      return this.heading(1);
    },
    h2: function() {
      return this.heading(2);
    },
    h3: function() {
      return this.heading(3);
    },
    h4: function() {
      return this.heading(4);
    },
    h5: function() {
      return this.heading(5);
    },
    h6: function() {
      return this.heading(6);
    },
    p: function() {
      return this.execCommand('wrap', '<p>');
    },
    pre: function() {
      return this.execCommand('wrap', '<pre>');
    }
  });
  if (typeof exports !== "undefined" && exports !== null) {
    exports.API = API;
  }
  if (typeof require !== "undefined" && require !== null) {
    partial = require('../utils/partial').partial;
    API = require('./api.core').API;
  }
  API = partial(API, {
    a: function(href) {
      return this.execCommand('wrap', "<a href='" + href + "'>");
    },
    img: function(src) {
      return this.execCommand('wrap', "<img src='" + src + "'>");
    },
    ul: function() {
      return this.raw.execCommand('insertUnorderedList');
    },
    ol: function() {
      return this.raw.execCommand('insertOrderedList');
    },
    hr: function() {
      return this.raw.execCommand('insertHorizontalRule');
    }
  });
  if (typeof exports !== "undefined" && exports !== null) {
    exports.API = API;
  }
  if (typeof require !== "undefined" && require !== null) {
    partial = require('../utils/partial').partial;
    API = require('./commandapi.core').API;
  }
  API = partial(API, {
    forecolor: function(color) {
      return this.execCommand('style', {
        color: color
      });
    },
    backcolor: function(color) {
      return this.execCommand('style', {
        backgroundColor: color
      });
    },
    fontfamily: function(name) {
      return this.execCommand('style', {
        fontFamily: name
      });
    },
    fontsize: function(size) {
      return this.execCommand('style', {
        fontSize: size
      });
    },
    justifyleft: function() {
      return this.execCommand('style', {
        textAlign: 'left'
      }, true);
    },
    justifycenter: function() {
      return this.execCommand('style', {
        textAlign: 'center'
      }, true);
    },
    justifyright: function() {
      return this.execCommand('style', {
        textAlign: 'right'
      }, true);
    },
    justifyfull: function() {
      return this.execCommand('style', {
        textAlign: 'justify'
      }, true);
    }
  });
  if (typeof exports !== "undefined" && exports !== null) {
    exports.API = API;
  }
  if (typeof require !== "undefined" && require !== null) {
    partial = require('../utils/partial').partial;
    API = require('./api.core').API;
  }
  API = partial(API, {
    indent: function() {
      return this.raw.execCommand('indent');
    },
    outdent: function() {
      return this.raw.execCommand('outdent');
    }
  });
  if (typeof exports !== "undefined" && exports !== null) {
    exports.API = API;
  }
  /*
  Rawarea
  
  contentEditable iframe low level munipulating class
  
  Author: Alisue (lambdalisue@hashnote.net)
  License: MIT License
  Required: detector.Detector
  
  Copyright 2011 hashnote.net, Alisue allright reserved.
  */
  if (typeof require !== "undefined" && require !== null) {
    Detector = require('./utils/detector').Detector;
  }
  Rawarea = (function() {
    function Rawarea(iframe) {
      var detector, onloadCallback;
      this.iframe = iframe;
      detector = new Detector;
      this._loaded = false;
      this._callbacks = [];
      this.ready(__bind(function() {
        var DELAY, updateBodyHeight, _ref;
        if (this.iframe.contentDocument != null) {
          this.document = this.iframe.contentDocument;
        } else {
          this.document = this.iframe.contentWindow.document;
        }
        if (!(this.document.body != null)) {
          this.document.writeln('<body></body>');
        }
        this.body = this.document.body;
        this.body.style.cursor = 'text';
        this.body.style.height = '100%';
        if (detector.browser === 'Explorer' && detector.version < 9) {
          updateBodyHeight = __bind(function() {
            return this.body.style.height = "" + this.iframe.offsetHeight + "px";
          }, this);
          DELAY = 100;
          setTimeout(__bind(function() {
            var _ref, _ref2;
            if (((_ref = this.iframe) != null ? _ref.offsetHeight : void 0) !== ((_ref2 = this.body) != null ? _ref2.offsetHeight : void 0)) {
              updateBodyHeight();
            }
            return setTimeout(arguments.callee, DELAY);
          }, this), DELAY);
        }
        if (this.body.spellcheck != null) {
          this.body.spellcheck = false;
        }
        if (this.body.contentEditable != null) {
          this.body.contentEditable = true;
        } else if (this.document.designMode != null) {
          this.document.designMode = 'On';
        } else {
          if (((_ref = window.console) != null ? _ref.error : void 0) != null) {
            console.error('This browser doesn\'t support contentEditable nor designMode');
          }
        }
        return this.window = this.iframe.contentWindow;
      }, this));
      onloadCallback = __bind(function() {
        var callback, _i, _len, _ref;
        this._loaded = true;
        _ref = this._callbacks;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          callback = _ref[_i];
          callback();
        }
        return this._callbacks = void 0;
      }, this);
      if (this.iframe.getAttribute('src') != null) {
        if (detector.browser === 'Explorer' && detector.version < 9) {
          this.iframe.attachEvent('onreadystatechange', __bind(function() {
            if (this.iframe.readyState === 'complete') {
              this.iframe.onreadystatechange = null;
              return onloadCallback();
            }
          }, this));
        } else {
          this.iframe.addEventListener('load', __bind(function() {
            return onloadCallback();
          }, this), false);
        }
      } else {
        onloadCallback();
      }
    }
    Rawarea.prototype.ready = function(callback) {
      if (callback == null) {
        callback = void 0;
      }
      /* add callback or exec callback depend on the iframe has loaded */
      if (!(callback != null)) {
        return this._loaded;
      }
      if (this._loaded) {
        return callback();
      } else {
        return this._callbacks.push(callback);
      }
    };
    Rawarea.prototype.getValue = function() {
      if (this.ready()) {
        return this.body.innerHTML;
      }
    };
    Rawarea.prototype.setValue = function(value) {
      if (this.ready()) {
        return this.body.innerHTML = value;
      }
    };
    Rawarea.prototype.execCommand = function(command, ui, value) {
      if (ui == null) {
        ui = false;
      }
      if (value == null) {
        value = null;
      }
      return this.document.execCommand(command, ui, value);
    };
    Rawarea.prototype.queryCommandState = function(command) {
      return this.document.queryCommandState(command);
    };
    Rawarea.prototype.queryCommandEnabled = function(command) {
      return this.document.queryCommandEnabled(command);
    };
    Rawarea.prototype.queryCommandIndeterm = function(command) {
      return this.document.queryCommandIndeterm(command);
    };
    Rawarea.prototype.queryCommandSupported = function(command) {
      return this.document.queryCommandSupported(command);
    };
    Rawarea.prototype.queryCommandValue = function(command) {
      return this.document.queryCommandValue(command);
    };
    return Rawarea;
  })();
  if (typeof exports !== "undefined" && exports !== null) {
    exports.Rawarea = Rawarea;
  }
  this.Richarea = (function() {
    function Richarea(iframe) {
      this.iframe = iframe;
      if ((window.jQuery != null) && this.iframe instanceof jQuery) {
        this.iframe = this.iframe.get(0);
      }
      this.raw = new Rawarea(this.iframe);
      this.raw.ready(__bind(function() {
        var html;
        if (this.iframe.innerHTML != null) {
          html = this.iframe.innerHTML;
          html = html.split('&lt;').join('<');
          html = html.split('&gt;').join('>');
          return this.setValue(html);
        }
      }, this));
      this.api = new API(this.raw);
    }
    Richarea.prototype.ready = function(callback) {
      if (callback == null) {
        callback = void 0;
      }
      return this.raw.ready(callback);
    };
    Richarea.prototype.getValue = function() {
      return this.raw.getValue();
    };
    Richarea.prototype.setValue = function(value) {
      return this.raw.setValue(value);
    };
    Richarea.prototype.execCommand = function(command, args) {
      var _ref;
      if (args == null) {
        args = void 0;
      }
      if (!(command in this.api)) {
        if (((_ref = window.console) != null ? _ref.error : void 0) != null) {
          return console.error("Command '" + command + "' not found.");
        }
      } else {
        return this.api[command](args);
      }
    };
    return Richarea;
  })();
  if (typeof exports !== "undefined" && exports !== null) {
    exports.Richarea = Richarea;
  }
}).call(this);
