export default function VacanciesRender(vacanciesConfig, vacanciesData) {
  const { containerSelector, showMoreButtonSelector, placeholderSelector, cardButtonSelector, cardExpandSelector } = vacanciesConfig;
  const containerElement = document.querySelector(containerSelector);
  const showMoreButton = document.querySelector(`.${showMoreButtonSelector}`);

  function toggleSelectorModifier(selector, action, modifier = '_visible', place = document) {
    const element = place.querySelector(`.${selector}`);
    element.classList[action](selector + modifier);
  }

  const toggleShowMoreButton = toggleSelectorModifier.bind(null, showMoreButtonSelector);
  const togglePlaceholderVisibility = toggleSelectorModifier.bind(null, placeholderSelector);
  const toggleCardButton = toggleSelectorModifier.bind(null, cardButtonSelector, 'toggle', '_active');
  const toggleExpandBlock = toggleSelectorModifier.bind(null, cardExpandSelector, 'toggle', '_visible');

  function createVacancyCard(data) {
    const {
      templateSelector,
      cardSelector,
      cardTitleSelector,
      cardHeaderSelector,
      listItemTemplateSelector,
      requirementsListItemSelector,
      textInsertSelector,
      requirementsListSelector,
      salarySelector,
      courseLengthSelector,
      submitButtonSelector,
    } = vacanciesConfig;

    function getCardTemplate(role) {
      const cardTemplate = document.querySelector(templateSelector).content.querySelector(cardSelector + role).cloneNode(true);
      return cardTemplate;
    }

    function getListTemplate(card) {
      const listItem = card.querySelector(listItemTemplateSelector).content.querySelector(requirementsListItemSelector).cloneNode(true);
      return listItem;
    }

    function setListeners(card) {
      const cardHeader = card.querySelector(cardHeaderSelector);

      function handleDescriptionToggle() {
        toggleCardButton(card);
        toggleExpandBlock(card);
        card.classList.toggle('opened');
      }

      function clickOutsideHandler(evt) {
        if(!card.contains(evt.target)) {
          handleDescriptionToggle();
          window.removeEventListener('click', clickOutsideHandler);
        }
      }

      cardHeader.addEventListener('click', () => {
        if(!card.classList.contains('opened')) {
          window.addEventListener('click', clickOutsideHandler);
        } else {
          window.removeEventListener('click', clickOutsideHandler);
        }

        handleDescriptionToggle();
      });
    }

    function createParagraph(string, card) {
      const listItem = getListTemplate(card);
      const paragraph = listItem.querySelector(textInsertSelector);

      paragraph.textContent = string;

      return listItem;
    }

    const currentCard = getCardTemplate(data.role);
    const title = currentCard.querySelector(cardTitleSelector);
    const requirementsList = currentCard.querySelector(requirementsListSelector);
    const salaryElement = currentCard.querySelector(salarySelector);
    const submitButtonElement = currentCard.querySelector(submitButtonSelector);

    setListeners(currentCard);

    title.textContent = data.name;
    data.description.forEach((paragraph) => {
      requirementsList.append(createParagraph(paragraph, currentCard));
    });
    salaryElement.textContent = data.salary;
    submitButtonElement.value = data.name;

    if(data.courseLength) {
      const courseLengthElement = currentCard.querySelector(courseLengthSelector);
      courseLengthElement.textContent = data.courseLength;
    }

    return currentCard;
  }

  function getVacanciesData() {
    const { roleInputSelector, courseInputSelector } = vacanciesConfig;

    const role = document.querySelector(roleInputSelector).value;
    const course = document.querySelector(courseInputSelector).value;

    return vacanciesData[course][role];
  }

  function vacancyRenderer(vacancy) {
    const vacancyCard = createVacancyCard(vacancy)
    containerElement.append(vacancyCard);
  }

  function showNextVacancies(vacanciesList, handler) {
    const vacancies = [...vacanciesList];

    function showNext() {
      if(vacancies.length > 0) {
        vacancies.splice(0, 6).forEach((vacancy) => {
          vacancyRenderer(vacancy);
        });
        if(vacancies.length === 0) {
          showMoreButton.removeEventListener('click', handler);
          toggleShowMoreButton('remove');
        }
      }
    }

    showNext();

    return showNext;
  }

  function clearVacancies() {
    containerElement.innerHTML = '';
    toggleShowMoreButton('remove');
    togglePlaceholderVisibility('remove');
  }

  return function() {
    const currentVacancies = getVacanciesData(vacanciesConfig);
    clearVacancies();

    if(currentVacancies.length > 6) {
      toggleShowMoreButton('add');
      const handleClick = showNextVacancies(currentVacancies, handleClick);
      showMoreButton.addEventListener('click', handleClick);
    } else if(currentVacancies.length === 0) {
      togglePlaceholderVisibility('add');
    } else {
      currentVacancies.forEach((vacancy) => {
        vacancyRenderer(vacancy);
      });
    }
  }
}