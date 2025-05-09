

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
});
