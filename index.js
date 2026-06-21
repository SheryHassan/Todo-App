// =====================
// 1. البيانات الأساسية (Source of truth)
// =====================
let tasks = [];

const input = document.querySelector("#todo-input");
const todosContainer = document.querySelector(".todo-list");


// =====================
// 2. إضافة Todo (بيانات فقط بدون DOM)
// =====================
const addTasks = (text) => {
  tasks.push({ text, completed: false });

  // بعد الإضافة نعيد الرسم
  renderTasks();
};


// =====================
// 3. إدخال من الكيبورد (Enter)
// =====================
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    let value = input.value;

    if (value.trim() === "") return;

    addTasks(value);
    input.value = "";
  }
});


// =====================
// 4. عرض المهام (Render / UI فقط)
// =====================
function renderTasks(filter = "all") {

  // نمسح الشاشة قبل إعادة الرسم
  todosContainer.innerHTML = "";

  // نمشي على كل المهام
  tasks.forEach((task, index) => {

    // فلترة Active (غير مكتمل)
    if (filter === "active" && task.completed) return;

    // فلترة Completed (مكتمل فقط)
    if (filter === "completed" && !task.completed) return;

    // =====================
    // إنشاء عنصر Todo
    // =====================
    let todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");



////////////////
let checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.checked = task.completed;

checkbox.addEventListener("change", () => {
  task.completed = checkbox.checked;
  renderTasks(filter);
});

    // نص المهمة
    let label = document.createElement("label");
    label.textContent = task.text;
if (task.completed) {
  todoItem.classList.add("completed");
}
    // زر الحذف
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";

    // حذف المهمة من array
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      renderTasks(filter);
    });

    // تجميع العناصر
    todoItem.append(checkbox, label, deleteBtn);

    // إضافة للصفحة
    todosContainer.append(todoItem);
  });
}


// =====================
// 5. أزرار الفلاتر
// =====================

// عرض الكل
document.getElementById("all-items").addEventListener("click", () => {
  renderTasks("all");
});

// المهام غير المكتملة
document.getElementById("active-items").addEventListener("click", () => {
  renderTasks("active");
});

// المهام المكتملة
document.getElementById("completed-items").addEventListener("click", () => {
  renderTasks("completed");
});