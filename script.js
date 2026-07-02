let taskData = {};

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

const columns = [todo, progress, done];

let dragElement = null;


// Update Local Storage & Counts

function saveTasks() {
    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");

        taskData[col.id] = Array.from(tasks).map(task => ({
            title: task.querySelector("h2").innerText,
            description: task.querySelector("p").innerText
        }));

        if (count) count.innerText = tasks.length;
    });

    localStorage.setItem("tasks", JSON.stringify(taskData));
}


// Create Task

function createTask(taskTitle, taskDesc) {
    const div = document.createElement("div");

    div.classList.add("task");
    div.setAttribute("draggable", "true");

    div.innerHTML = `
        <h2>${taskTitle}</h2>
        <p>${taskDesc}</p>
        <button class="delete-btn">Delete</button>
    `;

    // Drag
    div.addEventListener("dragstart", () => {
        dragElement = div;
    });

    // Delete
    div.querySelector(".delete-btn").addEventListener("click", () => {
        div.remove();
        saveTasks();
    });

    return div;
}


// Load Local Storage

if (localStorage.getItem("tasks")) {
    taskData = JSON.parse(localStorage.getItem("tasks"));

    columns.forEach(col => {
        if (taskData[col.id]) {
            taskData[col.id].forEach(task => {
                const div = createTask(task.title, task.description);
                col.appendChild(div);
            });
        }
    });

    saveTasks();
}

// Drag & Drop

function borderEffect(col) {

    col.addEventListener("dragenter", e => {
        e.preventDefault();
        col.classList.add("hover-over");
    });

    col.addEventListener("dragleave", () => {
        col.classList.remove("hover-over");
    });

    col.addEventListener("dragover", e => {
        e.preventDefault();
    });

    col.addEventListener("drop", e => {
        e.preventDefault();

        if (dragElement) {
            col.appendChild(dragElement);
        }

        col.classList.remove("hover-over");
        saveTasks();
    });

}

columns.forEach(borderEffect);



const toggleModalButton = document.getElementById("toggle-modal");
const modal = document.querySelector(".modal");
const bgmodal = document.querySelector(".modal .bg");
const addTaskButton = document.getElementById("add-new-task");

toggleModalButton.addEventListener("click", () => {
    modal.classList.toggle("active");
});

bgmodal.addEventListener("click", () => {
    modal.classList.remove("active");
});


// Add New Task

addTaskButton.addEventListener("click", () => {

    const taskTitle = document.getElementById("task-title-input").value.trim();
    const taskDesc = document.getElementById("task-desc-input").value.trim();

    if (!taskTitle) return;

    const div = createTask(taskTitle, taskDesc);

    todo.appendChild(div);

    document.getElementById("task-title-input").value = "";
    document.getElementById("task-desc-input").value = "";

    modal.classList.remove("active");

    saveTasks();
});