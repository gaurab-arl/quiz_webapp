document.addEventListener('DOMContentLoaded', () => {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');
    const signupForm = document.getElementById('signupForm');
    
    let currentStep = 1;
    const totalSteps = 4;

    function updateUI() {
        // Update Form Steps
        for (let i = 1; i <= totalSteps; i++) {
            const stepContent = document.getElementById(`content-step-${i}`);
            if (i === currentStep) {
                stepContent.classList.remove('hidden');
            } else {
                stepContent.classList.add('hidden');
            }
        }

        // Update Stepper Indicators
        const progressLine = document.getElementById('progress-line');
        // Calculate width: step 1=0%, step 2=33%, step 3=66%, step 4=100%
        // But visual alignment depends on the layout.
        const progressWidths = ['0%', '0%', '40%', '70%', '100%'];
        progressLine.style.width = progressWidths[currentStep];

        for (let i = 1; i <= totalSteps; i++) {
            const indicator = document.getElementById(`step-indicator-${i}`);
            const text = document.getElementById(`step-text-${i}`);
            
            if (i < currentStep) {
                // Completed steps
                indicator.className = 'w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold z-10 transition-all';
                indicator.innerHTML = '<i class="fa-solid fa-check"></i>';
                text.className = 'text-[11px] text-indigo-400 font-medium transition-all';
            } else if (i === currentStep) {
                // Current step
                indicator.className = 'w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold z-10 shadow-[0_0_10px_rgba(79,70,229,0.5)] transition-all';
                indicator.innerHTML = i;
                text.className = 'text-[11px] text-indigo-400 font-medium transition-all';
            } else {
                // Upcoming steps
                indicator.className = 'w-7 h-7 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-xs font-bold z-10 border border-slate-600 transition-all';
                indicator.innerHTML = i;
                text.className = 'text-[11px] text-slate-400 transition-all';
            }
        }

        // Update Buttons
        if (currentStep === 1) {
            prevBtn.classList.add('hidden');
        } else {
            prevBtn.classList.remove('hidden');
        }

        if (currentStep === totalSteps) {
            nextBtn.classList.add('hidden');
            submitBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            submitBtn.classList.add('hidden');
        }
    }

    function validateStep() {
        const currentContent = document.getElementById(`content-step-${currentStep}`);
        const inputs = currentContent.querySelectorAll('input[required]');
        
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('border-red-500');
            } else {
                input.classList.remove('border-red-500');
            }
        });

        // Specific validation for step 2 (password)
        if (currentStep === 2) {
            const password = document.getElementById('signup-password').value;
            if (password.length > 0 && password.length < 6) {
                alert('Password must be at least 6 characters long.');
                isValid = false;
            }
        }

        return isValid;
    }

    nextBtn.addEventListener('click', () => {
        if (validateStep() && currentStep < totalSteps) {
            currentStep++;
            updateUI();
        } else if (!validateStep()) {
            alert('Please fill out all required fields.');
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateUI();
        }
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validateStep()) return;

        // Gather data
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('signup-password').value.trim();
        const avatar = document.querySelector('input[name="avatar"]:checked').value;

        // Fetch existing users or initialize array
        let users = [];
        const existingData = localStorage.getItem('user_add');
        if (existingData) {
            try {
                users = JSON.parse(existingData);
                if (!Array.isArray(users)) users = [];
            } catch(e) {
                users = [];
            }
        }

        // Check for existing email
        const userExists = users.some(u => u.email === email);
        if (userExists) {
            alert('An account with this email already exists!');
            return;
        }

        // Add new user
        const newUser = {
            fullName,
            email,
            username,
            password,
            avatar
        };

        users.push(newUser);
        
        // Save to localStorage as requested: const user_add = localStorage.getItem("user_add");
        localStorage.setItem('user_add', JSON.stringify(users));

        alert('Account created successfully! Redirecting to login...');
        window.location.href = 'login.html';
    });

    // Initialize UI
    updateUI();
});
