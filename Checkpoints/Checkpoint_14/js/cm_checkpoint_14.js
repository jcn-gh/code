/* eslint-env es8 */
/* eslint ecmaVersion: 8 */
/* jshint esversion: 8 */
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

/*
 * Download file
 */
const btn = document.getElementById('downloadFile');
const url = "img/lauburu.png";

async function downloadFile(url) {
  try {
    const response = await fetch(url, { mode: 'no-cors' });
    if (!response.ok) {
      throw new Error(`Download failed with status code ${response.status}: ${response.statusText || 'Unknown Error'}`);
    }
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = url.split('/').pop();
    a.href = blobUrl;
    a.style.display = 'none';
    document.body.insertAdjacentElement('beforeend', a);
    a.click();
    a.remove();
    return blobUrl;
  } catch (error) {
    throw new Error(`Error downloading file: ${error.message}`);
  }
}

btn.addEventListener('click', handleButtonClick);

async function handleButtonClick (event) {
  event.preventDefault();
  try {
    await downloadFile(url);
    // Handle successful download
  } catch (error) {
    handleDownloadError(error);
  }
}

function handleDownloadError(error) {
    showErrorModal(error.message);
}

function showErrorModal(errorMessage) {
    // Create a modal element
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';

    // Create a modal content element
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = '#fff';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '5px';
    modalContent.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

    // Add text to the modal content
    const textNode = document.createTextNode(errorMessage);
    modalContent.appendChild(textNode);

    // Append modal content to modal
    modal.appendChild(modalContent);

    // Append modal to the body
    document.body.appendChild(modal);

    // Add click event to close the modal
    modal.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
}