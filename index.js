
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

// YouTube In-Place Video Player
document.addEventListener('DOMContentLoaded', function () {
    // Helper function to extract Video ID from ANY YouTube URL format
    function extractYouTubeId(url) {
        if (!url) return null;
        const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/;
        const match = url.match(regExp);
        if (match && match[1]) {
            return match[1];
        }
        if (/^[\w-]{11}$/.test(url.trim())) {
            return url.trim();
        }
        return null;
    }

    const videoBoxes = document.querySelectorAll('.video-player-box');

    videoBoxes.forEach(function (box) {
        const rawUrl = box.getAttribute('data-video-url') || box.getAttribute('data-video-id');
        const videoId = extractYouTubeId(rawUrl);

        // If no image was provided, automatically set YouTube's high quality thumbnail
        const existingImg = box.querySelector('img');
        if (!existingImg && videoId) {
            const autoImg = document.createElement('img');
            autoImg.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            autoImg.alt = 'Video thumbnail';
            box.insertBefore(autoImg, box.firstChild);
        }

        // On Click: Play in the exact same frame without redirecting
        box.addEventListener('click', function (e) {
            e.preventDefault();
            if (!videoId) return;

            // Create iframe with autoplay=1
            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`);
            iframe.setAttribute('title', 'YouTube video player');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
            iframe.setAttribute('allowfullscreen', 'true');

            // Replace image & button inside this frame
            this.innerHTML = '';
            this.appendChild(iframe);
        });
    });
});

/* ============================================================
   COOKIE CONSENT & GOOGLE ANALYTICS INTEGRATION
   ============================================================ */

const GA_MEASUREMENT_ID = 'G-M1T3SRSCWQ';
const COOKIE_CONSENT_KEY = 'discovery_shot_cookie_consent';

// Dynamically load Google Analytics only after user consent
function initGoogleAnalytics() {
    if (document.getElementById('ga-script-tag')) {
        return; // Already initialized
    }

    // Create and inject the GA script tag
    const gaScript = document.createElement('script');
    gaScript.id = 'ga-script-tag';
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(gaScript);

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
}

// Handle User Consent (Accepted / Rejected)
function handleCookieConsent(decision) {
    localStorage.setItem(COOKIE_CONSENT_KEY, decision);

    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.style.display = 'none';
    }

    if (decision === 'accepted') {
        initGoogleAnalytics();
    }
}

// Allow user to re-open cookie preferences from footer or policy pages
function openCookieSettings() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.style.display = 'block';
    }
}

// Expose functions globally for inline HTML onclick attributes
window.handleCookieConsent = handleCookieConsent;
window.openCookieSettings = openCookieSettings;

// Check cookie consent state on page load
document.addEventListener('DOMContentLoaded', function () {
    const currentConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const banner = document.getElementById('cookie-banner');

    if (currentConsent === 'accepted') {
        initGoogleAnalytics();
    } else if (currentConsent === 'rejected') {
        // User explicitly rejected, do not load GA
        if (banner) banner.style.display = 'none';
    } else {
        // No decision made yet: display the banner
        if (banner) {
            banner.style.display = 'block';
        }
    }
});