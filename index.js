document.getElementById('promo-video').addEventListener('ended', function () {
    document.querySelector('.video-overlay').style.opacity = '1';
});

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