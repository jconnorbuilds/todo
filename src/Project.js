import { DOMCreateProject } from './DOM-funcs.js';
import Section from './Section.js';

export default class Project {
  name;
  todoItems = [];
  constructor(name) {
    this.name = name;
    this.sections = [];
    this.sections.push(new Section('default', this));
    Project.allProjects.push(this);
  }

  // Static methods and props
  static allProjects = [];
  static logProjects() {
    console.log(this.allProjects);
  }
  static get defaultProject() {
    return this.allProjects[0];
  }
  static currentProject = Project.defaultProject;

  static getProjectInstance(name) {
    const desiredProject = Project.allProjects.filter(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );

    if (desiredProject.length) {
      return desiredProject;
    } else {
      throw ProjectNotFoundError(`The project "${name}" doesn't exist!`);
    }
  }

  // Instance methods and props
  get className() {
    return slugify(this.name); /**@TODO ideally require uniqueness */
  }

  draw() {
    DOMCreateProject(this);
  }

  addSection(sectionName) {
    this.sections.push(new Section(sectionName));
  }

  appendTodoItem(item, section = 'default') {
    this.todoItems.push(item);
  }
  logTodoItems() {
    console.log(this.todoItems);
  }
  logSections() {
    for (let s of this.sections) console.log(s.name);
  }
}
