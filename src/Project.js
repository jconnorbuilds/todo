import { DOMCreateProject } from './DOM-funcs';

export default class Project {
  projectName;
  todoItems = [];
  constructor(projectName) {
    this.projectName = projectName;
  }
  // Static methods and props
  static allProjects = [];

  static logProjects() {
    console.log(this.allProjects);
  }

  static getDefaultProject() {
    return this.allProjects[0];
  }

  // Instance methods and props
  appendTodoItem(item) {
    this.todoItems.push(item);
  }
  logTodoItems() {
    console.log(this.todoItems);
  }
}

const createProject = (project) => {
  const newProject = new Project(project.name);
  // console.log(JSON.stringify(newProject) + ' created');
  return newProject;
};

const STARTING_PROJECTS_DATA = [
  {
    name: 'General',
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
  const newProject = createProject(proj);
  Project.allProjects.push(newProject);
  DOMCreateProject(proj);
});

export { createProject };
