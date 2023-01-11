const iconButtons = document.querySelectorAll('.button-icon[data-can-be-pressed]');
iconButtons.forEach(element => {
   element.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.closest('[data-can-be-pressed]')) {
         const button = target.closest('[data-can-be-pressed]');
         button.classList.toggle('button-icon_pressed')
      }
   })
});