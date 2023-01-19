document.addEventListener('click', e => {
   const target = e.target;
   if (target && target.classList.contains('button-like')) {
      target.classList.toggle('button-like_pressed');
   }
})