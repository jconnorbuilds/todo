import { createTask } from './Task.js';
import DOMDrawTask from './DOM-task.js';

export default class TaskForm {
  constructor(section) {
    this.section = section;
    this.project = section.project;
    this.form = this.makeForm();
    this.addTaskBtn = this.makeAddTaskBtn();
  }

  get parentContainer() {
    return document.querySelector(
      `.${this.project.slug}.${this.section.slug} div.form-container`
    );
  }

  reset() {
    // this.formElements.form.reset();
    this.form.reset();
  }

  closeForm = () => {
    // this.formElements.form.remove();
    this.form.remove();
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
    // const form = this.formElements;
    const form = this.form;

    this.addTaskBtn.style.display = 'none';
    const container = this.parentContainer || document.body;
    container.appendChild(form);
    form.querySelector('input.task-name-field').focus();
  }

  /**
   * Creates the form elements for the New Task form
   *
   * @returns {{ form: any; input: any; cancelBtn: any; }}
   */
  makeFormElements() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    const submitBtn = document.createElement('input');
    submitBtn.setAttribute('type', 'submit');
    const cancelBtn = this.makeCancelBtn();

    form.appendChild(input);
    form.appendChild(submitBtn);
    form.appendChild(cancelBtn);

    return { form, input };
  }

  makeForm() {
    const form = document.createElement('form');

    const editingArea = document.createElement('div');
    editingArea.classList.add('editing-area');

    const taskNameField = document.createElement('input');
    taskNameField.setAttribute('type', 'text');
    taskNameField.classList.add('task-name-field');
    taskNameField.placeholder = 'Task name';
    const descriptionField = document.createElement('input');
    descriptionField.setAttribute('type', 'text');
    descriptionField.classList.add('description-field');
    descriptionField.placeholder = 'Description';

    const detailsArea = document.createElement('div');
    detailsArea.classList.add('details-area');
    const priorityBtn = document.createElement('button');
    priorityBtn.setAttribute('type', 'button');
    priorityBtn.textContent = 'Priority';

    const footer = document.createElement('div');
    footer.classList.add('footer');
    const projectSelect = document.createElement('div');
    projectSelect.classList.add('project-selector');
    projectSelect.textContent = 'Home';
    const footerButtons = document.createElement('div');
    footerButtons.classList.add('footer-buttons');

    const submitBtn = document.createElement('button');
    submitBtn.setAttribute('type', 'submit');
    submitBtn.textContent = 'Add task';
    const cancelBtn = this.makeCancelBtn();

    // Build the form
    detailsArea.append(priorityBtn);
    editingArea.append(taskNameField);
    editingArea.append(descriptionField);
    editingArea.append(detailsArea);

    footerButtons.append(cancelBtn);
    footerButtons.append(submitBtn);
    footer.append(projectSelect);
    footer.append(footerButtons);

    form.append(editingArea);
    form.append(footer);

    // Add event listeners
    form.addEventListener('submit', (e) => {
      const formData = {
        title: taskNameField.value,
        description: descriptionField.value,
        priority: 1, // update to get data from priority btn
        dueDate: 'Today', // placeholder
      };
      this.taskFormSubmitHandler(e, formData);
    });

    return form;
  }

  makeCancelBtn = () => {
    const cancelBtn = document.createElement('button');
    cancelBtn.setAttribute('type', 'button');
    cancelBtn.textContent = 'Cancel';

    cancelBtn.addEventListener('click', this.closeForm);

    return cancelBtn;
  };

  /**
   * Handles the creation of a new task. Creates the new task object and adds
   * it to the DOM, then resets and re-focuses the form so the next task can
   * be easily added.
   *
   * @param {*} e - the submit event
   * @param {*} inputEl - contains the title of the new task
   */
  taskFormSubmitHandler = (e, formData) => {
    e.preventDefault();

    // Create the new task
    const newTask = createTask(formData);
    DOMDrawTask(newTask, this.section);

    // Reset the form
    this.reset();
    this.form.focus;
  };
}

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
