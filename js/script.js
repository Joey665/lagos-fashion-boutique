(function () {
  const body = document.body;
  const currentPage = body.dataset.page;

  const state = {
    tasks: [
      { id: 1, text: "Complete COS106 Assignment", completed: false },
      { id: 2, text: "Study for Mathematics Test", completed: false },
      { id: 3, text: "Submit Project Report", completed: false }
    ]
  };

  function renderTasks() {
    const taskList = document.getElementById("task-list");
    if (!taskList) {
      return;
    }

    taskList.innerHTML = "";

    state.tasks.forEach((task) => {
      const item = document.createElement("li");
      item.className = "task-item";

      const meta = document.createElement("div");
      meta.className = "task-meta";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "task-checkbox";
      checkbox.checked = task.completed;
      checkbox.setAttribute("aria-label", `Mark ${task.text} as completed`);

      const text = document.createElement("span");
      text.className = `task-text${task.completed ? " completed" : ""}`;
      text.textContent = task.text;

      checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        renderTasks();
      });

      meta.append(checkbox, text);

      const actions = document.createElement("div");
      actions.className = "task-actions";

      const completeButton = document.createElement("button");
      completeButton.type = "button";
      completeButton.className = "small-button complete";
      completeButton.textContent = task.completed ? "Undo" : "Completed";
      completeButton.addEventListener("click", () => {
        task.completed = !task.completed;
        renderTasks();
      });

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "small-button delete";
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        state.tasks = state.tasks.filter((entry) => entry.id !== task.id);
        renderTasks();
      });

      actions.append(completeButton, deleteButton);
      item.append(meta, actions);
      taskList.append(item);
    });
  }

  function setMessage(message, kind) {
    const messageTarget = document.getElementById("planner-message");
    if (!messageTarget) {
      return;
    }

    messageTarget.textContent = message;
    messageTarget.style.color = kind === "error" ? "var(--danger)" : "var(--success)";
  }

  function initializePlanner() {
    const form = document.getElementById("planner-form");
    const input = document.getElementById("task-input");

    if (!form || !input) {
      return;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = input.value.trim();

      if (!value) {
        setMessage("Please enter a task before adding it.", "error");
        return;
      }

      state.tasks.push({
        id: Date.now(),
        text: value,
        completed: false
      });

      input.value = "";
      setMessage("Task added successfully.", "success");
      renderTasks();
    });

    renderTasks();
  }

  function initializeContactForm() {
    const form = document.getElementById("contact-form");
    const messageTarget = document.getElementById("contact-message");

    if (!form || !messageTarget) {
      return;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const phone = document.getElementById("phone");
      const message = document.getElementById("message");

      if (!(name instanceof HTMLInputElement) || !(email instanceof HTMLInputElement) || !(phone instanceof HTMLInputElement) || !(message instanceof HTMLTextAreaElement)) {
        return;
      }

      const nameValue = name.value.trim();
      const emailValue = email.value.trim();
      const phoneValue = phone.value.trim();
      const messageValue = message.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const digitsOnly = /^\d+$/;

      if (!nameValue || !emailValue || !phoneValue || !messageValue) {
        messageTarget.textContent = "All fields are required.";
        messageTarget.style.color = "var(--danger)";
        return;
      }

      if (!emailPattern.test(emailValue)) {
        messageTarget.textContent = "Please enter a valid email address.";
        messageTarget.style.color = "var(--danger)";
        return;
      }

      if (!digitsOnly.test(phoneValue)) {
        messageTarget.textContent = "Phone number must contain digits only.";
        messageTarget.style.color = "var(--danger)";
        return;
      }

      messageTarget.textContent = "Message validated successfully. This is a student portfolio demo form.";
      messageTarget.style.color = "var(--success)";
      form.reset();
    });
  }

  if (currentPage === "planner") {
    initializePlanner();
  }

  if (currentPage === "contact") {
    initializeContactForm();
  }
})();
