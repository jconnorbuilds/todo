import DOMSection from './DOM-section.js';
import TaskForm from './DOM-task-form.js';
import { slugify } from './utils.js';

export default class Section {
  constructor(name, project) {
    this.name = name;
    this.slug = slugify(name);
    this.projectSlug = slugify(project.name);
    this.project = project;
    this.taskForm = new TaskForm(this);
    this.parentContainer = document.querySelector('div.main-window');
  }

  draw(parentContainer = this.parentContainer) {
    parentContainer.append(DOMSection(this));
    this.taskForm.draw();
  }
}
