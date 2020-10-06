(function($, window, undefined) {
    $.fn.marqueeify = function(options) {
        var settings = $.extend({
            horizontal: true,
            vertical: true,
            speed: 100, // In pixels per second
            container: $(this).parent(),
            bumpEdge: function() {}
        }, options);

        return this.each(function() {
            var containerWidth, containerHeight, elWidth, elHeight, move, getSizes,
                $el = $(this);

            getSizes = function() {
                containerWidth = settings.container.outerWidth();
                containerHeight = settings.container.outerHeight();
                elWidth = $el.outerWidth();
                elHeight = $el.outerHeight();
            };

            move = {
                right: function() {
                    $el.animate({ left: (containerWidth - elWidth) }, {
                        duration: ((containerWidth / settings.speed) * 1000),
                        queue: false,
                        easing: "linear",
                        complete: function() {
                            settings.bumpEdge();
                            move.left();
                        }
                    });
                },
                left: function() {
                    $el.animate({ left: 0 }, {
                        duration: ((containerWidth / settings.speed) * 1000),
                        queue: false,
                        easing: "linear",
                        complete: function() {
                            settings.bumpEdge();
                            move.right();
                        }
                    });
                },
                down: function() {
                    $el.animate({ top: (containerHeight - elHeight) }, {
                        duration: ((containerHeight / settings.speed) * 1000),
                        queue: false,
                        easing: "linear",
                        complete: function() {
                            settings.bumpEdge();
                            move.up();
                        }
                    });
                },
                up: function() {
                    $el.animate({ top: 0 }, {
                        duration: ((containerHeight / settings.speed) * 1000),
                        queue: false,
                        easing: "linear",
                        complete: function() {
                            settings.bumpEdge();
                            move.down();
                        }
                    });
                }
            };

            getSizes();

            if (settings.horizontal) {
                move.right();
            }
            if (settings.vertical) {
                move.down();
            }

            // Make that shit responsive!
            $(window).resize(function() {
                getSizes();
            });
        });
    };
})(jQuery, window);


$(document).ready(function() {

    $("#childchild").on("click", function() {
        $("#modal").css("display", "flex");

    });

    $("#close").on("click", function() {
        $("#modal").css("display", "none");
        $("#audio").play();
    });

    $(window).on('click', function(event) {
        if (event.target.id == 'modal') {
            console.log("clicked");
            $('#modal').css("display", "none");
        }
    });

    $('.marquee').marqueeify({
        speed: 200
    });

    $("#cap > div:gt(0)").hide();

    setInterval(function() {
        $('#cap > div:first')
            .fadeOut(2000)
            .next()
            .fadeIn(2000)
            .end()
            .appendTo('#cap');
    }, 3000);


});