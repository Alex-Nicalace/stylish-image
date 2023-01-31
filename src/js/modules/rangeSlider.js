class RangeSlider {
   constructor(element, options) {
      if (!element) return;

      this.minFromValue = 0;
      this.maxToValue = 100;
      this.stepValue = 1;

      this.slider = element;
      // создание необходимых элементов
      this.rail = document.createElement('div');
      this.rail.classList.add('range-slider__rail');
      this.slider.append(this.rail);

      this.track = document.createElement('div');
      this.track.classList.add('range-slider__track');
      this.slider.append(this.track);

      this.thumbs = [];
      const inputs = this.slider.querySelectorAll('input');
      inputs.forEach((input, index) => {
         const el = document.createElement('div');
         el.classList.add('range-slider__thumb');
         el.dataset.index = index;
         this.slider.append(el);
         el.append(input);
         this.thumbs.push(el);

         this.minFromValue = +input.min || this.minFromValue;
         this.maxToValue = +input.max || this.maxToValue;
         this.stepValue = +input.step || this.stepValue;
      });

      this.views = [];
      if (options && options.viewSelectors) {
         options.viewSelectors.forEach(selector => {
            this.views.push(document.querySelector(selector));
         });
      }
      const syncTrack = () => {
         const widthRail = this.slider.offsetWidth;
         const beginValue = parseInt(getComputedStyle(this.thumbs[0]).left);
         const endValue = parseInt(getComputedStyle(this.thumbs[1]).left);
         const widthTrack = endValue - beginValue;

         this.track.style.left = `${(beginValue) * 100 / widthRail}%`;
         this.track.style.width = `${widthTrack * 100 / widthRail}%`;
      }
      const onMouseDownThumb = (e) => {
         e.preventDefault(); // предотвратить выделение
         const el = e && e.target;
         if (!el) return;
         let thumb, /* thumbCoord, */ shiftX, input, maxValue, minValue, indexEl;

         const setVariables = (el) => {
            thumb = el;
            // thumbCoord = el.getBoundingClientRect();
            shiftX = 0; // e.clientX - thumbCoord.left - (thumbCoord.width / 2);
            input = el.querySelector('input');
            indexEl = +el.dataset.index;
            minValue = this.thumbs[indexEl - 1] && +this.thumbs[indexEl - 1].querySelector('input').value;
            maxValue = this.thumbs[indexEl + 1] && +this.thumbs[indexEl + 1].querySelector('input').value;
         }
         setVariables(el);

         const sliderCoord = this.slider.getBoundingClientRect();
         const minSliderValue = 0;
         const maxSliderValue = this.slider.offsetWidth;

         const shiftValue = this.maxToValue - this.minFromValue;
         const step = this.stepValue * maxSliderValue / shiftValue;

         const moveAt = (pageX) => {
            // передвинуть мяч под координаты курсора
            // и сдвинуть на половину ширины/высоты для центрирования
            const preThumbLeft = Math.min(Math.max(pageX - shiftX - sliderCoord.left, minSliderValue), maxSliderValue);
            const thumbLeft = Math.round(preThumbLeft / step) * step;
            const value = Math.round(thumbLeft / step * this.stepValue) + this.minFromValue;

            // если значение начинает пересекаться со слудующим бегунком, то переключится на другой бегунок
            if (value >= maxValue) {
               setVariables(this.thumbs[indexEl + 1]);
            }
            if (value <= minValue) {
               setVariables(this.thumbs[indexEl - 1]);
            }

            thumb.style.left = thumbLeft * 100 / maxSliderValue + '%';
            input.value = value;
            syncTrack();

            this.views[indexEl] && (this.views[indexEl].textContent = value);
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

      this.thumbs.forEach(thumb => {
         thumb.addEventListener('mousedown', onMouseDownThumb);
      });

      syncTrack();
   }
}

const sliders = document.querySelectorAll('.range-slider');
sliders.forEach(slider => {
   new RangeSlider(slider, {
      viewSelectors: ['.tst1', '.tst2']
   });
});