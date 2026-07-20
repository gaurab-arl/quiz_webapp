// js/login.js
(function() {
    // Toggle password visibility
    const toggleBtn = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('user_password');

    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
        });
    }

    // Let the form submit naturally to the Django backend.
    // No preventDefault() or mock alert.
})();