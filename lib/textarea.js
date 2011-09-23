(function() {
  /*
  TextArea.coffee
  
  Cross browser textarea munipulator script written in CoffeeScript
  
  :Author: Alisue (lambdalisue@hashnote.net)
  :License: MIT License
  :Url: http://github.com/lambdalisue/Textarea.coffee
  :Reference:
    - http://archiva.jp/web/javascript/getRange_in_textarea.html
    - http://livepipe.net/control/textarea
    - http://markitup.jaysalvat.com/home/
  */  this.Textarea = (function() {
    function Textarea(textarea) {
      if ((typeof jQuery !== "undefined" && jQuery !== null) && textarea instanceof jQuery) {
        this.textarea = textarea.get(0);
      } else {
        this.textarea = textarea;
      }
    }
    Textarea.prototype.getValue = function() {
      return this.textarea.value;
    };
    Textarea.prototype.getSelection = function() {
      var clone, e, range, s;
      if (document.selection) {
        range = document.selection.createRange();
        clone = range.duplicate();
        clone.moveToElementText(this.textarea);
        clone.setEndPoint('EndToEnd', range);
        s = clone.text.length - range.text.length;
        e = s + range.text.length;
      } else if (this.textarea.setSelectionRange) {
        s = this.textarea.selectionStart;
        e = this.textarea.selectionEnd;
      }
      return [s, e];
    };
    Textarea.prototype.setSelection = function(start, end) {
      var range, scrollTop;
      scrollTop = this.textarea.scrollTop;
      if (this.textarea.createTextRange) {
        if ($.browser.opera && $.browser.version >= 9.5 && length === 0) {
          return false;
        }
        range = this.textarea.createTextRange();
        range.collapse(true);
        range.moveStart('character', start);
        range.moveEnd('character', end - start);
        range.select();
      } else if (this.textarea.setSelectionRange) {
        this.textarea.setSelectionRange(start, end);
      }
      this.textarea.focus();
      return this.textarea.scrollTop = scrollTop;
    };
    Textarea.prototype.getSelected = function() {
      var end, range, start, _ref;
      if (document.selection) {
        range = document.selection.createRange();
        return range.text;
      } else if (this.textarea.setSelectionRange) {
        _ref = this.getSelection(), start = _ref[0], end = _ref[1];
        return this.textarea.value.substring(start, end);
      }
      return false;
    };
    Textarea.prototype._replaceSelected = function(str, start, end) {
      var after, before, range;
      if (start == null) {
        start = void 0;
      }
      if (end == null) {
        end = void 0;
      }
      if (document.selection) {
        this.textarea.focus();
        range = document.selection.createRange();
        range.text = str;
        return range.select();
      } else if (this.textarea.setSelectionRange) {
        before = this.textarea.value.substring(0, start);
        after = this.textarea.value.substring(end);
        return this.textarea.value = before + str + after;
      }
    };
    Textarea.prototype.replaceSelected = function(str, select) {
      var end, scrollTop, start, _ref;
      if (select == null) {
        select = false;
      }
      scrollTop = this.textarea.scrollTop;
      _ref = this.getSelection(), start = _ref[0], end = _ref[1];
      this._replaceSelected(str, start, end);
      end = start + str.length;
      if (!select) {
        start = end;
      }
      this.setSelection(start, end);
      this.textarea.focus();
      return this.textarea.scrollTop = scrollTop;
    };
    Textarea.prototype.insertBeforeSelected = function(str, select) {
      var end, scrollTop, selected, start, _ref;
      if (select == null) {
        select = false;
      }
      scrollTop = this.textarea.scrollTop;
      _ref = this.getSelection(), start = _ref[0], end = _ref[1];
      selected = this.getSelected();
      this._replaceSelected(str + selected, start, end);
      end = start + str.length;
      if (!select) {
        start = end;
      }
      this.setSelection(start, end);
      this.textarea.focus();
      return this.textarea.scrollTop = scrollTop;
    };
    Textarea.prototype.insertAfterSelected = function(str, select) {
      var end, scrollTop, selected, start, _ref;
      if (select == null) {
        select = false;
      }
      scrollTop = this.textarea.scrollTop;
      _ref = this.getSelection(), start = _ref[0], end = _ref[1];
      selected = this.getSelected();
      this._replaceSelected(selected + str, start, end);
      end = start + str.length;
      if (!select) {
        start = end;
      } else {
        start = start + selected.length;
      }
      this.setSelection(start, end);
      this.textarea.focus();
      return this.textarea.scrollTop = scrollTop;
    };
    Textarea.prototype.wrapSelected = function(before, after, select, additional) {
      var end, scrollTop, selected, start, str, _ref;
      if (select == null) {
        select = false;
      }
      if (additional == null) {
        additional = void 0;
      }
      selected = this.getSelected();
      if (selected.indexOf(before) === 0 && selected.lastIndexOf(after) === (selected.length - after.length)) {
        str = selected.substring(before.length, selected.length - after.length);
        return this.replaceSelected(str, select);
      } else {
        if (selected === '' && (additional != null)) {
          selected = additional;
        } else {
          additional = void 0;
        }
        scrollTop = this.textarea.scrollTop;
        _ref = this.getSelection(), start = _ref[0], end = _ref[1];
        this._replaceSelected(before + selected + after, start, end);
        if (!select) {
          end = start + before.length + selected.length + after.length;
          start = end;
        } else if (additional) {
          end = start + before.length + selected.length;
          start = start + before.length;
        } else {
          end = start + before.length + after.length + selected.length;
        }
        this.setSelection(start, end);
        this.textarea.focus();
        return this.textarea.scrollTop = scrollTop;
      }
    };
    return Textarea;
  })();
}).call(this);
