const DOMDrawTask = (task, section) => {
  const taskContainer = document.querySelector(
    `section.section-container.${section.project.slug}.${section.slug}`
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
    taskContainer.querySelector('div.new-todo-wrapper')
  );
};

export default DOMDrawTask;
