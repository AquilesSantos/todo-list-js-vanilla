const taskTemplate = (id, description) => ({ id, description, status: 'todo' });

const createNewTask = (content, id, status) => {
  const newTask = createElement('li');
  setAttributes(newTask, { 'id': id });
  classListAdd(newTask, ['list-todo-item']);

  const createTaskDescription = () => {
    const descriptionContainer = createElement('div');
    classListAdd(descriptionContainer, ['task-description']);

    const description = createElement('p');
    description.textContent = content;

    appendChild(descriptionContainer, description);
    appendChild(newTask, descriptionContainer);
  }

  const createTaskStatusButtons = () => {
    const statusButtonsName = ['todo', 'inprogress', 'done'];

    for (let buttonName of statusButtonsName) {
      let taskStatusButtonsContainer = createElement('div');
      classListAdd(taskStatusButtonsContainer, ['task-status-buttons-container']);

      let buttonCheckbox = createElement('input');
      setAttributes(buttonCheckbox, { "type": "radio", "name": `radio-${id}`, 'id': `${buttonName}-${id}` });
      classListAdd(buttonCheckbox, ['button-radio', 'option-input', 'checkbox'])
      buttonCheckbox.addEventListener('change', setTaskStatus);

      let buttonLabel = createElement('label');
      setAttributes(buttonLabel, { 'for': `${buttonName}-${id}` });
      buttonLabel.textContent = buttonName;

      appendChild(taskStatusButtonsContainer, buttonCheckbox);
      appendChild(taskStatusButtonsContainer, buttonLabel);
      appendChild(newTask, taskStatusButtonsContainer);

      if (!status && buttonName === 'todo')
        buttonCheckbox.checked = true;
      else {
        switch (status) {
          case 'todo':
            if (buttonCheckbox.id.slice(0, -2) === 'todo')
              buttonCheckbox.checked = true;
            break
          case 'inprogress':
            if (buttonCheckbox.id.slice(0, -2) === 'inprogress')
              buttonCheckbox.checked = true;
            break
          case 'done':
            if (buttonCheckbox.id.slice(0, -2) === 'done')
              buttonCheckbox.checked = true;
            break
        }
      }
    }
  }

  const addTrashCanIcon = () => {
    if (status !== 'done') {
      let trashCanIcon = createElement('img');
      setAttributes(trashCanIcon, { 'src': '../img/trash-can.png' })
      classListAdd(trashCanIcon, ['trash-can-icon']);
      trashCanIcon.addEventListener('click', removeTask);

      appendChild(newTask, trashCanIcon);
    }
  }

  const renderNewTask = () => appendChild(querySelector('.list-todo-content'), newTask);

  createTaskDescription();
  createTaskStatusButtons();
  addTrashCanIcon();
  renderNewTask();
  querySelector('.empty-list').style.opacity = 0;
}

const setTaskStatus = (e) => {
  const toDoList = getSession('toDoList');
  const target = e.target;
  const parentNode = target.parentNode.parentNode;

  if (toDoList && toDoList.length > 0) {
    const task = toDoList.filter(task => task.id == target.id.slice(-1));
    task.filter(i => i.status = target.id.slice(0, -2));
    setSession('toDoList', toDoList);
  }

  if (target.checked && getPathName().includes('done')) {
    fadeOut(parentNode);

    setTimeout(() => parentNode.remove(), 300);

    if (!toDoList.some(i => i.status === 'done'))
      fadeOut(querySelector('.empty-list'));
  }

  if (target.checked && getPathName().includes('todo') && target.id.slice(0, -2) === 'done') {
    fadeOut(parentNode);

    setTimeout(() => parentNode.remove(), 300);

    if (!toDoList.some(i => (i.status === 'todo' || i.status === 'inprogress')))
      fadeOut(querySelector('.empty-list'));
  }
}

const getToDoList = () => {
  if (getSession('toDoList') && getSession('toDoList').length > 0)
    return getSession('toDoList');
}

const postToDoList = (toDoList) => setSession('toDoList', toDoList);

const removeTask = (e) => {
  let toDoList = getSession('toDoList');
  toDoList = toDoList.filter(tasks => (tasks.id != e.target.parentNode.id));
  setSession('toDoList', toDoList);

  fadeOut(e.target.parentNode);
  setTimeout(() => e.target.parentNode.remove(), 500);

  if (!getSession('toDoList').length)
    fadeOut(querySelector('.empty-list'));

  if (toDoList.every(task => task.status === 'done'))
    fadeOut(querySelector('.empty-list'));
}

const typeWrite = (el) => {
  const arrayText = el.innerHTML.split('');
  el.innerHTML = '';
  arrayText.forEach((letter, i) => setTimeout(() => el.innerHTML += letter, 75 * i));
}

const validateCharacterLimit = (el) => {
  el.addEventListener('keyup', (e) => {
    if (e.target.value.length > 29)
      querySelector('.error-message-limit').style.display = 'block';
    else
      querySelector('.error-message-limit').style.display = 'none';
  });
}

const collapsToDo = () => {
  let isOpen = true;
  querySelector('.fa-chevron-down').addEventListener('click', () => {
    isOpen = !isOpen;

    if (isOpen) {
      querySelector('.fa-chevron-down').style.transform = ('rotate(180deg)');
      querySelector('.collapse-todo-content').style.display = 'block';
    }
    else {
      querySelector('.fa-chevron-down').style.transform = ('rotate(360deg)');
      querySelector('.collapse-todo-content').style.display = 'none';
    }
  })
}