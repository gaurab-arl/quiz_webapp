// sign.js — signup form behavior for KCC Quiz

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    if (!form) return;

    const roleInputs = form.querySelectorAll('input[name="role"]');
    const nameLabel = document.getElementById('name-label');
    const nameInput = document.getElementById('full_name');
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

    // Standard HTML form submission will take care of sending the POST request
    // to the Django backend.
});