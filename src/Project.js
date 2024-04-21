import Section from './Section.js';
import { slugify } from './utils.js';

export default class Project {
  static #_id = 0;
  name;
  #isActive = false;
  static #defaultProject;
  static currentProject;
  static #allProjects = [];
  constructor(data) {
    if (typeof data == 'string') {
      this.id = Project.id;
      this.name = data;
    } else {
      this.id = data.id;
      this.name = data.name;
    }
    this.slug = slugify(this.name);
    this.sections = [];
    Project.allProjects.push(this);
    Project.saveProjects();
  }

  static loadProjects() {
    let loadedProjects = JSON.parse(localStorage.getItem('projects'));
    loadedProjects?.forEach((project) => new Project(project).draw());

    return loadedProjects;
  }

  static saveProjects() {
    localStorage.setItem('projects', JSON.stringify(Project.allProjects));
    console.log(localStorage['projects']);
  }

  static get id() {
    return this.#_id++;
  }

  static get allProjects() {
    return this.#allProjects;
  }

  static get defaultProject() {
    return this.allProjects[0];
  }

  static getInstance(id) {
    for (const instance of this.allProjects) {
      if (instance.id == id) {
        return instance;
      }
    }
    throw new Error(`Project with id ${id} not found!`);
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
    const newSection = new Section({
      name: sectionName,
      projectId: this.id,
    });

    this.sections.push(newSection);
    newSection.draw();
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

    // Draw project sections
    this.drawSections();

    // Make sure the "Add Task" button is showing
    this.sections.forEach((section) => section.taskForm.showAddTaskButton());
  }

  #toggleActiveClass(element, isActive) {
    element.classList.toggle('active', isActive);
  }

  drawSections() {
    this.sections.forEach((section) => section.draw());
  }
}
