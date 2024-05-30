/* jshint esversion: 8 */
const icons = {
    moon: {
        src: "../img/moon-solid.svg",
        fill: '#c0c0c0'
    },
    sun: {
        src: "../img/sun-solid.svg",
        fill: '#fce570'
    }
};
const root = document.documentElement;

document.addEventListener("DOMContentLoaded", function() {
    const btnTheme = document.getElementById('dark-light-toggle');
    let isLightThemeEnabled = localStorage.getItem('theme') === 'dark';
    updateTheme();

    function updateTheme() {
        const ariaLabel = isLightThemeEnabled ? "Disable theme" : "Enable theme";
        btnTheme.ariaLabel = ariaLabel;
        btnTheme.classList.toggle('btn-dark-off', !isLightThemeEnabled);
        root.classList.toggle('theme-dark');

        btnTheme.innerHTML = `<object data="${isLightThemeEnabled? icons.moon.src : icons.sun.src}" width="24" height="24"> </object>`;
    }

    btnTheme.addEventListener('click', function() {
        isLightThemeEnabled = !isLightThemeEnabled;
        localStorage.setItem('theme', isLightThemeEnabled ? 'dark' : 'light');
        updateTheme();
    });
});