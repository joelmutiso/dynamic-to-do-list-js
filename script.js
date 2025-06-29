document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // 'false' prevents saving again during load
        });
    }

    // Save all current tasks in the DOM to Local Storage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(li => {
            const text = li.firstChild.textContent.trim();
            if (text) tasks.push(text);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add task to DOM (and optionally to Local Storage)
    function addTask(taskText, save = true) {
        if (!taskText.trim()) {
            alert('Please enter a task.');
            return;
        }

        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        removeButton.onclick = function () {
            listItem.remove();
            saveTasks();
        };

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        if (save) saveTasks();

        taskInput.value = '';
    }

    // Add task button click
    addButton.addEventListener('click', () => {
        addTask(taskInput.value);
    });

    // Enter key adds task
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    // Initialize task list
    loadTasks();
});