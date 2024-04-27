import DOMSection from './DOM-section.js';
import Project from './Project.js';
import TaskForm from './TaskForm.js';
import Task from './Task.js';
import { slugify } from './utils.js';

export default class Section {
  static allSections = [];
  static #_id = 0;
  constructor({ id = Section.id, projectId, idx, name, tasks } = {}) {
    this.id = id;
    this.idx = idx;
    this.projectId = projectId;
    this.name = name;
    this.tasks = tasks ? tasks.map(task => Task.create(task)) : [];
    this.slug = slugify(this.name);
    Section.allSections.push(this);
    this.taskForm = new TaskForm(this.id);
    this.sectionList = document.querySelector('div.main-window');
    this.taskContainerSelector = `.section.${this.slug}`;
  }

  static recalculateIndicies() {
    let sections = document.querySelectorAll('.main-window .section');
    let idx = 0;
    sections.forEach(section => {
      let thisSection = this.getInstance(section.dataset.id);
      thisSection.idx = idx++;
      section.dataset.idx = thisSection.idx;
    });

    Project.saveProjects();
  }

  static getInstance(id) {
    for (const instance of this.allSections) {
      if (instance.id == id) {
        return instance;
      }
    }
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

  draw(idx = this.idx) {
    const sections = document.querySelectorAll('section.section');
    if (sections.length) {
      for (let section of sections) {
        if (+section.dataset.idx === idx - 1) {
          section.after(DOMSection(this));
        }
      }
    } else {
      this.sectionList.append(DOMSection(this));
    }
    Section.recalculateIndicies();
  }

  save() {
    Project.saveProjects();
  }
}
