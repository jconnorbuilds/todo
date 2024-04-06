const PRIORITY_LEVELS = ['4', '3', '2', '1'];
const createPriorityButton = () => {
  const priorityBtn = document.createElement('div');
  priorityBtn.className = 'priority-btn__ gentle-btn';
  priorityBtn.dataset.priority = '4';
  priorityBtn.innerHTML = `
  <i class='fa-solid fa-shield-halved p${priorityBtn.dataset.priority}'></i>
  <span>Priority</span>
  `;

  priorityBtn.addEventListener('click', handlePriorityBtnClick);

  return priorityBtn;
};

const handlePriorityBtnClick = (e) => {
  const btn = e.currentTarget;
  if (
    e.target.matches(
      '.priority-btn__icon-container i, .priority-btn__icon-container'
    )
  ) {
    console.log('one', e.target);
    updateButtonPriority(e.target, btn);
    togglePriorityButtonExpansion(btn, false);
  } else if (btn.classList.contains('priority-btn--expanded')) {
    console.log('two', e.target);
    togglePriorityButtonExpansion(btn, false);
  } else {
    togglePriorityButtonExpansion(btn, true);
  }
};

function updateButtonPriority(target, btn) {
  const priorityIconContainer = target.closest('.priority-btn__icon-container');
  console.log({ priorityIconContainer });
  const newPriorityLevel = priorityIconContainer.dataset.priority;
  btn.dataset.priority = newPriorityLevel;

  const priorityButtonBaseIcon = btn.querySelector('i');
  priorityButtonBaseIcon.classList.add(`p${newPriorityLevel}`);

  PRIORITY_LEVELS.forEach((level) => {
    if (newPriorityLevel !== level)
      priorityButtonBaseIcon.classList.remove(`p${level}`);
  });
}

/**
 * Expand the priority button to show the selector icons (if expand = true)
 * Otherwise, shrink the button back to the original size with the base
 * icon reflecting the new priority color
 *
 * @param {*} btn
 * @param {boolean} [expand=true]
 */
const togglePriorityButtonExpansion = (btn, expand = true) => {
  btn.classList.toggle('priority-btn--expanded', expand);
  if (expand) {
    PRIORITY_LEVELS.forEach((level) => {
      addExpandedButtonIcon(btn, level);
    });
  } else {
    while (btn.children.length > 2) {
      btn.lastChild.remove();
      btn.classList.remove('priority-btn--expanded');
    }
  }
};

function addExpandedButtonIcon(btn, level) {
  const faIconClasses = 'fa-solid fa-shield-halved';

  const priorityLevelButton = document.createElement('span');
  priorityLevelButton.classList.add(
    'priority-btn__icon-container',
    'gentle-btn'
  );
  priorityLevelButton.dataset.priority = level;

  priorityLevelButton.innerHTML = `<i class="${faIconClasses} p${level}"></i>`;

  btn.append(priorityLevelButton);
}

export default createPriorityButton;
