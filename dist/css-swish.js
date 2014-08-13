/*! css-swish - v0.0.1 - 2014-08-13
* https://github.com/jordanranson/css-swish
* Copyright (c) 2014 Jordan Ranson; Licensed under the Apache2 license */
(function(window) {

    window.__cssSwish = {};
    window.__cssSwish.durationCache = {};
    window.__cssSwish.displayCache = {};

    // Default config
    window.__cssSwish.config = {
        hiddenClass: 'out',
        visibleClass: 'in'
    };

    window.Swish = function(config) {
        for(var key in config) {
            window.__cssSwish.config[key] = config[key];
        }
    };

    function getTransition(elem) {
        if(elem.getAttribute('data-swish-transition')) {
            return elem.getAttribute('data-swish-transition');
        }
        else {
            return null;
        }
    }

    function getDisplayProperty(elem) {

        // Is the display property cached?
        if(elem.__swishDisplayProperty) {
            return elem.__swishDisplayProperty;
        }

        // Get default display property for tag
        var result;
        var tag = document.createElement(elem.tagName);
        var getComputedStyle = 'getComputedStyle' in window;

        tag.style.visibility = 'hidden';
        document.body.appendChild(tag);
        result = (getComputedStyle ? window.getComputedStyle(tag, '') : tag.currentStyle).display;
        document.body.removeChild(tag);

        // Find the implicit display property
        var sheet;
        var sheets = document.styleSheets;
        var selectors = ['#'+elem.id].concat(elem.classList);

        // Iterate over page styles until a match is found
        var rule;
        for (var i = 0; i < sheets.length; i++) {
            sheet = sheets[i];
            if(!sheet.cssRules) { continue; }

            for (var j = 0; j < sheet.cssRules.length; j++) {
                rule = sheet.cssRules[j];

                // Style contains selector
                for(var k = 0; k < selectors.length; k++) {
                    if(rule.selectorText && rule.selectorText.split(',').indexOf(selectors[k]) !== -1) {
                        if(rule.style['display'] !== 'none' && rule.style['display'] !== '') {
                            result = rule.style['display'];
                        }
                    }
                }
            }
        }

        console.log(result);

        // Cache and return the display property
        elem.__swishDisplayProperty = result;
        return elem.__swishDisplayProperty;
    }

    function getTransitionDuration(elem, selector) {

        // Does the element have a duration set in markup?
        if(elem.getAttribute('data-swish-duration')) {
            return Number(elem.getAttribute('data-swish-duration'));
        }

        // Does the transition have a globally cached duration?
        var cache = window.__cssSwish.durationCache;
        if(cache[selector]) {
            return cache[selector];
        }

        // Find the duration
        var sheet;
        var result = null;
        var sheets = document.styleSheets;
        var styles = [
            'transitionDuration',
            'WebkitTransitionDuration',
            'msTransitionDuration',
            'MozTransitionDuration',
            'OTransitionDuration'
        ];

        // Iterate over page styles until a match is found
        var rule;
        for (var i = 0; i < sheets.length; i++) {
            sheet = sheets[i];
            if(!sheet.cssRules) { continue; }

            for (var j = 0; j < sheet.cssRules.length; j++) {
                rule = sheet.cssRules[j];

                // Style contains selector
                if (rule.selectorText && rule.selectorText.split(',').indexOf('.'+selector) !== -1) {

                    // Find matching properties
                    for(var k = 0; k < styles.length; k++) {
                        for(var l in rule.style) {

                            // Duration found
                            if(l === styles[k]) {
                                result = rule.style[styles[k]];
                                break;
                            }
                        }
                    }
                }
            }
        }

        // Check if milliseconds or seconds and convert
        if(result) {
            // milliseconds
            if(result.slice(result.length-2, result.length) === 'ms') {
                result = Number(result.slice(0, result.length-2));
            }
            // seconds
            else {
                result = result.slice(0, result.length-1);
                result *= 1000;
                result = Number(result.toFixed(0));
            }
        }

        // Cache and return the result
        cache[selector] = result;
        return result;
    }

    function setDuration(elem, duration) {
        elem.style.transitionDuration       = duration + 'ms';
        elem.style.WebkitTransitionDuration = duration + 'ms';
        elem.style.MozTransitionDuration    = duration + 'ms';
        elem.style.msTransitionDuration     = duration + 'ms';
        elem.style.OTransitionDuration      = duration + 'ms';
    }

    function swishIn(elem, transition, duration) {
        // Cancel previous transition
        if(elem.__swishTimer) {
            clearTimeout(elem.__swishTimer);
        }

        var display = getDisplayProperty(elem);
        var config = window.__cssSwish.config;

        // Prep element for animation
        setDuration(elem, 0);
        elem.classList.add(transition);
        elem.classList.add(config.hiddenClass);
        elem.style.display = display;

        setTimeout(function() {

            // Set animation flag
            elem.__swishShowing = true;

            // Carry out animation
            setDuration(elem, duration);
            setTimeout(function() {
                elem.classList.remove(config.hiddenClass);
                elem.classList.add(config.visibleClass);
            }, 0);
        }, 0);
    }

    function swishOut(elem, transition, duration) {
        // Cancel previous transition
        if(elem.__swishTimer) {
            clearTimeout(elem.__swishTimer);
        }

        var config = window.__cssSwish.config;

        // Prep element for animation
        setDuration(elem, 0);
        elem.classList.add(config.visibleClass);
        elem.classList.add(transition);

        setTimeout(function() {

            // Set animation flag
            elem.__swishShowing = false;

            // Carry out animation
            setDuration(elem, duration);
            setTimeout(function() {
                elem.classList.remove(config.visibleClass);
                elem.classList.add(config.hiddenClass);
                elem.__swishTimer = setTimeout(function() {
                    elem.style.display = 'none';
                }, duration);
            }, 0);
        }, 0);
    }

    function swish(elem, transition, duration, showing) {
        var t = transition || getTransition(elem);
        var d =   duration || getTransitionDuration(elem, t);

        if(t === null) return; // no transition supplied

        showing ? swishIn(elem, t, d) : swishOut(elem, t, d);
    }

    Element.prototype.swishIn = function(transition, duration) {
        swish(this, transition, duration, true);
    };

    Element.prototype.swishOut = function(transition, duration) {
        swish(this, transition, duration, false);
    };

    Element.prototype.swish = function(transition, duration) {
        var style = getComputedStyle(this);
        var showing = this.__swishShowing === undefined ? style.display === 'none' : !this.__swishShowing;
        swish(this, transition, duration, showing);
    };

})(window);