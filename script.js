// forked from https://www.cssscript.com/vertical-full-screen-page-slider-javascript/
var slider = function (sliderElement) {

  if (document.querySelector(sliderElement) === null) return null;

  var pages = [],
  currentSlide = 1,
  isChanging = false,
  keyUp = { 38: 1, 33: 1 },
  keyDown = { 40: 1, 34: 1 },
  preventScroll = false,
  lockPreventScroll = false,
  isChangingTimeOut = false;

  var init = function () {

    document.body.classList.add('slider__body');

    // control scrolling
    whatWheel = 'onwheel' in document.createElement('div') ? 'wheel' : document.onmousewheel !== undefined ? 'mousewheel' : 'DOMMouseScroll';
    window.addEventListener(whatWheel, function (e) {
      if (!isChanging && getPreventScroll() === false) {
        var direction = e.wheelDelta || -e.deltaY;
        if (direction > 0) {
          changeSlide(-1);
        } else if (direction < 0) {
          changeSlide(1);
        }
      }
    });

    // allow keyboard input
    window.addEventListener('keydown', function (e) {
      if (keyUp[e.keyCode]) {
        changeSlide(-1);
      } else if (keyDown[e.keyCode]) {
        changeSlide(1);
      }
    });

    // page change animation is done
    detectChangeEnd() && document.querySelector(sliderElement).addEventListener(detectChangeEnd(), function () {
      if (isChanging) {
        if(isChangingTimeOut) clearTimeout(isChangingTimeOut);
        isChangingTimeOut = setTimeout(function () {
          isChanging = false;
        }, 200);
      }
    });

    // set up page and build visual indicators
    document.querySelector(sliderElement).classList.add('slider__container');
    var indicatorContainer = document.createElement('div');
    indicatorContainer.classList.add('slider__indicators');

    var index = 1;
    [].forEach.call(document.querySelectorAll(sliderElement + ' > *'), function (section) {

      var indicator = document.createElement('a');
      indicator.classList.add('slider__indicator')
      indicator.setAttribute('data-slider-target-index', index);

      if (section.getAttribute('id') == null) {
        section.setAttribute('id', 'section-' + index);
      }

      indicator.setAttribute('href', '#' + section.getAttribute('id'));
      indicator.addEventListener('click', function (e) {
        e.preventDefault();
        gotoSlide('[data-slider-index="' + this.getAttribute('data-slider-target-index') + '"]');
      });

      indicatorContainer.appendChild(indicator);

      section.classList.add('slider__page');
      pages.push(section);
      section.setAttribute('data-slider-index', index++);
    });

    document.body.appendChild(indicatorContainer);

    updateInterface(currentSlide);

    // stuff for touch devices
    var touchStartPos = 0;
    var touchStopPos = 0;
    var touchMinLength = 90;
    document.addEventListener('touchstart', function (e) {
      // e.preventDefault();
      if (getPreventScroll() === false) {
        if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
          var touch = e.touches[0] || e.changedTouches[0];
          touchStartPos = touch.pageY;
        }
      }
    });
    document.addEventListener('touchend', function (e) {
      // e.preventDefault();
      if (getPreventScroll() === false) {
        if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
          var touch = e.touches[0] || e.changedTouches[0];
          touchStopPos = touch.pageY;
        }
        if (touchStartPos + touchMinLength < touchStopPos) {
          changeSlide(-1);
        } else if (touchStartPos > touchStopPos + touchMinLength) {
          changeSlide(1);
        }
      }
    });
  };

  var updateInterface = function (currentSlide) {
    document.body.setAttribute('data-current-slide', pages[currentSlide - 1].getAttribute('id'));

    // change theme
    var theme = pages[currentSlide - 1].getAttribute('data-slider-theme');
    if (theme !== null) document.body.setAttribute('data-slider-theme', theme);
    else document.body.setAttribute('data-slider-theme', 'default');

    // change dots
    var oldDot = document.querySelector('a.slider__indicator--active');
    var currentDot = document.querySelector('a[data-slider-target-index="' + currentSlide + '"]');
    if (oldDot !== null) oldDot.classList.remove('slider__indicator--active');
    if (currentDot !== null) currentDot.classList.add('slider__indicator--active');
  }

  // prevent double scrolling
  var detectChangeEnd = function () {
    var transition;
    var e = document.createElement('foobar');
    var transitions = {
      'transition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    };

    for (transition in transitions) {
      if (e.style[transition] !== undefined) {
        return transitions[transition];
      }
    }
    return true;
  };


  // handle css change
  var changeCss = function (obj, styles) {
    for (var _style in styles) {
      if (obj.style[_style] !== undefined) {
        obj.style[_style] = styles[_style];
      }
    }
  };

  // get outerHeight with margin
  var outerHeight = function (el) {
    var height = el.offsetHeight;
    var style = el.currentStyle || getComputedStyle(el);

    height += parseInt(style.marginTop) + parseInt(style.marginBottom);
    return height;
  }

  var goToFooter = function () {
    var footer = pages[currentSlide - 1];
    var footerOffsetHeight = outerHeight(footer);
    changeCss(document.querySelector(sliderElement), {
      transform: 'translate3d(0, calc(' + -(currentSlide - 2) * 100 + '% - ' + footerOffsetHeight + 'px), 0)'
    });
  }

  var goToFooterOnResize = function () {
    if (document.body.classList.contains('slider__body') && !isChanging) {
      var timeout;
      if (timeout) {
        window.cancelAnimationFrame(timeout);
      }
      timeout = window.requestAnimationFrame(goToFooter);
    }
  }

  // handle page/section change
  var changeSlide = function (direction) {

    // already doing it or last/first page, staph plz
    if (isChanging || document.body.classList.contains('slider__body') === false || (direction == 1 && currentSlide == pages.length) || (direction == -1 && currentSlide == 1)) {
      return;
    }

    // change page
    currentSlide += direction;
    isChanging = true;

    if (pages.length === currentSlide && pages[currentSlide - 1].classList.contains('fsSlides__slide--footer')) {
      goToFooter();
      window.addEventListener('resize', goToFooterOnResize, false);
    } else {
      window.removeEventListener('resize', goToFooterOnResize);
      changeCss(document.querySelector(sliderElement), {
        transform: 'translate3d(0, ' + -(currentSlide - 1) * 100 + '%, 0)'
      });
    }
    updateInterface(currentSlide);
  };

  // go to spesific slide if it exists
  var gotoSlide = function (where) {
    var target = document.querySelector(where).getAttribute('data-slider-index');
    if (target != currentSlide && document.querySelector(where)) {
      changeSlide(target - currentSlide);
    }
  };


  var gotoCurrentHash = function () {
    // if page is loaded with hash, go to slide
    if (location.hash && getPreventScroll() === false && document.body.classList.contains('slider__body')) {
      setTimeout(function () {
        window.scrollTo(0, 0);
        gotoSlide(location.hash);
      }, 1);
    };
  }

  var getPreventScroll = function () {
    return preventScroll;
  }

  var setPreventScroll = function (value) {
    if (!getLockPreventScroll()) preventScroll = value;
  }

  var getLockPreventScroll = function () {
    return lockPreventScroll;
  }

  var setLockPreventScroll = function (value) {
    lockPreventScroll = value;
  }

  // we have lift off
  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('onload', init(), false);
  }

  // expose gotoSlide function
  return {
    gotoSlide: gotoSlide,
    gotoCurrentHash: gotoCurrentHash,
    setPreventScroll: setPreventScroll,
    getPreventScroll: getPreventScroll,
    setLockPreventScroll: setLockPreventScroll
  }
};

var mySlider = slider('.slides');