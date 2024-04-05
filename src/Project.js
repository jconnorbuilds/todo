import DOMDrawProject from './DOM-project.js';
import Section from './Section.js';
import { slugify } from './utils.js';

export default class Project {
  name;
  todoItems = [];
  sections;
  static #_defaultProject;
  static #_currentProject;
  static #_allProjects = [];
  constructor(name) {
    this.name = name;
    this.slug = slugify(name);
    this.sections = [];
    this.addSection('Default');
    Project.allProjects.push(this);
  }

  // Static methods and props
  static get allProjects() {
    return this.#_allProjects;
  }

  static get defaultProject() {
    return this.#_defaultProject;
  }

  static get defaultProject() {
    return this.allProjects[0];
  }

  static get currentProject() {
    return this.#_currentProject;
  }

  static set currentProject(Project) {
    this.#_currentProject = Project;
  }

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
  draw() {
    DOMDrawProject(this);
  }

  addSection(sectionName) {
    const newSection = new Section(sectionName, this);
    this.sections.push(newSection);
    newSection.draw();
    
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
