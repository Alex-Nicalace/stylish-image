/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation, Lazy, Thumbs, FreeMode } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	// Проверяем, есть ли слайдер на стронице
	if (document.querySelector('.slider-block__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		window.imagesSlider = new Swiper('.slider-block__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Lazy],
			observer: true,
			observeParents: true,
			observeSlideChildren: true,
			slidesPerView: 3,
			spaceBetween: 24,
			autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			lazy: true,

			/*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагинация
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.slider-block__slide-prev',
				nextEl: '.slider-block__slide-next',
			},

			// Брейкпоинты

			breakpoints: {
				320: {
					slidesPerView: "auto",
					autoHeight: false,
					spaceBetween: 8,
				},
				480: {
					spaceBetween: 16,
				},
				769: {
					slidesPerView: 3,
					spaceBetween: 24,
				}
			},

			// События
			on: {

			}
		});
	}

	if (document.querySelector('.gallery__thumbs-slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		const swiper = new Swiper('.gallery__thumbs-slider', { // Указываем скласс нужного слайдера
			modules: [Navigation, Lazy, FreeMode],
			spaceBetween: 10,
			slidesPerView: 4,
			freeMode: true,
			watchSlidesProgress: true,
			lazy: true,
			// Брейкпоинты

			breakpoints: {
				479.98: {
					direction: "vertical",
					spaceBetween: 15,
				},
				767.98: {
					direction: "vertical",
					spaceBetween: 16,
				},
			},
		});
		if (document.querySelector('.gallery__slider')) { // Указываем скласс нужного слайдера
			// Создаем слайдер
			new Swiper('.gallery__slider', { // Указываем скласс нужного слайдера
				modules: [Navigation, Lazy, Thumbs],
				spaceBetween: 10,
				lazy: true,
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},
				thumbs: {
					swiper: swiper,
				},
			});
		}
	}
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});