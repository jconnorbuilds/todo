import { Temporal } from '@js-temporal/polyfill';
import { FA_ICON_CLASSES } from './dueDateButtonComponent.js';
import { differenceInCalendarDays } from 'date-fns';

export default class Task {
  static #_uniqueId = 0;
  title;
  description;
  priority;
  dueDate;
  _isDeleted = false;
  _isCompleted = false;

  constructor(data) {
    // this.section = section;
    this.title = data.title;
    this.description = data.description;
    this.priority = data.priority;
    this.dueDate = data.dueDate.date;
    this.id = Task.uniqueId;
    // this.section.addTask(this);
    // this.saveTask(this);
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

  draw(renderTarget) {
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
    console.log(daysUntilDue);
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
          : this.dueDate.toLocaleDateString();
    } else {
      result.timelyClass = 'overdue';
      result.dueDateString =
        daysUntilDue == -1 ? 'Yesterday' : this.dueDate.toLocaleDateString();
    }
    return result;
  }

  getDaysUntilDue(dueDate) {
    const daysUntilDue = differenceInCalendarDays(dueDate, new Date());
    return daysUntilDue;
  }

  // saveTask(task) {
  //   localStorage.setItem(`task-${task.id}`, JSON.stringify(task));
  //   console.log(localStorage.getItem(`task-${task.id}`));
  // }
}
