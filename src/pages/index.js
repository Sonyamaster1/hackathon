import "./index.css";
import FormValidator from "../components/FormValidator.js";
import { vacanciesData } from "../utils/vacancies.js";
import VacanciesRender from "../components/VacanciesRender.js";
import Popup from "../components/Popup.js";
import PopupWithVideo from "../components/PopupWithVideo";
import Carousel from "../components/Carousel.js";
import SetFAQEventListeners from "../components/FAQ.js";
import CardsSlider from "../components/CardsSlider.js";
import { handleHeaderToggle } from '../utils/utils.js';
import Menu from "../components/Menu";
import {
  validationConfig,
  vacanciesConfig,
  vacanciesFormElement,
  tellUsFormElement,
  closeButtonSelector,
  popupVideoSelector,
  popupTellUsSelector,
  buttonNoVacanciesElement,
  faqCardsList,
  cardsSliderProps,
  menuIcon,
  navigationBar,
  headerElement,
} from "../utils/constants.js";

// ------------- валидация формы

const tellUsFormValidation = new FormValidator(validationConfig, tellUsFormElement);
tellUsFormValidation.enableValidation();

// ------------- попап формы

const popupTellUs = new Popup(popupTellUsSelector);

popupTellUs.setEventListeners();

buttonNoVacanciesElement.addEventListener('click', () => {
  popupTellUs.open();
});


// ------------- попап видео

const popupWithVideo = new PopupWithVideo(popupVideoSelector);
popupWithVideo.setEventListeners();
popupWithVideo.handleClicks();

// ------------- рендер списка вакансий

const handleVacanciesRender = VacanciesRender(vacanciesConfig, vacanciesData);

handleVacanciesRender();

vacanciesFormElement.addEventListener("input", handleVacanciesRender);

// ------------- карусель

const carousel = new Carousel();
carousel.init();
carousel.setListeners();

// ------------- faq event listeners

SetFAQEventListeners(faqCardsList);

// ------------- header event listeners

window.addEventListener('mousemove', handleHeaderToggle);

// ------------- cards slider

let timeLine = CardsSlider(cardsSliderProps);

// ------------- burger menu

const menu = new Menu(menuIcon, navigationBar);
menu.setListeners();
