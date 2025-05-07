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