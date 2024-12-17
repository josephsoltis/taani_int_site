document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".image-slider");
    const images = document.querySelectorAll(".slider-image");
    const thumbnails = document.querySelectorAll(".thumbnail");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const closeLightbox = document.getElementById("close-lightbox");

    let currentIndex = 0;
    const totalImages = images.length;

    // Auto Slide Function
    function autoSlide() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateSlider();
    }

    let slideInterval = setInterval(autoSlide, 3000);

    // Update Slider Position
    function updateSlider() {
        const offset = -currentIndex * 100;
        slider.style.transform = `translateX(${offset}%)`;
        updateActiveThumbnail();
    }

    // Manual Navigation
    prevBtn.addEventListener("click", function () {
        clearInterval(slideInterval);
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateSlider();
        slideInterval = setInterval(autoSlide, 3000);
    });

    nextBtn.addEventListener("click", function () {
        clearInterval(slideInterval);
        currentIndex = (currentIndex + 1) % totalImages;
        updateSlider();
        slideInterval = setInterval(autoSlide, 3000);
    });

    // Thumbnail Click Event
    thumbnails.forEach(function (thumbnail) {
        thumbnail.addEventListener("click", function () {
            clearInterval(slideInterval);
            currentIndex = parseInt(thumbnail.dataset.index);
            updateSlider();
            slideInterval = setInterval(autoSlide, 3000);
        });
    });

    // Update Active Thumbnail
    function updateActiveThumbnail() {
        thumbnails.forEach(function (thumbnail, index) {
            thumbnail.classList.toggle("active", index === currentIndex);
        });
    }

    // Lightbox Functionality
    images.forEach(function (image) {
        image.addEventListener("click", function () {
            lightbox.style.display = "flex";
            lightboxImage.src = image.src;
        });
    });

    closeLightbox.addEventListener("click", function () {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

    // Initialize
    updateActiveThumbnail();
});
