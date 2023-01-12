class SearchBlock {
   constructor(searchBlock, selectorFocusin = '') {
      this.searchBlock = searchBlock;
      this.input = this.searchBlock.querySelector('input');
      this.button = this.searchBlock.querySelector('button');

      this.input.addEventListener('focus', () => {
         this.searchBlock.classList.add(selectorFocusin)
         console.log('focus');
      })
      this.input.addEventListener('blur', () => {
         this.searchBlock.classList.remove(selectorFocusin)
      })
      // this.button.tabindex = '-1';
      this.button.setAttribute('tabindex', '-1');
   }
}

const serchBlocks = document.querySelectorAll('.search-block');
serchBlocks.forEach(element => {
   new SearchBlock(element, 'search-block_focused');
});