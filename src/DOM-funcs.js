const DOMCreateProject = (project) => {
  const projectsArea = document.querySelector('div.projects');
  const p = document.createElement('p');
  p.classList.add('project');
  p.textContent = project.name;
  projectsArea.appendChild(p);
};

const DOMCreateTask = (task, section) => {
  const taskContainer = document.querySelector(
    `div.section-container.${section.project.name}.${section.name}`
  );
  console.log(`div.section-container.${section.project.name}.${section.name}`);
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

export { DOMCreateProject, DOMCreateTask };
