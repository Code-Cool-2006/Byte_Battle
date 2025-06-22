// Fixed registration form handler
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Try different possible field IDs based on your form
            const fullname = document.getElementById('reg-name')?.value?.trim() || 
                           document.getElementById('name')?.value?.trim() || 
                           document.querySelector('input[type="text"]')?.value?.trim();
                           
            const email = document.getElementById('reg-email')?.value?.trim() || 
                        document.getElementById('email')?.value?.trim() || 
                        document.querySelector('input[type="email"]')?.value?.trim();
                        
            const password = document.getElementById('reg-password')?.value || 
                           document.getElementById('password')?.value || 
                           document.querySelector('input[type="password"]')?.value;
                           
            const role = document.getElementById('reg-role')?.value || 
                       document.getElementById('role')?.value || 
                       document.querySelector('select')?.value;

            // Debug: Log the values to console
            console.log('Form values:', { fullname, email, password, role });
            
            const messageDiv = document.getElementById('message') || 
                             document.getElementById('reg-message') || 
                             createMessageDiv();
            const submitBtn = registerForm.querySelector('button[type="submit"]');
            
            // Clear previous messages
            messageDiv.textContent = '';
            messageDiv.style.color = '';
            
            // Basic validation
            if (!fullname || !email || !password || !role) {
                messageDiv.textContent = 'Please fill in all required fields.';
                messageDiv.style.color = 'red';
                console.log('Validation failed - missing fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                messageDiv.textContent = 'Please enter a valid email address.';
                messageDiv.style.color = 'red';
                return;
            }
            
            // Password validation
            if (password.length < 6) {
                messageDiv.textContent = 'Password must be at least 6 characters long.';
                messageDiv.style.color = 'red';
                return;
            }
            
            // Disable submit button
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Registering...';
            }
            
            try {
                const response = await fetch('http://localhost:5000/api/register', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ 
                        fullname, 
                        email, 
                        password, 
                        role: role.toLowerCase() === 'super admin' ? 'superAdmin' : role.toLowerCase()
                    })
                });
                
                const data = await response.json();
                console.log('Server response:', data);
                
                if (response.ok) {
                    messageDiv.textContent = 'Registration successful! You can now log in.';
                    messageDiv.style.color = 'green';
                    
                    // Clear form
                    registerForm.reset();
                    
                    // Redirect to login page after delay
                    setTimeout(() => {
                        window.location.href = 'User_login.html';
                    }, 2000);
                } else {
                    messageDiv.textContent = data.message || 'Registration failed.';
                    messageDiv.style.color = 'red';
                }
                
            } catch (error) {
                console.error('Registration error:', error);
                messageDiv.textContent = 'Cannot connect to server. Please check if the server is running.';
                messageDiv.style.color = 'red';
            } finally {
                // Re-enable submit button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Register';
                }
            }
        });
    }
    
    // Function to create message div if it doesn't exist
    function createMessageDiv() {
        let messageDiv = document.createElement('div');
        messageDiv.id = 'message';
        messageDiv.style.marginTop = '10px';
        messageDiv.style.padding = '10px';
        messageDiv.style.textAlign = 'center';
        messageDiv.style.fontWeight = 'bold';
        
        // Insert after the form
        const form = document.getElementById('registerForm');
        if (form && form.parentNode) {
            form.parentNode.insertBefore(messageDiv, form.nextSibling);
        }
        
        return messageDiv;
    }
});