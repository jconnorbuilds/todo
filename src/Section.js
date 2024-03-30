export default class Section {
  constructor(name) {
    this.name = name;
  }
  get className() {
    return this.name.toLowerCase(); /**@TODO slugify, and ideally require uniqueness */
  }
}
