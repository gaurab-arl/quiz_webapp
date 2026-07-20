

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



