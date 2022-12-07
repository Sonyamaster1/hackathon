import { accordionArrowButtonSelector, accordionExpandSelector } from '../utils/constants.js';

export default function SetFAQEventListeners(cardsList) {
  function getHandlers(card) {
    function toggleDescription() {
      const button = card.querySelector(`.${accordionArrowButtonSelector}`);
      const description = card.querySelector(`.${accordionExpandSelector}`);

      button.classList.toggle('accordion__card-header-button_active');
      description.classList.toggle('accordion__card-description_visible');
      card.classList.toggle('opened');
    }

    function handleClickOutside(evt) {
      if(!card.contains(evt.target)) {
        toggleDescription();
        window.removeEventListener('click', handleClickOutside);
      }
    }

    return { toggleDescription, handleClickOutside };
  }

  cardsList.forEach((item) => {
    const { toggleDescription, handleClickOutside} = getHandlers(item.parentNode);

    item.addEventListener('click', (evt) => {
      if(!item.parentNode.classList.contains('opened')) {
        window.addEventListener('click', handleClickOutside);
      } else {
        window.removeEventListener('click', handleClickOutside);
      }

      toggleDescription();
    });
  })
}