import { createTask } from './Task.js';
import DOMDrawTask from './DOM-task.js';
import { toggleIconStyleOnMouseEvents } from './DOM-task-form.js';
import PriorityButton from './priorityBtnComponent.js';

export default class TaskForm {
  constructor(section) {
    this.section = section;
    this.project = section.project;
    this.priorityButton = new PriorityButton(this);
    this.addTaskBtn = this.makeAddTaskBtn();
    this.submitButton = this.#makeSubmitButton();
    this.taskNameField = this.#makeTaskNameField();
    this.form = this.makeForm();
  }

  get parentContainer() {
    return document.querySelector(
      `.${this.project.slug}.${this.section.slug} div.form-container`
    );
  }

  reset() {
    this.form.reset();
    this.priorityButton.reset();
    this.toggleEnabledDisabledSubmitButton();
    this.form.querySelector('input').focus();
  }

  closeForm = () => {
    this.form.remove();
    this.reset();
    this.addTaskBtn.style.display = 'block';
  };

  makeAddTaskBtn() {
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
    const form = this.form;

    this.addTaskBtn.style.display = 'none';
    const container = this.parentContainer || document.body;
    container.appendChild(form);
    form.querySelector('input').focus();
  }

  makeForm() {
    const form = document.createElement('form');
    form.classList.add('task-form');

    const editingArea = document.createElement('div');
    editingArea.classList.add('task-editing-area__');
    const taskNameField = this.taskNameField;
    const descriptionField = document.createElement('input');
    descriptionField.setAttribute('type', 'text');
    descriptionField.placeholder = 'Description';

    const detailsArea = document.createElement('div');
    detailsArea.classList.add('task-details-area__');

    const footer = document.createElement('div');
    footer.classList.add('task-form-footer__');
    const projectSelect = document.createElement('div');
    projectSelect.classList.add('task-form-footer__project-selector');
    projectSelect.textContent = 'Home';
    const footerButtons = document.createElement('div');
    footerButtons.classList.add('task-form-footer__buttons');

    const submitButton = this.submitButton;

    const cancelBtn = this.#makeCancelBtn();

    // Build the form
    const priorityBtn = this.priorityButton.button;
    detailsArea.append(priorityBtn);
    editingArea.append(taskNameField);
    editingArea.append(descriptionField);
    editingArea.append(detailsArea);

    footerButtons.append(cancelBtn);
    footerButtons.append(submitButton);
    footer.append(projectSelect);
    footer.append(footerButtons);

    form.append(editingArea);
    form.append(footer);

    // Add event listeners
    form.addEventListener('submit', (e) => {
      const formData = {
        title: taskNameField.value,
        description: descriptionField.value,
        priority: +priorityBtn.dataset.priority,
        dueDate: 'Today', // placeholder
      };
      this.taskFormSubmitHandler(e, formData);
    });

    taskNameField.addEventListener(
      'input',
      this.toggleEnabledDisabledSubmitButton.bind(this)
    );

    return form;
  }

  toggleEnabledDisabledSubmitButton() {
    if (this.taskNameField.value.length) {
      this.submitButton.removeAttribute('disabled');
    } else {
      this.submitButton.setAttribute('disabled', '');
    }
  }

  #makeCancelBtn() {
    const cancelBtn = document.createElement('button');
    cancelBtn.setAttribute('type', 'button');
    cancelBtn.textContent = 'Cancel';

    cancelBtn.addEventListener('click', this.closeForm);

    return cancelBtn;
  }

  #makeTaskNameField() {
    const taskNameField = document.createElement('input');
    taskNameField.setAttribute('type', 'text');
    taskNameField.placeholder = 'Task name';

    return taskNameField;
  }

  #makeSubmitButton() {
    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('disabled', '');
    submitButton.textContent = 'Add task';

    return submitButton;
  }

  /**
   * Creates the new task object and adds it to the DOM,
   * then resets and re-focuses the form so the next task can
   * be easily added.
   *
   * @param {*} e - the submit event
   * @param {*} inputEl - contains the title of the new task
   */
  taskFormSubmitHandler = (e, formData) => {
    e.preventDefault();

    // Create the new task
    const newTask = createTask(this.section, formData).draw();

    // Reset the form
    this.reset();
  };
}