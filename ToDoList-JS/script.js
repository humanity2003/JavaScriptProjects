const taskInput = document.getElementById("task-input");
const priorityDropdown = document.getElementById("priority-select");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("task-list");
const sortByDateBtn = document.getElementById("sortByDate");
const sortByPrioBtn = document.getElementById("sortByPriority");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let isEditMode = false;
let editIndex = '';

function addTask(){
    localStorage.setItem("tasks",JSON.stringify(tasks));

};

function renderTask(){
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const formattedDate = new Date(task.TaskDate).toLocaleString();
        const taskItem = document.createElement('li');
        taskItem.className = "task-item";
        taskItem.innerHTML = 
        `<span>${task.TaskName} (Priority: ${task.Priority}) - Created: ${formattedDate}</span>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>`;
        
        taskList.appendChild(taskItem);
    });
}

function editTask(index) {
    taskInput.value = tasks[index].TaskName;
    taskInput.classList.add("edit-mode");
    taskInput.focus();
    editIndex = index;
    isEditMode = true;
  }

function deleteTask(index) {
    tasks.splice(index,1);
    addTask();
    renderTask();
}
  
// Initial render of tasks when the page loads
document.addEventListener('DOMContentLoaded', renderTask);

//listen to event: Add Task Button clicked
addTaskBtn.addEventListener('click',()=>{
    console.log(`${taskInput.value} button clicked!`);
    //check if input is null
    if (taskInput.value===''){
        alert("Empty task not allowed. Please enter task!");
    }else{
        const task = {
            TaskName: taskInput.value.trim(),
            Priority: priorityDropdown.value,
            TaskDate: Date.now(),
            // TaskDate: new Date().toISOString(),
        }; 
        if (isEditMode){
            tasks[editIndex] = task;
            isEditMode = false;
        }else{
            console.log(task);
            tasks.push(task);
        }
        
    }
     //call addTask function -- will add new tasks array to localdata
    addTask();
     //call renderTask fn -- will get tasks from ld and show in html
    renderTask();
 
  taskInput.value = "";
  taskInput.classList.remove("edit-mode");
});

//sort by date
sortByDateBtn.addEventListener('click', () => {
    tasks.sort((a,b) => new Date(b.TaskDate) - new Date(a.TaskDate));
    renderTask();
});

//sort by priority
sortByPrioBtn.addEventListener('click', () => {
    tasks.sort((a,b) => {
        const priorityOrder = {Low: 1, Medium:2, High:3};
        return (priorityOrder[b.Priority] - priorityOrder[a.Priority]);
    });
    renderTask();
});