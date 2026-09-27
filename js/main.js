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


    var initYoutubeHoverPreviews = function () {
        var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

        document.querySelectorAll('[data-youtube-hover]').forEach(function (container) {
            var videoId = container.getAttribute('data-youtube-hover');
            var poster = container.querySelector('img');
            var playIcon = container.querySelector('[data-video-play-icon]');
            var playerHost = null;
            var iframe = null;
            var iframeReady = false;
            var isPreviewActive = false;

            var showPoster = function () {
                poster.hidden = false;
                if (playIcon) playIcon.hidden = false;
            };

            var sendPlayerCommand = function (command) {
                if (!iframeReady || !iframe || !iframe.contentWindow) return;
                iframe.contentWindow.postMessage(JSON.stringify({event: 'command', func: command, args: ''}), 'https://www.youtube.com');
            };

            var startPreview = function (isTouch) {
                if (!videoId || !poster) return;
                isPreviewActive = true;
                poster.hidden = true;
                if (playIcon) playIcon.hidden = true;

                if (iframe) {
                    playerHost.style.display = 'block';
                    sendPlayerCommand('playVideo');
                    return;
                }

                playerHost = document.createElement('div');
                playerHost.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:' + (isTouch ? 'auto' : 'none') + ';';
                iframe = document.createElement('iframe');
                iframe.src = 'https://www.youtube.com/embed/' + encodeURIComponent(videoId) + '?autoplay=1&mute=1&playsinline=1&controls=' + (isTouch ? '1' : '0') + '&enablejsapi=1&origin=' + encodeURIComponent(window.location.origin) + '&rel=0';
                iframe.title = container.getAttribute('aria-label') || 'Video preview';
                iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
                iframe.allowFullscreen = true;
                iframe.referrerPolicy = 'strict-origin-when-cross-origin';
                iframe.style.cssText = 'width:100%;height:100%;border:0;pointer-events:' + (isTouch ? 'auto' : 'none') + ';';
                iframe.addEventListener('load', function () {
                    iframeReady = true;
                    if (isPreviewActive) {
                        sendPlayerCommand('mute');
                        sendPlayerCommand('playVideo');
                    } else {
                        sendPlayerCommand('pauseVideo');
                        playerHost.style.display = 'none';
                    }
                });
                playerHost.appendChild(iframe);
                container.appendChild(playerHost);
            };

            var stopPreview = function () {
                isPreviewActive = false;
                sendPlayerCommand('pauseVideo');
                if (playerHost) playerHost.style.display = 'none';
                showPoster();
            };

            if (canHover) {
                container.addEventListener('mouseenter', function () { startPreview(false); });
                container.addEventListener('mouseleave', function () {
                    if (!container.matches(':focus-within')) stopPreview();
                });
                container.addEventListener('focusin', function () { startPreview(false); });
                container.addEventListener('focusout', function (event) {
                    if (!container.contains(event.relatedTarget) && !container.matches(':hover')) stopPreview();
                });
            } else {
                container.addEventListener('click', function (event) {
                    event.preventDefault();
                    if (isPreviewActive) stopPreview();
                    else startPreview(true);
                });
            }
        });
    };
    initYoutubeHoverPreviews();

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

    
    // Dark / Light Theme Toggle
    var updateToggleUI = function (isDark) {
        $('.theme-toggle-trigger i').attr('class', isDark ? 'fa fa-sun text-warning' : 'fa fa-moon');
    };

    var initThemeToggle = function () {
        var savedTheme = localStorage.getItem('elgoshen-theme');
        var isDark = savedTheme === 'dark';
        
        if (isDark) {
            $('body').addClass('dark-mode');
        } else {
            $('body').removeClass('dark-mode');
        }
        updateToggleUI(isDark);

        $(document).on('click', '#theme-toggle-btn, .theme-toggle-trigger', function (e) {
            e.preventDefault();
            var currentlyDark = $('body').toggleClass('dark-mode').hasClass('dark-mode');
            localStorage.setItem('elgoshen-theme', currentlyDark ? 'dark' : 'light');
            updateToggleUI(currentlyDark);
        });
    };
    initThemeToggle();

})(jQuery);

