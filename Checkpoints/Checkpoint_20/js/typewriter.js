/* jshint esversion: 8 */
let isSoundEnabled = false;

const stopSound = () => {
    audio.pause();
    audio.currentTime = 0;
};
const audio = new Audio();

const playSound = (sound) => {
    audio.src = `./audio/${sound}.mp3`;
    audio.play(sound).catch(error => console.error('Error playing audio:', error));
};

const keySound = 'keys';
const returnSound = 'returns';

document.addEventListener("DOMContentLoaded", function() {
    const btnSound = document.getElementById("sound-toggle");
    btnSound.addEventListener("click", () => {
        isSoundEnabled = !isSoundEnabled;
        const ariaLabel = isSoundEnabled ? "Disable sound" : "Enable sound";
        btnSound.setAttribute("aria-label", ariaLabel);
        btnSound.classList.toggle("btn-sound-off");
    });

    const createTypewriterEffect = (element) => {
        const text = element.textContent;
        element.textContent = '';

        const cursorSpan = document.createElement('span');
        cursorSpan.classList.add('cursor', 'blink');
        cursorSpan.textContent = '…';
        element.appendChild(cursorSpan);

        let charIndex = 0;
        let resetTimeout;

        const handleSound = (sound) => {
            if (isSoundEnabled) {
                stopSound();
                playSound(sound === 'keys' ? 'keys' : 'returns');
            }
        };

        const handleTypewriterReset = () => {
            handleSound('returns');
            setTimeout(() => typeChar(), 2400);
            element.textContent = '';
            element.appendChild(cursorSpan);
            charIndex = 0;
            clearTimeout(resetTimeout);
            resetTimeout = null;
        };

        const typeChar = () => {
            const typeNextChar = () => {
                if (charIndex < text.length) {
                    handleSound('keys');
                    cursorSpan.before(text.charAt(charIndex));
                    charIndex++;
                    if (charIndex === text.length) {
                        setTimeout(typeNextChar, 5200);
                    } else {
                        setTimeout(typeNextChar, Math.random() * (600 - 400) + 400);
                    }
                } else {
                    handleTypewriterReset();
                }
            };
            typeNextChar();
        };
        typeChar();
    };

    const typewriterElements = document.querySelectorAll('.typewriter');
    typewriterElements.forEach(element => {
        createTypewriterEffect(element);
    });
});