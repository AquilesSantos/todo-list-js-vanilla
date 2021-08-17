const startApplication = () => {
  let taskId = 1;
  let toDoList = getToDoList() ? getToDoList() : [];
  const form = document.forms.registro;

  typeWrite(querySelector('h1'));

  collapsToDo();

  if (toDoList && toDoList.length > 0) {
    taskId = toDoList[toDoList.length - 1].id + 1;

    toDoList.every(task => {
      if (task.status !== 'todo')
        querySelector('.empty-list').style.opacity = 1;
    })

    for (let task of toDoList) {
      if (task.status !== 'done')
        createNewTask(task.description, task.id, task.status);
    }
  }
  else
    fadeOut(querySelector('.empty-list'));

  validateCharacterLimit(form.input);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    form.input.addEventListener('keydown', () => querySelector('.error-message').style.display = 'none');

    if (form.input.value && form.input.value.trim() !== '') {
      if (getToDoList() === undefined) {
        toDoList = [];
        taskId = 1;
      }
      else
        toDoList = getToDoList();

      toDoList.push(taskTemplate(taskId, form.input.value));

      querySelector('.error-message-limit').style.display = 'none';
      querySelector('.button-create-task').addEventListener('click', createNewTask(form.input.value, taskId));
      postToDoList(toDoList);
      taskId++;
    }
    else {
      querySelector('.error-message').style.display = 'block';
    }

    form.reset();
    form.input.focus();
  })
}

document.addEventListener('load', startApplication());