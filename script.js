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

    var marqueeMoving = false;


    $("#childchild").on("click", function() {
        $("#modal").css("display", "flex");
        $("#audio").prop('muted', true);

    });

    $("#close").on("click", function() {
        $("#modal").css("display", "none");

        if ($("#scroll-up").css("animation-play-state") == "paused") {
            $("#scroll-up").css("animation-play-state", "running");
        }
        if ($("#audio").prop('paused') == true) {
            $("#audio").get(0).play();
            $("#audio").prop('muted', false);
            console.log("playing audio");
        } else $("#audio").prop('muted', false);

        if (marqueeMoving == false) {
            $('.marquee').marqueeify({
                speed: 200
            });
            $('.marquee').css("display", "block");
            marqueeMoving = true;
        }
    });

    $(window).on('click', function(event) {
        if (event.target.id == 'modal') {
            console.log("clicked outside of modal");
            $('#modal').css("display", "none");

            if ($("#scroll-up").css("animation-play-state") == "paused") {
                $("#scroll-up").css("animation-play-state", "running");
            }

            if ($("#audio").prop('paused') == true) {
                $("#audio").get(0).play();
                $("#audio").prop('muted', false);
            } else $("#audio").prop('muted', false);

            if (marqueeMoving == false) {
                $('.marquee').marqueeify({
                    speed: 200
                });
                $('.marquee').css("display", "block");
                marqueeMoving = true;

            }
        }
    });

    $("#cap > div:gt(0)").hide();

    setInterval(function() {
        $('#cap > div:first')
            .fadeOut(1000)
            .next()
            .fadeIn(1000)
            .end()
            .appendTo('#cap');
    }, 4000);


});