import { createTask } from './TodoItem.js';
import { DOMCreateTask } from './DOM-funcs.js';

// window.addEventListener('keydown', (e) => {
//   if (e.key === 'Escape' && formIsOpen) closeAndResetForm(e);
// });

export class AddTaskBtn {
  constructor(button) {
    this.button = button;
  }
  hide() {
    this.button.style.display = 'none';
  }
  show() {
    this.button.style.display = 'block';
  }
}

export class TaskForm {
  constructor(btn, section = 'default', project = 'general') {
    this.addTaskBtn = new AddTaskBtn(btn);
    this.section = section;
    this.project = project;
    this.form = null;
  }

  static set currentForm(form) {
    TaskForm._currentForm = form;
  }

  static set isOpen(bool) {
    TaskForm._isOpen = bool;
  }

  get container() {
    return document
      .querySelector(`div.todo-container.${this.project}.${this.section}`)
      .querySelector('div.form-container');
  }

  create() {
    const { form, input, cancelBtn } = createFormElements();
    this.form = form;
    TaskForm.currentForm = form;

    this.addTaskBtn.hide();
    this.container.appendChild(this.form);
    input.focus();

    cancelBtn.addEventListener('click', this.closeAndResetForm);
    form.addEventListener('submit', (e) =>
      this.taskFormSubmitHandler(e, input)
    );
  }

  dispose() {
    while (this.container.firstChild) this.container.firstChild.remove();
    TaskForm.isOpen = false;
  }

  reset() {
    console.log(this.form);
    this.form.reset();
  }

  /**
   * Removes the New Task form from the page and shows the New Task button
   *
   * @param {*} e the click event
   */
  closeAndResetForm = (e) => {
    e.preventDefault();
    this.reset();
    this.dispose();
    this.addTaskBtn.show();
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
    DOMCreateTask(newTask);

    // Reset the form
    this.form.reset();
    inputEl.focus();
  };
}

/**
 * Creates a Cancel Button
 */
const makeCancelBtn = () => {
  const cancelBtn = document.createElement('button');
  cancelBtn.setAttribute('type', 'button');
  cancelBtn.textContent = 'Cancel';

  return cancelBtn;
};

/**
 * Creates the form and input elements for the New Task form
 *
 * @returns {{ form: any; input: any; }}
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
