import createNewTaskForm from './new-task-form.js';

const addTaskBtn = document.querySelector('button.add-todo');

const DOMCreateProject = (project) => {
  const projectsArea = document.querySelector('div.projects');
  const p = document.createElement('p');
  p.classList.add('project');
  p.textContent = project.name;
  projectsArea.appendChild(p);
};

const toggleIconStyleOnMouseEvents = (e) => {
  const icon = e.target.querySelector('i');
  if (icon) {
    icon.classList.toggle('fa-solid');
    icon.classList.toggle('fa-regular');
  }
};

const DOMCreateTask = (task) => {
  const taskContainer = document.querySelector(
    'div.main-window div.todo-container'
  );

  const newItem = document.createElement('div');
  const forId = `task-${task.id}`;
  newItem.classList.add('todo-item');
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.id = forId;
  const itemName = document.createElement('label');
  itemName.classList.add('item-name');
  itemName.textContent = task.title;
  itemName.setAttribute('for', forId);

  newItem.append(checkbox);
  newItem.append(itemName);
  taskContainer.insertBefore(
    newItem,
    taskContainer.childNodes[taskContainer.childElementCount - 1]
  );
};

addTaskBtn.addEventListener('click', () => createNewTaskForm());
addTaskBtn.addEventListener('mouseover', toggleIconStyleOnMouseEvents);
addTaskBtn.addEventListener('mouseout', toggleIconStyleOnMouseEvents);

export { DOMCreateProject, DOMCreateTask };
