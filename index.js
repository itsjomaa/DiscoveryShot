
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