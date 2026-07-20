/* ============================================================
   admin-dashboard.js — Navbar interactivity
   ============================================================ */

// Exposed globally so inline onclick in HTML can call navigateTo()
window.navigateTo = function (sectionId) {
    document.querySelectorAll('.section-content').forEach(s => s.classList.add('hidden'));
    const target = document.getElementById(sectionId);
    if (target) target.classList.remove('hidden');

    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.section === sectionId);
    });
    history.pushState(null, null, `#${sectionId}`);
};

document.addEventListener('DOMContentLoaded', () => {

    // ── Elements ────────────────────────────────────────────
    const sidebar        = document.getElementById('sidebar');
    const backdrop       = document.getElementById('sidebar-backdrop');
    const openBtn        = document.getElementById('sidebar-open');
    const navItems       = document.querySelectorAll('.nav-item');
    const sections       = document.querySelectorAll('.section-content');

    // ── Section switching ────────────────────────────────────
    function showSection(sectionId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.add('hidden');
        });

        // Show the target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }

        // Update URL hash without causing scroll
        history.pushState(null, null, `#${sectionId}`);
    }

    // ── Active nav state ─────────────────────────────────────
    function setActiveNav(target) {
        navItems.forEach(item => item.classList.remove('active'));
        target.classList.add('active');
    }

    // ── Navigation handler ────────────────────────────────────
    function navigateTo(sectionId, navItem) {
        // Show the section
        showSection(sectionId);
        
        // Update active nav state
        if (navItem) {
            setActiveNav(navItem);
        } else {
            // If no nav item provided, find matching one
            const matchingItem = [...navItems].find(
                item => item.dataset.section === sectionId
            );
            if (matchingItem) setActiveNav(matchingItem);
        }

        // On mobile, close the sidebar after navigation
        if (window.innerWidth < 1024) {
            closeSidebar();
        }
    }

    // ── Nav item click handlers ─────────────────────────────
    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const sectionId = this.dataset.section;
            if (sectionId) {
                navigateTo(sectionId, this);
            }
        });
    });

    // ── Restore state from URL hash on load ──────────────────
    function restoreFromHash() {
        const currentHash = window.location.hash.slice(1); // Remove '#'
        if (currentHash) {
            const matchingItem = [...navItems].find(
                item => item.dataset.section === currentHash
            );
            if (matchingItem) {
                navigateTo(currentHash, matchingItem);
                return;
            }
        }
        // Default to dashboard if no hash or invalid hash
        const defaultItem = document.querySelector('.nav-item[data-section="dashboard"]');
        if (defaultItem) {
            navigateTo('dashboard', defaultItem);
        }
    }

    // Restore on initial load
    restoreFromHash();

    // Handle browser back/forward buttons
    window.addEventListener('hashchange', () => {
        const sectionId = window.location.hash.slice(1);
        if (sectionId) {
            const matchingItem = [...navItems].find(
                item => item.dataset.section === sectionId
            );
            if (matchingItem) {
                // Only switch section, don't push state again
                showSection(sectionId);
                setActiveNav(matchingItem);
            }
        }
    });

    // ── Mobile sidebar open / close ──────────────────────────
    function openSidebar() {
        backdrop.classList.remove('hidden');
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                backdrop.classList.remove('opacity-0');
                sidebar.classList.remove('-translate-x-full');
            });
        });
        document.body.style.overflow = 'hidden';
        openBtn?.setAttribute('aria-expanded', 'true');
    }

    function closeSidebar() {
        backdrop.classList.add('opacity-0');
        sidebar.classList.add('-translate-x-full');

        backdrop.addEventListener('transitionend', () => {
            backdrop.classList.add('hidden');
        }, { once: true });

        document.body.style.overflow = '';
        openBtn?.setAttribute('aria-expanded', 'false');
    }

    // ── Event listeners ──────────────────────────────────────
    openBtn?.addEventListener('click', openSidebar);
    backdrop?.addEventListener('click', closeSidebar);

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !sidebar.classList.contains('-translate-x-full')) {
            closeSidebar();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            backdrop.classList.add('hidden', 'opacity-0');
            sidebar.classList.remove('-translate-x-full');
            document.body.style.overflow = '';
        }
    });

});