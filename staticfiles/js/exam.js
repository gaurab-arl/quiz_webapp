const TOTAL = window.EXAM_TOTAL;
const TIME_SECS = window.EXAM_TIME_SECS;

let current = 0;
let answered = new Set();   // indices of answered questions

// ── Elements ─────────────────────────────────────────────
const cards = document.querySelectorAll('.q-card');
const dots = document.querySelectorAll('.dot');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const counter = document.getElementById('q-counter');
const progBar = document.getElementById('progress-bar');
const modal = document.getElementById('submit-modal');
const modalMsg = document.getElementById('modal-msg');
const form = document.getElementById('exam-form');

// ── Navigation ────────────────────────────────────────────
function goTo(idx) {
    cards[current].classList.remove('active');
    dots[current].classList.remove('bg-[var(--ink)]', '!w-3', '!h-3');

    current = idx;

    cards[current].classList.add('active');
    updateDot(current);
    updateNav();
    updateProgress();
    if (counter) counter.textContent = `Question ${current + 1} of ${TOTAL}`;
}

function updateDot(idx) {
    dots.forEach((d, i) => {
        d.className = 'dot w-2 h-2 rounded-full transition-colors ';
        if (i === idx) d.className += 'bg-[var(--ink)] scale-125';
        else if (answered.has(i)) d.className += 'bg-[var(--accent)]';
        else d.className += 'bg-[var(--line)]';
    });
}

function updateNav() {
    btnPrev.disabled = current === 0;
    const isLast = current === TOTAL - 1;
    btnNext.textContent = isLast ? 'Submit ✓' : 'Next →';
    btnNext.classList.toggle('bg-green-600', isLast);
    btnNext.classList.toggle('hover:bg-green-700', isLast);
    btnNext.classList.toggle('bg-[var(--ink)]', !isLast);
    btnNext.classList.toggle('hover:bg-[var(--accent)]', !isLast);
}

function updateProgress() {
    const pct = ((current + 1) / TOTAL) * 100;
    progBar.style.width = pct + '%';
}

btnPrev.addEventListener('click', () => { if (current > 0) goTo(current - 1); });

btnNext.addEventListener('click', () => {
    if (current < TOTAL - 1) {
        goTo(current + 1);
    } else {
        openSubmitModal();
    }
});

dots.forEach((d, i) => {
    d.addEventListener('click', () => goTo(i));
});

// Track answered state
document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
        // find which q-card this belongs to
        const card = radio.closest('.q-card');
        if (card) {
            const idx = parseInt(card.dataset.index);
            answered.add(idx);
            updateDot(current);
        }
    });
});

// ── Submit modal ──────────────────────────────────────────
function openSubmitModal() {
    const unanswered = TOTAL - answered.size;
    modalMsg.textContent = unanswered > 0
        ? `You have ${unanswered} unanswered question${unanswered > 1 ? 's' : ''}. You can still go back.`
        : 'All questions answered. Ready to submit!';
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

document.getElementById('modal-cancel').addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
});

document.getElementById('modal-confirm').addEventListener('click', () => {
    form.submit();
});

// ── Timer ─────────────────────────────────────────────────
const timerEl = document.getElementById('timer-display');
let remaining = TIME_SECS;

function formatTime(s) {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
}

const timerInterval = setInterval(() => {
    remaining--;
    timerEl.textContent = formatTime(remaining);

    if (remaining <= 60) timerEl.parentElement.classList.add('timer-warn');
    if (remaining <= 0) {
        clearInterval(timerInterval);
        timerEl.textContent = '00:00';
        form.submit();  // auto-submit on time-up
    }
}, 1000);

// Initialize
timerEl.textContent = formatTime(remaining);
updateNav();
updateProgress();