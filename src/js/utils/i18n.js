var translate;

if (window.i18n != null) {
  translate = function(key) {
    return i18n.t(key, {
      defaultValue: key
    });
  };
} else {
  translate = function(key) {
    return key;
  };
}
