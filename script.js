const buttons = document.querySelectorAll("[data-carousel-button]");
const slidesContainer = document.querySelector("[data-slides]");
let intervalId; // Stores the interval ID
const intervalTime = 3000; // Change slide every 3 seconds

// Function to move slides
function moveSlide(offset) {
    const activeSlide = slidesContainer.querySelector("[data-active]");
    let newIndex = [...slidesContainer.children].indexOf(activeSlide) + offset;

    if (newIndex < 0) newIndex = slidesContainer.children.length - 1;
    if (newIndex >= slidesContainer.children.length) newIndex = 0;

    slidesContainer.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
}

// Attach event listeners to buttons
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        moveSlide(offset);
        resetAutoSlide(); // Restart the interval when manually clicked
    });
});

// Function to auto-slide
function startAutoSlide() {
    intervalId = setInterval(() => moveSlide(1), intervalTime);
}

// Reset the interval when the user interacts
function resetAutoSlide() {
    clearInterval(intervalId);
    startAutoSlide();
}

// Start automatic sliding
startAutoSlide();
