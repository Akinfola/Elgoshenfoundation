(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Keep the navigation visible as soon as the visitor scrolls.
    var updateStickyNav = function () {
        var isScrolled = $(window).scrollTop() > 0;
        $('.nav-bar').toggleClass('fixed-top', isScrolled).css('padding', isScrolled ? '0' : '0px 90px');
    };
    updateStickyNav();
    $(window).on('scroll resize', updateStickyNav);
    
    
    // Mobile header colour
    var updateMobileHeader = function () {
        if ($(window).width() < 992) {
            $('.nav-bar').toggleClass('mobile-scrolled', $(window).scrollTop() > 10);
        } else {
            $('.nav-bar').removeClass('mobile-scrolled');
        }
    };
    updateMobileHeader();
    $(window).on('scroll resize', updateMobileHeader);

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Donation progress
    $('.donation-item .donation-progress').waypoint(function () {
        $('.donation-item .progress .progress-bar').each(function () {
            $(this).css("height", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Header carousel
    $(".header-carousel").owlCarousel({
        animateOut: 'rotateOutUpRight',
        animateIn: 'rotateInDownLeft',
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        dots: false,
        loop: true,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    
})(jQuery);

