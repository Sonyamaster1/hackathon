export default class Menu {
  constructor(menuIcon, navigationBar) {
    this.icon = menuIcon;
    this.navigationBar = navigationBar;
  }

  toggleActiveClass() {
    this.icon.classList.toggle('active');
    this.navigationBar.classList.toggle('active');
    if (this.navigationBar.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }

  setListeners() {
    this.icon.addEventListener('click', () => {
      this.toggleActiveClass();
    });
  }
}