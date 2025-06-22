// This file contains the JavaScript code for handling login form submission
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email')?.value?.trim();
            const password = document.getElementById('password')?.value;
            const role = document.getElementById('role')?.value;
            const messageDiv = document.getElementById('message');
            const submitBtn = loginForm.querySelector('button[type="submit"]');

            // Clear previous messages
            if (messageDiv) {
                messageDiv.textContent = '';
                messageDiv.style.color = '';
            }

            // Basic validation
            if (!email || !password || !role) {
                const errorMsg = 'Please fill in all required fields.';
                if (messageDiv) {
                    messageDiv.textContent = errorMsg;
                    messageDiv.style.color = 'red';
                } else {
                    alert(errorMsg);
                }
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                const errorMsg = 'Please enter a valid email address.';
                if (messageDiv) {
                    messageDiv.textContent = errorMsg;
                    messageDiv.style.color = 'red';
                } else {
                    alert(errorMsg);
                }
                return;
            }

            // Disable submit button during request
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Logging in...';
            }

            try {
                const response = await fetch('http://localhost:5000/api/login', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ email, password, role })
                });

                const data = await response.json();
                
                // Debug: log values
                console.log('Login response:', response.ok, 'Role:', role, 'Data:', data);

                if (response.ok) {
                    // Success message
                    const successMsg = data.message || 'Login successful! Redirecting...';
                    if (messageDiv) {
                        messageDiv.textContent = successMsg;
                        messageDiv.style.color = 'green';
                    } else {
                        alert(successMsg);
                    }

                    // Store user info if provided by backend
                    if (data.token) {
                        sessionStorage.setItem('authToken', data.token);
                    }
                    if (data.user) {
                        sessionStorage.setItem('userInfo', JSON.stringify(data.user));
                    }

                    // Role-based redirects with delay for better UX
                    setTimeout(() => {
                        switch(role.toLowerCase()) {
                            case 'superadmin':
                            case 'admin':
                                console.log('Redirecting to main.html as admin');
                                window.location.href = 'c:\\Users\\user\\Documents\\FrontEnd Development\\Byte_Battle\\dashboard\\main.html';
                                break;
                            case 'student':
                                console.log('Redirecting to student dashboard');
                                window.location.href = './Student_Side/student-dash.html';
                                break;
                            case 'teacher':
                            case 'instructor':
                                console.log('Redirecting to teacher dashboard');
                                window.location.href = './Teacher_Side/teacher-dash.html';
                                break;
                            default:
                                console.warn('Unknown role:', role);
                                if (messageDiv) {
                                    messageDiv.textContent = 'Unknown user role. Please contact administrator.';
                                    messageDiv.style.color = 'orange';
                                } else {
                                    alert('Unknown user role. Please contact administrator.');
                                }
                        }
                    }, 1500);

                } else {
                    // Handle specific error cases
                    let errorMessage = 'Login failed.';
                    
                    if (response.status === 401) {
                        errorMessage = 'Invalid email or password.';
                    } else if (response.status === 403) {
                        errorMessage = 'Access denied. Please check your role.';
                    } else if (response.status === 404) {
                        errorMessage = 'User not found.';
                    } else if (response.status >= 500) {
                        errorMessage = 'Server error. Please try again later.';
                    } else {
                        errorMessage = data.message || errorMessage;
                    }
                    
                    if (messageDiv) {
                        messageDiv.textContent = errorMessage;
                        messageDiv.style.color = 'red';
                    } else {
                        alert(errorMessage);
                    }
                    
                    console.log('Login failed:', response.status, errorMessage);
                }

            } catch (error) {
                console.error('Login error:', error);
                
                let errorMessage;
                if (error.name === 'TypeError' && error.message.includes('fetch')) {
                    errorMessage = 'Cannot connect to server. Please check your internet connection or ensure the server is running.';
                } else if (error.name === 'SyntaxError') {
                    errorMessage = 'Server returned invalid response. Please try again.';
                } else {
                    errorMessage = 'An unexpected error occurred. Please try again later.';
                }
                
                if (messageDiv) {
                    messageDiv.textContent = errorMessage;
                    messageDiv.style.color = 'red';
                } else {
                    alert(errorMessage);
                }
            } finally {
                // Re-enable submit button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Login';
                }
            }
        });
    }
});