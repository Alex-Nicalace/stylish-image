const buttons = document.querySelectorAll('.button-back');
buttons.forEach(button => {
   button.addEventListener('click', () => {
      history.back();
   })
});