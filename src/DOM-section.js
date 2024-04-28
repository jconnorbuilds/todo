import { slugify } from './utils.js';
import TaskForm from './TaskForm.js';
import Section from './Section.js';
import Project from './Project.js';
const DEFAULT_SECTION_NAME = 'Default';

const DOMSection = s => {
  const sectionEl = document.createElement('section');
  const sectionSlug = slugify(s.name);

  sectionEl.dataset.idx = s.idx;
  sectionEl.dataset.id = s.id;
  sectionEl.classList.add('section', sectionSlug);
  sectionEl.innerHTML += `
  ${_getTitleElInnerHTML(s)}
  <div class="new-todo-wrapper">
    <div class="form-container">
    </div>
  </div>
  `;
  const addTaskBtn = s.taskForm.addTaskBtn;
  sectionEl.querySelector('.new-todo-wrapper').append(addTaskBtn);

  const addSectionButton = document.createElement('button');
  addSectionButton.type = 'button';
  addSectionButton.classList = 'section__add-section-button';
  addSectionButton.textContent = 'Add section';
  sectionEl.append(addSectionButton);

  addSectionButton.addEventListener('click', _drawNewSectionNameInput);
  return sectionEl;
};

const _getTitleElInnerHTML = section => {
  return section.name === DEFAULT_SECTION_NAME
    ? ''
    : `<div class="section-title">${section.name}</div>`;
};

const _drawNewSectionNameInput = e => {
  // Draw the input if it's not already open
  if (!document.querySelector('.section__new-section-name-input')) {
    let newSectionIdx = +e.target.closest('section.section').dataset.idx + 1;
    console.log('🚀 ~ newSectionIdx:', newSectionIdx);
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.classList = 'section__new-section-name-input';
    const closestSection = e.target.closest('.section');

    form.append(input);
    // Append the form below the "Add section" button
    closestSection.after(form);
    input.focus();

    // Create and draw the new section on form submit
    form.addEventListener('submit', e => {
      e.preventDefault();
      const project = Project.currentProject;
      const createdSection = project.addSection({
        name: input.value,
        projectId: project.id,
        idx: newSectionIdx,
      });
      form.remove();
      createdSection.draw();
    });
  } else {
    return;
  }
};

export default DOMSection;
