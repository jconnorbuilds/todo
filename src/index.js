import './index.css';
import Project from './Project';
import Section from './Section.js';
import Task from './Task.js';

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    Project.currentProject.sections.forEach((section) => {
      console.log(section);
      section.taskForm.closeForm();
    });
  }
});

// const defaultProject = new Project('Home');
// defaultProject.draw();
// defaultProject.isActive = true;
// defaultProject.addSection('First section');
// defaultProject.addSection('Second section');
// defaultProject.addSection('Third section');

// new Project('Second Project');
// new Project('Third Project');

// Object.keys(localStorage).forEach((key) => {
//   localStorage.removeItem(key);
// });

Project.loadProjects();
