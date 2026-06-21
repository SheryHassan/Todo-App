// عند الضغط على Enter يتم التقاط قيمة الـ input والتأكد إنها مش فاضية قبل إضافة Todo جديد
const inputButtonAddToDo = document.querySelector("#todo-input");

inputButtonAddToDo.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    let userInput = inputButtonAddToDo.value;

    if (userInput.trim() === "") {
      return;
    }

    addTasks(userInput);

    inputButtonAddToDo.value = "";
  }
});


// تجهيز مكان تخزين المهام
let tasks = [];

const todosContainer = document.querySelector(".todo-list");

// إضافة مهمة جديدة + عرضها
const addTasks = (task) => {
  tasks.push({text:task,completed:false});

  let newtask = document.createElement("div");
  newtask.classList.add("todo-item");

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  //لو checkbox متعلم عليه عند الضغط يشيل العلامه والعكس 
  checkbox.addEventListener("change",()=>{
   newtask.classList.toggle("completed")
  });

  let label = document.createElement("label");
  label.textContent = task;
//الزر المسؤل عن حذف المهمه
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "x";



  newtask.append(checkbox);
  newtask.append(label);
  newtask.append(deleteButton);

  todosContainer.append(newtask);
//حذف المهمه
  deleteButton.addEventListener("click", () => {
    newtask.remove();
  });
};

