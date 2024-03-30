import { TaskForm } from './new-task-form.js';

const addTaskBtn = document.querySelector('div.default button.add-todo');
const secondAddTaskBtn = document.querySelector('div.another button.add-todo');

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

const DOMCreateTask = (task, projectClassName, sectionClassName) => {
  const taskContainer = document.querySelector(
    `div.todo-container.${projectClassName}.${sectionClassName}`
  );
  console.log(`div.todo-container.${projectClassName}.${sectionClassName}`);
  console.log({ taskContainer });

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
    taskContainer.querySelector('div.new-todo-wrapper')
  );
};

const createNewTaskForm = (e, project, section) =>
  new TaskForm(e.target, project, section).create();

addTaskBtn.addEventListener('click', (e) =>
  createNewTaskForm(e, 'home', 'default')
);
addTaskBtn.addEventListener('mouseover', toggleIconStyleOnMouseEvents);
addTaskBtn.addEventListener('mouseout', toggleIconStyleOnMouseEvents);

secondAddTaskBtn.addEventListener('click', (e) =>
  createNewTaskForm(e, 'home', 'another')
);
secondAddTaskBtn.addEventListener('mouseover', toggleIconStyleOnMouseEvents);
secondAddTaskBtn.addEventListener('mouseout', toggleIconStyleOnMouseEvents);

export { DOMCreateProject, DOMCreateTask };
