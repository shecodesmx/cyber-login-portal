document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');
    const loginButton = document.querySelector('.login-button');
    const audioBars = document.querySelectorAll('.bar');
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');
    const versionElement = document.querySelector('.version');
    
    const savedUsername = localStorage.getItem('cyberUsername');
    const savedPassword = localStorage.getItem('cyberPassword');
    const savedRemember = localStorage.getItem('cyberRemember') === 'true';
    
    if (savedUsername && savedRemember) {
        usernameInput.value = savedUsername;
    }
    if (savedPassword && savedRemember) {
        passwordInput.value = savedPassword;
    }
    rememberCheckbox.checked = savedRemember;
    
    function updateAudioBars() {
        audioBars.forEach(bar => {
            const randomHeight = Math.floor(Math.random() * 50) + 20;
            bar.style.height = `${randomHeight}px`;
            const randomOpacity = Math.random() * 0.5 + 0.4;
            bar.style.opacity = randomOpacity;
        });
    }
    
    setInterval(updateAudioBars, 200);
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        const remember = rememberCheckbox.checked;
        
        if (!username) {
            shakeElement(usernameInput);
            showError(usernameInput, 'Username required');
            return;
        }
        
        if (!password) {
            shakeElement(passwordInput);
            showError(passwordInput, 'Password required');
            return;
        }
        
        loginButton.disabled = true;
        loginButton.innerHTML = '<span class="button-text">Authenticating...</span>';
        
        statusDot.style.background = '#ffff00';
        statusDot.style.boxShadow = '0 0 20px #ffff00';
        statusText.textContent = 'Authenticating...';
        
        if (remember) {
            localStorage.setItem('cyberUsername', username);
            localStorage.setItem('cyberPassword', password);
            localStorage.setItem('cyberRemember', 'true');
        } else {
            localStorage.removeItem('cyberUsername');
            localStorage.removeItem('cyberPassword');
            localStorage.removeItem('cyberRemember');
        }
        
        setTimeout(() => {
            statusDot.style.background = '#00ff00';
            statusDot.style.boxShadow = '0 0 20px #00ff00';
            statusText.textContent = 'Access Granted';
            
            versionElement.textContent = '1.2 ✓';
            versionElement.style.color = 'rgba(0, 255, 136, 0.8)';
            
            loginButton.innerHTML = '<span class="button-text">Access Granted</span>';
            loginButton.style.borderImage = 'linear-gradient(145deg, #00ff88, #00cc66) 1';
            loginButton.style.color = '#00ff88';
            loginButton.style.boxShadow = '0 0 60px rgba(0, 255, 136, 0.8), inset 0 0 40px rgba(0, 200, 100, 0.4)';
            
            const titleMain = document.querySelector('.title-main');
            titleMain.textContent = 'Welcome Back';
            titleMain.style.animation = 'none';
            titleMain.style.background = 'linear-gradient(145deg, #00ff88, #00cc66, #00ff88)';
            
            const titleSub = document.querySelector('.title-sub');
            titleSub.textContent = 'Authentication Successful';
            
            setTimeout(() => {
                alert(`Welcome ${username}! Login simulation successful.`);
                resetForm();
            }, 1500);
        }, 2000);
    });
    
    function shakeElement(element) {
        element.classList.add('shake');
        setTimeout(() => {
            element.classList.remove('shake');
        }, 500);
    }
    
    function showError(element, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #ff0066;
            font-size: 12px;
            position: absolute;
            bottom: -18px;
            left: 0;
            text-shadow: 0 0 10px rgba(255, 0, 102, 0.5);
        `;
        
        const wrapper = element.parentElement;
        const existingError = wrapper.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        wrapper.appendChild(errorDiv);
        
        setTimeout(() => {
            if (errorDiv.parentElement) {
                errorDiv.remove();
            }
        }, 3000);
    }
    
    function resetForm() {
        setTimeout(() => {
            loginButton.disabled = false;
            loginButton.innerHTML = '<span class="button-text">Login</span>';
            loginButton.style.borderImage = 'linear-gradient(145deg, #ff0066, #cc0044) 1';
            loginButton.style.color = '#ff0066';
            loginButton.style.boxShadow = '0 0 30px rgba(255, 0, 100, 0.4), inset 0 0 25px rgba(150, 0, 100, 0.2)';
            
            statusDot.style.background = '#00ff88';
            statusDot.style.boxShadow = '0 0 20px #00ff88';
            statusText.textContent = 'System Online';
            
            versionElement.textContent = '1.2';
            versionElement.style.color = 'rgba(0, 200, 255, 0.4)';
            
            const titleMain = document.querySelector('.title-main');
            titleMain.textContent = 'Cyber Portal';
            titleMain.style.animation = 'gradientShift 4s ease-in-out infinite';
            titleMain.style.background = 'linear-gradient(145deg, #00d4ff, #ff0080, #00d4ff)';
            
            const titleSub = document.querySelector('.title-sub');
            titleSub.textContent = 'Access Granted • Secure Login';
            
            if (!rememberCheckbox.checked) {
                passwordInput.value = '';
            }
        }, 3000);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        .shake {
            animation: shakeAnimation 0.5s ease-in-out;
        }
        
        @keyframes shakeAnimation {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .login-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
        
        .login-button:disabled:hover {
            transform: none;
            box-shadow: 0 0 30px rgba(255, 0, 100, 0.4), inset 0 0 25px rgba(150, 0, 100, 0.2);
        }
        
        .login-button:disabled:hover::before {
            width: 0;
            height: 0;
        }
    `;
    document.head.appendChild(style);
});