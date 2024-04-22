import DOMSection from './DOM-section.js';
import Project from './Project.js';
import TaskForm from './TaskForm.js';
import { slugify } from './utils.js';

export default class Section {
  static #allSections = [];
  static #id = 0;
  constructor(data) {
    if (data.id === undefined) {
      this.id = Section.id;
      this.projectId = data.projectId;
      this.name = data.name;
      this.tasks = [];
    } else {
      this.id = data.id;
      this.projectId = data.projectId;
      this.name = data.name;
      this.tasks = data.tasks;
    }
    this.slug = slugify(data.name);
    Section.allSections.push(this);
    this.taskForm = new TaskForm(this.id);
    this.parentContainer = document.querySelector('div.main-window');
    this.taskContainerSelector = `.section-container.${this.slug}`;
    this.save();
  }

  static getInstance(id) {
    for (const instance of this.allSections) {
      if (instance.id == id) {
        return instance;
      }
    }
  }

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
    this.save();
  }

  draw(parentContainer = this.parentContainer) {
    parentContainer.append(DOMSection(this));
  }

  save() {
    Project.saveProjects();
  }
}
