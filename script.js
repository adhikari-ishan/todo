
const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

const tasks = document.querySelectorAll(".task");
let dragElement = null;


tasks.forEach(task => {
    task.addEventListener("drag", (e)=>{
    e.preventDefault();
    dragElement = task;
    })
})


function borderEffect(col){
    col.addEventListener("dragenter",(e)=>{
        e.preventDefault();
        col.classList.add("hover-over");
    })

    col.addEventListener("dragleave", (e)=>{
        e.preventDefault();
        col.classList.remove("hover-over");
    })

    col.addEventListener("dragover", (e)=>{
        e.preventDefault();
    })

    col.addEventListener("drop", (e)=>{
        e.preventDefault();
        col.appendChild(dragElement);
        col.classList.remove("hover-over");
    })
}

borderEffect(todo);
borderEffect(progress);
borderEffect(done);

const toggleModalButton = document.getElementById("toggle-modal");
const modal = document.querySelector(".modal");
const bgmodal = document.querySelector(".modal .bg");
const addTaskButton = document.getElementById("add-new-task");

toggleModalButton.addEventListener("click", ()=>{
    modal.classList.toggle("active");
})

bgmodal.addEventListener("click", ()=>{
    modal.classList.remove("active");
})

addTaskButton.addEventListener("click", ()=>{
    const taskTitle = document.getElementById("task-title-input").value;
    const taskDesc = document.getElementById("task-desc-input").value;
    modal.classList.remove("active");
    const div = document.createElement("div"); 
    div.classList.add("task");
    div.setAttribute("draggable", "true");
    div.innerHTML = `<h2>${taskTitle}</h2>
                    <p> ${taskDesc} </p>
                    <button id="deletebtn">Delete</button>`;
    todo.appendChild(div);  
    div.addEventListener("drag", ()=>{
        preventDefault();
        dragElement = task;
    })             
})