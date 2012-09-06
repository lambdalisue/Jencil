
jQuery.prototype._outerWidth = jQuery.prototype.outerWidth;

jQuery.prototype.outerWidth = function(includeMargin, value) {
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

jQuery.prototype._outerHeight = jQuery.prototype.outerHeight;

jQuery.prototype.outerHeight = function(includeMargin, value) {
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

jQuery.prototype.nonContentWidth = function(includeMargin) {
  if (includeMargin == null) {
    includeMargin = false;
  }
  return this._outerWidth(includeMargin) - this.width();
};

jQuery.prototype.nonContentHeight = function(includeMargin) {
  if (includeMargin == null) {
    includeMargin = false;
  }
  return this._outerHeight(includeMargin) - this.height();
};

jQuery.prototype.ncss = function(propertyName, defaultValue) {
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

jQuery.prototype.minWidth = function() {
  return this.ncss('min-width');
};

jQuery.prototype.minHeight = function() {
  return this.ncss('min-height');
};

jQuery.prototype.maxWidth = function() {
  return this.ncss('max-width');
};

jQuery.prototype.maxHeight = function() {
  return this.ncss('max-height');
};

jQuery.prototype.contentX = function(includeMargin) {
  var borderLeft, marginLeft, paddingLeft;
  if (includeMargin == null) {
    includeMargin = false;
  }
  marginLeft = includeMargin ? this.ncss('margin-left') : 0;
  borderLeft = this.ncss('border-left-width');
  paddingLeft = this.ncss('padding-left');
  return marginLeft + borderLeft + paddingLeft;
};

jQuery.prototype.contentY = function(includeMargin) {
  var borderTop, marginTop, paddingTop;
  if (includeMargin == null) {
    includeMargin = false;
  }
  marginTop = includeMargin ? this.ncss('margin-top') : 0;
  borderTop = this.ncss('border-top-width');
  paddingTop = this.ncss('padding-top');
  return marginTop + borderTop + paddingTop;
};

jQuery.prototype.absoluteX = function(value) {
  var offset;
  offset = this.offset();
  if (value != null) {
    offset.left = value;
    return this.offset(offset);
  }
  return offset.left;
};

jQuery.prototype.absoluteY = function(value) {
  var offset;
  offset = this.offset();
  if (value != null) {
    offset.top = value;
    return this.offset(offset);
  }
  return offset.top;
};

jQuery.prototype.relativeX = function(includeMargin, value) {
  var offset, parent;
  if (includeMargin == null) {
    includeMargin = false;
  }
  if (typeof includeMargin === 'number') {
    value = includeMargin;
    includeMargin = false;
  }
  parent = this.parent();
  offset = parent.absoluteX() + parent.contentX(includeMargin);
  if (value != null) {
    return this.absoluteX(value + offset);
  }
  return this.absoluteX() - offset;
};

jQuery.prototype.relativeY = function(includeMargin, value) {
  var offset, parent;
  if (includeMargin == null) {
    includeMargin = false;
  }
  if (typeof includeMargin === 'number') {
    value = includeMargin;
    includeMargin = false;
  }
  parent = this.parent();
  offset = parent.absoluteY() + parent.contentY(includeMargin);
  if (value != null) {
    return this.absoluteY(value + offset);
  }
  return this.absoluteY() - offset;
};
