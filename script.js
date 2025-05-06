const files = [
    {
        name: 'Healthcare AI Platform',
        description: 'A platform leveraging AI for healthcare solutions.',
        url: 'https://github.com/rishabharaj/healthcare-ai-platform' 
    },
    {
        name: 'Redoc OpenAI API Documentation',
        description: 'Documentation for OpenAI API using Redoc, including extensions like x-logo, x-codeSamples, and x-examples.',
        url: 'https://github.com/rishabharaj/redoc-OpenAI-API-documentation' 
    },
    {
        name: 'Email-AI-agent',
        description: 'Email summarization and response generation using Machine learning.',
        url: 'https://github.com/rishabharaj/Email-AI-agent' 
    },
    {
        name: 'Rishabharaj',
        description: 'My personal GitHub profile .',
        url: 'https://github.com/rishabharaj/rishabharaj' 
    },
    {
        name: 'Java-Script basic projects',
        description: 'A collection of basic JavaScript projects.',
        url: 'https://github.com/rishabharaj/Java-Script' 
    },
    {
        name: 'Github PAT AI models',
        description: 'A collection of AI models and tools.',
        url: 'https://github.com/rishabharaj/AI-models' 
    },
    {
        name: 'Python Code Snippets',
        description: 'A collection of Python code snippets and examples.',
        url: 'https://github.com/rishabharaj/python' 
    },
    {
        name: 'AgentSync hackathon project',
        description: 'A hackathon project- AgentSync.',
        url: 'https://github.com/rishabharaj/AgentSync' 
    },
    {
        name: 'JS basic projects',
        description: 'A collection of basic JavaScript projects.',
        url: 'https://github.com/rishabharaj/basic-projects' 
    },
    {
        name: 'Operating system college assignment',
        description: 'A college assignment on operating systems.',
        url: 'https://github.com/rishabharaj/Operating-System' 
    },
    {
        name: 'C-Cpp practice codes',
        description: 'A collection of C and C++ practice examples.',
        url: 'https://github.com/rishabharaj/C-Cpp-practice-example' 
    },
    {
        name: 'LoanLens-(hackathon project)',
        description: 'LoanLens is a credit risk assessment web application that combines traditional financial data with alternative data',
        url: 'https://github.com/rishabharaj/LoanLens' 
    },
    {
        name: 'AI-ML for stock market',
        description: 'A project that uses AI and ML for stock market analysis.',
        url: 'https://github.com/rishabharaj/AI-stocks' 
    },
    {
        name: 'Tokenized Stock Saarthi-hackathon project',
        description: 'Tokenized Stock Saarthi is a hackathon project that focuses on tokenizing stocks for better trading and investment strategies.',
        url: 'https://github.com/rishabharaj/tokenized-stock-saarthi-' 
    },
    {
        name: 'APPIAN-SAATHI-hackathon project',
        description: 'APPIAN-SAATHI is a hackathon project that focuses on creating a platform for Appian developers to connect and collaborate.',
        url: 'https://github.com/rishabharaj/APPIAN-SAATHI' 
    },
    
];

let isUsingCustomFont = true;

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
context.font = "24px 'Sga Regular'";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let controlPanelTimeout;

function toggleControlPanel() {
    const controlPanel = document.getElementById("controlPanel");
    if (controlPanel.style.display === "none") {
        controlPanel.style.display = "block";
        resetControlPanelTimeout();
    } else {
        controlPanel.style.display = "none";
        clearTimeout(controlPanelTimeout);
    }
}

function resetControlPanelTimeout() {
    clearTimeout(controlPanelTimeout);
    controlPanelTimeout = setTimeout(() => {
        document.getElementById("controlPanel").style.display = "none";
    }, 10000);
}

function showDescription(file) {
    const description = document.getElementById('description');
    description.innerHTML = `
        <strong>${file.name}</strong>
        <p>${file.description}</p>
        <a href="${file.url}" target="_blank" style="color: #00f; text-decoration: underline;">View Repository</a>
    `;
    description.style.display = 'block';
}

const controls = {
    up: false, down: false,
    left: false, right: false,
    slideUp: false, slideDown: false,
    rotateLeft: false, rotateRight: false,
    showLabels: true,
};

let expansionSpeedMultiplier = 0.4;

let spaceship = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    z: 1,
    speed: 0,
    maxSpeed: 5,
    rotation: 0,
};

