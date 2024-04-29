import Section from './Section.js';
import { slugify } from './utils.js';

export default class Project {
  static #_id = 0;
  name;
  #isActive = false;
  static currentProject;
  static allProjects = [];
  constructor({ id = Project.id, name, isActive = false, sections } = {}) {
    this.id = id;
    this.name = name || 'Untitled project';
    this.isActive = isActive;
    this.slug = slugify(this.name);
    Project.allProjects.push(this);
    this.sections = sections
      ? sections
          .sort((a, b) => a.idx - b.idx)
          .map(section => Section.create(section))
      : [Section.create({ name: 'Default', projectId: this.id, idx: 0 })];
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      sections: this.sections,
      isActive: this.isActive,
    };
  }

  static create(data) {
    const project = new Project(data);
    project.addToSidebar();
    Project.saveProjects();
    return project;
  }

  static loadProjects() {
    let loadedProjectsJSON = JSON.parse(localStorage.getItem('projects'));
    if (!loadedProjectsJSON) {
      Project.#createDefaultProjects();
      return;
    }

    try {
      loadedProjectsJSON.forEach(projectJSON => {
        let loadedProject = this.create(projectJSON);
        if (loadedProject.isActive) loadedProject.activate();
      });
    } catch (error) {
      console.error('Failed to load projects: ', error);
      Project.#createDefaultProjects();
    }
  }

  static #createDefaultProjects() {
    // Create the first default project
    const defaultProject = this.create({ name: 'Home' });
    defaultProject.activate();

    // Create a second default project
    const secondProject = this.create({ name: 'Work' });
    secondProject.addSection({
      name: 'Another section',
      projectId: secondProject.id,
      idx: 1,
    });
  }

  static saveProjects() {
    localStorage.setItem('projects', JSON.stringify(Project.allProjects));
  }

  static get id() {
    while (Project.allProjects.find(project => project.id === this.#_id)) {
      ++this.#_id;
    }
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
    <button class="sidebar__project-button">
      <i class="fa-solid fa-hashtag"></i>
      <span>${this.name}</span>
    </button>
    <button class="delete"><i class="fa-solid fa-delete-left"></i></button>
    `;

    const projectButton = projectLi.querySelector(
      'button.sidebar__project-button'
    );

    projectButton.addEventListener('click', () => {
      this.activate();
    });

    const deleteButton = projectLi.querySelector('button.delete');
    // Cheap way to disable deleting the Home (default) project
    if (this.id === 0) deleteButton.setAttribute('disabled', '');

    deleteButton.addEventListener('click', this.delete);
    projectsArea.append(projectLi);
  }

  delete(e) {
    const idToDelete = e.target.closest('.sidebar__project').dataset.id;

    const idxToDelete = Project.allProjects.indexOf(
      Project.allProjects.find(project => project.id == idToDelete)
    );

    // Delete from allProjects list
    Project.allProjects.splice(idxToDelete, 1);
    // Delete from sidebar
    let projects = document.querySelectorAll('.sidebar__project');
    for (let project of projects) {
      if (project.dataset.id == idToDelete) {
        project.remove();
        break;
      }
    }

    // For now just activate the first project
    if (Project.currentProject.id == idToDelete) {
      Project.allProjects[0].activate();
    }

    Project.saveProjects();
  }

  activate() {
    this.isActive = true;
    this.updateUI();
    this.save();
  }

  addSection(data) {
    const section = Section.create(data);
    this.sections.push(section);
    // Ensure sections are stored in index order
    this.sections.sort((a, b) => a.idx - b.idx);
    this.save();
    return section;
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
    document.querySelectorAll('.section')?.forEach(section => section.remove());

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
      const drawnSection = section.draw();
      section.tasks.forEach(task => task.draw(drawnSection.taskContainer));
    });
  }

  save() {
    Project.saveProjects();
  }
}
