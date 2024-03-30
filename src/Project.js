import Section from './Section.js';

export default class Project {
  name;
  todoItems = [];
  constructor(name, sections = []) {
    this.name = name;
    sections.push(new Section('default'));
    this.sections = sections;
  }
  // Static methods and props
  static allProjects = [];
  static logProjects() {
    console.log(this.allProjects);
  }
  static getDefaultProject() {
    return this.allProjects[0];
  }
  /**
   * Returns an existing project instance or throws an error
   *
   * @static
   * @param {string} name
   */
  static getProjectInstance(name) {
    const desiredProject = Project.allProjects.filter(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );
    if (desiredProject.length) {
      return desiredProject;
    } else {
      throw ProjectNotFoundError(`The project "${name}" doesn't exist!`);
    }
  }

  // Instance methods and props
  addSection(sectionName) {
    this.sections.push(new Section(sectionName));
  }
  appendTodoItem(item, section = 'default') {
    this.todoItems.push(item);
  }
  logTodoItems() {
    console.log(this.todoItems);
  }
  logSections() {
    for (let s of this.sections) console.log(s.name);
  }
}
