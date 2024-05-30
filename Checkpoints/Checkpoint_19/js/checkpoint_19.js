/* jshint esversion: 8 */
document.addEventListener("DOMContentLoaded", function() {
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