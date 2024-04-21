import { slugify } from './utils.js';
import TaskForm from './TaskForm.js';
const DEFAULT_SECTION_NAME = 'Default';

const DOMSection = (s) => {
  const sectionEl = document.createElement('section');
  const sectionSlug = slugify(s.name);
  sectionEl.classList.add('section-container', sectionSlug);
  sectionEl.innerHTML += `
  ${getTitleElInnerHTML(s)}
  <div class="new-todo-wrapper">
    <div class="form-container">
    </div>
  </div>
  `;
  const addTaskBtn = s.taskForm.addTaskBtn;
  sectionEl.querySelector('.new-todo-wrapper').append(addTaskBtn);

  return sectionEl;
};

const getTitleElInnerHTML = (section) => {
  return section.name === DEFAULT_SECTION_NAME
    ? ''
    : `<div class="section-title">${section.name}</div>`;
};

export default DOMSection;
