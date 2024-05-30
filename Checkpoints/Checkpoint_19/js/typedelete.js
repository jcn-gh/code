/* jshint esversion: 8 */
document.addEventListener("DOMContentLoaded", function() {
    /*
     * type delete effect
     */
    const updateElementText = (element, text) => {
        element.textContent = text;
    };
    const typedeleteElements = document.querySelectorAll('.typedelete');
    const cachedTypedeleteElements = [...typedeleteElements];
    const strings = [];
    cachedTypedeleteElements.forEach(element => {
        if (element.textContent.includes(',')) {
            strings.push(...element.textContent.split(','));
        } else {
            strings.push(element.textContent);
        }
    });
    let isDeleting = false;
    let currentString = 0;
    let currentChar = 0;
    const DURATION = {
        min: 400,
        max: 440
    };
    const endPauseDuration = 3000;
    const startPauseDuration = 100;
    const stringsLength = strings.length;

    const updateCurrentCharAndString = (increment) => {
        currentChar = increment ? currentChar + 1 : currentChar - 1;
        if (!increment && currentChar === 0) {
            currentString = (currentString + 1) % stringsLength;
        }
    };

    const typeEffect = (element) => {
        const scheduleTimeout = (callback, duration) => {
            setTimeout(callback, duration);
        };
        let text = strings[currentString];
        const textLength = text.length;
        const textLengthPlus2 = textLength + 2;
        const isStartOfText = currentChar === 0;
        const isEndOfText = currentChar === textLengthPlus2;
        if (!isDeleting && currentChar < textLengthPlus2) {
            updateCurrentCharAndString(true);
        } else if (isDeleting) {
            updateCurrentCharAndString();
        }
        updateElementText(element, text.substring(0, currentChar - 1) + ' ');
        if (isStartOfText && isDeleting) {
            isDeleting = false;
            updateCurrentCharAndString();
            scheduleTimeout(() => typeEffect(element), startPauseDuration);
        } else if (isEndOfText && !isDeleting) {
            isDeleting = true;
            scheduleTimeout(() => typeEffect(element), endPauseDuration);
        } else {
            const randomDuration = Math.random() * (DURATION.max - DURATION.min) + DURATION.min;
            scheduleTimeout(() => typeEffect(element), randomDuration);
        }
    };

    typedeleteElements.forEach(element => typeEffect(element));

});