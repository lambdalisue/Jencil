/*
Evolution

Extend jQueryObj

Author: lambdalisue
License: MIT License
*/

var evolute;

evolute = (function() {
  var absoluteX, absoluteY, contentX, contentY, maxHeight, maxWidth, minHeight, minWidth, ncss, nonContentHeight, nonContentWidth, outerHeight, outerWidth, relativeX, relativeY;
  nonContentWidth = function(includeMargin) {
    if (includeMargin == null) {
      includeMargin = false;
    }
    return this.outerWidth(includeMargin) - this.width();
  };
  nonContentHeight = function(includeMargin) {
    if (includeMargin == null) {
      includeMargin = false;
    }
    return this.outerHeight(includeMargin) - this.height();
  };
  outerWidth = function(includeMargin, value) {
    var offset;
    if (includeMargin == null) {
      includeMargin = false;
    }
    if (typeof includeMargin === 'number') {
      value = includeMargin;
      includeMargin = false;
    }
    if (value != null) {
      offset = this.nonContentWidth(includeMargin);
      return this.width(value - offset);
    }
    return this._outerWidth(includeMargin);
  };
  outerHeight = function(includeMargin, value) {
    var offset;
    if (includeMargin == null) {
      includeMargin = false;
    }
    if (typeof includeMargin === 'number') {
      value = includeMargin;
      includeMargin = false;
    }
    if (value != null) {
      offset = this.nonContentHeight(includeMargin);
      return this.height(value - offset);
    }
    return this._outerHeight(includeMargin);
  };
  ncss = function(propertyName, defaultValue) {
    var value;
    if (defaultValue == null) {
      defaultValue = null;
    }
    value = this.css(propertyName);
    if (value === '' || value === 'none' || value === null || value === (void 0) || value === NaN) {
      return defaultValue;
    }
    value = parseInt(value, 10);
    return value;
  };
  minWidth = function() {
    return this.ncss('min-width');
  };
  minHeight = function() {
    return this.ncss('min-height');
  };
  maxWidth = function() {
    return this.ncss('max-width');
  };
  maxHeight = function() {
    return this.ncss('max-height');
  };
  contentX = function(includeMargin) {
    var borderLeft, marginLeft, paddingLeft;
    if (includeMargin == null) {
      includeMargin = false;
    }
    marginLeft = includeMargin ? this.ncss('margin-left') : 0;
    borderLeft = this.ncss('border-left-width');
    paddingLeft = this.ncss('padding-left');
    return marginLeft + borderLeft + paddingLeft;
  };
  contentY = function(includeMargin) {
    var borderTop, marginTop, paddingTop;
    if (includeMargin == null) {
      includeMargin = false;
    }
    marginTop = includeMargin ? this.ncss('margin-top') : 0;
    borderTop = this.ncss('border-top-width');
    paddingTop = this.ncss('padding-top');
    return marginTop + borderTop + paddingTop;
  };
  absoluteX = function(value) {
    var offset;
    offset = this.offset();
    if (value != null) {
      offset.left = value;
      return this.offset(offset);
    }
    return offset.left;
  };
  absoluteY = function(value) {
    var offset;
    offset = this.offset();
    if (value != null) {
      offset.top = value;
      return this.offset(offset);
    }
    return offset.top;
  };
  relativeX = function(includeMargin, value) {
    var offset, parent;
    if (includeMargin == null) {
      includeMargin = false;
    }
    if (typeof includeMargin === 'number') {
      value = includeMargin;
      includeMargin = false;
    }
    parent = evolute(this.parent());
    offset = parent.absoluteX() + parent.contentX(includeMargin);
    if (value != null) {
      return this.absoluteX(value + offset);
    }
    return this.absoluteX() - offset;
  };
  relativeY = function(includeMargin, value) {
    var offset, parent;
    if (includeMargin == null) {
      includeMargin = false;
    }
    if (typeof includeMargin === 'number') {
      value = includeMargin;
      includeMargin = false;
    }
    parent = evolute(this.parent());
    offset = parent.absoluteY() + parent.contentY(includeMargin);
    if (value != null) {
      return this.absoluteY(value + offset);
    }
    return this.absoluteY() - offset;
  };
  evolute = function(jQueryObj) {
    if (jQueryObj.__evoluted__ === true) {
      return jQueryObj;
    }
    jQueryObj._outerWidth = jQueryObj.outerWidth;
    jQueryObj._outerHeight = jQueryObj.outerHeight;
    jQueryObj.nonContentWidth = nonContentWidth;
    jQueryObj.nonContentHeight = nonContentHeight;
    jQueryObj.outerWidth = outerWidth;
    jQueryObj.outerHeight = outerHeight;
    jQueryObj.nonContentWidth = nonContentWidth;
    jQueryObj.nonContentHeight = nonContentHeight;
    jQueryObj.ncss = ncss;
    jQueryObj.minWidth = minWidth;
    jQueryObj.minHeight = minHeight;
    jQueryObj.maxWidth = maxWidth;
    jQueryObj.maxHeight = maxHeight;
    jQueryObj.contentX = contentX;
    jQueryObj.contentY = contentY;
    jQueryObj.absoluteX = absoluteX;
    jQueryObj.absoluteY = absoluteY;
    jQueryObj.relativeX = relativeX;
    jQueryObj.relativeY = relativeY;
    jQueryObj.__evoluted__ = true;
    return jQueryObj;
  };
  return evolute;
})();
