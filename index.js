// =====================
// 1. Global State
// =====================
let currentFilter = "all";
let draggedTaskId = null;

const input = document.querySelector("#todo-input");
const todosContainer = document.querySelector(".todo-list");
const themeToggle = document.getElementById("theme-toggle");

let tasks = JSON.parse(localStorage.getItem("myTodoList")) || [];

// =====================
// 2. Save to LocalStorage
// =====================
function saveTasks() {
  localStorage.setItem("myTodoList", JSON.stringify(tasks));
}

// =====================
// 3. Add Task
// =====================
function addTask(text) {
  tasks.push({
    id: Date.now(),
    text,
    completed: false
  });

  saveTasks();
  renderTasks();
}

// =====================
// 4. Input Event
// =====================
input.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;

  const value = input.value.trim();
  if (!value) return;

  addTask(value);
  input.value = "";
});

// =====================
// 5. Render Tasks
// =====================
function renderTasks() {
  todosContainer.innerHTML = "";

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  });

  filteredTasks.forEach(task => {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");

    // ⭐ Drag enabled
    todoItem.draggable = true;

    // dragstart
    todoItem.addEventListener("dragstart", () => {
      draggedTaskId = task.id;
    });

    // allow drop
    todoItem.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    // drop → reorder
    todoItem.addEventListener("drop", () => {
      const fromIndex = tasks.findIndex(t => t.id === draggedTaskId);
      const toIndex = tasks.findIndex(t => t.id === task.id);

      const [movedTask] = tasks.splice(fromIndex, 1);
      tasks.splice(toIndex, 0, movedTask);

      saveTasks();
      renderTasks();
    });

    // completed style
    if (task.completed) {
      todoItem.classList.add("completed");
    }

    // checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    // label
    const label = document.createElement("label");
    label.textContent = task.text;

    // delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";

    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    // append
    todoItem.append(checkbox, label, deleteBtn);
    todosContainer.append(todoItem);
  });
}

// =====================
// 6. Clear Completed
// =====================
function clearCompletedTasks() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
}

// =====================
// 7. Filters
// =====================
document.getElementById("all-items").addEventListener("click", () => {
  currentFilter = "all";
  renderTasks();
});

document.getElementById("active-items").addEventListener("click", () => {
  currentFilter = "active";
  renderTasks();
});

document.getElementById("completed-items").addEventListener("click", () => {
  currentFilter = "completed";
  renderTasks();
});

document
  .getElementById("clear-completed")
  .addEventListener("click", clearCompletedTasks);

// =====================
// 8. Theme
// =====================
let isDark = JSON.parse(localStorage.getItem("theme")) || false;

function updateTheme() {
  document.body.classList.toggle("dark", isDark);

  if (isDark) {
    themeToggle.src = "assets/images/icon-sun.svg";
  } else {
    themeToggle.src = "assets/images/icon-moon.svg";
  }

  localStorage.setItem("theme", JSON.stringify(isDark));
}

themeToggle.addEventListener("click", () => {
  isDark = !isDark;
  updateTheme();
});

// =====================
// Init
// =====================
renderTasks();
updateTheme();