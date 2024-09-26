document.addEventListener('DOMContentLoaded', function() {
    // Get the login button and form elements
    const loginButton = document.getElementById('login-button');
    
    if (loginButton) {
        // Add event listener for the login button
        loginButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default button action
            validateForm(); // Call function to validate form and send data
        });
    } else {
        console.error("Login button not found.");
    }
});

function validateForm() {
    const userName = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!userName || !password) {
        alert("Please fill in both username and password fields.");
        return;
    }
    fetch('http://localhost:5501/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: userName, password: password })
    })
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert(data.message);
            window.location.href = 'homepage.html';
        } else {
            alert(data.message); 
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}    