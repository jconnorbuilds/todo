import { DOMCreateProject } from './DOM-funcs';
import './index.css';
import Project from './Project';
import Section from './Section.js';

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    console.log(Project.currentProject.sections);
    Project.currentProject.sections.forEach((section) => {
      section.taskForm.closeForm();
    });
  }
});

const defaultProject = new Project('home');
Project.currentProject = defaultProject;
defaultProject.draw();
// console.log(Project.currentProject.sections);
Project.currentProject.sections[0].draw();
Project.currentProject.addSection('Shit');

// export const addTaskBtn = document.querySelector('div.default button.add-todo');
// export const secondAddTaskBtn = document.querySelector(
//   'div.another button.add-todo'
// );
