document.getElementById('sign').addEventListener('submit', function(event){
    event.preventDefault(); // Prevent default form submission
    validateForm(); // Validate form inputs
});

function validateForm(){
    clearErrors();
    const userName = document.getElementById('name').value;
    const number = document.getElementById('number').value;
    const email = document.getElementById('mail').value;
    const password = document.getElementById('password').value;
    let isValid = true;

    // Validation logic
    if (userName.length < 4){
        showError('userError', 'Username must contain at least 4 characters');
        isValid = false;
    }
    if (number.length !== 10){
        showError('numError', 'Phone number must contain exactly 10 digits');
        isValid = false;
    }
    if (!validateEmail(email)){
        showError('emailError', 'Invalid email address');
        isValid = false;
    }
    if (password.length < 6){
        showError('passwordError', 'Password must be at least 6 characters long');
        isValid = false;
    }

    // If valid, send data to the Node.js backend
    if (isValid){
        sendData(userName, number, email, password);
    }
}

function sendData(userName, number, email, password) {
    const formData = {
        username: userName,
        phone: number,
        email: email,
        password: password
    };

    // Send data to Node.js backend using fetch()
    fetch('http://localhost:5501/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message); // Show success message
            // Redirect to login page after successful registration
            window.location.href = 'login.html'; // Redirect to login page
        } else {
            alert(data.message); // Show error message if registration fails
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function clearErrors(){
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => {
        element.textContent = '';
    });
}

function showError(elementId, message){
    document.getElementById(elementId).textContent = message;
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}
