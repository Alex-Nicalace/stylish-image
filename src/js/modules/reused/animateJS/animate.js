import { linear } from './transitionTimingFunction';

const init = {
   timing: linear,
   duration: 300,
}

function animate(options) {
   const { timing, draw, duration } = { ...init, ...options };
   const start = performance.now();

   const requestID = requestAnimationFrame(function animate(time) {
      // timeFraction изменяется от 0 до 1
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      // вычисление текущего состояния анимации
      const progress = timing(timeFraction);

      draw(progress); // отрисовать её

      if (timeFraction < 1) {
         requestAnimationFrame(animate);
      }
   });

   return requestID;
}

export default animate;