let bubbles = [];
for (let i = 0; i < 100; i++) {
    const file = files[Math.floor(Math.random() * files.length)];
    bubbles.push({
        x: Math.random() * canvas.width - spaceship.x,
        y: Math.random() * canvas.height - spaceship.y,
        z: Math.random() * canvas.width,
        size: 3,
        speed: Math.random() * 0.5 + 0.05,
        file: file,
        expandingCircle: {
            radius: 0,
            expansionSpeed: Math.random() * 0.15 + 0.05,
            isVisible: true,
            clicked: false,
        },
    });
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    bubbles.sort((a, b) => b.z - a.z);

    for (let bubble of bubbles) {
        let scale = canvas.width / bubble.z * spaceship.z;
        let x = spaceship.x + (bubble.x * Math.cos(spaceship.rotation) - bubble.y * Math.sin(spaceship.rotation)) * scale;
        let y = spaceship.y + (bubble.x * Math.sin(spaceship.rotation) + bubble.y * Math.cos(spaceship.rotation)) * scale;

        let bubbleOpacity = 1;
        let fadeFactor = (bubble.expandingCircle.radius * scale) / (Math.max(canvas.width, canvas.height) * 0.75);
        bubbleOpacity = Math.max(0.2, 1 - fadeFactor);

        context.globalAlpha = bubbleOpacity;

        if (bubble.expandingCircle.isVisible) {
            context.strokeStyle = `rgba(255, 255, 255, ${bubbleOpacity * 0.3})`;
            context.lineWidth = 2;
            context.beginPath();
            context.arc(x, y, bubble.expandingCircle.radius * scale, 0, Math.PI * 2);
            context.stroke();
        }

        if (bubble.expandingCircle.clicked) {
            context.strokeStyle = `rgba(0, 255, 0, ${bubbleOpacity * 0.4})`;
            context.lineWidth = 2;
            context.beginPath();
            context.arc(x, y, bubble.expandingCircle.radius * scale, 0, Math.PI * 2);
            context.stroke();
        }

        context.fillStyle = `rgba(255, 255, 255, ${bubbleOpacity})`;
        context.beginPath();
        context.arc(x, y, bubble.size * scale, 0, Math.PI * 2);
        context.fill();

        if (scale > 0.1 && controls.showLabels) {
            context.fillStyle = `rgba(255, 255, 255, ${bubbleOpacity * 0.8})`;
            context.fillText(bubble.file.name, x, y - 10);
        }

        context.globalAlpha = 1;
    }
}

function update() {
    if (controls.up) {
        spaceship.z *= 1.05;
    }
    if (controls.down) {
        spaceship.z *= 0.95;
    }
    if (controls.left) {
        spaceship.x -= spaceship.maxSpeed;
    }
    if (controls.right) {
        spaceship.x += spaceship.maxSpeed;
    }
    if (controls.slideUp) {
        spaceship.y -= spaceship.maxSpeed;
    }
    if (controls.slideDown) {
        spaceship.y += spaceship.maxSpeed;
    }
    if (controls.rotateLeft) {
        spaceship.rotation -= 0.05;
    }
    if (controls.rotateRight) {
        spaceship.rotation += 0.05;
    }

    for (let bubble of bubbles) {
        bubble.z -= spaceship.speed;
        if (bubble.z < 0.5) {
            bubble.z = canvas.width;
        }

        if (bubble.expandingCircle.isVisible || bubble.expandingCircle.clicked) {
            bubble.expandingCircle.radius += bubble.expandingCircle.expansionSpeed * expansionSpeedMultiplier;
            if (bubble.expandingCircle.radius > Math.max(canvas.width, canvas.height) * 1.5) {
                bubble.expandingCircle.radius = 0;
                if (bubble.expandingCircle.clicked) {
                    bubble.expandingCircle.clicked = false;
                }
            }
        }
    }
}

let keysPressed = {};
document.addEventListener("keydown", function(event) {
    keysPressed[event.key] = true;

    switch (event.key) {
        case 'c':
            toggleControlPanel();
            resetControlPanelTimeout();
            break;
        case 'w': controls.up = true; break;
        case 's': controls.down = true; break;
        case 'a': controls.right = true; break;
        case 'd': controls.left = true; break;
        case 'r': controls.slideDown = true; break;
        case 'f': controls.slideUp = true; break;
        case 'q': controls.rotateLeft = true; break;
        case 'e': controls.rotateRight = true; break;
        case 'x':
            controls.showLabels = !controls.showLabels;
            if (!controls.showLabels) {
                document.getElementById('description').style.display = 'none';
            }
            break;
        case 'z':
            isUsingCustomFont = !isUsingCustomFont;
            if (isUsingCustomFont) {
                document.body.classList.add('sga');
                document.body.classList.remove('sans-serif');
                context.font = "24px 'Sga Regular'";
            } else {
                document.body.classList.add('sans-serif');
                document.body.classList.remove('sga');
                context.font = "18px sans-serif";
            }
            break;
        case 'g': location.reload(); break;
        case '+':
        case '=':
            expansionSpeedMultiplier *= 1.1;
            break;
        case '-': expansionSpeedMultiplier *= 0.9;
            break;
    }
});

document.addEventListener("keyup", function(event) {
    delete keysPressed[event.key];
    switch (event.key) {
        case 'w': controls.up = false; break;
        case 's': controls.down = false; break;
        case 'a': controls.right = false; break;
        case 'd': controls.left = false; break;
        case 'r': controls.slideDown = false; break;
        case 'f': controls.slideUp = false; break;
        case 'q': controls.rotateLeft = false; break;
        case 'e': controls.rotateRight = false; break;
    }
});

canvas.addEventListener('click', function(event) {
    const description = document.getElementById('description');
    if (description.style.display === 'block') {
        description.style.display = 'none';
    } else {
        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        for (let bubble of bubbles) {
            let scale = canvas.width / bubble.z * spaceship.z;
            let x = spaceship.x + (bubble.x * Math.cos(spaceship.rotation) - bubble.y * Math.sin(spaceship.rotation)) * scale;
            let y = spaceship.y + (bubble.x * Math.sin(spaceship.rotation) + bubble.y * Math.cos(spaceship.rotation)) * scale;
            let radius = bubble.size * scale;

            if (Math.hypot(clickX - x, clickY - y) <= radius) {
                showDescription(bubble.file);
                bubble.expandingCircle.clicked = true;
                bubble.expandingCircle.radius = 0;
                break;
            }
        }
    }
});

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();
