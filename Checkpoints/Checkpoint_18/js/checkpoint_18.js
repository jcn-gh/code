/* jshint esversion: 8 */
document.addEventListener("DOMContentLoaded", function() {
    /*
     * typewriter effect
     */
    const createTypewriterEffect = (element, typingSpeed = 400, resetDelay = 5200) => {
        const text = element.textContent;
        element.textContent = '';

        const cursorSpan = document.createElement('span');
        cursorSpan.classList.add('cursor', 'blink');
        cursorSpan.textContent = '…';
        element.appendChild(cursorSpan);

        let charIndex = 0;
        let resetTimeout;
        let intervalId;
        const typeChar = () => {
            intervalId = setInterval(() => {
                if (charIndex < text.length) {
                    cursorSpan.before(text.charAt(charIndex));
                    charIndex++;
                } else {
                    if (!resetTimeout) {
                        resetTimeout = setTimeout(resetTypewriter, resetDelay);
                    }
                    clearInterval(intervalId);
                }
            }, typingSpeed);
        };

        const resetTypewriter = () => {
            element.textContent = '';
            element.appendChild(cursorSpan);
            charIndex = 0;
            clearTimeout(resetTimeout);
            resetTimeout = null;
            typeChar();
        };

        const toggleBlinkClass = () => {
            if (element.contains(cursorSpan)) {
                cursorSpan.classList.toggle('blink');
            }
        };

        setInterval(toggleBlinkClass, 400);

        typeChar();
    };

    const typewriterElements = document.querySelectorAll('.typewriter');
    typewriterElements.forEach(element => {
        createTypewriterEffect(element);
        element.addEventListener('transitionend', () => {
            element.removeEventListener('transitionend', this);
        }, {
            once: true
        });
    });

    /*
     * type delete effect
     */
    const updateElementText = (element, text) => {
        const fragments = text.split(',');
        const fragmentContainer = document.createDocumentFragment();
        fragments.forEach(fragment => {
            const span = document.createElement('span');
            span.textContent = fragment;
            fragmentContainer.appendChild(span);
        });
        element.textContent = '';
        element.appendChild(fragmentContainer);
    };
    const typedeleteElements = document.querySelectorAll('.typedelete');
    const cachedTypedeleteElements = [...typedeleteElements];
    const strings = cachedTypedeleteElements.flatMap(element => element.textContent.split(','));
    let isDeleting = false;
    let currentString = 0;
    let currentChar = 0;
    const typingSpeed = 240;
    const deletingSpeed = 80;
    const endPauseDuration = 3000;
    const startPauseDuration = 100;
    const typeEffect = (element) => {
        const scheduleTimeout = (callback, duration) => {
            setTimeout(callback, duration);
        };
        const stringsLength = strings.length;
        let text = strings[currentString];
        const textLength = text.length;
        const textLengthPlus2 = textLength + 2;
        const isStartOfText = currentChar === 0;
        const isEndOfText = currentChar === textLengthPlus2;
        if (!isDeleting && currentChar < textLengthPlus2) {
            currentChar++;
        } else if (isDeleting) {
            currentChar--;
        }
        updateElementText(element, text.substring(0, currentChar - 1) + ' ');
        if (isStartOfText && isDeleting) {
            isDeleting = false;
            currentString = (currentString + 1) % stringsLength;
            scheduleTimeout(() => typeEffect(element), startPauseDuration);
        } else if (isEndOfText && !isDeleting) {
            isDeleting = true;
            scheduleTimeout(() => typeEffect(element), endPauseDuration);
        } else {
            scheduleTimeout(() => typeEffect(element), isDeleting ? deletingSpeed : typingSpeed);
        }
    };

    cachedTypedeleteElements.map(element => typeEffect(element));

    /*
     * img zoom effect
     */
    let fullscreenImage;
    const handleClick = (target) => {
        target.classList.toggle('fullscreen-image');
        if (fullscreenImage !== target) {
            if (fullscreenImage) fullscreenImage.classList.remove('fullscreen-image');
            fullscreenImage = target;
        }
    };

    const images = document.querySelectorAll('img');
    for (const image of images) {
        image.addEventListener('click', (event) => handleClick(event.currentTarget));
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