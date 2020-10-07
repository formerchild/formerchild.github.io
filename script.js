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
    var scrolledAway = false;
    var hidden, visibilityChange;

    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.mozHidden !== "undefined") {
        hidden = "mozHidden";
        visibilityChange = "mozvisibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }

    document.addEventListener(visibilityChange, handleVisibilityChange, false);

    function handleVisibilityChange() {
        if (userMuted == false && $("#modal").css("display") == 'none') {
            $("#audio").prop('muted', document[hidden]);
        }

        if (scrolledAway == !document[hidden] && $("#modal").css("display") == 'none') {
            $("#sigh").get(0).load();
            $("#sigh").get(0).play();
            console.log("why did you leave?")
        }

    }



    var marqueeMoving = false;

    var userMuted = false;
    var slideShowStarted = false;
    console.log("slide show started: " + slideShowStarted);

    function slideShow(speed) {
        $('#cap > div:first')
            .fadeOut(speed)
            .next()
            .fadeIn(speed)
            .end()
            .appendTo('#cap');
    }


    $("#volume").on("click", function() {
        if ($("#audio").prop('muted') == false) {
            $("#audio").prop('muted', true);
            $("#volume").text("unmute");
            userMuted = true;
            $("#volume").toggleClass("mute unmute");

            // console.log("userMuted: " + userMuted);
        } else if ($("#audio").prop('muted') == true) {
            $("#audio").prop('muted', false);
            $("#volume").text("mute");
            userMuted = false;
            $("#volume").toggleClass("mute unmute");

            // console.log("userMuted: " + userMuted);
        }
    });



    $("#childchild").on("click", function() {
        $("#modal").css("display", "flex");
        $("#audio").prop('muted', true);

    });

    $("#close").on("click", function() {
        $("#modal").css("display", "none");

        if ($("#scroll-up").css("animation-play-state") == "paused") {
            $("#scroll-up").css("animation-play-state", "running");
        }
        $("sigh").prop('muted', true);

        if ($("#audio").prop('paused') == true) {
            $("#audio").get(0).play();
            $("#audio").prop('muted', false);
            // console.log("audio paused: " + $("#audio").prop('paused'));
            // console.log("audio muted: " + $("#audio").prop('muted'))
        } else if ($("#audio").prop('paused') == false && userMuted == false) {
            $("#audio").prop('muted', false);
            // console.log("audio Muted: " + $("#audio").prop('muted'))
        }

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
            } else if ($("#audio").prop('paused') == false && userMuted == false) {
                $("#audio").prop('muted', false);
            };

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

    // if (slideShowStarted == true){
    //     console.log('slideshow started '+ slideShowStarted);


    setInterval(function() {
        $('#cap > div:first')
            .fadeOut(500)
            .next()
            .fadeIn(500)
            .end()
            .appendTo('#cap');
    }, 5000);




});