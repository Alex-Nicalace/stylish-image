const optionsDefault = {
   root: null, // null - пересечение с областью видимости
   rootMargin: '0px',
   threshold: 1, // степень пересечения объекта при которой срваботает колбэк. 1 - 100%

   /* обязательные параметры для того чтобы работало свойство entry.isVisible - Свойство isVisible является 
   частью предлагаемых обновлений Intersection Observer v2, касающихся фактической видимости целевого 
   элемента для пользователя.*/
   trackVisibility: true,
   delay: 100              // minimum 100
}

function createIntersectionObserver(targetSelector, nameClass, options = {}) {
   const optionsCurrent = { ...optionsDefault, ...options };

   const observer = new IntersectionObserver(onIntersection, optionsCurrent);

   const targets = document.querySelectorAll(targetSelector);
   for (const target of targets) {
      observer.observe(target);
   }

   function onIntersection(entries, observer) {
      for (const entry of entries) {
         const target = entry.target;
         if (entry.isIntersecting) {
            target.classList.add(nameClass);
            observer.unobserve(target);
         }
      }
   };
}


createIntersectionObserver('.promo__header-block', 'promo__header-block_animated', { rootMargin: '0px 0px 0px 0px' });
createIntersectionObserver('.advantage', 'advantage_animated', { rootMargin: '0px 0px', threshold: 0.5 });
createIntersectionObserver('.subscribe', 'subscribe_animated', { rootMargin: '0px 0px', threshold: 0.5 });
// </наблюдение за элементом при помощи Intersection Observer API>
// </animate for visible element>