

const container = document.querySelector('.container');
var inputValue = document.querySelector('.input');
const addButton = document.querySelector('.add');
const url = "https://us-central1-javascript-todo-list.cloudfunctions.net/todoList/";

var todos = [];
addButton.addEventListener('click', addTodo);

function addTodo() {

    createTodo();
}

async function createTodo() {

    const newTodo = { todo: inputValue.value};
    console.log(newTodo);
    if(!newTodo.todo){
       
        return;
    }
 
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTodo)
        });
 
        if(response.ok){
            const body = await response.text();
            
            newTodo.id = body;
            console.log(body);
           
            todos.push(newTodo);
            console.log(todos);
           // new item(todos[0].todo);
           container.innerHTML = "";
           todos.forEach((todo) => {
            new item(todo.todo, todo.id);
        });
        
            
           
        } else{
            throw new Error(response.statusText);
        }
 
 
    } catch (err) {
        throw err;
    }
}

async function deleteTodo(id) {

    console.log("hej"+ id);
 
    try{
        const response = await fetch(url + id ,  {
            method: 'DELETE',
        
        });
 
        if(response.ok){
            const body = await response.text();
            
            todos = todos.filter(todo => todo.id !== id);
           
            
           container.innerHTML = "";
           todos.forEach((todo) => {
            new item(todo.todo, todo.id);
        });
        
        
            
           
        } else{
            throw new Error(response.statusText);
        }
 
 
    } catch (err) {
        throw err;
    }
}



class item{
	constructor(name, id){
		this.createItem(name, id);
	}
  createItem(name, id){
    	var itemBox = document.createElement('div');
        itemBox.classList.add('item');
        itemBox.id = id;
        

    	var input = document.createElement('input');
    	input.type = "text";
    	input.disabled = true;
    	input.value = name;
    	input.classList.add('item_input');

    	var edit = document.createElement('button');
    	edit.classList.add('edit');
    	edit.innerHTML = "EDIT";
    	edit.addEventListener('click', () => this.edit(input, name));

    	var remove = document.createElement('button');
    	remove.classList.add('remove');
        remove.innerHTML = "REMOVE";
        remove.id = id
        remove.addEventListener('click', () => this.remove(itemBox, name, id));
        //remove.onclick(deleteTodo(this.id));
        

    	container.appendChild(itemBox);

        itemBox.appendChild(input);
        itemBox.appendChild(edit);
        itemBox.appendChild(remove);

    }

    edit(input, name){
        if(input.disabled == true){
           input.disabled = !input.disabled;
        }
    	else{
            input.disabled = !input.disabled;
            let indexof = todos.indexOf(name);
            todos[indexof] = input.value;
           
        }
    }

    remove(itemBox, name, id){
        
        itemBox.parentNode.removeChild(itemBox);
        let index = todos.indexOf(name);
        todos.splice(index, 1);
        deleteTodo(id);
        container.innerHTML = "";
        todos.forEach((todo) => {
         new item(todo.todo, todo.id);
     });
     
        
    }
}


