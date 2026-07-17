/* eslint-disable no-use-before-define */

function buildAccordionPanel(heading, subtitle, contentNodes, isFirst) {
  const item = document.createElement('div');
  item.className = 'cmp-accordion__item';
  if (isFirst) item.dataset.cmpExpanded = '';

  const header = document.createElement('h3');
  header.className = 'cmp-accordion__header';

  const button = document.createElement('button');
  const btnClass = isFirst ? ' cmp-accordion__button--expanded' : '';
  button.className = `cmp-accordion__button${btnClass}`;
  button.innerHTML = '<span class="cmp-accordion__title">'
    + `${heading}</span><span class="cmp-accordion__icon"></span>`;
  button.addEventListener('click', () => {
    const expanded = button.classList.toggle('cmp-accordion__button--expanded');
    panel.classList.toggle('cmp-accordion__panel--expanded', expanded);
    panel.classList.toggle('cmp-accordion__panel--hidden', !expanded);
  });
  header.append(button);

  const panel = document.createElement('div');
  const panelState = isFirst ? 'expanded' : 'hidden';
  panel.className = `cmp-accordion__panel cmp-accordion__panel--${panelState}`;

  if (subtitle) {
    const sub = document.createElement('p');
    sub.className = 'cmp-accordion__subtitle';
    sub.textContent = subtitle;
    panel.append(sub);
  }

  const grid = document.createElement('div');
  grid.className = 'cmp-accordion__panel-grid';

  let currentGroup = null;
  let currentList = null;

  contentNodes.forEach((node) => {
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const tag = node.tagName;

    if (tag === 'H4' || (tag === 'P' && node.querySelector('strong'))) {
      currentGroup = document.createElement('div');
      currentGroup.className = 'cmp-download';
      grid.append(currentGroup);

      const catHeading = document.createElement('h4');
      catHeading.className = 'cmp-download__title';
      catHeading.textContent = node.textContent.trim();
      currentGroup.append(catHeading);

      currentList = document.createElement('ul');
      currentList.className = 'cmp-download__list';
      currentGroup.append(currentList);
    } else if (tag === 'P' || tag === 'DIV') {
      const link = node.querySelector('a');
      if (link && currentList) {
        const li = document.createElement('li');
        const a = link.cloneNode(true);
        a.className = 'cmp-download__title-link';
        const href = a.getAttribute('href') || '';
        const ext = href.match(/\.(pdf|xlsx|xhtml|zip|pptx)/i);
        if (ext) a.dataset.filetype = ext[1].toUpperCase();
        li.append(a);
        currentList.append(li);
      } else if (link) {
        if (!currentGroup) {
          currentGroup = document.createElement('div');
          currentGroup.className = 'cmp-download';
          grid.append(currentGroup);
        }
        if (!currentList) {
          currentList = document.createElement('ul');
          currentList.className = 'cmp-download__list';
          currentGroup.append(currentList);
        }
        const li = document.createElement('li');
        const a = link.cloneNode(true);
        a.className = 'cmp-download__title-link';
        li.append(a);
        currentList.append(li);
      }
    }
  });

  panel.append(grid);
  item.append(header, panel);
  return item;
}

export default async function decorate(block) {
  const tabList = document.createElement('div');
  tabList.className = 'cmp-tabs__tablist';
  tabList.setAttribute('role', 'tablist');

  const tabPanels = document.createElement('div');
  tabPanels.className = 'cmp-tabs__panels';

  const rows = [...block.children];
  rows.forEach((row, i) => {
    const label = row.children[0]?.textContent.trim();
    const contentCell = row.children[1];

    const tab = document.createElement('button');
    tab.className = 'cmp-tabs__tab';
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    tab.setAttribute('aria-controls', `tabpanel-${i}`);
    tab.setAttribute('id', `tab-${i}`);
    tab.textContent = label;
    if (i === 0) tab.classList.add('cmp-tabs__tab--active');
    tabList.append(tab);

    const panel = document.createElement('div');
    panel.className = 'cmp-tabs__tabpanel';
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('id', `tabpanel-${i}`);
    panel.setAttribute('aria-labelledby', `tab-${i}`);
    if (i !== 0) panel.hidden = true;

    if (contentCell) {
      const children = [...contentCell.querySelectorAll(':scope > *')];
      if (children.length === 1 && children[0].tagName === 'P') {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = contentCell.innerHTML;
        const unwrapped = [...tempDiv.children];
        if (unwrapped.length <= 1) {
          panel.append(...contentCell.childNodes);
        } else {
          processContent(unwrapped, panel);
        }
      } else {
        processContent(children, panel);
      }
    }

    tabPanels.append(panel);
  });

  function processContent(elements, panel) {
    let currentHeading = null;
    let currentSubtitle = null;
    let currentContent = [];
    let panelIndex = 0;

    elements.forEach((el) => {
      if (el.tagName === 'H3') {
        if (currentHeading) {
          const isFirst = panelIndex === 0;
          const acc = buildAccordionPanel(currentHeading, currentSubtitle, currentContent, isFirst);
          panel.append(acc);
          panelIndex += 1;
        }
        currentHeading = el.textContent.trim();
        currentSubtitle = null;
        currentContent = [];
      } else if (el.classList && el.classList.contains('accordion-subtitle')) {
        currentSubtitle = el.textContent.trim();
      } else if (!currentHeading) {
        currentHeading = el.textContent.trim();
        currentContent = [];
      } else {
        currentContent.push(el);
      }
    });

    if (currentHeading) {
      const isFirst = panelIndex === 0;
      const acc = buildAccordionPanel(currentHeading, currentSubtitle, currentContent, isFirst);
      panel.append(acc);
    }
  }

  // Tab switching
  tabList.addEventListener('click', (e) => {
    const clickedTab = e.target.closest('.cmp-tabs__tab');
    if (!clickedTab) return;

    tabList.querySelectorAll('.cmp-tabs__tab').forEach((t) => {
      t.classList.remove('cmp-tabs__tab--active');
      t.setAttribute('aria-selected', 'false');
    });
    clickedTab.classList.add('cmp-tabs__tab--active');
    clickedTab.setAttribute('aria-selected', 'true');

    tabPanels.querySelectorAll('.cmp-tabs__tabpanel').forEach((p) => { p.hidden = true; });
    const targetPanel = tabPanels.querySelector(`#${clickedTab.getAttribute('aria-controls')}`);
    if (targetPanel) targetPanel.hidden = false;
  });

  // Keyboard navigation
  tabList.addEventListener('keydown', (e) => {
    const tabs = [...tabList.querySelectorAll('.cmp-tabs__tab')];
    const current = tabs.indexOf(e.target);
    let next;
    if (e.key === 'ArrowRight') next = (current + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
    if (next !== undefined) {
      tabs[next].focus();
      tabs[next].click();
    }
  });

  block.textContent = '';
  block.append(tabList, tabPanels);
}
