(function($) {

    $.fn.swish = function(transition, duration, returnDuration) {
        var d = 0;

        if(transition === true) {
            returnDuration = true;
            transition = undefined;
        }
        if(duration === true) {
            returnDuration = true;
            duration = undefined;
        }

        this.each(function() {
            d = $(this)[0].swish(transition, duration);
        });

        return (returnDuration) ? d : this;
    };

    $.fn.swishIn = function(transition, duration, returnDuration) {
        var d = 0;

        if(transition === true) {
            returnDuration = true;
            transition = undefined;
        }
        if(duration === true) {
            returnDuration = true;
            duration = undefined;
        }

        this.each(function() {
            d = $(this)[0].swishIn(transition, duration);
        });

        return (returnDuration) ? d : this;
    };

    $.fn.swishOut = function(transition, duration, returnDuration) {
        var d = 0;

        if(transition === true) {
            returnDuration = true;
            transition = undefined;
        }
        if(duration === true) {
            returnDuration = true;
            duration = undefined;
        }

        this.each(function() {
            d = $(this)[0].swishOut(transition, duration);
        });

        return (returnDuration) ? d : this;
    };

    $.Swish = function(config) {
        Swish(config);
    };

})(jQuery);