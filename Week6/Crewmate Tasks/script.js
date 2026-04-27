const welcomeScreen = document.getElementById("welcomeScreen");
const taskScreen = document.getElementById("taskScreen");
const completeScreen = document.getElementById("completeScreen");

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskPreviewList = document.getElementById("taskPreviewList");
const startTasksBtn = document.getElementById("startTasksBtn");

const taskContainer = document.getElementById("taskContainer");
const mainProgressBar = document.getElementById("mainProgressBar");
const progressText = document.getElementById("progressText");
const completeTasksBtn = document.getElementById("completeTasksBtn");
const errorMsg = document.getElementById("errorMsg");

let tasks = [];
let completedCount = 0;

function showScreen(screen) {
    welcomeScreen.classList.add("hidden");
    taskScreen.classList.add("hidden");
    completeScreen.classList.add("hidden");

    screen.classList.remove("hidden");
}

//Interaction 1
addTaskBtn.addEventListener("click", function () {

    const value = taskInput.value.trim();

    if (value === "") return;

    if (tasks.length >= 5) {
        alert("Only 5 tasks allowed!");
        return;
    }

    tasks.push(value);

    const li = document.createElement("li");
    li.textContent = value;
    taskPreviewList.appendChild(li);

    taskInput.value = "";

    startTasksBtn.disabled = tasks.length !== 5;
});

//Interaction 2
startTasksBtn.addEventListener("click", function () {
    showScreen(taskScreen);
    renderTasks();
});

function renderTasks() {
    taskContainer.innerHTML = "";

    tasks.forEach((task, index) => {

        const div = document.createElement("div");
        div.classList.add("task-item");

        div.innerHTML = `
            <input type="checkbox" data-index="${index}">
            <span>${task}</span>
            <div class="mini-bar" id="bar-${index}"></div>
        `;

        taskContainer.appendChild(div);
    });

    document.querySelectorAll("input[type='checkbox']")
        .forEach(cb => cb.addEventListener("change", handleCheck));
}

function handleCheck(e) {

    const index = e.target.dataset.index;
    const bar = document.getElementById(`bar-${index}`);

    if (e.target.checked) {
        bar.style.width = "100%";
        bar.style.background = "#00ff88";
        completedCount++;
    } else {
        bar.style.width = "0%";
        bar.style.background = "#444";
        completedCount--;
    }

    updateProgress();
}

function updateProgress() {
    let percent = completedCount * 20;

    mainProgressBar.style.width = percent + "%";
    progressText.textContent = percent + "%";

    completeTasksBtn.disabled = completedCount !== 5;
}

//Interaction 3
completeTasksBtn.addEventListener("click", function () {

    if (completedCount !== 5) {
        errorMsg.textContent = "Complete all tasks first!";
        return;
    }

    showScreen(completeScreen);
});

//Interaction 4
taskInput.addEventListener("focus", () => {
    taskInput.style.transform = "scale(1.05)";
});

//Interaction 5
taskInput.addEventListener("blur", () => {
    taskInput.style.transform = "scale(1)";
});