/*
animation

Animate value via easing function

The following library is required to use this library

- jQuery

Author:   lambdalisue (lambdalisue@hashnote.net)
License:  MIT License

Copyright(C) 2012 lambdalisue, hasnote.net allright reserved
*/

var animate;

animate = (function() {
  var defaultOptions, now;
  now = function() {
    return (new Date()).getTime();
  };
  defaultOptions = {
    start: 0,
    end: 100,
    duration: 1000,
    callbackEach: null,
    callbackDone: null,
    easing: jQuery.easing.swing
  };
  return function(options) {
    var difference, startTime, step;
    options = jQuery.extend(defaultOptions, options);
    startTime = now();
    difference = options.end - options.start;
    step = function() {
      var epoch, x;
      epoch = now() - startTime;
      x = options.easing(epoch / options.duration, epoch, 0, 1, options.duration);
      x = x * difference + options.start;
      options.callbackEach(x, epoch);
      if (epoch < options.duration) {
        return setTimeout(step, 1);
      } else {
        options.callbackEach(options.end, options.duration);
        return typeof options.callbackDone === "function" ? options.callbackDone() : void 0;
      }
    };
    return step();
  };
})();
