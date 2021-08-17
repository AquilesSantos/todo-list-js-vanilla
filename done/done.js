const startApplication = () => {
  let completeToDoList = getToDoList() ? getToDoList().filter(task => task.status === 'done') : []

  typeWrite(querySelector('h1'));

  collapsToDo();

  if (completeToDoList && completeToDoList.length > 0) {
    querySelector('.empty-list').style.opacity = 0;

    for (let task of completeToDoList) {
      if (task.status === 'done')
        createNewTask(task.description, task.id, task.status);
    }
  }
  else
    fadeOut(querySelector('.empty-list'));
}
document.addEventListener('load', startApplication());