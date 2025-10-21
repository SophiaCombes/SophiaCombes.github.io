
document.querySelectorAll('.carousel-container').forEach((carouselContainer) => {
    const images = carouselContainer.querySelectorAll('.carousel img');
    const leftArrow = carouselContainer.querySelector('.left-arrow');
    const rightArrow = carouselContainer.querySelector('.right-arrow');
    const dots = carouselContainer.querySelectorAll('.scrollbar .dot'); 
    let currentIndex = 0;

    
    function showNextImage() {
        images[currentIndex].style.display = 'none'; 
        dots[currentIndex].classList.remove('active'); 

        currentIndex = (currentIndex + 1) % images.length; 

        images[currentIndex].style.display = 'block'; 
        dots[currentIndex].classList.add('active'); 
    }

    
    function showPreviousImage() {
        images[currentIndex].style.display = 'none'; 
        dots[currentIndex].classList.remove('active'); 

        currentIndex = (currentIndex - 1 + images.length) % images.length; 

        images[currentIndex].style.display = 'block'; 
        dots[currentIndex].classList.add('active'); 
    }

    
    leftArrow.addEventListener('click', (event) => {
        event.preventDefault(); 
        showPreviousImage();
    });

    rightArrow.addEventListener('click', (event) => {
        event.preventDefault(); 
        showNextImage();
    });

    
    images[currentIndex].style.display = 'block';
    dots[currentIndex].classList.add('active');
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







