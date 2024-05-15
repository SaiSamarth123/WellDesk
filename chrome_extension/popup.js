document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  const addTaskButton = document.getElementById("addTaskButton");
  const clearTasksButton = document.getElementById("clearTasksButton");
  const timerDisplay = document.getElementById("timerDisplay");
  const startTimerButton = document.getElementById("startTimerButton");
  const resetTimerButton = document.getElementById("resetTimerButton");
  const pomodoroMinutesInput = document.getElementById("pomodoroMinutes");

  let timer;
  let isActive = false;
  let seconds = parseInt(pomodoroMinutesInput.value) * 60;

  addTaskButton.addEventListener("click", function () {
    const task = taskInput.value;
    if (task) {
      chrome.storage.sync.get(["tasks"], function (result) {
        const tasks = result.tasks || [];
        fetchTaskData(task).then((taskData) => {
          tasks.push(taskData);
          prioritizeTasks(tasks);
        });
      });
    }
  });

  clearTasksButton.addEventListener("click", function () {
    chrome.storage.sync.set({ tasks: [] }, function () {
      renderTasks([]);
    });
  });

  function renderTasks(tasks) {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const taskItem = document.createElement("li");
      taskItem.textContent = `${task.title} (Priority: ${task.priority}, Time: ${task.time_estimate} mins)`;
      taskList.appendChild(taskItem);
    });
  }

  function fetchTaskData(task) {
    return new Promise((resolve, reject) => {
      fetch(
        `https://api.example.com/taskinfo?query=${encodeURIComponent(task)}`
      )
        .then((response) => response.json())
        .then((data) => {
          const taskData = {
            title: task,
            priority: data.priority || 3, // Default priority if not available
            time_estimate: data.time_estimate || 25, // Default time estimate if not available
          };
          resolve(taskData);
        })
        .catch((error) => reject(error));
    });
  }

  function prioritizeTasks(tasks) {
    fetch("http://127.0.0.1:5000/prioritize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tasks }),
    })
      .then((response) => response.json())
      .then((prioritizedTasks) => {
        chrome.storage.sync.set({ tasks: prioritizedTasks }, function () {
          renderTasks(prioritizedTasks);
        });
      })
      .catch((error) => console.error("Error:", error));
  }

  chrome.storage.sync.get(["tasks"], function (result) {
    renderTasks(result.tasks || []);
  });

  startTimerButton.addEventListener("click", function () {
    if (isActive) {
      clearInterval(timer);
      startTimerButton.textContent = "Start";
    } else {
      timer = setInterval(() => {
        seconds--;
        if (seconds <= 0) {
          clearInterval(timer);
          alert("Time is up!");
          seconds = parseInt(pomodoroMinutesInput.value) * 60;
        }
        updateTimerDisplay();
      }, 1000);
      startTimerButton.textContent = "Pause";
    }
    isActive = !isActive;
  });

  resetTimerButton.addEventListener("click", function () {
    clearInterval(timer);
    seconds = parseInt(pomodoroMinutesInput.value) * 60;
    updateTimerDisplay();
    startTimerButton.textContent = "Start";
    isActive = false;
  });

  pomodoroMinutesInput.addEventListener("change", function () {
    seconds = parseInt(pomodoroMinutesInput.value) * 60;
    updateTimerDisplay();
  });

  function updateTimerDisplay() {
    const minutes = Math.floor(seconds / 60);
    const secondsDisplay = seconds % 60;
    timerDisplay.textContent = `${minutes}:${
      secondsDisplay < 10 ? "0" + secondsDisplay : secondsDisplay
    }`;
  }

  updateTimerDisplay();
});
