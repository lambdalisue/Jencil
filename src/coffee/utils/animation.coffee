animate = (options) ->
  ###
  Animate using easing function

  ###
  options = $.extend({
    start: 0
    end: 100
    duration: 1000
    callback: null
    done: null
    easing: null
  }, options)
  startTime = animate.now()
  difference = options.end - options.start
  options.easing = options.easing or animate.easings.default
  step = ->
    epoch = animate.now() - startTime
    x = options.easing(epoch, 0, 1, options.duration)
    x = x * difference + options.start
    options.callback x, epoch
    if epoch < options.duration
      setTimeout(step, 1)
    else
      options.callback options.end, options.duration
      options.done?()
  step()
  return null
animate.now = -> (new Date()).getTime()
animate.easings = {
  default: (t, start, end, duration) ->
    jQuery.easing.swing(t/duration, t, start, end, duration)
}

exports?.animate = animate
