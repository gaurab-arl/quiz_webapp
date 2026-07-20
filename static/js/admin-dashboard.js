document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', function(event) {
            // Prevent default anchor behavior for demonstration, remove if actual navigation is desired
            event.preventDefault();

            // Remove 'active' class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));

            // Add 'active' class to the clicked nav item
            this.classList.add('active');

            // In a real application, you would load content here based on the clicked item
            // For example: loadContent(this.getAttribute('href'));
        });
    });
});
