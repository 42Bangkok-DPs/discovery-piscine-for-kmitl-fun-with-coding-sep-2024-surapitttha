$(document).ready(function() {
    function loadTodos() {
        const todos = getCookie('todos');
        if (todos) {
            const todoArray = JSON.parse(decodeURIComponent(todos));  // Decode ข้อมูลจากคุกกี้
            todoArray.forEach(todo => addTodoToDOM(todo, false));  // โหลดรายการจากคุกกี้
        }
    }

    function saveTodos() {
        const todoItems = [];
        $('#ft_list .todo-item').each(function() {
            todoItems.unshift($(this).text());  // ใช้ unshift เพื่อเก็บรายการในลำดับล่าสุดอยู่ด้านบน
        });
        setCookie('todos', encodeURIComponent(JSON.stringify(todoItems)), 7);  // Encode ข้อมูลก่อนบันทึก
    }

    // Add a new to-do item to the DOM
    function addTodoToDOM(todoText, isNew = true) {
        if (todoText) {
            const todoItem = $('<div>').addClass('todo-item').text(todoText);
            $('#ft_list').prepend(todoItem);  // เพิ่มรายการใหม่ด้านบนสุดเสมอ
        }
    }

    // Set a cookie with a name, value, and expiration days
    function setCookie(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = `expires=${date.toUTCString()};`;
        }
        document.cookie = `${name}=${value};${expires}path=/`;
    }

    // Get a cookie value by name
    function getCookie(name) {
        const nameEQ = `${name}=`;
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Handle click event for 'New' button
    $('#new-btn').click(function() {
        const newTodo = prompt('Enter a new to-do:');
        if (newTodo && newTodo.trim()) {
            addTodoToDOM(newTodo.trim());
            saveTodos();  // บันทึกรายการหลังจากเพิ่มใหม่
        }
    });

    $('#ft_list').on('click', '.todo-item', function() {
        const todoText = $(this).text();
        if (confirm(`Are you sure you want to remove "${todoText}"?`)) {
            $(this).remove();
            saveTodos();  // บันทึกรายการใหม่หลังจากลบ
        }
    });

    loadTodos();  // โหลดรายการเมื่อเริ่มต้น
});
