const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const postItContainer = document.getElementById('postItContainer');
const taskForm = document.getElementsByTagName('form')[0];
refreshUI();

/**
 * Add a task to local storage.
 * @param {string} description - Task Description.
 * @param {Date} date - Task due date.
 * @param time - Task time due.
 * @return {number} - The index of the task in the array (the last elemts).
 */
function addTaskValue(description, date, time = null) {
    let tasks = localStorage.getItem('tasks');
    tasks = tasks ? JSON.parse(tasks) : [];
    tasks.push({ description, date, time });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return tasks.length - 1;
}

/**
 * Remove the task by his index in the tasks array
 * @param {number} taskId - The index in the array of tasks.
 */
function removeTaskValue(taskId) {
    let tasks = localStorage.getItem('tasks');
    tasks = tasks ? JSON.parse(tasks) : [];
    tasks = tasks.filter((item, index) => index !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

/**
 * Append to the UI a task with a post it.
 * @param {number} index - Index of the task in the array of task.
 * @param {{description, date, time}} elemt - The task element.
 */
function showTasks(index, elemt) {
    const node = `<div class="col-12 col-md-3 post-it p-5 pl-0 fade-in" onmouseenter="showCloseButton(${index})" onmouseleave="hideCloseButton(${index})">
            <p class="p-2 pl-0"><span class="close-icns glyphicon glyphicon-remove"  data-id="${index}" onclick="removeTask(${index})"></span>
                ${elemt.description}
            </p>
            <p>"date:"${elemt.date} "hour:"${elemt.time || ''}</p>

        </div>`;
    postItContainer.innerHTML = postItContainer.innerHTML + node;
}

/**
 * Hide a post it from the UI.
 * @param id - The id of the task in the array.
 */
function hideTasks(id) {
    const node = postItContainer.querySelector(`span[data-id="${id}`);
    if (!node)
        return;
    node.parentNode.parentNode.classList.add('fade-out');
}

/**
 * Global function to add task.
 * @param description
 * @param date
 * @param time
 */
function addTask(description, date, time = null) {
    const taskIndex = addTaskValue(description, date, time); // Add to the localstorage.
    showTasks(taskIndex, { description, date, time }); // Add to the UI.
}

/**
 * Global function to remove task.
 * @param id
 */
function removeTask(id) {
    removeTaskValue(id); // Remove from the localstorage.
    hideTasks(id); // Remove from the UI.
}

/**
 * Helper function to refresh and init the UI.
 */
function refreshUI() {
    tasks.forEach((item, index) => showTasks(index, item));
}

function showCloseButton(id) {
    const node = postItContainer.querySelector(`span[data-id="${id}`);
    if (!node) return;
    node.style.display = "inline";
}

function hideCloseButton(id) {
    const node = postItContainer.querySelector(`span[data-id="${id}`);
    if (!node) return;
    node.style.display = "none";
}
/**
 * Listener - Handle form Submit
 */
taskForm.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent submiting and reloading the page.
    // Getting form values
    const description = document.getElementById('taskData').value;
    const date = document.getElementById('taskDate').value;
    const time = document.getElementById('taskTime').value;
    if (description && date) {
        addTask(description, date, time); // Adding tasks
    }
});

