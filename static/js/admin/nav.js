const navBar = document.querySelector('.nab-bar');

const navItems = [
    { name: "Dashboard", section: "dashboard", active: true },
    { name: "Quizzes", section: "quizzes" },
    { name: "Question bank", section: "question-bank" },
    
];

navItems.forEach(item => {
    const a = document.createElement("a");

    a.href = `#${item.section}`;
    a.dataset.section = item.section;

    a.className = `
    nav-item flex items-center gap-3 px-4 py-3 
    rounded-xl text-sm font-medium
    ${item.active ? "active" : ""}
  `;

    a.innerHTML = `${item.name}`;

    navBar.appendChild(a);
});