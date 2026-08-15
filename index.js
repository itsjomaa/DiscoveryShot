//Arrows
const track = document.getElementById('track');

if (track) {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const cards = Array.from(track.children);

    // 1. Clonamos la primera y última tarjeta
    const firstClone = cards[0].cloneNode(true);
    const lastClone = cards[cards.length - 1].cloneNode(true);

    // 2. Las añadimos al inicio y al final
    track.appendChild(firstClone);
    track.prepend(lastClone);

    let index = 1; // Empezamos en 1 porque el 0 ahora es el clon
    const cardWidth = cards[0].offsetWidth;

    // Colocamos el track en la posición inicial correcta
    track.style.transform = `translateX(-${index * cardWidth}px)`;

    nextBtn.addEventListener('click', () => {
        if (index >= track.children.length - 1) return; // Evita clicks extra
        index++;
        track.style.transition = "transform 0.5s ease-in-out";
        track.style.transform = `translateX(-${index * cardWidth}px)`;
    });

    prevBtn.addEventListener('click', () => {
        if (index <= 0) return;
        index--;
        track.style.transition = "transform 0.5s ease-in-out";
        track.style.transform = `translateX(-${index * cardWidth}px)`;
    });

    // 3. El truco: Cuando la animación termina, comprobamos si estamos en un clon
    track.addEventListener('transitionend', () => {
        // Si llegamos al clon del final, saltamos al inicio real (sin que se vea)
        if (track.children[index] === firstClone) {
            track.style.transition = "none";
            index = 1;
            track.style.transform = `translateX(-${index * cardWidth}px)`;
        }
        // Si llegamos al clon del principio, saltamos al final real
        if (track.children[index] === lastClone) {
            track.style.transition = "none";
            index = track.children.length - 2;
            track.style.transform = `translateX(-${index * cardWidth}px)`;
        }
    });
}

document.querySelector('.menu-btn').addEventListener('click', function () {
    this.classList.toggle('active');
    document.querySelector('.sidebar').classList.toggle('active');
});

// Close sidebar when clicking outside
document.addEventListener('click', function (e) {
    if (!e.target.closest('.sidebar') && !e.target.closest('.menu-btn')) {
        document.querySelector('.menu-btn').classList.remove('active');
        document.querySelector('.sidebar').classList.remove('active');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('player');

    if (video) {
        const playPauseBtn = document.getElementById('playPauseBtn');
        const playPauseIcon = playPauseBtn.querySelector('i');

        // Play/Pause button functionality
        playPauseBtn.addEventListener('click', function () {
            if (video.paused) {
                video.play();
                playPauseIcon.classList.remove('fa-play');
                playPauseIcon.classList.add('fa-pause');
            } else {
                video.pause();
                playPauseIcon.classList.remove('fa-pause');
                playPauseIcon.classList.add('fa-play');
            }
        });

        // Update button icon when video ends
        video.addEventListener('ended', function () {
            playPauseIcon.classList.remove('fa-pause');
            playPauseIcon.classList.add('fa-play');
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const sliderWrapper = document.querySelector('.slider-wrapper');

    if (sliderWrapper) {
        const slides = document.querySelectorAll('.slide');
        const prevButton = document.querySelector('.prev-arrow');
        const nextButton = document.querySelector('.next-arrow');
        let currentSlide = 0;
        const totalSlides = slides.length;

        function updateSlider() {
            sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        });

        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        });
    }
});

// Scroll Animation
document.addEventListener('DOMContentLoaded', function () {
    // Initial check for elements in viewport on page load
    checkReveal();

    // Check for elements in viewport on scroll
    window.addEventListener('scroll', checkReveal);

    function checkReveal() {
        const reveals = document.querySelectorAll('.reveal');

        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const revealTop = reveals[i].getBoundingClientRect().top;
            const revealPoint = 150; // Adjust this value to change when the animation triggers

            if (revealTop < windowHeight - revealPoint) {
                reveals[i].classList.add('active');
            }
        }
    }
});