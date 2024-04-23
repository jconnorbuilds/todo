import Section from './Section.js';
import Task from './Task.js';
import { slugify } from './utils.js';

export default class Project {
  static #_id = 0;
  name;
  #isActive = false;
  static currentProject;
  static allProjects = [];
  constructor({ id = Project.id, name, isActive = false } = {}) {
    this.id = id;
    this.name = name || 'Untitled project';
    this.isActive = isActive;
    this.sections = [];
    this.slug = slugify(this.name);
    Project.allProjects.push(this);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      sections: this.sections,
      isActive: this.isActive,
    };
  }

  static loadProjects() {
    let loadedProjectsJSON = JSON.parse(localStorage.getItem('projects'));
    if (!loadedProjectsJSON) {
      Project.#createDefaultProjects();
      return;
    }

    try {
      loadedProjectsJSON.forEach(projectJSON => {
        let loadedProject = new Project(projectJSON);
        loadedProject.addToSidebar();

        projectJSON.sections.forEach(sectionJSON => {
          let loadedSection = loadedProject.addSection(
            new Section(sectionJSON)
          );
          sectionJSON.tasks.forEach(taskJSON =>
            loadedSection.addTask(new Task(taskJSON))
          );
        });
        if (loadedProject.isActive) loadedProject.activate();
      });
    } catch (error) {
      console.error('Failed to load projects: ', error);
      Project.#createDefaultProjects();
    }
  }

  static #createDefaultProjects() {
    // Create the first default project
    const defaultProject = new Project({ name: 'Home' });
    defaultProject.addSection(
      new Section({
        name: 'Default',
        projectId: defaultProject.id,
      })
    );
    defaultProject.addToSidebar();
    defaultProject.activate();

    // Create a second default project
    const secondProject = new Project({ name: 'Work' });
    secondProject.addSection(
      new Section({ name: 'Default', projectId: secondProject.id })
    );
    secondProject.addSection(
      new Section({
        name: 'Another section',
        projectId: secondProject.id,
      })
    );
    secondProject.addToSidebar();
  }

  static saveProjects() {
    localStorage.setItem('projects', JSON.stringify(Project.allProjects));
  }

  static get id() {
    return this.#_id++;
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
    if (active && !this.active) {
      Project.allProjects.forEach(project => (project.#isActive = false));
      Project.currentProject = this;
    }
    this.#isActive = active;
    this.save();
  }

  get isActive() {
    return this.#isActive;
  }

  addToSidebar() {
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
      this.activate();
    });

    projectsArea.append(projectLi);
  }

  activate() {
    this.isActive = true;
    this.updateUI();
  }

  addSection(sectionObj) {
    this.sections.push(sectionObj);
    this.save();

    return sectionObj;
  }

  getTasks() {
    const tasks = {};
    this.sections.forEach(section => {
      const sectionTasks = [];
      section.tasks.forEach(task => sectionTasks.push(task));
      tasks[section.name] = sectionTasks;
    });
    return tasks;
  }

  updateUI() {
    // Update styles for the sidebar project list
    const projects = document.querySelectorAll('.sidebar__project');
    projects.forEach(project => {
      +project.dataset.id === this.id
        ? this.#toggleActiveClass(project, true)
        : this.#toggleActiveClass(project, false);
    });

    // Update project title
    document.querySelector('.project-title').textContent = this.name;

    // Clear all project sections from the main window
    document
      .querySelectorAll('.section-container')
      ?.forEach(section => section.remove());

    // Draw project sections
    this.#drawSections();

    // Make sure the "Add Task" button is showing
    this.sections.forEach(section => section.taskForm.showAddTaskButton());
  }

  #toggleActiveClass(element, isActive) {
    element.classList.toggle('active', isActive);
  }

  #drawSections() {
    this.sections.forEach(section => {
      section.draw();
      section.tasks.forEach(task => task.draw(section.taskContainer));
    });
  }

  save() {
    Project.saveProjects();
  }
}
