    // Loads the FontAwesome library if it is not already loaded.
    const loadFontAwesome = () => {
        if (typeof FontAwesome === 'undefined') {
            const script = document.createElement('script');
            script.src = 'js/fontawesome.js';
            document.head.appendChild(script);
        }
    };

    loadFontAwesome();

    // Adds an event listener to the window's "DOMContentLoaded" event.
    // When the event is triggered, it selects the menu and navbar elements from the DOM.
    // It then adds a click event listener to the menu element.
    // When the menu is clicked, it prevents the default behavior of the click event and toggles the "active" class on the navbar element.
    // Additionally, if the FontAwesome library is not loaded, it dynamically adds a script tag to the head of the document to load the library.
    window.addEventListener('DOMContentLoaded', () => {
        const menu = document.querySelector('.menu');
        const navbar = document.querySelector('.navbar');

        // Handles the click event on the menu element.
        // Prevents the default behavior of the click event and toggles the "active" class on the navbar element.
        const handleClick = (e) => {
            e.preventDefault();
            navbar.classList.toggle('active');
        };

        menu.addEventListener('click', handleClick);
    });