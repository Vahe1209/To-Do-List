const parent = document.getElementById("list-group");
let tasks = [
  {
    name: "Task N1",
    completed: false,
  },
  {
    name: "Task N2",
    completed: false,
  },
  {
    name: "Task N3",
    completed: false,
  },
  {
    name: "Task N4",
    completed: false,
  },
  {
    name: "Task N5",
    completed: false,
  },
  {
    name: "Task N6",
    completed: false,
  },
];
document.addEventListener("DOMContentLoaded", function () {
  drawList(tasks);
  document.getElementById("countCompleted").innerHTML =
    tasks.length + ` items left`;
});

function showAll() {
  drawList(tasks);
}
function showActive() {
  const activeTasks = tasks.filter((task) => !task.completed);
  drawList(activeTasks);
}
function showCompleted() {
  const completedTasks = tasks.filter((task) => task.completed);
  drawList(completedTasks);
}

function clearCompleted() {
  tasks = tasks.filter((task) => !task.completed);
  drawList(tasks);
}

function drawList(newTasks) {
  if (document.getElementById("list-group")) {
    document.getElementById("list-group").innerHTML = "";
  }
  newTasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerHTML =
      `<input type="checkbox" class="myCheck" onClick="checkboxChange(${index})" ${
        task.completed && "checked"
      }>` +
      `<input type="text" onchange="changeInputValue(event, ${index})" value="${task.name}" />` +
      `<button class="btn btn-dark" onclick="deleteTask(${index})">X</button>`;
    parent.appendChild(li);
  });
}

document.getElementById("addTask").addEventListener("keypress", function (e) {
  if (e.keyCode === 13 && e.target.value != "") {
    let val = e.target.value;
    tasks.push({
      name: val,
      completed: false,
    });
    drawList(tasks);
    document.getElementById("countCompleted").innerHTML =
      tasks.filter((task) => !task.completed).length + ` items left`;
  }
});

function checkboxChange(index) {
  tasks[index].completed = !tasks[index].completed;
  document.getElementById("countCompleted").innerHTML =
    tasks.filter((task) => !task.completed).length + ` items left`;
}

function deleteTask(index) {
  tasks.splice(index, 1);
  drawList(tasks);
  document.getElementById("countCompleted").innerHTML =
    tasks.filter((task) => !task.completed).length + ` items left`;
}

function changeInputValue(event, index) {
  console.log(event, index);
  tasks = tasks.map((task, i) => {
    if (i === index) {
      task.name = event.target.value;
    }
    return task;
  });
}
