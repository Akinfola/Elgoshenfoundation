(function () {
    "use strict";

    var imagePaths = {
        carouselOne: "img/carousel-1.jpg",
        carouselTwo: "img/carousel-2.jpg",
        about: "img/about.jpg",
        donationOne: "img/donation-1.jpg",
        donationTwo: "img/donation-2.jpg",
        donationThree: "img/donation-3.jpg",
        teamOne: "img/team-1.jpg",
        teamTwo: "img/team-2.jpg",
        teamThree: "img/team-3.jpg",
        testimonialOne: "img/testimonial-1.jpg",
        testimonialTwo: "img/testimonial-2.jpg",
        testimonialThree: "img/testimonial-3.jpg",
        galleryOne: "img/gallery-1.jpg",
        galleryTwo: "img/gallery-2.jpg",
        galleryThree: "img/gallery-3.jpg",
        galleryFour: "img/gallery-4.jpg",
        galleryFive: "img/gallery-5.jpg",
        gallerySix: "img/gallery-6.jpg"
    };

    function replaceImages(images) {
        Object.keys(imagePaths).forEach(function (key) {
            var image = images[key];
            if (!image) return;

            document.querySelectorAll('img[src="' + imagePaths[key] + '"]').forEach(function (element) {
                element.src = image;
            });
        });
    }

    fetch('data/site-images.json', { cache: 'no-store' })
        .then(function (response) { return response.ok ? response.json() : null; })
        .then(function (content) {
            if (content && content.images) replaceImages(content.images);
        })
        .catch(function () {
            // The page continues to use its built-in images when the CMS data is unavailable.
        });
})();