import { createTask } from './TodoItem.js';
import { DOMCreateTask } from './DOM-funcs.js';

let currentFormContainer = null;
let formIsOpen = false;
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && formIsOpen) closeAndResetForm(e);
});

class AddTaskBtn {
  constructor(selector) {
    this.button = document.querySelector(selector);
  }
  hide() {
    this.button.style.display = 'none';
  }
  show() {
    this.button.style.display = 'block';
  }
}

const addTaskBtn = new AddTaskBtn('div.default button.add-todo');

const getFormContainer = (e) => {
  console.log(e.target.closest('div.form-container'));
  return e.target.closest('div.form-container');
};

const resetForm = (formContainer = currentFormContainer) => {
  formContainer.querySelector('form').reset();
};

const hideNewTaskForm = (formContainer = currentFormContainer) => {
  while (formContainer.firstChild) formContainer.firstChild.remove();
  formIsOpen = false;
};

/**
 * Removes the New Task form from the page and shows the New Task button
 *
 * @param {*} e the click event
 */
const closeAndResetForm = (e) => {
  e.preventDefault();
  resetForm();
  hideNewTaskForm();
  addTaskBtn.show();
};

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

/**
 * Handles the creation of a new task. Creates the new task object and adds
 * it to the DOM, then resets and re-focuses the form so the next task can
 * be easily added.
 *
 * @param {*} e - the submit event
 * @param {*} inputEl - contains the title of the new task
 */
const taskFormSubmitHandler = (e, inputEl) => {
  e.preventDefault();

  // Create the new task
  const newTask = createTask(inputEl.value);
  DOMCreateTask(newTask);

  // Reset the form
  resetForm(getFormContainer(e));
  inputEl.focus();
};

// const hideAddTaskBtn = (container = currentFormContainer) => {
//   const todoWrapper = container.closest('div.new-todo-wrapper');
//   const addTaskBtn = todoWrapper.querySelector('button.add-todo');
//   addTaskBtn.style.display = 'none';
// };

// const showAddTaskBtn = (container = currentFormContainer) => {
//   const todoWrapper = container.closest('div.new-todo-wrapper');
//   const addTaskBtn = todoWrapper.querySelector('button.add-todo');
//   addTaskBtn.style.display = 'block';
// };

const createNewTaskForm = () => {
  currentFormContainer = document.querySelector('div.form-container');
  const formContainer = currentFormContainer;
  const { form, input, cancelBtn } = createFormElements();

  addTaskBtn.hide();
  formContainer.appendChild(form);
  input.focus();

  cancelBtn.addEventListener('click', closeAndResetForm);
  form.addEventListener('submit', (e) => taskFormSubmitHandler(e, input));

  formIsOpen = true;
};

export default createNewTaskForm;
