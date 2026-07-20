// sign.js — signup form behavior for KCC Quiz
// Handles: role-based field visibility, client-side validation,
// password show/hide, and submitting to the Django backend.

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    if (!form) return;

    const roleInputs = form.querySelectorAll('input[name="role"]');
    const nameLabel = document.getElementById('name-label');
    const nameInput = document.getElementById('full_name');
    const submitBtn = document.getElementById('submit-btn');
    const submitLabel = document.getElementById('submit-label');
    const alertBox = document.getElementById('form-alert');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');

    const NAME_LABEL_BY_ROLE = {
        student: 'Full name',
        institution: 'Institution name',
    };

    const NAME_PLACEHOLDER_BY_ROLE = {
        student: 'Gaurab Aryal',
        institution: 'e.g. Kathmandu Capital College',
    };

    function currentRole() {
        const checked = form.querySelector('input[name="role"]:checked');
        return checked ? checked.value : 'student';
    }

    function updateFieldsForRole(role) {
        // Show/hide role-specific field groups
        form.querySelectorAll('[data-role-field]').forEach((el) => {
            const forRole = el.getAttribute('data-role-field');
            const show = forRole === role;
            el.classList.toggle('hidden', !show);
            el.querySelectorAll('input, select').forEach((input) => {
                input.disabled = !show;
            });
        });

        // Swap the "full name" label/placeholder for institution accounts
        nameLabel.textContent = NAME_LABEL_BY_ROLE[role] || 'Full name';
        nameInput.placeholder = NAME_PLACEHOLDER_BY_ROLE[role] || '';
    }

    roleInputs.forEach((input) => {
        input.addEventListener('change', () => updateFieldsForRole(input.value));
    });
    updateFieldsForRole(currentRole());

    // Show / hide password
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            const isHidden = passwordInput.type === 'password';
            passwordInput.type = isHidden ? 'text' : 'password';
            togglePasswordBtn.textContent = isHidden ? 'Hide' : 'Show';
        });
    }

    function setFieldError(input, message) {
        const wrapper = input.closest('div');
        const errorEl = wrapper ? wrapper.querySelector('.field-error') : null;
        if (!errorEl) return;
        if (message) {
            errorEl.textContent = message;
            errorEl.classList.remove('hidden');
            input.classList.add('border-red-500');
        } else {
            errorEl.textContent = '';
            errorEl.classList.add('hidden');
            input.classList.remove('border-red-500');
        }
    }

    function showAlert(message, type = 'error') {
        if (!alertBox) return;
        alertBox.textContent = message;
        alertBox.classList.remove('hidden', 'border-red-300', 'bg-red-50', 'text-red-700',
            'border-green-300', 'bg-green-50', 'text-green-700');
        if (type === 'error') {
            alertBox.classList.add('border-red-300', 'bg-red-50', 'text-red-700');
        } else {
            alertBox.classList.add('border-green-300', 'bg-green-50', 'text-green-700');
        }
    }

    function hideAlert() {
        if (!alertBox) return;
        alertBox.classList.add('hidden');
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function isValidPhone(value) {
        if (!value) return true; // phone is optional
        return /^(98|97)\d{8}$/.test(value.replace(/\s|-/g, ''));
    }

    function validateForm() {
        let valid = true;
        const role = currentRole();

        const nameVal = nameInput.value.trim();
        if (!nameVal) {
            setFieldError(nameInput, role === 'institution' ? 'Institution name is required' : 'Full name is required');
            valid = false;
        } else {
            setFieldError(nameInput, '');
        }

        const emailInput = document.getElementById('email');
        const emailVal = emailInput.value.trim();
        if (!emailVal) {
            setFieldError(emailInput, 'Email is required');
            valid = false;
        } else if (!isValidEmail(emailVal)) {
            setFieldError(emailInput, 'Enter a valid email address');
            valid = false;
        } else {
            setFieldError(emailInput, '');
        }

        const phoneInput = document.getElementById('phone');
        const phoneVal = phoneInput.value.trim();
        if (!isValidPhone(phoneVal)) {
            setFieldError(phoneInput, 'Enter a valid Nepali phone number');
            valid = false;
        } else {
            setFieldError(phoneInput, '');
        }

        const pwInput = document.getElementById('password');
        const pwVal = pwInput.value;
        if (pwVal.length < 8) {
            setFieldError(pwInput, 'Password must be at least 8 characters');
            valid = false;
        } else {
            setFieldError(pwInput, '');
        }

        const confirmInput = document.getElementById('confirm_password');
        if (confirmInput.value !== pwVal || !confirmInput.value) {
            setFieldError(confirmInput, 'Passwords do not match');
            valid = false;
        } else {
            setFieldError(confirmInput, '');
        }

        const termsCheckbox = document.getElementById('agree_terms');
        const termsError = document.getElementById('terms-error');
        if (!termsCheckbox.checked) {
            termsError.textContent = 'You must agree to the Terms and Privacy Policy';
            termsError.classList.remove('hidden');
            valid = false;
        } else {
            termsError.classList.add('hidden');
        }

        return valid;
    }

    function getCsrfToken() {
        const input = form.querySelector('input[name="csrfmiddlewaretoken"]');
        return input ? input.value : '';
    }

    async function submitForm() {
        const role = currentRole();
        const formData = new FormData(form);
        const payload = { role };
        formData.forEach((value, key) => {
            if (key === 'csrfmiddlewaretoken' || key === 'role') return;
            payload[key] = value;
        });

        submitBtn.disabled = true;
        submitLabel.textContent = 'Creating account…';

        try {
            const response = await fetch('/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCsrfToken(),
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                showAlert(data.message || 'Something went wrong. Please try again.', 'error');
                submitBtn.disabled = false;
                submitLabel.textContent = 'Create account →';
                return;
            }

            showAlert('Account created! Redirecting…', 'success');
            window.location.href = data.redirect_url || '/login/';
        } catch (err) {
            showAlert('Could not reach the server. Check your connection and try again.', 'error');
            submitBtn.disabled = false;
            submitLabel.textContent = 'Create account →';
        }
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        hideAlert();
        if (!validateForm()) {
            showAlert('Please fix the highlighted fields.', 'error');
            return;
        }
        submitForm();
    });
});