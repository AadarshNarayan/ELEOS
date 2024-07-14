document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form[action="/login"]');
    const registerForm = document.querySelector('form[action="/register"]');
  
    if (loginForm) {
      loginForm.addEventListener('submit', (event) => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
  
        if (!username || !password) {
          alert('Please fill in all fields');
          event.preventDefault();
        }
      });
    }
  
    if (registerForm) {
      registerForm.addEventListener('submit', (event) => {
        const username = document.getElementById('reg_username').value;
        const password = document.getElementById('reg_password').value;
        const emailid = document.getElementById('reg_emaild').value;
  
        if (!username || !password) {
          alert('Please fill in all fields');
          event.preventDefault();
        }
      });
    }
  });
