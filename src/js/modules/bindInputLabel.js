const bindInputLabel = () => {
   const labels = document.querySelectorAll('input+label:not([for])');
   labels.forEach(label => {
      const input = label.previousElementSibling;
      const id = input.id || `${input.name}_${input.value}_${Date.now()}`;
      input.id = id;
      label.setAttribute('for', id);
   });
}

bindInputLabel();