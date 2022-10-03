import choozy from './choozy';
import { formatMoney } from './currency';

export default (variant, element) => {
  const { price, compareAtPrice } = choozy(element, null);
  const { price: p, compare_at_price: cp } = variant;

  price.innerHTML = formatMoney(p);
  compareAtPrice.innerHTML = cp > p ? formatMoney(cp) : '';
};
