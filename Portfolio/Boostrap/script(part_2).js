
document.addEventListener('DOMContentLoaded', function () {
    // Toggle Color Mode
    const toggleTheme = document.getElementById('toggleTheme');
    toggleTheme.addEventListener('click', () => {
        document.body.classList.toggle('bg-dark');
        document.body.classList.toggle('text-light');
    });

   // Sign In 
const signInForm = document.getElementById('signInForm');

signInForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent page reload

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log(`Remember Me: ${rememberMe}`);

    
});
});
