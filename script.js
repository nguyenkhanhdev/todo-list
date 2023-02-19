// Load tasks from JSON file
let tasks = [];

  async function loadTasks() {
    try {
      const response = await fetch("tasks.json");
      if (!response.ok) {
        throw new Error("Failed to load tasks.");
      }
      const data = await response.json();
      tasks = data;
    } catch (error) {
      console.error(error);
      tasks = [];
    }
    renderTasks();
  } 

// Save tasks to JSON file
function saveTasks() {
  fetch("tasks.json", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tasks)
  });
}

// Add task to list
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  const task = {
    id: Date.now(),
    description: taskInput.value,
    done: false
  };
  tasks.push(task);
  taskInput.value = "";
  renderTasks();
  saveTasks();
}

// Delete task from list
function deleteTask(event) {
  const taskList = document.getElementById("taskList");
  const task = event.target.parentNode;
  const taskId = parseInt(task.getAttribute("data-id"));
  tasks = tasks.filter(task => task.id !== taskId);
  taskList.removeChild(task);
  saveTasks();
}

// Mark task as done
function toggleDone(event) {
  const taskList = document.getElementById("taskList");
  const task = event.target.parentNode;
  const taskId = parseInt(task.getAttribute("data-id"));
  const taskIndex = tasks.findIndex(task => task.id === taskId);

 tasks[taskIndex].done = !tasks[taskIndex].done;
task.classList.toggle("done");
saveTasks();
}

// Render tasks to list
function renderTasks() {
const taskList = document.getElementById("taskList");
taskList.innerHTML = "";
for (const task of tasks) {
const li = document.createElement("li");
li.setAttribute("data-id", task.id);
li.innerText = task.description;
if (task.done) {
li.classList.add("done");
}
const deleteButton = document.createElement("button");
deleteButton.innerText = "Delete";
deleteButton.addEventListener("click", deleteTask);
const toggleDoneButton = document.createElement("button");
toggleDoneButton.innerText = "Done";
toggleDoneButton.addEventListener("click", toggleDone);
li.appendChild(deleteButton);
li.appendChild(toggleDoneButton);
taskList.appendChild(li);
}
}

// Add event listeners to buttons
const addButton = document.getElementById("addButton");
addButton.addEventListener("click", addTask);

const deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", () => {
tasks = tasks.filter(task => !task.done);
renderTasks();
saveTasks();
});
