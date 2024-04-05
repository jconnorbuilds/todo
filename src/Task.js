import Project from './Project.js';

export default class Task {
  static #_uniqueId = 0;
  title;
  description;
  priority;
  dueDate;
  _isDeleted = false;
  _isCompleted = false;

  constructor(data) {
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
