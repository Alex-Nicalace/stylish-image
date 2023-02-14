import { numberWithSpaces } from './numbers.js'
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
         const el = e && e.target,
            pointerId = e.pointerId;
         if (!el) return;

         this._slider.classList.add('range-slider_active');

         let thumb, /* thumbCoord, */ shiftX, input, maxValue, minValue, indexEl;

         const setVariables = (el) => {
            thumb = el;
            // thumbCoord = el.getBoundingClientRect();
            shiftX = 0; // e.clientX - thumbCoord.left - (thumbCoord.width / 2);
            input = el.children[0];
            indexEl = +el.dataset.index;
            minValue = this._thumbs[indexEl - 1] && +this._thumbs[indexEl - 1].children[0].value;
            maxValue = this._thumbs[indexEl + 1] && +this._thumbs[indexEl + 1].children[0].value;
         }
         setVariables(el);

         // перенацелить все события указателя (до pointerup) на slider
         this._slider.setPointerCapture(pointerId);

         const sliderCoord = this._slider.getBoundingClientRect();
         const minSliderValue = 0;
         const widthSlider = this._slider.offsetWidth;

         const moveAt = (pageX) => {
            // передвинуть мяч под координаты курсора
            // и сдвинуть на половину ширины/высоты для центрирования
            const preThumbLeft = Math.min(Math.max(pageX - shiftX - sliderCoord.left, minSliderValue), widthSlider);
            const { leftPercent, value } = this._calcDataForThumb(preThumbLeft);

            // если значение начинает пересекаться со слудующим бегунком, то переключится на другой бегунок
            if (value >= maxValue) {
               setVariables(this._thumbs[indexEl + 1]);
            }
            if (value <= minValue) {
               setVariables(this._thumbs[indexEl - 1]);
            }

            this._setDataForThumb(thumb, { leftPercent, value })
         }

         moveAt(e.pageX);
         // (3) перемещать по экрану
         this._slider.addEventListener('pointermove', onMouseMove);
         // (4) положить объект, удалить более ненужные обработчики событий
         const onMouseUp = () => {
            this._slider.removeEventListener('pointerup', onMouseUp);
            this._slider.removeEventListener('pointermove', onMouseMove);

            this._slider.classList.remove('range-slider_active');
         }
         this._slider.addEventListener('pointerup', onMouseUp)

         function onMouseMove(e) {
            moveAt(e.pageX);
         }
      }

      // повесить событие на каждый ползунок
      this._thumbs.forEach(thumb => {
         thumb.addEventListener('pointerdown', onMouseDownThumb);
      });
      // повесить событие на клик по шкале, для передвижения мышью
      this._slider.addEventListener('click', e => {
         const target = e && e.target;
         if (!target) return;
         const sliderCoord = this._slider.getBoundingClientRect();
         // получить X клика
         const x = Math.max(Math.min(e.pageX - sliderCoord.left, sliderCoord.width), 0);
         // найти близжайший ползунок
         const thumb = this._thumbs.reduce((prevThumb, thumb) => {
            return Math.abs(x - parseInt(getComputedStyle(thumb).left)) < Math.abs(x - parseInt(getComputedStyle(prevThumb).left))
               ? thumb
               : prevThumb
         }, this._thumbs[0]);
         this._setDataForThumb(thumb, this._calcDataForThumb(x))
      })

      this._init();
   }
   _convertValueToPercent(value) {
      const widthSlider = this._slider.offsetWidth;
      const shiftValue = this._maxToValue - this._minFromValue;
      const valueShift = value - this._minFromValue;
      const px = widthSlider * valueShift / shiftValue;
      return px * 100 / widthSlider + '%';
   }
   _syncTrack() {
      const widthRail = this._slider.offsetWidth;
      const beginValue = parseInt(getComputedStyle(this._thumbs[0]).left);
      const endValue = parseInt(getComputedStyle(this._thumbs[this._thumbs.length - 1]).left);
      const widthTrack = endValue - beginValue;

      this._track.style.left = `${(beginValue) * 100 / widthRail}%`;
      this._track.style.width = `${widthTrack * 100 / widthRail}%`;
   }
   _init() {
      this._thumbs.forEach((thumb, index) => {
         const value = thumb.children[0].getAttribute('value');
         thumb.style.left = this._convertValueToPercent(value);

         this._views[index] && (this._views[index].textContent = numberWithSpaces(value));

         this._values.push(+value);
      });
      this._syncTrack();
   }
   _calcDataForThumb(x) {
      const
         widthSlider = this._slider.offsetWidth,
         shiftValue = this._maxToValue - this._minFromValue,
         step = this._stepValue * widthSlider / shiftValue,
         leftPx = Math.round(x / step) * step,
         value = Math.round(leftPx / step * this._stepValue) + this._minFromValue,
         leftPercent = leftPx * 100 / widthSlider + '%';
      return { leftPx, value, leftPercent }
   }
   _setDataForThumb(thumb, data = {}) {
      const input = thumb.children[0];
      const indexEl = +thumb.dataset.index;

      thumb.style.left = data.leftPercent;
      input.value = data.value;

      this._views[indexEl] && (this._views[indexEl].textContent = numberWithSpaces(data.value));

      this._values[indexEl] = data.value;

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

new RangeSlider(document.querySelector('.ui-kit__filters .range-slider'), {
   viewSelectors: ['.ui-kit__filters .range-block__value:nth-child(1)', '.ui-kit__filters .range-block__value:nth-child(2)']
});

new RangeSlider(document.querySelector('.catalog-page__filter-form .range-slider'), {
   viewSelectors: ['.catalog-page__filter-form .range-block__value:nth-child(1)', '.catalog-page__filter-form .range-block__value:nth-child(2)']
})