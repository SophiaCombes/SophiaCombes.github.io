
// Initialize the current image index to 0 (start with the first image)
let currentIndex = 0;

// Select all the images inside the carousel
const images = document.querySelectorAll('.carousel img');

// Get the total number of images
const totalImages = images.length;

// Function to show the current image
function showImage(index) {
    // Hide all images
    images.forEach(image => image.style.display = 'none');

    // Show the current image
    images[index].style.display = 'block';
}

// Show the first image initially
showImage(currentIndex);

// Add event listeners for left and right arrows to navigate images
document.querySelector('.left-arrow').addEventListener('click', () => {
    // Go to the previous image
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    showImage(currentIndex);
});

document.querySelector('.right-arrow').addEventListener('click', () => {
    // Go to the next image
    currentIndex = (currentIndex + 1) % totalImages;
    showImage(currentIndex);
});
