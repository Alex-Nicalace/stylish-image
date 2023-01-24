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

function createIntersectionObserver(targetSelector, callback, options = {}) {
   const optionsCurrent = { ...optionsDefault, ...options };

   const observer = new IntersectionObserver(onIntersection, optionsCurrent);

   const targets = document.querySelectorAll(targetSelector);
   for (const target of targets) {
      observer.observe(target);
   }

   function onIntersection(entries, observer) {
      for (const entry of entries) {
         callback(entry, observer)
      }
   };
}

function createFunc(blockSelector, nameClass) {
   return (entry, observer) => {
      const modifiedElements = document.querySelectorAll(blockSelector);
      modifiedElements.forEach(element => {
         if (entry.isIntersecting) {
            element.classList.add(nameClass);
         } else {
            element.classList.remove(nameClass);
         };
      });
   }
}

const animatePromo = createFunc('.promo__header-block', 'promo__header-block_animated');
const animateAdvantage = createFunc('.advantage', 'advantage_animated');
const animateComposition = createFunc('.composition', 'composition_animated');
const animateSubscribe = createFunc('.subscribe', 'subscribe_animated');

createIntersectionObserver('.promo__header-block', animatePromo, { rootMargin: '60px 0px 0px 0px' });
createIntersectionObserver('.advantage', animateAdvantage, { rootMargin: '274px 0px' });
createIntersectionObserver('.composition', animateComposition, { rootMargin: '450px 0px' });
createIntersectionObserver('.subscribe', animateSubscribe, { rootMargin: '670px 0px' });
// </наблюдение за элементом при помощи Intersection Observer API>
// </animate for visible element>