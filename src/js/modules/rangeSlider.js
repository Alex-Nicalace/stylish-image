class RangeSlider {
   constructor(element) {
      if (!element) return;

      this.minValue = 0;
      this.maxValue = 500;
      this.slider = element;
      this.rail = this.slider.querySelector('.range-slider__rail');
      this.track = this.slider.querySelector('.range-slider__track');
      this.thumbBegin = this.slider.querySelector('.range-slider__thumb[data-index="0"]');
      this.thumbEnd = this.slider.querySelector('.range-slider__thumb[data-index="1"]');
      const syncTrack = () => {
         const beginValue = parseInt(getComputedStyle(this.thumbBegin).left);
         const endValue = parseInt(getComputedStyle(this.thumbEnd).left);
         const widthTrack = endValue - beginValue;

         this.track.style.left = `${(beginValue) * 100 / this.slider.offsetWidth}%`;
         this.track.style.width = `${widthTrack * 100 / this.slider.offsetWidth}%`;
      }
      const onMouseDownThumb = (e) => {
         e.preventDefault(); // предотвратить выделение
         const thumb = e && e.target;
         if (!thumb) return;

         const shiftX = e.clientX - thumb.getBoundingClientRect().left - (thumb.getBoundingClientRect().width / 2);

         const sliderCoord = this.slider.getBoundingClientRect();
         const minSliderValue = 0;
         const maxSliderValue = this.slider.offsetWidth;
         const moveAt = (pageX) => {
            // передвинуть мяч под координаты курсора
            // и сдвинуть на половину ширины/высоты для центрирования
            thumb.style.left = Math.min(Math.max(pageX - shiftX - sliderCoord.left, minSliderValue), maxSliderValue) * 100 / maxSliderValue + '%';
            syncTrack();
         }

         moveAt(e.pageX);
         // (3) перемещать по экрану
         document.addEventListener('mousemove', onMouseMove);
         // (4) положить объект, удалить более ненужные обработчики событий
         document.addEventListener('mouseup', onMouseUp)
         function onMouseUp() {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
         }

         function onMouseMove(e) {
            moveAt(e.pageX);
         }
      }

      this.thumbBegin.addEventListener('mousedown', onMouseDownThumb);
      this.thumbEnd.addEventListener('mousedown', onMouseDownThumb);

      syncTrack();
   }
}

const sliders = document.querySelectorAll('.range-slider');
sliders.forEach(slider => {
   new RangeSlider(slider);
});