class DropdownBtn {
   constructor(dropdownEl) {
      // data-completed => уже отрабатывался этот элемент
      if (dropdownEl.hasAttribute('data-completed') || dropdownEl.tagName === 'SELECT') return;
      this._blockSelector = 'dropdown-btn';
      this._blockModifier = `${this._blockSelector}_open`;

      this._isOpen = false;
      this._dropdown = dropdownEl;
      this._dropdown.classList.add(this._blockSelector);

      this._wrapper = document.createElement('div');
      Array.from(this._dropdown.children).forEach(element => {
         this._wrapper.append(element);
      });

      this._button = document.createElement('button');
      this._button.classList.add(`${this._blockSelector}__button`);
      this._dropdown.append(this._button);

      this._buttonLabel = document.createElement('span');
      this._buttonLabel.classList.add(`${this._blockSelector}__label`);
      this._button.append(this._buttonLabel);

      this._content = document.createElement('div');
      this._content.classList.add(`${this._blockSelector}__content`);
      this._buttonLabel.textContent = this._dropdown.dataset.label;
      this._dropdown.append(this._content);

      // this.wrapper.classList.add(`.${blockSelector}__wrapper`);
      this._wrapper.classList.add(`${this._blockSelector}__wrapper`);
      this._content.append(this._wrapper);

      const clickButton = () => {
         !this._isOpen
            ? this.open()
            : this.close();
      }

      this._button.addEventListener('click', clickButton);

      this._dropdown.setAttribute('data-completed', '');
   }


   _clickDocument = (e) => {
      const target = e.target;
      if (!target || !this._isOpen) return;
      if (!this._dropdown.contains(target)) this.close();
   }
   open = () => {
      this._setPositionDropdown();
      this._dropdown.classList.add(this._blockModifier);

      const heightContent = `${this._wrapper.offsetHeight}px`;
      this._content.style.height = heightContent;

      this._dropdown.addEventListener('mouseleave', this._mouseLeave);
      document.addEventListener('click', this._clickDocument);

      this._isOpen = true;
   }
   _mouseLeave = () => {
      // this.close();
   }
   _resetStyleDropDown = () => {
      this._content.style.left = 'auto';
      this._content.style.right = 'auto';
      this._content.style.top = '';
      this._dropdown.classList.remove(`${this._blockSelector}_up`);
   }
   close = () => {
      this._dropdown.classList.remove(this._blockModifier);

      this._content.style.height = '';

      this._dropdown.removeEventListener('mouseleave', this._mouseLeave)
      document.removeEventListener('click', this._clickDocument);

      this._isOpen = false;

      this._resetStyleDropDown();
   }
   _setPositionDropdown = () => {
      this._resetStyleDropDown();
      const btnBox = this._button.getBoundingClientRect();
      const clientWidth = document.documentElement.clientWidth;
      const clientHeight = document.documentElement.clientHeight;
      const heightDropdown = parseInt(getComputedStyle(this._wrapper).height);
      const prop = btnBox.left > (clientWidth / 2)
         ? 'right'
         : 'left';
      this._content.style[prop] = '0';
      if (btnBox.bottom + heightDropdown > clientHeight) {
         this._content.style.top = -heightDropdown + 'px';
         this._dropdown.classList.add(`${this._blockSelector}_up`);
      }

   }
   get isOpen() {
      return this._isOpen;
   }
   set isOpen(open) {
      if (open) {
         this.open();
      } else {
         this.close();
      }
   }
}

export { DropdownBtn }