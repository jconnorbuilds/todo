import Project from './Project.js';

export default class TodoItem {
  id = getUniqueId();
  title;
  description = '';
  priority = 1;
  dueDate;

  constructor(title, description = '') {
    this.title = title;
    this.description = description;
  }
}

const createTask = (
  taskTitle,
  taskDesc = '',
  project = Project.getDefaultProject()
) => {
  const task = new TodoItem(taskTitle, taskDesc);
  project.appendTodoItem(task);
  project.logTodoItems();
  return task;
};

let uniqueId = 0;
const getUniqueId = () => {
  return uniqueId++;
};

export { createTask };
