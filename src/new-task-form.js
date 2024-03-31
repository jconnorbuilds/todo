import { createTask } from './TodoItem.js';
import { DOMCreateTask } from './DOM-funcs.js';

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
    this.formElements = this.createFormElements();
    this.addTaskBtn = this.createAddTaskBtn();
  }

  get parentContainer() {
    return document.querySelector(
      `.${this.project.slug}.${this.section.slug} div.form-container`
    );
  }

  createAddTaskBtn() {
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
    button.addEventListener('click', () => this.draw());

    return button;
  }

  draw() {
    const { form, input } = this.formElements;

    this.addTaskBtn.style.display = 'none';
    const container = this.parentContainer || document.body;
    container.appendChild(form);
    input.focus();
  }

  /**
   * Creates the form elements for the New Task form
   *
   * @returns {{ form: any; input: any; cancelBtn: any; }}
   */
  createFormElements = () => {
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    const submitBtn = document.createElement('input');
    submitBtn.setAttribute('type', 'submit');
    const cancelBtn = this.makeCancelBtn();

    form.appendChild(input);
    form.appendChild(submitBtn);
    form.appendChild(cancelBtn);

    form.addEventListener('submit', (e) =>
      this.taskFormSubmitHandler(e, input)
    );

    return { form, input };
  };

  makeCancelBtn = () => {
    const cancelBtn = document.createElement('button');
    cancelBtn.setAttribute('type', 'button');
    cancelBtn.textContent = 'Cancel';

    cancelBtn.addEventListener('click', this.closeForm);

    return cancelBtn;
  };

  dispose() {
    while (this.parentContainer.firstChild)
      this.parentContainer.firstChild.remove();
  }

  reset() {
    this.formElements.form.reset();
  }

  closeForm = () => {
    this.formElements.form.remove();
    this.addTaskBtn.style.display = 'block';
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
    this.reset();
    inputEl.focus();
  };
}
