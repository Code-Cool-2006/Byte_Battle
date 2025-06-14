document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('reg-email').value;
    const name = document.getElementById('reg-name').value;
    const password = document.getElementById('reg-password').value;
    const role = document.getElementById('reg-role').value;

    const res = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password, role })
    });
    const data = await res.json();
    document.getElementById('message').textContent = data.message;
    if (res.ok) window.location.href = 'User_login.html';
});