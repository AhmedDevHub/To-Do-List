// Save the list of todos to local storage
function updateLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Load the todos from local storage and display them on the page
function loadTodos() {
    // Get the todos from local storage or initialize with an empty array
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todoList = document.getElementById('todo-list');
    
    // Clear the current list on the page
    todoList.innerHTML = '';

    // Loop through each todo and create table rows to display them
    todos.forEach((todo, index) => {
        const tr = document.createElement('tr');

        // Create and append the task name cell
        const tdTask = document.createElement('td');
        tdTask.textContent = todo.task;
        tr.appendChild(tdTask);

        // Create and append the status badge cell
        const tdStatus = document.createElement('td');
        const statusBadge = document.createElement('span');
        statusBadge.className = todo.completed ? 'status-badge status-completed' : 'status-badge status-pending';
        statusBadge.textContent = todo.completed ? 'Completed' : 'Pending';
        
        // Toggle completion status when the badge is clicked
        statusBadge.onclick = () => {
            todo.completed = !todo.completed; // Toggle completed state
            updateLocalStorage(todos);        // Save updated todos
            loadTodos();                      // Refresh the list
        };
        tdStatus.appendChild(statusBadge);
        tr.appendChild(tdStatus);

        // Create and append the delete button cell
        const tdClose = document.createElement('td');
        const closeBtn = document.createElement('span');
        closeBtn.className = 'btn-delete';
        closeBtn.innerHTML = '<i class="fas fa-trash"></i>';
        
        // Delete the todo when the button is clicked
        closeBtn.onclick = () => {
            todos.splice(index, 1);          // Remove the todo from the array
            updateLocalStorage(todos);       // Save updated todos
            loadTodos();                     // Refresh the list
        };
        tdClose.appendChild(closeBtn);
        tr.appendChild(tdClose);

        // Append the row to the todo list table
        todoList.appendChild(tr);
    });
}

// Add a new todo when the "Add" button is clicked
document.getElementById('add-btn').onclick = () => {
    const todoInput = document.getElementById('todo-input');
    const newTask = todoInput.value.trim(); // Get the input value and trim whitespace

    if (newTask) { // Only add the todo if the input is not empty
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push({ task: newTask, completed: false }); // Add new todo to the list
        updateLocalStorage(todos); // Save updated todos
        loadTodos();               // Refresh the list
        todoInput.value = '';      // Clear the input field
    }
};

// Load the todos when the page is loaded
document.addEventListener('DOMContentLoaded', loadTodos);
