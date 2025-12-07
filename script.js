document.addEventListener('DOMContentLoaded', () => {

    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = [];

    function createTaskElement(taskText, save = true) {
        const li = document.createElement('li'); // Create list item
        li.textContent = taskText;

        const removeBtn = document.createElement('button'); // Create remove button
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn'); // Use classList.add instead of className

        removeBtn.onclick = () => {
            taskList.removeChild(li);
            tasks = tasks.filter(task => task !== taskText); // Remove from array
            localStorage.setItem('tasks', JSON.stringify(tasks)); // Update Local Storage
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (save) {
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }
        createTaskElement(taskText); 
        taskInput.value = ""; 
    }

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = storedTasks;
        storedTasks.forEach(taskText => createTaskElement(taskText, false)); 
    }

    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    loadTasks();
});
