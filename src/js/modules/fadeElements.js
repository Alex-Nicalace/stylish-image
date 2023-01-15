// <анимация появления блоков как в bootstrap>
const optionsDefault = { duration: 0.3, display: 'block' }

function fadeShowElement(el, currentOptions = {}) {
   const options = { ...optionsDefault, ...currentOptions };
   const durationMs = options.duration / 100 * 1000;
   let opacity = 0;
   el.style.opacity = opacity;
   const stepValue = 0.01;
   el.style.display = options.display;
   const intervalId = setInterval(function () {
      opacity += stepValue;
      el.style.opacity = opacity;
      if (opacity > 1) {
         el.style.opacity = '';
         clearInterval(intervalId);
      };
   }, durationMs)
}
function fadeHideElement(el, currentOptions = {}) {
   const options = { ...optionsDefault, ...currentOptions };
   const durationMs = options.duration / 100 * 1000;
   let opacity = 1;
   el.style.opacity = opacity;
   const stepValue = -0.01;
   el.style.display = options.display;
   const intervalId = setInterval(function () {
      opacity += stepValue;
      el.style.opacity = opacity;
      if (opacity < 0) {
         el.style.opacity = '';
         el.style.display = 'none';
         clearInterval(intervalId);
      };
   }, durationMs)
}
// </анимация появления блоков как в bootstrap></анимация>

export { fadeShowElement, fadeHideElement }