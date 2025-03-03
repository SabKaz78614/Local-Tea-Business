document.addEventListener("DOMContentLoaded", function () {
    // Get form elements
    const form = document.querySelector('form');
    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const messageTextarea = form.querySelector('textarea');
    
    // Form submit event listener
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form from submitting normally

        
        if (nameInput.value.trim() === "" || emailInput.value.trim() === "" || messageTextarea.value.trim() === "") {
            alert("Please fill out all fields.");
        } else {
            
            alert("Thank you for contacting us! Your message has been sent.");
            
            
            form.reset();
        }
    });
});
