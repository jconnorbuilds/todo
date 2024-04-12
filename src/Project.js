import Section from './Section.js';
import { slugify } from './utils.js';

export default class Project {
  static #_uniqueId = 0;
  name;
  todoItems = [];
  sections;
  #isActive = false;
  static #defaultProject;
  // static #activeProject;
  static #allProjects = [];
  constructor(name) {
    this.id = Project.uniqueId;
    this.name = name;
    this.slug = slugify(name);
    this.sections = [];
    this.addSection('Default');
    Project.allProjects.push(this);
  }

  // Static methods and props
  static get uniqueId() {
    return this.#_uniqueId++;
  }

  static get allProjects() {
    return this.#allProjects;
  }

  static get defaultProject() {
    return this.#defaultProject;
  }

  static get defaultProject() {
    return this.allProjects[0];
  }

  // static get activeProject() {
  //   return this.#activeProject;
  // }

  // static set activeProject(Project) {
  //   this.allProjects.forEach((project) => project.isActive = false)
  //   this.#activeProject = Project;
  // }

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

  set isActive(active) {
    if (active) {
      Project.allProjects.forEach((project) => (project.#isActive = false));
    }
    this.#isActive = active;
    this.updateUI();
  }

  get isActive() {
    return this.#isActive;
  }

  // Instance methods and props
  draw() {
    const projectsArea = document.querySelector('.sidebar__projects-list');
    const projectLi = document.createElement('li');
    projectLi.classList = 'sidebar__project';
    projectLi.dataset.id = this.id;
    projectLi.innerHTML = `
    <button>
    <i class="fa-solid fa-hashtag"></i>
    <span>${this.name}</span>
    </button>
    `;

    projectLi.addEventListener('click', () => {
      this.isActive = true;
    });

    projectsArea.append(projectLi);
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
  updateUI() {
    // Update styles for the sidebar project list
    const projects = document.querySelectorAll('.sidebar__project');
    console.log(projects);
    projects.forEach((project) => {
      +project.dataset.id === this.id
        ? this.#toggleActiveClass(project, true)
        : this.#toggleActiveClass(project, false);
    });
  }

  #toggleActiveClass(element, isActive) {
    element.classList.toggle('active', isActive);
  }
}
