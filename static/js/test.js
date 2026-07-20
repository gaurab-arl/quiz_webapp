import { questionsDB } from './data.js';
import { stage_info } from './dashboard.js'

let currentTestQuestions = [];
let userAnswers = [];

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

window.generate_test = function () {
    currentTestQuestions = [];
    userAnswers = [];
    
    const limit = parseInt(stage_info.question_count) || 10;
    let pool = [];
    
    console.log("Stage info:", stage_info);
    
    if (stage_info.subject === true) {
        // Get questions from selected subjects
        stage_info.sub_subject.forEach(sub => {
            if (questionsDB[sub]) {
                pool.push(...questionsDB[sub]);
            }
        });
    } else if (stage_info.aggregate === true) {
        // Get questions from all subjects
        for (let sub in questionsDB) {
            pool.push(...questionsDB[sub]);
        }
    }
    
    // Shuffle and slice
    pool = shuffleArray(pool);
    currentTestQuestions = pool.slice(0, limit);
    
    // Update test header
    const testSubjectName = document.getElementById('testSubjectName');
    if (testSubjectName) {
        if (stage_info.subject === true) {
            testSubjectName.textContent = stage_info.sub_subject.join(", ").toUpperCase();
        } else {
            testSubjectName.textContent = "ALL SUBJECTS";
        }
    }
    
    // Update question count display
    const currentQuestionSpan = document.getElementById('currentQuestion');
    if (currentQuestionSpan) {
        currentQuestionSpan.textContent = currentTestQuestions.length;
    }
    
    // Render questions
    renderQuestions();
}

function renderQuestions() {
    const testSection = document.getElementById('test-section');
    if (!testSection) return;
    
    testSection.innerHTML = '';
    
    currentTestQuestions.forEach((q, idx) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-container mb-10 w-full bg-slate-900/40 p-6 rounded-xl border border-slate-700/50';
        questionDiv.setAttribute('data-qindex', idx);
        
        // Question text
        const questionText = document.createElement('div');
        questionText.className = 'question-text text-white text-lg font-semibold mb-5';
        questionText.innerHTML = `${idx + 1}. ${q.question}`;
        questionDiv.appendChild(questionText);
        
        // Options grid
        const optionsGrid = document.createElement('div');
        optionsGrid.className = 'grid grid-cols-2 gap-4';
        
        q.options.forEach((opt, optIdx) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option p-4 rounded-lg border border-slate-600 bg-slate-800 cursor-pointer text-slate-200 transition-colors hover:bg-slate-700';
            optionDiv.innerHTML = opt;
            optionDiv.setAttribute('data-opt-index', optIdx);
            optionDiv.onclick = () => selectOption(optIdx, idx, optionDiv);
            optionsGrid.appendChild(optionDiv);
        });
        
        questionDiv.appendChild(optionsGrid);
        testSection.appendChild(questionDiv);
    });
}

function selectOption(optIndex, qIndex, element) {
    // Save answer
    userAnswers[qIndex] = optIndex;
    
    // Update UI for this question
    const questionContainer = element.closest('.question-container');
    const allOptions = questionContainer.querySelectorAll('.option');
    
    allOptions.forEach(opt => {
        opt.classList.remove('bg-indigo-600', 'border-indigo-400', 'text-white');
        opt.classList.add('bg-slate-800', 'border-slate-600', 'text-slate-200');
    });
    
    element.classList.remove('bg-slate-800', 'border-slate-600', 'text-slate-200');
    element.classList.add('bg-indigo-600', 'border-indigo-400', 'text-white');
}

window.selectOption = selectOption;

window.submitTest = function() {
    let correct = 0;
    let skipped = 0;
    
    currentTestQuestions.forEach((q, idx) => {
        if (userAnswers[idx] === undefined) {
            skipped++;
        } else if (userAnswers[idx] === q.correct) {
            correct++;
        }
    });
    
    const incorrect = currentTestQuestions.length - correct - skipped;
    const percentage = Math.round((correct / currentTestQuestions.length) * 100);
    
    // Update results display
    document.getElementById('scorePercentage').textContent = percentage + '%';
    document.getElementById('correctCount').textContent = correct;
    document.getElementById('incorrectCount').textContent = incorrect;
    document.getElementById('skippedCount').textContent = skipped;
    
    // Show results screen
    document.getElementById('screenTest').classList.remove('active');
    document.getElementById('screenResults').classList.add('active');
    
    // Animate circle
    const circle = document.querySelector('.progress-circle');
    if (circle) {
        const circumference = 565;
        const offset = circumference - (percentage / 100) * circumference;
        setTimeout(() => {
            circle.style.strokeDasharray = `${circumference - offset} ${circumference}`;
        }, 100);
    }
}

window.goToDashboard = function() {
    document.getElementById('screenResults').classList.remove('active');
    document.getElementById('screenTestType').classList.add('active');
    
    // Reset state
    stage_info.subject = false;
    stage_info.aggregate = false;
    stage_info.sub_subject = [];
    stage_info.question_count = 10;
    
    // Reset slider
    const slider = document.getElementById('questionsSlider');
    if (slider) slider.value = 10;
    const questionsValue = document.getElementById('questionsValue');
    if (questionsValue) questionsValue.textContent = '10';
}

window.retakeTest = function() {
    document.getElementById('screenResults').classList.remove('active');
    document.getElementById('screenTest').classList.add('active');
    window.generate_test();
}

window.goBackToTestType = function() {
    document.getElementById('screenSelectQuestions').classList.remove('active');
    document.getElementById('screenTestType').classList.add('active');
}