



const nav = [
    {name: "Dashboard", link: "#"},
    {name: "Profile", link: "#"}
]
const nav_bar = document.querySelector('.nav-bar');

nav.forEach(item => {
    const a = document.createElement('a');
    a.setAttribute("href", item.link);
    a.setAttribute("class", "nav-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium");
    a.innerHTML = `
     <a href="${item.link}" class="nav-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2">
                            <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                        </svg>
                        ${item.name}
                    </a>
    `;
    nav_bar.appendChild(a);
})
                   