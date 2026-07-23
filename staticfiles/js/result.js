// Animate score ring
document.addEventListener('DOMContentLoaded', () => {
    const pct = window.RESULT_PERCENTAGE || 0;
    const circumference = 364.4;
    const offset = circumference - (pct / 100) * circumference;
    const ring = document.getElementById('ring-fill-el');
    // Delay so the CSS transition fires
    if (ring) {
        setTimeout(() => { ring.style.strokeDashoffset = offset; }, 100);
    }
});
