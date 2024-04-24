import DOMSection from './DOM-section.js';
import Project from './Project.js';
import TaskForm from './TaskForm.js';
import Task from './Task.js';
import { slugify } from './utils.js';

export default class Section {
  static #allSections = [];
  static #_id = 0;
  constructor({ id = Section.id, projectId, name } = {}) {
    this.id = id;
    this.projectId = projectId;
    this.name = name;
    this.tasks = [];
    this.slug = slugify(this.name);
    Section.allSections.push(this);
    this.taskForm = new TaskForm(this.id);
    this.parentContainer = document.querySelector('div.main-window');
    this.taskContainerSelector = `.section-container.${this.slug}`;
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

  static create(data) {
    const section = new Section(data);
    return section;
  }

  get taskContainer() {
    return document.querySelector(this.taskContainerSelector);
  }

  static get id() {
    while (Section.allSections.find(section => section.id === this.#_id)) {
      ++this.#_id;
    }
    return this.#_id++;
  }

  get project() {
    return Project.getInstance(this.projectId);
  }

  addTask(data) {
    const task = Task.create(data);
    this.tasks.push(task);
    this.save();

    return task;
  }

  draw(parentContainer = this.parentContainer) {
    parentContainer.append(DOMSection(this));
  }

  save() {
    Project.saveProjects();
  }
}
