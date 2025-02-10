const buttons = document.querySelectorAll("[data-carousel-button]");
const slidesContainer = document.querySelector("[data-slides]");
let intervalId; // Stores the interval ID
const intervalTime = 3000; // Change slide every 3 seconds

// Function to move slides
function moveSlide(offset) {
    const activeSlide = slidesContainer.querySelector("[data-active]");
    let newIndex = [...slidesContainer.children].indexOf(activeSlide) + offset;  
    //converts the div class into array e.g [slide1, slide2, slide3, slide4]. indexOf(activeSlide) finds the current active slide. + offset add next and prev buttons. 
    // if slide2 is active, its index is 1 if offset = 1 newIndex is 1 + 1 = 2, moves to slide 3 (slide2 +1(next))
    // if slide2 is active, its index is 1 if offset = -1 newIndex is 1 - 1 = 0, moves to slide 1 (slide2 +1(prev))


    if (newIndex < 0) newIndex = slidesContainer.children.length - 1;  
    // if slide1 is active, 0-1= -1 out of bounds so the condition would be newIndex= 3(slide4 as there are only 4 slides) 
    if (newIndex >= slidesContainer.children.length) newIndex = 0;
    // if slide4 is active, 3+1= 4 out of bounds so the condition would be newIndex= 0(slide1) 

    slidesContainer.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
    //changes which slide is "data-active" status and removes from previous. Ensures one slide is active at a time
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
