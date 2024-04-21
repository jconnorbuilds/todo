import DOMSection from './DOM-section.js';
import Project from './Project.js';
import TaskForm from './TaskForm.js';
import { slugify } from './utils.js';

export default class Section {
  tasks = [];
  static #allSections = [];
  static #id = 0;
  constructor(data) {
    if (data.id === undefined) {
      console.log(data.id);
      this.id = Section.id;
      this.projectId = data.projectId;
      this.name = data.name;
      this.project.sections.push(this);
      Project.saveProjects();
    } else {
      this.id = data.id;
      this.projectId = data.projectId;
      this.name = data.name;
    }
    this.slug = slugify(data.name);
    Section.allSections.push(this);
    this.taskForm = new TaskForm(this.id);
    this.parentContainer = document.querySelector('div.main-window');
    this.taskContainerSelector = `.section-container.${this.slug}`;
  }

  static getInstance(id) {
    console.log(this.allSections);
    for (const instance of this.allSections) {
      if (instance.id == id) {
        return instance;
      }
    }
  }

  // save() {
  //   if (!this.project.sections.includes(this)) {
  //     this.project.sections.push(this);
  //   }

  //   Project.saveProjects();
  // }

  static get allSections() {
    return this.#allSections;
  }

  get taskContainer() {
    return document.querySelector(this.taskContainerSelector);
  }

  static get id() {
    return this.#id++;
  }

  get project() {
    return Project.getInstance(this.projectId);
  }

  addTask(item) {
    this.tasks.push(item);
  }

  draw(parentContainer = this.parentContainer) {
    parentContainer.append(DOMSection(this));
    this.tasks.forEach((task) => task.draw());
  }
}
