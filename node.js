// Initialize taskList from localStorage or as an empty array
let taskList = JSON.parse(localStorage.getItem("taskList")) || [];

function saveTasks() {
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

function createTask() {
  const task = document.querySelector("#task").value;

  if (task.trim() === "") {
    alert("Please enter a task.");
    return;
  }

  let payload = { taskName: task };
  taskList.push(payload);
  saveTasks();
  readTask();
  document.querySelector("#task").value = "";
}

function readTask() {
  let statement = "";
  taskList.forEach((value, index) => {
    let data = `<tr>
                <td>${index + 1}</td>
                <td>${value.taskName}</td>
                <td class="action-buttons">
                    <button class="edit-button" onclick="updateTask(${index})">Edit</button>
                    <button class="delete-button" onclick="deleteTask(${index})">Delete</button>
                </td>
            </tr>`;
    statement += data;
  });
  document.querySelector("#displaytask").innerHTML = statement;
}

function updateTask(itemNUM) {
  const btn = document.querySelector("#todoBtn");
  btn.innerHTML = "Save";
  btn.setAttribute("onclick", `editTask(${itemNUM})`);
  document.querySelector("#task").value = taskList[itemNUM].taskName;
}

function editTask(itemNUM) {
  const newTask = document.querySelector("#task").value;
  if (newTask.trim() === "") {
    alert("Please enter a task.");
    return;
  }

  taskList[itemNUM].taskName = newTask;
  saveTasks();
  readTask();
  const btn = document.querySelector("#todoBtn");
  btn.innerHTML = "Add";
  btn.setAttribute("onclick", "createTask()");
  document.querySelector("#task").value = "";
}

function deleteTask(itemNUM) {
  taskList.splice(itemNUM, 1);
  saveTasks();
  readTask();
}

// Load tasks on page load
window.onload = function () {
  readTask();
};
