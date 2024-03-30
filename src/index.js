import { DOMCreateProject } from './DOM-funcs';
import './index.css';
import Project from './Project';

const STARTING_PROJECTS_DATA = [
  {
    name: 'Home',
    items: [],
  },
  {
    name: 'Personal',
    items: [],
  },
  {
    name: 'Work',
    items: [],
  },
];

STARTING_PROJECTS_DATA.forEach((proj) => {
  const newProject = new Project(proj.name);
  Project.allProjects.push(newProject);
  newProject.logSections();
  DOMCreateProject(proj);
});

Project.logProjects();
