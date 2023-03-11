import { fadeElement, appearElement } from './fadeElements.js'

class Dropdown {
   constructor(dropdownEl) {
      this.isOpen = false;
      this.dropdown = dropdownEl;
      this.button = this.dropdown.querySelector('.dropdown__button');
      this.content = this.dropdown.querySelector('.dropdown__content');

      this.button.addEventListener('click', (e) => {
         !this.isOpen
            ? open()
            : close();
      });
      const open = () => {
         calcDirectionContent();
         this.dropdown.classList.add('dropdown_open');
         appearElement(this.content);
         this.isOpen = true;
         this.dropdown.addEventListener('mouseleave', close)
      }
      const close = () => {
         this.dropdown.removeEventListener('mouseleave', close);
         this.dropdown.classList.remove('dropdown_open');
         fadeElement(this.content);
         this.isOpen = false;
      }
      const calcDirectionContent = () => {
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
}

function dropdown(selector) {
   const dropdowns = document.querySelectorAll(selector);
   dropdowns.forEach(el => {
      new Dropdown(el);
   });
}

dropdown('.dropdown')