import Popup from './Popup'

export default class PopupWithVideo extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(url) {
    const wrapper = this._popup.querySelector('.popup__video-wrapper');
    wrapper.insertAdjacentHTML('afterbegin', `
      <iframe src="https://player.vimeo.com/video/${url}&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
        frameborder="0"
        allow="autoplay;
        fullscreen;
        picture-in-picture"
        allowfullscreen
        style="position:absolute;top:0;left:0;width:100%;height:100%;"
      </iframe>`);
    super.open();
  }

  close() {
    this._popup.querySelector('iframe').remove();
    super.close();
  }

  handleClicks() {
    const videoElements = document.querySelectorAll('.videos__grid-item');
    videoElements.forEach(videoElement => {
      let url = videoElement.dataset.url;
      videoElement.addEventListener('click', () => {
        this.open(url);
      })
    });
  }
}