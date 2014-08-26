# SwishJS
Version 1.1.2

## 
Easily apply CSS transitions to elements with JavaScript and jQuery. Never worry about animating the display
property again.

### Basic Example

Swish works much like jQuery's `show` and `hide` methods, which transition the element
while toggling its `display` property. Swish does this too, except it transitions using CSS instead
of JavaScript.

The first argument is the class name of the CSS transition. Swish comes with four transitions, included in
the optional `css-swish-transitions.css`:

* `swish-fade`
* `swish-zoom`
* `swish-slide`
* `swish-3d-rotate`

The second argument is the duration of the transition in milliseconds. If unsupplied, Swish will use the duration
set in your stylesheet. Then just call `swish` to toggle the transition.

#### Native JS

```javascript
var elem = document.querySelector('#selector');
elem.swish('swish-fade', 1000);
```

#### jQuery

```javascript
$('#selector').swish('swish-fade', 1000);
```

### Data Attributes

The easiest way to use Swish is to add data attributes to your markup. Set the transition class using
`data‑swish‑transition` and the duration with `data‑swish‑duration`. The duration attribute
is optional and will default to the rules in your stylesheet.

#### HTML

```html
<div
  id="selector"
  data-swish-transition="swish-fade"
  data-swish-duration="500"
></div>
```

#### Native JS

```javascript
var elem = document.querySelector('#selector');
elem.swish();
```

#### jQuery

```javascript
$('#selector').swish();
```

### More Methods

You can also transition in a specific direction using `swishIn` and `swishOut`. These
methods take the same arguments as `swish`.

#### Native JS

```javascript
elem.swishIn(transition, duration);
elem.swishOut(transition, duration);
```

#### jQuery

```javascript
$('#selector').swishIn(transition, duration);
$('#selector').swishOut(transition, duration);
```

### Default State

If the default state of your element is hidden, you will need to add `display: none` to that element.
This lets Swish know that the element isn't visible.

### Custom Transitions

Swish wouldn't be very useful if you couldn't supply your own transitions, and it lets you do just that!
You just need a main transition class and an in and out state. The in state is applied when the element is
visible, and the out state when hidden.

#### CSS

```css
.example-transition {
  transition: all 1s ease-in-out;
}

.example-transition.out {
  background: blue;
}

.example-transition.in {
  background: red;
}
```

#### Native JS

```javascript
var elem = document.querySelector('#selector');
elem.swish('example-transition');
```

#### jQuery

```javascript
$('#selector').swish('example-transition');
```

### Return Value

Swish returns the duration of the animation in ms when called. This can be useful if you need to queue animations. Because jQuery methods are all monads, the jQuery plugin does not have this behaviour by default and requires additional parameters to be supplied.

#### Native JS

```javascript
var duration = elem.swish();
// duration = 1000, the default as specified in CSS

var duration = elem.swish('example-transition');
// duration = 1000, the default as specified in CSS

var duration = elem.swish('example-transition', 5000);
// duration = 5000, the value provided to the method
```

#### jQuery

```javascript
var duration = $('#selector').swish(true);
// duration = 1000, the default as specified in CSS

var duration = $('#selector').swish('example-transition', true);
// duration = 1000, the default as specified in CSS

var duration = $('#selector').swish('example-transition', 5000, true);
// duration = 5000, the value provided to the method
```

### Configuration

By default Swish uses the classes `in` and `out` to show and hide elements. If this
doesn't work with your project, you can configure Swish to use other classes.

#### Native JS

```javascript
Swish({
hiddenClass: 'out',
visibleClass: 'in'
});
```

#### jQuery

```javascript
$.Swish({
hiddenClass: 'out',
visibleClass: 'in'
});
```

### Bower
Swish is also available as a Bower package. Just type `bower install swish-js`.

### About

I made this library out of the frustrations of dealing with tedious transition bugs involving the display
property. Developers shouldn't have to do silly things like nesting `setTimeout` calls just to get
animations to work properly.

If you'd like to learn more about the problems with animating the display property, Louis Lazaris has written
a [very informative article](http://www.impressivewebs.com/animate-display-block-none/)
on the topic.

If you use Swish, I'd love to hear about it! Let me know if you make something cool and I'll give you a shout
out on this page!

You can view the source to this project on [GitHub](https://github.com/jordanranson/css-swish).

If you like this project, why not check out my other work [on my site](//www.jordanranson.com) and
[follow me on twitter](https://twitter.com/jordanranson).

SwishJS is licensed under the Apache 2 license.

&copy; 2014 Jordan Ranson
