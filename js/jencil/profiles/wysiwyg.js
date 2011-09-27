(function() {
  namespace('Jencil.profile', function(exports) {
    var Profile;
    return exports.Profile = Profile = (function() {
      Profile.prototype.name = 'WYSIWYG HTML Profile';
      function Profile(jencil) {}
      Profile.prototype.editor = 'RichEditor';
      Profile.prototype.buttonsets = [['CommandButton', 'h1', 'H1', 'heading', '1'], ['CommandButton', 'h2', 'H2', 'heading', '2'], ['CommandButton', 'h3', 'H3', 'heading', '3'], ['-'], ['CommandButton', 'bold', 'Bold', 'bold', void 0], ['CommandButton', 'italic', 'Italic', 'italic', void 0], ['CommandButton', 'underline', 'Underline', 'underline', void 0], ['CommandButton', 'strikethrough', 'Strike', 'strikethrough', void 0], ['-'], ['CommandButton', 'subscript', 'Subscript', 'subscript', void 0], ['CommandButton', 'superscript', 'Superscript', 'superscript', void 0], ['-'], ['CommandButton', 'ul', 'Unordered List', 'insertUnorderedList', void 0], ['CommandButton', 'ol', 'Ordered List', 'insertOrderedList', void 0], ['-'], ['PromptCommandButton', 'link', 'Link', 'insertLink', 'Please input link url'], ['PromptCommandButton', 'image', 'Image', 'insertImage', 'Please input image url'], ['-'], ['CommandButton', 'indent', 'Indent', 'indent', void 0], ['CommandButton', 'outdent', 'Outdent', 'outdent', void 0], ['-'], ['CommandButton', 'justify-left', 'Align left', 'justifyLeft', void 0], ['CommandButton', 'justify-center', 'Align center', 'justifyCenter', void 0], ['CommandButton', 'justify-right', 'Align right', 'justifyRight', void 0], ['CommandButton', 'justify-full', 'Justify', 'justifyFull', void 0], ['-'], ['CommandButton', 'undo', 'Undo', 'undo', void 0], ['CommandButton', 'redo', 'Redo', 'redo', void 0], ['RawviewButton']];
      return Profile;
    })();
  });
}).call(this);
