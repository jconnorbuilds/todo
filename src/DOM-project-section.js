import { slugify } from './utils.js';

const DOMSection = (s) => {
  const sectionEl = document.createElement('div');
  const projectSlug = slugify(s.project.name);
  const sectionSlug = slugify(s.name);
  sectionEl.classList.add('section-container', projectSlug, sectionSlug);
  const title = document.createElement('div');
  title.textContent = s.name;
  title.classList.add('section-title');
  sectionEl.appendChild(title);
  sectionEl.appendChild(NewItemFormWrapper(s));

  return sectionEl;
};

const NewItemFormWrapper = (section) => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('new-todo-wrapper');

  const formContainer = document.createElement('div');
  formContainer.classList.add('form-container');
  wrapper.append(formContainer);

  const taskForm = section.taskForm;
  const addTaskBtn = taskForm.addTaskBtn;
  taskForm.showBtn(wrapper);

  addTaskBtn.button.addEventListener('click', () =>
    taskForm.draw(formContainer)
  );

  return wrapper;
};

export default DOMSection;
