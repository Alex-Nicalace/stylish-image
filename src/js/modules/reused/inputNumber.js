class InputNumber {
   constructor(el) {
      if (!el) return;
      const nameClassBlock = 'number';

      this._input = el;

      this._wrapper = document.createElement('div');
      this._wrapper.className = this._input.className;
      // this.wrapper.classList.add = nameClassBlock;

      this._input.after(this._wrapper);
      this._input.className = `${nameClassBlock}__input`;

      this._buttonDown = document.createElement('button');
      this._buttonDown.classList.add(`${nameClassBlock}__down`);

      this._buttonUp = document.createElement('button');
      this._buttonUp.classList.add(`${nameClassBlock}__up`);

      this._wrapper.append(this._buttonDown);
      this._wrapper.append(this._input);
      this._wrapper.append(this._buttonUp);

      this._step = +this._input.step;
      this._min = +this._input.min;
      this._max = +this._input.max;

      this._input.addEventListener('input', e => {
         if (this._max && this._input.value > this._max) {
            this._input.value = this._max;
         }

         if (this._min && this._input.value < this._min) {
            this._input.value = this._min;
         }
      })

      this._buttonDown.addEventListener('click', () => {
         const newValue = +this._input.value - this._step;
         if (this._min && (newValue >= this._min)) {
            this._input.value = newValue;
         }
      })
      this._buttonUp.addEventListener('click', () => {
         const newValue = +this._input.value + this._step;
         if (this._max && (newValue <= this._max)) {
            this._input.value = newValue;
         }
      })
   }
   get value() {
      return +this._input.value;
   }
   set value(newValue) {
      if ((this._min && newValue < this._min) || (this._max && newValue > this._max)) return;
      this._input.value = newValue;
   }
}

const inputs = document.querySelectorAll('input.number');
inputs.forEach(input => {
   new InputNumber(input);
});