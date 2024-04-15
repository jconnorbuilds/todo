/**
 * Handler for mouseenter and mouseleave events.
 * Toggles between a 'regular' icon and one with a fill when the user
 * mouses over the Add Task button.
 *
 * @param {*} e - the mouseenter or mouseleave event
 */
export const toggleIconStyleOnMouseEvents = (e) => {
  const icon = e.target.querySelector('i');
  icon?.classList.toggle('fa-solid');
  icon?.classList.toggle('fa-regular');
};
