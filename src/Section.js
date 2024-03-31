import DOMSection from './DOM-project-section.js';
import { TaskForm } from './new-task-form.js';
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

  get className() {
    return slugify(this.name.toLowerCase()); /**@TODO require uniqueness */
  }

  draw(parentContainer = this.parentContainer) {
    parentContainer.append(DOMSection(this));
  }
}
