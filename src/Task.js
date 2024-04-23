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

  static get id() {
    return this.#_id++;
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

    newItem
      .querySelector('input[type="checkbox"]')
      .addEventListener('change', e => {
        newItem
          .querySelector('.todo-item__todo-info')
          .classList.toggle('done', e.target.checked);
      });
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
        daysUntilDue == -1
          ? 'Yesterday'
          : new Date(this.dueDate).toLocaleDateString();
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
