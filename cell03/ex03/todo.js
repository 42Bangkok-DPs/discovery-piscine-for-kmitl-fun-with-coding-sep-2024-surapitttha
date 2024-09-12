function getTodosFromCookie() {
    let cookies = document.cookie.split(';').find(cookie => cookie.trim().startsWith('todos='));
    return cookies ? JSON.parse(cookies.split('=')[1]) : [];
}

function saveTodosToCookie(todos) {
    document.cookie = 'todos=' + JSON.stringify(todos) + '; path=/';
}

function displayTodos() {
    const ft_list = document.getElementById('ft_list');
    ft_list.innerHTML = '';  
    let todos = getTodosFromCookie();
    todos.forEach(todo => {
        let todoDiv = document.createElement('div');
        todoDiv.className = 'todo-item';
        todoDiv.textContent = todo;
        todoDiv.onclick = function() {
            if (confirm('Do you want to remove this To-Do?')) {
                removeTodo(todo);
            }
        };
        ft_list.appendChild(todoDiv);
    });
}

function addTodo(todo) {
    let todos = getTodosFromCookie();
    todos.unshift(todo);  
    saveTodosToCookie(todos);
    displayTodos();
}

function removeTodo(todo) {
    let todos = getTodosFromCookie();
    todos = todos.filter(t => t !== todo);  
    saveTodosToCookie(todos);  
    displayTodos();  // แสดงรายการที่อัปเดตใหม่
}

document.getElementById('new-btn').onclick = function() {
    let newTodo = prompt('Enter a new To-Do:');
    if (newTodo) {
        addTodo(newTodo);
    }
};

displayTodos();
