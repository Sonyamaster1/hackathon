import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CardsSlider(props) {
  const {
    blurSelector,
    cardSelector,
    triggerSelector,
    duration,
    stages,
    stagesCount,
  } = props;

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: triggerSelector,
      start: 'top 200px',
      end: 'bottom',
      scrub: 0.5,
      smoothChildTiming: true,
      toggleActions: "play play none reset",
    }
  })

  // --------------- генерация эффекта blur и перспективы для каждой карточки

  function handleBlurAnimation(i) {
    const label = i > 1 ? (i + i - 1) : 1;

    timeline.addLabel(`stage${i}`, label)
      .to(
        cardSelector + i,
        { zIndex: -1, duration: duration.z },
        `stage${i}`
      )
      .to(
        blurSelector + i,
        { duration: duration.z, opacity: 1 },
        `stage${i}`
      )
      .to(
        blurSelector + (i + 1),
        { duration: duration.z, opacity: 0 },
        `stage${i}`
      )
  }

  // --------------- генерация эффекта движения для каждой карточки

  function handleMotionAnimation(i) {
    const stage = stages[i];
    const label = i + i + 2;

    timeline.addLabel(`stage${i + 2}`, label)

    stage.forEach((pos, ind) => {
      timeline.to(
        cardSelector + (ind + 1),
        {
          x: stage[ind],
          duration: duration.x,
        },
        `stage${i + 2}`
      )
    })
  }

  // --------------- генерация анимация для каждого этапа

  for(let i = 0; i < stagesCount; i++) {
    handleMotionAnimation(i);
    handleBlurAnimation(i + 1);
  }

  return timeline;
}