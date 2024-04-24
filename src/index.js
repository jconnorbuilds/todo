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
newProjectBtn.addEventListener('click', () => {
  let newProject = Project.create({ name: 'Dynamically added' });
});

Project.loadProjects();
