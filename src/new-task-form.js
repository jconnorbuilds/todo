import { createTask } from './TodoItem.js';
import { DOMCreateTask } from './DOM-funcs.js';
import { slugify } from './utils.js';

export class AddTaskBtn {
  constructor() {
    this.button = AddTaskButton();
    this.containerSelector = 'div.new-todo-wrapper';
  }
  hide() {
    this.button.remove();
  }
  draw(container = document.querySelector(this.containerSelector)) {
    console.log(container);
    container.append(this.button);
  }
}

const AddTaskButton = () => {
  const button = document.createElement('button');
  button.classList.add('add-todo');
  const plusIcon = document.createElement('i');
  plusIcon.classList.add('fa-regular', 'fa-square-plus');

  const buttonText = document.createElement('span');
  buttonText.textContent = 'Add Task';
  button.appendChild(plusIcon);
  button.appendChild(buttonText);

  button.addEventListener('mouseenter', toggleIconStyleOnMouseEvents);
  button.addEventListener('mouseleave', toggleIconStyleOnMouseEvents);

  return button;
};

/**
 * Handler for mouseenter and mouseleave events.
 * Toggles between a 'regular' icon and one with a fill when the user
 * mouses over the Add Task button.
 *
 * @param {*} e - the mouseenter or mouseleave event
 */
const toggleIconStyleOnMouseEvents = (e) => {
  const icon = e.target.querySelector('i');
  if (icon) {
    icon.classList.toggle('fa-solid');
    icon.classList.toggle('fa-regular');
  }
};

export class TaskForm {
  constructor(section) {
    this.section = section;
    this.project = section.project;
    this.form = null;
    console.log(this.project, this.section);
    this.containerSelector = `.${this.project.name}.${this.section.name} div.form-container`;
    this.addTaskBtn = new AddTaskBtn();
  }

  set isShown(bool) {
    this._isShown = bool;
  }

  draw(container) {
    const { form, input, cancelBtn } = createFormElements();
    this.form = form;

    this.addTaskBtn.hide();
    container.appendChild(this.form);
    input.focus();

    cancelBtn.addEventListener('click', this.closeForm);
    form.addEventListener('submit', (e) =>
      this.taskFormSubmitHandler(e, input)
    );
    this.isShown = true;
  }

  showBtn = (container) => {
    this.addTaskBtn.draw(container);
  };

  dispose() {
    const container = document.querySelector(this.containerSelector);
    while (container.firstChild) container.firstChild.remove();
    this.isShown = false;
  }

  reset() {
    this.form.reset();
  }

  closeForm = () => {
    this.dispose();
    this.addTaskBtn.draw();
  };

  /**
   * Handles the creation of a new task. Creates the new task object and adds
   * it to the DOM, then resets and re-focuses the form so the next task can
   * be easily added.
   *
   * @param {*} e - the submit event
   * @param {*} inputEl - contains the title of the new task
   */

  taskFormSubmitHandler = (e, inputEl) => {
    e.preventDefault();

    // Create the new task
    const newTask = createTask(inputEl.value);
    DOMCreateTask(newTask, this.section);

    // Reset the form
    this.form.reset();
    inputEl.focus();
  };
}

const makeCancelBtn = () => {
  const cancelBtn = document.createElement('button');
  cancelBtn.setAttribute('type', 'button');
  cancelBtn.textContent = 'Cancel';

  return cancelBtn;
};

/**
 * Creates the form elements for the New Task form
 *
 * @returns {{ form: any; input: any; cancelBtn: any; }}
 */
const createFormElements = () => {
  const form = document.createElement('form');
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  const submitBtn = document.createElement('input');
  submitBtn.setAttribute('type', 'submit');
  const cancelBtn = makeCancelBtn();

  form.appendChild(input);
  form.appendChild(submitBtn);
  form.appendChild(cancelBtn);

  return { form, input, cancelBtn };
};
