document.addEventListener("DOMContentLoaded", function () {
    const loginSection = document.getElementById("login-section");
    loginSection.style.opacity = 0;

    setTimeout(() => {
        loginSection.style.transition = "opacity 1s ease-in-out";
        loginSection.style.opacity = 1;
    }, 500);

    // Handle form submission
    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        
        // Basic validation
        if (!username || !password) {
            showError("Please fill in all fields.");
            return;
        }
        
        // Get CSRF token
        const csrfToken = getCookie("XSRF-TOKEN");
        
        // Prepare login data
        const loginData = {
            username: username,
            password: password
        };
        
        // Send login request
        fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-XSRF-TOKEN": csrfToken
            },
            body: JSON.stringify(loginData),
            credentials: "same-origin"
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Login successful") {
                // Show success message
                showSuccess("Login successful! Redirecting...");
                
                // Redirect to home or dashboard page
                setTimeout(() => {
                    window.location.href = "/dashboard.html";
                }, 1500);
            } else {
                // Show error message
                showError(data.message || "Login failed. Please check your credentials.");
            }
        })
        .catch(error => {
            console.error("Login error:", error);
            showError("Login failed. Please try again later.");
        });
    });
    
    // Helper functions
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.color = "#e74c3c";
        errorMessage.style.display = "block";
    }
    
    function showSuccess(message) {
        errorMessage.textContent = message;
        errorMessage.style.color = "#2ecc71";
        errorMessage.style.display = "block";
    }
    
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return "";
    }
});