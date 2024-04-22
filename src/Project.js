import Section from './Section.js';
import Task from './Task.js';
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
      this.sections = [];
    } else {
      this.id = data.id;
      this.name = data.name;
      this.sections = data.sections;
    }
    this.slug = slugify(this.name);
    Project.allProjects.push(this);
    Project.saveProjects();
  }

  static loadProjects() {
    let loadedProjectsJSON = JSON.parse(localStorage.getItem('projects'));

    if (loadedProjectsJSON) {
      let projectToMakeActive;
      loadedProjectsJSON?.forEach((project) => {
        let loadedProject = new Project(project);
        if (loadedProject.id === 0) projectToMakeActive = loadedProject;
        loadedProject.addToSidebar();
        loadedProject.sections = [];

        project.sections.forEach((section) => {
          let loadedSection = loadedProject.addSection(new Section(section));
          loadedSection.tasks = [];
          section.tasks.forEach((task) =>
            loadedSection.addTask(new Task(task))
          );
        });
      });
      projectToMakeActive.activate();
    } else {
      Project.createDefaultProject();
    }

    return loadedProjectsJSON;
  }

  static createDefaultProject() {
    const defaultProject = new Project('Home');
    defaultProject.addSection(
      new Section({ name: 'Default', projectId: defaultProject.id })
    );
    defaultProject.addToSidebar();
    // defaultProject.sections[0].draw();
    // defaultProject.isActive = true;

    const secondProject = new Project('Another one');
    secondProject.addSection(
      new Section({ name: 'Default', projectId: secondProject.id })
    );
    secondProject.addSection(
      new Section({
        name: 'Another Section',
        projectId: secondProject.id,
      })
    );

    secondProject.addToSidebar();
    secondProject.activate();
  }

  static saveProjects() {
    localStorage.setItem('projects', JSON.stringify(Project.allProjects));
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
      console.log(this);
      this.activate();
    });

    projectsArea.append(projectLi);
  }

  activate() {
    this.isActive = true;
    this.updateUI();
  }

  addSection(sectionObj) {
    // const newSection = new Section({
    //   name: sectionName,
    //   projectId: this.id,
    // });

    // this.sections.push(newSection);
    // if (this === Project.currentProject) newSection.draw();
    // this.save();
    this.sections.push(sectionObj);
    this.save();

    return sectionObj;
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
    this.#drawSections();

    // Make sure the "Add Task" button is showing
    this.sections.forEach((section) => section.taskForm.showAddTaskButton());
  }

  #toggleActiveClass(element, isActive) {
    element.classList.toggle('active', isActive);
  }

  #drawSections() {
    this.sections.forEach((section) => {
      section.draw();
      section.tasks.forEach((task) => task.draw(section.taskContainer));
    });
  }

  save() {
    Project.saveProjects();
  }
}
