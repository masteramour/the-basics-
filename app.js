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
// New State Variables
let streak = localStorage.getItem('canopyStreak') || 0;
document.getElementById('streakCount').innerText = streak;

const modal = document.getElementById('giveUpModal');
const confirmBtn = document.getElementById('confirmGiveUp');
const closeBtn = document.getElementById('closeModal');

// SHOW MODAL: Triggered when "Give Up" is clicked
window.showGiveUpModal = () => {
    modal.classList.remove('hidden');
    // Pause the timer while they decide
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
};

// CONFIRM GIVE UP: Resets everything
confirmBtn.onclick = () => {
    streak = 0; // The penalty!
    localStorage.setItem('canopyStreak', 0);
    document.getElementById('streakCount').innerText = 0;
    
    resetApp(); // Function to clear timer and hide focus zone
    modal.classList.add('hidden');
    alert("The biodiversity food chain has collapsed. 🥀");
};

// CLOSE MODAL: Resumes the work
closeBtn.onclick = () => {
    modal.classList.add('hidden');
    // Resume timer automatically
    startTimer(); 
};

// WIN LOGIC: Update this in your timer interval
if (timeLeft <= 0) {
    clearInterval(timerId);
    streak++;
    localStorage.setItem('canopyStreak', streak);
    document.getElementById('streakCount').innerText = streak;
    alert("Victory! Your biodiversity food chain is thriving. 🦅");
}
