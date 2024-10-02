const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");

// Load existing todos from local storage
const storedTodos = localStorage.getItem("todos");
if (storedTodos) {
  const todos = JSON.parse(storedTodos);
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    if (todo.completed) {
      li.classList.add("completed");
    }
    todoList.appendChild(li);
    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      updateLocalStorage();
    });
  });
}

addTodoBtn.addEventListener("click", () => {
  const todoText = todoInput.value;
  if (todoText) {
    const li = document.createElement("li");
    li.textContent = todoText;
    todoList.appendChild(li);
    todoInput.value = "";

    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      updateLocalStorage();
    });

    updateLocalStorage();
  }
});

function updateLocalStorage() {
  const todos = [];
  todoList.childNodes.forEach((li) => {
    const todo = {
      text: li.textContent,
      completed: li.classList.contains("completed"),
    };
    todos.push(todo);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
