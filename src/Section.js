import DOMSection from './DOM-section.js';
import TaskForm from './TaskForm.js';
import { slugify } from './utils.js';

export default class Section {
  tasks = [];
  static allSections = [];
  static #id = 0;
  constructor(name, project) {
    this.id = Section.id;
    this.name = name;
    this.slug = slugify(name);
    this.projectSlug = slugify(project.name);
    this.project = project;
    this.taskForm = new TaskForm(this);
    this.parentContainer = document.querySelector('div.main-window');
    this.taskContainerSelector = `.section-container.${this.project.slug}.${this.slug}`;
    Section.allSections.push(this);
  }

  static getInstance(id) {
    console.log(this.allSections);
    for (const instance of this.allSections) {
      console.log(instance.id);
      if (instance.id == id) {
        return instance;
      }
    }
  }

  get taskContainer() {
    return document.querySelector(this.taskContainerSelector);
  }

  static get id() {
    return this.#id++;
  }

  addTask(item) {
    this.tasks.push(item);
  }

  draw(parentContainer = this.parentContainer) {
    parentContainer.append(DOMSection(this));
    this.tasks.forEach((task) => task.draw());
  }
}
