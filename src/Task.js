import Project from './Project.js';

export default class Task {
  static #_uniqueId = 0;
  title;
  description;
  priority;
  dueDate;
  _isDeleted = false;
  _isCompleted = false;

  constructor(section, data) {
    this.section = section;
    this.title = data.title;
    this.description = data.description;
    this.priority = data.priority;
    this.dueDate = data.dueDate;
    this.id = Task.uniqueId;
  }

  static get uniqueId() {
    return this.#_uniqueId++;
  }

  get isDeleted() {
    return this._isDeleted;
  }
  set isDeleted(bool) {
    _isDeleted = bool;
  }

  get isCompleted() {
    return this._isCompleted;
  }

  set isCompleted(bool) {
    this._isCompleted = bool;
  }

  draw() {
    const taskContainer = this.section.taskContainer;
    const FOR_ID = `task-${this.id}`;
    const newItem = document.createElement('div');
    newItem.classList = 'todo-item';

    newItem.innerHTML = `
    <input type="checkbox" id="${FOR_ID}">
    <label for="${FOR_ID}">${this.title}</label>
    `;

    taskContainer.insertBefore(
      newItem,
      taskContainer.querySelector('div.new-todo-wrapper')
    );
  }
}

const createTask = (
  taskTitle,
  taskDescription = '',
  project = Project.defaultProject
) => {
  const task = new Task(taskTitle, taskDescription);
  project.appendTodoItem(task);
  project.logTodoItems();
  return task;
};

export { createTask };
