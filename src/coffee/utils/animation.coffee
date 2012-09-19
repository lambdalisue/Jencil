###
animation

Animate value via easing function

The following library is required to use this library

- jQuery

Author:   lambdalisue (lambdalisue@hashnote.net)
License:  MIT License

Copyright(C) 2012 lambdalisue, hasnote.net allright reserved
###
animate = do ->
  now = -> (new Date()).getTime()
  defaultOptions =
    start: 0, end: 100, duration: 1000
    callbackEach: null
    callbackDone: null
    easing: jQuery.easing.swing
  return (options) ->
    options = jQuery.extend(defaultOptions, options)
    # keep and calculate required variables
    startTime = now()
    difference = options.end - options.start
    step = ->
      # calculate x
      epoch = now() - startTime
      x = options.easing(epoch/options.duration, epoch, 0, 1, options.duration)
      x = x * difference + options.start
      # call callback
      options.callbackEach x, epoch
      # exit check
      if epoch < options.duration
        setTimeout(step, 1)
      else
        # call last callback and done
        options.callbackEach options.end, options.duration
        options.callbackDone?()
    # start animation
    step()
