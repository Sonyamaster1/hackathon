import Swiper, {EffectCoverflow} from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

export default class Carousel {
  constructor() {
    this.grid = document.querySelector('.grid');
    this.gridWrapper = document.querySelector('.grid__wrapper');
    this.items = document.querySelectorAll('.grid__item');
    this.slider = null;
  }

  // создаение слайдера
  createSlider() {
    return this.slider = new Swiper('.swiper', {
      modules: [EffectCoverflow],
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 0,
        slideShadows: false,
        depth: 0,
        modifier: 2
      },
      spaceBetween: -100,
    });
  }

  // добавление классов слайдера
  addClasses() {
    this.grid.classList.add('swiper');
    this.gridWrapper.classList.add('swiper-wrapper');
    this.gridWrapper.classList.remove('grid__wrapper_active');
    this.items.forEach(item => {
      item.classList.add('swiper-slide');
    });
  }

  // убираем классы слайдера
  removeClasses() {
    this.grid.classList.remove('swiper');
    this.gridWrapper.classList.remove('swiper-wrapper');
    this.gridWrapper.classList.add('grid__wrapper_active');
    this.items.forEach(item => {
      item.classList.remove('swiper-slide');
    });
  }

  // при открытии старницы, проверяем на каком разрешении, если меньше 920 - создаем слайдер,
  init() {
    if (document.documentElement.clientWidth > 920) {
      this.removeClasses();
    } else {
      this.addClasses();
      this.createSlider();
    }
  }
  // при изменении ширины экрана, если меньше 920, то создаем слайдер, если больше уничтожаем его и добавляем стили грида
  checkSize = () => {
    if (document.documentElement.clientWidth <= 920 && !this.grid.classList.contains('swiper')) {
      this.addClasses();
      this.createSlider();
    } else if (document.documentElement.clientWidth > 920) {
      this.removeClasses();
      if (this.slider) {
        this.slider.destroy(true, true);
      }
    }
  }

  setListeners() {
    window.addEventListener('resize', this.debounce(this.checkSize));
  }

  // функция будет откладывать выполнение, чтобы при изменении ширины экрана слишком часто не вызывалась функция
  debounce(func, time = 100) {
    let timer;
    return function (event) {
      clearTimeout(timer);
      timer = setTimeout(func, time, event);
    }
  }
}