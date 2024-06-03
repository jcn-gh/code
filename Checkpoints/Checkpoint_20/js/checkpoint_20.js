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

    /*
     * tooltip
     */
    var tooltips = document.querySelectorAll(".tooltiptext");
    tooltips.forEach(function(tooltip) {
        tooltip.style.display = "none";

        tooltip.parentElement.addEventListener("mouseover", function() {
            tooltip.style.display = "inline-block";
        });

        tooltip.parentElement.addEventListener("mouseout", function() {
            tooltip.style.display = "none";
        });
    });

    /*
     * adjust screen width
     */
    function updateMaxWidth() {
        const element = document.getElementById('body');
        if (window.innerWidth <= 640) {
            element.style.maxWidth = '100%';
        } else if (window.innerWidth >= 1920) {
            element.style.maxWidth = '50%';
        } else {
            const percentage = 100 - (((window.innerWidth - 640) * 50) / 1280);
            element.style.maxWidth = percentage + '%';
        }
    }

    // Call the function on page load and window resize
    window.onload = updateMaxWidth;
    window.onresize = updateMaxWidth;
});