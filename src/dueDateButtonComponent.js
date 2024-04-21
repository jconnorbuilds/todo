import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import localeJp from 'air-datepicker/locale/ja';
export const FA_ICON_CLASSES = 'fa-regular fa-calendar';

export default class DueDate {
  #date;
  constructor(date = new Date()) {
    this.#date = date;
  }

  set date(newDate) {
    this.#date = newDate;
  }

  get date() {
    return this.#date;
  }

  initDatePicker() {
    const datePicker = new AirDatepicker(
      document.querySelector('.due-date-btn__date-input'),
      {
        locale: localeJp,
        selectedDates: [this.date.toString()],
        onSelect: (dateObj) => (this.date = dateObj.date),
        autoClose: true,
      }
    );
    return datePicker;
  }

  draw() {
    const dueDateButton = document.createElement('button');
    dueDateButton.setAttribute('type', 'button');
    dueDateButton.className = 'due-date-btn__ gentle';
    dueDateButton.setAttribute('tabindex', '0');
    dueDateButton.innerHTML = `
    <i class='${FA_ICON_CLASSES} on-time'></i>
    <input class="due-date-btn__date-input" type="text" value="${this.date.toLocaleDateString(
      'ja'
    )}"></input>
    `;

    new AirDatepicker(
      dueDateButton.querySelector('.due-date-btn__date-input'),
      {
        locale: localeJp,
        selectedDates: [this.date.toString()],
        onSelect: (dateObj) => (this.date = dateObj.date),
        autoClose: true,
      }
    );
    return dueDateButton;
  }
  reset() {
    this.date = new Date();
  }
}
