const hideScrollTop = () => {
   const clientHeight = document.documentElement.clientHeight;
   const documentHeight = document.documentElement.scrollHeight;
   const percent = clientHeight * 100 / documentHeight;
   if (percent > 80) {
      const buttonUp = document.querySelector('.footer__scroll-up');
      buttonUp && buttonUp.remove();
   }
}
hideScrollTop();