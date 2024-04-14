import { Temporal } from '@js-temporal/polyfill';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import localeJp from 'air-datepicker/locale/ja';
const FA_ICON_CLASSES = 'fa-solid fa-calendar-days';

export default class DueDate {
  #date;
  constructor(taskForm, date = Temporal.Now.plainDateISO()) {
    this.#date = date;
    this.taskForm = taskForm;
    this.button = this.draw();
    console.log(this.date);
  }

  set date(newDate) {
    this.#date = newDate;
  }

  get date() {
    return this.#date;
  }

  draw() {
    const dueDateButton = document.createElement('button');
    dueDateButton.setAttribute('type', 'button');
    dueDateButton.className = 'due-date-btn__ gentle';
    dueDateButton.setAttribute('tabindex', '0');
    dueDateButton.innerHTML = `
    <i class='${FA_ICON_CLASSES} on-time'></i>
    <input class="due-date-btn__date-input" type="text" value="${this.date}"></input>
    `;

    new AirDatepicker(dueDateButton.querySelector('input'), {
      locale: localeJp,
      selectedDates: [this.date.toString()],
      onSelect: (date) => (this.date = date),
      autoClose: true,
    });

    return dueDateButton;
  }
}
