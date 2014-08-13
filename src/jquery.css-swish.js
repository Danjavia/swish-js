(function($, window, document) {

    $.fn.swish = function(transition, duration) {
        this.each(function() {
            $(this)[0].swish(transition, duration);
        });
    };

    $.fn.swishIn = function(transition, duration) {
        this.each(function() {
            $(this)[0].swishIn(transition, duration);
        });
    };

    $.fn.swishOut = function(transition, duration) {
        this.each(function() {
            $(this)[0].swishOut(transition, duration);
        });
    };

    $.fn.swishConfig = function(config) {
        Swish(config);
    };

})(jQuery, window, document);