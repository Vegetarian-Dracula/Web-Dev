document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-button');
    
    if (loginButton) {
        loginButton.addEventListener('click', function(event) {
            event.preventDefault();
            validateForm();
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