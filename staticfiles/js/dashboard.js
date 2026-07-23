/* ============================================================
   dashboard.js — student dashboard interactivity
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Test-type toggle: hide subject picker when "Mixed" is selected ──
    const typeInputs    = document.querySelectorAll('input[name="test_type"]');
    const subjectPicker = document.getElementById('subject-picker');

    typeInputs.forEach(input => {
        input.addEventListener('change', () => {
            if (input.value === 'mixed') {
                subjectPicker?.classList.add('hidden');
            } else {
                subjectPicker?.classList.remove('hidden');
            }
        });
    });

    // ── Chip / segmented-control active styles ──────────────────────────
    // Segmented control (single/mixed)
    document.querySelectorAll('.seg-input').forEach(radio => {
        radio.addEventListener('change', function () {
            document.querySelectorAll('.seg-label').forEach(l => {
                l.style.background = '';
                l.style.color = '';
            });
            if (this.checked) {
                const label = document.querySelector(`label[for="${this.id}"]`);
                if (label) {
                    label.style.background = 'var(--ink)';
                    label.style.color      = 'var(--paper)';
                }
            }
        });
        // Init state
        if (radio.checked) radio.dispatchEvent(new Event('change'));
    });

    // Chip inputs (subject + count)
    document.querySelectorAll('.chip-input').forEach(radio => {
        radio.addEventListener('change', function () {
            // Deselect siblings in the same name group
            document.querySelectorAll(`input[name="${this.name}"]`).forEach(r => {
                const lbl = document.querySelector(`label[for="${r.id}"]`);
                if (lbl) {
                    lbl.style.borderColor  = '';
                    lbl.style.background   = '';
                    lbl.style.color        = '';
                    lbl.querySelector('.chip-check')?.style.setProperty('opacity', '0');
                }
            });
            if (this.checked) {
                const label = document.querySelector(`label[for="${this.id}"]`);
                if (label) {
                    label.style.borderColor = 'var(--ink)';
                    label.style.background  = 'var(--ink)';
                    label.style.color       = 'var(--paper)';
                    label.querySelector('.chip-check')?.style.setProperty('opacity', '1');
                }
            }
        });
        // Init state
        if (radio.checked) radio.dispatchEvent(new Event('change'));
    });

    // ── Smooth Scroll & Sidebar Active State ──
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    // Update styling to make it look active
                    navItems.forEach(n => {
                        n.classList.remove('active', 'bg-white/10');
                    });
                    item.classList.add('active', 'bg-white/10');
                    
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

});