import './index.css';
import Project from './Project';
import Task from './Task.js';

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    console.log(Project.currentProject.sections);
    Project.currentProject.sections.forEach((section) => {
      section.taskForm.closeForm();
    });
  }
});

const defaultProject = new Project('Home');
defaultProject.isActive = true;

new Project('Second Project');
new Project('Third Project');

Task.loadTasks();

// Object.keys(localStorage).forEach((key) => {
//   localStorage.removeItem(key);
// });
