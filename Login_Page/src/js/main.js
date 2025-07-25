// This file contains the JavaScript code for handling login form submission
document.addEventListener('DOMContentLoaded', function() {
    // Student login form
    const studentLoginForm = document.getElementById('studentLoginForm');
    const studentMessageDiv = document.getElementById('studentMessage');

    if (studentLoginForm) {
        studentLoginForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const email = document.getElementById('studentEmail')?.value?.trim();
            const password = document.getElementById('studentPassword')?.value;
            const messageDiv = studentMessageDiv;
            const submitBtn = studentLoginForm.querySelector('button[type="submit"]');

            if (messageDiv) {
                messageDiv.textContent = '';
                messageDiv.style.color = '';
            }

            if (!email || !password) {
                const errorMsg = 'Please fill in all required fields.';
                if (messageDiv) {
                    messageDiv.textContent = errorMsg;
                    messageDiv.style.color = 'red';
                } else {
                    alert(errorMsg);
                }
                return;
            }

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
                    body: JSON.stringify({ email, password, role: 'student' })
                });

                const data = await response.json();

                console.log('Student login response:', response.ok, data);

                if (response.ok) {
                    const successMsg = data.message || 'Login successful! Redirecting...';
                    if (messageDiv) {
                        messageDiv.textContent = successMsg;
                        messageDiv.style.color = 'green';
                    } else {
                        alert(successMsg);
                    }

                    if (data.token) {
                        sessionStorage.setItem('authToken', data.token);
                    }
                    if (data.user) {
                        sessionStorage.setItem('userInfo', JSON.stringify(data.user));
                    }

                    setTimeout(() => {
                        window.location.href = './Student_Side/student-dash.html';
                    }, 1500);
                } else {
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
                    console.log('Student login failed:', response.status, errorMessage);
                }
            } catch (error) {
                console.error('Student login error:', error);
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
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Login as Student';
                }
            }
        });
    }

    // Teacher login form
    const teacherLoginForm = document.getElementById('teacherLoginForm');
    const teacherMessageDiv = document.getElementById('teacherMessage');

    if (teacherLoginForm) {
        teacherLoginForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const email = document.getElementById('teacherEmail')?.value?.trim();
            const password = document.getElementById('teacherPassword')?.value;
            const messageDiv = teacherMessageDiv;
            const submitBtn = teacherLoginForm.querySelector('button[type="submit"]');

            if (messageDiv) {
                messageDiv.textContent = '';
                messageDiv.style.color = '';
            }

            if (!email || !password) {
                const errorMsg = 'Please fill in all required fields.';
                if (messageDiv) {
                    messageDiv.textContent = errorMsg;
                    messageDiv.style.color = 'red';
                } else {
                    alert(errorMsg);
                }
                return;
            }

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
                    body: JSON.stringify({ email, password, role: 'teacher' })
                });

                const data = await response.json();

                console.log('Teacher login response:', response.ok, data);

                if (response.ok) {
                    const successMsg = data.message || 'Login successful! Redirecting...';
                    if (messageDiv) {
                        messageDiv.textContent = successMsg;
                        messageDiv.style.color = 'green';
                    } else {
                        alert(successMsg);
                    }

                    if (data.token) {
                        sessionStorage.setItem('authToken', data.token);
                    }
                    if (data.user) {
                        sessionStorage.setItem('userInfo', JSON.stringify(data.user));
                    }

                    setTimeout(() => {
                        window.location.href = './Teacher_Side/teacher-dash.html';
                    }, 1500);
                } else {
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
                    console.log('Teacher login failed:', response.status, errorMessage);
                }
            } catch (error) {
                console.error('Teacher login error:', error);
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
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Login as Teacher';
                }
            }
        });
    }

    // Superadmin login form
    const superadminLoginForm = document.getElementById('superadminLoginForm');
    const superadminMessageDiv = document.getElementById('superadminMessage');

    if (superadminLoginForm) {
        superadminLoginForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const email = document.getElementById('superadminEmail')?.value?.trim();
            const password = document.getElementById('superadminPassword')?.value;
            const messageDiv = superadminMessageDiv;
            const submitBtn = superadminLoginForm.querySelector('button[type="submit"]');

            if (messageDiv) {
                messageDiv.textContent = '';
                messageDiv.style.color = '';
            }

            if (!email || !password) {
                const errorMsg = 'Please fill in all required fields.';
                if (messageDiv) {
                    messageDiv.textContent = errorMsg;
                    messageDiv.style.color = 'red';
                } else {
                    alert(errorMsg);
                }
                return;
            }

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
                    body: JSON.stringify({ email, password, role: 'superadmin' })
                });

                const data = await response.json();

                console.log('Superadmin login response:', response.ok, data);

                if (response.ok) {
                    const successMsg = data.message || 'Login successful! Redirecting...';
                    if (messageDiv) {
                        messageDiv.textContent = successMsg;
                        messageDiv.style.color = 'green';
                    } else {
                        alert(successMsg);
                    }

                    if (data.token) {
                        sessionStorage.setItem('authToken', data.token);
                    }
                    if (data.user) {
                        sessionStorage.setItem('userInfo', JSON.stringify(data.user));
                    }

                    setTimeout(() => {
                        window.location.href = '../../dashboard/main.html';
                    }, 1500);
                } else {
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
                    console.log('Superadmin login failed:', response.status, errorMessage);
                }
            } catch (error) {
                console.error('Superadmin login error:', error);
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
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Login as Super Admin';
                }
            }
        });
    }

    // Handle guest login button click
    const guestLoginBtn = document.querySelector('.guest-login-button');
    if (guestLoginBtn) {
        guestLoginBtn.addEventListener('click', function() {
            // Redirect to main.html in dashboard folder
            window.location.href = '../../dashboard/main.html';
        });
    }
});
