// <анимация появления блоков как в bootstrap>
const optionsDefault = { duration: 0.3, display: 'block', framesCount: 40 }

function toggleVisability(el, currentOptions = {}, isFade = true) {
   const options = { ...optionsDefault, ...currentOptions };
   const durationMs = options.duration / 100 * 1000;
   let opacity = isFade ? 1 : 0;
   el.style.opacity = opacity;
   const stepValue = (isFade ? -1 : 1) / optionsDefault.framesCount;
   el.style.display = options.display;
   const intervalId = setInterval(function () {
      opacity += stepValue;
      el.style.opacity = opacity;
      if (!isFade && opacity > 1) {
         el.style.opacity = '';
         clearInterval(intervalId);
         return;
      };
      if (isFade && opacity < 0) {
         el.style.opacity = '';
         el.style.display = 'none';
         clearInterval(intervalId);
      };
   }, durationMs);
   return intervalId;
}

function appearElement(el, currentOptions = {}) {
   return toggleVisability(el, currentOptions, false)
}
function fadeElement(el, currentOptions = {}) {
   return toggleVisability(el, currentOptions, true)
}
// </анимация появления блоков как в bootstrap></анимация>

export { appearElement, fadeElement }