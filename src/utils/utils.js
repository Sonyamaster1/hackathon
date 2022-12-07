import { headerElement } from "./constants.js";

export function handleHeaderToggle(evt) {
  const scroll = window.scrollY;

  if(scroll > 80) {
    headerElement.style.top = evt.y < 130 ? 0 : '-110px';
  }
}