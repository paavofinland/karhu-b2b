/* eslint-disable */
import radio from './radio';

export default function productSelection(node, opts) {
  opts = {
    select: '[data-option-select]',
    radio: '[data-option-radio]',
    main: '[data-option-main]',
    ...opts,
  };

  const listeners = [];

  const state = {
    id: null,
    options: [],
  };

  const selects = document.querySelectorAll(opts.select);
  const radios = document.querySelectorAll(opts.radio);
  const main = document.querySelector(opts.main);

  if (!main || !main.length) throw 'data-option-main is missing';
  if (radios.length > 3) throw 'you have more than three radio groups';
  if (selects.length > 3) throw 'you have more than three select inputs';

  const variants = [].slice.call(main.children).reduce((variantsObj, variantOption) => {
    variantsObj[variantOption.innerHTML] = variantOption.value;
    return variantsObj;
  }, {});

  function updateSelection() {
    const matchingVariant = Object.keys(variants).find((variant) => variant.trim() === state.options.join(' / '))
    state.id = variants[matchingVariant];
    main.value = state.id;
    for (const fn of listeners) fn(state);
  }

  selects.forEach(select => {
    if (select.nodeName !== 'SELECT')
      throw 'data-option-select should be defined on the individual option selectors';

    const index = Number(select.getAttribute('data-index'));

    // set initial value
    state.options[index] = select.value;

    select.addEventListener('change', e => {
      state.options[index] = e.target.value;
      updateSelection();
    });
  });

  radios.forEach(r => {
    if (r.nodeName === 'INPUT')
      throw 'data-option-radio should be defined on a parent of the radio group, not the inputs themselves';

    const index = Number(r.getAttribute('data-index'));
    const inputs = [].slice.call(r.getElementsByTagName('input'));

    // set initial value
    inputs.forEach(r => {
      if (r.checked) state.options[index] = r.value;
    });

    radio(inputs, value => {
      state.options[index] = value;
      updateSelection();
    });
  });

  updateSelection();

  return {
    get state() {
      return state;
    },
    onUpdate(fn) {
      listeners.indexOf(fn) < 0 && listeners.push(fn);
      return () => listeners.splice(listeners.indexOf(fn), 1);
    },
  };
}
/* eslint-enable */
