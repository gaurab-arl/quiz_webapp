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

    // Handle login form submission
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('user_email').value.trim();
            const password = document.getElementById('user_password').value.trim();

            if (!email || !password) {
                alert('Please fill in both email and password.');
                return;
            }

            // Simulate login — replace with real auth
            console.log('Login attempt:', { email, password });
            alert('Login successful (demo). Welcome back!');
            // window.location.href = 'dashboard.html';
        });
    }
})();