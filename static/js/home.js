

const subjects = [
    { name: "Mathematics", count: "31" },
    { name: "Physics", count: "31" },
    { name: "Chemistry", count: "31" },
    { name: "History", count: "31" },
    { name: "Computer Science", count: "31" },
    { name: "English", count: "31" },
    { name: "IQ", count: "31" }
];

const subjectsContainer = document.getElementById("subjects");

subjects.forEach(subject => {

    const subjectA = document.createElement("a");
    subjectA.setAttribute("href", "#");
    subjectA.setAttribute("class", "row-link group flex items-center justify-between py-8 sm:py-10 border-b border-[var(--line)] px-1");
    subjectA.innerHTML = `
        
     <span class="row-text font-display font-semibold text-3xl sm:text-5xl tracking-tight text-left flex-1">${subject.name}</span>
     <span class="hidden row-text sm:block text-base text-[var(--mute)] mr-8">${subject.count} quizzes</span>
     <span class="row-arrow mr-5 row-text font-display text-3xl sm:text-4xl">→</span>

    `;
    subjectsContainer.appendChild(subjectA);

})

const how_it_work = document.querySelector('.work');
const work = [
    {id: "01", step_first : "Teacher builds", step_desc : "Set subject, difficulty, question bank, and time limit."},
    {id: "02", step_first : "Publish to class", step_desc : "Students see it live on their dashboard instantly."},
    {id: "03", step_first : "Student takes it", step_desc : "One question at a time, with a real countdown timer."},
    {id: "04", step_first : "Results, instantly", step_desc : "Score and full review the moment it's submitted."}
]

work.forEach(step => {
    const div = document.createElement('div');
    div.setAttribute("class", "border-t border-[var(--line)] pt-8");
    div.innerHTML = `
                    <span class="step-num font-display block mb-4">${step.id}</span>
                    <h3 class="font-display font-bold text-2xl mb-3">${step.step_first}</h3>
                    <p class="text-[var(--mute)] text-base leading-relaxed">${step.step_desc}</p>
                    </div>
                `
    how_it_work.appendChild(div);
})

const nav_bar = document.querySelector(".nav-bar");
const nav = [
    {name: "Subjects", link: "#subjects"},
    {name: "How it works", link: "#how"},
    {name: "Results", link: "#stats"}
]

nav.forEach(item => {
    const a = document.createElement('a');
    a.setAttribute("href", item.link);
    a.setAttribute("class", "hover:text-[var(--ink)] transition-colors");
    a.textContent = item.name;
    nav_bar.appendChild(a);
})


