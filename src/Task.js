import Section from './Section.js';
import { FA_ICON_CLASSES } from './dueDateButtonComponent.js';
import { differenceInCalendarDays } from 'date-fns';

export default class Task {
  static #_id = 0;
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
    this.id = Task.getId(data);
    this.sectionId = data.sectionId;
    this.saveTask(this);
  }

  static getId(data) {
    if (data.id) {
      this.#_id++;
      return data.id;
    }
    return this.#_id++;
  }

  static loadTasks() {
    let tasksToLoad = [];
    // Object.entries(localStorage).forEach(([key, value]) => {
    //   console.log(key, value);
    //   if (key.slice(0, 5) === 'task-') {
    //     const loadedTask = new Task(JSON.parse(value));
    //     tasksToLoad.push(loadedTask);
    //   }
    // });
    // console.log(tasksToLoad);
    // tasksToLoad.forEach((task) => {
    //   const taskContainer = task.getSection().taskContainer;
    //   task.draw(taskContainer);
    // });
    return tasksToLoad;
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

  getSection(id = this.sectionId) {
    let instance = Section.getInstance(id);
    return instance;
  }

  draw(renderTarget = document.querySelector('.section-container.default')) {
    const taskContainer = renderTarget;
    const newItem = document.createElement('div');
    const dateDisplay = this.getDueDateDisplay();
    newItem.classList = 'todo-item__';

    newItem.innerHTML = `
    <div class="todo-item__checkbox">
    <input class="p${this.priority}" type="checkbox">
    <span class="checkmark"</span>
    </div>
    <div class="todo-item__todo-info">
      <div class="todo-item__main-title">${this.title}</div>
        <div class="todo-item__description">${this.description}</div>
        <div class="todo-item__due-date ${dateDisplay.timelyClass}">
        <i class="${FA_ICON_CLASSES}"></i>
        <span>${dateDisplay.dueDateString}</span>
      </div>
    </div>
    `;

    taskContainer.insertBefore(
      newItem,
      taskContainer.querySelector('div.new-todo-wrapper')
    );
  }

  getDueDateDisplay() {
    const daysUntilDue = this.getDaysUntilDue(this.dueDate);
    const result = { dueDateString: '', timelyClass: '' };
    const daysList = [
      '_',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    if (daysUntilDue >= 0) {
      result.timelyClass = 'on-time';
      result.dueDateString =
        daysUntilDue == 0
          ? 'Today'
          : daysUntilDue == 1
          ? 'Tomorrow'
          : daysUntilDue < 7
          ? daysList[daysUntilDue]
          : new Date(this.dueDate).toLocaleDateString();
    } else {
      result.timelyClass = 'overdue';
      result.dueDateString =
        daysUntilDue == -1
          ? 'Yesterday'
          : new Date(this.dueDate).toLocaleDateString();
    }
    return result;
  }

  getDaysUntilDue(dueDate) {
    const daysUntilDue = differenceInCalendarDays(dueDate, new Date());
    return daysUntilDue;
  }

  saveTask(task) {
    // localStorage.setItem(`task-${task.id}`, JSON.stringify(task));
    // console.log({ localStorage });
  }
}
