import { DropdownBtn } from './dropdown-btn.js'

class CustomSelect extends DropdownBtn {
   constructor(selectEl) {
      // создаю контейнер для нового элесента
      const dropdown = document.createElement('div');
      // все отрибуты селекта копирую в новый эл.-контейнер
      for (const element of selectEl.attributes) {
         dropdown.setAttribute(element.name, element.value)
      }

      if (!super(dropdown)) return;

      selectEl.after(dropdown);

      this._select = selectEl;

      selectEl.hidden = true;
      this._dropdown.prepend(selectEl);

      this._dropdown.classList.add(`${this._blockSelector}_select`);

      this._options = [];
      const createDropDown = () => {
         for (const option of this._select.options) {
            const optionBtn = document.createElement('button');
            optionBtn.dataset.value = option.value;
            optionBtn.textContent = option.textContent;
            option.selected && (optionBtn.dataset.selected = '');
            optionBtn.classList.add(`${this._blockSelector}__option`);
            this._wrapper.append(optionBtn);
            this._options.push({ option, optionBtn })
         }
      }
      createDropDown();

      this.syncSelectedOptions();

      const onClickOption = e => {
         const target = e && e.target;
         if (!target) return;

         const optionBtn = target.closest(`.${this._blockSelector}__option`);
         if (!optionBtn) return;

         const value = optionBtn.dataset.value;
         this._select.value = value;
         this.syncSelectedOptions();
         this.close();
      }
      this._wrapper.addEventListener('click', onClickOption);
   }
   syncSelectedOptions() {
      this._options.forEach(item => {
         if (item.option.selected) {
            item.optionBtn.setAttribute('data-selected', '');
            this._buttonLabel.textContent = item.option.textContent;
         } else {
            item.optionBtn.removeAttribute('data-selected')
         }
      });
   }
   get value() {
      return this._select.value;
   }
   set value(newValue) {
      this._select.value = newValue;
      this.syncSelectedOptions();
   }
}

export { CustomSelect }