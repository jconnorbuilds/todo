import { DOMCreateProject } from './DOM-funcs';
import './index.css';
import Project from './Project';
import Section from './Section.js';

// window.addEventListener('keydown', (e) => {
//   if (e.key === 'Escape') {
//     for (section in Project.currentProject.sections) {
//       section.taskForm.closeForm();
//     }
//   }
// });

const mainWindow = document.querySelector('div.main-window');
// mainWindow.appendChild(Section('home', 'Another'));

const defaultProject = new Project('home');
Project.currentProject = defaultProject;
defaultProject.draw();
// console.log(Project.currentProject.sections);
Project.currentProject.sections[0].draw();
// Project.currentProject.add;

// export const addTaskBtn = document.querySelector('div.default button.add-todo');
// export const secondAddTaskBtn = document.querySelector(
//   'div.another button.add-todo'
// );
