const DOMDrawProject = (project) => {
  const projectsArea = document.querySelector('div.projects');
  const p = document.createElement('p');
  p.classList.add('project');
  p.textContent = project.name;
  projectsArea.appendChild(p);
};

export default DOMDrawProject;
