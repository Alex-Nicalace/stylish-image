import { DropdownBtn } from "./reused/dropdown-btn.js";
import { CustomSelect } from "./reused/custom-select.js";

function initClasss(selector, HandlerClass) {
   const dropdowns = document.querySelectorAll(selector);
   dropdowns.forEach(el => {
      const tst = new HandlerClass(el);
      console.log('tst', tst);
   });
}
initClasss('.dropdown-btn', DropdownBtn);
initClasss('select.dropdown-btn', CustomSelect);