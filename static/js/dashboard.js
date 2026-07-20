const sign_user = document.querySelector(".user-name");
const temp = JSON.parse(localStorage.getItem("user_add"));
if (sign_user && temp) {
    sign_user.textContent = temp.name;
}

const screen_2 = document.querySelector('#screenSelectSubject');
const screen_1 = document.querySelector('#screenTestType');
const screen_3 = document.querySelector('#screenSelectQuestions');

const questionsCount = document.querySelector('#questionsValue');
const questionSlider = document.querySelector('#questionsSlider');

if (questionSlider) {
    questionSlider.addEventListener('input', () => {
        questionsCount.textContent = questionSlider.value;
        stage_info.question_count = questionSlider.value;
    });
}

export const stage_info = {
    subject: false,
    aggregate: false,
    sub_subject: [],
    question_count: 10
};

// Make functions global
window.selectTestType = function (type) {
    if (type === "aggregate") {
        screen_1.classList.remove('active');
        screen_2.classList.remove('active');
        screen_3.classList.add('active');
        
        stage_info.aggregate = true;
        stage_info.subject = false;
    }
    else {
        screen_1.classList.remove('active');
        screen_2.classList.add('active');
        screen_3.classList.remove('active');
        
        stage_info.aggregate = false;
        stage_info.subject = true;
    }
}

window.goBack = function () {
    screen_1.classList.add('active');
    screen_2.classList.remove('active');
    screen_3.classList.remove('active');
}

window.selectSubject = function (el, subject = "math") {
    // Toggle selection - if already selected, remove it
    const index = stage_info.sub_subject.indexOf(subject);
    if (index === -1) {
        stage_info.sub_subject.push(subject);
        el.style.borderColor = "#50C4ED";
        el.classList.add('selected');
    } else {
        stage_info.sub_subject.splice(index, 1);
        el.style.borderColor = "rgba(100, 116, 139, 0.3)";
        el.classList.remove('selected');
    }
    
    console.log(stage_info.sub_subject);
    
    // Enable/disable proceed button
    const proceedBtn = document.getElementById('proceedBtn');
    if (proceedBtn) {
        proceedBtn.disabled = stage_info.sub_subject.length === 0;
    }
}

window.proceedToQuestions = function () {
    screen_2.classList.remove('active');
    screen_3.classList.add('active');
}

const test_screen = document.querySelector('#screenTest');

window.startTest = function () {
    screen_3.classList.remove('active');
    test_screen.classList.add('active');
    window.generate_test();
}

// Populate subjects when page loads
function populateSubjects() {
    const subjectGrid = document.getElementById('subjectGrid');
    if (!subjectGrid) return;
    
    subjectGrid.innerHTML = `
        <div class="subject-card" onclick="window.selectSubject(this, 'math')">
            <div class="subject-icon"><i class='fas fa-calculator'></i></div>
            <h3>Mathematics</h3>
            <p>Probability, Statistics, Algebra</p>
        </div>
        <div class="subject-card" onclick="window.selectSubject(this, 'programming')">
            <div class="subject-icon">  <i class="fa-solid fa-terminal"></i></div>
            <h3>Programming</h3>
            <p>Data Structures, Algorithms, Languages</p>
        </div>
        <div class="subject-card" onclick="window.selectSubject(this, 'iq')">
            <div class="subject-icon"><i class="fa-solid fa-brain"></i></div>
            <h3>Engineering IQ</h3>
            <p>Logical Reasoning, Aptitude, Physics</p>
        </div>
    `;
}

// Initialize
populateSubjects();

// Make sure the back button in screenSelectQuestions also goes back properly
document.addEventListener('DOMContentLoaded', () => {
    const backBtnSelectQuestions = document.querySelector('#screenSelectQuestions .back-button');
    if (backBtnSelectQuestions) {
        backBtnSelectQuestions.addEventListener('click', () => {
            screen_2.classList.add('active');
            screen_3.classList.remove('active');
        });
    }
});