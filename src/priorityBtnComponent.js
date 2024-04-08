const PRIORITY_LEVELS = ['4', '3', '2', '1'];
const FA_ICON_CLASSES = 'fa-solid fa-shield-halved';
const PRIORITY_LEVEL_BUTTON_CLASS = 'priority-btn__level-btn';
const BUTTON_CONTAINER_CLASS = 'priority-btn__level-buttons-container';

export default class PriorityButton {
  constructor(form, priorityLevel = 4) {
    this.form = form;
    this.priorityLevel = priorityLevel;
    this.button = this.createButton();
  }

  createButton() {
    const priorityBtn = document.createElement('div');
    priorityBtn.className = 'priority-btn__ gentle-btn';
    priorityBtn.dataset.priority = this.priorityLevel;
    priorityBtn.innerHTML = `
    <i class='${FA_ICON_CLASSES} p${this.priorityLevel}'></i>
    <span>Priority</span>
    `;

    priorityBtn.addEventListener('click', this.handleClick.bind(this));

    return priorityBtn;
  }

  handleClick(e) {
    const btn = this.button;
    const priorityIconSelectors = `.${PRIORITY_LEVEL_BUTTON_CLASS} i, .${PRIORITY_LEVEL_BUTTON_CLASS}`;

    if (e.target.matches(priorityIconSelectors)) {
      this.updateTaskPriority(e.target);
      this.toggleButtonExpansion(false);
      this.focusForm();
    } else if (btn.classList.contains('priority-btn--expanded')) {
      this.toggleButtonExpansion(false);
    } else {
      this.toggleButtonExpansion(true);
    }
  }

  updateTaskPriority(target) {
    const priorityIconContainer = target.closest(
      `.${PRIORITY_LEVEL_BUTTON_CLASS}`
    );
    const newPriorityLevel = priorityIconContainer.dataset.priority;
    this.button.dataset.priority = newPriorityLevel;

    this.button.querySelector(
      'i'
    ).classList = `${FA_ICON_CLASSES} p${newPriorityLevel}`;
  }

  /**
   * Expand the priority button to show the selector icons (if expand = true)
   * Otherwise, shrink the button back to the original size with the base
   * icon reflecting the new priority color
   *
   * @param {HTMLElement} btn
   * @param {boolean} [expand=true]
   */
  toggleButtonExpansion(expand = true) {
    this.button.classList.toggle('priority-btn--expanded', expand);
    expand ? this.expand() : this.collapse();
  }

  expand() {
    const priorityLevelButtonsContainer = document.createElement('div');
    priorityLevelButtonsContainer.classList = BUTTON_CONTAINER_CLASS;
    PRIORITY_LEVELS.forEach((level) => {
      const priorityLevelButton = document.createElement('span');
      priorityLevelButton.classList.add(
        `${PRIORITY_LEVEL_BUTTON_CLASS}`,
        'gentle-btn'
      );
      priorityLevelButton.dataset.priority = level;
      priorityLevelButton.innerHTML = `<i class="${FA_ICON_CLASSES} p${level}"></i>`;

      priorityLevelButtonsContainer.append(priorityLevelButton);
    });
    this.button.append(priorityLevelButtonsContainer);
  }

  collapse() {
    document.querySelector(`.${BUTTON_CONTAINER_CLASS}`).remove();
  }

  reset() {
    this.button.dataset.priority = 4;
    this.button.querySelector(
      'i'
    ).classList = `${FA_ICON_CLASSES} p${this.priorityLevel}`;
  }

  /**
   * Focuses the task editor's main input field if it's blank, otherwise
   * focuses the submit button so the user can press Enter to submit the form.
   */
  focusForm() {
    const formTaskTitleField = this.form.form.querySelector('input');
    const formSubmitButton = this.form.form.querySelector(
      'button[type="submit"]'
    );
    formTaskTitleField.value !== ''
      ? formSubmitButton.focus()
      : formTaskTitleField.focus();
  }
}
