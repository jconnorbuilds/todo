import Section from './Section.js';
import Project from './Project.js';
import { FA_ICON_CLASSES } from './dueDateButtonComponent.js';
import { differenceInCalendarDays } from 'date-fns';

export default class Task {
  static #_id = 0;
  constructor({
    id = Task.id,
    title,
    description,
    priority,
    dueDate,
    sectionId,
    isCompleted = false,
    isDeleted = false,
  } = {}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;
    this.sectionId = sectionId;
    this.isCompleted = isCompleted;
    this.isDeleted = isDeleted;
    this.save();
  }

  static create(data) {
    const task = new Task(data);
    return task;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      priority: this.priority,
      dueDate: this.dueDate,
      sectionId: this.sectionId,
      isCompleted: this.isCompleted,
      isDeleted: this.isDeleted,
    };
  }

  static get id() {
    return this.#_id++;
  }

  getSection(id = this.sectionId) {
    let instance = Section.getInstance(id);
    return instance;
  }

  draw(renderTarget = document.querySelector('.section.default')) {
    const taskContainer = renderTarget;
    const newItem = document.createElement('div');
    const dateDisplay = this.getDueDateDisplay();
    const forId = `task-${this.id}`;
    newItem.classList = 'todo-item';

    newItem.innerHTML = `
    <div class="todo-item__checkbox">
      <input id="${forId}" class="p${this.priority}" type="checkbox" ${
      this.isCompleted ? 'checked' : ''
    }>
      <span class="checkmark"></span>
    </div>
    <div class="todo-item__todo-info ${this.isCompleted ? 'done' : ''}">
      <label for="${forId}" class="todo-item__main-title">${this.title}</label>
      <div class="todo-item__description">${this.description}</div>
      <div class="todo-item__due-date ${dateDisplay.timelyClass}">
        <i class="${FA_ICON_CLASSES}"></i>
        <span>${dateDisplay.dueDateString}</span>
      </div>
    </div>
    `;

    const toggleCompleted = (e) => {
      let checked = e.target.checked;
      this.isCompleted = checked;
      newItem.querySelector('.todo-item__todo-info').classList.toggle('done', checked);
      this.save();
    };

    taskContainer.insertBefore(
      newItem,
      taskContainer.querySelector('div.new-todo-wrapper'),
    );

    newItem
      .querySelector('input[type="checkbox"]')
      .addEventListener('change', toggleCompleted);
  }

  getDueDateDisplay() {
    const daysUntilDue = this.#getDaysUntilDue(this.dueDate);
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
        daysUntilDue == -1 ? 'Yesterday' : new Date(this.dueDate).toLocaleDateString();
    }
    return result;
  }

  #getDaysUntilDue(dueDate) {
    const daysUntilDue = differenceInCalendarDays(dueDate, new Date());
    return daysUntilDue;
  }

  save() {
    Project.saveProjects();
  }
}
