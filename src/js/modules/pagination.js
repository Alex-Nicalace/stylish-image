class Pagination {
   constructor(element) {
      if (!element) return;

      this._paginationEl = element;
      this._nameSelectorBlock = 'pagination';
      this._buttonPrevEl = this._paginationEl.querySelector(`.${this._nameSelectorBlock}__prev`);
      this._buttonNextEl = this._paginationEl.querySelector(`.${this._nameSelectorBlock}__next`);
      this._currentPageEl = this._paginationEl.querySelector(`.${this._nameSelectorBlock}__current-page`);
      this._totalPageEl = this._paginationEl.querySelector(`.${this._nameSelectorBlock}__total-page`);

      this._currentPage = parseInt(this._currentPageEl.textContent);
      this._totalPage = parseInt(this._totalPageEl.textContent);
      this._step = 1;

      this._buttonPrevEl.addEventListener('click', e => {
         (this._currentPage > 1) && --this._currentPage;
         this._syncCurrentPage();
      });
      this._buttonNextEl.addEventListener('click', e => {
         (this._currentPage < this._totalPage) && ++this._currentPage;
         this._syncCurrentPage();
      });
      this._syncCurrentPage();
   }

   _syncCurrentPage() {
      this._currentPageEl.textContent = this._currentPage;
      this._totalPageEl.textContent = this._totalPage;
      this._buttonPrevEl.disabled = this._currentPage == 1 ? true : false;
      this._buttonNextEl.disabled = this._currentPage == this._totalPage ? true : false;
   }
   get currentPage() {
      return this._currentPage;
   }
   set currentPage(value) {
      if (!(+value >= 1 && +value <= this._totalPage)) {
         throw new Error(`value - ${value} not in range ${1} and ${this._totalPage}`)
      }
      this._currentPage = +value;
      this._syncCurrentPage();
   }
   get totalPage() {
      return this._totalPage;
   }
   set totalPage(value) {
      if (+value < 1) {
         throw new Error(`value - ${value} must biggest 1`)
      }
      this._totalPage = +value;
      this._syncCurrentPage();
   }
}

const paginationBlocks = document.querySelectorAll('.pagination');
paginationBlocks.forEach(element => {
   new Pagination(element);
});