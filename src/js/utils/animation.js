var animate;

animate = function(options) {
  /*
    Animate using easing function
  */

  var difference, startTime, step;
  options = $.extend({
    start: 0,
    end: 100,
    duration: 1000,
    callback: null,
    easing: null
  }, options);
  startTime = animate.now();
  difference = options.end - options.start;
  options.easing = options.easing || animate.easings["default"];
  step = function() {
    var epoch, x;
    epoch = animate.now() - startTime;
    x = options.easing(epoch, 0, 1, options.duration);
    x = x * difference + options.start;
    options.callback(x, epoch);
    if (epoch < options.duration) {
      return setTimeout(step, 1);
    } else {
      return options.callback(options.end, options.duration);
    }
  };
  step();
  return null;
};

animate.now = function() {
  return (new Date()).getTime();
};

animate.easings = {
  "default": function(t, start, end, duration) {
    return jQuery.easing.swing(t / duration, t, start, end, duration);
  }
};

if (typeof exports !== "undefined" && exports !== null) {
  exports.animate = animate;
}
