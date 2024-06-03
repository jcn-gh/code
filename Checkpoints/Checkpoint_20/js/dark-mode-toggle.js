/* jshint esversion: 8 */
const icons = {
    moon: {
        text: "&#127770",
        src: "../img/moon-solid.svg",
        fill: '#c0c0c0'
    },
    sun: {
        text: "&#127774;",
        src: "../img/sun-solid.svg",
        fill: '#fce570'
    }
};
const root = document.documentElement;
document.addEventListener("DOMContentLoaded", function() {
    const btnTheme = document.getElementById('dark-light-toggle');
    let isLightThemeEnabled = localStorage.getItem('theme') === 'dark' ? true : false;
    updateTheme();

    function updateTheme() {
        const ariaLabel = isLightThemeEnabled ? "Disable theme" : "Enable theme";
        btnTheme.setAttribute('aria-label', ariaLabel);
        btnTheme.classList.toggle('btn-dark-off', !isLightThemeEnabled);
        root.classList.toggle('theme-dark');
        btnTheme.innerHTML = isLightThemeEnabled ? icons.moon.text : icons.sun.text;
        // btnTheme.innerHTML = `<img src="${isLightThemeEnabled ? icons.moon.src : icons.sun.src}" fill="${isLightThemeEnabled ? icons.moon.fill : icons.sun.fill}" width="24" height="24" alt="${isLightThemeEnabled ? 'Moon' : 'Sun'} icon">`;
        // btnTheme.innerHTML = `<object data="${isLightThemeEnabled ? icons.moon.src : icons.sun.src}" fill="${isLightThemeEnabled ? icons.moon.fill : icons.sun.fill}" width="24" height="24"> </object>`;
    }

    btnTheme.addEventListener('click', function() {
        isLightThemeEnabled = !isLightThemeEnabled;
        localStorage.setItem('theme', isLightThemeEnabled ? 'dark' : 'light');
        updateTheme();
    });
});