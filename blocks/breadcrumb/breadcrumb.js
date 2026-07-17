export default function decorate(block) {
  const links = block.querySelectorAll('a');
  const nav = document.createElement('nav');
  nav.className = 'cmp-breadcrumb';
  nav.setAttribute('aria-label', 'Breadcrumb');

  const ol = document.createElement('ol');
  ol.className = 'cmp-breadcrumb__list';

  links.forEach((link, i) => {
    const li = document.createElement('li');
    li.className = 'cmp-breadcrumb__item';

    if (i === links.length - 1) {
      li.classList.add('cmp-breadcrumb__item--active');
      const span = document.createElement('span');
      span.setAttribute('aria-current', 'page');
      span.textContent = link.textContent;
      li.append(span);
    } else {
      const a = link.cloneNode(true);
      a.className = 'cmp-breadcrumb__item-link';
      li.append(a);
    }

    ol.append(li);
  });

  nav.append(ol);
  block.textContent = '';
  block.append(nav);
}
