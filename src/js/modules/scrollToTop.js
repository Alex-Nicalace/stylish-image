const setButtonScrollTop = (buttonSelector) => {
   const buttonScrollTop = document.querySelector(buttonSelector);
   if (buttonScrollTop) {
      buttonScrollTop.onclick = function () {
         window.scrollTo({
            top: 0,
            behavior: "smooth"
         });
      }
   }
}

setButtonScrollTop('.footer__scroll-up');