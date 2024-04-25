import './index.css';
import Project from './Project';
import Section from './Section.js';
import Task from './Task.js';

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    Project.currentProject.sections.forEach(section => {
      section.taskForm.closeForm();
    });
  }
});

const newProjectBtn = document.querySelector('button.sidebar__new-project');
const sidebarProjectsList = document.querySelector('ul.sidebar__projects-list');
newProjectBtn.addEventListener('click', () => {
  const li = document.createElement('li');
  li.classList = 'sidebar__project';
  const inputForm = document.createElement('form');
  inputForm.classList = 'sidebar__input-form';

  const listIcon = document.createElement('i');
  listIcon.classList = 'fa-solid fa-hashtag';

  const projectNameInput = document.createElement('input');

  inputForm.append(listIcon);
  inputForm.append(projectNameInput);
  li.append(inputForm);
  sidebarProjectsList.append(li);
  projectNameInput.focus();

  inputForm.addEventListener('submit', e => {
    let projectName = projectNameInput.value;
    li.remove();
    const newProject = Project.create({ name: projectName });
    newProject.activate();
  });
});

Project.loadProjects();
