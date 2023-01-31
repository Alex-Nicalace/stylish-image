class DropdownBtn {
   constructor(dropdownEl) {
      this.blockSelector = 'dropdown-btn';
      this.blockModifier = `${this.blockSelector}_open`
      this.isOpen = false;
      this.dropdown = dropdownEl;
      this.button = this.dropdown.querySelector(`.${this.blockSelector}__button`);
      this.content = this.dropdown.querySelector(`.${this.blockSelector}__content`);
      this.wrapper = this.dropdown.querySelector(`.${this.blockSelector}__wrapper`);

      this.button.addEventListener('click', this.clickButton);
   }

   clickButton = () => {
      !this.isOpen
         ? this.open()
         : this.close();
   }
   clickDocument = (e) => {
      const target = e.target;
      if (!target || !this.isOpen) return;
      if (!this.dropdown.contains(target)) close();
   }
   open = () => {
      this.calcDirectionContent();
      this.dropdown.classList.add(this.blockModifier);

      const heightContent = `${this.wrapper.offsetHeight}px`;
      this.content.style.height = heightContent;

      this.dropdown.addEventListener('mouseleave', this.mouseLeave);
      document.addEventListener('click', this.clickDocument);

      this.isOpen = true;
   }
   mouseLeave = () => {
      this.close();
   }
   close = () => {
      this.dropdown.classList.remove(this.blockModifier);

      this.content.style.height = '';

      this.dropdown.removeEventListener('mouseleave', this.mouseLeave)
      document.removeEventListener('click', this.clickDocument);

      this.isOpen = false;
   }
   calcDirectionContent = () => {
      const btnBox = this.button.getBoundingClientRect();
      const width = document.documentElement.clientWidth;
      this.content.style.left = 'auto';
      this.content.style.right = 'auto';
      const prop = btnBox.left > (width / 2)
         ? 'right'
         : 'left';
      this.content.style[prop] = '0';
   }
}

function dropdown(selector) {
   const dropdowns = document.querySelectorAll(selector);
   dropdowns.forEach(el => {
      new DropdownBtn(el);
   });
}

dropdown('.dropdown-btn');