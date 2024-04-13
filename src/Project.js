import Section from './Section.js';
import { slugify } from './utils.js';

export default class Project {
  static #_uniqueId = 0;
  name;
  sections;
  #isActive = false;
  static #defaultProject;
  static currentProject;
  static #allProjects = [];
  constructor(name) {
    this.id = Project.uniqueId;
    this.name = name;
    this.slug = slugify(name);
    this.sections = [];
    this.addSection('Default');
    Project.allProjects.push(this);
    this.draw();
  }

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
      Project.currentProject = this;
    }
    this.#isActive = active;

    this.updateUI();
  }

  get isActive() {
    return this.#isActive;
  }

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
  }

  getTasks() {
    const tasks = {};
    this.sections.forEach((section) => {
      const sectionTasks = [];
      section.tasks.forEach((task) => sectionTasks.push(task));
      tasks[section.name] = sectionTasks;
    });
    return tasks;
  }

  static getAllTasks() {}

  logSections() {
    for (let s of this.sections) console.log(s.name);
  }

  updateUI() {
    // Update styles for the sidebar project list
    const projects = document.querySelectorAll('.sidebar__project');
    projects.forEach((project) => {
      +project.dataset.id === this.id
        ? this.#toggleActiveClass(project, true)
        : this.#toggleActiveClass(project, false);
    });

    // Update project title
    document.querySelector('.project-title').textContent = this.name;

    // Clear all project sections from the main window
    document
      .querySelectorAll('.section-container')
      ?.forEach((section) => section.remove());

    // Make sure the "Add Task" button is showing
    this.sections.forEach((section) => {
      section.taskForm.closeForm();
    });

    // Draw project sections
    this.drawSections();
  }

  #toggleActiveClass(element, isActive) {
    element.classList.toggle('active', isActive);
  }

  drawSections() {
    this.sections.forEach((section) => section.draw());
  }
}
