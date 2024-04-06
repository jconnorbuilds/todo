const PRIORITY_LEVELS = ['4', '3', '2', '1'];
const FA_ICON_CLASSES = 'fa-solid fa-shield-halved';

const createPriorityButton = (priorityLevel = 4) => {
  const priorityBtn = document.createElement('div');
  priorityBtn.className = 'priority-btn__ gentle-btn';
  priorityBtn.dataset.priority = priorityLevel;
  priorityBtn.innerHTML = `
  <i class='fa-solid fa-shield-halved p${priorityLevel}'></i>
  <span>Priority</span>
  `;

  priorityBtn.addEventListener('click', handlePriorityBtnClick);

  return priorityBtn;
};

const handlePriorityBtnClick = (e) => {
  const btn = e.currentTarget;
  const priorityIconSelectors =
    '.priority-btn__icon-container i, .priority-btn__icon-container';

  if (e.target.matches(priorityIconSelectors)) {
    updateTaskPriority(e.target, btn);
    togglePriorityButtonExpansion(btn, false);
  } else if (btn.classList.contains('priority-btn--expanded')) {
    togglePriorityButtonExpansion(btn, false);
  } else {
    togglePriorityButtonExpansion(btn, true);
  }
};

const updateTaskPriority = (target, btn) => {
  const priorityIconContainer = target.closest('.priority-btn__icon-container');
  const newPriorityLevel = priorityIconContainer.dataset.priority;
  btn.dataset.priority = newPriorityLevel;

  btn.querySelector('i').classList = `${FA_ICON_CLASSES} p${newPriorityLevel}`;
};

/**
 * Expand the priority button to show the selector icons (if expand = true)
 * Otherwise, shrink the button back to the original size with the base
 * icon reflecting the new priority color
 *
 * @param {HTMLElement} btn
 * @param {boolean} [expand=true]
 */
const togglePriorityButtonExpansion = (btn, expand = true) => {
  btn.classList.toggle('priority-btn--expanded', expand);
  expand ? expandPriorityButton(btn) : collapsePriorityButton(btn);
};

const expandPriorityButton = (btn, level) => {
  PRIORITY_LEVELS.forEach((level) => {
    const priorityLevelButton = document.createElement('span');
    priorityLevelButton.classList.add(
      'priority-btn__icon-container',
      'gentle-btn'
    );
    priorityLevelButton.dataset.priority = level;
    priorityLevelButton.innerHTML = `<i class="${FA_ICON_CLASSES} p${level}"></i>`;

    btn.append(priorityLevelButton);
  });
};

// There's definitely a better way to do this
const collapsePriorityButton = (btn) => {
  while (btn.children.length > 2) {
    btn.lastChild.remove();
    btn.classList.remove('priority-btn--expanded');
  }
};

export default createPriorityButton;
