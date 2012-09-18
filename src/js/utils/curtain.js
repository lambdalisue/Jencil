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
    return curtain.show();
  };
  curtain.refresh = function() {
    curtain.width(element.outerWidth(true));
    return curtain.height(element.outerHeight(true));
  };
  curtain.off = function() {
    return curtain.hide();
  };
  return curtain;
};
