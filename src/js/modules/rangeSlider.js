class RangeSlider {
   constructor(element, options) {
      if (!element) return;

      this._minFromValue = 0;
      this._maxToValue = 100;
      this._stepValue = 1;

      this._slider = element;
      // создание необходимых элементов
      this._rail = document.createElement('div');
      this._rail.classList.add('range-slider__rail');
      this._slider.append(this._rail);

      this._track = document.createElement('div');
      this._track.classList.add('range-slider__track');
      this._slider.append(this._track);

      this._thumbs = [];
      const inputs = this._slider.querySelectorAll('input');
      inputs.forEach((input, index) => {
         const el = document.createElement('div');
         el.classList.add('range-slider__thumb');
         el.dataset.index = index;
         this._slider.append(el);
         el.append(input);
         this._thumbs.push(el);

         this._minFromValue = +input.min || this._minFromValue;
         this._maxToValue = +input.max || this._maxToValue;
         this._stepValue = +input.step || this._stepValue;
      });

      this._views = [];
      if (options && options.viewSelectors) {
         options.viewSelectors.forEach(selector => {
            this._views.push(document.querySelector(selector));
         });
      }

      this._values = [];

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
            minValue = this._thumbs[indexEl - 1] && +this._thumbs[indexEl - 1].children[0].value;
            maxValue = this._thumbs[indexEl + 1] && +this._thumbs[indexEl + 1].children[0].value;
         }
         setVariables(el);

         const sliderCoord = this._slider.getBoundingClientRect();
         const minSliderValue = 0;
         const widthSlider = this._slider.offsetWidth;

         const shiftValue = this._maxToValue - this._minFromValue;
         const step = this._stepValue * widthSlider / shiftValue;

         const moveAt = (pageX) => {
            // передвинуть мяч под координаты курсора
            // и сдвинуть на половину ширины/высоты для центрирования
            const preThumbLeft = Math.min(Math.max(pageX - shiftX - sliderCoord.left, minSliderValue), widthSlider);
            const thumbLeft = Math.round(preThumbLeft / step) * step;
            const value = Math.round(thumbLeft / step * this._stepValue) + this._minFromValue;

            // если значение начинает пересекаться со слудующим бегунком, то переключится на другой бегунок
            if (value >= maxValue) {
               setVariables(this._thumbs[indexEl + 1]);
            }
            if (value <= minValue) {
               setVariables(this._thumbs[indexEl - 1]);
            }

            thumb.style.left = thumbLeft * 100 / widthSlider + '%';
            input.value = value;
            this._syncTrack();

            this._views[indexEl] && (this._views[indexEl].textContent = value);

            this._values[indexEl] = value;
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

      // повесить событие на каждый ползунок
      this._thumbs.forEach(thumb => {
         thumb.addEventListener('mousedown', onMouseDownThumb);
      });

      this._init();
   }
   _convertValueToPercent = (value) => {
      const widthSlider = this._slider.offsetWidth;
      const shiftValue = this._maxToValue - this._minFromValue;
      const valueShift = value - this._minFromValue;
      const px = widthSlider * valueShift / shiftValue;
      return px * 100 / widthSlider + '%';
   }
   _syncTrack = () => {
      const widthRail = this._slider.offsetWidth;
      const beginValue = parseInt(getComputedStyle(this._thumbs[0]).left);
      const endValue = parseInt(getComputedStyle(this._thumbs[this._thumbs.length - 1]).left);
      const widthTrack = endValue - beginValue;

      this._track.style.left = `${(beginValue) * 100 / widthRail}%`;
      this._track.style.width = `${widthTrack * 100 / widthRail}%`;
   }
   _init = () => {
      this._thumbs.forEach((thumb, index) => {
         const value = thumb.children[0].getAttribute('value');
         thumb.style.left = this._convertValueToPercent(value);

         this._views[index] && (this._views[index].textContent = value);

         this._values.push(+value);
      });
      this._syncTrack();
   }
   get values() {
      return this._values;
   }
   set values(array) {
      array.forEach((value, index) => {
         this._values[index] = value;
         this._views[index] && (this._views[index].textContent = value);
         this._thumbs[index].style.left = this._convertValueToPercent(value);
      });
      this._syncTrack();
   }
}

const sliders = document.querySelectorAll('.range-slider');
sliders.forEach(slider => {
   const temp = new RangeSlider(slider, {
      viewSelectors: ['.tst1', '.tst2']
   });
   console.log(temp.values);
   temp.values = [1100, 10000];
   console.log(temp.values);
});