var curtainFactory;

curtainFactory = function(element) {
  var curtain;
  element.css('position', 'relative');
  curtain = $('<div>').appendTo(element).hide().css({
    'position': 'absolute',
    'top': '0',
    'left': '0',
    'overflow': 'hidden',
    'z-index': 99999
  });
  curtain.on = function() {
    curtain.refresh();
    curtain.show();
    return this;
  };
  curtain.refresh = function() {
    curtain.width(element.outerWidth(true));
    curtain.height(element.outerHeight(true));
    return this;
  };
  curtain.off = function() {
    curtain.hide();
    return this;
  };
  return curtain;
};
