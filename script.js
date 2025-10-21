
document.querySelectorAll('.carousel-container').forEach((carouselContainer) => {
  const images = carouselContainer.querySelectorAll('.carousel img');
  const leftArrow = carouselContainer.querySelector('.left-arrow');
  const rightArrow = carouselContainer.querySelector('.right-arrow');
  const dots = carouselContainer.querySelectorAll('.scrollbar .dot');
  let currentIndex = 0;

  // if there are no images, nothing to do
  if (!images || images.length === 0) return;

  // helper: hide all images and deactivate dots safely
  function hideAll() {
    images.forEach((img) => img.style.display = 'none');
    if (dots && dots.length) {
      dots.forEach(d => d.classList.remove('active'));
    }
  }

  function showIndex(idx) {
    if (!images || images.length === 0) return;
    hideAll();
    currentIndex = ((idx % images.length) + images.length) % images.length;
    images[currentIndex].style.display = 'block';
    if (dots && dots[currentIndex]) dots[currentIndex].classList.add('active');
  }

  function showNextImage() {
    showIndex(currentIndex + 1);
  }

  function showPreviousImage() {
    showIndex(currentIndex - 1);
  }

  if (leftArrow) {
    leftArrow.addEventListener('click', (event) => {
      event.preventDefault();
      showPreviousImage();
    });
  }

  if (rightArrow) {
    rightArrow.addEventListener('click', (event) => {
      event.preventDefault();
      showNextImage();
    });
  }

  // allow clicking dots to jump (if dots present)
  if (dots && dots.length) {
    dots.forEach((dot, i) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        showIndex(i);
      });
    });
  }

  // show the first image
  showIndex(0);
});


const fullscreenOverlay = document.getElementById('fullscreenOverlay');
const fullscreenImage = document.getElementById('fullscreenImage');


const galleryImages = document.querySelectorAll('.gallery-image');
galleryImages.forEach(image => {
  image.addEventListener('click', () => {
    fullscreenImage.src = image.src; 
    fullscreenOverlay.style.display = 'flex'; 
  });
});


fullscreenOverlay.addEventListener('click', () => {
  fullscreenOverlay.style.display = 'none'; 
});







