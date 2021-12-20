//declaring variable

const todoInput = document.querySelector(".todo-input");
const addItemBtn = document.querySelector(".add-item");
const listsContainer = document.querySelector(".lists-container");
const todofilter = document.querySelector(".filter-todo");

//TO DO LIST EVENT LISTENERS

window.addEventListener("DOMContentLoaded",setupitems)
addItemBtn.addEventListener("click",addToDo);
todofilter.addEventListener("click",filterToDo);


function addToDo(e){
   
    e.preventDefault();
    let value = todoInput.value;
    if(value===""){
        return;
    }
    // TODOLIST IS THE MAIN LIST WHICH IS SINGLE THA WE ARE ADDING..

    const todolist = document.createElement("div");
    todolist.classList.add("todo-list");
    let list = document.createElement("li");
    todolist.appendChild(list);
    let checkBtn = document.createElement("button");
    checkBtn.classList.add("btn-1")
   
    checkBtn.innerHTML='<i class="fas fa-check"></i>';
    todolist.appendChild(checkBtn);
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn-2")
    deleteBtn.innerHTML='<i class="fas fa-trash-alt"></i>';
    todolist.appendChild(deleteBtn);
   
    
    listsContainer.appendChild(todolist);
    
    list.textContent=value;
    addTolocalStorage(value);

   

    //adding event listeners to the delete and trash buttons
    
    const completedTaskBtn = todolist.querySelector(".btn-1");
    completedTaskBtn.addEventListener("click",()=>{
        todolist.classList.toggle("active");
    });
    

    const deleteTask = todolist.querySelector(".btn-2");
    deleteTask.addEventListener("click",()=>{
        todolist.classList.add("delete-animation");
       
      
       
        todolist.addEventListener("transitionend",()=>{
            
            todolist.remove();
            removeFromLocalstorage(value);
           
           
        })
    });
       
    
    filterToDo(e,todolist)
    todoInput.value="";
   
    

   
   
    
}

function filterToDo(e){
    let todos = listsContainer.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display="flex";
                break;
            case "completed":
                if(todo.classList.contains("active")){
                    todo.style.display="flex";
                }
                else{
                    todo.style.display="none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("active")){
                    todo.style.display="flex";
                }
                else{
                    todo.style.display="none";
                }
                break;

        }
    })
}

//for addinf the todos to localstorage
function addTolocalStorage(value){
    let todos ={value};
    let items = getLocalTodoitems();
    items.push(todos);
    localStorage.setItem("todo",JSON.stringify(items));
   items.push(todos);
  
   
}


function getLocalTodoitems(){
    return localStorage.getItem("todo")?JSON.parse(localStorage.getItem("todo")):[];
}

//function for removing todos from local storage
function removeFromLocalstorage(value){
    let items = getLocalTodoitems();
    items=items.filter(function(item){
        if(item.value!==value){
            return item;
        }
        
    })
    localStorage.setItem("todo",JSON.stringify(items));
}


function setupitems(){
    let items = getLocalTodoitems();
    if(items.length>0){
        items.forEach(function(item){
            createListItem(item.value);
    })
    }
}

function createListItem(value){
    console.log("inside the func=tion")
   
  

    const todolist = document.createElement("div");
    todolist.classList.add("todo-list");
    let list = document.createElement("li");
    todolist.appendChild(list);
    let checkBtn = document.createElement("button");
    checkBtn.classList.add("btn-1")
   
    checkBtn.innerHTML='<i class="fas fa-check"></i>';
    todolist.appendChild(checkBtn);
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn-2")
    deleteBtn.innerHTML='<i class="fas fa-trash-alt"></i>';
    todolist.appendChild(deleteBtn);
   
    
    listsContainer.appendChild(todolist);
    
    list.textContent=value;
  

   

    //adding event listeners to the delete and trash buttons
    
    const completedTaskBtn = todolist.querySelector(".btn-1");
    completedTaskBtn.addEventListener("click",()=>{
        todolist.classList.toggle("active");
    });
    

    const deleteTask = todolist.querySelector(".btn-2");
    deleteTask.addEventListener("click",()=>{
        todolist.classList.add("delete-animation");
       
      
       
        todolist.addEventListener("transitionend",()=>{
            
            todolist.remove();
            removeFromLocalstorage(value)
           
           
           
        })
    });
        
}


