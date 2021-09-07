// selector
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".input-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");



//Event listener
document.addEventListener('DOMContentLoaded',getTodoos)
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodos);



//  Function
function addTodo(event) {
  //prevent default off of button
  event.preventDefault();

  //todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //add todos to localstorage
  saveLocalTodos(todoInput.value)

  //Check Mark Button
  const completeButton = document.createElement("button");
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);

  //Check trush Button
  const trushButton = document.createElement("button");
  trushButton.innerHTML = '<i class="fas fa-trash"></i>';
  trushButton.classList.add("trush-btn");
  todoDiv.appendChild(trushButton);

  //Append todo list
  todoList.appendChild(todoDiv);
  todoInput.value = "";
}




function deleteCheck(e) {
  //Delete
  const item = e.target;
  if (item.classList[0] === "trush-btn") {
    let todo = item.parentElement;
    //Animationed
    todo.classList.add("fall");
    removeLocalStoragee(todo)
    setTimeout(() => {
      todo.remove();
    }, 500);
  }

  //Check
  if (item.classList[0] === "complete-btn") {
    let todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}




function filterTodos(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all": 
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        }else{
            todo.style.display = 'none'
        }
        break;
      case "uncompleted ":
        if (!todo.classList.contains("completed")){
          todo.style.display = "none";
        }else{
            todo.style.display = 'flex'
        }
        break;
    }
  });
}

function saveLocalTodos(todo){
    //Hav do i already have thing there?
    let todos
    if(localStorage.getItem('todos') === null){
        todos =[]
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos',JSON.stringify(todos))
}




function getTodoos(){
    let todos
    if(localStorage.getItem('todos') === null){
        todos =[]
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    ;todos.forEach(function(todo){
                //todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerText = todo; 
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        
        //Check Mark Button
        const completeButton = document.createElement("button");
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.classList.add("complete-btn");
        todoDiv.appendChild(completeButton);

        //Check trush Button
        const trushButton = document.createElement("button");
        trushButton.innerHTML = '<i class="fas fa-trash"></i>';
        trushButton.classList.add("trush-btn");
        todoDiv.appendChild(trushButton);

        //Append todo list
        todoList.appendChild(todoDiv);
        todoInput.value = "";
            })
};





function removeLocalStoragee(todo){
        let todos
        if(localStorage.getItem('todos') === null){
            todos =[]
        }else{
            todos = JSON.parse(localStorage.getItem('todos'))
        }

        let todoIndex = todo.children[0].innerText
        todos.splice(todos.indexOf(todoIndex),1)
        localStorage.setItem('todos',JSON.stringify(todos))
}
