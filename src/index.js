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

Project.loadProjects();
