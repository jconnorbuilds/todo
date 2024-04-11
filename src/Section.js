import DOMSection from './DOM-section.js';
import TaskForm from './TaskForm.js';
import { slugify } from './utils.js';

export default class Section {
  constructor(name, project) {
    this.name = name;
    this.slug = slugify(name);
    this.projectSlug = slugify(project.name);
    this.project = project;
    this.taskForm = new TaskForm(this);
    this.parentContainer = document.querySelector('div.main-window');
    this.taskContainerSelector = `.section-container.${this.project.slug}.${this.slug}`;
  }

  get taskContainer() {
    return document.querySelector(this.taskContainerSelector);
  }

  draw(parentContainer = this.parentContainer) {
    parentContainer.append(DOMSection(this));
    // this.taskForm.draw();
  }
}
