// Select all carousel containers
document.querySelectorAll('.carousel-container').forEach((carouselContainer) => {
    const images = carouselContainer.querySelectorAll('.carousel img');
    const leftArrow = carouselContainer.querySelector('.left-arrow');
    const rightArrow = carouselContainer.querySelector('.right-arrow');
    const dots = carouselContainer.querySelectorAll('.scrollbar .dot'); // Dots specific to this carousel
    let currentIndex = 0;

    // Function to show the next image
    function showNextImage() {
        images[currentIndex].style.display = 'none'; // Hide current image
        dots[currentIndex].classList.remove('active'); // Remove active class from current dot

        currentIndex = (currentIndex + 1) % images.length; // Increment index and loop back to 0 if at the end

        images[currentIndex].style.display = 'block'; // Show next image
        dots[currentIndex].classList.add('active'); // Add active class to the new dot
    }

    // Function to show the previous image
    function showPreviousImage() {
        images[currentIndex].style.display = 'none'; // Hide current image
        dots[currentIndex].classList.remove('active'); // Remove active class from current dot

        currentIndex = (currentIndex - 1 + images.length) % images.length; // Decrement index and loop to the end if at the beginning

        images[currentIndex].style.display = 'block'; // Show previous image
        dots[currentIndex].classList.add('active'); // Add active class to the new dot
    }

    // Event listeners for arrows
    leftArrow.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default action (scrolling to top)
        showPreviousImage();
    });

    rightArrow.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default action (scrolling to top)
        showNextImage();
    });

    // Initially display the first image and activate its dot
    images[currentIndex].style.display = 'block';
    dots[currentIndex].classList.add('active');
});

// Get the fullscreen overlay and image elements
const fullscreenOverlay = document.getElementById('fullscreenOverlay');
const fullscreenImage = document.getElementById('fullscreenImage');

// Add click event listeners to all gallery images
const galleryImages = document.querySelectorAll('.gallery-image');
galleryImages.forEach(image => {
  image.addEventListener('click', () => {
    fullscreenImage.src = image.src; // Set the clicked image as the fullscreen image
    fullscreenOverlay.style.display = 'flex'; // Show the overlay
  });
});

// Add click event listener to the overlay to close it
fullscreenOverlay.addEventListener('click', () => {
  fullscreenOverlay.style.display = 'none'; // Hide the overlay
});







