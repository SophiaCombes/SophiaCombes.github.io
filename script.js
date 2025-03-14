const images = document.querySelectorAll('.carousel img');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const dots = document.querySelectorAll('.scrollbar .dot');

// Set initial image index
let currentIndex = 0;

// Function to show the current image
function showImage(index) {
    // Hide all images
    images.forEach(img => img.style.display = 'none');
    // Remove active class from all dots
    dots.forEach(dot => dot.classList.remove('active'));

    // Show the correct image
    images[index].style.display = 'block';
    // Highlight the correct dot
    dots[index].classList.add('active');
}

// Show the first image initially
showImage(currentIndex);

// Next Image
rightArrow.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent scrolling to the top
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
});

// Previous Image
leftArrow.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent scrolling to the top
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
});
