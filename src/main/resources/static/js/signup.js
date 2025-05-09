document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-section");
    signupForm.style.opacity = 0;

    setTimeout(() => {
        signupForm.style.transition = "opacity 1s ease-in-out";
        signupForm.style.opacity = 1;
    }, 500);

    // Form validation
    const form = document.querySelector("form");
    form.addEventListener("submit", function (e) {
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("pass").value.trim();

        // Simple email regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!username || !email || !password) {
            alert("Please fill in all fields.");
            e.preventDefault();
            return;
        }

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            e.preventDefault();
            return;
        }

        // Add more validation as needed
    });
});

