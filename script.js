// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from Local Storage and display them
  loadTasks();

  // Function to add a task
  function addTask(taskText, save = true) {
    if (taskText === undefined) {
      taskText = taskInput.value.trim();
    }

    if (taskText === "") {
      alert('Please enter a task.');
      return;
    }

    // Create list item
    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    // Create remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-btn'); // Using classList.add as required

    // Remove task when button is clicked
    removeButton.onclick = function() {
      taskList.removeChild(listItem);
      saveTasks();
    };

    // Add button to list item, then list item to task list
    listItem.appendChild(removeButton);
    taskList.appendChild(listItem);

    // Save updated tasks to Local Storage if needed
    if (save) {
      saveTasks();
      taskInput.value = '';
    }
  }

  // Function to save all current tasks to Local Storage
  function saveTasks() {
    const tasks = [];
    const items = taskList.getElementsByTagName('li');
    for (let item of items) {
      // Remove the "Remove" button text, keep task text only
      const taskText = item.firstChild.textContent;
      tasks.push(taskText);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Function to load tasks from Local Storage on page load
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false));
  }

  // Add event listener to the "Add Task" button
  addButton.addEventListener('click', () => {
    addTask();
  });

  // Add event listener for 'Enter' key in task input
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});