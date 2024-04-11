import './index.css';
import Project from './Project';

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    console.log(Project.currentProject.sections);
    Project.currentProject.sections.forEach((section) => {
      section.taskForm.closeForm();
    });
  }
});

const defaultProject = new Project('Home');
Project.currentProject = defaultProject;
defaultProject.draw();
defaultProject.isActive = true;

const anotherProject = new Project('Second Project');
anotherProject.draw();

console.log(Project.allProjects);
