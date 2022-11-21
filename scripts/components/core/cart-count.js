import choozy from '../../lib/choozy';

export default window.component((node, ctx) => {
  const { count: countElement } = choozy(node);

  ctx.on('cart:update', (_, { countAdd, count }) => {
    if (!Number.isNaN(Number(count))) {
      countElement.innerHTML = count;
    } else if (countAdd) {
      countElement.innerHTML = Number(countElement.innerHTML) + countAdd;
    }
  });
});
