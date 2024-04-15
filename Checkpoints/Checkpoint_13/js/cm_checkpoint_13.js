/* eslint-env es6 */
/* eslint ecmaVersion: 6 */
/* jshint esversion: 6 */
document.addEventListener("DOMContentLoaded", function() {
    /*
     * typewriter effect
     */
    const appendCursorSpan = (element, cursorSpan) => {
        element.appendChild(cursorSpan);
    };

    const createTypewriterEffect = (element, typingSpeed = 400, resetDelay = 5200) => {
        const text = element.textContent;
        element.textContent = '';

        const cursorSpan = document.createElement('span');
        cursorSpan.classList.add('cursor', 'blink');
        cursorSpan.textContent = '…';
        appendCursorSpan(element, cursorSpan);

        let charIndex = 0;
        let resetTimeout;

        const typeChar = () => {
            if (charIndex < text.length) {
                cursorSpan.before(text.charAt(charIndex));
                charIndex++;
                setTimeout(typeChar, typingSpeed);
            } else {
                if (!resetTimeout) {
                    resetTimeout = setTimeout(resetTypewriter, resetDelay);
                }
            }
        };

        const resetTypewriter = () => {
            element.textContent = '';
            appendCursorSpan(element, cursorSpan);
            charIndex = 0;
            clearTimeout(resetTimeout);
            resetTimeout = null;
            typeChar();
        };

        setInterval(() => {
            cursorSpan.classList.toggle('blink');
        }, 400);

        typeChar();
    };
    document.querySelectorAll('.typewriter').forEach(element => createTypewriterEffect(element));

    /*
     * img zoom effect
     */
    const images = document.querySelectorAll('img');
    images.forEach(imaje => {
        imaje.addEventListener('click', function() {
            if (imaje.classList.contains('fullscreen-image')) {
                removeFullscreen();
            } else {
                removeFullscreen();
                imaje.classList.add('fullscreen-image');
            }
        });
    });

    function removeFullscreen() {
        images.forEach(img => {
            img.classList.remove('fullscreen-image');
        });
    }

    /*
     * h3 button effect
     */
    const headings = document.querySelectorAll("h3");
    headings.forEach((heading) => {
        const content = heading.nextElementSibling;
        content.style.display = "none";
        heading.addEventListener("click", function() {
            headings.forEach((otherHeading) => {
                if (otherHeading !== heading) {
                    otherHeading.nextElementSibling.style.display = "none";
                    otherHeading.classList.remove("buttonAsk");
                }
            });
            content.style.display = content.style.display === "none" || content.style.display === "" ? "block" : "none";
            heading.classList.toggle("buttonAsk", content.style.display === "block");
            heading.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            heading.focus();
        });
    });
});