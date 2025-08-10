
// Theme handling
const themeButtons = document.querySelectorAll('.theme-btn');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
    const root = document.documentElement;
    const isDark = theme === 'dark' || 
                  (theme === 'system' && prefersDark.matches);
    
    if (isDark) {
        root.style.setProperty('--bg-color', '#000000');
        root.style.setProperty('--text-color', '#ffffff');
        root.style.setProperty('--card-bg', '#111111');
        root.style.setProperty('--hover-color', '#222222');
    } else {
        root.style.setProperty('--bg-color', '#ffffff');
        root.style.setProperty('--text-color', '#000000');
        root.style.setProperty('--card-bg', '#f5f5f5');
        root.style.setProperty('--hover-color', '#e5e5e5');
    }
    
    localStorage.setItem('theme', theme);
}

themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.classList.contains('light') ? 'light' : 
                     btn.classList.contains('dark') ? 'dark' : 'system';
        setTheme(theme);
    });
});

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'system';
setTheme(savedTheme);

// Back to top functionality
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        backToTop.style.opacity = '1';
    } else {
        backToTop.style.opacity = '0';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// scroll reveal
const header = document.querySelector('header');

// Function to add the sticky class when scrolling
function stickyHeader() {
    if (window.scrollY > 0) { // If the user has scrolled down
        header.classList.add('sticky');
    } else { // If the user is at the top of the page
        header.classList.remove('sticky');
    }
}

// Call the stickyHeader function when scrolling
window.addEventListener('scroll', stickyHeader);

// scroll theme
function setTheme(theme) {
    const root = document.documentElement;
    const isDark = theme === 'dark' || 
                  (theme === 'system' && prefersDark.matches);
    
    if (isDark) {
        root.style.setProperty('--bg-color', '#000000');
        root.style.setProperty('--text-color', '#ffffff');
        root.style.setProperty('--card-bg', '#111111');
        root.style.setProperty('--hover-color', '#222222');
    } else {
        root.style.setProperty('--bg-color', '#ffffff'); // light background
        root.style.setProperty('--text-color', '#000000'); // dark text
        root.style.setProperty('--card-bg', '#f5f5f5'); // light card background
        root.style.setProperty('--hover-color', '#e5e5e5'); // lighter hover effect
    }
    
    localStorage.setItem('theme', theme);
}

// scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Background Slideshow and Particle Colors
const backgroundImages = [
    'images/arc-reactor.jpg',
    'images/arc-reactor2.jpg',
];

const particleColors = {
    green: ["#00ff00", "#00ffaa", "#00ff88", "#00ff66"],
    purple: ["#8000ff", "#a64dff", "#9933ff", "#b366ff"]
};

let currentImageIndex = 0;
let isGreenColor = true;
const transitionInterval = 15000; // 5 seconds between transitions

function updateParticlesColor() {
    const colors = isGreenColor ? particleColors.green : particleColors.purple;
    particlesJS("particles-js", {
        particles: {
            number: {
                value: 100,
                density: {
                    enable: true,
                    value_area: 1000
                }
            },
            color: {
                value: colors
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: colors[0]
                }
            },
            opacity: {
                value: 1,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 8,
                random: true,
                anim: {
                    enable: true,
                    speed: 4,
                    size_min: 3,
                    size_max: 12,
                    sync: false
                }
            },
            line_linked: {
                enable: false
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            },
            shadow: {
                enable: true,
                color: colors[0],
                blur: 5,
                offset: {
                    x: 0,
                    y: 0
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: false },
                onclick: { enable: false },
                resize: true
            },
            modes: {}
        },
        retina_detect: true
    });

    // Update shadow color in CSS
    const style = document.createElement('style');
    style.textContent = `
        #particles-js canvas {
            filter: drop-shadow(0 0 10px ${colors[0]}80);
            pointer-events: none; /* disable all pointer interactions */
        }
        .particle {
            box-shadow: 0 0 20px ${colors[0]}cc;
        }
    `;
    document.head.appendChild(style);
}

function changeBackground() {
    currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    document.body.style.backgroundImage = `url('${backgroundImages[currentImageIndex]}')`;
    isGreenColor = !isGreenColor;
    updateParticlesColor();
}

// Initialize particles with green color
updateParticlesColor();

// Start the slideshow
setInterval(changeBackground, transitionInterval);

// Format JARVIS response with bullet points and line breaks
function formatJarvisResponse(response) {
    // Split the response into lines
    const lines = response.split('\n');
    let formattedResponse = '';
    let lastWasBullet = false;

    lines.forEach(line => {
        if (line.trim().startsWith('-')) {
            if (lastWasBullet) {
                formattedResponse += '<br>';
            }
            formattedResponse += line + '<br>';
            lastWasBullet = true;
        } else if (line.includes('JARVIS:')) {
            formattedResponse += '<br><strong>' + line + '</strong>';
            lastWasBullet = false;
        } else if (line.trim() === '') {
            formattedResponse += '<br>';
            lastWasBullet = false;
        } else {
            formattedResponse += line + '<br>';
            lastWasBullet = false;
        }
    });

    return formattedResponse;
}

// Get JARVIS response
async function getJarvisResponse(message) {
    try {
        const response = await fetch('http://localhost:8000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        const data = await response.json();
        
        if (response.ok) {
            return data.response;
        } else {
            return "I apologize, but I encountered an error. Please try again.";
        }
    } catch (error) {
        console.error('Error:', error);
        return "I'm having trouble connecting to my systems. Please try again later.";
    }
}

// Event listeners for sending messages
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatMessages = document.querySelector('.chat-messages');

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Add user message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user';
    userMessageDiv.innerHTML = `<div class="message-content">${message}</div>`;
    chatMessages.appendChild(userMessageDiv);

    // Clear input
    userInput.value = '';

    // Add loading message
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message jarvis';
    loadingDiv.innerHTML = '<div class="message-content">Thinking...</div>';
    chatMessages.appendChild(loadingDiv);

    // Get response from RAG engine
    const response = await getJarvisResponse(message);

    // Remove loading message
    chatMessages.removeChild(loadingDiv);

    // Add bot response with formatted content
    const botMessageDiv = document.createElement('div');
    botMessageDiv.className = 'message jarvis';
    botMessageDiv.innerHTML = `<div class="message-content">${formatJarvisResponse(response)}</div>`;
    chatMessages.appendChild(botMessageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Event listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Minimize button functionality
const jarvisChat = document.querySelector('.jarvis-chat');
const minimizeBtn = document.querySelector('.minimize-btn');

jarvisChat.addEventListener('click', (e) => {
    if (!jarvisChat.classList.contains('expanded')) {
        jarvisChat.classList.add('expanded');
    }
});

minimizeBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent the click from triggering the parent click event
    jarvisChat.classList.remove('expanded');
});