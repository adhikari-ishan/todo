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