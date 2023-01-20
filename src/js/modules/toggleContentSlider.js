const toggleContentSlider = () => {
   const tabContainer = document.querySelector('.tabs');
   if (!tabContainer) return;
   const tabItems = tabContainer.querySelectorAll('.tabs__item');
   const slides = document.querySelectorAll('.article-card.swiper-slide');
   const unselectTabs = (currentTab) => {
      tabItems.forEach(el => {
         if (el !== currentTab) {
            el.classList.remove('tabs__item_selected')
         }
      });
   }
   const getIndTab = (currentTab) => {
      return Array.from(tabItems).findIndex(item => item === currentTab && item.classList.contains('tabs__item_selected'));
   }
   const visibleSlides = () => {
      slides.forEach(slide => {
         slide.style.display = '';
      });
   }
   const toggleVisibleSlides = (value) => {
      visibleSlides();
      if (value >= 0) {
         slides.forEach(slide => {
            if (slide.dataset.sex != value) {
               slide.style.display = 'none'
            }
         });
      }
   }
   tabContainer.addEventListener('click', e => {
      const target = e.target;
      const item = target && target.closest('.tabs__item');
      if (!item) return;
      unselectTabs(item);
      item.classList.toggle('tabs__item_selected');
      const selectedInd = getIndTab(item);
      console.log(selectedInd);
      toggleVisibleSlides(selectedInd);
      window.imagesSlider.update();
   })
}
toggleContentSlider();