export const dropdown = (dropdownTarget) => {
  dropdownTarget.classList.add('dd-container');

  const dropdown = document.createElement('div');
  dropdown.classList.add('dropdown', 'hidden');

  const ul = document.createElement('ul');
  ul.classList.add('dropdown__list-holder');
  const dropdownItemLabels = [
    'Rename section',
    'Do other stuff',
    'Drink more coffee',
    'More',
  ];

  dropdownItemLabels.forEach((label) => {
    const li = document.createElement('li');
    li.classList.add('dropdown__item');
    li.textContent = label;
    ul.append(li);
  });

  dropdown.append(ul);
  dropdownTarget.append(dropdown);

  dropdownTarget.addEventListener('mouseenter', toggleVisible);
  dropdownTarget.addEventListener('mouseleave', toggleVisible);
  dropdownTarget.addEventListener('mouseenter', setWidth, { once: true });
};

/**
 * Sets dropdown width dynamically. This allows the container to not expand
 * when the font weight changes on mouseover, but is still sized to fit the content.
 */
const setWidth = (e) => {
  const dropdown = e.target.querySelector('.dropdown');
  const initialWidth = dropdown.offsetWidth * 1.1;
  dropdown.style.maxWidth = `${initialWidth}px`;
  dropdown.style.minWidth = `${initialWidth}px`;
};

const toggleVisible = (e) => {
  const dropdown = e.target.querySelector('.dropdown');
  const isMouseleave = e.type === 'mouseleave';
  dropdown.classList.toggle('hidden', isMouseleave);
};
