/* import animate from './reused/animateJS/animate.js';
import { back } from './reused/animateJS/transitionTimingFunction.js'; */

class CartCard {
   constructor(cartCard) {
      if (!cartCard) return;

      this._cartCard = cartCard;

      this._cartCardDel = cartCard.querySelector('.cart-card__del');

      this._cartCardDel.addEventListener('click', () => {
         cartCard.classList.add('animate', 'animate_backOutLeft');
         setTimeout(() => {
            cartCard.remove();
         }, 500)

         /* animate({
            draw,
            timing: (timeFraction) => back(2, timeFraction),
            duration: 1000,
         });

         function draw(progress) {
            cartCard.style.transform = `translateX(${-progress * 100}%)`;
            cartCard.style.opacity = 1 - progress;
            if (progress == 1) {
               cartCard.remove();
            }
         } */
      })
   }
}

const cards = document.querySelectorAll('.cart-card');
cards.forEach(el => {
   new CartCard(el);
});