const DOMDrawProject = (project) => {
  const projectsArea = document.querySelector('.sidebar__projects-list');
  projectsArea.innerHTML += `
  <li class="sidebar__project" data-id="${project.id}">
  <button>
  <i class="fa-solid fa-hashtag"></i>
  <span>${project.name}</span>
  </button>
  </li>
  `;

  projectsArea
    .querySelector('li')
    .addEventListener('click', () => (project.isActive = true));
};

export default DOMDrawProject;
