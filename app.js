// DOM Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const focusZone = document.getElementById('focusZone');
const timerDisplay = document.getElementById('timerDisplay');
const emojiDisplay = document.getElementById('ecosystemEmoji');
const timerBtn = document.getElementById('timerBtn');

let timeLeft = 1500; // 25 minutes
let timerId = null;

// The Biodiversity Food Chain logic
function updateEcosystem(secondsLeft) {
    const progress = (1500 - secondsLeft) / 1500;
    
    if (progress > 0.9) emojiDisplay.innerText = "🦅"; // Apex Predator
    else if (progress > 0.7) emojiDisplay.innerText = "🦊"; // Secondary Consumer
    else if (progress > 0.5) emojiDisplay.innerText = "🌳"; // Primary Producer
    else if (progress > 0.2) emojiDisplay.innerText = "🌱"; // Seedling
    else emojiDisplay.innerText = "🪱"; // Soil/Decomposer
}

addBtn.onclick = () => {
    const taskText = taskInput.value;
    if (!taskText) return;

    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <button onclick="startFocusMode('${taskText}')">Focus</button>
    `;
    taskList.appendChild(li);
    taskInput.value = '';
};

window.startFocusMode = (name) => {
    document.getElementById('currentTaskName').innerText = name;
    focusZone.classList.remove('hidden');
};

timerBtn.onclick = () => {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        timerBtn.innerText = "Resume";
    } else {
        timerBtn.innerText = "Pause";
        timerId = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            updateEcosystem(timeLeft);
            if (timeLeft <= 0) clearInterval(timerId);
        }, 1000);
    }
};

function updateTimerDisplay() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    timerDisplay.innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}
