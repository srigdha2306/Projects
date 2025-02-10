document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = storedTasks; // Fixed: Assign to the global tasks variable
  updateTasksList();
  updateStats();
});

let tasks = [];

const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTask = () => {
  const taskInput = document.getElementById('task-input');
  const text = taskInput.value.trim();

  if (text) { // Fixed: Changed 'test' to 'text'
      tasks.push({ text: text, completed: false });
      taskInput.value = "";
      updateTasksList();
      updateStats();
      saveTasks();
  }
};

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTasksList();
  updateStats();
  saveTasks();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveTasks();
};

const editTask = (index) => {
  const taskInput = document.getElementById('task-input'); // Fixed: Changed 'taskInput' to 'task-input'
  taskInput.value = tasks[index].text;
  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveTasks();
};

const updateStats = () => {
  const completeTasks = tasks.filter(task => task.completed).length; // Fixed: Typo in 'completeTasks'
  const totalTasks = tasks.length;
  const progress = totalTasks === 0 ? 0 : (completeTasks / totalTasks) * 100;
  const progressBar = document.getElementById('progress');
  progressBar.style.width = `${progress}%`;

  document.getElementById('numbers').innerHTML = `${completeTasks}/${totalTasks}`;

  if (tasks.length && completeTasks === totalTasks) {
      blastConfetti(); 
  }
};

const updateTasksList = () => {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
      const listItem = document.createElement('li');

      listItem.innerHTML = `
          <div class="taskItem">
              <div class="task ${task.completed ? 'completed' : ''}">
                  <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                  <p>${task.text}</p>
              </div>
              <div class="icons">
                  <span class="icon edit" onclick="editTask(${index})">✎</span>
                  <span class="icon delete" onclick="deleteTask(${index})">🗑️</span>
              </div>
          </div>
      `;

      const checkbox = listItem.querySelector('.checkbox');
      checkbox.addEventListener('change', () => toggleTaskComplete(index));
      
      taskList.appendChild(listItem);
  });
};


document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  addTask();
});

const blastConfetti = () => {
  const count = 200,
  defaults = {
      origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
      confetti(
          Object.assign({}, defaults, opts, {
              particleCount: Math.floor(count * particleRatio)
          })
      );
  }

  fire(0.25, {
      spread: 26,
      startVelocity: 55
  });

  fire(0.2, {
      spread: 60
  });

  fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
  });

  fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
  });

  fire(0.1, {
      spread: 120,
      startVelocity: 45
  });
};