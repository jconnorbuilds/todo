import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import localeJp from 'air-datepicker/locale/ja';
export const FA_ICON_CLASSES = 'fa-regular fa-calendar';

export default class DueDate {
  #date;
  datePicker;
  constructor(date = new Date()) {
    this.#date = date;
    this.button = this.draw();
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

    this.datePicker = new AirDatepicker(dueDateButton.querySelector('input'), {
      locale: localeJp,
      selectedDates: [this.date.toString()],
      onSelect: (dateObj) => (this.date = dateObj.date),
      autoClose: true,
    });

    return dueDateButton;
  }
  reset() {
    this.date = new Date();
    this.datePicker?.selectDate(this.date.toLocaleString());
  }
}
