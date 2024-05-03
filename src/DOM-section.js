import { slugify } from './utils.js';
import Project from './Project.js';
import { dropdownMenu } from './dropdown.js';
const DEFAULT_SECTION_NAME = 'Default';

const DOMSection = (s) => {
  const sectionEl = document.createElement('section');

  // Set up the basic Section container
  sectionEl.dataset.idx = s.idx;
  sectionEl.dataset.id = s.id;
  sectionEl.classList.add('section', slugify(s.name));
  sectionEl.innerHTML += `
  ${_getTitleElInnerHTML(s)}
  <div class="new-todo-wrapper">
    <div class="form-container">
    </div>
  </div>
  `;

  // Make the Add Task button
  const addTaskBtn = s.taskForm.addTaskBtn;
  sectionEl.querySelector('.new-todo-wrapper').append(addTaskBtn);

  // Make the Add Section button
  const addSectionButton = document.createElement('button');
  addSectionButton.type = 'button';
  addSectionButton.classList = 'section__add-section-button';
  addSectionButton.textContent = 'Add section';
  sectionEl.append(addSectionButton);

  addSectionButton.addEventListener('click', _drawNewSectionNameInput);

  // Make the three-dot dropdown menu
  const actionsButton = sectionEl.querySelector(
    '.section-header__actions button.actions',
  );
  if (actionsButton) {
    dropdownMenu({
      dropdownTarget: actionsButton,
      items: [
        { label: 'Rename section', action: () => console.log('Renaming section...') },
        { label: 'Do other stuff', action: () => console.log('Doing stuff...') },
        { label: 'Drink more coffee', action: () => console.log('Drinking...') },
        { label: 'More actions...', action: () => console.log('Doing more...') },
      ],
    });
  }

  return sectionEl;
};

const _getTitleElInnerHTML = (section) =>
  section.name === DEFAULT_SECTION_NAME
    ? ''
    : `
    <div class="section-header">
      <div class="section-header__title">${section.name}</div>
        <div class="section-header__actions">
        <button class="actions"><i class="fa-solid fa-ellipsis"></i></button>
      </div>
    </div>
    `;

const _drawNewSectionNameInput = (e) => {
  // Draw the input if it's not already open
  if (!document.querySelector('.section__new-section-name-input')) {
    let newSectionIdx = +e.target.closest('section.section').dataset.idx + 1;
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.classList = 'section__new-section-name-input';
    const closestSection = e.target.closest('.section');

    form.append(input);
    // Append the form below the "Add section" button
    closestSection.after(form);
    input.focus();

    // Create and draw the new section on form submit
    form.addEventListener('submit', (e) => {
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
